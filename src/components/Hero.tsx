const glyphs = " .:-=+*#%@";

function makeAscii() {
	const rows: string[] = [];
	for (let y = 0; y < 43; y++) {
		let row = "";
		for (let x = 0; x < 75; x++) {
			const nx = (x - 37) / 30;
			const ny = (y - 21) / 18;
			const radius = Math.sqrt(nx * nx + ny * ny);
			const angle = Math.atan2(ny, nx);
			const ring = Math.abs(radius - (0.7 + 0.13 * Math.sin(angle * 3 + 0.6)));
			const wave = Math.sin(x * 0.34 + y * 0.3) * Math.cos(y * 0.3 - x * 0.12);
			const value = Math.max(0, 1 - ring * 3.8) * (0.5 + wave * 0.45);
			row += glyphs[Math.min(9, Math.floor(value * 12))];
		}
		rows.push(row);
	}
	return rows.join("\n");
}
const ascii = makeAscii();

export default function Hero() {
	return (
		<section
			className="relative grid gap-12 pb-20 pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pb-28 lg:pt-20"
			id="home"
		>
			<div className="relative z-10">
				<div className="mb-8 inline-flex items-center gap-2.5 border border-[#3e6a3d]/50 bg-[#61cf5a]/[0.04] px-3 py-2 font-mono text-[9px] tracking-[0.1em] text-[#8fbd85]">
					<span className="size-1.5 rounded-full bg-[#61cf5a] shadow-[0_0_8px_#61cf5a70]" />{" "}
					AVAILABLE FOR OJT / BACKEND ROLES
				</div>
				<p className="mb-4 font-mono text-xs text-[#61cf5a] [&>span]:text-[#7e877b]">
					<span>~/portfolio</span> $ whoami
				</p>
				<h1 className="mb-6 font-mono text-[clamp(4rem,7.5vw,7rem)] leading-[0.98] font-bold tracking-[-0.09em]">
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
					<span className="text-[#61cf5a] motion-safe:animate-pulse">_</span>
				</h1>
				<h2 className="mb-4 text-lg font-medium tracking-tight sm:text-[22px]">
					Backend engineer.{" "}
					<span className="text-[#8e968a]">System thinker.</span>
				</h2>
				<p className="max-w-[420px] text-[13px] leading-7 text-[#92998e]">I build the logic behind the experience.<br />From scalable APIs to trustless protocols — turning complex problems into reliable software.</p>
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
					<span className="text-[#50864c]">14.5266° N, 121.1536° E</span>
				</div>
			</div>
			<div
				className="relative mt-4 self-start border border-[#3b4b33]/70 bg-[radial-gradient(ellipse_at_center,#142012_0%,#0b0d0b_70%)] lg:mt-9"
				aria-label="Abstract green ASCII sculpture"
			>
				<div className="flex justify-between border-b border-[#3b4b33]/50 px-4 py-3 font-mono text-[8px] tracking-widest text-[#7e877b] [&>span:first-child]:flex [&>span:first-child]:items-center [&>span:first-child]:gap-2">
					<span>
						<span className="size-1 rounded-full bg-[#61cf5a]" /> SYSTEM ONLINE
					</span>
					<span>RENDER_001</span>
				</div>
				<div className="relative flex h-[310px] items-center justify-center overflow-hidden sm:h-[365px]">
					<div className="absolute left-4 top-3 text-[#50864c]">+</div>
					<div className="absolute bottom-8 right-4 text-[#50864c]">+</div>
					<pre
						className="select-none font-mono text-[7px] leading-[7px] tracking-[1.1px] text-[#61cf5a] [text-shadow:0_0_12px_#61cf5a55] sm:text-[8px] sm:leading-[8px]"
						aria-hidden="true"
					>
						{ascii}
					</pre>
					<span className="absolute bottom-4 left-4 font-mono text-[8px] text-[#50864c]">
						[ x: 0.618, y: 1.000 ]
					</span>
				</div>
				<div className="flex justify-between border-t border-[#3b4b33]/50 px-4 py-3 font-mono text-[8px] tracking-widest text-[#7e877b]">
					<span>NO MAGIC. JUST LOGIC.</span>
					<span>
						60 FPS <span className="text-[#61cf5a]">▰ ▰ ▰ ▰</span>
					</span>
				</div>
				<div className="absolute -bottom-7 left-7 flex w-[85%] items-center gap-4 border border-[#3b4b33] bg-[#10140f] px-5 py-4 shadow-xl [&>div]:flex [&>div]:flex-col [&_strong]:text-xs [&_strong]:font-medium [&_div>span]:mt-1 [&_div>span]:font-mono [&_div>span]:text-[9px] [&_div>span]:text-[#7e877b]">
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
			<div className="col-span-full mt-7 flex justify-between font-mono text-[8px] tracking-[0.16em] text-[#7e877b] lg:mt-8 [&_a]:flex [&_a]:gap-3 [&_a:hover]:text-[#61cf5a]">
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
