import { createFileRoute } from "@tanstack/react-router";
import About from "../components/About";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

export const Route = createFileRoute("/")({ component: Portfolio });

function Portfolio() {
	return (
		<main id="main-content">
			<div className="mx-auto max-w-[1312px] px-6 lg:px-16">
				<Hero />
				<About />
				<Experience />
				<Projects />
				<Skills />
				<Contact />
			</div>
		</main>
	);
}
