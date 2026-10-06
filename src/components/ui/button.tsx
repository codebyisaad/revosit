import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-on-ink hover:bg-accent hover:text-on-accent",
  secondary:
    "border border-line bg-paper-raised text-ink hover:border-ink/25 hover:bg-paper-sunken",
  ghost: "text-ink-soft hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AnchorRest = Omit<React.ComponentPropsWithoutRef<typeof Link>, keyof SharedProps>;
type ButtonRest = Omit<React.ComponentPropsWithoutRef<"button">, keyof SharedProps>;

/** Renders a link when `href` is supplied, otherwise a native button. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: SharedProps & (AnchorRest | (ButtonRest & { href?: never }))) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href !== undefined) {
    return (
      <Link {...(rest as AnchorRest)} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...(rest as ButtonRest)} className={classes}>
      {children}
    </button>
  );
}
