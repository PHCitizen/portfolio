import { useState } from "react";
import { projects } from "../data/portfolio";
import SectionHeading from "./SectionHeading";

function ProjectVisual({ type }: { type: string }) {
	if (type === "swap")
		return (
			<div className="flex items-center gap-4">
				<span className="flex size-16 -rotate-12 items-center justify-center rounded-full border border-[#61cf5a]/60 bg-[#61cf5a]/10 font-mono text-4xl text-[#61cf5a] shadow-[0_0_30px_#61cf5a10]">
					₿
				</span>
				<div className="flex flex-col items-center gap-2 font-mono text-[#50864c]">
					<span>← ─ ─ →</span>
					<small className="text-[6px] tracking-wider">
						TRUSTLESS PROTOCOL
					</small>
					<span>← ─ ─ →</span>
				</div>
				<span className="flex size-16 rotate-12 items-center justify-center rounded-full border border-[#61cf5a]/60 bg-[#61cf5a]/10 font-mono text-4xl text-[#61cf5a]">
					ɱ
				</span>
			</div>
		);
	if (type === "schedule")
		return (
			<div className="w-[220px] -rotate-3 border border-[#3e6a3d] bg-[#0c120b] p-3 shadow-xl">
				<div className="mb-3 flex justify-between font-mono text-[8px] text-[#889580]">
					scheduler.py <span className="text-[#61cf5a]">● SOLVED</span>
				</div>
				<div className="grid grid-cols-7 gap-1">
					{Array.from({ length: 35 }, (_, i) => (
						<span
							key={`cell-${i}`}
							className={`h-3 ${i % 4 === 0 || i % 7 === 2 ? "border border-[#61cf5a]/50 bg-[#50864c]/50" : i % 5 === 0 ? "bg-[#3b4b33]/60" : "bg-[#172014]"}`}
						/>
					))}
				</div>
				<div className="mt-3 font-mono text-[6px] text-[#63ad58]">
					0 CONFLICTS / ALL CONSTRAINTS SATISFIED
				</div>
			</div>
		);
	return (
		<div className="grid w-[220px] -rotate-3 grid-cols-11 gap-1 border border-[#3b4b33] bg-[#0b100a] p-2">
			{Array.from({ length: 77 }, (_, i) => (
				<span
					key={`tile-${i}`}
					className={`flex h-3.5 items-center justify-center text-[10px] ${i % 2 === 0 && Math.floor(i / 11) % 2 === 0 ? "border border-[#50864c]/50 bg-[#3b4b33]/70" : [16, 38, 58].includes(i) ? "text-[#c6ce83]" : [26, 49].includes(i) ? "bg-[#61cf5a]/10 text-[#61cf5a]" : "bg-[#152011]/70"}`}
				>
					{[16, 38, 58].includes(i) ? "●" : [26, 49].includes(i) ? "✚" : ""}
				</span>
			))}
		</div>
	);
}

export default function Projects() {
	const [expanded, setExpanded] = useState<string | null>(null);
	return (
		<section
			className="scroll-mt-10 border-t border-white/10 py-16 lg:py-20"
			id="projects"
		>
			<SectionHeading
				number="03"
				title="Selected work"
				note="BUILT. SHIPPED. ITERATED."
			/>
			<div className="grid gap-5 md:grid-cols-3">
				{projects.map((project) => (
					<article
						className="group flex flex-col border border-[#3b4b33]/60 bg-[#0f120e] transition-colors hover:border-[#50864c]"
						key={project.id}
					>
						<div className="relative flex h-52 items-center justify-center overflow-hidden border-b border-[#3b4b33]/60 bg-[linear-gradient(#61cf5a05_1px,transparent_1px),linear-gradient(90deg,#61cf5a05_1px,transparent_1px)] bg-[size:20px_20px]">
							<span className="absolute left-4 top-3 font-mono text-[8px] tracking-widest text-[#586451]">
								PROJECT_{project.id}
							</span>
							<div className="transition-transform duration-500 group-hover:scale-105">
								<ProjectVisual type={project.visual} />
							</div>
							<span className="absolute bottom-3 right-4 text-[#50864c]">
								↗
							</span>
						</div>
						<div className="flex flex-1 flex-col p-5">
							<span className="font-mono text-[7px] tracking-[0.14em] text-[#63ad58]">
								{project.category}
							</span>
							<h3 className="mt-3 text-lg font-medium tracking-tight">
								{project.name}
							</h3>
							<p className="mt-3 flex-1 text-xs leading-6 text-[#92998e]">
								{project.description}
							</p>
							<div className="mt-5 flex flex-wrap gap-2">
								{project.tags.map((tag) => (
									<span
										className="border border-[#3b4b33]/70 px-2 py-1 font-mono text-[8px] text-[#93aa87]"
										key={tag}
									>
										{tag}
									</span>
								))}
							</div>
							<div className="mt-5 flex items-center justify-between border-t border-[#3b4b33]/60 pt-4">
								<span className="font-mono text-[7px] tracking-wide text-[#7e877b]">
									{project.badge}
								</span>
								{project.href ? (
									<a
										className="text-[#61cf5a] transition-transform hover:-translate-y-1"
										href={project.href}
										target="_blank"
										rel="noreferrer"
										aria-label={`View ${project.name} on GitHub`}
									>
										↗
									</a>
								) : (
									<button
										className="cursor-pointer px-2 text-[#61cf5a]"
										type="button"
										aria-expanded={expanded === project.id}
										aria-label="Show scheduling project details"
										onClick={() =>
											setExpanded(expanded === project.id ? null : project.id)
										}
									>
										{expanded === project.id ? "−" : "+"}
									</button>
								)}
							</div>
							{expanded === project.id && (
								<p className="mt-4 border-t border-[#3b4b33] pt-4 text-xs leading-6 text-[#92998e]">
									{project.detail}. Led a six-member team to build REST APIs and
									administrative interfaces, with pilot testing at URS Antipolo
									for Semester 1, AY 2026–2027.
								</p>
							)}
						</div>
					</article>
				))}
			</div>
			<a
				className="mx-auto mt-8 flex w-fit gap-4 font-mono text-[10px] text-[#9aac90] transition-colors hover:text-[#61cf5a]"
				href="https://github.com/PHCitizen"
				target="_blank"
				rel="noreferrer"
			>
				More experiments on GitHub <span>↗</span>
			</a>
		</section>
	);
}
