import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { differentiators } from "@/content/site";

export function Differentiators() {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why Revosit"
            title={
              <>
                Built to be the partner
                <br className="hidden sm:block" /> you{" "}
                <span className="font-display text-accent italic">keep</span>
              </>
            }
            description="We optimise for the handover, not the lock-in. If we have done the job properly, you could run the system without us — and still choose not to."
          />

          <RevealGroup delay={0.1} className="grid gap-px bg-line sm:grid-cols-2" as="ul">
            {differentiators.map((item, index) => (
              <RevealItem
                key={item.title}
                as="li"
                className="bg-paper p-6 sm:p-7"
              >
                <span
                  aria-hidden
                  className="font-mono text-xs tracking-tight text-ink-faint"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
