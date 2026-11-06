import SectionHeading from "./SectionHeading";

const profile = [
	["name", "Jayvee B. Embog"],
	["focus", "Backend Engineering"],
	["location", "Philippines 🇵🇭"],
	["education", "BS Computer Engineering"],
	["currently", "4th-year @ URS"],
	["looking_for", "240-hour OJT"],
];

export default function About() {
	return (
		<section
			className="scroll-mt-10 border-t border-white/10 py-16 lg:py-20"
			id="about"
		>
			<SectionHeading
				number="01"
				title="Behind the terminal"
				note="A LITTLE CONTEXT"
			/>
			<div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
				<div>
					<h3 className="mb-6 text-2xl font-medium leading-snug tracking-tight">
						Curiosity is the input.
						<br />
						<span className="text-[#8d9688]">
							Reliable software is the output.
						</span>
					</h3>
					<p className="mb-4 text-[13px] leading-7 text-[#92998e]">
						I’m Jayvee, a backend software engineer who enjoys figuring out how
						things work — and making them work better. I’ve spent two years
						building customer-facing products at{" "}
						<a
							className="text-[#61cf5a] underline decoration-[#3e6a3d] underline-offset-4"
							href="https://www.bitcoin.com/"
							target="_blank"
							rel="noreferrer"
						>
							bitcoin.com
						</a>
						, alongside freelance work in blockchain and decentralized
						applications.
					</p>
					<p className="mb-6 text-[13px] leading-7 text-[#92998e]">
						My comfort zone is somewhere between a well-designed API, a Linux
						terminal, and a tricky systems problem. I care about clean
						architecture, thoughtful trade-offs, and code that holds up in
						production.
					</p>
					<a
						className="inline-flex gap-3 font-mono text-[11px] text-[#bac6b4] transition-colors hover:text-[#61cf5a]"
						href="https://github.com/PHCitizen"
						target="_blank"
						rel="noreferrer"
					>
						<span className="text-[#61cf5a]">↳</span> github.com/PHCitizen{" "}
						<span>↗</span>
					</a>
				</div>
				<div className="self-center overflow-hidden border border-[#3b4b33]/70 bg-[#0f120e]">
					<div className="flex justify-between border-b border-[#3b4b33]/60 px-5 py-3 font-mono text-[10px] text-[#92998e]">
						<span>
							<span className="mr-2 text-[#61cf5a]">◇</span>developer.json
						</span>
						<span className="text-[#586451]">JSON</span>
					</div>
					<div className="overflow-x-auto px-4 py-5 font-mono text-[10px] leading-[26px] sm:px-6 sm:text-[11px]">
						<div className="text-[#747f6e]">{"{"}</div>
						{profile.map(([key, value]) => (
							<div className="whitespace-nowrap pl-4" key={key}>
								<span className="text-[#a6afa0]">"{key}"</span>:{" "}
								<span className="text-[#8cbd7b]">"{value}"</span>,
							</div>
						))}
						<div className="pl-4">
							<span className="text-[#a6afa0]">"open_to_work"</span>:{" "}
							<span className="text-[#d5d79b]">true</span>
						</div>
						<div className="text-[#747f6e]">{" }"}</div>
					</div>
					<div className="flex items-center gap-2 border-t border-[#3b4b33]/50 px-5 py-3 font-mono text-[9px] text-[#7e877b]">
						<span className="size-1 rounded-full bg-[#61cf5a]" /> Always
						learning. Always building.
					</div>
				</div>
			</div>
			<div className="mt-12 grid grid-cols-2 border-y border-[#3b4b33]/60 bg-[#61cf5a]/[0.015] py-7 sm:grid-cols-4">
				{[
					["02", "+", "YEARS OF EXPERIENCE"],
					["01", "↗", "MONERO BOUNTY WON"],
					["06", "", "CORE LANGUAGES"],
					["∞", "", "CURIOSITY TO BUILD"],
				].map(([value, suffix, label]) => (
					<div
						key={label}
						className="flex flex-col items-center gap-2 border-[#3b4b33]/60 py-3 sm:border-r sm:last:border-0"
					>
						<strong className="font-mono text-3xl font-normal">
							{value}
							<span className="text-[#61cf5a]">{suffix}</span>
						</strong>
						<span className="font-mono text-[8px] tracking-[0.13em] text-[#7e877b]">
							{label}
						</span>
					</div>
				))}
			</div>
		</section>
	);
}
