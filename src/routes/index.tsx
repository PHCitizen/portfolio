import { createFileRoute } from "@tanstack/react-router";
import About from "../components/About";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import PortfolioIntro from "../components/PortfolioIntro";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

export const Route = createFileRoute("/")({ component: Portfolio });

function Portfolio() {
	return (
		<main
			id="main-content"
			tabIndex={-1}
			className="mx-auto max-w-[1440px] px-6 lg:px-16"
		>
			<PortfolioIntro />
			<About />
			<Experience />
			<Projects />
			<Skills />
			<Contact />
		</main>
	);
}
