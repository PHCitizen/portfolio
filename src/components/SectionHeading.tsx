import type { ReactNode, Ref } from "react";

export default function SectionHeading({
	id,
	number,
	title,
	note,
	ref,
	children,
	className = "mb-10",
	sticky = true,
}: {
	id?: string;
	number: string;
	title: string;
	note?: string;
	ref?: Ref<HTMLDivElement>;
	children?: ReactNode;
	className?: string;
	sticky?: boolean;
}) {
	return (
		<div
			ref={ref}
			className={`bg-[#0b0d0b] pt-4 pb-2 ${sticky ? "sticky top-(--site-header-height) z-10" : ""} ${className}`}
		>
			<div className="flex items-center gap-6">
				<h2
					id={id}
					className="min-w-0 text-2xl font-semibold tracking-tight sm:text-[32px]"
				>
					<span
						aria-hidden="true"
						className="mr-3 font-mono text-base font-normal whitespace-nowrap text-[#61cf5a]"
					>
						{number} /
					</span>
					{title}
					<span aria-hidden="true" className="text-[#61cf5a]">
						.
					</span>
				</h2>
				<span className="h-px flex-1 bg-white/10" />
				{note && (
					<span className="hidden font-mono text-xs tracking-[0.1em] text-[#7e877b] lg:block">
						{note}
					</span>
				)}
			</div>
			{children}
		</div>
	);
}
