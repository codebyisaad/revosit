import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { engagements } from "@/content/site";

export function Engagements() {
  return (
    <section id="engagements" className="border-t border-line bg-paper-sunken py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Engagement models"
          title="Buy an outcome, a team, or a second opinion"
          description="The same engineers, three commercial shapes. Start in one and move to another when the work changes — most clients do."
        />

        <RevealGroup delay={0.1} className="mt-14 grid gap-5 lg:grid-cols-3" as="ul">
          {engagements.map((model) => (
            <RevealItem
              key={model.title}
              as="li"
              className="flex h-full flex-col rounded-2xl border border-line bg-paper-raised p-7"
            >
              <h3 className="text-xl">{model.title}</h3>

              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                {model.description}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5 border-t border-line-soft pt-6">
                {model.shape.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check
                      size={15}
                      strokeWidth={2.25}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-6 font-mono text-[0.6875rem] tracking-[0.14em] text-ink-faint uppercase">
                Best for
                <span className="mt-1.5 block font-sans text-[0.8125rem] tracking-normal normal-case text-ink-soft">
                  {model.bestFor}
                </span>
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
