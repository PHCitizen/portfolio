import { useCallback, useLayoutEffect, useRef } from "react";
import { BOOT_LOG, BOOT_READY_URL } from "../data/portfolioBootLog";
import styles from "./PortfolioBoot.module.css";

const LOG_LINES = BOOT_LOG.split("\n");
const LOG_START_MS = 100;
const LOG_READY_MS = 1000;
const LOG_INTERVAL_MS = (LOG_READY_MS - LOG_START_MS) / (LOG_LINES.length - 1);
const SCROLL_KEYS = new Set([
	"ArrowUp",
	"ArrowDown",
	"PageUp",
	"PageDown",
	"Home",
	"End",
	" ",
]);
const LOG_TOKEN =
	/(\[[a-z]+\]|\bWARN\b|\bERR\b|\bECONNREFUSED\b|\b(?:ok|ready|healthy|done|complete)\b|\b[a-z]+:\/\/[^\s)]+|\bv\d+(?:\.\d+)+\b)/g;

function tokenClass(text: string) {
	if (text.startsWith("[")) return styles.source;
	if (text === "WARN") return styles.warning;
	if (text === "ERR" || text === "ECONNREFUSED") return styles.error;
	if (text.includes("://") || text.startsWith("v")) return styles.value;
	return styles.success;
}

const LOG_ROWS = LOG_LINES.map((line, index) => ({
	key: `${index}:${line}`,
	delay: `${LOG_START_MS + index * LOG_INTERVAL_MS}ms`,
	parts: line.split(LOG_TOKEN).map((text, part) => ({
		text,
		key: `${part}:${text}`,
		className: part % 2 ? tokenClass(text) : undefined,
	})),
}));

export default function PortfolioBoot({ onEnable }: { onEnable: () => void }) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const logRef = useRef<HTMLElement>(null);

	const dismiss = useCallback(() => {
		const dialog = dialogRef.current;
		if (!dialog?.open) return;
		const hadFocus = dialog.contains(document.activeElement);
		dialog.close();
		if (hadFocus) {
			document.getElementById("main-content")?.focus({ preventScroll: true });
		}
	}, []);

	const continueToPortfolio = () => {
		onEnable();
		dismiss();
	};

	useLayoutEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog?.open) return;
		if (window.location.hash || window.scrollY > 0) {
			dialog.close();
			return;
		}
		// Use a nonmodal dialog so a wheel or swipe can still scroll the page.
		// Start the log and its auto-follow together after hydration.
		dialog.dataset.ready = "true";
		const log = logRef.current;
		let frame = 0;
		if (log) {
			log.focus({ preventScroll: true });
			log.scrollTop = 0;
			const rows = log.querySelectorAll("li");
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				log.scrollTop = log.scrollHeight;
			} else {
				const start = performance.now();
				let lastRow = -1;
				const follow = (now: number) => {
					if (!dialog.open) return;
					const index = Math.min(
						rows.length - 1,
						Math.floor((now - start - LOG_START_MS) / LOG_INTERVAL_MS),
					);
					const row = rows[index];
					if (row && index !== lastRow) {
						log.scrollTop = row.offsetTop + row.offsetHeight - log.clientHeight;
						lastRow = index;
					}
					if (index < rows.length - 1) frame = requestAnimationFrame(follow);
				};
				frame = requestAnimationFrame(follow);
			}
		}
		// Watch scroll intent too: the gesture may start over the boot log, or
		// in a direction where the page cannot scroll yet.
		const onWheel = (event: WheelEvent) => {
			if (!event.ctrlKey && (event.deltaX || event.deltaY)) dismiss();
		};
		const onTouchMove = (event: TouchEvent) => {
			if (event.touches.length === 1) dismiss();
		};
		const onFocusIn = (event: FocusEvent) => {
			if (event.target instanceof Node && !dialog.contains(event.target)) {
				dialog.close();
			}
		};
		const stopListening = () => {
			cancelAnimationFrame(frame);
			dialog.removeEventListener("wheel", onWheel);
			dialog.removeEventListener("touchmove", onTouchMove);
			window.removeEventListener("scroll", dismiss);
			document.removeEventListener("focusin", onFocusIn);
		};
		dialog.addEventListener("wheel", onWheel, { passive: true });
		dialog.addEventListener("touchmove", onTouchMove, { passive: true });
		window.addEventListener("scroll", dismiss, { passive: true });
		document.addEventListener("focusin", onFocusIn);
		dialog.addEventListener("close", stopListening);
		return () => {
			stopListening();
			dialog.removeEventListener("close", stopListening);
		};
	}, [dismiss]);

	return (
		<dialog
			open
			ref={dialogRef}
			className={styles.dialog}
			aria-label="Portfolio loading screen"
			onClick={(event) => {
				// Leave Continue and the ready link to their own activation handlers.
				if (
					event.target instanceof Element &&
					!event.target.closest("a, button")
				) {
					dismiss();
				}
			}}
			onKeyDown={(event) => {
				if (
					event.key === "Escape" ||
					(SCROLL_KEYS.has(event.key) &&
						!(event.key === " " && event.target instanceof HTMLButtonElement))
				) {
					dismiss();
				}
			}}
		>
			<div className={styles.layout}>
				<div className={`${styles.terminal} font-mono`}>
					<div className={styles.terminalBar}>
						<span>portfolio@linux:~</span>
					</div>
					<div className={styles.console}>
						<p className={styles.command}>
							<span>$</span> ./portfolio boot --trace
						</p>
						<section
							ref={logRef}
							className={styles.logWindow}
							aria-label="Simulated boot log"
							// biome-ignore lint/a11y/noNoninteractiveTabindex: Focus the transcript so keyboard users can dismiss the screen.
							tabIndex={0}
						>
							<ul className={styles.log}>
								{LOG_ROWS.map(({ parts, key, delay }) => (
									<li key={key} style={{ animationDelay: delay }}>
										{parts.map(({ text, key, className }) =>
											text === BOOT_READY_URL ? (
												<a
													key={key}
													href={BOOT_READY_URL}
													className={`${className} ${styles.readyLink}`}
													onClick={(event) => {
														if (
															event.metaKey ||
															event.ctrlKey ||
															event.shiftKey ||
															event.altKey
														)
															return;
														event.preventDefault();
														continueToPortfolio();
													}}
												>
													{text}
												</a>
											) : (
												<span key={key} className={className}>
													{text}
												</span>
											),
										)}
									</li>
								))}
							</ul>
						</section>
					</div>
				</div>
				<button
					className={`${styles.continue} font-mono`}
					type="button"
					style={{ animationDelay: `${LOG_READY_MS}ms` }}
					onClick={continueToPortfolio}
				>
					Continue
					<svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
						<path
							d="M2 8h11m-4-4 4 4-4 4"
							stroke="currentColor"
							strokeWidth="1.5"
						/>
					</svg>
				</button>
			</div>
		</dialog>
	);
}
