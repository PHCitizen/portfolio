import { useCallback, useEffect, useRef, useState } from "react";

const NOTES = [
	{ frequency: 784, delay: 0, length: 0.16, volume: 0.085 },
	{ frequency: 1175, delay: 0.045, length: 0.22, volume: 0.05 },
	{ frequency: 1568, delay: 0.085, length: 0.22, volume: 0.025 },
];

export function useMergeSound() {
	const [enabled, setEnabled] = useState(false);
	const wantsSound = useRef(false);
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

	const enable = () => {
		wantsSound.current = true;
		try {
			if (!audio.current) {
				const context = new AudioContext();
				const output = context.createGain();
				output.connect(context.destination);
				audio.current = { context, output };
			}
			const engine = audio.current;
			engine.output.gain.value = 1;
			// Call resume inside the click handler, while user activation is available.
			void engine.context.resume().then(
				() => {
					if (audio.current === engine && wantsSound.current) setEnabled(true);
				},
				() => {
					if (audio.current === engine) setEnabled(false);
				},
			);
		} catch {
			// Leave the visual merge usable if Web Audio isn't available.
			setEnabled(false);
		}
	};

	const toggle = () => {
		if (!enabled) {
			enable();
			return;
		}
		wantsSound.current = false;
		if (audio.current) audio.current.output.gain.value = 0;
		setEnabled(false);
	};

	const play = useCallback(() => {
		const engine = audio.current;
		if (!wantsSound.current || !engine || document.hidden) return;
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

	return { enabled, enable, toggle, play };
}
