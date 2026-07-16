import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Shared social-preview (OG / Twitter) image, drawn in the "Plotter" design
// language: a brand-tinted graphite ground, one warm coral signal, a faint
// drafting grid, a FIG-panel frame, and the site's cubic-bezier ease curve.
// Consumed by both app/opengraph-image.tsx and app/twitter-image.tsx.

export const alt =
  "blaze-motion — Motion, tuned once. Subtle, RSC-safe motion primitives for Next.js + shadcn.";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

// Plotter tokens (mirrors app/globals.css — Satori can't read CSS variables).
const BG = "#16191F";
const CARD = "#1d212a";
const BORDER = "#313742";
const GRID = "#262b34";
const FOREGROUND = "#e7e9ee";
const MUTED = "#99a0ad";
const SIGNAL = "#f0684e";
const SIGNAL_STRONG = "#ff7d63";

async function loadFonts() {
  const dir = join(process.cwd(), "app", "_og-assets");
  const [bold, regular, mono] = await Promise.all([
    readFile(join(dir, "SchibstedGrotesk-Bold.ttf")),
    readFile(join(dir, "SchibstedGrotesk-Regular.ttf")),
    readFile(join(dir, "SplineSansMono-Medium.ttf")),
  ]);
  return [
    { name: "Schibsted Grotesk", data: bold, weight: 700 as const, style: "normal" as const },
    { name: "Schibsted Grotesk", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Spline Sans Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

export default async function renderOgImage() {
  let fonts: Awaited<ReturnType<typeof loadFonts>> | undefined;
  try {
    fonts = await loadFonts();
  } catch {
    // Graceful degradation: fall back to Satori's built-in font rather than
    // erroring the build if a font file is ever unavailable.
    fonts = undefined;
  }

  const sans = fonts ? "Schibsted Grotesk" : undefined;
  const monoFamily = fonts ? "Spline Sans Mono" : undefined;

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: BG,
        fontFamily: sans,
        overflow: "hidden",
      }}
    >
      {/* Faint drafting grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(to right, ${GRID} 1px, transparent 1px), linear-gradient(to bottom, ${GRID} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: 0.5,
        }}
      />
      {/* Warm signal glow, upper-right — keeps the coral as the single accent */}
      <div
        style={{
          position: "absolute",
          top: -220,
          right: -160,
          width: 620,
          height: 620,
          borderRadius: 620,
          background: `radial-gradient(circle, rgba(240,104,78,0.20) 0%, rgba(240,104,78,0.06) 42%, rgba(22,25,31,0) 70%)`,
        }}
      />

      {/* FIG-panel frame */}
      <div
        style={{
          position: "absolute",
          inset: 40,
          display: "flex",
          border: `1px solid ${BORDER}`,
          borderRadius: 18,
        }}
      />
      {/* Frame corner ticks */}
      {[
        { top: 34, left: 34 },
        { top: 34, right: 34 },
        { bottom: 34, left: 34 },
        { bottom: 34, right: 34 },
      ].map((pos) => (
        <div
          key={Object.keys(pos).join("-")}
          style={{
            position: "absolute",
            ...pos,
            width: 12,
            height: 12,
            display: "flex",
            backgroundColor: SIGNAL,
            opacity: 0.85,
            borderRadius: 2,
          }}
        />
      ))}

      {/* Content */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "84px 88px",
        }}
      >
        {/* Top row: wordmark + version chip */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* mini ease-curve glyph */}
          <svg width="34" height="34" viewBox="0 0 120 120" fill="none">
            <title>Ease-curve glyph</title>
            <rect x={10} y={10} width={100} height={100} stroke={GRID} strokeWidth={4} rx={4} />
            <path
              d="M10,110 C32,49 46,10 110,10"
              stroke={SIGNAL}
              strokeWidth={7}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: -0.6,
              color: FOREGROUND,
            }}
          >
            blaze-motion
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 4,
              padding: "6px 12px",
              border: `1px solid ${BORDER}`,
              borderRadius: 8,
              backgroundColor: CARD,
              fontFamily: monoFamily,
              fontSize: 17,
              letterSpacing: 0.6,
              color: MUTED,
            }}
          >
            motion 12.42
          </div>
        </div>

        {/* Middle: headline + curve panel */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 48,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
            <div
              style={{
                display: "flex",
                fontSize: 92,
                fontWeight: 700,
                letterSpacing: -3,
                lineHeight: 1.02,
                color: FOREGROUND,
              }}
            >
              Motion,
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 92,
                fontWeight: 700,
                letterSpacing: -3,
                lineHeight: 1.02,
                color: SIGNAL,
              }}
            >
              tuned once.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 30,
                fontSize: 27,
                lineHeight: 1.4,
                color: MUTED,
                maxWidth: 560,
              }}
            >
              Subtle, RSC-safe motion primitives for Next.js + shadcn.
            </div>
          </div>

          {/* Large ease-curve FIG panel */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 22,
              border: `1px solid ${BORDER}`,
              borderRadius: 16,
              backgroundColor: "rgba(29,33,42,0.55)",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: monoFamily,
                fontSize: 14,
                letterSpacing: 1.4,
                color: MUTED,
                marginBottom: 12,
              }}
            >
              FIG.01 — EASE
            </div>
            <svg width="300" height="300" viewBox="0 0 120 120" fill="none">
              <title>Cubic-bezier ease curve</title>
              <rect x={10} y={10} width={100} height={100} stroke={GRID} strokeWidth={1} rx={2} />
              <line x1={60} y1={10} x2={60} y2={110} stroke={GRID} strokeWidth={1} />
              <line x1={10} y1={60} x2={110} y2={60} stroke={GRID} strokeWidth={1} />
              <path
                d="M10,110 C32,49 46,10 110,10"
                stroke={SIGNAL}
                strokeWidth={2.6}
                strokeLinecap="round"
                fill="none"
              />
              <circle cx={10} cy={110} r={3} fill={SIGNAL} opacity={0.55} />
              <circle cx={110} cy={10} r={4.5} fill={SIGNAL_STRONG} />
            </svg>
            <div
              style={{
                display: "flex",
                fontFamily: monoFamily,
                fontSize: 13,
                letterSpacing: 0.6,
                color: MUTED,
                marginTop: 10,
              }}
            >
              cubic-bezier(.22,.61,.36,1)
            </div>
          </div>
        </div>

        {/* Bottom: url */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              width: 8,
              height: 8,
              borderRadius: 8,
              backgroundColor: SIGNAL,
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: monoFamily,
              fontSize: 19,
              letterSpacing: 0.4,
              color: MUTED,
            }}
          >
            motion.asmitsah.dev
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      ...(fonts ? { fonts } : {}),
    },
  );
}
