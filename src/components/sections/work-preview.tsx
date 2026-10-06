import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/sections/project-card";
import { projects } from "@/content/projects";

export function WorkPreview() {
  const featured = projects.slice(0, 2);

  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected projects"
            title="Work that had to hold up in production"
            description="Replatforms, Salesforce rescues and AI features shipped into systems that were already carrying real customers."
          />
          <Button href="/projects" variant="secondary" className="shrink-0">
            All projects
          </Button>
        </div>

        <RevealGroup delay={0.1} className="mt-14 grid gap-5 lg:grid-cols-2" as="ul">
          {featured.map((project, index) => (
            <RevealItem key={project.slug} as="li">
              <ProjectCard project={project} index={index} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
