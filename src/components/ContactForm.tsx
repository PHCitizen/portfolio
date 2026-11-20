import { type FormEvent, useEffect, useRef, useState } from "react";

const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const fieldClass =
	"w-full rounded-none border border-[#3b4b33] bg-[#0b0d0b] px-3 py-2.5 text-base text-[#e8ece5] caret-[#61cf5a] outline-none focus-visible:border-[#61cf5a] focus-visible:ring-1 focus-visible:ring-[#61cf5a]";

type Turnstile = {
	render: (
		element: HTMLElement,
		options: {
			sitekey: string;
			action: string;
			theme: "dark";
			size: "compact" | "flexible";
			"response-field": false;
			callback: (token: string) => void;
			"expired-callback": () => void;
			"error-callback": () => void;
		},
	) => string;
	reset: (id: string) => void;
	remove: (id: string) => void;
};

export default function ContactForm() {
	const slot = useRef<HTMLDivElement>(null);
	const widget = useRef<{ api: Turnstile; id: string } | null>(null);
	const [token, setToken] = useState("");
	const [check, setCheck] = useState<"loading" | "shown" | "failed">("loading");
	const [pending, setPending] = useState(false);
	const [status, setStatus] = useState<{ sent: boolean; text: string } | null>(
		null,
	);

	useEffect(() => {
		const element = slot.current;
		if (!siteKey || !element) return;
		const script = document.createElement("script");
		script.src =
			"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
		script.async = true;
		const timeout = window.setTimeout(() => setCheck("failed"), 10000);
		script.onload = () => {
			window.clearTimeout(timeout);
			try {
				const api = (window as Window & { turnstile?: Turnstile }).turnstile;
				if (!api) throw new Error();
				setCheck("shown");
				const id = api.render(element, {
					sitekey: siteKey,
					action: "contact",
					theme: "dark",
					size: element.clientWidth < 300 ? "compact" : "flexible",
					"response-field": false,
					callback: (value) => {
						setToken(value);
						setCheck("shown");
					},
					"expired-callback": () => setToken(""),
					"error-callback": () => {
						setToken("");
						setCheck("failed");
					},
				});
				widget.current = { api, id };
			} catch {
				setCheck("failed");
			}
		};
		script.onerror = () => {
			window.clearTimeout(timeout);
			setCheck("failed");
		};
		document.head.append(script);
		return () => {
			window.clearTimeout(timeout);
			script.onload = null;
			script.onerror = null;
			script.remove();
			widget.current?.api.remove(widget.current.id);
			widget.current = null;
		};
	}, []);

	async function send(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!token || pending) return;
		const form = event.currentTarget;
		const fields = new FormData(form);
		setPending(true);
		setStatus(null);
		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: fields.get("name"),
					email: fields.get("email"),
					message: fields.get("message"),
					token,
				}),
				signal: AbortSignal.timeout(18000),
			});
			const result = await response.json();
			if (response.ok && result?.ok === true) {
				form.reset();
				setStatus({
					sent: true,
					text: "Message sent. Thanks for reaching out!",
				});
			} else if (!response.ok && typeof result?.error === "string") {
				setStatus({ sent: false, text: result.error });
			} else {
				throw new Error();
			}
		} catch {
			setStatus({
				sent: false,
				text: "Couldn’t confirm delivery. Try again or use email instead.",
			});
		} finally {
			setPending(false);
			setToken("");
			widget.current?.api.reset(widget.current.id);
		}
	}

	return (
		<form
			className="relative z-10 min-w-0 border-t border-[#3b4b33] pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
			aria-labelledby="contact-form-title"
			action="/api/contact"
			method="post"
			onSubmit={send}
		>
			<h3
				id="contact-form-title"
				className="text-2xl font-semibold tracking-tight"
			>
				Send a message
			</h3>
			{siteKey ? (
				<>
					<fieldset className="mt-5 grid min-w-0 gap-4" disabled={pending}>
						<div className="grid gap-4 xl:grid-cols-2">
							<label className="grid min-w-0 gap-1.5 text-sm font-medium">
								Name
								<input
									className={fieldClass}
									name="name"
									autoComplete="name"
									maxLength={100}
									required
								/>
							</label>
							<label className="grid min-w-0 gap-1.5 text-sm font-medium">
								Email
								<input
									className={fieldClass}
									name="email"
									type="email"
									autoComplete="email"
									maxLength={254}
									required
								/>
							</label>
						</div>
						<label className="grid min-w-0 gap-1.5 text-sm font-medium">
							Message
							<textarea
								className={`${fieldClass} min-h-28 resize-y`}
								name="message"
								rows={4}
								maxLength={3000}
								required
							/>
						</label>
					</fieldset>
					<div ref={slot} className="mt-4 max-w-full" />
					<output className="block text-sm leading-6 text-[#a9b49f]">
						{check === "loading" && "Loading the security check…"}
						{check === "failed" &&
							"The security check couldn’t load. Reload the page or use email instead."}
					</output>
					<button
						type="submit"
						disabled={!token || pending}
						className="mt-4 w-full cursor-pointer border border-[#61cf5a] bg-[#61cf5a] px-5 py-3 font-mono text-sm font-bold text-[#0b0d0b] transition-colors hover:bg-[#8be784] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#61cf5a] disabled:cursor-not-allowed disabled:border-[#3b4b33] disabled:bg-[#1b2518] disabled:text-[#a9b49f] sm:w-auto"
					>
						{pending ? "Sending…" : "Send message"}
					</button>
					<output
						className={`block text-sm leading-6 ${status ? "mt-3" : ""} ${status?.sent ? "text-[#8be784]" : "text-[#ffb4a9]"}`}
					>
						{status?.text}
					</output>
					<noscript>
						<p className="mt-3 text-sm text-[#a9b49f]">
							Enable JavaScript to send a message, or use email instead.
						</p>
					</noscript>
				</>
			) : (
				<p className="mt-4 text-sm leading-6 text-[#a9b49f]">
					The form is unavailable right now. Please use email instead.
				</p>
			)}
		</form>
	);
}
