import { useEffect, useRef, useState } from "react";
import { projects } from "../data/portfolio";
import SectionHeading from "./SectionHeading";

function ProjectVisual({ type }: { type: string }) {
	if (type === "swap")
		return (
			<div className="flex items-center gap-4">
				<span className="flex size-16 -rotate-12 items-center justify-center rounded-full border border-[#61cf5a]/60 bg-[#61cf5a]/10 font-mono text-4xl text-[#61cf5a] shadow-[0_0_30px_#61cf5a10]">
					₿
				</span>
				<div className="flex flex-col items-center gap-2 font-mono text-[#61cf5a]">
					<span>← ─ ─ →</span>
					<small className="text-[8px] tracking-wider">
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
	if (type === "hackathon" || type === "contest")
		return (
			<div
				className="flex w-[220px] -rotate-3 items-center gap-4 border border-[#3b4b33] bg-[#0c120b] p-4"
				aria-hidden="true"
			>
				<svg
					aria-hidden="true"
					className="size-10 shrink-0 text-[#61cf5a]"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M8 21h8m-4-5v5M7 4h10v7a5 5 0 0 1-10 0V4ZM7 6H3v2a4 4 0 0 0 4 4m10-6h4v2a4 4 0 0 1-4 4" />
				</svg>
				<div className="border-l border-[#3b4b33] pl-4 font-mono">
					<div className="text-xs text-[#93aa87]">
						{type === "contest" ? "URSTAMP" : "BUILD4CAMPUS"}
					</div>
					<div className="mt-1 text-2xl text-[#61cf5a]">
						{type === "contest" ? "1ST PLACE" : "TOP 10"}
					</div>
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

const newestProjects = [...projects].reverse();
const SCROLL_LEAD_IN = 80;

export default function Projects() {
	const [expanded, setExpanded] = useState<string | null>(null);
	const runwayRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const rowRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const runway = runwayRef.current;
		const stage = stageRef.current;
		const heading = headingRef.current;
		const row = rowRef.current;
		if (!runway || !stage || !heading || !row) return;

		const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
		let distance = 0;
		let stickyTop = 0;
		let frame = 0;
		let lastPosition = -1;

		const syncScroll = () => {
			frame = 0;
			if (!distance) return;
			const position = Math.round(
				Math.min(
					distance,
					Math.max(
						0,
						stickyTop - runway.getBoundingClientRect().top - SCROLL_LEAD_IN,
					),
				),
			);
			if (position !== lastPosition) {
				row.scrollLeft = position;
				lastPosition = position;
			}
		};

		const onScroll = () => {
			if (distance && !frame) frame = requestAnimationFrame(syncScroll);
		};

		const measure = () => {
			const headingHeight = heading.offsetHeight;
			const rowHeight = row.offsetHeight;
			stage.style.setProperty("--project-heading-height", `${headingHeight}px`);
			stage.style.setProperty("--project-row-height", `${rowHeight}px`);
			stickyTop = Number.parseFloat(getComputedStyle(stage).top);
			// Check the content without the centering gap so toggling it can't affect eligibility.
			const fits =
				headingHeight + rowHeight + stickyTop + 8 <= window.innerHeight;
			const nextDistance =
				!motion.matches && fits ? row.scrollWidth - row.clientWidth : 0;
			if (nextDistance !== distance) {
				distance = nextDistance;
				lastPosition = -1;
				stage.toggleAttribute("data-scroll-driven", distance > 0);
				// Keep the section pinned through the lead-in and the full horizontal travel.
				const travel = distance > 0 ? SCROLL_LEAD_IN + distance : 0;
				runway.style.setProperty("--project-travel", `${travel}px`);
			}
			onScroll();
		};

		const observer = new ResizeObserver(measure);
		observer.observe(heading);
		observer.observe(row);
		motion.addEventListener("change", measure);
		window.addEventListener("resize", measure);
		window.addEventListener("scroll", onScroll, { passive: true });
		measure();

		return () => {
			observer.disconnect();
			motion.removeEventListener("change", measure);
			window.removeEventListener("resize", measure);
			window.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(frame);
			stage.removeAttribute("data-scroll-driven");
			stage.style.removeProperty("--project-heading-height");
			stage.style.removeProperty("--project-row-height");
			runway.style.removeProperty("--project-travel");
		};
	}, []);

	return (
		<section
			className="scroll-mt-10 border-t border-white/10 py-16 lg:py-20"
			id="projects"
			aria-labelledby="projects-title"
		>
			<div
				ref={runwayRef}
				className="after:block after:h-[var(--project-travel,0px)]"
			>
				<div
					ref={stageRef}
					className="group/work top-(--site-header-height) data-scroll-driven:sticky"
				>
					<div ref={headingRef} className="pb-3">
						<SectionHeading
							id="projects-title"
							number="03"
							title="Selected projects"
							note="BUILT. SHIPPED. ITERATED."
							className="mb-2"
							sticky={false}
						/>
						<p
							id="projects-scroll-hint"
							className="font-mono text-xs text-[#9aac90]"
						>
							<span className="group-data-scroll-driven/work:hidden">
								Scroll across to browse
							</span>
							<span className="hidden group-data-scroll-driven/work:inline">
								Scroll down to browse
							</span>
						</p>
					</div>
					<section
						ref={rowRef}
						aria-label="Projects, newest first"
						aria-describedby="projects-scroll-hint"
						// biome-ignore lint/a11y/noNoninteractiveTabindex: Enables keyboard scrolling in the project row.
						tabIndex={0}
						className="-mx-1 flex gap-5 overflow-x-auto overscroll-x-contain px-1 pb-3 [scrollbar-color:#50864c_#10140f] [scrollbar-width:thin] focus-visible:-outline-offset-2 focus-visible:outline-[#61cf5a] max-lg:group-data-scroll-driven/work:mt-[max(0px,calc((100svh-var(--project-row-height))/2-var(--site-header-height)-var(--project-heading-height)))]"
					>
						{newestProjects.map((project) => (
							<article
								className="group flex shrink-0 basis-[min(88%,22rem)] flex-col border border-[#3b4b33]/60 bg-[#0f120e] transition-colors hover:border-[#50864c] lg:basis-[30%]"
								key={project.id}
							>
								<div className="relative flex h-[clamp(8rem,18svh,11rem)] items-center justify-center overflow-hidden lg:h-[clamp(9rem,23svh,13rem)] border-b border-[#3b4b33]/60 bg-[linear-gradient(#61cf5a05_1px,transparent_1px),linear-gradient(90deg,#61cf5a05_1px,transparent_1px)] bg-[size:20px_20px]">
									<span className="absolute left-4 top-3 font-mono text-xs tracking-widest text-[#586451]">
										PROJECT_{project.id}
									</span>
									<div className="[@media(max-height:800px)]:mt-5 [@media(max-height:800px)]:scale-85 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105 [@media(max-height:800px)]:motion-safe:group-hover:scale-90">
										<ProjectVisual type={project.visual} />
									</div>
								</div>
								<div className="flex flex-1 flex-col p-5">
									<span className="font-mono text-xs tracking-[0.08em] text-[#63ad58]">
										{project.category}
									</span>
									<h3 className="mt-3 text-xl font-medium tracking-tight">
										{project.name}
									</h3>
									<p className="mt-3 flex-1 text-base leading-7 text-[#92998e]">
										{project.description}
									</p>
									<div className="mt-5 flex flex-wrap gap-2">
										{project.tags.map((tag) => (
											<span
												className="border border-[#3b4b33]/70 px-2 py-1 font-mono text-xs text-[#93aa87]"
												key={tag}
											>
												{tag}
											</span>
										))}
									</div>
									<div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#3b4b33]/60 pt-4">
										<span className="font-mono text-xs tracking-wide text-[#7e877b]">
											{project.badge}
										</span>
										{project.href ? (
											<a
												className="text-[#61cf5a] motion-safe:transition-transform motion-safe:hover:-translate-y-1"
												href={project.href}
												target="_blank"
												rel="noreferrer"
												aria-label={`${project.linkLabel}: ${project.name}`}
											>
												<span className="mr-2 font-mono text-xs">
													{project.linkLabel}
												</span>
												<span aria-hidden="true">↗</span>
											</a>
										) : (
											<button
												className="cursor-pointer px-2 text-[#61cf5a]"
												type="button"
												aria-expanded={expanded === project.id}
												aria-label="Show scheduling project details"
												onClick={() =>
													setExpanded(
														expanded === project.id ? null : project.id,
													)
												}
											>
												{expanded === project.id ? "−" : "+"}
											</button>
										)}
									</div>
									{expanded === project.id && (
										<p className="mt-4 border-t border-[#3b4b33] pt-4 text-base leading-7 text-[#92998e]">
											{project.detail}. Led a six-member team to build REST APIs
											and administrative interfaces, with pilot testing at URS
											Antipolo for Semester 1, AY 2026–2027.
										</p>
									)}
								</div>
							</article>
						))}
					</section>
				</div>
			</div>
			<a
				className="mx-auto mt-8 flex w-fit gap-4 font-mono text-sm text-[#9aac90] transition-colors hover:text-[#61cf5a]"
				href="https://github.com/PHCitizen"
				target="_blank"
				rel="noreferrer"
			>
				More experiments on GitHub
			</a>
		</section>
	);
}
