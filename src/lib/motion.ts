import type { Transition, Variants } from "motion/react";

/** Shared easing curve — slightly weighted exit, keeps motion calm rather than bouncy. */
export const ease = [0.16, 1, 0.3, 1] as const;

export const transition: Transition = { duration: 0.7, ease };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition },
};

/**
 * Shorter entrance for above-the-fold content. The hero headline is the LCP
 * element, so it stays hidden for as little time as possible.
 */
export const fadeUpFast: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

/** Parent wrapper that releases its children one after another. */
export function stagger(delayChildren = 0, staggerChildren = 0.08): Variants {
  return {
    hidden: {},
    visible: { transition: { delayChildren, staggerChildren } },
  };
}

/** Viewport config used by every scroll reveal so thresholds stay consistent. */
export const inView = { once: true, margin: "-80px" } as const;
