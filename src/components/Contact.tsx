import { useState } from "react";

export default function Contact({ embedded = false }: { embedded?: boolean }) {
	const [copied, setCopied] = useState(false);
	const [copyError, setCopyError] = useState(false);
	async function copyEmail() {
		try {
			await navigator.clipboard.writeText("embogjayvee@gmail.com");
			setCopied(true);
			setCopyError(false);
			window.setTimeout(() => setCopied(false), 2500);
		} catch {
			setCopyError(true);
		}
	}
	return (
		<section
			className="relative mb-16 scroll-mt-10 overflow-hidden border border-[#3b4b33]/70 bg-[radial-gradient(ellipse_at_bottom_right,#1b2c16_0%,#0e130d_65%)] px-6 py-14 sm:px-12 lg:py-20"
			id={embedded ? undefined : "contact"}
		>
			<div className="relative z-10 mb-6 flex items-center gap-2 font-mono text-[8px] tracking-[0.15em] text-[#8db47e]">
				<span className="size-1.5 rounded-full bg-[#61cf5a] shadow-[0_0_8px_#61cf5a70]" />{" "}
				05 / OPEN FOR THE NEXT CHAPTER
			</div>
			<h2 className="relative z-10 text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.15] font-semibold tracking-[-0.04em]">
				Have a problem worth
				<br />
				<span className="text-[#61cf5a]">solving together?</span>
				<span className="text-[#61cf5a]">_</span>
			</h2>
			<p className="relative z-10 mt-6 text-xs leading-7 text-[#92998e]">
				I’m looking for a backend OJT placement and meaningful opportunities.
				<br />
				Let’s build something that makes a difference.
			</p>
			<div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
				<a
					href="mailto:embogjayvee@gmail.com"
					className="inline-flex items-center gap-4 bg-[#61cf5a] px-4 py-3.5 font-mono text-[10px] font-bold text-[#0b0d0b] transition-colors hover:bg-[#8be784] sm:gap-8 sm:px-5 sm:text-xs"
				>
					embogjayvee@gmail.com <span>↗</span>
				</a>
				<button
					className="cursor-pointer border border-[#3b4b33] px-4 py-3.5 font-mono text-[10px] text-[#a9b49f] transition-colors hover:border-[#61cf5a] hover:text-[#61cf5a]"
					type="button"
					onClick={copyEmail}
					aria-label="Copy email address"
				>
					{copied ? "✓ Copied" : "⧉ Copy"}
				</button>
			</div>
			<output
				className="relative z-10 block min-h-6 pt-2 font-mono text-[10px] text-[#61cf5a]"
				aria-live="polite"
			>
				{copyError
					? "Please copy manually: embogjayvee@gmail.com"
					: copied
						? "Email copied to clipboard."
						: ""}
			</output>
			<div className="relative z-10 mt-7 flex flex-wrap gap-4 font-mono text-[9px] text-[#7e877b] [&_a:hover]:text-[#61cf5a] [&>span:not(:last-child)]:text-[#3b4b33]">
				<a href="https://github.com/PHCitizen" target="_blank" rel="noreferrer">
					GitHub ↗
				</a>
				<span>/</span>
				<span>Angono, Rizal, PH</span>
			</div>
			<span
				className="pointer-events-none absolute -right-4 bottom-0 hidden select-none font-mono text-[240px] leading-none tracking-[-0.2em] text-[#61cf5a]/[0.045] lg:block"
				aria-hidden="true"
			>
				{"{ }"}
			</span>
		</section>
	);
}
