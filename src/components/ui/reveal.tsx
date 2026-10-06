"use client";

import { motion } from "motion/react";
import type { MotionProps, Variants } from "motion/react";
import { fadeUp, inView, stagger } from "@/lib/motion";

type ElementKey = "div" | "ul" | "li" | "span" | "section";

/**
 * Only the animation props are forwarded — no element-specific DOM props — so
 * the same object is assignable to every motion element below.
 */
type MotionElementProps = Pick<
  MotionProps,
  "variants" | "initial" | "animate" | "whileInView" | "viewport" | "transition"
> & {
  as?: ElementKey;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Renders one of a fixed set of motion elements. Written as a switch rather
 * than a lookup so no component is constructed during render.
 */
function MotionElement({ as = "div", ...props }: MotionElementProps) {
  switch (as) {
    case "ul":
      return <motion.ul {...props} />;
    case "li":
      return <motion.li {...props} />;
    case "span":
      return <motion.span {...props} />;
    case "section":
      return <motion.section {...props} />;
    default:
      return <motion.div {...props} />;
  }
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: ElementKey;
};

/** Fades its content up once, the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as,
}: RevealProps) {
  return (
    <MotionElement
      as={as}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      transition={{ delay }}
    >
      {children}
    </MotionElement>
  );
}

/**
 * Reveals descendant <RevealItem> elements in sequence. Use when a list should
 * cascade rather than appear all at once.
 */
export function RevealGroup({
  children,
  className,
  delay = 0,
  step = 0.08,
  as,
}: Omit<RevealProps, "variants"> & { step?: number }) {
  return (
    <MotionElement
      as={as}
      className={className}
      variants={stagger(delay, step)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      {children}
    </MotionElement>
  );
}

export function RevealItem({
  children,
  className,
  as,
}: {
  children: React.ReactNode;
  className?: string;
  as?: ElementKey;
}) {
  return (
    <MotionElement as={as} className={className} variants={fadeUp}>
      {children}
    </MotionElement>
  );
}
