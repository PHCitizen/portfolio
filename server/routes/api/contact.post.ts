import { assertBodySize, defineHandler } from "nitro/h3";

function reply(status: number, error?: string) {
	return Response.json(error ? { error } : { ok: true }, {
		status,
		headers: { "Cache-Control": "no-store" },
	});
}

export default defineHandler(async (event) => {
	const { req } = event;
	const url = new URL(req.url);
	const origin = req.headers.get("origin");
	if (origin && origin !== url.origin) return reply(403, "Invalid origin.");
	if (
		req.headers.get("content-type")?.split(";", 1)[0] !== "application/json"
	) {
		return reply(415, "Expected a JSON submission.");
	}

	try {
		await assertBodySize(event, 24 * 1024);
	} catch {
		return reply(413, "This message is too large. Shorten it and try again.");
	}

	const body: unknown = await req.json().catch(() => null);
	if (!body || typeof body !== "object")
		return reply(400, "Invalid submission.");
	const { name, email, message, token } = body as Record<string, unknown>;
	if (
		typeof name !== "string" ||
		!name.trim() ||
		name.length > 100 ||
		/[\r\n]/.test(name) ||
		typeof email !== "string" ||
		email.length > 254 ||
		!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
		typeof message !== "string" ||
		!message.trim() ||
		message.length > 3000
	) {
		return reply(
			400,
			"Enter your name, a valid email address, and a message (up to 3,000 characters).",
		);
	}
	if (typeof token !== "string" || !token || token.length > 2048) {
		return reply(400, "Complete the security check and try again.");
	}

	const env = req.runtime?.cloudflare?.env ?? process.env;
	const secret = env.TURNSTILE_SECRET_KEY;
	const bot = env.TELEGRAM_BOT_TOKEN;
	const chat = env.TELEGRAM_CHAT_ID;
	if (
		typeof secret !== "string" ||
		!secret ||
		typeof bot !== "string" ||
		!/^\d+:[\w-]+$/.test(bot) ||
		typeof chat !== "string" ||
		!chat
	) {
		return reply(
			503,
			"The form is unavailable right now. Please use email instead.",
		);
	}

	try {
		const verification = new URLSearchParams({ secret, response: token });
		const ip = req.runtime?.cloudflare
			? req.headers.get("cf-connecting-ip")
			: null;
		if (ip) verification.set("remoteip", ip);
		const response = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				body: verification,
				redirect: "manual",
				signal: AbortSignal.timeout(5000),
			},
		);
		if (!response.ok) throw new Error();
		const result = await response.json();
		if (
			result?.success !== true ||
			result.action !== "contact" ||
			result.hostname !== url.hostname
		) {
			return reply(
				400,
				"The security check didn’t pass. Complete it again, then resend.",
			);
		}
	} catch {
		console.error("Contact form: Turnstile verification request failed.");
		return reply(
			503,
			"The security check is unavailable. Try again or use email instead.",
		);
	}

	try {
		const response = await fetch(
			`https://api.telegram.org/bot${bot}/sendMessage`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					chat_id: chat,
					text: `Portfolio contact\nName: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
					link_preview_options: { is_disabled: true },
				}),
				redirect: "manual",
				signal: AbortSignal.timeout(8000),
			},
		);
		if (!response.ok || (await response.json())?.ok !== true) throw new Error();
		return reply(200);
	} catch {
		return reply(
			502,
			"Couldn’t confirm delivery. Try again or use email instead.",
		);
	}
});
