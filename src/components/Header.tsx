import { useState } from "react";

const links = ["About", "Experience", "Projects", "Skills", "Contact"];

export default function Header() {
	const [open, setOpen] = useState(false);
	return (
		<header className="relative z-30 mx-auto flex h-24 max-w-[1440px] items-center justify-between border-b border-white/10 px-6 lg:px-16">
			<a
				className="flex items-center gap-3 text-xl font-bold tracking-tight"
				href="/#"
				aria-label="Jayvee Embog home"
			>
				<span className="flex size-9 items-center justify-center border border-[#61cf5a]/40 bg-[#61cf5a]/5 font-mono text-lg text-[#61cf5a]">
					je
				</span>
				<span>
					jayvee<span className="text-[#61cf5a]">.dev_</span>
				</span>
			</a>
			<button
				className="font-mono text-xs text-[#61cf5a] md:hidden"
				type="button"
				onClick={() => setOpen(!open)}
				aria-expanded={open}
				aria-label="Toggle navigation"
			>
				{open ? "[ close ]" : "[ menu ]"}
			</button>
			<nav
				className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-24 flex-col gap-6 border-b border-white/10 bg-[#0b0d0b] p-6 md:static md:flex md:flex-row md:gap-7 md:border-0 md:bg-transparent md:p-0`}
				aria-label="Main navigation"
			>
				{links.map((link, i) => (
					<a
						className="font-mono text-[11px] text-[#a0a69e] transition-colors hover:text-[#61cf5a]"
						key={link}
						href={`/#${link.toLowerCase()}`}
						onClick={() => setOpen(false)}
					>
						<span className="mr-1 text-[#50864c]">0{i + 1}.</span>
						{link.toLowerCase()}
					</a>
				))}
			</nav>
			<a
				className="hidden items-center gap-7 border border-[#3b4b33] px-4 py-2.5 font-mono text-xs transition-colors hover:border-[#61cf5a] hover:text-[#61cf5a] lg:flex"
				href="mailto:embogjayvee@gmail.com"
			>
				Let’s talk <span className="text-[#61cf5a]">↗</span>
			</a>
		</header>
	);
}
