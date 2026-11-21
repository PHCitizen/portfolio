import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { type RefObject, useEffect } from "react";
import { createCommitGraphDraw, NODE_BEAT } from "./commitGraphDraw";
import styles from "./Experience.module.css";

const VIEWPORTS_PER_COMMIT = 1.5;
const STORY_SCRUB_SECONDS = 0.2;
const EXIT_BLUR = 12;
const CROSSING = 0.46;
const FIRST_FORK_CLEARANCE = 32;
const MOBILE_SLIDE = 48;

export function useCommitHistoryScroll(
	ref: RefObject<HTMLDivElement | null>,
	headingRef: RefObject<HTMLDivElement | null>,
	playMerge: () => void,
) {
	useEffect(() => {
		const stage = ref.current;
		const section = stage?.parentElement;
		const heading = headingRef.current;
		const label = heading?.querySelector<HTMLElement>(`.${styles.mainLabel}`);
		const viewport = stage?.querySelector<HTMLElement>(
			`.${styles.storyViewport}`,
		);
		const track = stage?.querySelector<HTMLDivElement>(`.${styles.storyTrack}`);
		const list = track?.querySelector<HTMLOListElement>(`.${styles.timeline}`);
		const trunk = list?.querySelector<HTMLElement>(`.${styles.trunk}`);
		if (
			!stage ||
			!section ||
			!heading ||
			!label ||
			!viewport ||
			!track ||
			!list ||
			!trunk
		)
			return;

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
		const compact = window.matchMedia("(width < 40rem)");
		const entrySide = (part: HTMLElement) =>
			part.offsetLeft >= stage.clientWidth / 2 ? 1 : -1;
		let context: gsap.Context | undefined;
		let focus: ((event: FocusEvent) => void) | undefined;
		let frame = 0;
		let previousSize = "";
		let silent = false;

		const onMerge = (node: Element) => {
			if (silent || motion.matches) return;
			const { top, bottom } = node.getBoundingClientRect();
			const visibleTop = Math.max(0, heading.getBoundingClientRect().bottom);
			const visibleBottom = stage.hasAttribute("data-pinned")
				? Math.min(window.innerHeight, stage.getBoundingClientRect().bottom)
				: window.innerHeight;
			if (bottom > visibleTop && top < visibleBottom) playMerge();
		};

		const update = () => {
			const headingHeight = heading.offsetHeight;
			const headerOffset =
				Number.parseFloat(getComputedStyle(heading).top) || 0;
			const pinOffset = headerOffset + headingHeight;
			const size = [
				stage.clientWidth,
				// Showing the mobile toolbar must not rebuild the pin or its spacer.
				viewport.offsetHeight,
				headingHeight,
				headerOffset,
				track.offsetHeight,
				motion.matches,
				compact.matches,
				...commits.map(({ part }) => part.offsetLeft),
				...commits.map(({ part }) => part.offsetHeight),
			].join(":");
			if (size === previousSize) return;
			previousSize = size;
			silent = true;
			const sectionBottom = section.getBoundingClientRect().bottom;
			const wasBelowPin =
				stage.hasAttribute("data-pinned") && sectionBottom <= 0;
			context?.revert();
			delete stage.dataset.pinned;
			focus = undefined;

			context = gsap.context(() => {
				if (!motion.matches) {
					gsap.set(stage, { "--story-pin-offset": `${pinOffset}px` });
					stage.dataset.pinned = "";
				}
				const mobile = compact.matches;
				const width = stage.clientWidth;
				const centeredX = mobile ? width / 2 - trunk.offsetLeft - 1 : 0;
				const height = stage.clientHeight;
				// Center cards in the viewport below the navigation, accounting for the heading.
				const screenMidpoint = (height - headingHeight) / 2;
				const firstCommit = commits[0];
				const firstRowTop = firstCommit.row.offsetTop;
				const firstCardTop = firstRowTop + firstCommit.part.offsetTop;
				const firstCardHeight = firstCommit.part.offsetHeight;
				// Don't center the first card at the expense of hiding its fork under main.
				const firstPan = Math.min(
					firstCardTop + firstCardHeight / 2 - screenMidpoint,
					firstRowTop - label.offsetHeight - FIRST_FORK_CLEARANCE,
				);
				if (
					motion.matches ||
					firstCardTop + firstCardHeight - firstPan > height ||
					commits.some(({ part }) => part.offsetHeight > 2 * screenMidpoint)
				) {
					// Leave tall cards in normal flow rather than clipping their text.
					delete stage.dataset.pinned;
					if (!motion.matches) {
						const { draw } = createCommitGraphDraw(track, list, onMerge);
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
					if (mobile) {
						if (motion.matches) return;
						// Tall content stays in native flow, sharing one rail so no card is clipped.
						for (const [index, { row, part }] of commits.entries()) {
							const entry = gsap.timeline({
								defaults: { ease: "power2.out", duration: 1 },
								scrollTrigger: {
									trigger: row,
									start: "top 95%",
									end: "top 75%",
									scrub: true,
								},
							});
							if (index === 0) {
								entry.fromTo([track, label], { x: centeredX }, { x: 0 }, 0);
							}
							entry.fromTo(
								part,
								{
									x: MOBILE_SLIDE - (index === 0 ? centeredX : 0),
									opacity: 0.6,
								},
								{ x: 0, opacity: 1 },
								0,
							);
						}
						return;
					}
					for (const { row, part } of commits) {
						const move = !motion.matches;
						const side = entrySide(part);
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

				const offscreenX = (part: HTMLElement, side: number) =>
					side > 0
						? width - part.offsetLeft + 32
						: -(part.offsetLeft + part.offsetWidth + 32);
				const { draw, center } = createCommitGraphDraw(track, list, onMerge);
				const slides = commits.map(({ row, part, node, fill }, index) => {
					const onRight = row.matches(`.${styles.monero}, .${styles.bitcoin}`);
					const graphX = mobile && !onRight ? centeredX * 2 : 0;
					return {
						part,
						node,
						fill,
						pan: index === 0 ? firstPan : center(part) - screenMidpoint,
						direction: mobile ? (onRight ? 1 : -1) : entrySide(part),
						graphX,
						cardX: graphX ? -part.offsetLeft - graphX : 0,
					};
				});

				const story = gsap.timeline({ defaults: { ease: "power2.out" } });
				const first = slides[0];
				story.set(track, { y: -first.pan, ...(mobile && { x: centeredX }) }, 0);
				if (mobile) story.set(label, { x: centeredX }, 0);

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
					const { part, node, fill, pan, direction, graphX, cardX } = slide;
					const previous = slides[index - 1];
					const delta = previous ? pan - previous.pan : 0;
					const graphDelta = graphX - (previous?.graphX ?? centeredX);
					const travel = { duration: CROSSING };
					if (mobile) {
						// Pan the entire graph together. Cancel its x delta on the cards so
						// they slide at the edge rather than crossing the rail or reflowing.
						story.to([track, label], { ...travel, x: graphX }, index);
					}
					story.set(
						part,
						{
							x: mobile
								? cardX + graphDelta + direction * MOBILE_SLIDE
								: offscreenX(part, direction),
							y: -delta,
							opacity: 0,
							...(!mobile && {
								skewY: direction * 3,
								filter: `blur(${EXIT_BLUR / 3}px)`,
							}),
							pointerEvents: "none",
						},
						0,
					);
					story.to(
						part,
						{
							...travel,
							x: cardX,
							y: 0,
							opacity: 1,
							...(!mobile && { skewY: 0, filter: "blur(0px)" }),
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
							x: mobile
								? previous.cardX -
									graphDelta +
									previous.direction * MOBILE_SLIDE
								: offscreenX(previous.part, -direction),
							y: delta,
							opacity: 0,
							...(!mobile && {
								skewY: -direction * 3,
								scale: 0.92,
								filter: `blur(${EXIT_BLUR}px)`,
							}),
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
					silent = true;
					window.scrollTo({
						top: gsap.utils.interpolate(trigger.start, trigger.end, progress),
						behavior: "instant",
					});
					ScrollTrigger.update();
					trigger.getTween()?.progress(1);
					silent = false;
				};
			}, stage);
			ScrollTrigger.refresh();
			if (wasBelowPin) {
				// Removing the spacer during a real layout change can clamp the scroll
				// position. Preserve the viewport's distance past the section.
				const shift = section.getBoundingClientRect().bottom - sectionBottom;
				if (Math.abs(shift) > 1) {
					window.scrollTo({ top: window.scrollY + shift, behavior: "instant" });
					ScrollTrigger.update();
				}
			}
			silent = false;
		};

		const onFocus = (event: FocusEvent) => focus?.(event);
		const schedule = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(update);
		};
		update();
		const observer = new ResizeObserver(schedule);
		observer.observe(viewport);
		observer.observe(track);
		observer.observe(heading);
		for (const { part } of commits) observer.observe(part);
		stage.addEventListener("focusin", onFocus);
		window.addEventListener("resize", schedule);
		motion.addEventListener("change", schedule);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
			stage.removeEventListener("focusin", onFocus);
			window.removeEventListener("resize", schedule);
			motion.removeEventListener("change", schedule);
			silent = true;
			context?.revert();
			delete stage.dataset.pinned;
		};
	}, [ref, headingRef, playMerge]);
}
