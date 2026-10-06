export const ACTIVITIES = ["thinking", "building", "searching", "juggling"] as const;

export type Activity = (typeof ACTIVITIES)[number];
export type Pose = "idle" | "running";

export const ACTIVITY_CAPTIONS: Record<Activity, string> = {
  thinking: "Thinking it through",
  building: "Putting it together",
  searching: "Finding the thing",
  juggling: "Keeping plates spinning",
};

export function randomActivity(exclude?: Activity): Activity {
  const pool = exclude ? ACTIVITIES.filter((a) => a !== exclude) : ACTIVITIES;
  return pool[Math.floor(Math.random() * pool.length)];
}
