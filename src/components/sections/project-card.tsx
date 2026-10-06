import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/visuals/project-cover";
import type { Project } from "@/content/projects";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper-raised transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_22px_56px_-28px_oklch(0.2_0.02_277/0.35)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
          {project.cover ? (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover object-top"
              priority={index === 0}
            />
          ) : (
            <ProjectCover id={project.slug} hue={project.hue} variant={index} />
          )}
        </div>

        <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
          <Chip>{project.service}</Chip>
          <Chip>{project.industry}</Chip>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-ink-faint uppercase">
          {project.client} &middot; {project.year}
        </p>

        <h3 className="mt-3 text-xl leading-snug">{project.title}</h3>

        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
          {project.summary}
        </p>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          Read the case study
          <ArrowUpRight
            size={15}
            className="text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/40 bg-white/75 px-2.5 py-1 text-[0.6875rem] font-medium text-ink backdrop-blur-sm">
      {children}
    </span>
  );
}
