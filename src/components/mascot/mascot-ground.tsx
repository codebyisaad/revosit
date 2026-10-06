import { cn } from "@/lib/utils";

export function MascotGround({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-x-0 bottom-0", className)} aria-hidden>
      <div className="absolute inset-x-0 bottom-6 h-px bg-line" />
      <div
        className="animate-track absolute inset-x-0 bottom-[21px] h-[3px] opacity-45"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--color-ink-faint) 0 22px, transparent 22px 72px)",
        }}
      />
    </div>
  );
}
