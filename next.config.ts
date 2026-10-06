import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a self-contained server bundle (.next/standalone) carrying only the
  // node_modules actually reached at runtime. The Docker runner stage copies
  // that instead of installing dependencies again.
  output: "standalone",
};

export default nextConfig;
