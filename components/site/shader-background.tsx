"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const F3 = 1 / 3;
const G3 = 1 / 6;
const GRAD3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];

class SimplexNoise {
  private perm = new Uint8Array(512);
  private permMod12 = new Uint8Array(512);

  constructor(seed: number) {
    const p = new Uint8Array(256);
    let s = seed || 1;
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      s = (s * 16807) % 2147483647;
      const j = s % (i + 1);
      const tmp = p[i];
      p[i] = p[j];
      p[j] = tmp;
    }
    for (let i = 0; i < 512; i++) {
      this.perm[i] = p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }
  }

  noise3D(xin: number, yin: number, zin: number): number {
    const { perm, permMod12 } = this;
    let n0 = 0, n1 = 0, n2 = 0, n3 = 0;
    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s), j = Math.floor(yin + s), k = Math.floor(zin + s);
    const t = (i + j + k) * G3;
    const x0 = xin - (i - t), y0 = yin - (j - t), z0 = zin - (k - t);
    let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }
    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3, y3 = y0 - 1 + 3 * G3, z3 = z0 - 1 + 3 * G3;
    const ii = i & 255, jj = j & 255, kk = k & 255;
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 >= 0) { t0 *= t0; const g = GRAD3[permMod12[ii + perm[jj + perm[kk]]]]; n0 = t0 * t0 * (g[0] * x0 + g[1] * y0 + g[2] * z0); }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 >= 0) { t1 *= t1; const g = GRAD3[permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]]]; n1 = t1 * t1 * (g[0] * x1 + g[1] * y1 + g[2] * z1); }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 >= 0) { t2 *= t2; const g = GRAD3[permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]]]; n2 = t2 * t2 * (g[0] * x2 + g[1] * y2 + g[2] * z2); }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 >= 0) { t3 *= t3; const g = GRAD3[permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]]]; n3 = t3 * t3 * (g[0] * x3 + g[1] * y3 + g[2] * z3); }
    return 32 * (n0 + n1 + n2 + n3);
  }
}

// Marching-squares edge table: 4-bit case → edge pairs (0=top,1=right,2=bottom,3=left)
const EDGE_TABLE: number[][][] = [
  [], [[3, 2]], [[2, 1]], [[3, 1]], [[1, 0]], [[1, 0], [3, 2]], [[2, 0]], [[3, 0]],
  [[0, 3]], [[0, 2]], [[0, 3], [2, 1]], [[0, 1]], [[1, 3]], [[1, 2]], [[2, 3]], [],
];

type RGB = { r: number; g: number; b: number };
const CORAL: RGB = { r: 240, g: 104, b: 78 };
const MID: RGB = { r: 84, g: 94, b: 110 };
const GRAPHITE: RGB = { r: 49, g: 55, b: 66 };

function lerp(a: RGB, b: RGB, t: number): RGB {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}
const rgba = (c: RGB, a: number) => `rgba(${c.r},${c.g},${c.b},${a})`;

