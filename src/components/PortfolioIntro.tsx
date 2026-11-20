import styles from "./PortfolioIntro.module.css";

export default function PortfolioIntro() {
	return (
		<section className={styles.intro} id="home" aria-labelledby="intro-title">
			<div>
				<h1 className={styles.title} id="intro-title">
					Jayvee{" "}
					<span>
						Embog<span aria-hidden="true">.</span>
					</span>
				</h1>
				<p className={styles.role}>Backend software engineer.</p>
				<p className={styles.description}>
					I build reliable APIs, blockchain applications, and systems that make
					things work.
				</p>
				<div className={styles.actions}>
					<a className={styles.primary} href="#projects">
						Explore my work
					</a>
					<a className={styles.secondary} href="#contact">
						Get in touch
					</a>
				</div>
			</div>
			<div className={styles.drawing}>
				<img
					src="/assets/hero-hacker.webp"
					alt="Hooded programmer working on a laptop"
					width={1024}
					height={1024}
					fetchPriority="high"
				/>
			</div>
		</section>
	);
}
