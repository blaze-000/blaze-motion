import Link from "next/link";
import { SiblingDimming, SiblingDimmingItem } from "@/components/motion/sibling-dimming";
import { componentsByCategory } from "./registry";

/**
 * The /docs index — every component grouped by category, each card linking to
 * its dedicated page. Dogfoods <SiblingDimming>: hovering one card quiets the
 * rest of its row.
 */
export function ComponentIndex() {
  const groups = componentsByCategory();

  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => (
        <div key={group.category}>
          <p className="fig-label text-muted-foreground">{group.category}</p>
          <SiblingDimming className="mt-4 grid gap-3 sm:grid-cols-2">
            {group.items.map((item) => (
              <SiblingDimmingItem key={item.slug}>
                <Link
                  href={`/docs/${item.slug}`}
                  className="group flex h-full flex-col gap-1.5 rounded-md border border-border bg-card p-4 transition-colors hover:border-signal/40"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    {item.title}
                    <span
                      aria-hidden
                      className="text-signal opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      →
                    </span>
                  </span>
                  <span className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {item.description}
                  </span>
                </Link>
              </SiblingDimmingItem>
            ))}
          </SiblingDimming>
        </div>
      ))}
    </div>
  );
}
