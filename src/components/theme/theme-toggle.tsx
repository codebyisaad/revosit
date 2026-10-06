"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

/**
 * The theme lives on <html>, written by the inline script before React runs.
 * That makes the DOM the source of truth rather than React state, so it is read
 * through useSyncExternalStore: no effect-driven setState, and no hydration
 * mismatch because the server snapshot is explicitly null.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const getServerSnapshot = (): Theme | null => null;

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Follow the OS until the visitor makes an explicit choice. This only writes
  // to the DOM; the observer above turns that into a re-render.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return;
      document.documentElement.classList.toggle("dark", event.matches);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-200 hover:border-ink/25 hover:text-ink",
        className,
      )}
    >
      {theme ? (
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          {isDark ? <Moon size={17} /> : <Sun size={17} />}
        </motion.span>
      ) : (
        <span className="h-[17px] w-[17px]" />
      )}
    </button>
  );
}
