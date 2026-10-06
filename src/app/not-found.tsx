import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Bloom } from "@/components/visuals/backdrop";
import { MascotIdle } from "@/components/mascot/mascot-idle";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden py-24">
      <Bloom />

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-xl">
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="mt-6 text-4xl leading-[1.08] sm:text-5xl">
            That page isn&rsquo;t here anymore
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            The link may be out of date. Try our work, our services, or just tell us
            what you were looking for.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/">Back to home</Button>
            <Button href="/projects" variant="secondary">
              See our projects
            </Button>
          </div>
        </div>

          <div className="flex justify-center lg:justify-end">
            <MascotIdle />
          </div>
        </div>
      </Container>
    </section>
  );
}
