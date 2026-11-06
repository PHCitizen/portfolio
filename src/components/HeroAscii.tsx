import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

const glyphs = " .:-=+*#%@";

function makeAscii(time: number) {
	const rows: string[] = [];
	for (let y = 0; y < 43; y++) {
		let row = "";
		for (let x = 0; x < 75; x++) {
			const nx = (x - 37) / 30;
			const ny = (y - 21) / 18;
			const radius = Math.sqrt(nx * nx + ny * ny);
			const angle = Math.atan2(ny, nx);
			const ring = Math.abs(radius - (0.7 + 0.13 * Math.sin(angle * 3 + time)));
			const wave =
				Math.sin(x * 0.34 + y * 0.3 + time * 1.4) *
				Math.cos(y * 0.3 - x * 0.12 - time);
			const value = Math.max(0, 1 - ring * 3.8) * (0.5 + wave * 0.45);
			row += glyphs[Math.min(9, Math.floor(value * 12))];
		}
		rows.push(row);
	}
	return rows.join("\n");
}

const initialFrame = makeAscii(0.6);

export default function HeroAscii() {
	const output = useRef<HTMLPreElement>(null);
	const elapsed = useRef(0);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		const element = output.current;
		if (!element || paused) return;
		const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
		let visible = false;
		let frame = 0;
		let last = 0;
		const draw = (now: number) => {
			if (now - last >= 1000 / 12) {
				// Bound text repaint to 12fps, without a React render per frame.
				elapsed.current += last ? Math.min(now - last, 100) / 1000 : 0;
				last = now;
				element.textContent = makeAscii(0.6 + elapsed.current * 0.55);
			}
			frame = window.requestAnimationFrame(draw);
		};
		const sync = () => {
			window.cancelAnimationFrame(frame);
			last = 0;
			if (visible && !document.hidden && !preference.matches) {
				frame = window.requestAnimationFrame(draw);
			}
		};
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			sync();
		});
		observer.observe(element);
		document.addEventListener("visibilitychange", sync);
		preference.addEventListener("change", sync);
		return () => {
			window.cancelAnimationFrame(frame);
			observer.disconnect();
			document.removeEventListener("visibilitychange", sync);
			preference.removeEventListener("change", sync);
		};
	}, [paused]);

	return (
		<>
			<pre ref={output} className={styles.ascii} aria-hidden="true">
				{initialFrame}
			</pre>
			<button
				type="button"
				className={styles.renderControl}
				aria-pressed={paused}
				onClick={() => setPaused(!paused)}
			>
				{paused ? "Resume render" : "Pause render"}
			</button>
		</>
	);
}
