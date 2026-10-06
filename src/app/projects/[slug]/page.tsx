import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Cta } from "@/components/sections/cta";
import { ProjectCover } from "@/components/visuals/project-cover";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { projects, projectBySlug } from "@/content/projects";
import { site } from "@/content/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) return { title: "Project not found" };

  const url = `/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${project.title} — ${site.name}`,
      description: project.summary,
      url,
    },
    twitter: { title: project.title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { label: "Client", value: project.client },
    { label: "Industry", value: project.industry },
    { label: "Service", value: project.service },
    { label: "Year", value: project.year },
  ];

  return (
    <>
      <article>
        <header className="border-b border-line pt-12 pb-14 sm:pt-16">
          <Container>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft size={15} />
              All projects
            </Link>

            <RevealGroup className="mt-10 max-w-3xl">
              <RevealItem>
                <Eyebrow>{project.service}</Eyebrow>
              </RevealItem>
              <RevealItem>
                <h1 className="mt-6 text-[2.25rem] leading-[1.07] sm:text-5xl">
                  {project.title}
                </h1>
              </RevealItem>
              <RevealItem>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                  {project.summary}
                </p>
              </RevealItem>

              {project.liveUrl ? (
                <RevealItem>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
                  >
                    Visit {project.liveUrl.replace("https://", "")}
                    <ArrowUpRight size={15} className="text-accent" />
                  </a>
                </RevealItem>
              ) : null}
            </RevealGroup>

            <Reveal delay={0.15} className="mt-12 overflow-hidden rounded-2xl border border-line">
              <div className="relative aspect-[16/7]">
                {project.cover ? (
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    width={project.cover.width}
                    height={project.cover.height}
                    sizes="(min-width: 1152px) 1152px, 100vw"
                    className="h-full w-full object-cover object-top"
                    priority
                  />
                ) : (
                  <ProjectCover id={project.slug} hue={project.hue} variant={index} />
                )}
              </div>
            </Reveal>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-paper-raised px-5 py-4">
                  <dt className="font-mono text-[0.625rem] tracking-[0.18em] text-ink-faint uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </header>

        <Container className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
            <Reveal>
              <h2 className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
                The challenge
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink">
                {project.challenge}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
                What we did
              </h2>
              <ol className="mt-5 flex flex-col divide-y divide-line-soft border-y border-line-soft">
                {project.approach.map((item, i) => (
                  <li key={item} className="flex gap-4 py-4">
                    <span
                      aria-hidden
                      className="mt-0.5 font-mono text-xs text-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[1.0625rem] leading-relaxed text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <RevealGroup delay={0.1} className="mt-16">
            <RevealItem>
              <h2 className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
                Outcome
              </h2>
            </RevealItem>

            <RevealItem>
              <ul className="mt-5 grid gap-4 sm:grid-cols-3">
                {project.results.map((result) => (
                  <li
                    key={result.label}
                    className="rounded-2xl border border-line bg-paper-raised p-6"
                  >
                    <p className="text-xl leading-snug text-ink">{result.value}</p>
                    <p className="mt-3 border-t border-line-soft pt-3 text-xs tracking-tight text-ink-faint">
                      {result.label}
                    </p>
                  </li>
                ))}
              </ul>
            </RevealItem>

            <RevealItem>
              <ul className="mt-10 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line bg-paper-raised px-3 py-1.5 font-mono text-[0.6875rem] tracking-tight text-ink-soft"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </RevealItem>
          </RevealGroup>
        </Container>

        <div className="border-y border-line bg-paper-sunken">
          <Container className="py-10">
            <Link href={`/projects/${next.slug}`} className="group flex flex-col gap-2">
              <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
                Next project
              </span>
              <span className="flex items-center gap-3 text-xl text-ink transition-colors group-hover:text-accent sm:text-2xl">
                {next.title}
                <ArrowRight
                  size={20}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </Link>
          </Container>
        </div>
      </article>

      <Cta />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CaseStudy",
          name: project.title,
          headline: project.title,
          description: project.summary,
          url: `${site.url}/projects/${project.slug}`,
          about: project.industry,
          keywords: project.tech.join(", "),
          provider: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
