"use client";

import dynamic from "next/dynamic";

/**
 * Client-only wrapper for the runner.
 *
 * A loading animation has nothing to gain from server rendering, and skipping
 * it means the component can pick a random activity as its initial state
 * without the server and the client ever disagreeing about which one.
 */
export const MascotLoader = dynamic(
  () => import("@/components/mascot/mascot-runner").then((m) => m.MascotRunner),
  {
    ssr: false,
    // Reserve the same space so nothing shifts when the runner arrives.
    loading: () => <div className="h-44 w-full" aria-hidden />,
  },
);
