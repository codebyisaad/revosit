import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Shared social card for every route that does not define its own. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#fbfbfa",
          backgroundImage:
            "radial-gradient(900px 420px at 80% -10%, rgba(91,75,245,0.22), transparent 70%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="52" viewBox="0 0 32 32" fill="none">
            <rect
              x="7.5"
              y="7.5"
              width="17"
              height="17"
              rx="5"
              transform="rotate(45 16 16)"
              stroke="#0b0b12"
              strokeWidth="2"
            />
            <circle cx="26" cy="6" r="4" fill="#5b4bf5" />
          </svg>
          <span style={{ fontSize: 38, fontWeight: 600, color: "#0b0b12", letterSpacing: -1 }}>
            {site.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              color: "#0b0b12",
              letterSpacing: -2.5,
              maxWidth: 900,
            }}
          >
            We build the software your business runs on.
          </span>
          <span style={{ fontSize: 28, color: "#5a5a6b", maxWidth: 820 }}>
            Full-stack &middot; Salesforce &middot; AI integrations &middot; Staff augmentation
          </span>
        </div>

        <span style={{ fontSize: 24, color: "#5b4bf5" }}>{site.url.replace("https://", "")}</span>
      </div>
    ),
    size,
  );
}
