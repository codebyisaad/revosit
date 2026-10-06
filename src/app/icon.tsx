import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b12",
        }}
      >
        <svg width="320" height="320" viewBox="0 0 32 32" fill="none">
          <rect
            x="7.5"
            y="7.5"
            width="17"
            height="17"
            rx="5"
            transform="rotate(45 16 16)"
            stroke="#fbfbfa"
            strokeWidth="2"
          />
          <circle cx="26" cy="6" r="4" fill="#5b4bf5" />
        </svg>
      </div>
    ),
    size,
  );
}
