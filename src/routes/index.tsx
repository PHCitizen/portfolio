import { createFileRoute } from "@tanstack/react-router";
import About from "../components/About";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import PortfolioIntro from "../components/PortfolioIntro";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

const ENABLE_PORTFOLIO_BOOT = false;

const homeUrl = "https://jayveeembog.pages.dev/";
const name = "Jayvee Embog";
const title = `${name} | Backend Software Engineer`;
const description =
	"Jayvee Embog is a backend software engineer in the Philippines. Explore his experience and projects in APIs, blockchain, TypeScript, Python, and Rust.";
const imageUrl = `${homeUrl}assets/logo.png`;

const structuredData = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebSite",
			"@id": `${homeUrl}#website`,
			url: homeUrl,
			name,
		},
		{
			"@type": "ProfilePage",
			url: homeUrl,
			name: title,
			description,
			isPartOf: { "@id": `${homeUrl}#website` },
			mainEntity: {
				"@type": "Person",
				name,
				jobTitle: "Backend Software Engineer",
				url: homeUrl,
				sameAs: ["https://github.com/PHCitizen"],
			},
		},
	],
};

export const Route = createFileRoute("/")({
	component: Portfolio,
	head: () => ({
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: name },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: homeUrl },
			{ property: "og:image", content: imageUrl },
			{ property: "og:image:width", content: "382" },
			{ property: "og:image:height", content: "382" },
			{ property: "og:image:alt", content: "Jayvee Embog’s portfolio logo" },
			{ name: "twitter:card", content: "summary" },
		],
		links: [{ rel: "canonical", href: homeUrl }],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
			},
		],
	}),
});

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
