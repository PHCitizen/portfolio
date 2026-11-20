import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Jayvee Embog — Backend Engineer" },
			{
				name: "description",
				content:
					"Jayvee Embog — backend software engineer based in the Philippines. Building reliable APIs, blockchain applications, and thoughtful systems with TypeScript, Python, and Rust.",
			},
			{ name: "theme-color", content: "#0b0d0b" },
		],
		links: [
			{ rel: "icon", href: "/assets/favicon.ico" },
			{ rel: "stylesheet", href: appCss },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap",
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className="scroll-smooth [color-scheme:dark] motion-reduce:scroll-auto"
		>
			<head>
				<HeadContent />
			</head>
			<body className="m-0 bg-[#0b0d0b] font-['Space_Grotesk',sans-serif] text-[#e8ece5] antialiased selection:bg-[#61cf5a] selection:text-[#0b0d0b] [&_a]:transition-colors [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#61cf5a] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[#61cf5a] [&_.font-mono]:font-['Space_Mono',monospace]">
				<a
					href="#main-content"
					className="sr-only fixed left-4 top-4 z-50 bg-[#61cf5a] p-3 text-black focus:not-sr-only"
				>
					Skip to content
				</a>
				<Header />
				{children}
				<Footer />
				<Scripts />
			</body>
		</html>
	);
}
