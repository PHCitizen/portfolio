export default function SectionHeading({
	number,
	title,
	note,
}: {
	number: string;
	title: string;
	note?: string;
}) {
	return (
		<div className="mb-12 flex items-center gap-6">
			<h2 className="shrink-0 text-2xl font-semibold tracking-tight sm:text-[32px]">
				<span className="mr-3 font-mono text-base font-normal text-[#61cf5a]">
					{number} /
				</span>
				{title}
				<span className="text-[#61cf5a]">.</span>
			</h2>
			<span className="h-px flex-1 bg-white/10" />
			{note && (
				<span className="hidden font-mono text-xs tracking-[0.1em] text-[#7e877b] lg:block">
					{note}
				</span>
			)}
		</div>
	);
}
