import SectionHeading from "./SectionHeading";

const entries = [
	{
		name: "bitcoin.com",
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
		name: "Joystick Club",
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
	{
		name: "bch-xmr-swap",
		role: "Open-source developer",
		type: "OPEN SOURCE · MONERO BOUNTY WINNER",
		dates: "2023",
		href: "https://github.com/PHCitizen/bch-xmr-swap",
		description: "A trustless Bitcoin Cash to Monero atomic swap engine.",
		bullets: [
			"Built a three-crate Rust workspace that separates the core protocol, command-line client, and communication daemon.",
			"Verified successful settlement on mainnet and tested automated refunds by simulating counterparty failure.",
		],
		tags: ["Rust", "Atomic Swaps", "Cryptography"],
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
				{entries.map((entry, i) => (
					<article
						className="grid gap-5 md:grid-cols-[240px_1fr] md:gap-12"
						key={entry.name}
					>
						<div className="relative flex flex-col gap-3 pl-5 font-mono text-sm text-[#bac3b4] [&_small]:text-xs [&_small]:tracking-widest [&_small]:text-[#7e877b]">
							<span className="absolute left-0 top-1 size-1.5 rounded-full border border-[#61cf5a] bg-[#132210]" />
							<span>{entry.dates}</span>
							<small>{entry.type}</small>
						</div>
						<div className="relative border-l border-[#3b4b33] pb-3 pl-6 [&_h3]:pr-5 [&_h3]:text-xl [&_h3]:font-medium [&_h3>span]:text-[#61cf5a] [&_ul]:my-4 [&_ul]:space-y-3 [&_li]:relative [&_li]:pl-4 [&_li]:text-base [&_li]:leading-7 [&_li]:text-[#92998e] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-[#50864c] [&_li]:before:content-['▹']">
							<span className="absolute right-0 top-1 font-mono text-xs text-[#586451]">
								/ 0{i + 1}
							</span>
							<h3>
								{entry.role}{" "}
								<span>
									{entry.href ? (
										<>
											·{" "}
											<a
												className="underline decoration-[#3e6a3d] underline-offset-4 hover:decoration-current"
												href={entry.href}
											>
												{entry.name}
											</a>
										</>
									) : (
										`@ ${entry.name}`
									)}
								</span>
							</h3>
							<p className="mt-2 text-base leading-7 text-[#a2ab9a]">{entry.description}</p>
							<ul>
								{entry.bullets.map((bullet) => (
									<li key={bullet}>{bullet}</li>
								))}
							</ul>
							<div className="mt-5 flex flex-wrap gap-2 [&>span]:border [&>span]:border-[#3b4b33]/70 [&>span]:bg-[#61cf5a]/[0.025] [&>span]:px-2 [&>span]:py-1 [&>span]:font-mono [&>span]:text-xs [&>span]:text-[#93aa87]">
								{entry.tags.map((tag) => (
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
