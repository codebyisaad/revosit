"use client";

import { motion, useReducedMotion } from "motion/react";
import type { TargetAndTransition, Transition } from "motion/react";
import { type Activity, type Pose } from "@/components/mascot/activities";
import { cn } from "@/lib/utils";

const STRIDE = 0.44;

const BREATH = 2.4;

type Loop = { animate?: TargetAndTransition; transition?: Transition };

function cycle(still: boolean, animate: TargetAndTransition, transition: Transition): Loop {
  return still ? {} : { animate, transition };
}

const pivot = (x: string, y: string) =>
  ({ transformBox: "fill-box", transformOrigin: `${x} ${y}` }) as const;

type PartProps = { activity: Activity; running: boolean; still: boolean };

export function Mascot({
  activity,
  pose = "idle",
  label,
  className,
}: {
  activity: Activity;
  pose?: Pose;
  label?: string;
  className?: string;
}) {
  const still = useReducedMotion() ?? false;
  const running = pose === "running";
  const parts: PartProps = { activity, running, still };

  return (
    <svg
      viewBox="0 0 170 172"
      className={cn("h-40 w-40", className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <motion.ellipse
        cx="82"
        cy="166"
        rx="30"
        ry="5"
        className="fill-ink/20"
        {...cycle(
          still,
          running ? { rx: [30, 20, 30], opacity: [0.45, 0.2, 0.45] } : { rx: [31, 26, 31] },
          { duration: running ? STRIDE : BREATH, repeat: Infinity, ease: "easeInOut" },
        )}
      />

      <Legs {...parts} />

      <motion.g
        style={pivot("50%", "100%")}
        {...cycle(
          still,
          running ? { y: [0, -7, 0], rotate: [-7, -5, -7] } : { y: [0, -5, 0] },
          { duration: running ? STRIDE : BREATH, repeat: Infinity, ease: "easeInOut" },
        )}
      >
        <Antenna {...parts} />
        <Arms {...parts} />
        <rect x="38" y="56" width="88" height="78" rx="28" className="fill-ink" />
        <Face {...parts} />
      </motion.g>

      <Carried {...parts} />
    </svg>
  );
}

function Antenna({ activity, running, still }: PartProps) {
  const sway = running
    ? { rotate: [14, 4, 14] }
    : activity === "thinking"
      ? { rotate: [-6, 6, -6] }
      : { rotate: [-3, 3, -3] };

  return (
    <motion.g
      style={pivot("50%", "100%")}
      {...cycle(still, sway, {
        duration: running ? STRIDE : 2.8,
        repeat: Infinity,
        ease: "easeInOut",
      })}
    >
      <path d="M82 58 V34" className="stroke-ink" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <motion.circle
        cx="82"
        cy="27"
        r="8"
        className="fill-accent"
        {...cycle(still, { scale: [1, 1.22, 1] }, { duration: 1.3, repeat: Infinity, ease: "easeInOut" })}
      />
    </motion.g>
  );
}

function Legs({ running, still }: PartProps) {
  if (!running || still) {
    return (
      <g className="fill-ink">
        <rect x="58" y="132" width="16" height="26" rx="8" />
        <rect x="92" y="132" width="16" height="26" rx="8" />
      </g>
    );
  }

  return (
    <g className="fill-ink">
      {[
        { x: 58, from: -30, to: 28 },
        { x: 92, from: 28, to: -30 },
      ].map((leg) => (
        <motion.rect
          key={leg.x}
          x={leg.x}
          y="126"
          width="16"
          height="34"
          rx="8"
          style={pivot("50%", "8%")}
          animate={{ rotate: [leg.from, leg.to, leg.from] }}
          transition={{ duration: STRIDE, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </g>
  );
}

function Arms({ activity, running, still }: PartProps) {
  const left = { x: 26, y: 74, width: 16, height: 34, rx: 8 } as const;
  const right = { x: 122, y: 74, width: 16, height: 34, rx: 8 } as const;
  const cls = "fill-ink";

  if (still) {
    return (
      <g className={cls}>
        <rect {...left} />
        <rect {...right} />
      </g>
    );
  }

  if (running) {
    const holding = activity === "searching" || activity === "building";

    return (
      <>
        <motion.rect
          {...left}
          className={cls}
          style={pivot("50%", "6%")}
          animate={{ rotate: [40, -32, 40] }}
          transition={{ duration: STRIDE, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect
          {...right}
          className={cls}
          style={pivot("50%", "6%")}
          animate={holding ? { rotate: [-58, -50, -58] } : { rotate: [-32, 40, -32] }}
          transition={{
            duration: holding ? 0.9 : STRIDE,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </>
    );
  }

  const idle: Record<Activity, { left: TargetAndTransition; right: TargetAndTransition; duration: number }> = {
    building: { left: { rotate: [0, -44, 0] }, right: { rotate: [0, 44, 0] }, duration: 0.9 },
    juggling: { left: { rotate: [-26, -10, -26] }, right: { rotate: [10, 26, 10] }, duration: 0.75 },
    searching: { left: { rotate: 0 }, right: { rotate: [16, -12, 16] }, duration: 2.6 },
    thinking: { left: { rotate: 0 }, right: { rotate: [-158, -150, -158] }, duration: 2.8 },
  };

  const { left: l, right: r, duration } = idle[activity];

  return (
    <>
      <motion.rect
        {...left}
        className={cls}
        style={pivot("50%", "6%")}
        animate={l}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        {...right}
        className={cls}
        style={pivot("50%", "6%")}
        animate={r}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay: duration / 2 }}
      />
    </>
  );
}

function Face({ activity, running, still }: PartProps) {
  const gaze = running
    ? { x: 3, y: 0 }
    : activity === "thinking"
      ? { x: 0, y: -3 }
      : activity === "searching"
        ? { x: 4, y: 0 }
        : { x: 0, y: 0 };

  const mouth = running
    ? "M72 110 q10 7 20 0"
    : activity === "thinking"
      ? "M73 112 H93"
      : "M72 109 q10 9 20 0";

  return (
    <g>
      <motion.g
        className="fill-paper"
        style={pivot("center", "center")}
        {...cycle(
          still,
          {
            x: running ? gaze.x : [gaze.x, -gaze.x, gaze.x],
            y: gaze.y,
            scaleY: [1, 1, 1, 0.08, 1, 1],
          },
          {
            x: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
            scaleY: { duration: 4.2, repeat: Infinity, times: [0, 0.4, 0.46, 0.49, 0.54, 1] },
          },
        )}
      >
        <circle cx="66" cy="92" r="7.5" />
        <circle cx="98" cy="92" r="7.5" />
      </motion.g>

      <path d={mouth} className="stroke-paper" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>
  );
}

function Carried({ activity, running, still }: PartProps) {
  if (activity === "thinking") {
    const bubbles = [
      { x: 128, y: 52, r: 3.5, delay: 0 },
      { x: 140, y: 38, r: 5, delay: 0.35 },
      { x: 154, y: 24, r: 7, delay: 0.7 },
    ];

    return (
      <g className="fill-ink/30">
        {bubbles.map((b) => (
          <motion.circle
            key={b.x}
            cx={running ? 170 - b.x : b.x}
            cy={b.y}
            r={b.r}
            {...cycle(
              still,
              { opacity: [0, 1, 0], y: [6, -4, -10], x: running ? [0, -14, -26] : 0 },
              { duration: 2.2, repeat: Infinity, delay: b.delay, ease: "easeOut" },
            )}
          />
        ))}
      </g>
    );
  }

  if (activity === "building") {
    if (running) {
      return (
        <motion.g
          style={pivot("center", "center")}
          {...cycle(still, { y: [0, -7, 0], rotate: [-3, 3, -3] }, {
            duration: STRIDE,
            repeat: Infinity,
            ease: "easeInOut",
          })}
        >
          <rect x="128" y="36" width="20" height="16" rx="5" className="fill-accent" />
          <rect x="133" y="22" width="20" height="16" rx="5" className="fill-ink/60" />
        </motion.g>
      );
    }

    const blocks = [
      { x: 58, y: 152, delay: 0 },
      { x: 76, y: 152, delay: 0.5 },
      { x: 67, y: 138, delay: 1 },
    ];

    return (
      <g>
        {blocks.map((b, i) => (
          <motion.rect
            key={b.x}
            x={b.x}
            y={b.y}
            width="16"
            height="13"
            rx="4"
            className={i === 2 ? "fill-accent" : "fill-ink/70"}
            {...cycle(still, { opacity: [0, 1, 1, 0], y: [b.y - 14, b.y, b.y, b.y] }, {
              duration: 2.2,
              repeat: Infinity,
              delay: b.delay,
              times: [0, 0.25, 0.8, 1],
            })}
          />
        ))}
      </g>
    );
  }

  if (activity === "searching") {
    return (
      <motion.g
        style={pivot("20%", "20%")}
        {...cycle(
          still,
          running ? { rotate: [-8, 2, -8], y: [0, -7, 0] } : { rotate: [16, -12, 16], x: [0, -6, 0] },
          { duration: running ? STRIDE : 2.6, repeat: Infinity, ease: "easeInOut" },
        )}
      >
        <circle cx="140" cy="86" r="15" className="fill-paper/15 stroke-accent" strokeWidth="5" />
        <path d="M151 97 L162 109" className="stroke-accent" strokeWidth="5.5" strokeLinecap="round" />
      </motion.g>
    );
  }

  return (
    <g>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          r="7"
          cx="36"
          cy="92"
          className={i === 1 ? "fill-accent" : "fill-ink/55"}
          {...cycle(still, { cx: [36, 82, 128, 82, 36], cy: [92, 26, 92, 20, 92] }, {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          })}
        />
      ))}
    </g>
  );
}
