/**
 * Mascot vocabulary — plain data, deliberately in its own module.
 *
 * mascot.tsx is a client component, and anything exported from a "use client"
 * module becomes a client reference when a server component imports it: the
 * array would arrive as a proxy and `.map` would not exist. Keeping these here
 * lets server and client code share them as real values.
 */
export const ACTIVITIES = ["thinking", "building", "searching", "juggling"] as const;

export type Activity = (typeof ACTIVITIES)[number];
export type Pose = "idle" | "running";

export const ACTIVITY_CAPTIONS: Record<Activity, string> = {
  thinking: "Thinking it through",
  building: "Putting it together",
  searching: "Finding the thing",
  juggling: "Keeping plates spinning",
};

/** Picks an activity, optionally avoiding a repeat of the current one. */
export function randomActivity(exclude?: Activity): Activity {
  const pool = exclude ? ACTIVITIES.filter((a) => a !== exclude) : ACTIVITIES;
  return pool[Math.floor(Math.random() * pool.length)];
}
