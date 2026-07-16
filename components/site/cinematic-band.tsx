import Image from "next/image";
import { CinematicImage } from "@/components/motion/cinematic-image";

export function CinematicBand() {
  return (
    <section aria-label="Cinematic band" className="relative overflow-hidden py-6">
      <CinematicImage className="relative h-[52vh] min-h-[22rem] w-full overflow-hidden">
        <Image
          src="/cinematic/light-trails.jpg"
          alt="Long-exposure headlights and taillights drawn into settling streaks of red and white light on a dark road"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--color-background) 0%, transparent 35%, transparent 65%, var(--color-background) 100%), linear-gradient(to top, var(--color-background) 4%, transparent 40%)",
          }}
        />
        <div className="container-page absolute inset-x-0 bottom-0 px-6 pb-8 lg:px-12">
          <div className="flex items-end justify-between gap-4">
            <p className="fig-label text-muted-foreground">
              FIG.&nbsp;07
              <span className="px-1.5 text-border">·</span>
              <span className="text-foreground">Settle</span>
            </p>
            <p className="max-w-xs text-right font-mono text-[0.6875rem] tabular-nums text-muted-foreground">
              scale 1.1 → 1.0 · 0.8s · ease-out
            </p>
          </div>
        </div>
      </CinematicImage>
    </section>
  );
}
