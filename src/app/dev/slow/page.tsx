import { Container } from "@/components/ui/container";

export const dynamic = "force-dynamic";

export default async function SlowPage() {
  await new Promise((resolve) => setTimeout(resolve, 6000));

  return (
    <Container className="py-24">
      <h1 className="text-4xl">Finally.</h1>
      <p className="mt-4 max-w-md text-ink-soft">
        That took six seconds on purpose. The mascot you just watched was the
        real <code className="font-mono text-sm">loading.tsx</code> boundary for
        this route, not a mock.
      </p>
    </Container>
  );
}
