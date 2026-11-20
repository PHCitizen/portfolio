import { useRef } from "react";
import styles from "./Experience.module.css";
import SectionHeading from "./SectionHeading";
import { useCommitHistoryScroll } from "./useCommitHistoryScroll";

export default function Experience({
	embedded = false,
}: {
	embedded?: boolean;
}) {
	const stage = useRef<HTMLDivElement>(null);
	const heading = useRef<HTMLDivElement>(null);
	useCommitHistoryScroll(stage, heading);

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
			className="scroll-mt-10 border-t border-white/10 py-16 lg:py-20"
			id={embedded ? undefined : "experience"}
		>
			<SectionHeading
				ref={heading}
				className={styles.graphHeading}
				number="02"
				title="The commit history"
				note="EXPERIENCE THAT SHIPS"
			>
				<div className={styles.mainLabel}>main</div>
			</SectionHeading>
			<div ref={stage} className={styles.storyStage}>
				<div className={styles.storyTrack}>
					<ol
						className={styles.timeline}
						aria-label="Experience timeline, oldest to newest"
					>
						<li className={styles.trunk} aria-hidden="true" />
						<li className={`${styles.chapter} ${styles.joystick}`}>
							<div className={styles.rail} aria-hidden="true">
								<svg
									aria-hidden="true"
									className={styles.fork}
									viewBox="0 0 160 64"
									fill="none"
								>
									<path d="M80 0 C80 28 48 20 48 48 V64" />
								</svg>
								<span className={styles.branchLine} />
								<span className={styles.node}>
									<span className={styles.nodeFill} />
								</span>
							</div>
							<article>
								<div className={styles.meta}>
									<span>EARLY 2021 — DEC 2023</span>
									<span className={styles.branchName}>joystick-club</span>
								</div>
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
							<div className={styles.rail} aria-hidden="true">
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
								<span className={styles.mergeNode} />
								<svg
									aria-hidden="true"
									className={styles.joystickJoin}
									viewBox="0 0 160 64"
									fill="none"
								>
									<path d="M48 0 V16 C48 44 80 36 80 64" />
								</svg>
								<span className={styles.joystickMergeNode} />
							</div>
							<article>
								<div className={styles.meta}>
									<span>2023</span>
									<span className={styles.branchName}>monero-bounty</span>
								</div>
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
							<time
								className={styles.mergeDate}
								dateTime="2023-12"
								title="Joystick Club merge"
							>
								DEC 2023
							</time>
						</li>
						<li className={`${styles.chapter} ${styles.bitcoin}`}>
							<div className={styles.rail} aria-hidden="true">
								<svg
									aria-hidden="true"
									className={styles.fork}
									viewBox="0 0 160 64"
									fill="none"
								>
									<path d="M80 0 C80 28 48 20 48 48 V64" />
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
									<path d="M48 0 V16 C48 44 80 36 80 64" />
								</svg>
								<span className={styles.mergeNode} />
							</div>
							<article>
								<div className={styles.meta}>
									<span>SEP 2024 — SEP 2026</span>
									<span className={styles.branchName}>bitcoin.com</span>
								</div>
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
						<div className={styles.present}>
							<span className={styles.presentNode} aria-hidden="true" />
							<p>
								Latest <span>·</span>{" "}
								<time dateTime={currentDate}>{formattedDate}</time>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
