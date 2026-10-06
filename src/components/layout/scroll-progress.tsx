"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * A hairline of accent across the very top, tracking read position.
 *
 * Spring-smoothed so it glides rather than snapping to every scroll event, and
 * hidden from assistive tech — it duplicates information the scrollbar already
 * conveys.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
    />
  );
}
