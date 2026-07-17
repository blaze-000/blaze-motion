import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";

/**
 * Shared shell for every /docs page — the marketing <Nav> and <Footer> plus a
 * persistent component-navigation sidebar. Individual pages render only their
 * own content; the chrome lives here so it never double-renders.
 */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <div className="mx-auto flex w-full max-w-[100rem] flex-col lg:flex-row">
        <DocsSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <Footer />
    </>
  );
}
