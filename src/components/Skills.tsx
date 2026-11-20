import { useState } from "react";
import { skillGroups } from "../data/portfolio";
import { toolVisuals } from "../data/toolVisuals";
import SectionHeading from "./SectionHeading";
import styles from "./Skills.module.css";
import ToolArtwork from "./ToolArtwork";

function ToolPanel({
	group,
	index,
	active,
	onActivate,
}: {
	group: (typeof skillGroups)[number];
	index: number;
	active: boolean;
	onActivate: (index: number) => void;
}) {
	return (
		<article
			className={styles.panel}
			data-active={active}
			onFocus={() => onActivate(index)}
			onPointerEnter={(event) => {
				if (event.pointerType === "mouse") onActivate(index);
			}}
		>
			<div className={styles.panelHeading}>
				<span className={styles.categoryIcon}>
					<ToolArtwork
						kind={["contract", "api", "solver", "socket", "signature"][index]}
					/>
				</span>
				<h3>{group.name}</h3>
			</div>
			<div className={styles.items}>
				{group.items.map((item) => {
					const visual = toolVisuals[item];
					return (
						<button
							type="button"
							className={styles.item}
							key={item}
							aria-label={item}
							onClick={() => onActivate(index)}
						>
							<span
								className={styles.toolIcon}
								data-asset={visual.asset}
								aria-hidden="true"
							>
								{visual.asset ? (
									<img
										src={`/assets/tools/${visual.asset}.svg`}
										alt=""
										width="40"
										height="40"
										loading="lazy"
									/>
								) : (
									<ToolArtwork kind={visual.diagram ?? "api"} />
								)}
							</span>
							<span className={styles.toolName} aria-hidden="true">
								{item}
							</span>
						</button>
					);
				})}
			</div>
		</article>
	);
}

export default function Skills() {
	const [activeGroup, setActiveGroup] = useState<number | null>(null);
	return (
		<section
			className="scroll-mt-10 border-t border-white/10 py-16 lg:py-20"
			id="skills"
		>
			<SectionHeading
				number="04"
				title="Tools of the trade"
				note="MY EVERYDAY STACK"
			/>
			<fieldset
				className={styles.tools}
				aria-label="Tools and technologies"
				data-active={activeGroup ?? "none"}
				onPointerLeave={(event) => {
					if (event.pointerType === "mouse") setActiveGroup(null);
				}}
				onBlur={(event) => {
					if (!event.currentTarget.contains(event.relatedTarget))
						setActiveGroup(null);
				}}
			>
				{skillGroups.map((group, index) => (
					<ToolPanel
						group={group}
						index={index}
						active={activeGroup === index}
						key={group.name}
						onActivate={setActiveGroup}
					/>
				))}
			</fieldset>
			<div className="mt-8 flex flex-col gap-5 border border-[#3b4b33]/60 bg-[#61cf5a]/[0.02] p-6 sm:flex-row sm:items-center">
				<span className="text-3xl text-[#61cf5a]">⌂</span>
				<div>
					<span className="font-mono text-xs tracking-widest text-[#63ad58]">
						THE FOUNDATION
					</span>
					<h3 className="mt-2 text-lg font-medium">BS Computer Engineering</h3>
					<p className="mt-2 text-base leading-7 text-[#92998e]">
						University of Rizal System · Antipolo Campus
					</p>
				</div>
				<div className="font-mono text-sm text-[#bbc6b3] sm:ml-auto sm:text-right">
					2023 — 2027{" "}
					<span className="ml-2 text-xs text-[#63ad58]">EXPECTED</span>
					<p className="mt-3 max-w-[280px] text-sm leading-6 text-[#7e877b]">
						Data structures. Networks. Systems. And everything in between.
					</p>
				</div>
			</div>
		</section>
	);
}
