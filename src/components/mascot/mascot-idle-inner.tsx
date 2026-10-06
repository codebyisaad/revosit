"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { randomActivity, type Activity } from "@/components/mascot/activities";
import { Mascot } from "@/components/mascot/mascot";

/** How long Revo sticks with one activity before finding something else to do. */
const DWELL_MS = 5200;

export function MascotIdleInner({ className }: { className?: string }) {
  const [activity, setActivity] = useState<Activity>(randomActivity);

  useEffect(() => {
    const id = setInterval(
      () => setActivity((current) => randomActivity(current)),
      DWELL_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activity}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
      >
        <Mascot activity={activity} className={className ?? "h-56 w-56"} />
      </motion.div>
    </AnimatePresence>
  );
}
