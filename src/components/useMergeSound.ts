import { useCallback, useEffect, useRef, useState } from "react";

const NOTES = [
	{ frequency: 784, delay: 0, length: 0.16, volume: 0.085 },
	{ frequency: 1175, delay: 0.045, length: 0.22, volume: 0.05 },
	{ frequency: 1568, delay: 0.085, length: 0.22, volume: 0.025 },
];

export function useMergeSound() {
	const [enabled, setEnabled] = useState(true);
	const enabledRef = useRef(true);
	const audio = useRef<{ context: AudioContext; output: GainNode } | null>(
		null,
	);
	const lastChime = useRef(-Infinity);

	useEffect(() => {
		return () => {
			const engine = audio.current;
			audio.current = null;
			if (engine) void engine.context.close().catch(() => {});
		};
	}, []);

	const unlock = useCallback(() => {
		if (!enabledRef.current || audio.current?.context.state === "running")
			return;
		try {
			if (!audio.current) {
				const context = new AudioContext();
				const output = context.createGain();
				output.connect(context.destination);
				audio.current = { context, output };
			}
			void audio.current.context.resume().catch(() => {});
		} catch {
			// Leave the visual merge usable if Web Audio isn't available.
		}
	}, []);

	useEffect(() => {
		if (!enabled) return;
		// Browsers can require a tap, click, or key press before allowing sound.
		window.addEventListener("click", unlock);
		window.addEventListener("keydown", unlock);
		return () => {
			window.removeEventListener("click", unlock);
			window.removeEventListener("keydown", unlock);
		};
	}, [enabled, unlock]);

	const toggle = () => {
		const next = !enabledRef.current;
		enabledRef.current = next;
		setEnabled(next);
		if (audio.current) audio.current.output.gain.value = next ? 1 : 0;
		if (next) unlock();
	};

	const play = useCallback(() => {
		const engine = audio.current;
		if (!enabledRef.current || !engine || document.hidden) return;
		const { context, output } = engine;
		const now = context.currentTime;
		if (context.state !== "running" || now - lastChime.current < 0.35) return;
		lastChime.current = now;

		for (const { frequency, delay, length, volume } of NOTES) {
			const start = now + delay;
			const end = start + length;
			const tone = context.createOscillator();
			const envelope = context.createGain();
			tone.frequency.value = frequency;
			envelope.gain.setValueAtTime(0.0001, start);
			envelope.gain.exponentialRampToValueAtTime(volume, start + 0.012);
			envelope.gain.exponentialRampToValueAtTime(0.0001, end);
			tone.connect(envelope).connect(output);
			tone.onended = () => {
				tone.disconnect();
				envelope.disconnect();
			};
			tone.start(start);
			tone.stop(end);
		}
	}, []);

	return { enabled, toggle, play };
}
