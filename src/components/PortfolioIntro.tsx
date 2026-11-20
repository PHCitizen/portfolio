import styles from "./PortfolioIntro.module.css";

const signalPath = "M28 228H102L142 188H220L288 120H372L408 84H470";

function SignalDrawing() {
	return (
		<div className={styles.drawing}>
			<svg aria-hidden="true" viewBox="0 0 500 320" fill="none" focusable="false">
				<g className={styles.traces}>
					<path d="M54 84h75l44 44h64l64-64h73l28-28h68M28 156h64l44-44h25M28 274h82l40-40h106l70-70h144M126 292h102l40-40h75l46-46h81M341 120l35 35M281 208h70l66 66h53M160 189l-34-34h-16" />
					<path d={signalPath} />
					<circle cx="54" cy="84" r="4" />
					<circle cx="470" cy="36" r="4" />
					<circle cx="28" cy="156" r="4" />
					<circle cx="28" cy="274" r="4" />
					<circle cx="126" cy="292" r="4" />
					<circle cx="470" cy="164" r="4" />
					<circle cx="470" cy="206" r="4" />
					<circle cx="470" cy="274" r="4" />
				</g>
				<path className={styles.traceSignal} d={signalPath} pathLength="1" />
				<g className={styles.core}>
					<path d="M220 122h60l22 22v44l-22 22h-60l-22-22v-44z" />
					<path d="M231 154l-12 12 12 12m38-24 12 12-12 12m-14-27-10 30" />
				</g>
				<g className={styles.nodes}>
					<circle cx="28" cy="228" r="5" />
					<circle cx="470" cy="84" r="5" />
				</g>
			</svg>
		</div>
	);
}

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
						<svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
							<path
								d="M8 2.5v10m-4-4 4 4 4-4"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
					</a>
					<a className={styles.secondary} href="#contact">
						Get in touch
					</a>
				</div>
			</div>
			<SignalDrawing />
		</section>
	);
}
