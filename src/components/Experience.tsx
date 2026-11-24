import { useRef } from "react";
import styles from "./Experience.module.css";
import PortfolioBoot from "./PortfolioBoot";
import SectionHeading from "./SectionHeading";
import { useCommitHistoryScroll } from "./useCommitHistoryScroll";
import { useMergeSound } from "./useMergeSound";

function MergeNode({ joystick = false }: { joystick?: boolean }) {
	return (
		<span
			aria-hidden="true"
			className={joystick ? styles.joystickMergeNode : styles.mergeNode}
		>
			<span className={styles.mergeDot} />
			{["nw", "n", "ne", "se", "s", "sw"].map((direction) => (
				<span key={direction} className={styles.mergeSpark} />
			))}
		</span>
	);
}

export default function Experience({
	embedded = false,
	showBootPrompt = false,
}: {
	embedded?: boolean;
	showBootPrompt?: boolean;
}) {
	const stage = useRef<HTMLDivElement>(null);
	const heading = useRef<HTMLDivElement>(null);
	const sound = useMergeSound();
	useCommitHistoryScroll(stage, heading, sound.play);

	const today = new Date();
	const currentDate = today.toISOString().slice(0, 10);
	const formattedDate = today.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	});

	return (
		<section
			className={`${styles.experience} scroll-mt-10 border-t border-white/10 py-16 lg:py-20`}
			id={embedded ? undefined : "experience"}
			aria-labelledby="experience-title"
		>
			<SectionHeading
				id="experience-title"
				ref={heading}
				className={styles.graphHeading}
				number="02"
				title="The commit history"
				note="WORK & EDUCATION"
			>
				<div className={styles.mainLabel}>main</div>
				<button
					type="button"
					className={styles.mergeSound}
					aria-pressed={sound.enabled}
					onClick={sound.toggle}
				>
					sound <span aria-hidden="true">{sound.enabled ? "on" : "off"}</span>
				</button>
			</SectionHeading>
			<div ref={stage} className={styles.storyStage}>
				<span className={styles.storyViewport} aria-hidden="true" />
				<div className={styles.storyTrack}>
					<ol
						className={styles.timeline}
						aria-label="Work and education timeline, ordered by start date"
					>
						<li className={styles.trunk} aria-hidden="true" />
						<li className={`${styles.chapter} ${styles.joystick}`}>
							<div className={styles.rail}>
								<svg
									aria-hidden="true"
									className={styles.fork}
									viewBox="0 0 160 64"
									fill="none"
								>
									<path d="M80 0 C80 28 48 20 48 48 V64" />
								</svg>
								<span className={styles.branchLine} />
								<span className={styles.forkNode} aria-hidden="true" />
								<span className={styles.node}>
									<span className={styles.nodeFill} />
								</span>
								<span className={styles.branchLabel}>
									<span className={styles.branchName}>joystick-club</span>
								</span>
							</div>
							<article>
								<div className={styles.meta}>EARLY 2021 — DEC 2023</div>
								<h3>Joystick Club</h3>
								<p className={styles.role}>
									Full-stack Developer <span>· Freelance · Remote</span>
								</p>
								<p className={styles.description}>
									From smart contracts to the very last deployment.
								</p>
								<ul className={styles.commits}>
									<li>
										Architected the NFT marketplace and minting portal for a
										play-to-earn platform on SmartBCH and Bitcoin Cash.
									</li>
									<li>
										Authored and deployed Solidity contracts for minting and
										staking, owning API integrations and the full production
										lifecycle.
									</li>
								</ul>
								<div className={styles.tags}>
									<span>Solidity</span>
									<span>Hardhat</span>
									<span>SmartBCH</span>
									<span>Full-stack</span>
								</div>
							</article>
						</li>
						<li className={`${styles.chapter} ${styles.monero}`}>
							<div className={styles.rail}>
								<span className={styles.joystickContinues} />
								<svg
									aria-hidden="true"
									className={styles.fork}
									viewBox="0 0 160 64"
									fill="none"
								>
									<path d="M80 0 C80 28 112 20 112 48 V64" />
								</svg>
								<span className={styles.branchLine} />
								<span className={styles.node}>
									<span className={styles.nodeFill} />
								</span>
								<svg
									aria-hidden="true"
									className={styles.join}
									viewBox="0 0 160 64"
									fill="none"
								>
									<path d="M112 0 V16 C112 44 80 36 80 64" />
								</svg>
								<MergeNode />
								<span className={styles.branchLabel}>
									<span className={styles.branchName}>monero-bounty</span>
								</span>
							</div>
							<article>
								<div className={styles.meta}>2023</div>
								<h3>
									<a href="https://github.com/PHCitizen/bch-xmr-swap">
										bch-xmr-swap
									</a>
								</h3>
								<p className={styles.role}>
									Open-source developer <span>· Monero bounty winner</span>
								</p>
								<p className={styles.description}>
									A trustless Bitcoin Cash to Monero atomic swap engine.
								</p>
								<ul className={styles.commits}>
									<li>
										Built a three-crate Rust workspace that separates the core
										protocol, command-line client, and communication daemon.
									</li>
									<li>
										Verified successful settlement on mainnet and tested
										automated refunds by simulating counterparty failure.
									</li>
								</ul>
								<div className={styles.tags}>
									<span>Rust</span>
									<span>Atomic Swaps</span>
									<span>Cryptography</span>
								</div>
							</article>
							<time
								className={styles.moneroDate}
								dateTime="2023"
								title="Monero bounty merge"
							>
								2023
							</time>
						</li>
						<li className={`${styles.chapter} ${styles.education}`}>
							<div className={styles.rail}>
								<span className={styles.joystickContinues} />
								<svg
									aria-hidden="true"
									className={styles.joystickJoin}
									viewBox="0 0 160 64"
									fill="none"
								>
									<path d="M48 0 V16 C48 44 80 36 80 64" />
								</svg>
								<MergeNode joystick />
								<svg
									aria-hidden="true"
									className={styles.fork}
									viewBox="0 0 160 64"
									fill="none"
								>
									<path d="M80 0 C80 28 64 20 64 48 V64" />
								</svg>
								<span className={styles.branchLine} />
								<span className={styles.node}>
									<span className={styles.nodeFill} />
								</span>
								<span className={styles.branchLabel}>
									<span className={styles.branchName}>urs</span>
								</span>
							</div>
							<article>
								<div className={styles.meta}>MID-2023 — PRESENT</div>
								<h3>Bachelor of Science in Computer Engineering</h3>
								<p className={styles.role}>
									University of Rizal System <span>· Antipolo Campus</span>
								</p>
								<p className={styles.description}>
									Expected graduation: mid-2027
								</p>
							</article>
							<time
								className={styles.mergeDate}
								dateTime="2023-12"
								title="Joystick Club merge"
							>
								DEC 2023
							</time>
						</li>
						<li className={`${styles.chapter} ${styles.kiosk}`}>
							<div className={styles.rail}>
								<span
									className={`${styles.branchLine} ${styles.educationContinues}`}
								/>
								<svg
									aria-hidden="true"
									className={`${styles.fork} ${styles.kioskFork}`}
									viewBox="0 0 160 48"
									fill="none"
								>
									<path d="M64 0 C64 28 40 20 40 48" />
								</svg>
								<span className={styles.branchLine} />
								<span className={styles.node}>
									<span className={styles.nodeFill} />
								</span>
								<svg
									aria-hidden="true"
									className={styles.join}
									viewBox="0 0 160 64"
									fill="none"
								>
									<path d="M40 0 V16 C40 44 64 36 64 64" />
								</svg>
								<MergeNode />
								<span className={styles.branchLabel}>
									<span className={styles.branchName}>red-ribbon-kiosk</span>
								</span>
							</div>
							<article>
								<div className={styles.meta}>
									<time dateTime="2024-03">MAR 2024</time>
								</div>
								<h3>Red Ribbon Kiosk Clone</h3>
								<p className={styles.description}>
									A recreation of the Red Ribbon Bakeshop kiosk, built as a
									school project at URS.
								</p>
								<div className={styles.tags}>
									<span>VB.NET</span>
									<span>Microsoft SQL Server</span>
								</div>
							</article>
							<time
								className={styles.mergeDate}
								dateTime="2024-04"
								title="Red Ribbon kiosk merge into URS"
							>
								APR 2024
							</time>
						</li>
						<li className={`${styles.chapter} ${styles.bitcoin}`}>
							<div className={styles.rail}>
								<span
									className={`${styles.branchLine} ${styles.educationContinues}`}
								/>
								<svg
									aria-hidden="true"
									className={styles.fork}
									viewBox="0 0 160 64"
									fill="none"
								>
									<path d="M80 0 C80 28 112 20 112 48 V64" />
								</svg>
								<span className={styles.branchLine} />
								<span className={styles.node}>
									<span className={styles.nodeFill} />
								</span>
								<svg
									aria-hidden="true"
									className={styles.join}
									viewBox="0 0 160 64"
									fill="none"
								>
									<path d="M112 0 V16 C112 44 80 36 80 64" />
								</svg>
								<MergeNode />
								<span className={styles.branchLabel}>
									<span className={styles.branchName}>bitcoin.com</span>
								</span>
							</div>
							<article>
								<div className={styles.meta}>2025 — SEP 2026</div>
								<h3>bitcoin.com</h3>
								<p className={styles.role}>
									Software Engineer <span>· Part-time · Remote</span>
								</p>
								<p className={styles.description}>
									Building at the intersection of finance and the decentralized
									web.
								</p>
								<ul className={styles.commits}>
									<li>
										Developed customer-facing rewards platforms, DEX interfaces,
										and token airdrop portals with TypeScript, React, and
										Node.js.
									</li>
									<li>
										Collaborated with an international team of 4–7 engineers
										through peer reviews, sprint planning, and automated CI/CD.
									</li>
								</ul>
								<div className={styles.tags}>
									<span>TypeScript</span>
									<span>React</span>
									<span>Node.js</span>
									<span>CI/CD</span>
								</div>
							</article>
							<time
								className={styles.mergeDate}
								dateTime="2026-09"
								title="bitcoin.com merge"
							>
								SEP 2026
							</time>
						</li>
					</ol>
					<div className={styles.continuation}>
						<span className={styles.presentLine} aria-hidden="true" />
						<div className={styles.presentRail} aria-hidden="true">
							<span
								className={`${styles.branchLine} ${styles.educationContinues}`}
							/>
						</div>
						<div className={styles.present}>
							<span className={styles.presentNode} aria-hidden="true" />
							<span
								className={`${styles.presentNode} ${styles.educationPresentNode}`}
								aria-hidden="true"
							/>
							<p>
								Latest <span>·</span>{" "}
								<time dateTime={currentDate}>{formattedDate}</time>
							</p>
						</div>
					</div>
				</div>
			</div>
			{showBootPrompt && <PortfolioBoot onEnable={sound.enable} />}
		</section>
	);
}
