"use client";

import { useEffect } from "react";

const MIN_VISIBLE_MS = 1500;
const MAX_VISIBLE_MS = 3000;
const FADE_MS = 550;

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
