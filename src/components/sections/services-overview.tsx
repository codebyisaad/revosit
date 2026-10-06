import Link from "next/link";
import { ArrowUpRight, BrainCircuit, CloudCog, Layers, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/content/services";

export const serviceIcons: Record<string, LucideIcon> = {
  "full-stack": Layers,
  salesforce: CloudCog,
  "ai-integrations": BrainCircuit,
  "staff-augmentation": Users,
};

export function ServicesOverview() {
  return (
    <section id="services" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Four capabilities, one accountable team"
          description="Most partners hand you a specialist and a handoff. We keep product engineering, Salesforce and AI under the same delivery lead, so the integrations between them are nobody else's problem."
        />

        <RevealGroup
          delay={0.1}
          className="mt-14 grid gap-4 sm:grid-cols-2"
          as="ul"
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.slug] ?? Layers;

            return (
              <RevealItem key={service.slug} as="li">
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-paper-raised p-7 transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_18px_48px_-24px_oklch(0.2_0.02_277/0.3)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>

                  <h3 className="mt-6 text-xl">{service.title}</h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {service.summary}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                    Explore
                    <ArrowUpRight
                      size={15}
                      className="text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
