/**
 * Scoring Engine & Sound FX Generator
 * Implements FR-1.5: Base points + speed bonus based on remaining time.
 * Includes Web Audio synthesized sound effects for delightful user feedback.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  _ensureContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  /**
   * Play a clean, positive chime tone
   */
  playSuccess() {
    if (this.muted) return;
    try {
      this._ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  }

  /**
   * Play combo match sound with rising pitch
   */
  playCombo(streak = 1) {
    if (this.muted) return;
    try {
      this._ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const baseFreq = 440 * Math.pow(1.05, Math.min(streak, 10));
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.15);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }

  /**
   * Play gentle error buzz
   */
  playError() {
    if (this.muted) return;
    try {
      this._ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.2);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  /**
   * Play celebratory fanfare for high scores
   */
  playFanfare() {
    if (this.muted) return;
    try {
      this._ensureContext();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const now = this.ctx.currentTime + (i * 0.12);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      });
    } catch (e) {}
  }
}

export const sound = new SoundEngine();

export class ScoreEngine {
  /**
   * Calculate score for a correct question based on FR-1.5:
   * Base points + Speed bonus
   * @param {boolean} isCorrect 
   * @param {number} timeRemainingMs Milliseconds remaining
   * @param {number} totalTimeLimitMs Total question time limit in milliseconds
   * @param {number} basePoints Default 100
   * @param {number} maxSpeedBonus Default 50
   * @returns {{ total: number, base: number, speedBonus: number }}
   */
  static calculateItemScore(
    isCorrect,
    timeRemainingMs,
    totalTimeLimitMs,
    basePoints = 100,
    maxSpeedBonus = 50
  ) {
    if (!isCorrect || timeRemainingMs <= 0 || totalTimeLimitMs <= 0) {
      return { total: 0, base: 0, speedBonus: 0 };
    }

    const ratio = Math.max(0, Math.min(1, timeRemainingMs / totalTimeLimitMs));
    const speedBonus = Math.floor(maxSpeedBonus * ratio);
    const total = basePoints + speedBonus;

    return {
      total,
      base: basePoints,
      speedBonus
    };
  }

  /**
   * Formats score numbers with comma separation
   */
  static formatScore(val) {
    return Number(val || 0).toLocaleString();
  }
}
