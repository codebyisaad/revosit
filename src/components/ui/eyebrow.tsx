import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[0.6875rem] font-medium tracking-[0.18em] text-ink-faint uppercase",
        className,
      )}
    >
      <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
      {children}
    </span>
  );
}
