(() => {
  // ======================================================================
  // ============================= CONFIG =================================
  // ======================================================================
  const START_OCTAVE_DEFAULT = 2;          // Default keyboard starts on C2
  const ONE_OCTAVE_ANCHOR_OCTAVE = 3;      // "Highlight (1 octave)" starts at/above C3
  const END_ON_FINAL_C = true;             // Include the final top C

  // Finger label vertical placement on WHITE keys:
  // The finger number is positioned this many pixels ABOVE the note name text.
  // Tweak this value to fine tune the spacing.
  const FINGER_WHITE_ABOVE_NOTE_PX = 20;

  const OUTER_H = 320;
  const BORDER_PX = 19;

  const WHITE_W = 40;
  const WHITE_H = OUTER_H - (BORDER_PX * 2);
  const BLACK_W = Math.round(WHITE_W * 0.62);
  const BLACK_H = Math.round(WHITE_H * 0.63);

  const RADIUS = 18;
  const WHITE_CORNER_R = 10;

  const EXPORT_SCALE = 2;

  // ======================================================================
  // =========================== NOTE MAPS =================================
  // ======================================================================
  // pc: C=0 ... B=11
  const WHITE_NOTES = ["C", "D", "E", "F", "G", "A", "B"];
  const WHITE_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

  const BLACK_BY_WHITE_INDEX = {
    0: ["C#", "Db", 1],
    1: ["D#", "Eb", 3],
    3: ["F#", "Gb", 6],
    4: ["G#", "Ab", 8],
    5: ["A#", "Bb", 10],
  };

  const PC_NAMES = [
    { sharp: "C",  flat: "C"  },
    { sharp: "C#", flat: "Db" },
    { sharp: "D",  flat: "D"  },
    { sharp: "D#", flat: "Eb" },
    { sharp: "E",  flat: "E"  },
    { sharp: "F",  flat: "F"  },
    { sharp: "F#", flat: "Gb" },
    { sharp: "G",  flat: "G"  },
    { sharp: "G#", flat: "Ab" },
    { sharp: "A",  flat: "A"  },
    { sharp: "A#", flat: "Bb" },
    { sharp: "B",  flat: "B"  },
  ];

  // ======================================================================
  // =========================== SCALES ===================================
  // ======================================================================
  const SCALES = {
    ionian:         { label: "Major (Ionian)",            intervals: [0, 2, 4, 5, 7, 9, 11] },
    dorian:         { label: "Dorian",                    intervals: [0, 2, 3, 5, 7, 9, 10] },
    phrygian:       { label: "Phrygian",                  intervals: [0, 1, 3, 5, 7, 8, 10] },
    lydian:         { label: "Lydian",                    intervals: [0, 2, 4, 6, 7, 9, 11] },
    mixolydian:     { label: "Mixolydian",                intervals: [0, 2, 4, 5, 7, 9, 10] },
    aeolian:        { label: "Natural Minor (Aeolian)",   intervals: [0, 2, 3, 5, 7, 8, 10] },
    locrian:        { label: "Locrian",                   intervals: [0, 1, 3, 5, 6, 8, 10] },
    harmonic_minor: { label: "Harmonic Minor",            intervals: [0, 2, 3, 5, 7, 8, 11] },
    melodic_minor:  { label: "Melodic Minor (ascending)", intervals: [0, 2, 3, 5, 7, 9, 11] },
  };

  // ======================================================================
  // =================== INTERVAL NAMING ==================================
  // ======================================================================
  const INTERVAL_INFO = {
    0:  { abbr: "P1", names: ["Unison", "Perfect 1st"] },
    1:  { abbr: "m2", names: ["Minor 2nd", "Semitone", "Half Step", "Augmented Unison"] },
    2:  { abbr: "M2", names: ["Major 2nd", "Whole Step", "Whole Tone"] },
    3:  { abbr: "m3", names: ["Minor 3rd"] },
    4:  { abbr: "M3", names: ["Major 3rd"] },
    5:  { abbr: "P4", names: ["Perfect 4th"] },
    6:  { abbr: "TT", names: ["Tritone", "Augmented 4th", "Diminished 5th"] },
    7:  { abbr: "P5", names: ["Perfect 5th"] },
    8:  { abbr: "m6", names: ["Minor 6th", "Augmented 5th"] },
    9:  { abbr: "M6", names: ["Major 6th", "Diminished 7th"] },
    10: { abbr: "m7", names: ["Minor 7th"] },
    11: { abbr: "M7", names: ["Major 7th", "Diminished Octave"] },
    12: { abbr: "P8", names: ["Octave", "Perfect 8th"] },
  };

  // ======================================================================
  // ============================= DOM ====================================
  // ======================================================================
  const mount = document.getElementById("mount");

  const range3Btn = document.getElementById("range3Btn");
  const range4Btn = document.getElementById("range4Btn");
  const range5Btn = document.getElementById("range5Btn");

  const handLeftBtn = document.getElementById("handLeftBtn");
  const handRightBtn = document.getElementById("handRightBtn");

  const colorLeft = document.getElementById("colorLeft");
  const colorRight = document.getElementById("colorRight");

  const fingerSelect = document.getElementById("fingerSelect");
  const showFingers = document.getElementById("showFingers");
  const clearFingersBtn = document.getElementById("clearFingersBtn");

  const clearBtn = document.getElementById("clearBtn");
  const downloadBtn = document.getElementById("downloadBtn");


  const playSimBtn = document.getElementById("playSimBtn");
  const playSeqBtn = document.getElementById("playSeqBtn");
  const stopNotesBtn = document.getElementById("stopNotesBtn");

  const triadQuality = document.getElementById("triadQuality");
  const triadInversion = document.getElementById("triadInversion");
  const showTriadBtn = document.getElementById("showTriadBtn");

  const seventhTriadQuality = document.getElementById("seventhTriadQuality");
  const seventhQuality = document.getElementById("seventhQuality");
  const showSeventhBtn = document.getElementById("showSeventhBtn");

  const intervalSelect = document.getElementById("intervalSelect");
  const showIntervalBtn = document.getElementById("showIntervalBtn");


  const rootSelect = document.getElementById("rootSelect");
  const scaleSelect = document.getElementById("scaleSelect");
  const applyScaleBtn = document.getElementById("applyScaleBtn");
  const applyAllBtn = document.getElementById("applyAllBtn");

  const analysisSubtitle = document.getElementById("analysisSubtitle");
  const notesOut = document.getElementById("notesOut");
  const bassIntervalsOut = document.getElementById("bassIntervalsOut");
  const rootIntervalsOut = document.getElementById("rootIntervalsOut");
  const chordsOut = document.getElementById("chordsOut");

  // Swatches apply to the active hand colour
  document.querySelectorAll(".swatch").forEach(btn => {
    const c = btn.dataset.color;
    btn.style.background = c;
    btn.addEventListener("click", () => {
      if (activeHand === "L") colorLeft.value = c;
      else colorRight.value = c;
      applyHighlightColors();
    });
  });

  // ======================================================================
  // ========================== STATE =====================================
  // ======================================================================
  let currentOctaves = 4;   // default to 4 (C2 start)
  let startOctave = START_OCTAVE_DEFAULT; // 2 for 4/5 octaves, 3 for 3-octave option
  let activeHand = "L";     // "L" | "R"

  // Auto-play control for chord / interval highlighting
  let autoPlayOnHighlight = false;

  // Current SVG reference (rebuilt when octave count changes)
  let svg = null;

  // ======================================================================
  // ============================== AUDIO =================================
  // ======================================================================
  // Audio files expected in /audio/ folder, e.g. c2.mp3, csharp2.mp3, ... up to c6.mp3 (and sharps accordingly)
  const AUDIO_DIR = "audio";
  const SEQ_NOTE_DURATION_SEC = 0.7;   // sequential mode: each note is truncated to this duration
  const SEQ_NOTE_OFFSET_SEC = 0.5;     // sequential mode: next note starts this many seconds after previous
  const SEQ_FADE_OUT_SEC = 0.1;        // sequential mode: fade to silence over this time (to avoid pops)
  const LIMITER_THRESHOLD_DB = -6;     // safety limiter threshold (dB)
  const SIMULTANEOUS_HEADROOM = 0.9;   // extra headroom for chords (0..1)

  // Pitch class -> filename stem
  const PC_TO_STEM = {
    0: "c",
    1: "csharp",
    2: "d",
    3: "dsharp",
    4: "e",
    5: "f",
    6: "fsharp",
    7: "g",
    8: "gsharp",
    9: "a",
    10: "asharp",
    11: "b"
  };

  /** @type {AudioContext|null} */
  let audioCtx = null;
  /** @type {GainNode|null} */
  let masterGain = null;
  /** @type {DynamicsCompressorNode|null} */
  let limiter = null;

  /** @type {Map<string, Promise<AudioBuffer|null>>} */
  const bufferPromiseCache = new Map();

  // Track voices so we can stop anything currently playing (or scheduled).
  const STOP_FADE_SEC = 0.04; // fast fade to avoid pops
  /** @type {Set<{src: AudioBufferSourceNode, gain: GainNode, startTime: number}>} */
  const activeVoices = new Set();

  function trackVoice(src, gain, startTime) {
    const voice = { src, gain, startTime };
    activeVoices.add(voice);

    src.onended = () => {
      activeVoices.delete(voice);
    };

    return voice;
  }

  function stopAllNotes() {
    const ctx = ensureAudioGraph();
    if (!ctx) return;

    const now = ctx.currentTime;
    const fade = STOP_FADE_SEC;

    // Copy to avoid mutation during iteration (onended callbacks).
    const voices = Array.from(activeVoices);

    voices.forEach(v => {
      try {
        // Cancel any scheduled envelope and fade out from *current* value.
        v.gain.gain.cancelScheduledValues(now);
        v.gain.gain.setTargetAtTime(0, now, fade / 6);

        // Ensure stop isn't scheduled before start (can throw).
        const stopAt = Math.max(now + fade, (v.startTime || now) + 0.001);
        v.src.stop(stopAt + 0.02);
      } catch {
        // ignore individual voice errors
      }
    });
  }


  function ensureAudioGraph() {
    if (audioCtx) return audioCtx;

    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) {
      alert("Your browser doesn’t support Web Audio (required for playback).");
      return null;
    }

    audioCtx = new Ctx();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.9;

    // Approximate limiter using a hard compressor. (Not a perfect brickwall, but effective.)
    limiter = audioCtx.createDynamicsCompressor();
    limiter.threshold.value = LIMITER_THRESHOLD_DB;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.001;
    limiter.release.value = 0.12;

    masterGain.connect(limiter);
    limiter.connect(audioCtx.destination);

    return audioCtx;
  }

  async function resumeAudioIfNeeded() {
    const ctx = ensureAudioGraph();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      try { await ctx.resume(); } catch {}
    }
  }

  function noteUrl(stem, octaveNum) {
    return `${AUDIO_DIR}/${stem}${octaveNum}.mp3`;
  }

  function getStemForPc(pc) {
    return PC_TO_STEM[(pc + 12) % 12] || null;
  }

  function getKeyAudioInfo(group) {
    const pc = Number(group.getAttribute("data-pc"));
    const oct = Number(group.getAttribute("data-oct"));
    const stem = getStemForPc(pc);
    if (!stem || Number.isNaN(oct)) return null;
    return { pc, oct, stem, url: noteUrl(stem, oct) };
  }

  function loadBuffer(url) {
    if (bufferPromiseCache.has(url)) return bufferPromiseCache.get(url);

    const p = (async () => {
      const ctx = ensureAudioGraph();
      if (!ctx) return null;

      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const ab = await res.arrayBuffer();
        return await ctx.decodeAudioData(ab);
      } catch {
        return null;
      }
    })();

    bufferPromiseCache.set(url, p);
    return p;
  }

  function gainForSimultaneousVoices(voiceCount) {
    const n = Math.max(1, voiceCount | 0);
    // Equal-power scaling keeps loudness reasonable as chord size grows.
    return Math.min(1, SIMULTANEOUS_HEADROOM / Math.sqrt(n));
  }

  function playBufferAt(buffer, whenSec, durationLimitSec = null, fadeOutSec = 0, gain = 1) {
    const ctx = ensureAudioGraph();
    if (!ctx || !masterGain) return null;

    const safeGain = Math.max(0, Number.isFinite(gain) ? gain : 1);

    const src = ctx.createBufferSource();
    src.buffer = buffer;

    const g = ctx.createGain();

    // Small fade-in to avoid clicks when many sources start at the same sample.
    const fadeIn = 0.004;
    g.gain.setValueAtTime(0, whenSec);
    g.gain.linearRampToValueAtTime(safeGain, whenSec + fadeIn);

    src.connect(g);
    g.connect(masterGain);

    // Track voice so "Stop Notes" can silence it (even if scheduled in the future).
    trackVoice(src, g, whenSec);

    if (durationLimitSec != null) {
      const end = whenSec + durationLimitSec;
      const fadeStart = Math.max(whenSec, end - Math.max(0, fadeOutSec));
      g.gain.setValueAtTime(safeGain, fadeStart);
      g.gain.linearRampToValueAtTime(0, end);
      // stop slightly after envelope end
      src.start(whenSec);
      src.stop(end + 0.02);
    } else {
      src.start(whenSec);
    }

    return src;
  }


  async function playKeyGroup(group, opts = {}) {
    // opts: { durationLimitSec?: number|null, fadeOutSec?: number, whenSec?: number }
    const info = getKeyAudioInfo(group);
    if (!info) return;

    await resumeAudioIfNeeded();

    const buf = await loadBuffer(info.url);
    if (!buf) {
      // Missing file (common if 5-octave mode reaches beyond provided samples).
      return;
    }

    const ctx = ensureAudioGraph();
    if (!ctx) return;
    let whenSec = (opts.whenSec != null) ? opts.whenSec : ctx.currentTime;
    // If decoding/loading took time, avoid scheduling in the past
    if (whenSec < ctx.currentTime) whenSec = ctx.currentTime;

    playBufferAt(
      buf,
      whenSec,
      (opts.durationLimitSec != null) ? opts.durationLimitSec : null,
      opts.fadeOutSec || 0,
      (opts.gain != null) ? opts.gain : 1
    );
  }

  async function playHighlightedSimultaneously() {
    if (!svg) return;
    await resumeAudioIfNeeded();
    const keys = getSelectedKeys(); // sorted low->high
    if (!keys.length) return;

    const ctx = ensureAudioGraph();
    if (!ctx) return;

    // Preload/decode all buffers first, then schedule them together.
    const buffers = await Promise.all(keys.map(async (k) => {
      const info = getKeyAudioInfo(k.node);
      if (!info) return null;
      return await loadBuffer(info.url);
    }));

    const playable = buffers.filter(Boolean);
    if (!playable.length) return;

    const perVoiceGain = gainForSimultaneousVoices(playable.length);
    const t0 = ctx.currentTime + 0.05;
    playable.forEach((buf) => {
      playBufferAt(buf, t0, null, 0, perVoiceGain);
    });
  }

  async function playHighlightedSequentiallyOverlapping() {
    if (!svg) return;
    await resumeAudioIfNeeded();
    const keys = getSelectedKeys(); // sorted low->high
    if (!keys.length) return;

    const ctx = ensureAudioGraph();
    if (!ctx) return;

    // Preload/decode all buffers first, then schedule in order.
    const buffers = await Promise.all(keys.map(async (k) => {
      const info = getKeyAudioInfo(k.node);
      if (!info) return null;
      return await loadBuffer(info.url);
    }));

    const estPolyphony = Math.max(1, Math.ceil(SEQ_NOTE_DURATION_SEC / SEQ_NOTE_OFFSET_SEC));
    const perVoiceGain = gainForSimultaneousVoices(estPolyphony);

    const t0 = ctx.currentTime + 0.05;
    buffers.forEach((buf, idx) => {
      if (!buf) return;
      const when = t0 + (idx * SEQ_NOTE_OFFSET_SEC);
      playBufferAt(buf, when, SEQ_NOTE_DURATION_SEC, SEQ_FADE_OUT_SEC, perVoiceGain);
    });
  }


  // ======================================================================
  // ========================= SVG HELPERS =================================
  // ======================================================================
  const SVG_NS = "http://www.w3.org/2000/svg";

  function el(name, attrs = {}, children = []) {
    const n = document.createElementNS(SVG_NS, name);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
    for (const ch of children) n.appendChild(ch);
    return n;
  }

  function hexToRgb(hex) {
    const h = String(hex).replace("#", "").trim();
    const full = h.length === 3 ? h.split("").map(x => x + x).join("") : h;
    const num = parseInt(full, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function rgbToHex(r, g, b) {
    const to = (x) => x.toString(16).padStart(2, "0");
    return `#${to(r)}${to(g)}${to(b)}`;
  }

  function darken(hex, amount01) {
    const { r, g, b } = hexToRgb(hex);
    const k = Math.max(0, Math.min(1, amount01));
    return rgbToHex(
      Math.round(r * (1 - k)),
      Math.round(g * (1 - k)),
      Math.round(b * (1 - k))
    );
  }

  function lighten(hex, amount01) {
    const { r, g, b } = hexToRgb(hex);
    const k = Math.max(0, Math.min(1, amount01));
    return rgbToHex(
      Math.round(r + (255 - r) * k),
      Math.round(g + (255 - g) * k),
      Math.round(b + (255 - b) * k)
    );
  }

  function highlightTextColor(hex) {
    return darken(hex, 0.45);
  }

  function rootFillColor(hex) {
    return darken(hex, 0.18);
  }

  function getOneOctaveAnchorAbs() {
    // Compute absolute offset for C3 relative to the current keyboard start.
    // If startOctave is 2, C3 is +12; if startOctave is 3, C3 is +0.
    const off = (ONE_OCTAVE_ANCHOR_OCTAVE - startOctave) * 12;
    return Math.max(0, off);
  }

  // ======================================================================
  // ========================= NAMING HELPERS ==============================
  // ======================================================================
  function preferFlats() {
    const t = (rootSelect.options[rootSelect.selectedIndex]?.textContent || "");
    const hasFlatOnly = t.includes("b") && !t.includes("#");
    return hasFlatOnly;
  }

  function pcNameSingle(pc) {
    const p = PC_NAMES[(pc + 12) % 12];
    if (p.sharp === p.flat) return p.sharp;
    return preferFlats() ? p.flat : p.sharp;
  }

  function pcNameBoth(pc) {
    const p = PC_NAMES[(pc + 12) % 12];
    if (p.sharp === p.flat) return p.sharp;
    return `${p.sharp}/${p.flat}`;
  }

  // Ordered spellings: preferred first, then the enharmonic equivalent (if any).
  function pcSpellingsOrdered(pc) {
    const p = PC_NAMES[(pc + 12) % 12];
    if (p.sharp === p.flat) return [p.sharp];
    return preferFlats() ? [p.flat, p.sharp] : [p.sharp, p.flat];
  }

  function escHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function intervalDisplay(semi) {
    // Keep 12 as "Octave" (P8) rather than collapsing to 0.
    const s0 = ((semi % 12) + 12) % 12;
    const s = (semi !== 0 && s0 === 0) ? 12 : s0;
    const info = INTERVAL_INFO[s];
    if (!info) return `${s} semitones`;
    return `${info.names.join(" / ")} (${info.abbr})`;
  }

  function uniqueByOrder(arr) {
    const seen = new Set();
    const out = [];
    for (const x of arr) {
      if (seen.has(x)) continue;
      seen.add(x);
      out.push(x);
    }
    return out;
  }

  function uniqueStrings(arr) {
    const seen = new Set();
    const out = [];
    for (const s of arr) {
      if (seen.has(s)) continue;
      seen.add(s);
      out.push(s);
    }
    return out;
  }

  // ======================================================================
  // ========================== KEY SHAPES =================================
  // ======================================================================
  function outerRoundedWhitePath(x, y, w, h, r, roundLeft, roundRight) {
    const rr = Math.max(0, Math.min(r, Math.min(w / 2, h / 2)));
    if (roundLeft) {
      return [
        `M ${x + rr} ${y}`,
        `H ${x + w}`,
        `V ${y + h}`,
        `H ${x + rr}`,
        `A ${rr} ${rr} 0 0 1 ${x} ${y + h - rr}`,
        `V ${y + rr}`,
        `A ${rr} ${rr} 0 0 1 ${x + rr} ${y}`,
        `Z`
      ].join(" ");
    }
    return [
      `M ${x} ${y}`,
      `H ${x + w - rr}`,
      `A ${rr} ${rr} 0 0 1 ${x + w} ${y + rr}`,
      `V ${y + h - rr}`,
      `A ${rr} ${rr} 0 0 1 ${x + w - rr} ${y + h}`,
      `H ${x}`,
      `V ${y}`,
      `Z`
    ].join(" ");
  }

  function makeWhiteKey(x, y, w, h, label, noteName, pc, abs, id, roundLeft, roundRight, octaveNum) {
    const shape = (roundLeft || roundRight)
      ? el("path", { d: outerRoundedWhitePath(x, y, w, h, WHITE_CORNER_R, roundLeft, roundRight) })
      : el("rect", { x, y, width: w, height: h });

    // Note name at bottom
    const noteTextY = y + h - 16;
    const text = el("text", { x: x + w / 2, y: noteTextY, "text-anchor": "middle" });
    text.textContent = label;

    // Finger number ABOVE the note name (tweak via FINGER_WHITE_ABOVE_NOTE_PX)
    const finger = el("text", {
      class: "fingerText",
      x: x + w / 2,
      y: noteTextY - FINGER_WHITE_ABOVE_NOTE_PX,
      "text-anchor": "middle"
    });
    finger.textContent = "";

    const g = el("g", {
      class: "key white",
      "data-id": id,
      "data-pc": pc,
      "data-abs": abs,
      "data-note": noteName,
      "data-oct": octaveNum
    }, [shape, text, finger]);

    g.addEventListener("click", () => handleKeyClick(g));
    return g;
  }

  function makeBlackKey(x, y, w, h, sharpName, flatName, pc, abs, id, octaveNum) {
    const rect = el("rect", { x, y, width: w, height: h, rx: 4, ry: 4 });

    const text = el("text", { x: x + w / 2, y: y + Math.round(h * 0.46), "text-anchor": "middle" });
    const t1 = el("tspan", { x: x + w / 2, dy: "-6" }); t1.textContent = sharpName;
    const t2 = el("tspan", { x: x + w / 2, dy: "14" }); t2.textContent = flatName;
    text.appendChild(t1);
    text.appendChild(t2);

    const finger = el("text", {
      class: "fingerText",
      x: x + w / 2,
      y: y + h - 16,
      "text-anchor": "middle"
    });
    finger.textContent = "";

    const g = el("g", {
      class: "key black",
      "data-id": id,
      "data-pc": pc,
      "data-abs": abs,
      "data-oct": octaveNum
    }, [rect, text, finger]);

    g.addEventListener("click", () => handleKeyClick(g));
    return g;
  }

  // ======================================================================
  // ============================ BUILD SVG ================================
  // ======================================================================
  function buildKeyboard(octaves, startOct) {
    const totalWhite = octaves * 7 + (END_ON_FINAL_C ? 1 : 0);
    const innerW = totalWhite * WHITE_W;
    const outerW = innerW + (BORDER_PX * 2);

    svg = el("svg", {
      id: "pianoSvg",
      width: outerW,
      height: OUTER_H,
      viewBox: `0 0 ${outerW} ${OUTER_H}`,
      role: "img",
      "aria-label": "Keyboard"
    });

    // Toggle for showing finger labels
    svg.classList.toggle("showFingers", !!showFingers?.checked);

    // Inline SVG CSS
    const style = document.createElementNS(SVG_NS, "style");
    style.textContent = `
      .white rect, .white path { fill:#fff; stroke:#222; stroke-width:1; }
      .white text { font-family: Arial, Helvetica, sans-serif; font-size:14px; fill:#9a9a9a; pointer-events:none; user-select:none; }

      .white.selected.handL rect, .white.selected.handL path { fill: var(--hlL); }
      .white.selected.handL text { fill: var(--hlTextL); font-weight:700; }

      .white.selected.handR rect, .white.selected.handR path { fill: var(--hlR); }
      .white.selected.handR text { fill: var(--hlTextR); font-weight:700; }

      .white.root.handL rect, .white.root.handL path { fill: var(--hlRootL); }
      .white.root.handL text { fill: var(--hlTextL); font-weight:800; }

      .white.root.handR rect, .white.root.handR path { fill: var(--hlRootR); }
      .white.root.handR text { fill: var(--hlTextR); font-weight:800; }

      .black rect { fill: url(#blackGrad); stroke:#111; stroke-width:1; }
      .black text { font-family: Arial, Helvetica, sans-serif; font-size:12px; fill:#fff; pointer-events:none; user-select:none; opacity:0; }

      .black.selected.handL rect { fill: url(#hlBlackGradL); }
      .black.selected.handL text { opacity:1; }

      .black.selected.handR rect { fill: url(#hlBlackGradR); }
      .black.selected.handR text { opacity:1; }

      .black.root.handL rect { fill: url(#hlBlackRootGradL); }
      .black.root.handL text { opacity:1; }

      .black.root.handR rect { fill: url(#hlBlackRootGradR); }
      .black.root.handR text { opacity:1; }

      .key { cursor:pointer; }
      .fingerText { font-family: Arial, Helvetica, sans-serif; font-weight: 900; font-size: 14px; opacity: 0; pointer-events:none; user-select:none; }
      .black .fingerText { font-size: 12px; fill: #fff; }
      .white .fingerText { fill: #111; }

      /* Only show finger numbers when enabled + when a number exists */
      svg.showFingers .fingerText.hasFinger { opacity: 1; }

      /* Click flash */
      .key.flash { animation: keyGlow 320ms ease-out; }
      .white.flash rect, .white.flash path { animation: whiteFlash 260ms ease-out; }

      @keyframes whiteFlash {
        0%   { fill: var(--flash); }
        100% { fill: var(--finalFill); }
      }

      @keyframes keyGlow {
        0%   { filter: drop-shadow(0 0 0px rgba(0,0,0,0)); }
        40%  { filter: drop-shadow(0 0 10px var(--flash)); }
        100% { filter: drop-shadow(0 0 0px rgba(0,0,0,0)); }
      }
    `;
    svg.appendChild(style);

    const defs = el("defs");

    const blackGrad = el("linearGradient", { id: "blackGrad", x1: "0", y1: "0", x2: "0", y2: "1" }, [
      el("stop", { offset: "0%", "stop-color": "#3a3a3a" }),
      el("stop", { offset: "100%", "stop-color": "#000000" }),
    ]);

    const hlBlackGradL = el("linearGradient", { id: "hlBlackGradL", x1: "0", y1: "0", x2: "0", y2: "1" }, [
      el("stop", { id: "hlLStopTop", offset: "0%", "stop-color": "#4da3ff" }),
      el("stop", { id: "hlLStopBot", offset: "100%", "stop-color": "#1f4a73" }),
    ]);

    const hlBlackGradR = el("linearGradient", { id: "hlBlackGradR", x1: "0", y1: "0", x2: "0", y2: "1" }, [
      el("stop", { id: "hlRStopTop", offset: "0%", "stop-color": "#ff6b6b" }),
      el("stop", { id: "hlRStopBot", offset: "100%", "stop-color": "#733131" }),
    ]);

    const hlBlackRootGradL = el("linearGradient", { id: "hlBlackRootGradL", x1: "0", y1: "0", x2: "0", y2: "1" }, [
      el("stop", { id: "hlRootLStopTop", offset: "0%", "stop-color": "#3b86d6" }),
      el("stop", { id: "hlRootLStopBot", offset: "100%", "stop-color": "#1a3f63" }),
    ]);

    const hlBlackRootGradR = el("linearGradient", { id: "hlBlackRootGradR", x1: "0", y1: "0", x2: "0", y2: "1" }, [
      el("stop", { id: "hlRootRStopTop", offset: "0%", "stop-color": "#d65454" }),
      el("stop", { id: "hlRootRStopBot", offset: "100%", "stop-color": "#633030" }),
    ]);

    defs.appendChild(blackGrad);
    defs.appendChild(hlBlackGradL);
    defs.appendChild(hlBlackGradR);
    defs.appendChild(hlBlackRootGradL);
    defs.appendChild(hlBlackRootGradR);
    svg.appendChild(defs);

    svg.appendChild(el("rect", {
      x: BORDER_PX / 2,
      y: BORDER_PX / 2,
      width: outerW - BORDER_PX,
      height: OUTER_H - BORDER_PX,
      rx: RADIUS,
      ry: RADIUS,
      fill: "#ffffff",
      stroke: "#000000",
      "stroke-width": BORDER_PX
    }));

    const gWhite = el("g", { id: "whiteKeys" });
    const gBlack = el("g", { id: "blackKeys" });
    svg.appendChild(gWhite);
    svg.appendChild(gBlack);

    // Build keys
    const startX = BORDER_PX;
    const startY = BORDER_PX;

    for (let i = 0; i < totalWhite; i++) {
      const x = startX + (i * WHITE_W);
      const noteName = WHITE_NOTES[i % 7];
      const pc = WHITE_PC[noteName];
      const octIndex = Math.floor(i / 7);
      const abs = (octIndex * 12) + pc;
      const octaveNum = startOct + octIndex;

      // Only label C4 as "C4"; everything else stays as just the note name
      const label = (noteName === "C" && octaveNum === 4) ? "C4" : noteName;

      const id = `W|${octIndex}|${noteName}`;
      const isFirst = (i === 0);
      const isLast = (i === totalWhite - 1);

      gWhite.appendChild(
        makeWhiteKey(x, startY, WHITE_W, WHITE_H, label, noteName, pc, abs, id, isFirst, isLast, octaveNum)
      );
    }

    for (let oct = 0; oct < octaves; oct++) {
      const baseWhite = oct * 7;
      const octaveNum = startOct + oct;

      Object.entries(BLACK_BY_WHITE_INDEX).forEach(([whiteI, info]) => {
        const wi = Number(whiteI);
        const [sharpName, flatName, pc] = info;

        const leftWhiteX = startX + ((baseWhite + wi) * WHITE_W);
        const x = leftWhiteX + WHITE_W - (BLACK_W / 2);

        const abs = (oct * 12) + pc;
        const id = `B|${oct}|${sharpName}`;
        gBlack.appendChild(makeBlackKey(x, startY, BLACK_W, BLACK_H, sharpName, flatName, pc, abs, id, octaveNum));
      });
    }

    mount.innerHTML = "";
    mount.appendChild(svg);

    applyHighlightColors();
    updateAnalysis();
  }

  // ======================================================================
  // ========================= COLOUR HANDLING =============================
  // ======================================================================
  function applyHighlightColors() {
    if (!svg) return;

    const l = colorLeft.value;
    const r = colorRight.value;

    const lText = highlightTextColor(l);
    const rText = highlightTextColor(r);

    const lBlackBottom = darken(l, 0.35);
    const rBlackBottom = darken(r, 0.35);

    const lRootTop = rootFillColor(l);
    const rRootTop = rootFillColor(r);

    const lRootBottom = darken(lRootTop, 0.35);
    const rRootBottom = darken(rRootTop, 0.35);

    svg.style.setProperty("--hlL", l);
    svg.style.setProperty("--hlR", r);
    svg.style.setProperty("--hlTextL", lText);
    svg.style.setProperty("--hlTextR", rText);
    svg.style.setProperty("--hlRootL", lRootTop);
    svg.style.setProperty("--hlRootR", rRootTop);

    const setStop = (id, c) => {
      const node = svg.querySelector(`#${id}`);
      if (node) node.setAttribute("stop-color", c);
    };

    setStop("hlLStopTop", l);
    setStop("hlLStopBot", lBlackBottom);
    setStop("hlRStopTop", r);
    setStop("hlRStopBot", rBlackBottom);

    setStop("hlRootLStopTop", lRootTop);
    setStop("hlRootLStopBot", lRootBottom);
    setStop("hlRootRStopTop", rRootTop);
    setStop("hlRootRStopBot", rRootBottom);
  }

  colorLeft.addEventListener("input", applyHighlightColors);
  colorRight.addEventListener("input", applyHighlightColors);

  // ======================================================================
  // ============================ UI CONTROLS ==============================
  // ======================================================================
  function setActiveHand(hand) {
    activeHand = hand;
    handLeftBtn.classList.toggle("isActive", hand === "L");
    handRightBtn.classList.toggle("isActive", hand === "R");
  }

  handLeftBtn.addEventListener("click", () => setActiveHand("L"));
  handRightBtn.addEventListener("click", () => setActiveHand("R"));

  function setRangePreset(preset) {
    // preset: "3" = 3 octaves from C3, "4" = 4 octaves from C2, "5" = 5 octaves from C2
    if (preset === "3") {
      currentOctaves = 3;
      startOctave = 3;
    } else if (preset === "5") {
      currentOctaves = 5;
      startOctave = 2;
    } else {
      currentOctaves = 4;
      startOctave = 2;
    }

    range3Btn.classList.toggle("isActive", currentOctaves === 3);
    range4Btn.classList.toggle("isActive", currentOctaves === 4);
    range5Btn.classList.toggle("isActive", currentOctaves === 5);

    buildKeyboard(currentOctaves, startOctave);
  }

  range3Btn.addEventListener("click", () => setRangePreset("3"));
  range4Btn.addEventListener("click", () => setRangePreset("4"));
  range5Btn.addEventListener("click", () => setRangePreset("5"));

  showFingers.addEventListener("change", () => {
    if (!svg) return;
    svg.classList.toggle("showFingers", !!showFingers.checked);
  });

  clearFingersBtn.addEventListener("click", () => {
    if (!svg) return;
    svg.querySelectorAll(".fingerText").forEach(t => {
      t.textContent = "";
      t.classList.remove("hasFinger");
    });
  });

  // ======================================================================
  // ====================== CLICK HANDLING + FLASH =========================
  // ======================================================================
  function activeHandColor() {
    return (activeHand === "L") ? colorLeft.value : colorRight.value;
  }

  function triggerFlash(group) {
    if (!svg) return;

    const base = activeHandColor();
    const flash = lighten(base, 0.22);
    group.style.setProperty("--flash", flash);

    // For white keys, animate to the correct final fill based on selection
    let finalFill = "#ffffff";
    if (group.classList.contains("selected")) {
      if (group.classList.contains("handL")) finalFill = "var(--hlL)";
      if (group.classList.contains("handR")) finalFill = "var(--hlR)";
    }
    group.style.setProperty("--finalFill", finalFill);

    // Restart animation if spam-clicked
    group.classList.remove("flash");
    try { group.getBBox(); } catch {}
    group.classList.add("flash");

    window.setTimeout(() => {
      group.classList.remove("flash");
      group.style.removeProperty("--flash");
      group.style.removeProperty("--finalFill");
    }, 340);
  }

  function setFingerOnGroup(group, fingerValue) {
    const t = group.querySelector(".fingerText");
    if (!t) return;
    if (!fingerValue) {
      t.textContent = "";
      t.classList.remove("hasFinger");
      return;
    }
    t.textContent = String(fingerValue);
    t.classList.add("hasFinger");
  }

  function handleKeyClick(group) {
    // Manual clicks remove root emphasis until scale re-applied
    group.classList.remove("root");

    const wasSelected = group.classList.contains("selected");
    const wasHand = group.classList.contains("handL") ? "L" : (group.classList.contains("handR") ? "R" : null);

    let willSelect = true;
    let willHand = activeHand;

    if (!wasSelected) {
      willSelect = true;
      willHand = activeHand;
    } else {
      if (wasHand && wasHand !== activeHand) {
        // switch hand colour but keep selected
        willSelect = true;
        willHand = activeHand;
      } else {
        // toggle off
        willSelect = false;
        willHand = null;
      }
    }

    group.classList.remove("selected", "handL", "handR");
    if (willSelect) {
      group.classList.add("selected", willHand === "L" ? "handL" : "handR");
    }

    const finger = fingerSelect.value;
    if (willSelect && finger) setFingerOnGroup(group, finger);
    if (!willSelect) setFingerOnGroup(group, "");

    // Play audio ONLY when a note becomes highlighted via a manual click (not when scales are applied)
    if (!wasSelected && willSelect) {
      // fire-and-forget
      playKeyGroup(group);
    }

    triggerFlash(group);
    updateAnalysis();
  }

  function clearSelection() {
    if (!svg) return;
    svg.querySelectorAll(".key").forEach(k => {
      k.classList.remove("selected", "root", "handL", "handR");
      setFingerOnGroup(k, "");
    });
    updateAnalysis();
  }

  clearBtn.addEventListener("click", clearSelection);

  if (playSimBtn) playSimBtn.addEventListener("click", playHighlightedSimultaneously);
  if (playSeqBtn) playSeqBtn.addEventListener("click", playHighlightedSequentiallyOverlapping);
  if (stopNotesBtn) stopNotesBtn.addEventListener("click", stopAllNotes);

  // ======================================================================
  // ============================ SCALES ===================================
  // ======================================================================
  function buildScalePitchClassSet(rootPc, scaleKey) {
    const def = SCALES[scaleKey];
    if (!def) return null;
    return new Set(def.intervals.map(i => (rootPc + i) % 12));
  }

  function applyScaleOneOctave(rootPc, scaleKey) {
    const pcs = buildScalePitchClassSet(rootPc, scaleKey);
    if (!pcs || !svg) return;

    clearSelection();

    const anchorAbs = getOneOctaveAnchorAbs();
    const startAbs = anchorAbs + (rootPc % 12);
    const endAbs = startAbs + 12;

    const handClass = (activeHand === "L") ? "handL" : "handR";

    svg.querySelectorAll(".key").forEach(k => {
      const pc = Number(k.getAttribute("data-pc"));
      const abs = Number(k.getAttribute("data-abs"));

      // <= endAbs includes the 8th note (e.g. C...C)
      if (abs >= startAbs && abs <= endAbs && pcs.has(pc)) {
        k.classList.add("selected", handClass);
        if (pc === rootPc && abs === startAbs) k.classList.add("root");
      }
    });

    updateAnalysis();
  }

  function applyScaleAll(rootPc, scaleKey) {
    const pcs = buildScalePitchClassSet(rootPc, scaleKey);
    if (!pcs || !svg) return;

    clearSelection();

    const handClass = (activeHand === "L") ? "handL" : "handR";

    svg.querySelectorAll(".key").forEach(k => {
      const pc = Number(k.getAttribute("data-pc"));
      if (pcs.has(pc)) {
        k.classList.add("selected", handClass);
        if (pc === rootPc) k.classList.add("root");
      }
    });

    updateAnalysis();
  }

  applyScaleBtn.addEventListener("click", () => {
    const rootPc = Number(rootSelect.value);
    const scaleKey = scaleSelect.value;
    applyScaleOneOctave(rootPc, scaleKey);
  });


  // ======================================================================
  // ============================ CHORDS ==================================
  // ======================================================================
  const TRIAD_QUALITIES = {
    maj: [0, 4, 7],
    min: [0, 3, 7],
    aug: [0, 4, 8],
    dim: [0, 3, 6],
  };

  const SEVENTH_INTERVALS = {
    maj7: 11, // Major 7th above the root
    min7: 10, // Minor 7th above the root
  };

  function rotateArray(arr, n) {
    const k = ((n % arr.length) + arr.length) % arr.length;
    return arr.slice(k).concat(arr.slice(0, k));
  }

  // Returns notes as { pc, oct } in ascending order, with bass anchored at octave 3.
  function buildChordVoicing(rootPc, intervals, inversion, bassOctave = 3) {
    const pcs = intervals.map(i => (rootPc + i) % 12);
    const voicedPcs = rotateArray(pcs, inversion || 0);

    const notes = [];
    let prevPitch = null; // pitch = oct*12 + pc (oct is the piano octave number)

    voicedPcs.forEach((pc, idx) => {
      let oct = bassOctave;
      if (idx === 0) {
        // bass always starts in octave 3
        oct = bassOctave;
      } else {
        // minimal octave so pitches ascend
        while ((oct * 12 + pc) <= prevPitch) oct += 1;
      }
      const pitch = (oct * 12 + pc);
      prevPitch = pitch;
      notes.push({ pc, oct, pitch });
    });

    // Sort (should already be ascending, but keep it safe)
    notes.sort((a, b) => a.pitch - b.pitch);
    return notes;
  }

  function absFromPcOct(pc, oct) {
    return ((oct - startOctave) * 12) + pc;
  }

  function highlightChordNotes(notes, rootPc) {
    if (!svg) return;

    // Stop any currently playing notes
    stopAllNotes();

    clearSelection();

    const handClass = (activeHand === "L") ? "handL" : "handR";

    notes.forEach(n => {
      const abs = absFromPcOct(n.pc, n.oct);
      const key = svg.querySelector(`.key[data-abs="${abs}"]`);
      if (!key) return;
      key.classList.add("selected", handClass);
      if (n.pc === rootPc) key.classList.add("root");
    });

    updateAnalysis();

    // Auto-play only when enabled (chords / intervals, not scales)
    if (autoPlayOnHighlight) {
      playHighlightedSimultaneously();
    }
  }

  if (showTriadBtn) {
    showTriadBtn.addEventListener("click", () => {
      const rootPc = Number(rootSelect.value);
      const qualityKey = (triadQuality && triadQuality.value) ? triadQuality.value : "maj";
      const inversion = (triadInversion && triadInversion.value) ? Number(triadInversion.value) : 0;

      const intervals = TRIAD_QUALITIES[qualityKey] || TRIAD_QUALITIES.maj;
      const notes = buildChordVoicing(rootPc, intervals, inversion, 3);
      autoPlayOnHighlight = true;
      highlightChordNotes(notes, rootPc);
      autoPlayOnHighlight = false;
    });
  }

  
if (showSeventhBtn) {
  showSeventhBtn.addEventListener("click", () => {
    const rootPc = Number(rootSelect.value);

    // 7th chord builder:
    // - pick a triad quality (always root position)
    // - then add either a Major 7th (11) or Minor 7th (10) above the root
    const triadKey =
      (seventhTriadQuality && seventhTriadQuality.value) ? seventhTriadQuality.value : "maj";
    const seventhKey =
      (seventhQuality && seventhQuality.value) ? seventhQuality.value : "maj7";

    const triadIntervals = TRIAD_QUALITIES[triadKey] || TRIAD_QUALITIES.maj;
    const seventhInterval = SEVENTH_INTERVALS[seventhKey] ?? SEVENTH_INTERVALS.maj7;

    const intervals = [...triadIntervals, seventhInterval];

    // Root position only
    const notes = buildChordVoicing(rootPc, intervals, 0, 3);
    autoPlayOnHighlight = true;
      highlightChordNotes(notes, rootPc);
      autoPlayOnHighlight = false;
  });
}

  // ====================================================================
  // ========================= INTERVALS =================================
  // ====================================================================
  // Highlight root + a single interval above it, anchored at octave 3.
  function buildIntervalDyad(rootPc, semis, rootOctave = 3) {
    const s = Math.max(0, Math.min(12, Number(semis) || 0));

    const rootPitch = (rootOctave * 12) + (rootPc % 12);
    const targetPitch = rootPitch + s;

    const targetPc = ((targetPitch % 12) + 12) % 12;
    const targetOct = Math.floor(targetPitch / 12);

    const notes = [
      { pc: rootPc % 12, oct: rootOctave, pitch: rootPitch },
      { pc: targetPc,    oct: targetOct,  pitch: targetPitch },
    ];

    // If unison, de-dupe so we don't try to highlight the same key twice.
    if (s === 0) notes.pop();

    return notes;
  }

  if (showIntervalBtn) {
    showIntervalBtn.addEventListener("click", () => {
      const rootPc = Number(rootSelect.value);
      const semis = intervalSelect ? Number(intervalSelect.value) : 0;
      const notes = buildIntervalDyad(rootPc, semis, 3);
      // Always include the root.
      if (!notes.length) notes.push({ pc: rootPc % 12, oct: 3, pitch: (3 * 12) + (rootPc % 12) });
      autoPlayOnHighlight = true;
      highlightChordNotes(notes, rootPc);
      autoPlayOnHighlight = false;
    });
  }


  applyAllBtn.addEventListener("click", () => {
    const rootPc = Number(rootSelect.value);
    const scaleKey = scaleSelect.value;
    applyScaleAll(rootPc, scaleKey);
  });

  // ======================================================================
  // ========================= EXPORT PNG ==================================
  // ======================================================================
  function svgToPngDownload(filename = "keyboard.png") {
    if (!svg) return;

    const serializer = new XMLSerializer();
    let svgText = serializer.serializeToString(svg);

    if (!svgText.includes('xmlns="http://www.w3.org/2000/svg"')) {
      svgText = svgText.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      const vb = svg.viewBox.baseVal;

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(vb.width * EXPORT_SCALE);
      canvas.height = Math.round(vb.height * EXPORT_SCALE);

      const ctx = canvas.getContext("2d");
      ctx.setTransform(EXPORT_SCALE, 0, 0, EXPORT_SCALE, 0, 0);
      ctx.imageSmoothingEnabled = true;

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      canvas.toBlob((pngBlob) => {
        const a = document.createElement("a");
        const pngUrl = URL.createObjectURL(pngBlob);
        a.href = pngUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(pngUrl), 1500);
      }, "image/png");
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      alert("Export failed in this browser. Tell me which browser you’re using and I’ll adjust the export method.");
    };

    img.src = url;
  }

  downloadBtn.addEventListener("click", () => svgToPngDownload("keyboard.png"));

  // ======================================================================
  // ===================== CHORD DETECTION (STRICT) ========================
  // ======================================================================
  function getSelectedKeys() {
    const nodes = [...svg.querySelectorAll(".key.selected")];
    return nodes.map(n => ({
      node: n,
      pc: Number(n.getAttribute("data-pc")),
      abs: Number(n.getAttribute("data-abs")),
      id: n.getAttribute("data-id"),
    })).sort((a, b) => a.abs - b.abs);
  }

  function intervalSetForRoot(pcSet, rootPc) {
    const out = new Set();
    for (const pc of pcSet) out.add(((pc - rootPc) + 12) % 12);
    out.add(0);
    return out;
  }

  // Build chord symbol(s), including enharmonic equivalents where applicable.
  // Example: rootPc=1 (C#/Db) -> returns ["C#...", "Db..."] (order follows root selector preference).
  function chordSuffixVariants(suffix, alts) {
    const out = new Set();
    const add = (s) => out.add(s);
  
    // ---------- MAJOR ----------
    // maj7, maj9, maj11, maj13 → △, △9, △11, △13
    if (suffix.startsWith("maj")) {
      add(suffix);
  
      const ext = suffix.slice(3); // "" | "7" | "9" | "11" | "13"
  
      if (ext === "7") {
        add("△");          // C△ instead of C△7
      } else if (ext) {
        add(`△${ext}`);    // C△9, C△11, C△13
      }
  
      return [...out];
    }
  
    // ---------- MINOR ----------
    if (suffix === "m") {
      add("m");
      add("-");
      return [...out];
    }
  
    if (suffix === "m7") {
      add("m7");
      add("-7");
      return [...out];
    }
  
    // ---------- DOMINANT ----------
    if (suffix === "7") {
      add("7");
      return [...out];
    }
  
    // ---------- AUGMENTED ----------
    if (suffix === "aug") {
      add("aug");
      add("+");
      return [...out];
    }
  
    // ---------- DIMINISHED ----------
    if (suffix === "dim") {
      add("dim");
      add("°");
      return [...out];
    }
  
    if (suffix === "dim7") {
      add("dim7");
      add("°7");
      return [...out];
    }
  
    // ---------- HALF-DIMINISHED ----------
    if (suffix === "m7b5") {
      add("m7b5");
      add("ø7");
      return [...out];
    }
  
    // ---------- ALTERED DOMINANT ----------
    if (suffix === "alt") {
      add("7alt");
      add("alt");
      return [...out];
    }
  
    // ---------- FALLBACK ----------
    add(suffix);
    return [...out];
  }
  
  

  function buildChordSymbols(rootPc, suffix, alts, bassPc) {
    const roots = pcSpellingsOrdered(rootPc);
    const needSlash = (bassPc != null && bassPc !== rootPc);
    const basses = needSlash ? pcSpellingsOrdered(bassPc) : [null];

    const suffixes = chordSuffixVariants(suffix, alts);

    const out = [];
    for (const rName of roots) {
      for (const suf of suffixes) {
        // For "alt" names, we intentionally omit the explicit alteration list to keep
        // the common shorthand clean (e.g., "G7alt" not "G7alt(b9,#9,b13)").
        const omitAlts = (suf === "alt" || suf.endsWith("alt"));

        let base = rName + suf;
        if (alts.length && !omitAlts) base += `(${alts.join(",")})`;

        if (!needSlash) {
          out.push(base);
        } else {
          for (const bName of basses) {
            out.push(`${base}/${bName}`);
          }
        }
      }
    }
    return uniqueStrings(out);
  }

  function detectOneBestChord(pcSet, bassPc) {
    const pcs = [...pcSet].sort((a,b)=>a-b);
    if (!pcs.length) return null;

    if (pcs.length === 1) {
      const rootPc = pcs[0];
      return { rootPc, names: buildChordSymbols(rootPc, "", [], bassPc) };
    }

    const candidates = pcs;

    let best = null;

    for (const rootPc of candidates) {
      const iv = intervalSetForRoot(pcSet, rootPc);
      const res = classifyChordStrict(iv, rootPc, bassPc);
      if (!res) continue;

      let score = 0;
      if (rootPc === bassPc) score += 5;
      score += res.kindScore;
      score += pcs.length;

      if (iv.has(3) || iv.has(4)) score += 2;

      if (!best || score > best.score) {
        best = { score, rootPc, names: res.names };
      }
    }

    return best;
  }

  function classifyChordStrict(iv, rootPc, bassPc) {
    const has = (n) => iv.has(n);

    const hasM3 = has(4);
    const hasm3 = has(3);
    const hasP5 = has(7);
    const hasb5 = has(6);
    const hasSharp5 = has(8);

    const hasMaj7 = has(11);
    const hasMin7 = has(10);

    const has9 = has(2);
    const has11 = has(5);
    const has13 = has(9);

    const hasb9 = has(1);

    if (hasMaj7 && hasMin7) return null;

    const looksDim7 = hasm3 && hasb5 && has13 && !hasMaj7 && !hasMin7 && !hasP5 && !hasM3;
    if (looksDim7) {
      return {
        kindScore: 7,
        names: buildChordSymbols(rootPc, "dim7", [], bassPc)
      };
    }

    let quality = null;
    if (hasM3 && hasP5) quality = "maj";
    else if (hasm3 && hasP5) quality = "min";
    else if (hasm3 && hasb5) quality = "dim";
    else if (hasM3 && hasSharp5) quality = "aug";
    else if (!hasM3 && !hasm3 && has(2) && hasP5) quality = "sus2";
    else if (!hasM3 && !hasm3 && has(5) && hasP5) quality = "sus4";
    else if (!hasM3 && !hasm3 && hasP5) quality = "power";

    if (!quality) return null;

    const seventh = hasMaj7 ? "maj7" : (hasMin7 ? "min7" : null);

    const alts = [];

    if (hasb9) alts.push("b9");

    const hasSharp9 = hasM3 && hasm3;
    if (hasSharp9) alts.push("#9");

    if (hasb5 && quality !== "dim") alts.push("#11");

    if (hasSharp5 && quality !== "aug" && seventh) alts.push("b13");

    const names = [];
    let kindScore = 0;

    const triadSuffix = (() => {
      switch (quality) {
        case "maj": return "";
        case "min": return "m";
        case "dim": return "dim";
        case "aug": return "aug";
        case "sus2": return "sus2";
        case "sus4": return "sus4";
        case "power": return "5";
        default: return "";
      }
    })();

    if (!seventh) {
      if (has13 && (quality === "maj" || quality === "min") && !hasMaj7 && !hasMin7) {
        if (has9) {
          const suf = (quality === "min") ? "m6/9" : "6/9";
          names.push(...buildChordSymbols(rootPc, suf, [], bassPc));
          kindScore = 6;
          return { kindScore, names: uniqueStrings(names) };
        } else {
          const suf = (quality === "min") ? "m6" : "6";
          names.push(...buildChordSymbols(rootPc, suf, [], bassPc));
          kindScore = 6;
          return { kindScore, names: uniqueStrings(names) };
        }
      }

      if (has9 && (quality === "maj" || quality === "min")) {
        const suf = (quality === "min") ? "m(add9)" : "add9";
        if (has11) {
          names.push(...buildChordSymbols(rootPc, `${suf}(add11)`, [], bassPc));
        } else {
          names.push(...buildChordSymbols(rootPc, suf, [], bassPc));
        }
        kindScore = 5;
        return { kindScore, names: uniqueStrings(names) };
      }

      if (has11 && (quality === "maj" || quality === "min")) {
        const suf = (quality === "min") ? "m(add11)" : "add11";
        names.push(...buildChordSymbols(rootPc, suf, [], bassPc));
        kindScore = 5;
        return { kindScore, names: uniqueStrings(names) };
      }

      names.push(...buildChordSymbols(rootPc, triadSuffix, [], bassPc));
      kindScore = 4;
      return { kindScore, names: uniqueStrings(names) };
    }

    if (quality === "dim" && seventh === "min7") {
      if (has9) {
        names.push(...buildChordSymbols(rootPc, "m7b5(add9)", [], bassPc));
        kindScore = 8;
      } else {
        names.push(...buildChordSymbols(rootPc, "m7b5", [], bassPc));
        kindScore = 7;
      }
      return { kindScore, names: uniqueStrings(names) };
    }

    if (quality === "min" && seventh === "maj7") {
      if (has13) {
        names.push(...buildChordSymbols(rootPc, "m(maj13)", alts, bassPc));
        kindScore = 11;
      } else if (has11) {
        names.push(...buildChordSymbols(rootPc, "m(maj11)", alts, bassPc));
        kindScore = 10;
      } else if (has9) {
        names.push(...buildChordSymbols(rootPc, "m(maj9)", alts, bassPc));
        names.push(...buildChordSymbols(rootPc, "m(maj7(add9))", alts, bassPc));
        kindScore = 9;
      } else {
        names.push(...buildChordSymbols(rootPc, "m(maj7)", alts, bassPc));
        kindScore = 8;
      }
      return { kindScore, names: uniqueStrings(names) };
    }

    const isDominantish = (quality === "maj" || quality === "sus2" || quality === "sus4") && seventh === "min7";
    const isMajorish = (quality === "maj") && seventh === "maj7";
    const isMinorish = (quality === "min") && seventh === "min7";

    const ext = (has13 ? 13 : (has11 ? 11 : (has9 ? 9 : 7)));

    if (isDominantish) {
      if (ext === 13) {
        names.push(...buildChordSymbols(rootPc, "13", alts, bassPc));
        kindScore = 12;
      } else if (ext === 11) {
        names.push(...buildChordSymbols(rootPc, "11", alts, bassPc));
        kindScore = 11;
      } else if (ext === 9) {
        names.push(...buildChordSymbols(rootPc, "9", alts, bassPc));
        names.push(...buildChordSymbols(rootPc, "7(add9)", alts, bassPc));
        kindScore = 10;
      } else {
        const suf = (quality === "sus2") ? "7sus2" : (quality === "sus4" ? "7sus4" : "7");
        names.push(...buildChordSymbols(rootPc, suf, alts, bassPc));
        kindScore = 8;
      }
      return { kindScore, names: uniqueStrings(names) };
    }

    if (isMajorish) {
      if (ext === 13) {
        names.push(...buildChordSymbols(rootPc, "maj13", alts, bassPc));
        kindScore = 12;
      } else if (ext === 11) {
        names.push(...buildChordSymbols(rootPc, "maj11", alts, bassPc));
        kindScore = 11;
      } else if (ext === 9) {
        names.push(...buildChordSymbols(rootPc, "maj9", alts, bassPc));
        names.push(...buildChordSymbols(rootPc, "maj7(add9)", alts, bassPc));
        kindScore = 10;
      } else {
        names.push(...buildChordSymbols(rootPc, "maj7", alts, bassPc));
        kindScore = 8;
      }
      return { kindScore, names: uniqueStrings(names) };
    }

    if (isMinorish) {
      if (ext === 13) {
        names.push(...buildChordSymbols(rootPc, "m13", alts, bassPc));
        kindScore = 12;
      } else if (ext === 11) {
        names.push(...buildChordSymbols(rootPc, "m11", alts, bassPc));
        kindScore = 11;
      } else if (ext === 9) {
        names.push(...buildChordSymbols(rootPc, "m9", alts, bassPc));
        names.push(...buildChordSymbols(rootPc, "m7(add9)", alts, bassPc));
        kindScore = 10;
      } else {
        names.push(...buildChordSymbols(rootPc, "m7", alts, bassPc));
        kindScore = 8;
      }
      return { kindScore, names: uniqueStrings(names) };
    }

    const base7 = (seventh === "maj7") ? "maj7" : "7";
    names.push(...buildChordSymbols(rootPc, triadSuffix + base7, alts, bassPc));
    kindScore = 7;
    return { kindScore, names: uniqueStrings(names) };
  }

  // ======================================================================
  // ===================== LIVE ANALYSIS OUTPUT ============================
  // ======================================================================
  function updateAnalysis() {
    if (!svg) return;
    const keys = getSelectedKeys();

    if (!keys.length) {
      analysisSubtitle.textContent = "No notes selected.";
      notesOut.textContent = "—";
      bassIntervalsOut.textContent = "—";
      rootIntervalsOut.textContent = "—";
      chordsOut.innerHTML = "—";
      return;
    }

    const bass = keys[0];
    const bassPc = bass.pc;

    const pcsInOrder = uniqueByOrder(keys.map(k => k.pc));
    const pcSet = new Set(pcsInOrder);

    const noteList = pcsInOrder.map(pc => pcNameBoth(pc));
    notesOut.textContent = noteList.join(", ");

    const bassIntervals = pcsInOrder
      .map(pc => ((pc - bassPc) + 12) % 12)
      .filter(semi => semi !== 0)
      .sort((a, b) => a - b)
      .map(semi => intervalDisplay(semi));
    bassIntervalsOut.textContent = bassIntervals.length ? bassIntervals.join(", ") : "—";

    // "Chord or Interval" output:
    // - 1 key: Perfect unison
    // - 2 keys: Interval between the two keys (above the lower key)
    // - 3+ keys: Chord detection
    if (keys.length === 1) {
      rootIntervalsOut.textContent = "—";
      const items = [`<li class="chordPrimary">${escHtml(intervalDisplay(0))}</li>`].join("");
      chordsOut.innerHTML = `<ul class="chordList">${items}</ul>`;
      return;
    }

    if (keys.length === 2) {
      // For two notes, treat the lower note as the reference "root".
      rootIntervalsOut.textContent = bassIntervalsOut.textContent;
      const semiRaw = Math.abs(keys[1].abs - keys[0].abs);
      let semi;
      if (semiRaw === 0) semi = 0;
      else if (semiRaw % 12 === 0) semi = 12;
      else semi = semiRaw % 12;

      const items = [`<li class="chordPrimary">${escHtml(intervalDisplay(semi))}</li>`].join("");
      chordsOut.innerHTML = `<ul class="chordList">${items}</ul>`;
      return;
    }

    const detected = detectOneBestChord(pcSet, bassPc);

    const rootPc = detected ? detected.rootPc : bassPc;
    const rootIntervals = [...pcSet]
      .map(pc => ((pc - rootPc) + 12) % 12)
      .filter(semi => semi !== 0)
      .sort((a, b) => a - b)
      .map(semi => intervalDisplay(semi));
    rootIntervalsOut.textContent = rootIntervals.length ? rootIntervals.join(", ") : "—";

    analysisSubtitle.textContent =
      `${keys.length} keys selected · ${pcSet.size} unique notes · Bass: ${pcNameSingle(bassPc)}`;

    if (!detected) {
      chordsOut.innerHTML = `<div class="muted">No standard chord name found for this note set.</div>`;
      return;
    }

    const namesDeduped = uniqueStrings(detected.names);
    const items = namesDeduped.map((name, idx) => {
      const cls = (idx === 0) ? "chordPrimary" : "chordAlt";
      return `<li class="${cls}">${escHtml(name)}</li>`;
    }).join("");

    chordsOut.innerHTML = `<ul class="chordList">${items}</ul>`;
  }

  // ======================================================================
  // ============================= INIT ====================================
  // ======================================================================
  setActiveHand("L");
  setRangePreset("4"); // this also builds the keyboard

})();