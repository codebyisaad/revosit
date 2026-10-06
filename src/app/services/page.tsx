import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PageHeader } from "@/components/layout/page-header";
import { Cta } from "@/components/sections/cta";
import { Engagements } from "@/components/sections/engagements";
import { serviceIcons } from "@/components/sections/services-overview";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack product engineering, Salesforce implementation and custom development, AI integrations, and staff augmentation for B2B teams.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Revosit",
    description:
      "Full-stack product engineering, Salesforce solutions, AI integrations and staff augmentation.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Engineering across the stack,{" "}
            <span className="font-display text-accent italic">the org</span> and the
            roadmap
          </>
        }
        description="Four services that are deliberately adjacent. Most engagements start in one and pull in another once the integration surface becomes obvious."
      >
        <Button href="/contact">
          Discuss your project
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </PageHeader>

      {services.map((service, index) => {
        const Icon = serviceIcons[service.slug];

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={cn(
              "border-b border-line py-20 sm:py-24",
              index % 2 === 1 && "bg-paper-sunken",
            )}
          >
            <Container>
              <RevealGroup className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <RevealItem>
                  <div className="lg:sticky lg:top-28">
                    <Eyebrow>{`0${index + 1}`}</Eyebrow>

                    <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
                      {Icon ? <Icon size={22} strokeWidth={1.75} /> : null}
                    </span>

                    <h2 className="mt-6 text-3xl sm:text-4xl">{service.title}</h2>

                    <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
                      {service.summary}
                    </p>

                    <ul className="mt-7 flex flex-wrap gap-2">
                      {service.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-line bg-paper-raised px-3 py-1.5 font-mono text-[0.6875rem] tracking-tight text-ink-soft"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealItem>

                <RevealItem className="flex flex-col gap-10">
                  <div>
                    <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
                      Typical outcomes
                    </h3>
                    <ul className="mt-5 flex flex-col divide-y divide-line-soft border-y border-line-soft">
                      {service.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="py-4 text-[1.0625rem] leading-relaxed text-ink"
                        >
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
                      What you get
                    </h3>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 rounded-xl border border-line bg-paper-raised p-4 text-sm leading-relaxed text-ink-soft"
                        >
                          <Check
                            size={15}
                            strokeWidth={2.25}
                            className="mt-0.5 shrink-0 text-accent"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealItem>
              </RevealGroup>
            </Container>
          </section>
        );
      })}

      <Engagements />
      <Cta title="Not sure which of these you need?" description="Describe the problem and we will tell you which service fits — or that it is not one we should take on." />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
