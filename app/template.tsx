"use client";

import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/motion/page-transition";

// App Router re-mounts a template on every navigation, so the transition
// keys on routeKey (never key) to fade + shift on each route change.
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <PageTransition routeKey={pathname}>{children}</PageTransition>;
}
