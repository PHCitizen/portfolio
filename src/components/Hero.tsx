import { useEffect, useState } from "react";
import HeroAscii from "./HeroAscii";
import styles from "./Hero.module.css";

export default function Hero() {
	const [phase, setPhase] = useState<"idle" | "typing" | "loading" | "ready">(
		"idle",
	);
	const [command, setCommand] = useState("");
	const [skipped, setSkipped] = useState(false);
	const introActive = phase === "typing" || phase === "loading";

	useEffect(() => {
		const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (skipped || preference.matches || window.location.hash) return;

		setPhase("typing");
		const timers = [..."whoami"].map((_, index) =>
			window.setTimeout(
				() => setCommand("whoami".slice(0, index + 1)),
				300 + index * 110,
			),
		);
		timers.push(window.setTimeout(() => setPhase("loading"), 1050));
		timers.push(window.setTimeout(() => setPhase("ready"), 2050));
		const finish = () => {
			if (preference.matches) {
				for (const timer of timers) window.clearTimeout(timer);
				setPhase("ready");
			}
		};
		preference.addEventListener("change", finish);
		return () => {
			for (const timer of timers) window.clearTimeout(timer);
			preference.removeEventListener("change", finish);
		};
	}, [skipped]);

	return (
		<section
			className={`${styles.hero} relative pb-20 pt-16 lg:pb-28 lg:pt-20`}
			id="home"
			data-phase={phase}
		>
			<div className={styles.split}>
				<div className={styles.profile}>
					<div className={styles.paneHeader}>
						<span>jayvee@portfolio: ~</span>
						<span>PROFILE</span>
					</div>
					<div className={styles.profileBody}>
						<div className="mb-8 font-mono text-xs">
							<div className="flex h-10 items-center justify-between gap-4">
								<p className="text-[#61cf5a]" aria-label="~/portfolio $ whoami">
									<span className="text-[#7e877b]">~/portfolio</span>{" "}
									<span aria-hidden="true">
										$ {introActive ? command : "whoami"}
										{phase === "typing" && (
											<span
												className={`${styles.cursor} ml-1 inline-block h-[1em] w-2 translate-y-0.5 bg-[#61cf5a]`}
											/>
										)}
									</span>
								</p>
								{introActive && (
									<button
										type="button"
										onClick={() => {
											setSkipped(true);
											setPhase("ready");
										}}
										className="shrink-0 py-2 text-[#92998e] transition-colors hover:text-[#61cf5a]"
									>
										Skip intro
									</button>
								)}
							</div>
							<div
								className="mt-2 flex h-5 items-center gap-3 text-[#92998e]"
								role="status"
							>
								{phase === "loading" && (
									<>
										<span
											className={`${styles.loader} flex gap-1`}
											aria-hidden="true"
										>
											<i />
											<i />
											<i />
										</span>
										Loading profile…
									</>
								)}
							</div>
						</div>
						<div className={styles.content} inert={introActive}>
							<div className="relative z-10">
								<div className="mb-8 inline-flex items-center gap-2.5 border border-[#3e6a3d]/50 bg-[#61cf5a]/[0.04] px-3 py-2 font-mono text-[9px] tracking-[0.1em] text-[#8fbd85]">
									<span className="size-1.5 rounded-full bg-[#61cf5a] shadow-[0_0_8px_#61cf5a70]" />{" "}
									AVAILABLE FOR OJT / BACKEND ROLES
								</div>
								<h1 className="mb-6 font-mono text-[clamp(3rem,6vw,5.5rem)] leading-[0.98] font-bold tracking-[-0.09em]">
									<span
										className="relative inline-block before:absolute before:inset-0 before:translate-x-[3px] before:text-[#b8cfb3] before:opacity-35 before:[clip-path:inset(35%_0_57%_0)] before:content-[attr(data-text)]"
										data-text="JAYVEE"
									>
										JAYVEE
									</span>
									<br />
									<span
										className="relative inline-block text-[#61cf5a] before:absolute before:inset-0 before:-translate-x-[4px] before:text-[#bcf2aa] before:[clip-path:inset(61%_0_31%_0)] before:content-[attr(data-text)] after:absolute after:inset-0 after:translate-x-[5px] after:[clip-path:inset(23%_0_72%_0)] after:content-[attr(data-text)]"
										data-text="EMBOG."
									>
										EMBOG.
									</span>
									<span className="text-[#61cf5a] motion-safe:animate-pulse">
										_
									</span>
								</h1>
								<h2 className="mb-4 text-lg font-medium tracking-tight sm:text-[22px]">
									Backend engineer.{" "}
									<span className="text-[#8e968a]">System thinker.</span>
								</h2>
								<p className="max-w-[420px] text-[13px] leading-7 text-[#92998e]">
									I build the logic behind the experience.
									<br />
									From scalable APIs to trustless protocols — turning complex
									problems into reliable software.
								</p>
								<div className="mt-8 flex flex-wrap gap-3">
									<a
										href="#projects"
										className="inline-flex items-center gap-5 border border-[#61cf5a] bg-[#61cf5a] px-5 py-3.5 font-mono text-xs font-bold text-[#0b0d0b] transition-colors hover:bg-[#8be784]"
									>
										<span>⌘</span> Explore my work <span>↗</span>
									</a>
									<a
										href="mailto:embogjayvee@gmail.com"
										className="inline-flex items-center gap-6 border border-[#3b4b33] px-5 py-3.5 font-mono text-xs transition-colors hover:border-[#61cf5a] hover:text-[#61cf5a]"
									>
										Let’s connect <span>↗</span>
									</a>
								</div>
								<div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[9px] text-[#7e877b]">
									<span>⌖</span> Angono, Rizal, Philippines{" "}
									<span className="mx-1 text-[#3b4b33]">/</span>
									<span className="text-[#50864c]">
										14.5266° N, 121.1536° E
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className={styles.renderPane}
					aria-label="Abstract green ASCII sculpture"
				>
					<div className={styles.paneHeader}>
						<span>
							<span className="size-1 rounded-full bg-[#61cf5a]" /> SYSTEM
							ONLINE
						</span>
						<span>RENDER_001</span>
					</div>
					<div className={styles.renderViewport}>
						<div className="absolute left-4 top-3 text-[#50864c]">+</div>
						<div className="absolute bottom-8 right-4 text-[#50864c]">+</div>
						<HeroAscii />
						<span className="absolute bottom-4 left-4 font-mono text-[8px] text-[#50864c]">
							[ x: 0.618, y: 1.000 ]
						</span>
					</div>
					<div className="flex justify-between border-t border-[#3b4b33]/50 px-4 py-3 font-mono text-[8px] tracking-widest text-[#7e877b]">
						<span>NO MAGIC. JUST LOGIC.</span>
						<span>
							LIVE ASCII <span className="text-[#61cf5a]">▰ ▰ ▰ ▰</span>
						</span>
					</div>
					<div className="flex items-center gap-4 border-t border-[#3b4b33] bg-[#10140f] px-5 py-5 [&>div]:flex [&>div]:flex-col [&_strong]:text-xs [&_strong]:font-medium [&_div>span]:mt-1 [&_div>span]:font-mono [&_div>span]:text-[9px] [&_div>span]:text-[#7e877b]">
						<span className="font-mono text-xl text-[#61cf5a]">&gt;_</span>
						<div>
							<strong>Building with purpose.</strong>
							<span>
								One commit at a time<span className="text-[#61cf5a]">_</span>
							</span>
						</div>
						<span className="ml-auto tracking-widest text-[#50864c]">•••</span>
					</div>
				</div>
			</div>
			<div className="mt-7 flex justify-between font-mono text-[8px] tracking-[0.16em] text-[#7e877b] lg:mt-8 [&_a]:flex [&_a]:gap-3 [&_a:hover]:text-[#61cf5a]">
				<a href="#about">
					<span className="text-[#61cf5a]">↓</span> SCROLL TO EXPLORE
				</a>
				<span>
					TYPE LESS. <span className="text-[#61cf5a]">BUILD MORE.</span>
				</span>
			</div>
		</section>
	);
}
