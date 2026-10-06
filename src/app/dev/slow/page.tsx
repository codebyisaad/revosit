import { Container } from "@/components/ui/container";

// Opting out of static generation so the delay below actually runs per request
// rather than once at build time.
export const dynamic = "force-dynamic";

/**
 * A deliberately slow route. Navigating here from the nav exercises the real
 * App Router loading boundary — src/app/dev/slow/loading.tsx — rather than a
 * component rendered in isolation.
 */
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
