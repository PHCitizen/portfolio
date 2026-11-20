import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { type RefObject, useEffect } from "react";
import { createCommitGraphDraw, NODE_BEAT } from "./commitGraphDraw";
import styles from "./Experience.module.css";

const VIEWPORTS_PER_COMMIT = 1.5;
const STORY_SCRUB_SECONDS = 0.2;
const EXIT_BLUR = 12;
const CROSSING = 0.46;

export function useCommitHistoryScroll(
	ref: RefObject<HTMLDivElement | null>,
	headingRef: RefObject<HTMLDivElement | null>,
) {
	useEffect(() => {
		const stage = ref.current;
		const heading = headingRef.current;
		const label = heading?.querySelector<HTMLElement>(`.${styles.mainLabel}`);
		const track = stage?.querySelector<HTMLDivElement>(`.${styles.storyTrack}`);
		const list = track?.querySelector<HTMLOListElement>(`.${styles.timeline}`);
		const trunk = list?.querySelector<HTMLElement>(`.${styles.trunk}`);
		if (!stage || !heading || !label || !track || !list || !trunk) return;

		const rows = Array.from(
			list.querySelectorAll<HTMLElement>(`.${styles.chapter}`),
		);
		const commits = rows.flatMap((row) => {
			const part = row.querySelector<HTMLElement>("article");
			const rail = row.querySelector<HTMLElement>(`.${styles.rail}`);
			const node = rail?.querySelector<HTMLElement>(`.${styles.node}`);
			const fill = node?.querySelector<HTMLElement>(`.${styles.nodeFill}`);
			return part && rail && node && fill ? [{ row, part, node, fill }] : [];
		});
		if (!commits.length) return;

		gsap.registerPlugin(ScrollTrigger);
		const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
		const mobile = window.matchMedia("(max-width: 639px)");
		let context: gsap.Context | undefined;
		let focus: ((event: FocusEvent) => void) | undefined;
		let frame = 0;
		let previousSize = "";

		const update = () => {
			const headingHeight = heading.offsetHeight;
			const headerOffset =
				Number.parseFloat(getComputedStyle(heading).top) || 0;
			const pinOffset = headerOffset + headingHeight;
			const size = [
				stage.clientWidth,
				window.innerHeight,
				headingHeight,
				headerOffset,
				track.offsetHeight,
				motion.matches,
				mobile.matches,
				...commits.map(({ part }) => part.offsetHeight),
			].join(":");
			if (size === previousSize) return;
			previousSize = size;
			context?.revert();
			delete stage.dataset.pinned;
			focus = undefined;

			context = gsap.context(() => {
				if (!motion.matches) {
					gsap.set(stage, { "--story-pin-offset": `${pinOffset}px` });
					stage.dataset.pinned = "";
				}
				const height = stage.clientHeight;
				// Center cards in the viewport below the navigation, accounting for the heading.
				const screenMidpoint = (height - headingHeight) / 2;
				if (
					motion.matches ||
					commits.some(({ part }) => part.offsetHeight > 2 * screenMidpoint)
				) {
					// Leave tall cards in normal flow rather than clipping their text.
					delete stage.dataset.pinned;
					if (!motion.matches) {
						const { draw } = createCommitGraphDraw(track, list);
						gsap.fromTo(
							label,
							{ "--connector-progress": 0 },
							{
								"--connector-progress": 1,
								ease: "none",
								scrollTrigger: {
									trigger: track,
									start: "top 90%",
									end: "top 75%",
									scrub: true,
								},
							},
						);
						gsap.to(draw, {
							time: draw.duration(),
							ease: "none",
							scrollTrigger: {
								trigger: track,
								start: "top 75%",
								end: "bottom 75%",
								scrub: true,
							},
						});
					}
					for (const { row, part } of commits) {
						const move = !motion.matches;
						const side =
							mobile.matches || part.offsetLeft >= stage.clientWidth / 2
								? 1
								: -1;
						gsap.fromTo(
							part,
							{
								opacity: 0.6,
								...(move && { x: 18 * side, filter: "blur(3px)" }),
							},
							{
								opacity: 1,
								...(move && { x: 0, filter: "blur(0px)" }),
								ease: "none",
								scrollTrigger: {
									trigger: row,
									start: "top 95%",
									end: "top 75%",
									scrub: true,
								},
							},
						);
						if (move) {
							gsap.fromTo(
								part,
								{ x: 0, opacity: 1, filter: "blur(0px)", scale: 1 },
								{
									x: -18 * side,
									opacity: 0,
									filter: `blur(${EXIT_BLUR}px)`,
									scale: 0.92,
									ease: "none",
									immediateRender: false,
									scrollTrigger: {
										trigger: row,
										start: () =>
											`top -${part.offsetTop + part.offsetHeight - 24}px`,
										end: () => `top -${part.offsetTop + part.offsetHeight}px`,
										scrub: true,
									},
								},
							);
						}
					}
					return;
				}

				const width = stage.clientWidth;
				const offscreenX = (part: HTMLElement, side: number) =>
					side > 0
						? width - part.offsetLeft + 32
						: -(part.offsetLeft + part.offsetWidth + 32);
				const { draw, center } = createCommitGraphDraw(track, list);
				const slides = commits.map(({ part, node, fill }) => {
					return {
						part,
						node,
						fill,
						pan: center(part) - screenMidpoint,
						direction: mobile.matches || part.offsetLeft >= width / 2 ? 1 : -1,
					};
				});

				const story = gsap.timeline({ defaults: { ease: "power2.out" } });
				const first = slides[0];
				story.set(track, { y: -first.pan }, 0);

				// Draw from the label to the first node in one scroll-scrubbed beat.
				const labelLine =
					Number.parseFloat(getComputedStyle(label, "::after").height) || 0;
				const bridge = Math.max(
					0,
					-first.pan - label.offsetHeight - labelLine + 1,
				);
				const timePerPixel =
					NODE_BEAT / (labelLine + bridge + center(first.node));
				const labelTime = labelLine * timePerPixel;
				const bridgeTime = bridge * timePerPixel;
				const connectorTime = labelTime + bridgeTime;
				gsap.set(label, { "--connector-progress": 0 });
				gsap.set(track, {
					"--connector-bridge-height": `${bridge}px`,
					"--connector-bridge-progress": 0,
				});
				story.to(
					label,
					{ "--connector-progress": 1, duration: labelTime, ease: "none" },
					0,
				);
				if (bridge > 0) {
					story.to(
						track,
						{
							"--connector-bridge-progress": 1,
							duration: bridgeTime,
							ease: "none",
						},
						labelTime,
					);
				}

				for (const [index, slide] of slides.entries()) {
					const { part, node, fill, pan, direction } = slide;
					const previous = slides[index - 1];
					const delta = previous ? pan - previous.pan : 0;
					const travel = { duration: CROSSING };
					story.set(
						part,
						{
							x: offscreenX(part, direction),
							y: -delta,
							skewY: direction * 3,
							opacity: 0,
							filter: `blur(${EXIT_BLUR / 3}px)`,
							pointerEvents: "none",
						},
						0,
					);
					story.to(
						part,
						{
							...travel,
							x: 0,
							y: 0,
							skewY: 0,
							opacity: 1,
							filter: "blur(0px)",
						},
						index,
					);
					story.set(part, { pointerEvents: "auto" }, index + CROSSING);
					// Keep drawing through the gaps between cards, not just during their entrances.
					story.to(
						draw,
						{
							time: center(node),
							duration: index ? 1 : NODE_BEAT - connectorTime,
							ease: "none",
						},
						index ? index - 1 + NODE_BEAT : connectorTime,
					);
					story.to(fill, { duration: 0.23, opacity: 1 }, index + NODE_BEAT);
					story.to(
						node,
						{
							duration: 0.23,
							filter:
								"drop-shadow(0 0 5px #61cf5a) drop-shadow(0 0 4px #61cf5a)",
						},
						index + NODE_BEAT,
					);

					if (!previous) continue;
					story.set(previous.part, { pointerEvents: "none" }, index);
					story.to(
						previous.part,
						{
							...travel,
							x: offscreenX(previous.part, -direction),
							y: delta,
							skewY: -direction * 3,
							scale: 0.92,
							opacity: 0,
							filter: `blur(${EXIT_BLUR}px)`,
						},
						index,
					);
					story.to(
						previous.node,
						{
							duration: 0.23,
							filter:
								"drop-shadow(0 0 0 transparent) drop-shadow(0 0 0 transparent)",
						},
						index,
					);
					story.to(track, { ...travel, y: -pan }, index);
				}

				const last = slides.length - 1;
				story.to(
					draw,
					{ time: draw.duration(), duration: 1 - NODE_BEAT, ease: "none" },
					last + NODE_BEAT,
				);
				// Reveal the graph tail without pulling the last card off center.
				const tailPan = track.offsetHeight - height;
				const tailShift = tailPan - slides[last].pan;
				if (tailShift > 0) {
					story.to(track, { y: -tailPan, duration: 0.18 }, last + 0.82);
					story.to(
						slides[last].part,
						{ y: tailShift, duration: 0.18 },
						last + 0.82,
					);
				}

				const trigger = ScrollTrigger.create({
					trigger: stage,
					animation: story,
					pin: true,
					start: `top top+=${pinOffset}`,
					end: () =>
						`+=${(stage.clientHeight + pinOffset) * slides.length * VIEWPORTS_PER_COMMIT}`,
					// Ease into large wheel steps without intercepting native scrolling.
					scrub: STORY_SCRUB_SECONDS,
				});
				focus = (event) => {
					if (!(event.target instanceof HTMLElement)) return;
					const target = event.target;
					const index = slides.findIndex(({ part }) => part.contains(target));
					if (
						index < 0 ||
						(story.time() >= index + CROSSING && story.time() <= index + 1)
					)
						return;
					// Keep keyboard navigation to the existing link usable while its card is offscreen.
					const progress = (index + 0.65) / slides.length;
					window.scrollTo({
						top: gsap.utils.interpolate(trigger.start, trigger.end, progress),
						behavior: "instant",
					});
					ScrollTrigger.update();
					trigger.getTween()?.progress(1);
				};
			}, stage);
			ScrollTrigger.refresh();
		};

		const onFocus = (event: FocusEvent) => focus?.(event);
		const schedule = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(update);
		};
		update();
		const observer = new ResizeObserver(schedule);
		observer.observe(track);
		observer.observe(heading);
		for (const { part } of commits) observer.observe(part);
		stage.addEventListener("focusin", onFocus);
		window.addEventListener("resize", schedule);
		motion.addEventListener("change", schedule);
		mobile.addEventListener("change", schedule);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
			stage.removeEventListener("focusin", onFocus);
			window.removeEventListener("resize", schedule);
			motion.removeEventListener("change", schedule);
			mobile.removeEventListener("change", schedule);
			context?.revert();
			delete stage.dataset.pinned;
		};
	}, [ref, headingRef]);
}
