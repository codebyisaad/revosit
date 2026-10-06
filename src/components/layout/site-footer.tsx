import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/visuals/logo";
import { nav, site } from "@/content/site";
import { services } from "@/content/services";

const social = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "GitHub", href: site.social.github },
  { label: "X", href: site.social.x },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-paper-sunken">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              {site.description}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              {site.email}
              <ArrowUpRight size={14} />
            </a>
          </div>

          <FooterColumn title="Services">
            {services.map((service) => (
              <FooterLink key={service.slug} href={`/services#${service.slug}`}>
                {service.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Elsewhere">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {item.label}
                  <ArrowUpRight size={13} />
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="font-mono tracking-tight">
            Full-stack &middot; Salesforce &middot; AI &middot; Staff augmentation
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-4 font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
        {title}
      </h2>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-ink-soft transition-colors hover:text-ink"
      >
        {children}
      </Link>
    </li>
  );
}
