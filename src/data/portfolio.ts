export const projects = [
	{
		id: "01",
		name: "bch-xmr-swap",
		category: "CRYPTOGRAPHY / OPEN SOURCE",
		description:
			"Trustless by design. A Bitcoin Cash to Monero atomic swap engine, built in Rust and validated on mainnet.",
		tags: ["Rust", "Atomic Swaps", "Cryptography"],
		href: "https://github.com/PHCitizen/bch-xmr-swap",
		linkLabel: "View repository",
		visual: "swap",
		badge: "MONERO BOUNTY WINNER",
		detail: "Three-crate architecture · Secure v4 protocol",
	},
	{
		id: "02",
		name: "Automated Class Scheduler",
		category: "SYSTEMS / THESIS PROJECT",
		description:
			"Complex constraints. Conflict-free schedules. An intelligent scheduling system for the University of Rizal System.",
		tags: ["Python", "React", "Prisma"],
		href: null,
		linkLabel: null,
		visual: "schedule",
		badge: "TEAM LEAD · 6 DEVELOPERS",
		detail: "Heuristic search · Institutional pilot",
	},
	{
		id: "03",
		name: "bomberman-py",
		category: "NETWORKING / GAME DEVELOPMENT",
		description:
			"A real-time multiplayer classic, engineered with a decoupled client-server architecture and low-level sockets.",
		tags: ["Python", "Pygame", "Sockets"],
		href: "https://github.com/PHCitizen/bomberman-py",
		linkLabel: "View repository",
		visual: "game",
		badge: "REAL-TIME MULTIPLAYER",
		detail: "Host discovery · State synchronization",
	},
	{
		id: "04",
		name: "BCC x Binance Academy: Build4Campus Hackathon",
		category: "HACKATHON",
		description:
			"Our team was selected as one of 10 finalists and competed on-site at the University of Makati.",
		tags: ["Hackathon", "Build4Campus"],
		href: "https://blockhub.academy/activities/bcc-2026-umak-binance-hackathon",
		linkLabel: "View event",
		visual: "hackathon",
		badge: "TOP 10 FINALIST",
		detail: "University of Makati",
	},
] as const;

export const skillGroups = [
	{
		icon: "⌘",
		name: "Languages",
		items: ["TypeScript", "JavaScript", "Python", "Rust", "SQL", "Solidity"],
	},
	{
		icon: "⌁",
		name: "Backend & APIs",
		items: [
			"Node.js",
			"Express",
			"Elysia",
			"Next.js",
			"TanStack",
			"REST APIs",
			"Cloudflare Workers",
		],
	},
	{
		icon: "▤",
		name: "Databases",
		items: [
			"PostgreSQL",
			"SQLite",
			"MSSQL",
			"MongoDB",
			"Redis",
			"Cloudflare D1",
			"Prisma",
			"Drizzle",
		],
	},
	{
		icon: ">_",
		name: "DevOps & Systems",
		items: [
			"Linux",
			"Docker",
			"GitHub Actions",
			"DigitalOcean",
			"Cloudflare",
			"Git",
			"Socket Programming",
		],
	},
	{
		icon: "⌬",
		name: "Security & Architecture",
		items: [
			"Atomic Swaps",
			"Adaptor Signatures",
			"Smart Contracts",
			"Hardhat",
			"Concurrency",
			"Constraint Solving",
		],
	},
];
