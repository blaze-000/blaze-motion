# blaze-motion

**Motion, tuned once.** — subtle, RSC-safe motion primitives for Next.js, distributed as a shadcn registry.

A tuned [motion.dev](https://motion.dev) engine you install with the shadcn CLI and **own**: editable files land in your repo, and one `feel` config tunes the whole engine's speed, easing, rise, and stagger. The calm antidote to flashy motion kits.

→ **[motion.asmitsah.dev](https://motion.asmitsah.dev)** — docs, live demos, and an interactive playground.

## Install

```bash
npx shadcn add https://motion.asmitsah.dev/r/all.json
```

One command drops all five primitives + the provider + the token file into your repo (editable) and installs `motion`.

Installing across projects? Register the namespace once, then use the shorthand:

```bash
npx shadcn registry add @blaze-motion=https://motion.asmitsah.dev/r/{name}.json
npx shadcn add @blaze-motion/all
```

## What you get

- **MotionProvider** — `LazyMotion` strict + `MotionConfig reducedMotion="user"`. Mount once in your root layout.
- **FadeIn** — opacity fade, for on-mount / above-the-fold.
- **Reveal** — a straight rise from below on scroll, once.
- **Stagger / StaggerItem** — sequenced children (flat exports).
- **CinematicImage** — a scale-down settle for large images.
- **PageTransition** — `AnimatePresence` route transitions.

## Tune it

Everything derives from one `feel` block in `lib/motion.ts`:

```ts
export const feel = {
  duration: { fast: 0.2, base: 0.55, slow: 0.8 },
  ease: [0.22, 0.61, 0.36, 1],
  rise: 28,
  inView: 0.3,
  stagger: 0.08,
} as const;
```

Slower project? Raise the durations. Snappier? Lower them. Per-instance props still override where a section needs it.

## Why it's safe

- **RSC-safe by construction** — primitives are `'use client'` leaves; your pages stay Server Components.
- **Flat exports** — no compound `X.Item` that goes undefined across the RSC boundary and crashes a Server Component at build.
- **`m` from `motion/react-m`** under strict `LazyMotion` — only the DOM-animation feature set loads, and a raw `motion.*` throws on purpose.
- **Reduced-motion honored** by default.

## License

[MIT](./LICENSE) · free and open-source.
