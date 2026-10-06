import { Mascot } from "@/components/mascot/mascot";
import { SplashController } from "@/components/layout/splash-controller";
import { Logo } from "@/components/visuals/logo";

/**
 * First-load intro.
 *
 * Rendered on the server so it is painted with the first frame rather than
 * appearing over content that has already drawn. The mascot is given a fixed
 * activity here on purpose: the markup is prerendered and shared by every
 * visitor, so a random draw would differ between server and client.
 */
export function SiteSplash() {
  return (
    <>
      <div id="site-splash" className="site-splash" aria-hidden>
        <div className="flex w-full max-w-md flex-col items-center gap-10 px-6">
          <Logo />

          <div className="relative h-32 w-full overflow-hidden">
            <div className="absolute bottom-[18px] left-0 w-28 animate-[splash-run_2.6s_linear_infinite]">
              <Mascot activity="building" pose="running" className="h-28 w-28" />
            </div>

            <div className="absolute inset-x-0 bottom-6 h-px bg-line" />
            <div
              className="animate-track absolute inset-x-0 bottom-[21px] h-[3px] opacity-45"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, var(--color-ink-faint) 0 22px, transparent 22px 72px)",
              }}
            />
          </div>

          <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">
            Building something good
          </p>
        </div>
      </div>

      <SplashController />
    </>
  );
}
