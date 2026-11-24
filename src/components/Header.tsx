import { useState } from "react";

const links = ["About", "Experience", "Projects", "Skills", "Contact"];

export default function Header() {
	const [open, setOpen] = useState(false);
	return (
		<header className="sticky top-0 z-30 mx-auto flex h-(--site-header-height) max-w-[1440px] items-center justify-between border-b border-white/10 bg-[#0b0d0b] px-6 lg:px-16">
			<a
				className="flex items-center gap-3 text-xl font-bold tracking-tight"
				href="/"
				aria-label="Jayvee Embog home"
			>
				<img
					src="/assets/logo.png"
					alt=""
					width={40}
					height={40}
					className="size-10 shrink-0 object-contain"
				/>
				<span>
					jayvee<span className="text-[#61cf5a]">.dev_</span>
				</span>
			</a>
			<button
				className="font-mono text-sm text-[#61cf5a] lg:hidden"
				type="button"
				onClick={() => setOpen(!open)}
				aria-expanded={open}
				aria-label="Toggle navigation"
			>
				{open ? "[ close ]" : "[ menu ]"}
			</button>
			<nav
				className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-(--site-header-height) max-h-[calc(100dvh-var(--site-header-height))] flex-col gap-6 overflow-y-auto border-b border-white/10 bg-[#0b0d0b] p-6 lg:static lg:flex lg:max-h-none lg:flex-row lg:gap-5 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0`}
				aria-label="Main navigation"
			>
				{links.map((link, i) => (
					<a
						className="font-mono text-sm text-[#a0a69e] transition-colors hover:text-[#61cf5a]"
						key={link}
						href={`/#${link.toLowerCase()}`}
						onClick={() => setOpen(false)}
					>
						<span aria-hidden="true" className="mr-1 text-[#50864c]">
							0{i + 1}.
						</span>
						{link.toLowerCase()}
					</a>
				))}
			</nav>
			<a
				className="hidden items-center gap-4 border border-[#3b4b33] px-4 py-2.5 font-mono text-sm transition-colors hover:border-[#61cf5a] hover:text-[#61cf5a] xl:flex"
				href="mailto:embogjayvee@gmail.com"
			>
				Let’s talk
			</a>
		</header>
	);
}
