"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ACTIVITY_CAPTIONS,
  randomActivity,
  type Activity,
} from "@/components/mascot/activities";
import { Mascot } from "@/components/mascot/mascot";
import { MascotGround } from "@/components/mascot/mascot-ground";
import { cn } from "@/lib/utils";

const RUN_DURATION = 3.2;

const DWELL_MS = 5200;

const noopSubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function MascotLoader({
  className,
  label,
  compact = false,
}: {
  className?: string;
  label?: string;
  compact?: boolean;
}) {
  const mounted = useMounted();
  const still = useReducedMotion() ?? false;
  const [activity, setActivity] = useState<Activity>(randomActivity);

  useEffect(() => {
    if (still) return;
    const id = setInterval(
      () => setActivity((current) => randomActivity(current)),
      RUN_DURATION * 1000,
    );
    return () => clearInterval(id);
  }, [still]);

  const sceneHeight = compact ? "h-24 max-w-sm" : "h-40 max-w-3xl";

  return (
    <div
      className={cn("flex w-full flex-col items-center", compact ? "gap-4" : "gap-8", className)}
      role="status"
      aria-live="polite"
    >
      <div className={cn("relative w-full overflow-hidden", sceneHeight)}>
        {mounted ? (
          <motion.div
            className="absolute bottom-[18px]"
            style={{ width: compact ? 72 : 128 }}
            initial={{ left: still ? "40%" : "-18%" }}
            animate={still ? undefined : { left: "108%" }}
            transition={{ duration: RUN_DURATION, repeat: Infinity, ease: "linear" }}
          >
            {!still ? <SpeedLines /> : null}

            <AnimatePresence initial={false}>
              <motion.div
                key={activity}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Mascot
                  activity={activity}
                  pose={still ? "idle" : "running"}
                  className={compact ? "h-[72px] w-[72px]" : "h-36 w-36"}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : null}

        <MascotGround className="top-0" />
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

function SpeedLines() {
  return (
    <div aria-hidden className="absolute top-1/2 right-full mr-1 flex flex-col gap-1.5">
      {[18, 28, 14].map((width, i) => (
        <motion.span
          key={width}
          className="block h-[2px] rounded-full bg-ink/20"
          style={{ width }}
          animate={{ opacity: [0, 0.9, 0], scaleX: [0.4, 1, 0.4] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
    </div>
  );
}

export function MascotIdle({ className }: { className?: string }) {
  const mounted = useMounted();
  const still = useReducedMotion() ?? false;
  const [activity, setActivity] = useState<Activity>(randomActivity);

  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setActivity((current) => randomActivity(current)), DWELL_MS);
    return () => clearInterval(id);
  }, [still]);

  if (!mounted) return <div className={cn("h-56 w-56", className)} aria-hidden />;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activity}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
      >
        <Mascot activity={activity} className={cn("h-56 w-56", className)} />
      </motion.div>
    </AnimatePresence>
  );
}
