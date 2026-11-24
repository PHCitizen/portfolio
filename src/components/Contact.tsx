import { useState } from "react";
import ContactForm from "./ContactForm";
import SectionHeading from "./SectionHeading";

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
	const Panel = embedded ? "section" : "div";
	const PanelHeading = embedded ? "h2" : "h3";
	const panel = (
		<Panel className="relative grid gap-8 overflow-hidden border border-[#3b4b33]/70 bg-[radial-gradient(ellipse_at_bottom_right,#1b2c16_0%,#0e130d_65%)] px-5 py-10 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 lg:py-14">
			<div className="relative z-10 min-w-0">
				<PanelHeading className="relative z-10 text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.15] font-semibold tracking-[-0.04em]">
					Have a problem worth
					<br />
					<span className="text-[#61cf5a]">solving together?</span>
					<span className="text-[#61cf5a]">_</span>
				</PanelHeading>
				<p className="relative z-10 mt-6 text-base leading-7 text-[#92998e]">
					I’m looking for a backend OJT placement and meaningful opportunities.
					<br />
					Let’s build something that makes a difference.
				</p>
				<div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
					<a
						href="mailto:embogjayvee@gmail.com"
						className="inline-flex items-center gap-2 bg-[#61cf5a] px-3 py-3.5 font-mono text-xs font-bold text-[#0b0d0b] transition-colors hover:bg-[#8be784] sm:gap-8 sm:px-5 sm:text-base"
					>
						embogjayvee@gmail.com
					</a>
					<button
						className="cursor-pointer border border-[#3b4b33] px-4 py-3.5 font-mono text-sm text-[#a9b49f] transition-colors hover:border-[#61cf5a] hover:text-[#61cf5a]"
						type="button"
						onClick={copyEmail}
						aria-label="Copy email address"
					>
						{copied ? "✓ Copied" : "⧉ Copy"}
					</button>
				</div>
				<output
					className="relative z-10 block min-h-6 pt-2 font-mono text-sm text-[#61cf5a]"
					aria-live="polite"
				>
					{copyError ? "Please copy manually: embogjayvee@gmail.com" : ""}
				</output>
				<div className="relative z-10 mt-7 flex flex-wrap gap-4 font-mono text-sm text-[#7e877b] [&_a:hover]:text-[#61cf5a] [&>span:not(:last-child)]:text-[#3b4b33]">
					<a
						href="https://github.com/PHCitizen"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
					<span>/</span>
					<span>Angono, Rizal, PH</span>
				</div>
			</div>
			<ContactForm />
			<span
				className="pointer-events-none absolute right-3 bottom-5 hidden select-none font-mono text-[240px] leading-none tracking-[-0.2em] text-[#61cf5a]/[0.045] lg:block"
				aria-hidden="true"
			>
				{"{ }"}
			</span>
		</Panel>
	);

	if (embedded) return panel;

	return (
		<section
			className="mb-16 scroll-mt-10 border-t border-white/10 pt-16 lg:pt-20"
			id="contact"
			aria-labelledby="contact-title"
		>
			<SectionHeading
				id="contact-title"
				number="05"
				title="Open for the next chapter"
				sticky={false}
			/>
			{panel}
		</section>
	);
}
