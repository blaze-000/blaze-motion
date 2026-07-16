import Link from "next/link";
import { EasingCurveMark } from "./easing-curve-mark";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Primitives", href: "/#primitives" },
      { label: "Docs", href: "/docs" },
      { label: "Install", href: "/#install" },
    ],
  },
  {
    heading: "Source",
    links: [
      { label: "GitHub", href: "https://github.com/blaze-000/blaze-motion", external: true },
      { label: "Registry (all.json)", href: "https://motion.asmitsah.dev/r/all.json", external: true },
      { label: "Built on motion.dev", href: "https://motion.dev", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="container-page px-6 py-14 lg:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <EasingCurveMark variant="nav" className="size-5" />
              <span className="text-[0.95rem] font-semibold tracking-tight text-foreground">
                blaze-motion
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A tuned motion engine and six composable primitives for Next.js + shadcn — curated on
              top of <a href="https://motion.dev" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-border underline-offset-2 hover:decoration-signal">motion.dev</a>, not a
              reinvention of it. Install once, own the files, tune the whole feel from one object.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="fig-label text-muted-foreground">{col.heading}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => {
                    const external = "external" in link && link.external;
                    const className =
                      "text-sm text-muted-foreground transition-colors hover:text-foreground";
                    return (
                      <li key={link.label}>
                        {external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={className}
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href} className={className}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <p className="font-mono text-xs text-muted-foreground">Motion, tuned once.</p>
          <p className="font-mono text-xs tabular-nums text-muted-foreground">
            MIT · motion.asmitsah.dev
          </p>
        </div>
      </div>
    </footer>
  );
}
