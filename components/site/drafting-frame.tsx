const NOTCHES =
  "repeating-linear-gradient(to bottom, var(--color-grid) 0 1px, transparent 1px 48px)";

export function DraftingFrame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block"
    >
      <div className="container-page relative h-full px-6 lg:px-12">
        <div className="absolute inset-y-0 left-5 lg:left-6">
          <div className="h-full w-px bg-grid/70" />
          <div className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundImage: NOTCHES }} />
        </div>
        <div className="absolute inset-y-0 right-5 lg:right-6">
          <div className="h-full w-px bg-grid/70" />
          <div className="absolute inset-y-0 right-0 w-1.5" style={{ backgroundImage: NOTCHES }} />
        </div>
      </div>
    </div>
  );
}
