import { skillGroups } from "../data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Skills() {
	return (
		<section
			className="scroll-mt-10 border-t border-white/10 py-16 lg:py-20"
			id="skills"
		>
			<SectionHeading
				number="04"
				title="Tools of the trade"
				note="MY EVERYDAY STACK"
			/>
			<div className="grid gap-px border border-[#3b4b33]/60 bg-[#3b4b33]/60 sm:grid-cols-2 lg:grid-cols-5">
				{skillGroups.map((group) => (
					<article
						className="bg-[#0d100c] p-5 transition-colors hover:bg-[#121910]"
						key={group.name}
					>
						<span className="font-mono text-2xl text-[#61cf5a]">
							{group.icon}
						</span>
						<h3 className="mb-5 mt-4 text-xs font-medium">{group.name}</h3>
						<div className="flex flex-wrap gap-x-3 gap-y-2 lg:flex-col">
							{group.items.map((item) => (
								<span
									className="font-mono text-[10px] leading-5 text-[#939e8b]"
									key={item}
								>
									{item}
								</span>
							))}
						</div>
					</article>
				))}
			</div>
			<div className="mt-8 flex flex-col gap-5 border border-[#3b4b33]/60 bg-[#61cf5a]/[0.02] p-6 sm:flex-row sm:items-center">
				<span className="text-3xl text-[#61cf5a]">⌂</span>
				<div>
					<span className="font-mono text-[8px] tracking-widest text-[#63ad58]">
						THE FOUNDATION
					</span>
					<h3 className="mt-2 text-sm font-medium">BS Computer Engineering</h3>
					<p className="mt-2 text-xs text-[#92998e]">
						University of Rizal System · Antipolo Campus
					</p>
				</div>
				<div className="font-mono text-xs text-[#bbc6b3] sm:ml-auto sm:text-right">
					2023 — 2027{" "}
					<span className="ml-2 text-[7px] text-[#63ad58]">EXPECTED</span>
					<p className="mt-3 max-w-[280px] text-[9px] leading-5 text-[#7e877b]">
						Data structures. Networks. Systems. And everything in between.
					</p>
				</div>
			</div>
		</section>
	);
}
