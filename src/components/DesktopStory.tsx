import { useCallback, useEffect, useRef, useState } from "react";
import { projects, skillGroups } from "../data/portfolio";
import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import { useDesktopWorkflow } from "./useDesktopWorkflow";
import "./DesktopStory.css";
import "./DesktopWorkflow.css";

const chapters = [
	{
		id: "home",
		app: "Terminal",
		title: "A little introduction",
		command: "whoami",
	},
	{
		id: "about",
		app: "Finder",
		title: "Find the next thing to build",
		command: "open ~/jayvee",
	},
	{
		id: "projects",
		app: "Slides",
		title: "A few things I’ve built",
		command: "present projects.deck",
	},
	{
		id: "request",
		app: "Terminal",
		title: "From a request to a response",
		command: "curl portfolio.local/projects",
	},
	{
		id: "browser",
		app: "Browser",
		title: "Explore the source",
		command: "open https://github.com/PHCitizen",
	},
	{
		id: "experience",
		app: "Git",
		title: "Every chapter leaves a commit",
		command: "git log --experience",
	},
	{
		id: "skills",
		app: "Toolbox",
		title: "The tools behind the work",
		command: "unpack ~/toolbox",
	},
	{
		id: "contact",
		app: "Mail",
		title: "Let’s build the next chapter",
		command: "open mailto:embogjayvee@gmail.com",
	},
];

function AppIcon({ kind }: { kind: string }) {
	return (
		<svg
			viewBox="0 0 32 32"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			aria-hidden="true"
		>
			<rect x="3" y="5" width="26" height="23" rx="3" />
			{kind === "Terminal" || kind === "Git" ? (
				<path d="m9 12 5 5-5 5M17 22h7" />
			) : kind === "Finder" ? (
				<path d="M16 6v12h5M9 21q7 5 14-1M10 11v3M23 11v3" />
			) : kind === "Browser" ? (
				<>
					<circle cx="16" cy="17" r="8" />
					<path d="M8 17h16M16 9q-7 8 0 16 7-8 0-16Z" />
				</>
			) : kind === "Slides" ? (
				<path d="M8 11h16v11H8zM12 25h8M13 14l7 3-7 3z" />
			) : kind === "Mail" ? (
				<path d="m4 9 12 10L28 9M4 26l9-9m15 9-9-9" />
			) : (
				<path d="M10 6V3h12v3M4 15h24M13 14v5h6v-5" />
			)}
		</svg>
	);
}

