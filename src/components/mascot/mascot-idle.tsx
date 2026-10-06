"use client";

import dynamic from "next/dynamic";

/**
 * A standing mascot for pages that want the character without a loading state.
 * Client-only for the same reason as the runner: it draws its own activity.
 */
export const MascotIdle = dynamic(
  () => import("@/components/mascot/mascot-idle-inner").then((m) => m.MascotIdleInner),
  { ssr: false, loading: () => <div className="h-56 w-56" aria-hidden /> },
);
