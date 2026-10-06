import { Mascot } from "@/components/mascot/mascot";
import { MascotGround } from "@/components/mascot/mascot-ground";
import { SplashController } from "@/components/layout/splash-controller";
import { Logo } from "@/components/visuals/logo";

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

            <MascotGround className="top-0" />
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