export default function DesktopStory() {
	const story = useRef<HTMLElement>(null);
	const [reading, setReading] = useState(false);
	const [reduced, setReduced] = useState(false);
	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReduced(query.matches);
		update();
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, []);
	const linear = reading || reduced;
	const [workflow, setWorkflow] = useDesktopWorkflow(story, linear);
	const { active, slide } = workflow;
	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape")
				setWorkflow((old) =>
					old.presenting ? { ...old, presenting: false } : old,
				);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [setWorkflow]);
	const setSlide = (value: number) =>
		setWorkflow((old) => ({ ...old, slide: value }));
	const jump = useCallback(
		(index: number) => {
			if (
				linear ||
				window.matchMedia("(max-width: 760px), (max-height: 650px)").matches
			) {
				document
					.getElementById(chapters[index].id)
					?.scrollIntoView({ behavior: "instant" });
			} else if (story.current) {
				const root = story.current;
				window.scrollTo({
					top:
						window.scrollY +
						root.getBoundingClientRect().top +
						((root.offsetHeight - window.innerHeight) * index) / 7,
					behavior: "instant",
				});
			}
			setWorkflow((old) => ({ ...old, active: index }));
			window.history.replaceState(null, "", `#${chapters[index].id}`);
		},
		[linear, setWorkflow],
	);
	useEffect(() => {
		const followHash = () => {
			const index = chapters.findIndex(
				(chapter) => chapter.id === window.location.hash.slice(1),
			);
			if (index >= 0) jump(index);
		};
		const timer = window.setTimeout(followHash, 100);
		window.addEventListener("hashchange", followHash);
		return () => {
			window.clearTimeout(timer);
			window.removeEventListener("hashchange", followHash);
		};
	}, [jump]);
	const project = projects[slide];
	const files = [
		{
			name: "about.md",
			kind: "Markdown document",
			app: "Finder",
			action: () => setWorkflow((old) => ({ ...old, finderQuery: "" })),
		},
		{
			name: "projects.deck",
			kind: "3 slides · selected work",
			app: "Slides",
			action: () => jump(2),
		},
		{
			name: "experience.git",
			kind: "Career history",
			app: "Git",
			action: () => jump(5),
		},
		{
			name: "toolbox",
			kind: "Tools & languages",
			app: "Toolbox",
			action: () => jump(6),
		},
	];
	const matchingFiles = files.filter((file) =>
		file.name.toLowerCase().includes(workflow.finderQuery.toLowerCase()),
	);
	const selectedFile =
		matchingFiles.find((file) => file.name === workflow.selectedFile) ??
		matchingFiles[0];
	const matchingRepos = projects.filter((p) =>
		`${p.name} ${p.description} ${p.tags.join(" ")}`
			.toLowerCase()
			.includes(workflow.browserQuery.toLowerCase()),
	);
	return (
		<main
			id="main-content"
			className={`desktop-story ${linear ? "is-linear" : ""}`}
			ref={story}
			data-presenting={workflow.presenting}
			data-executed={workflow.executed}
			data-browser-loaded={workflow.browserLoaded}
			data-git-ready={workflow.gitReady}
		>
			<div className="desktop-stage">
				<header className="desktop-menubar">
					<button
						type="button"
						onClick={() => jump(0)}
						className="desktop-brand"
						aria-label="Back to introduction"
					>
						je<span>.workspace</span>
					</button>
					<span className="menubar-app">{chapters[active].app}</span>
					<span className="menubar-location">Jayvee Embog / Philippines</span>
					<button
						type="button"
						onClick={() => setReading(!reading)}
						aria-pressed={reading}
					>
						{reading ? "Desktop view" : "Reading view"}
					</button>
					<a href="mailto:embogjayvee@gmail.com" className="menu-contact">
						Let’s talk
					</a>
				</header>
				<div className="wallpaper" aria-hidden="true">
					<span>build.</span>
					<span>connect.</span>
					<span>repeat_</span>
				</div>
				<div className="window-space">
					{chapters.map((chapter, index) => (
						<section
							key={chapter.id}
							id={chapter.id}
							className={`story-window window-${chapter.id}`}
							aria-label={`${chapter.app}: ${chapter.title}`}
						>
							<div className="window-bar">
								<span className="window-lights" aria-hidden="true">
									<i />
									<i />
									<i />
								</span>
								<span>
									{chapter.app}{" "}
									<span className="window-path">
										— {index === 0 ? "jayvee@portfolio: ~" : chapter.title}
									</span>
								</span>
								<span className="window-count">
									{String(index + 1).padStart(2, "0")} / 08
								</span>
							</div>
							<div className="window-content">
								{index === 0 && (
									<div className="intro-terminal">
										<p className="terminal-line">
											<span>jayvee@portfolio</span> ~ % whoami
										</p>
										<h1>
											Jayvee
											<br />
											<span>Embog</span>
											<span className="terminal-cursor">_</span>
										</h1>
										<div className="intro-bottom">
											<div>
												<h2>Backend software engineer.</h2>
												<p>
													I build reliable APIs, blockchain applications,
													<br className="desktop-break" /> and systems that make
													things work.
												</p>
											</div>
											<button
												type="button"
												className="explore-button"
												onClick={() => jump(1)}
											>
												Explore my workspace <span>↓</span>
											</button>
										</div>
										<div className="terminal-foot">
											<span>TypeScript · Python · Rust</span>
											<span>Keep scrolling. I’ll take the mouse. ↓</span>
										</div>
									</div>
								)}
								{index === 1 && (
									<div className="finder-layout">
										<aside className="finder-sidebar">
											<span>Favorites</span>
											<b>Jayvee Embog</b>
											<button type="button" onClick={() => jump(2)}>
												Projects
											</button>
											<button type="button" onClick={() => jump(5)}>
												Experience
											</button>
											<a
												href="https://github.com/PHCitizen"
												target="_blank"
												rel="noreferrer"
											>
												GitHub ↗
											</a>
											<span className="finder-storage">~/jayvee</span>
										</aside>
										<div className="finder-main">
											<div className="finder-toolbar">
												<div className="finder-breadcrumb">
													jayvee / personal workspace
												</div>
												<label className="search-control">
													<SearchIcon />
													<input
														className="finder-search"
														type="search"
														aria-label="Search workspace files"
														placeholder="Search files"
														value={workflow.finderQuery}
														onChange={(e) =>
															setWorkflow((old) => ({
																...old,
																finderQuery: e.target.value,
															}))
														}
													/>
												</label>
											</div>
											<div
												className="finder-profile"
												hidden={!!workflow.finderQuery}
											>
												<About embedded />
												<div className="finder-files-shortcut">
													<button
														type="button"
														onClick={() =>
															setWorkflow((old) => ({
																...old,
																finderQuery: "projects",
															}))
														}
													>
														Find projects.deck <span>Search ↗</span>
													</button>
												</div>
											</div>
											<div
												className="finder-results"
												hidden={!workflow.finderQuery}
											>
												<p>
													Search: This workspace{" "}
													<span>
														{matchingFiles.length} result
														{matchingFiles.length === 1 ? "" : "s"}
													</span>
												</p>
												<div className="finder-file-list">
													{matchingFiles.map((file) => (
														<button
															key={file.name}
															type="button"
															className={`finder-file ${file.app === "Slides" ? "finder-deck" : ""} ${workflow.selectedFile === file.name ? "file-selected" : ""}`}
															aria-pressed={workflow.selectedFile === file.name}
															onClick={() =>
																setWorkflow((old) => ({
																	...old,
																	selectedFile: file.name,
																}))
															}
															onDoubleClick={file.action}
														>
															<AppIcon kind={file.app} />
															<strong>{file.name}</strong>
															<small>{file.kind}</small>
														</button>
													))}
												</div>
												{matchingFiles.length ? (
													<div className="file-inspector">
														<div>
															<strong>
																{workflow.selectedFile
																	? selectedFile?.name
																	: "Select a file"}
															</strong>
															<p>
																{workflow.selectedFile
																	? selectedFile?.kind
																	: "Double-click a file to open it, or use the button below."}
															</p>
														</div>
														<button type="button" onClick={selectedFile.action}>
															Open {selectedFile.app} ↗
														</button>
													</div>
												) : (
													<p className="search-empty">
														No files match “{workflow.finderQuery}”. Try
														projects, about, experience, or toolbox.
													</p>
												)}
											</div>
										</div>
									</div>
								)}
								{index === 2 && (
									<div className="slides-layout">
										<aside className="slide-thumbnails">
											{projects.map((p, i) => (
												<button
													type="button"
													key={p.id}
													onClick={() => setSlide(i)}
													aria-pressed={slide === i}
												>
													<span>{p.id}</span>
													<strong>{p.name}</strong>
													<small>{p.tags[0]}</small>
												</button>
											))}
										</aside>
										<div className="presentation">
											<div className="presentation-top">
												<span>projects.deck</span>
												<button
													type="button"
													className="present-button"
													aria-pressed={workflow.presenting}
													onClick={() =>
														setWorkflow((old) => ({
															...old,
															presenting: !old.presenting,
														}))
													}
												>
													{workflow.presenting
														? "Exit presentation ⎋"
														: "Present ▷"}
												</button>
											</div>
											<h2>{project.name}</h2>
											<p className="project-description">
												{project.description}
											</p>
											<div className="project-tags">
												{project.tags.map((tag) => (
													<span key={tag}>{tag}</span>
												))}
											</div>
											<p className="project-detail">{project.detail}</p>
											<div className="slide-bottom">
												<span>{project.badge}</span>
												{project.href ? (
													<a
														href={project.href}
														target="_blank"
														rel="noreferrer"
													>
														View repository ↗
													</a>
												) : (
													<span>University of Rizal System</span>
												)}
											</div>
											<div className="presentation-controls">
												<button
													type="button"
													disabled={slide === 0}
													onClick={() => setSlide(slide - 1)}
													aria-label="Previous project"
												>
													←
												</button>
												<span>
													{slide + 1} / {projects.length}
												</span>
												<button
													type="button"
													className="next-project"
													disabled={slide === projects.length - 1}
													onClick={() => setSlide(slide + 1)}
													aria-label="Next project"
												>
													→
												</button>
											</div>
										</div>
									</div>
								)}
								{index === 3 && (
									<div className="request-terminal">
										<p className="terminal-line curl-command">
											<span>jayvee@portfolio</span> ~ %{" "}
											<span>
												{linear ? chapters[3].command : workflow.terminal}
											</span>
											<span className="input-caret">▌</span>
										</p>
										<button
											type="button"
											className="run-curl"
											onClick={() =>
												setWorkflow((old) => ({
													...old,
													terminal: chapters[3].command,
													executed: true,
												}))
											}
										>
											Run request ↵
										</button>
										<div className="curl-output">
											<p className="http-status">HTTP/1.1 200 OK</p>
											<p className="response-label">
												Illustrative local response · not a live API
											</p>
											<pre>
												{JSON.stringify(
													{
														developer: "Jayvee Embog",
														focus: "Backend Engineering",
														projects: projects.map((p) => p.name),
														source: "github.com/PHCitizen",
													},
													null,
													2,
												)}
											</pre>
											<div className="request-result">
												<span className="status-light" /> Response received.
												Follow the source.
												<br />
												<button
													type="button"
													className="open-source-browser"
													onClick={() => jump(4)}
												>
													open https://github.com/PHCitizen ↗
												</button>
											</div>
										</div>
									</div>
								)}
								{index === 4 && (
									<div className="browser-layout">
										<div className="browser-tabs">
											<span>PHCitizen / repositories</span>
											<span>+</span>
										</div>
										<div className="address-bar">
											<span aria-hidden="true">← &nbsp; → &nbsp; ↻</span>
											<form
												onSubmit={(e) => {
													e.preventDefault();
													setWorkflow((old) => ({
														...old,
														browserLoaded: true,
														address: "https://github.com/PHCitizen",
													}));
												}}
											>
												<input
													className="browser-address"
													aria-label="Browser preview address"
													value={workflow.address}
													placeholder="Search or enter address"
													onChange={(e) =>
														setWorkflow((old) => ({
															...old,
															address: e.target.value,
														}))
													}
												/>
												<button
													type="submit"
													aria-label="Load repository preview"
												>
													↵
												</button>
											</form>
										</div>
										<div className="browser-loading">
											<AppIcon kind="Browser" />
											<p>Enter an address to open the source.</p>
										</div>
										<div className="browser-page">
											<div className="github-profile">
												<div className="profile-avatar">JE</div>
												<div>
													<h2>Built to be explored.</h2>
													<p>
														PHCitizen <span>/ Jayvee Embog</span>
													</p>
												</div>
												<a
													className="source-link"
													href="https://github.com/PHCitizen"
													target="_blank"
													rel="noreferrer"
												>
													Open GitHub ↗
												</a>
											</div>
											<p className="browser-note">
												Local preview of selected work. Repository links open
												the real source.
											</p>
											<label className="search-control repo-search-control">
												<SearchIcon />
												<input
													type="search"
													className="repository-search"
													aria-label="Search repositories"
													placeholder="Find a repository…"
													value={workflow.browserQuery}
													onChange={(e) =>
														setWorkflow((old) => ({
															...old,
															browserQuery: e.target.value,
														}))
													}
												/>
												<span>{matchingRepos.length} found</span>
											</label>
											{matchingRepos.map((p) => (
												<div
													className={`repo-row ${workflow.browserQuery ? "repo-selected" : ""}`}
													key={p.id}
												>
													<div>
														<h3>
															{p.href ? (
																<a
																	href={p.href}
																	target="_blank"
																	rel="noreferrer"
																>
																	{p.name} ↗
																</a>
															) : (
																p.name
															)}
														</h3>
														<p>{p.description}</p>
													</div>
													<span>{p.tags[0]}</span>
												</div>
											))}
											{!matchingRepos.length && (
												<p className="search-empty">
													No repositories found. Try Rust, swap, or Python.
												</p>
											)}
										</div>
									</div>
								)}
								{index === 5 && (
									<div className="git-layout">
										<div className="git-toolbar">
											<span className="git-branch">main</span>
											<code className="git-command">
												{linear ? chapters[5].command : workflow.gitCommand}
												<span className="input-caret">▌</span>
											</code>
											<span>Career timeline, not repository activity</span>
										</div>
										<div className="git-history">
											<Experience embedded />
										</div>
									</div>
								)}
								{index === 6 && (
									<div className="toolbox-layout">
										<h2>
											Right tool.
											<br />
											<span>Thoughtful solution.</span>
										</h2>
										<p>
											A toolkit for everything between the request and the
											response.
										</p>
										<div className="tool-groups">
											{skillGroups.map((group) => (
												<div className="tool-group" key={group.name}>
													<h3>{group.name}</h3>
													<div>
														{group.items.map((item) => (
															<span className="tool-token" key={item}>
																{item}
															</span>
														))}
													</div>
												</div>
											))}
										</div>
									</div>
								)}
								{index === 7 && (
									<>
										<div className="mail-envelope">
											<p>
												<span>To</span> embogjayvee@gmail.com
											</p>
											<p className="mail-subject">
												<span>Subject</span> The next thing we could build
											</p>
										</div>
										<Contact embedded />
									</>
								)}
							</div>
						</section>
					))}
				</div>
				<div className="workflow-cursor" aria-hidden="true">
					<span className="cursor-click" />
					<svg
						className="cursor-pointer"
						aria-hidden="true"
						width="27"
						height="34"
						viewBox="0 0 27 34"
					>
						<path
							d="M2 2v26l7-7 5 11 5-3-5-10h10Z"
							fill="#f3f7eb"
							stroke="#16200f"
							strokeWidth="2"
							strokeLinejoin="round"
						/>
					</svg>
					<span className="cursor-label" />
				</div>
				<div
					className={`app-switcher ${workflow.switcher ? "switcher-visible" : ""}`}
					aria-hidden="true"
				>
					<div>
						<AppIcon kind="Browser" />
						<span>Browser</span>
					</div>
					<div className="switcher-git">
						<AppIcon kind="Git" />
						<span>Git</span>
					</div>
					<div>
						<AppIcon kind="Terminal" />
						<span>Terminal</span>
					</div>
					<p>⌘ hold · Tab to switch</p>
				</div>
				<nav className="desktop-dock" aria-label="Workspace chapters">
					{chapters.map((chapter, i) => (
						<a
							href={`#${chapter.id}`}
							data-app={i}
							key={chapter.id}
							className={active === i ? "is-active" : ""}
							aria-current={active === i ? "step" : undefined}
							onClick={(e) => {
								e.preventDefault();
								jump(i);
							}}
						>
							<AppIcon kind={chapter.app} />
							<span>{chapter.id === "request" ? "curl" : chapter.app}</span>
							<i />
						</a>
					))}
				</nav>
				<div className="story-progress" />
			</div>
		</main>
	);
}

function SearchIcon() {
	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 20 20"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			aria-hidden="true"
		>
			<circle cx="8" cy="8" r="5" />
			<path d="m12 12 5 5" />
		</svg>
	);
}
