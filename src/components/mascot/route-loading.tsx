import { MascotLoader } from "@/components/mascot/mascot-scenes";
import { Container } from "@/components/ui/container";

export function RouteLoading({ label }: { label?: string }) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <Container>
        <MascotLoader label={label} />
      </Container>
    </section>
  );
}
