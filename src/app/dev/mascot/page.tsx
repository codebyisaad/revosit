import Link from "next/link";
import { ACTIVITIES } from "@/components/mascot/activities";
import { Mascot } from "@/components/mascot/mascot";
import { MascotLoader } from "@/components/mascot/mascot-scenes";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function MascotPreview() {
  return (
    <Container className="py-16">
      <Eyebrow>Dev preview</Eyebrow>
      <h1 className="mt-5 text-4xl">Revo</h1>
      <p className="mt-4 max-w-xl text-ink-soft">
        Every pose and activity, pinned so they can be compared. Use the theme
        toggle in the header to check both. In the real site these appear only
        while something is loading.
      </p>

      <p className="mt-6 text-sm text-ink-soft">
        To see the genuine route loading boundary instead, visit{" "}
        <Link href="/dev/slow" className="text-accent underline underline-offset-4">
          /dev/slow
        </Link>{" "}
        — it stalls for six seconds on purpose.
      </p>

      <section className="mt-16">
        <h2 className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
          Idle — one per activity
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map((activity) => (
            <li
              key={activity}
              className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-paper-raised p-6"
            >
              <Mascot activity={activity} className="h-36 w-36" />
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-faint uppercase">
                {activity}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
          Running — one per activity
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map((activity) => (
            <li
              key={activity}
              className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-paper-raised p-6"
            >
              <Mascot activity={activity} pose="running" className="h-36 w-36" />
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-faint uppercase">
                {activity}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
          The loader, as it appears in a route
        </h2>
        <div className="mt-6 rounded-2xl border border-line bg-paper-raised py-10">
          <MascotLoader />
        </div>
      </section>

      <section className="mt-16 mb-10">
        <h2 className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
          Compact — as used under the contact form
        </h2>
        <div className="mt-6 rounded-2xl border border-line bg-paper-raised py-8">
          <MascotLoader compact label="Sending your enquiry" />
        </div>
      </section>
    </Container>
  );
}
