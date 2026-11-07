import {
	type RefObject,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => {
	const t = clamp(n);
	return t * t * (3 - 2 * t);
};
const typed = (text: string, t: number) =>
	text.slice(0, Math.floor(clamp(t) * text.length));
const fallbackMedia = "(max-width: 760px), (max-height: 650px)";

export type Workflow = {
	active: number;
	slide: number;
	finderQuery: string;
	browserQuery: string;
	address: string;
	terminal: string;
	gitCommand: string;
	presenting: boolean;
	executed: boolean;
	browserLoaded: boolean;
	gitReady: boolean;
	selectedFile: string | null;
	switcher: boolean;
	action: string;
};
const initial: Workflow = {
	active: 0,
	slide: 0,
	finderQuery: "",
	browserQuery: "",
	address: "",
	terminal: "",
	gitCommand: "",
	presenting: false,
	executed: false,
	browserLoaded: false,
	gitReady: false,
	selectedFile: null,
	switcher: false,
	action: "Scroll to take the mouse",
};

type Stop = { at: number; target: string; click?: boolean; label?: string };
const paths: Stop[][] = [
	[
		{ at: 0, target: ".explore-button" },
		{ at: 0.42, target: ".explore-button" },
		{ at: 0.72, target: '[data-app="1"]', click: true, label: "Open Finder" },
	],
	[
		{ at: 0, target: ".finder-breadcrumb" },
		{ at: 0.23, target: ".finder-search", click: true, label: "Search files" },
		{ at: 0.59, target: ".finder-search", label: "Typing projects…" },
		{ at: 0.72, target: ".finder-deck", click: true, label: "Select deck" },
		{
			at: 0.82,
			target: ".finder-deck",
			click: true,
			label: "Double-click to open",
		},
	],
	[
		{ at: 0, target: ".present-button" },
		{
			at: 0.14,
			target: ".present-button",
			click: true,
			label: "Start presentation",
		},
		{ at: 0.34, target: ".next-project", click: true, label: "Next slide" },
		{ at: 0.6, target: ".next-project", click: true, label: "Next slide" },
		{
			at: 0.8,
			target: '[data-app="3"]',
			click: true,
			label: "Back to Terminal",
		},
	],
	[
		{ at: 0, target: ".curl-command" },
		{ at: 0.33, target: ".curl-command", label: "Type curl request" },
		{ at: 0.4, target: ".run-curl", click: true, label: "Return ↵" },
		{
			at: 0.72,
			target: ".open-source-browser",
			click: true,
			label: "Open in browser",
		},
	],
	[
		{ at: 0, target: ".browser-address", click: true },
		{ at: 0.28, target: ".browser-address", label: "Return ↵" },
		{
			at: 0.43,
			target: ".repository-search",
			click: true,
			label: "Search repositories",
		},
		{ at: 0.66, target: ".repo-row", click: true, label: "Inspect repository" },
		{ at: 0.79, target: ".switcher-git", label: "⌘ Tab → Git" },
	],
	[
		{ at: 0, target: ".git-command" },
		{ at: 0.28, target: ".git-command", label: "Return ↵" },
		{
			at: 0.48,
			target: ".git-layout article",
			click: true,
			label: "Read commit",
		},
		{ at: 0.8, target: '[data-app="6"]', click: true, label: "Open Toolbox" },
	],
	[
		{ at: 0, target: ".toolbox-layout h2" },
		{ at: 0.5, target: ".tool-groups" },
		{
			at: 0.8,
			target: '[data-app="7"]',
			click: true,
			label: "Compose a message",
		},
	],
	[
		{ at: 0, target: ".mail-subject" },
		{
			at: 0.42,
			target: '.window-contact a[href^="mailto:"]',
			label: "Your next chapter starts here",
		},
	],
];

export function useDesktopWorkflow(
	root: RefObject<HTMLElement | null>,
	linear: boolean,
) {
	const [workflow, setWorkflow] = useState<Workflow>(initial);
	const cursorPaint = useRef<(() => void) | null>(null);
	useLayoutEffect(() => {
		cursorPaint.current?.();
	});
	useEffect(() => {
		let frame = 0;
		const element = root.current;
		if (!element) return;
		const panels = [...element.querySelectorAll<HTMLElement>(".story-window")];
		const contents = panels.map((panel) =>
			panel.querySelector<HTMLElement>(".window-content"),
		);
		const tokens = [...element.querySelectorAll<HTMLElement>(".tool-token")];
		const cursor = element.querySelector<HTMLElement>(".workflow-cursor");
		const pointer = element.querySelector<HTMLElement>(".cursor-pointer");
		const ring = element.querySelector<HTMLElement>(".cursor-click");
		const cursorLabel = element.querySelector<HTMLElement>(".cursor-label");
		const wallpaper = element.querySelector<HTMLElement>(".wallpaper");
		const progress = element.querySelector<HTMLElement>(".story-progress");
		let previousSignature = "";
		let wasReading = false;
		function paint() {
			frame = 0;
			if (!element) return;
			const fallback = linear || window.matchMedia(fallbackMedia).matches;
			element.dataset.workflowMode = fallback ? "reading" : "desktop";
			if (fallback) {
				panels.forEach((panel, i) => {
					panel.inert = false;
					panel.removeAttribute("style");
					panel.removeAttribute("data-foreground");
					if (contents[i]) contents[i].scrollTop = 0;
				});
				tokens.forEach((token) => {
					token.removeAttribute("style");
				});
				wallpaper?.removeAttribute("style");
				cursorPaint.current = null;
				const nearest = panels.reduce(
					(best, panel, i) =>
						Math.abs(panel.getBoundingClientRect().top - 80) <
						Math.abs(panels[best].getBoundingClientRect().top - 80)
							? i
							: best,
					0,
				);
				if (!wasReading) {
					setWorkflow({
						...initial,
						active: nearest,
						executed: true,
						browserLoaded: true,
						gitReady: true,
						terminal: "curl portfolio.local/projects",
						gitCommand: "git log --experience",
						address: "https://github.com/PHCitizen",
					});
				} else {
					setWorkflow((old) =>
						old.active === nearest ? old : { ...old, active: nearest },
					);
				}
				wasReading = true;
				previousSignature = "";
				return;
			}
			wasReading = false;
			const p =
				clamp(
					-element.getBoundingClientRect().top /
						(element.offsetHeight - innerHeight),
				) * 7;
			element.dataset.typing =
				p >= 1.23 && p < 1.6
					? "finder"
					: p >= 3.04 && p < 3.4
						? "terminal"
						: p >= 4.03 && p < 4.28
							? "address"
							: p >= 4.43 && p < 4.62
								? "repository"
								: "";
			const active = Math.min(7, Math.floor(p + 0.18));
			const index = Math.min(7, Math.floor(p));
			const t = p - index;
			const path = paths[index];
			const stopIndex = Math.max(
				0,
				path.reduce((last, stop, i) => (stop.at <= t ? i : last), 0),
			);
			const from = path[stopIndex];
			const to = path[Math.min(stopIndex + 1, path.length - 1)];
			const target = (selector: string) =>
				element.querySelector<HTMLElement>(selector);
			const positionCursor = () => {
				const fromElement = target(from.target);
				const toElement = target(to.target);
				const fromBox = fromElement?.getBoundingClientRect();
				const toBox = toElement?.getBoundingClientRect();
				if (cursor && fromBox && toBox) {
					const move = smooth(
						(t - from.at) / Math.max(0.01, to.at - from.at - 0.06),
					);
					const x =
						fromBox.left +
						Math.min(fromBox.width * 0.6, 130) +
						(toBox.left +
							Math.min(toBox.width * 0.6, 130) -
							fromBox.left -
							Math.min(fromBox.width * 0.6, 130)) *
							move;
					const y =
						fromBox.top +
						Math.min(fromBox.height * 0.55, 45) +
						(toBox.top +
							Math.min(toBox.height * 0.55, 45) -
							fromBox.top -
							Math.min(fromBox.height * 0.55, 45)) *
							move;
					cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
					const click = from.click ? clamp(1 - (t - from.at) / 0.055) : 0;
					if (pointer) pointer.style.transform = `scale(${1 - click * 0.2})`;
					if (ring) {
						ring.style.opacity = `${click}`;
						ring.style.transform = `translate(-50%, -50%) scale(${1 + (1 - click) * 1.8})`;
					}
					if (cursorLabel)
						cursorLabel.textContent =
							(move > 0.8 ? to.label : from.label) ?? "Scroll to move";
				}
			};
			cursorPaint.current = positionCursor;
			const state: Workflow = {
				active,
				slide: p < 2.34 ? 0 : p < 2.6 ? 1 : 2,
				finderQuery: p < 1 ? "" : typed("projects", (p - 1.3) / 0.28),
				browserQuery: p < 4 ? "" : typed("swap", (p - 4.46) / 0.13),
				address: typed("https://github.com/PHCitizen", (p - 4.03) / 0.23),
				terminal: typed("curl portfolio.local/projects", (p - 3.04) / 0.29),
				gitCommand: typed("git log --experience", (p - 5.02) / 0.24),
				presenting: p >= 2.14 && p < 2.78,
				executed: p >= 3.4,
				browserLoaded: p >= 4.28,
				gitReady: p >= 5.28,
				selectedFile: p >= 1.72 ? "projects.deck" : null,
				switcher: p >= 4.76 && p < 4.92,
				action: (t > 0.7 ? to.label : from.label) ?? "",
			};
			const signature = JSON.stringify(state);
			if (signature !== previousSignature) {
				previousSignature = signature;
				setWorkflow(state);
			}
			panels.forEach((panel, i) => {
				const opened = p >= i - 0.18;
				const depth = active - i;
				const enter = i === 0 ? 1 : smooth((p - i + 0.18) / 0.22);
				const current = i === active;
				const show = opened && depth < 3;
				panel.style.visibility = show ? "visible" : "hidden";
				panel.style.opacity = show ? `${i === 0 ? 1 : clamp(enter * 4)}` : "0";
				panel.style.zIndex = `${i + 1}`;
				panel.style.transformOrigin = `${20 + i * 8}% 115%`;
				panel.style.transform = `translate3d(${current ? (1 - enter) * 45 : -Math.max(0, depth) * 17}px, ${current ? (1 - enter) * 180 : -Math.max(0, depth) * 18}px, 0) scale(${current ? 0.24 + enter * 0.76 : 1 - Math.max(0, depth) * 0.035})`;
				panel.dataset.foreground = `${current}`;
				panel.inert = !current;
				const content = contents[i];
				if (content)
					content.scrollTop =
						i === 1 && p > 1.3
							? 0
							: clamp((p - i - 0.32) / 0.35) *
								(content.scrollHeight - content.clientHeight);
			});
			tokens.forEach((token, i) => {
				const drop = clamp((p - 6.05 - Math.sqrt(i) * 0.045) / 0.25);
				const fall = 1 - (1 - drop) ** 3;
				token.style.transform = `translateY(${(1 - fall) * -420}px) rotate(${(1 - fall) * (i % 2 ? 24 : -24)}deg)`;
				token.style.opacity = `${drop}`;
			});
			if (wallpaper)
				wallpaper.style.transform = `translate3d(0, ${-p * 20}px, 0)`;
			if (progress) progress.style.transform = `scaleX(${p / 7})`;
			positionCursor();
		}
		const request = () => {
			if (!frame) frame = requestAnimationFrame(paint);
		};
		window.addEventListener("scroll", request, { passive: true });
		window.addEventListener("resize", request);
		paint();
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", request);
			window.removeEventListener("resize", request);
		};
	}, [linear, root]);
	return [workflow, setWorkflow] as const;
}
