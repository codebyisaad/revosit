import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { engagements, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with Revosit, or ask about staff augmentation. Email ${site.email} or send a brief and an engineer will reply within one business day.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Revosit",
    description:
      "Tell us what you are building. An engineer replies within one business day.",
    url: "/contact",
  },
};

const details = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within one business day",
  },
  {
    icon: MapPin,
    label: "Working with",
    value: "B2B teams, remote-first, EU & US hours",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tell us what you are{" "}
            <span className="font-display text-accent italic">building</span>
          </>
        }
        description="A short brief is enough to start. We will come back with questions, an approach and an honest read on whether we are the right team for it."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <RevealGroup className="flex flex-col gap-10">
              <RevealItem>
                <ul className="flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line">
                  {details.map((detail) => (
                    <li
                      key={detail.label}
                      className="flex items-start gap-4 bg-paper-raised p-5"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
                        <detail.icon size={17} strokeWidth={1.75} />
                      </span>
                      <div>
                        <p className="font-mono text-[0.625rem] tracking-[0.18em] text-ink-faint uppercase">
                          {detail.label}
                        </p>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="mt-1 block text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-[0.9375rem] font-medium text-ink">
                            {detail.value}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </RevealItem>

              <RevealItem>
                <h2 className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
                  Ways to work together
                </h2>
                <ul className="mt-5 flex flex-col divide-y divide-line-soft border-y border-line-soft">
                  {engagements.map((model) => (
                    <li key={model.title} className="py-4">
                      <p className="text-[0.9375rem] font-medium text-ink">
                        {model.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {model.bestFor}
                      </p>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            </RevealGroup>

            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Revosit",
          url: `${site.url}/contact`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
