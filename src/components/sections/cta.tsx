import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { GridBand } from "@/components/visuals/backdrop";
import { site } from "@/content/site";

export function Cta({
  title = "Tell us what you are trying to ship",
  description = "Send a short brief or a messy idea — either works. You will hear back from an engineer, not a form, within one business day.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-line py-20 sm:py-28">
      <GridBand />

      <Container>
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow>Next step</Eyebrow>

          <h2 className="mt-6 text-3xl leading-[1.1] sm:text-5xl">{title}</h2>

          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{description}</p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Button href="/contact">
              Start a conversation
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Button>
            <Button href={`mailto:${site.email}`} variant="secondary">
              <Mail size={15} />
              {site.email}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
