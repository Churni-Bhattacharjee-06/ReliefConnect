// ══════════════════════════════════════════
//  SIREN SOUND — Add this at the bottom of script.js
// ══════════════════════════════════════════

function playSiren() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    function beep(startTime, freq1, freq2, duration) {
        const oscillator = ctx.createOscillator();
        const gainNode   = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(freq1, startTime);
        oscillator.frequency.linearRampToValueAtTime(freq2, startTime + duration / 2);
        oscillator.frequency.linearRampToValueAtTime(freq1, startTime + duration);

        gainNode.gain.setValueAtTime(0.4, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }

    // Play 3 siren wails
    beep(ctx.currentTime + 0.0, 600, 900, 0.5);
    beep(ctx.currentTime + 0.5, 600, 900, 0.5);
    beep(ctx.currentTime + 1.0, 600, 900, 0.5);
}
