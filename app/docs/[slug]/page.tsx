import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InstallTabs } from "@/components/docs/install-tabs";
import { PropsTable } from "@/components/docs/props-table";
import { DOC_COMPONENTS, getDocMeta, loadDocEntry } from "@/components/docs/registry";
import { getRegistrySource, installCommandFor } from "@/components/docs/registry-source";
import { CodeBlock } from "@/components/site/code-block";
import { CopyButton } from "@/components/site/copy-button";

// The site is statically prerendered — enumerate every component slug.
export function generateStaticParams() {
  return DOC_COMPONENTS.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getDocMeta(slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/docs/${slug}` },
  };
}

function CategoryBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-0.5 font-mono text-xs text-signal">
      {children}
    </span>
  );
}

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-h3 text-foreground">
      {children}
    </h2>
  );
}

export default async function ComponentDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getDocMeta(slug);
  if (!meta) notFound();

  const [entry, registry] = await Promise.all([loadDocEntry(slug), getRegistrySource(slug)]);
  const installCommand = registry?.installCommand ?? installCommandFor(slug);

  return (
    <div className="relative">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-12 lg:py-16">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <Link
            href="/docs"
            className="w-fit font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            ← All components
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-display text-foreground">{meta.title}</h1>
            <CategoryBadge>{meta.category}</CategoryBadge>
          </div>
          <p className="max-w-2xl text-lead">{meta.description}</p>
        </div>

        <div className="mt-12 flex flex-col gap-12">
          {/* Live preview — usage code lives in the Usage section below */}
          {entry ? (
            <section className="flex flex-col gap-4">
              <div className="flex min-h-[16rem] items-center justify-center rounded-md border border-border bg-card p-8">
                <entry.Demo />
              </div>
            </section>
          ) : (
            <section className="rounded-md border border-dashed border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                A live preview and usage examples for{" "}
                <span className="text-foreground">{meta.title}</span> are on the way. The
                installation and full source below are ready to use today.
              </p>
            </section>
          )}

          {/* Installation */}
          <section className="flex flex-col gap-4">
            <SectionHeading id="installation">Installation</SectionHeading>
            {registry ? (
              <InstallTabs
                installCommand={installCommand}
                targetPath={registry.targetPath}
                dependencies={registry.dependencies}
                registryDependencies={registry.registryDependencies}
                sourceBlock={<CodeBlock code={registry.source} caption={registry.targetPath} />}
              />
            ) : (
              <div className="flex items-center gap-3 rounded-sm border border-border bg-panel-2 px-4 py-3 font-mono text-[0.8125rem]">
                <span className="select-none text-signal" aria-hidden>
                  $
                </span>
                <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-foreground [scrollbar-width:none]">
                  {installCommand}
                </code>
                <CopyButton
                  text={installCommand}
                  label="Copy install command"
                  className="shrink-0 rounded-md p-1"
                />
              </div>
            )}
          </section>

          {/* Usage */}
          {entry && entry.usage.length > 0 ? (
            <section className="flex flex-col gap-4">
              <SectionHeading id="usage">Usage</SectionHeading>
              <div className="flex flex-col gap-6">
                {entry.usage.map((snippet) => (
                  <div key={snippet.label} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-mono text-sm text-signal">{snippet.label}</h3>
                      {snippet.note ? (
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {snippet.note}
                        </p>
                      ) : null}
                    </div>
                    <CodeBlock code={snippet.code} />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Props / API */}
          {entry?.props && entry.props.length > 0 ? (
            <section className="flex flex-col gap-4">
              <SectionHeading id="props">Props</SectionHeading>
              <PropsTable rows={entry.props} />
              {entry.secondaryProps ? (
                <div className="mt-2 flex flex-col gap-4">
                  <h3 className="text-h3 text-foreground">{entry.secondaryProps.heading}</h3>
                  <PropsTable rows={entry.secondaryProps.rows} />
                </div>
              ) : null}
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
