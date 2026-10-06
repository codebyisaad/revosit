import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Industries } from "@/components/sections/industries";
import { WorkPreview } from "@/components/sections/work-preview";
import { Process } from "@/components/sections/process";
import { Engagements } from "@/components/sections/engagements";
import { Differentiators } from "@/components/sections/differentiators";
import { Cta } from "@/components/sections/cta";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <Industries />
      <WorkPreview />
      <Process />
      <Engagements />
      <Differentiators />
      <Cta />
    </>
  );
}
