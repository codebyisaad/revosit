import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. The item list is rendered twice so the CSS
 * translate can loop at -50% without a visible seam; the clone is hidden
 * from assistive tech.
 */
export function Marquee({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("mask-fade-x overflow-hidden", className)}>
      <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {[0, 1].map((pass) => (
          <ul
            key={pass}
            aria-hidden={pass === 1 || undefined}
            className="flex shrink-0 gap-3"
          >
            {items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-paper-raised px-4 py-2 font-mono text-xs tracking-tight text-ink-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
