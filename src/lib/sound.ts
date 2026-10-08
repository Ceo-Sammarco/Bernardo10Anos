/**
 * Sound & Haptics Engine for Bernardo 10 Anos
 * Includes Web Audio ambient track synthesizer + custom mp3 player + interactive SFX.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private audioElement: HTMLAudioElement | null = null;
  private synthInterval: number | null = null;
  private isInitialized: boolean = false;
  private useSynthFallback: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public async startMusic() {
    if (this.isMuted) return;
    this.initContext();

    if (!this.audioElement && typeof window !== "undefined") {
      this.audioElement = new Audio("/audio/trilha.mp3");
      this.audioElement.loop = true;
      this.audioElement.volume = 0.45;

      this.audioElement.addEventListener("error", () => {
        // If placeholder mp3 is invalid or empty, gracefully fallback to gentle ambient music box
        this.useSynthFallback = true;
        this.startAmbientSynth();
      });
    }

    if (this.audioElement && !this.useSynthFallback) {
      try {
        await this.audioElement.play();
      } catch {
        this.useSynthFallback = true;
        this.startAmbientSynth();
      }
    } else {
      this.startAmbientSynth();
    }
  }

  public stopMusic() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopAmbientSynth();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Gentle music box ambient synthesizer (cheerful, uplifting pentatonic arpeggio)
  private startAmbientSynth() {
    if (this.synthInterval || this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    // F frequencies pentatonic scale (soft celesta / music box feel)
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    let noteIdx = 0;

    this.synthInterval = window.setInterval(() => {
      if (this.isMuted || !this.ctx) return;
      
      const freq = notes[noteIdx % notes.length];
      noteIdx = (noteIdx + 3) % notes.length;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 1.25);
      } catch {
        // Ignore audio suspension
      }
    }, 600);
  }

  private stopAmbientSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  // SFX: Balloon Pop
  public playPop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
      this.triggerHaptic();
    } catch {}
  }

  // SFX: Star / Tap Sparkle Chime
  public playSparkle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      const startFreq = 880 + Math.random() * 400;
      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 1.5, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
      this.triggerHaptic();
    } catch {}
  }

  // SFX: Confetti celebration fanfare
  public playCelebration() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const chords = [523.25, 659.25, 783.99, 1046.50];
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.52);
        } catch {}
      }, idx * 90);
    });
    this.triggerHaptic(50);
  }

  // Haptics (Capacitor or Web API fallback)
  public triggerHaptic(duration = 25) {
    if (typeof window === "undefined") return;
    try {
      if (window.navigator && "vibrate" in window.navigator) {
        window.navigator.vibrate(duration);
      }
    } catch {}
  }
}

export const sound = new SoundEngine();
