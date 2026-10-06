import { cn } from "@/lib/utils";

export function Marquee({
  items,
  reverse = false,
  className,
}: {
  items: readonly string[];
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mask-fade-x overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max gap-3 hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
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
