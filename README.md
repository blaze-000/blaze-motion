# blaze-motion

**Motion, tuned once.** — subtle, RSC-safe motion primitives for React, distributed as a shadcn registry.

A tuned [motion.dev](https://motion.dev) engine you install with the shadcn CLI and **own**: editable files land in your project, and one `feel` config tunes the whole engine's speed, easing, distance, and stagger. The calm antidote to flashy motion kits.

→ **[motion.asmitsah.dev](https://motion.asmitsah.dev)** — docs with a page per component (live preview, install command, copy-paste source) and an interactive playground.

## Install

Grab everything in one command:

```bash
npx shadcn add https://motion.asmitsah.dev/r/all.json
```

Or install just the one you need — every component is its own item:

```bash
npx shadcn add https://motion.asmitsah.dev/r/slide-in.json
```

Either way you also get the shared `feel` config + provider, so the whole engine stays tunable from one file. Installing across projects? Register the namespace once, then use the shorthand:

```bash
npx shadcn registry add @blaze-motion=https://motion.asmitsah.dev/r/{name}.json
npx shadcn add @blaze-motion/all
```

## Set up once

Mount the provider once at your app root, then wrap anything:

```tsx
import { MotionProvider } from "@/components/motion/motion-provider";

export default function RootLayout({ children }) {
  return <MotionProvider>{children}</MotionProvider>;
}
```

## What you get

A small tuned core plus a full set of entrance, hover, and text primitives — [browse them all](https://motion.asmitsah.dev/docs), each with a live preview, its own install command, and copy-paste source.

**Core**

- **FadeIn** — opacity fade, for on-mount / above-the-fold.
- **Reveal** — a straight rise from below on scroll, once.
- **Stagger / StaggerItem** — sequenced children (flat exports).
- **CinematicImage** — a scale-down settle for large images.
- **PageTransition** — route transitions.

**Entrance** — one prop-driven component, many variants:

- **SlideIn** — directional fade + slide (`direction`, `distance`).
- **ScaleIn** — a soft grow-in, no bounce.
- **ClipReveal** — a clip-path edge wipe (`direction`).
- **GrowFromOrigin** — grows from a corner/anchor (`origin`) — dropdowns, popovers.
- **PerspectiveTiltIn** — a reveal with a whisper of depth.
- **InsetFrameReveal** · **ScaleXReveal** · **BlurFadeRise** · **GrayscaleReveal** — more entrance flavors.

**Text**

- **TextReveal** · **MaskTextReveal** — word- and line-level reveals.
- **LineReveal** — line-by-line body copy.
- **NumberTicker** — count-up.

**Hover & interaction**

- **Hover** — a generic hover wrapper (`lift` / `scale` / `tilt` / `glow`) for any element.
- **AnimatedUnderline** · **SiblingDimming** · **RadialStagger** · **ScrollProgressBar** · **SvgLineDraw** · **SpringPop** · **BlurToFocus**.

## Tune it

Everything derives from one `feel` block in `lib/motion.ts`:

```ts
export const feel = {
  duration: { fast: 0.2, base: 0.55, slow: 0.8 },
  ease: [0.22, 0.61, 0.36, 1],
  rise: 28,
  inView: 0.3,
  stagger: 0.08,
  // …distance tiers, hover, and text tokens live here too
} as const;
```

Slower project? Raise the durations. Snappier? Lower them. Change one value and every animation retunes at once — per-instance props still override where a section needs it.

## Why it's safe

- **RSC-safe by construction** — primitives are `'use client'` leaves; your pages stay Server Components.
- **Flat exports** — no compound `X.Item` that breaks across the server/client boundary.
- **Light by default** — only the DOM-animation feature set loads, under strict `LazyMotion`.
- **Reduced-motion honored** out of the box.
- **You own the files** — the source lands in your project, editable. No black box, no lock-in.

## License

[MIT](./LICENSE) · free and open-source.
