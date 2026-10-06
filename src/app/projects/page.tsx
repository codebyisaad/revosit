import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCard } from "@/components/sections/project-card";
import { Cta } from "@/components/sections/cta";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies from Revosit engagements across logistics, healthcare distribution, insurance and fintech — full-stack platforms, Salesforce remediation and AI integrations.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Revosit",
    description:
      "Case studies across full-stack platforms, Salesforce remediation, AI integrations and embedded teams.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title={
          <>
            Case studies, written like{" "}
            <span className="font-display text-accent italic">engineers</span> wrote
            them
          </>
        }
        description="What the system looked like before, the decisions we made, and what changed. Client names are withheld where the engagement is under NDA."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="sr-only">All case studies</h2>

          <RevealGroup className="grid gap-5 lg:grid-cols-2" as="ul">
            {projects.map((project, index) => (
              <RevealItem key={project.slug} as="li">
                <ProjectCard project={project} index={index} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <Cta
        title="Your project could be the next one here"
        description="Tell us what you are building and we will come back with an approach, a rough shape and an honest view on whether we are the right team."
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Projects",
          url: `${site.url}/projects`,
          hasPart: projects.map((project) => ({
            "@type": "CreativeWork",
            name: project.title,
            about: project.industry,
            url: `${site.url}/projects/${project.slug}`,
          })),
        }}
      />
    </>
  );
}
