import gsap from "gsap";
import styles from "./Experience.module.css";

export const NODE_BEAT = 0.3;

function createBranchLabelUpdates(track: HTMLElement, origin: number) {
	return Array.from(
		track.querySelectorAll<HTMLElement>(`.${styles.branchLabel}`),
	).flatMap((label) => {
		const rail = label.parentElement;
		if (!rail) return [];
		const anchor = rail.getBoundingClientRect();
		const isEducation = rail.closest(`.${styles.education}`) !== null;
		const segments = Array.from(
			rail.querySelectorAll(
				`.${styles.fork}, .${styles.join}, .${styles.branchLine}:not(.${styles.educationContinues})`,
			),
		);
		if (rail.closest(`.${styles.joystick}`)) {
			segments.push(
				...track.querySelectorAll(
					`.${styles.joystickContinues}, .${styles.joystickJoin}`,
				),
			);
		} else if (isEducation) {
			segments.push(...track.querySelectorAll(`.${styles.educationContinues}`));
		}

		// Use the same segment progress as the stroke / scale tweens so the label
		// stays on the actual tip, including through forks and merges.
		const geometry = segments
			.map((segment) => {
				const bounds = segment.getBoundingClientRect();
				const start = bounds.top - origin;
				const end = bounds.bottom - origin;
				const path = segment.querySelector("path");
				const matrix = path?.getScreenCTM();
				const length = path?.getTotalLength() ?? 0;
				return {
					start,
					end,
					pointAt(progress: number) {
						if (path && matrix) {
							const point = path
								.getPointAtLength(length * progress)
								.matrixTransform(matrix);
							return { x: point.x - anchor.left, y: point.y - anchor.top };
						}
						return {
							x: bounds.left + bounds.width / 2 - anchor.left,
							y: bounds.top + bounds.height * progress - anchor.top,
						};
					},
				};
			})
			.sort((a, b) => a.start - b.start);
		if (!geometry.length) return [];

		const start = geometry[0].start;
		const last = geometry[geometry.length - 1];
		const fadeDistance = 12;
		gsap.set(label, { left: 0, top: 0, x: 0, y: 0, opacity: 0 });
		const setX = gsap.quickSetter(label, "x", "px");
		const setY = gsap.quickSetter(label, "y", "px");
		const setOpacity = gsap.quickSetter(label, "opacity");
		return [
			(time: number) => {
				const opacity = Math.max(
					0,
					Math.min(
						1,
						(time - start) / fadeDistance,
						isEducation ? 1 : (last.end - time) / fadeDistance,
					),
				);
				setOpacity(opacity);
				if (!opacity) return;
				const segment = geometry.find(({ end }) => time <= end) ?? last;
				const progress = gsap.utils.clamp(
					0,
					1,
					(time - segment.start) / (segment.end - segment.start),
				);
				const point = segment.pointAt(progress);
				setX(point.x);
				setY(point.y);
			},
		];
	});
}

/** Timeline time is a vertical pixel offset from the top of the graph track. */
export function createCommitGraphDraw(track: HTMLElement, list: HTMLElement) {
	const draw = gsap.timeline({ paused: true, defaults: { ease: "none" } });
	const origin = track.getBoundingClientRect().top;
	const rect = (element: Element) => element.getBoundingClientRect();
	const top = (element: Element) => rect(element).top - origin;
	const center = (element: Element) => top(element) + rect(element).height / 2;
	const updateBranchLabels = createBranchLabelUpdates(track, origin);
	draw.eventCallback("onUpdate", () => {
		const time = draw.time();
		for (const update of updateBranchLabels) update(time);
	});

	const grow = (element: HTMLElement) => {
		draw.fromTo(
			element,
			{ scaleY: 0, transformOrigin: "50% 0" },
			{ scaleY: 1, duration: rect(element).height },
			top(element),
		);
	};
	const reveal = (element: Element, at: number, duration = 10) => {
		draw.fromTo(element, { opacity: 0 }, { opacity: 1, duration }, at);
	};

	for (const line of track.querySelectorAll<HTMLElement>(
		`.${styles.trunk}, .${styles.branchLine}, .${styles.joystickContinues}, .${styles.presentLine}`,
	)) {
		grow(line);
	}

	for (const svg of list.querySelectorAll<SVGSVGElement>(
		`.${styles.rail} svg`,
	)) {
		const path = svg.querySelector("path");
		if (!path) continue;
		const length = path.getTotalLength();
		gsap.set(path, { strokeDasharray: `${length} ${length}` });
		draw.fromTo(
			path,
			{ strokeDashoffset: length },
			{ strokeDashoffset: 0, duration: rect(svg).height },
			top(svg),
		);
	}

	for (const node of list.querySelectorAll(
		`.${styles.node}, .${styles.mergeNode}, .${styles.joystickMergeNode}`,
	)) {
		reveal(node, center(node));
	}
	for (const date of list.querySelectorAll(
		`.${styles.mergeDate}, .${styles.moneroDate}`,
	)) {
		reveal(date, center(date));
	}
	const present = track.querySelector(`.${styles.present}`);
	if (present) reveal(present, top(present), 16);

	return { draw, center };
}
