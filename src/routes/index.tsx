import { createFileRoute } from "@tanstack/react-router";
import About from "../components/About";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import PortfolioIntro from "../components/PortfolioIntro";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

const ENABLE_PORTFOLIO_BOOT = false;

export const Route = createFileRoute("/")({ component: Portfolio });

function Portfolio() {
	return (
		<main
			id="main-content"
			tabIndex={-1}
			className="mx-auto max-w-[1440px] px-6 outline-none lg:px-16"
		>
			<PortfolioIntro />
			<About />
			<Experience showBootPrompt={ENABLE_PORTFOLIO_BOOT} />
			<Projects />
			<Skills />
			<Contact />
		</main>
	);
}
