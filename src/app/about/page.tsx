import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHeader } from "@/components/layout/page-header";
import { Cta } from "@/components/sections/cta";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { principles, site, stackGroups } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Revosit is a B2B software house working as a delivery partner and as embedded engineering capacity across full-stack, Salesforce and AI work.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Revosit",
    description:
      "A B2B software house built around delivery: full-stack, Salesforce and AI engineering under one accountable team.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            A software house built around{" "}
            <span className="font-display text-accent italic">delivery</span>
          </>
        }
        description="We work with B2B teams who have already found their market and now need the engineering to keep up with it — as a delivery partner, or as engineers inside their own team."
      >
        <Button href="/contact">
          Work with us
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </PageHeader>

      <section className="border-b border-line py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
            <RevealGroup>
              <RevealItem>
                <h2 className="text-3xl sm:text-4xl">Who we are</h2>
              </RevealItem>
            </RevealGroup>

            <RevealGroup delay={0.1} className="flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-ink-soft">
              <RevealItem>
                <p>
                  {site.name} is a B2B engineering practice. Our work sits in three
                  places that tend to collide in a growing company: the product your
                  customers use, the Salesforce org your revenue team runs on, and the
                  AI features everyone now expects you to ship.
                </p>
              </RevealItem>
              <RevealItem>
                <p>
                  Keeping those under one team is the point. When the product needs to
                  write back into Salesforce, or an assistant needs retrieval over data
                  that lives in three systems, there is no vendor boundary to argue
                  across — the same delivery lead owns both sides of the integration.
                </p>
              </RevealItem>
              <RevealItem>
                <p>
                  We take work two ways. Either we own an outcome end to end, or we
                  embed engineers into your team and your process. Clients move between
                  the two as their roadmap changes, and we would rather adjust the
                  contract than pretend one shape fits every phase.
                </p>
              </RevealItem>
            </RevealGroup>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper-sunken py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Principles"
            title="How we operate"
            description="These are the commitments we are willing to be held to in writing, because they are the ones clients notice when they are broken."
          />

          <RevealGroup delay={0.1} className="mt-14 grid gap-px bg-line sm:grid-cols-2" as="ul">
            {principles.map((principle, index) => (
              <RevealItem key={principle.title} as="li" className="bg-paper-raised p-7">
                <span aria-hidden className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg leading-snug">{principle.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {principle.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="border-b border-line py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="What we actually work in"
            description="Not an exhaustive logo wall — the tools our engineers have shipped and operated production systems with."
          />

          <RevealGroup delay={0.1} className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stackGroups.map((group) => (
              <RevealItem key={group.discipline}>
                <h3 className="border-b border-line pb-3 font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
                  {group.discipline}
                </h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-[0.9375rem] text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <Cta
        title="Let's talk about the work"
        description="A 30-minute call is usually enough to tell whether there is a fit. If there isn't, we will say so and point you somewhere better."
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
