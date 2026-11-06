export default function Footer() {
	return (
		<footer className="mx-auto flex max-w-[1312px] flex-col items-center justify-between gap-5 border-t border-white/10 px-6 py-8 text-center font-mono text-[10px] text-[#7e877b] md:flex-row md:text-left">
			<a className="text-base font-bold text-[#e8ece5]" href="/#">
				jayvee<span className="text-[#61cf5a]">.dev_</span>
			</a>
			<p>Designed with intention. Built with code.</p>
			<span>
				© {new Date().getFullYear()} Jayvee Embog{" "}
				<span className="ml-3 text-[#50864c]">// end of file</span>
			</span>
		</footer>
	);
}
