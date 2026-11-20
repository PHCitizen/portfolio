import gsap from "gsap";
import styles from "./Experience.module.css";

export const NODE_BEAT = 0.3;

/** Timeline time is a vertical pixel offset from the top of the graph track. */
export function createCommitGraphDraw(track: HTMLElement, list: HTMLElement) {
	const draw = gsap.timeline({ paused: true, defaults: { ease: "none" } });
	const origin = track.getBoundingClientRect().top;
	const rect = (element: Element) => element.getBoundingClientRect();
	const top = (element: Element) => rect(element).top - origin;
	const center = (element: Element) => top(element) + rect(element).height / 2;

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
