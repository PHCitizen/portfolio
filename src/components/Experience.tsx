import SectionHeading from "./SectionHeading";

const jobs = [
	{
		company: "bitcoin.com",
		role: "Software Engineer",
		type: "PART-TIME · REMOTE",
		dates: "SEP 2024 — SEP 2026",
		description:
			"Building at the intersection of finance and the decentralized web.",
		bullets: [
			"Developed customer-facing rewards platforms, DEX interfaces, and token airdrop portals with TypeScript, React, and Node.js.",
			"Collaborated with an international team of 4–7 engineers through peer reviews, sprint planning, and automated CI/CD.",
		],
		tags: ["TypeScript", "React", "Node.js", "CI/CD"],
	},
	{
		company: "Joystick Club",
		role: "Full-stack Developer",
		type: "FREELANCE · REMOTE",
		dates: "EARLY 2021 — DEC 2023",
		description: "From smart contracts to the very last deployment.",
		bullets: [
			"Architected the NFT marketplace and minting portal for a play-to-earn platform on SmartBCH and Bitcoin Cash.",
			"Authored and deployed Solidity contracts for minting and staking, owning API integrations and the full production lifecycle.",
		],
		tags: ["Solidity", "Hardhat", "SmartBCH", "Full-stack"],
	},
];
export default function Experience({
	embedded = false,
}: {
	embedded?: boolean;
}) {
	return (
		<section
			className="scroll-mt-10 border-t border-white/10 py-16 lg:py-20"
			id={embedded ? undefined : "experience"}
		>
			<SectionHeading
				number="02"
				title="The commit history"
				note="EXPERIENCE THAT SHIPS"
			/>
			<div className="space-y-10">
				{jobs.map((job, i) => (
					<article
						className="grid gap-5 md:grid-cols-[240px_1fr] md:gap-12"
						key={job.company}
					>
						<div className="relative flex flex-col gap-3 pl-5 font-mono text-[10px] text-[#bac3b4] [&_small]:text-[8px] [&_small]:tracking-widest [&_small]:text-[#7e877b]">
							<span className="absolute left-0 top-1 size-1.5 rounded-full border border-[#61cf5a] bg-[#132210]" />
							<span>{job.dates}</span>
							<small>{job.type}</small>
						</div>
						<div className="relative border-l border-[#3b4b33] pb-3 pl-6 [&_h3]:pr-5 [&_h3]:text-lg [&_h3]:font-medium [&_h3>span]:text-[#61cf5a] [&_ul]:my-4 [&_ul]:space-y-3 [&_li]:relative [&_li]:pl-4 [&_li]:text-xs [&_li]:leading-6 [&_li]:text-[#92998e] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-[#50864c] [&_li]:before:content-['▹']">
							<span className="absolute right-0 top-1 font-mono text-[10px] text-[#586451]">
								/ 0{i + 1}
							</span>
							<h3>
								{job.role} <span>@ {job.company}</span>
							</h3>
							<p className="mt-2 text-xs text-[#a2ab9a]">{job.description}</p>
							<ul>
								{job.bullets.map((bullet) => (
									<li key={bullet}>{bullet}</li>
								))}
							</ul>
							<div className="mt-5 flex flex-wrap gap-2 [&>span]:border [&>span]:border-[#3b4b33]/70 [&>span]:bg-[#61cf5a]/[0.025] [&>span]:px-2 [&>span]:py-1 [&>span]:font-mono [&>span]:text-[9px] [&>span]:text-[#93aa87]">
								{job.tags.map((tag) => (
									<span key={tag}>{tag}</span>
								))}
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
