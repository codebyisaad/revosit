"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Mascot } from "@/components/mascot/mascot";
import { randomActivity, type Activity } from "@/components/mascot/activities";
import { useMounted } from "@/lib/use-mounted";

const RAIL_TOP = 120;
const RAIL_BOTTOM = 120;

type Mark = { at: number };

function useSectionMarks() {
  const [marks, setMarks] = useState<Mark[]>([]);

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setMarks([]);
        return;
      }

      const found = Array.from(document.querySelectorAll("main section"))
        .map((el) => ({
          at: Math.min(
            1,
            Math.max(0, (el.getBoundingClientRect().top + window.scrollY) / scrollable),
          ),
        }))
        .filter((m, i, all) => i === 0 || m.at - all[i - 1].at > 0.04);

      setMarks(found);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return marks;
}

export function ScrollRail() {
  const mounted = useMounted();
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.0005,
  });

  const marks = useSectionMarks();
  const [passed, setPassed] = useState(0);
  const [activity, setActivity] = useState<Activity>(randomActivity);
  const lastIndex = useRef(0);

  useMotionValueEvent(progress, "change", (value) => {
    const count = marks.filter((m) => value >= m.at - 0.01).length;
    if (count !== passed) setPassed(count);

    if (count !== lastIndex.current) {
      lastIndex.current = count;
      setActivity((current) => randomActivity(current));
    }
  });

  const top = useTransform(progress, [0, 1], ["0%", "100%"]);
  const fill = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div
      aria-hidden
      className="scroll-rail pointer-events-none fixed left-12 z-40 hidden transition-opacity duration-300 xl:block"
      style={{ top: RAIL_TOP, bottom: RAIL_BOTTOM }}
    >
      <div className="relative h-full w-px bg-line">
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-accent"
          style={{ height: "100%", scaleY: fill }}
        />

        {marks.map((mark, i) => (
          <span
            key={`${mark.at}-${i}`}
            className="absolute -left-[3px] block h-[7px] w-[7px] rounded-full border transition-colors duration-300"
            style={{
              top: `${mark.at * 100}%`,
              backgroundColor: i < passed ? "var(--color-accent)" : "var(--color-paper)",
              borderColor: i < passed ? "var(--color-accent)" : "var(--color-line)",
            }}
          />
        ))}

        {mounted ? (
          <motion.div className="absolute -left-8 -translate-y-1/2" style={{ top }}>
            <Mascot
              activity={activity}
              pose={reduced ? "idle" : "running"}
              className="h-16 w-16"
            />
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
