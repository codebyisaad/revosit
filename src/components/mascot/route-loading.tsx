import { MascotLoader } from "@/components/mascot/mascot-loader-client";
import { Container } from "@/components/ui/container";

/**
 * The shared body of every route-level loading.tsx. Sized to roughly the
 * height of a page header so the swap into real content is not a jolt.
 */
export function RouteLoading({ label }: { label?: string }) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <Container>
        <MascotLoader label={label} />
      </Container>
    </section>
  );
}
