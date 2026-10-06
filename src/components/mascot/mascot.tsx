"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Revo — the house mascot.
 *
 * An original character, deliberately: the body is the logo mark (a rounded
 * square) stood upright, and the antenna bulb is the logo's orbiting node.
 * Drawn entirely from theme tokens — body `ink`, face `paper`, bulb `accent` —
 * so it inverts with the theme for free.
 *
 * `pose` controls the body; `activity` controls what it is carrying or doing.
 * Keeping those independent is what lets the run stay consistent while the
 * personality varies per load.
 */
export const ACTIVITIES = ["thinking", "building", "searching", "juggling"] as const;

export type Activity = (typeof ACTIVITIES)[number];
export type Pose = "idle" | "running";

export function randomActivity(exclude?: Activity): Activity {
  const pool = exclude ? ACTIVITIES.filter((a) => a !== exclude) : ACTIVITIES;
  return pool[Math.floor(Math.random() * pool.length)];
}

export const ACTIVITY_CAPTIONS: Record<Activity, string> = {
  thinking: "Thinking it through",
  building: "Putting it together",
  searching: "Finding the thing",
  juggling: "Keeping plates spinning",
};

/** One stride. Everything that cycles with the legs shares this. */
const STRIDE = 0.44;

export function Mascot({
  activity,
  pose = "idle",
  className,
}: {
  activity: Activity;
  pose?: Pose;
  className?: string;
}) {
  const running = pose === "running";

  return (
    <svg
      viewBox="0 0 170 172"
      role="img"
      aria-label={`Revo the mascot, ${ACTIVITY_CAPTIONS[activity].toLowerCase()}`}
      className={cn("h-40 w-40", className)}
    >
      {/* Shadow tightens on each push-off — what sells the weight of a stride. */}
      <motion.ellipse
        cx="82"
        cy="166"
        rx="30"
        ry="5"
        className="fill-ink/20"
        animate={running ? { rx: [30, 20, 30], opacity: [0.45, 0.2, 0.45] } : { rx: [31, 26, 31] }}
        transition={{ duration: running ? STRIDE : 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <Legs running={running} />

      {/* Torso: bobs on every stride and leans into the run. */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        animate={
          running
            ? { y: [0, -7, 0], rotate: [-7, -5, -7] }
            : { y: [0, -5, 0], rotate: 0 }
        }
        transition={{ duration: running ? STRIDE : 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Antenna running={running} activity={activity} />
        <Arms running={running} activity={activity} />

        <rect x="38" y="56" width="88" height="78" rx="28" className="fill-ink" />

        <Face running={running} activity={activity} />
      </motion.g>

      <Props running={running} activity={activity} />
    </svg>
  );
}

function Antenna({ running, activity }: { running: boolean; activity: Activity }) {
  return (
    <motion.g
      style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
      animate={running ? { rotate: [14, 4, 14] } : activity === "thinking" ? { rotate: [-6, 6, -6] } : { rotate: [-3, 3, -3] }}
      transition={{ duration: running ? STRIDE : 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M82 58 V34" className="stroke-ink" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <motion.circle
        cx="82"
        cy="27"
        r="8"
        className="fill-accent"
        animate={{ scale: [1, 1.22, 1] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.g>
  );
}

function Legs({ running }: { running: boolean }) {
  if (!running) {
    return (
      <g className="fill-ink">
        <rect x="58" y="132" width="20" height="26" rx="9" />
        <rect x="88" y="132" width="20" height="26" rx="9" />
      </g>
    );
  }

  // Contra-rotating around the hip, half a stride apart.
  return (
    <g className="fill-ink">
      {[
        { x: 58, from: -38, to: 34 },
        { x: 88, from: 34, to: -38 },
      ].map((leg) => (
        <motion.rect
          key={leg.x}
          x={leg.x}
          y="126"
          width="20"
          height="34"
          rx="10"
          style={{ transformBox: "fill-box", transformOrigin: "50% 8%" }}
          animate={{ rotate: [leg.from, leg.to, leg.from] }}
          transition={{ duration: STRIDE, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </g>
  );
}

function Arms({ running, activity }: { running: boolean; activity: Activity }) {
  const arm = "fill-ink";

  // While running, the trailing arm pumps and the leading arm holds whatever
  // the activity gave it — so the character reads as busy, not just moving.
  if (running) {
    const leadHeld = activity === "searching" || activity === "building";

    return (
      <>
        <motion.rect
          x="24" y="78" width="13" height="30" rx="6.5" className={arm}
          style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
          animate={{ rotate: [42, -34, 42] }}
          transition={{ duration: STRIDE, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect
          x="127" y="78" width="13" height="30" rx="6.5" className={arm}
          style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
          animate={leadHeld ? { rotate: [-62, -54, -62] } : { rotate: [-34, 42, -34] }}
          transition={{ duration: leadHeld ? 0.9 : STRIDE, repeat: Infinity, ease: "easeInOut" }}
        />
      </>
    );
  }

  if (activity === "building") {
    return (
      <>
        <motion.rect
          x="24" y="78" width="13" height="32" rx="6.5" className={arm}
          style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
          animate={{ rotate: [0, -48, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect
          x="127" y="78" width="13" height="32" rx="6.5" className={arm}
          style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
          animate={{ rotate: [0, 48, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
        />
      </>
    );
  }

  if (activity === "juggling") {
    return (
      <>
        <motion.rect
          x="24" y="76" width="13" height="30" rx="6.5" className={arm}
          style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
          animate={{ rotate: [-28, -12, -28] }}
          transition={{ duration: 0.75, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect
          x="127" y="76" width="13" height="30" rx="6.5" className={arm}
          style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
          animate={{ rotate: [12, 28, 12] }}
          transition={{ duration: 0.75, repeat: Infinity, ease: "easeInOut", delay: 0.37 }}
        />
      </>
    );
  }

  if (activity === "searching") {
    return (
      <>
        <rect x="24" y="80" width="13" height="30" rx="6.5" className={arm} />
        <motion.rect
          x="127" y="80" width="13" height="30" rx="6.5" className={arm}
          style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
          animate={{ rotate: [18, -14, 18] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </>
    );
  }

  return (
    <>
      <rect x="24" y="82" width="13" height="30" rx="6.5" className={arm} />
      <motion.rect
        x="127" y="82" width="13" height="30" rx="6.5" className={arm}
        style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        animate={{ rotate: [-104, -96, -104] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function Face({ running, activity }: { running: boolean; activity: Activity }) {
  const gaze = running
    ? { x: 3, y: 0 }
    : activity === "thinking"
      ? { x: 0, y: -3 }
      : activity === "searching"
        ? { x: 4, y: 0 }
        : { x: 0, y: 0 };

  return (
    <g>
      <motion.g
        className="fill-paper"
        animate={{
          x: running ? gaze.x : [gaze.x, -gaze.x, gaze.x],
          y: gaze.y,
          // Pause, snap shut, snap open — the shape of a real blink.
          scaleY: [1, 1, 1, 0.08, 1, 1],
        }}
        transition={{
          x: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
          scaleY: { duration: 4.2, repeat: Infinity, times: [0, 0.4, 0.46, 0.49, 0.54, 1] },
        }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <circle cx="66" cy="92" r="7.5" />
        <circle cx="98" cy="92" r="7.5" />
      </motion.g>

      <path
        d={
          running
            ? "M72 110 q10 7 20 0"
            : activity === "thinking"
              ? "M73 112 H93"
              : "M72 109 q10 9 20 0"
        }
        className="stroke-paper"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

/** Per-activity extras. While running these trail behind or are carried along. */
function Props({ running, activity }: { running: boolean; activity: Activity }) {
  if (activity === "thinking") {
    return (
      <g>
        {[
          { cx: 128, cy: 52, r: 3.5, delay: 0 },
          { cx: 140, cy: 38, r: 5, delay: 0.35 },
          { cx: 154, cy: 24, r: 7, delay: 0.7 },
        ].map((b) => (
          <motion.circle
            key={b.cx}
            // Trailing behind when running, rising above when still.
            cx={running ? 170 - b.cx : b.cx}
            cy={b.cy}
            r={b.r}
            className="fill-ink/30"
            animate={{ opacity: [0, 1, 0], y: [6, -4, -10], x: running ? [0, -14, -26] : 0 }}
            transition={{ duration: 2.2, repeat: Infinity, delay: b.delay, ease: "easeOut" }}
          />
        ))}
      </g>
    );
  }

  if (activity === "building") {
    // Carried overhead while running, stacked on the ground while still.
    if (running) {
      return (
        <motion.g
          animate={{ y: [0, -7, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: STRIDE, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <rect x="128" y="36" width="20" height="16" rx="5" className="fill-accent" />
          <rect x="133" y="22" width="20" height="16" rx="5" className="fill-ink/60" />
        </motion.g>
      );
    }

    return (
      <g>
        {[
          { x: 58, y: 152, delay: 0 },
          { x: 76, y: 152, delay: 0.5 },
          { x: 67, y: 138, delay: 1 },
        ].map((b, i) => (
          <motion.rect
            key={i}
            x={b.x}
            y={b.y}
            width="16"
            height="13"
            rx="4"
            className={i === 2 ? "fill-accent" : "fill-ink/70"}
            animate={{ opacity: [0, 1, 1, 0], y: [b.y - 14, b.y, b.y, b.y] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: b.delay, times: [0, 0.25, 0.8, 1] }}
          />
        ))}
      </g>
    );
  }

  if (activity === "searching") {
    return (
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "20% 20%" }}
        animate={running ? { rotate: [-8, 2, -8], y: [0, -7, 0] } : { rotate: [16, -12, 16], x: [0, -6, 0] }}
        transition={{ duration: running ? STRIDE : 2.6, repeat: Infinity, ease: "easeInOut" }}
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
          className={i === 1 ? "fill-accent" : "fill-ink/55"}
          animate={{ cx: [36, 82, 128, 82, 36], cy: [92, 26, 92, 20, 92] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}
    </g>
  );
}
