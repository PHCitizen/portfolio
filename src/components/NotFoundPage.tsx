import { Link } from "@tanstack/react-router";

export default function NotFoundPage() {
	return (
		<main className="mx-auto flex min-h-[65svh] max-w-[1312px] flex-col items-center justify-center px-6 py-12 text-center">
			<img
				src="/assets/404.svg"
				alt=""
				width={568}
				height={288}
				className="h-auto w-full max-w-[568px]"
			/>
			<h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[28px]">
				<span className="sr-only">404: </span>Page not found
			</h1>
			<p className="mt-2 text-base text-[#a3ab9f]">
				The page you’re looking for may have moved or no longer exists.
			</p>
			<Link
				to="/"
				className="mt-6 border border-[#3b4b33] px-5 py-3 font-mono text-sm hover:border-[#61cf5a] hover:text-[#61cf5a]"
			>
				Back to home
			</Link>
		</main>
	);
}
