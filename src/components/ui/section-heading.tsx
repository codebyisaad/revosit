import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <RevealGroup
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <RevealItem>
          <Eyebrow>{eyebrow}</Eyebrow>
        </RevealItem>
      ) : null}

      <RevealItem>
        <h2 className="max-w-2xl text-3xl leading-[1.1] sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
      </RevealItem>

      {description ? (
        <RevealItem>
          <p className="max-w-xl text-base leading-relaxed text-ink-soft sm:text-[1.0625rem]">
            {description}
          </p>
        </RevealItem>
      ) : null}

      {children ? <RevealItem>{children}</RevealItem> : null}
    </RevealGroup>
  );
}

export function Rule({ className }: { className?: string }) {
  return <div aria-hidden className={cn("h-px w-full bg-line", className)} />;
}
