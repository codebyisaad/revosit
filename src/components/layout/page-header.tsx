import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Bloom } from "@/components/visuals/backdrop";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line pt-16 pb-16 sm:pt-24 sm:pb-20">
      <Bloom />

      <Container>
        <RevealGroup className="max-w-3xl">
          <RevealItem>
            <Eyebrow>{eyebrow}</Eyebrow>
          </RevealItem>

          <RevealItem>
            <h1 className="mt-6 text-[2.25rem] leading-[1.06] sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>
          </RevealItem>

          {description ? (
            <RevealItem>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {description}
              </p>
            </RevealItem>
          ) : null}

          {children ? (
            <RevealItem>
              <div className="mt-9">{children}</div>
            </RevealItem>
          ) : null}
        </RevealGroup>
      </Container>
    </section>
  );
}

/** Narrow variant for case study pages, where the cover art carries the visual weight. */
export function PageIntro({ children }: { children: React.ReactNode }) {
  return <Reveal className="max-w-3xl">{children}</Reveal>;
}
