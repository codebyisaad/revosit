"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ACTIVITY_CAPTIONS,
  Mascot,
  randomActivity,
  type Activity,
} from "@/components/mascot/mascot";
import { cn } from "@/lib/utils";

/** One crossing of the track, in seconds. */
const RUN_DURATION = 3.2;

/**
 * Revo running across a track, for loading states.
 *
 * The run itself never changes — that is what keeps it feeling composed rather
 * than cartoonish. What varies is the job it is doing as it goes: a new
 * activity is drawn on every crossing, so a slow page shows a small sequence of
 * different moments instead of one looping gif.
 */
export function MascotRunner({
  className,
  label,
  compact = false,
}: {
  className?: string;
  /** Overrides the activity caption when the context already explains itself. */
  label?: string;
  compact?: boolean;
}) {
  // Safe as a lazy initial value because this component never renders on the
  // server — see the ssr:false wrapper in mascot-loader-client.tsx — so there
  // is no server/client pair that could disagree on the draw.
  const [activity, setActivity] = useState<Activity>(randomActivity);

  useEffect(() => {
    const id = setInterval(
      () => setActivity((current) => randomActivity(current)),
      RUN_DURATION * 1000,
    );

    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={cn("flex w-full flex-col items-center", compact ? "gap-4" : "gap-8", className)}
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          compact ? "h-24 max-w-sm" : "h-40 max-w-3xl",
        )}
      >
        {/* `left` rather than `x`: a percentage transform resolves against the
            element's own width, which would barely move it. A percentage
            offset resolves against the track, which is what we want. */}
        <motion.div
          className="absolute bottom-[18px]"
          initial={{ left: "-18%" }}
          animate={{ left: "108%" }}
          transition={{ duration: RUN_DURATION, repeat: Infinity, ease: "linear" }}
          style={{ width: compact ? 72 : 128 }}
        >
          {/* Speed lines, trailing the runner. */}
          <div className="pointer-events-none absolute top-1/2 right-full mr-1 flex flex-col gap-1.5">
            {[18, 28, 14].map((w, i) => (
              <motion.span
                key={i}
                className="block h-[2px] rounded-full bg-ink/20"
                style={{ width: w }}
                animate={{ opacity: [0, 0.9, 0], scaleX: [0.4, 1, 0.4] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activity}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <Mascot
                activity={activity}
                pose="running"
                className={compact ? "h-[72px] w-[72px]" : "h-36 w-36"}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* The ground: a hairline with dashes sliding against the run. */}
        <div className="absolute inset-x-0 bottom-6 h-px bg-line" />
        <div
          aria-hidden
          className="animate-track absolute inset-x-0 bottom-[21px] h-[3px] opacity-45"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, var(--color-ink-faint) 0 22px, transparent 22px 72px)",
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={label ?? activity}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "font-mono tracking-[0.16em] text-ink-faint uppercase",
            compact ? "text-[0.625rem]" : "text-xs",
          )}
        >
          {label ?? ACTIVITY_CAPTIONS[activity]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
