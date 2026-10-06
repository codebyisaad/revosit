import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { phases } from "@/content/site";

export function Process() {
  return (
    <section id="process" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A delivery process you can audit"
          description="No discovery theatre and no status decks. Every phase produces something you keep — a plan, an architecture, working software, a runbook."
        />

        <RevealGroup delay={0.1} className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" as="ul">
          {phases.map((phase) => (
            <RevealItem
              key={phase.step}
              as="li"
              className="group relative bg-paper-raised p-7 transition-colors duration-300 hover:bg-paper-sunken"
            >
              <span
                aria-hidden
                className="font-mono text-sm font-medium tracking-tight text-accent"
              >
                {phase.step}
              </span>
              <h3 className="mt-5 text-lg">{phase.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                {phase.description}
              </p>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
