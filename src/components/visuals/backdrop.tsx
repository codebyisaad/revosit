import { cn } from "@/lib/utils";

export function Bloom({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="grid-lines mask-fade-b absolute inset-0 opacity-70" />
      <div className="absolute -top-40 left-1/2 h-[34rem] w-[64rem] -translate-x-1/2 animate-drift rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--color-accent)_22%,transparent),transparent)] blur-2xl" />
      <div className="absolute top-20 -right-32 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--color-accent)_14%,transparent),transparent)] blur-2xl" />
    </div>
  );
}

export function GridBand({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("grid-lines pointer-events-none absolute inset-0 -z-10 opacity-60", className)}
    />
  );
}
