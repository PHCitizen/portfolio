const diagrams: Record<string, string> = {
	database:
		"M22 26c0-16 56-16 56 0s-56 16-56 0v48c0 16 56 16 56 0V26 M22 50c0 16 56 16 56 0",
	api: "M18 32h22v36H18z M60 32h22v36H60z M40 44h20m-6-6 6 6-6 6 M60 56H40m6-6-6 6 6 6",
	swaps: "M22 36h56L66 24 M78 64H22l12 12 M22 26v20 M78 54v20",
	signature:
		"M24 18h36l16 16v48H24z M60 18v18h16 M34 62l10-10 10 10 16-22 M34 72h32",
	contract: "M28 14h44v72H28z M38 28h24 M38 40h24 M38 52h12 M42 66l6 6 12-14",
	concurrency:
		"M18 50h16l16-26h30 M34 50h46 M34 50l16 26h30 M72 18l8 6-8 6 M72 44l8 6-8 6 M72 70l8 6-8 6",
	solver:
		"M20 20h20v20H20z M60 20h20v20H60z M20 60h20v20H20z M60 60h20v20H60z M40 30h20 M30 40v20 M70 40v20 M40 70h20 M64 70l4 4 8-8",
	socket:
		"M16 34h24v32H16z M60 34h24v32H60z M40 44h20 M40 56h20 M22 26v8 M34 26v8 M66 66v8 M78 66v8",
};

export default function ToolArtwork({ kind }: { kind: string }) {
	return (
		<svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
			<path
				d={diagrams[kind] ?? diagrams.api}
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
