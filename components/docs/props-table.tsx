import type { PropRow } from "./docs-data";

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border bg-card">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th key={h} className="fig-label px-4 py-2.5 font-normal text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.prop} className="border-b border-border/60 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[0.8125rem] text-signal">{row.prop}</td>
              <td className="px-4 py-2.5 font-mono text-[0.8125rem] text-muted-foreground">{row.type}</td>
              <td className="px-4 py-2.5 font-mono text-[0.8125rem] tabular-nums text-muted-foreground">
                {row.def}
              </td>
              <td className="px-4 py-2.5 text-[0.8125rem] text-muted-foreground">{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
