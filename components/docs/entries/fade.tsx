import type { DocEntry, PropRow } from "@/components/docs/registry";
import { ReplayPreview } from "@/components/docs/replay-preview";
import { Fade } from "@/components/motion/fade";

/* ── Live preview ──────────────────────────────────────────────────────
 * Fade is the one prop-driven fade — it absorbs the old FadeIn / Reveal /
 * BlurToFocus / BlurFadeRise. One <ReplayPreview> (client) panel per notable
 * combination, each Fade on trigger="mount" so pressing a panel's Replay
 * remounts + re-plays just that fade. This entry stays a server module; it
 * only composes the client primitives.
 */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-foreground">
      {children}
    </div>
  );
}

function Demo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      <ReplayPreview label='direction="up" (default)'>
        <Fade trigger="mount" className="w-full">
          <Panel>Fades in with a subtle rise.</Panel>
        </Fade>
      </ReplayPreview>
      <ReplayPreview label='direction="none"'>
        <Fade direction="none" trigger="mount" className="w-full">
          <Panel>Pure opacity — no drift.</Panel>
        </Fade>
      </ReplayPreview>
      <ReplayPreview label='blur direction="none"'>
        <Fade blur direction="none" trigger="mount" className="w-full">
          <Panel>Blur → sharp — no drift.</Panel>
        </Fade>
      </ReplayPreview>
      <ReplayPreview label='blur direction="up"'>
        <Fade blur direction="up" trigger="mount" className="w-full">
          <Panel>Blur + rise, together.</Panel>
        </Fade>
      </ReplayPreview>
    </div>
  );
}

const props: PropRow[] = [
  { prop: "children", type: "ReactNode", def: "—", desc: "Content that fades in." },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — Fade becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
  {
    prop: "direction",
    type: '"none" | "up" | "down" | "left" | "right"',
    def: '"up"',
    desc: 'A fixed, subtle drift as it fades — "none" is pure opacity. Tunable travel is Slide\'s job.',
  },
  {
    prop: "blur",
    type: "boolean | number",
    def: "false",
    desc: "Layer a blur → sharp focus-in on top; true uses ~8px, a number sets custom px.",
  },
  {
    prop: "trigger",
    type: '"inView" | "mount"',
    def: '"inView"',
    desc: "Animate the first time it's in view (once), or immediately on mount.",
  },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Wrap anything — it fades in with a subtle upward drift. Already-in-view elements animate immediately, so this covers both above-the-fold and on-scroll.",
      code: `import { Fade } from "@/components/motion/fade";

<Fade className="grid gap-4">
  <h1>Fades in with a subtle rise.</h1>
</Fade>`,
    },
    {
      label: "Scroll reveal",
      note: "The default trigger is inView (once) — so a Fade below the fold rises in the first time it scrolls into view. This is the migration path off the old Reveal.",
      code: `<Fade direction="up" trigger="inView">
  <section>Rises into view, once.</section>
</Fade>`,
    },
    {
      label: "Pure opacity",
      note: 'direction="none" drops the drift for a straight opacity fade — the old FadeIn.',
      code: `<Fade direction="none">
  <h1>Pure opacity, no rise.</h1>
</Fade>`,
    },
    {
      label: "Blur focus-in",
      note: 'blur layers a blur → sharp settle on top of the fade (GPU-costly `filter` — opt-in). Since direction defaults to "up", a bare `<Fade blur>` also rises — use direction="none" for a pure focus-in with no movement.',
      code: `<Fade blur direction="none">
  <img src="/hero.jpg" alt="Product hero" />
</Fade>

<Fade blur direction="up">
  <h2>Blur + rise, together.</h2>
</Fade>`,
    },
    {
      label: "On mount + delay",
      note: 'trigger="mount" plays immediately regardless of viewport; delay offsets a sibling to sequence a hero without a full Stagger.',
      code: `<Fade trigger="mount">
  <h1>Leads</h1>
</Fade>
<Fade trigger="mount" delay={0.15}>
  <p>Follows, a beat later.</p>
</Fade>`,
    },
  ],
  props,
};

export default entry;