export function ShaderBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;
    // Aliased to non-null-typed locals so closures below keep the narrowing.
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const noise = new SimplexNoise(73);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const CELL = 14;
    const CONTOURS = 10;
    const NOISE_SCALE = 0.003;
    const SPEED = 0.12;
    const FRAME_MS = 1000 / 30;

    let W = 0;
    let H = 0;
    let field = new Float32Array(0);
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let running = false;
    let inView = true;
    let time = 0;
    let lastTs = 0;
    let acc = 0;
    let resizeTimer = 0;

    function fbm(x: number, y: number, z: number): number {
      let val = 0, amp = 1, freq = 1, sum = 0;
      for (let o = 0; o < 4; o++) {
        val += noise.noise3D(x * freq, y * freq, z) * amp;
        sum += amp;
        amp *= 0.5;
        freq *= 2;
      }
      return val / sum;
    }

    function interp(v1: number, v2: number, th: number): number {
      if (Math.abs(v2 - v1) < 0.0001) return 0.5;
      return (th - v1) / (v2 - v1);
    }

    function edgePoint(
      edge: number, cx: number, cy: number,
      tl: number, tr: number, br: number, bl: number, th: number,
    ): [number, number] {
      switch (edge) {
        case 0: return [cx + interp(tl, tr, th) * CELL, cy];
        case 1: return [cx + CELL, cy + interp(tr, br, th) * CELL];
        case 2: return [cx + interp(bl, br, th) * CELL, cy + CELL];
        case 3: return [cx, cy + interp(tl, bl, th) * CELL];
        default: return [cx, cy];
      }
    }

    function size() {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function renderFrame() {
      ctx.clearRect(0, 0, W, H);
      const c = Math.ceil(W / CELL) + 1;
      const r = Math.ceil(H / CELL) + 1;
      if (c !== cols || r !== rows) {
        cols = c;
        rows = r;
        field = new Float32Array(c * r);
      }

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          field[j * cols + i] = fbm(i * CELL * NOISE_SCALE, j * CELL * NOISE_SCALE, time);
        }
      }

      let min = Infinity, max = -Infinity;
      for (let k = 0; k < field.length; k++) {
        if (field[k] < min) min = field[k];
        if (field[k] > max) max = field[k];
      }
      const range = max - min || 1;
      for (let k = 0; k < field.length; k++) field[k] = (field[k] - min) / range;

      for (let cIdx = 0; cIdx < CONTOURS; cIdx++) {
        const th = (cIdx + 1) / (CONTOURS + 1);
        const color = th < 0.5 ? lerp(CORAL, MID, th * 2) : lerp(MID, GRAPHITE, (th - 0.5) * 2);
        const distFromCenter = Math.abs(th - 0.5) * 2;
        const baseAlpha = 0.045 + (1 - distFromCenter) * 0.085;
        const isMajor = cIdx % 5 === 0;
        const glowW = isMajor ? 3.5 : 2;
        const sharpW = isMajor ? 1.1 : 0.6;
        const glowA = baseAlpha * 0.35;
        const sharpA = baseAlpha * (isMajor ? 1 : 0.8);

        const segs: number[] = [];
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const tl = field[j * cols + i];
            const tr = field[j * cols + i + 1];
            const br = field[(j + 1) * cols + i + 1];
            const bl = field[(j + 1) * cols + i];
            const idx = (tl >= th ? 8 : 0) | (tr >= th ? 4 : 0) | (br >= th ? 2 : 0) | (bl >= th ? 1 : 0);
            const edges = EDGE_TABLE[idx];
            if (edges.length === 0) continue;
            const cx = i * CELL;
            const cy = j * CELL;
            for (const [e0, e1] of edges) {
              const p1 = edgePoint(e0, cx, cy, tl, tr, br, bl, th);
              const p2 = edgePoint(e1, cx, cy, tl, tr, br, bl, th);
              segs.push(p1[0], p1[1], p2[0], p2[1]);
            }
          }
        }
        if (segs.length === 0) continue;

        ctx.lineCap = "round";
        // glow pass
        ctx.beginPath();
        for (let s = 0; s < segs.length; s += 4) {
          ctx.moveTo(segs[s], segs[s + 1]);
          ctx.lineTo(segs[s + 2], segs[s + 3]);
        }
        ctx.strokeStyle = rgba(color, glowA);
        ctx.lineWidth = glowW;
        ctx.stroke();
        // sharp pass
        ctx.beginPath();
        for (let s = 0; s < segs.length; s += 4) {
          ctx.moveTo(segs[s], segs[s + 1]);
          ctx.lineTo(segs[s + 2], segs[s + 3]);
        }
        ctx.strokeStyle = rgba(color, sharpA);
        ctx.lineWidth = sharpW;
        ctx.stroke();
      }
    }

    function loop(ts: number) {
      if (!running) return;
      if (!lastTs) lastTs = ts;
      acc += ts - lastTs;
      lastTs = ts;
      if (acc >= FRAME_MS) {
        time += (acc / 1000) * SPEED;
        acc = 0;
        renderFrame();
      }
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduce) return;
      running = true;
      lastTs = 0;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
    function maybeRun() {
      if (reduce) return;
      if (inView && !document.hidden) start();
      else stop();
    }

    size();
    if (reduce) renderFrame();
    else start();

    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        size();
        if (reduce) renderFrame();
      }, 150);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        maybeRun();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVis = () => maybeRun();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* readability scrims: radial vignette + a left ground for hero text */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 85% at 50% 25%, transparent 0%, var(--color-background) 80%), linear-gradient(to right, var(--color-background) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
