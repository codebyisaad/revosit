import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { industries } from "@/content/site";

export function Industries() {
  return (
    <section id="industries" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Where we work"
          title={
            <>
              Regulated, data-heavy,{" "}
              <span className="font-display text-accent italic">unforgiving</span>
            </>
          }
          description="The domains below have one thing in common: being roughly right is not good enough. That constraint shapes how we build everywhere else."
        />

        <RevealGroup delay={0.1} className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3" as="ul">
          {industries.map((industry) => (
            <RevealItem key={industry.name} as="li" className="flex flex-col bg-paper p-7">
              <h3 className="text-lg">{industry.name}</h3>

              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                {industry.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {industry.work.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-paper-raised px-2.5 py-1 font-mono text-[0.625rem] tracking-tight text-ink-faint"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
