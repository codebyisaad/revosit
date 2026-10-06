import { cn } from "@/lib/utils";
import { site } from "@/content/site";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("h-7 w-7", className)}
    >
      <rect
        x="7.5"
        y="7.5"
        width="17"
        height="17"
        rx="5"
        transform="rotate(45 16 16)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="26" cy="6" r="4" className="fill-accent" />
    </svg>
  );
}

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-ink", className)}>
      <LogoMark />
      {showWordmark ? (
        <span className="text-[1.0625rem] font-semibold tracking-[-0.03em]">
          {site.name}
        </span>
      ) : null}
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
