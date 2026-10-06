"use client";

import type { Activity, Pose } from "@/components/mascot/activities";
import { Mascot } from "@/components/mascot/mascot";

/**
 * A mascot pinned to one activity, for side-by-side comparison in the dev
 * preview. The product uses the randomising wrappers instead.
 */
export function MascotStill({
  activity,
  pose = "idle",
}: {
  activity: Activity;
  pose?: Pose;
}) {
  return <Mascot activity={activity} pose={pose} className="h-36 w-36" />;
}
