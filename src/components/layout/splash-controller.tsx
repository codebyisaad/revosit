"use client";

import { useEffect } from "react";

/** Floor for how long the intro stays up, so it reads as intentional. */
const MIN_VISIBLE_MS = 1500;
/** Hard ceiling, so a stalled asset can never trap a visitor behind it. */
const MAX_VISIBLE_MS = 3000;
/** Must match the splash-out animation in globals.css. */
const FADE_MS = 550;

/**
 * Takes the intro down.
 *
 * Waits for the window load event so the intro covers real work rather than an
 * arbitrary timer, but is bounded on both sides: never shorter than a beat,
 * never long enough to become an obstacle.
 */
export function SplashController() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("splash-active")) return;

    const startedAt = performance.now();
    let dismissTimer: number;
    let removeTimer: number;

    const dismiss = () => {
      const splash = document.getElementById("site-splash");
      splash?.setAttribute("data-leaving", "true");

      removeTimer = window.setTimeout(() => {
        root.classList.remove("splash-active");
        // Per session, not forever: a visitor returning tomorrow sees it again.
        try {
          sessionStorage.setItem("splash-seen", "1");
        } catch {}
      }, FADE_MS);
    };

    const schedule = () => {
      const elapsed = performance.now() - startedAt;
      dismissTimer = window.setTimeout(dismiss, Math.max(0, MIN_VISIBLE_MS - elapsed));
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    // Backstop in case `load` never fires.
    const ceiling = window.setTimeout(dismiss, MAX_VISIBLE_MS);

    return () => {
      window.removeEventListener("load", schedule);
      window.clearTimeout(dismissTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(ceiling);
    };
  }, []);

  return null;
}
