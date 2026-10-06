import { cn } from "@/lib/utils";

const W = 640;
const H = 420;

/**
 * Generated cover artwork for a case study. Everything is drawn from the
 * project's `hue` and a variant index, so projects get distinct, on-brand
 * imagery with no image assets to ship or optimise.
 */
export function ProjectCover({
  id,
  hue,
  variant = 0,
  className,
}: {
  /** Unique per instance — namespaces the gradient ids. */
  id: string;
  hue: number;
  variant?: number;
  className?: string;
}) {
  const gradientId = `cover-grad-${id}`;
  const fadeId = `cover-fade-${id}`;
  const base = `oklch(0.58 0.17 ${hue})`;
  const light = `oklch(0.9 0.07 ${hue})`;
  const deep = `oklch(0.36 0.15 ${hue})`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={base} stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id={fadeId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={deep} stopOpacity="0.5" />
          <stop offset="100%" stopColor={deep} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${gradientId})`} />

      <g stroke={deep} strokeOpacity="0.12" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 72} y1="0" x2={i * 72} y2={H} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 72} x2={W} y2={i * 72} />
        ))}
      </g>

      {variant % 4 === 0 ? (
        <g>
          <circle cx={W} cy={H} r="300" fill={`url(#${fadeId})`} />
          {[88, 150, 212, 274].map((r) => (
            <circle
              key={r}
              cx={W - 40}
              cy={H - 20}
              r={r}
              fill="none"
              stroke={deep}
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />
          ))}
          <circle cx="150" cy="128" r="46" fill={deep} fillOpacity="0.85" />
        </g>
      ) : null}

      {variant % 4 === 1 ? (
        <g>
          <g stroke={deep} strokeOpacity="0.28" strokeWidth="10">
            {Array.from({ length: 14 }, (_, i) => (
              <line key={i} x1={i * 72 - 200} y1={H + 60} x2={i * 72 + 160} y2={-60} />
            ))}
          </g>
          <circle
            cx={W / 2}
            cy={H / 2}
            r="118"
            fill="none"
            stroke={deep}
            strokeOpacity="0.9"
            strokeWidth="2"
          />
          <circle cx={W / 2} cy={H / 2} r="30" fill={deep} fillOpacity="0.9" />
        </g>
      ) : null}

      {variant % 4 === 2 ? (
        <g
          fill="none"
          stroke={deep}
          strokeOpacity="0.4"
          strokeWidth="2"
          transform={`translate(${W / 2} ${H / 2})`}
        >
          {[60, 110, 160, 210].map((s, i) => (
            <rect
              key={s}
              x={-s / 2}
              y={-s / 2}
              width={s}
              height={s}
              rx={s / 7}
              transform={`rotate(${i * 15})`}
            />
          ))}
          <rect x="-24" y="-24" width="48" height="48" rx="8" fill={deep} stroke="none" />
        </g>
      ) : null}

      {variant % 4 === 3 ? (
        <g>
          <g fill={deep} fillOpacity="0.4">
            {Array.from({ length: 8 }, (_, row) =>
              Array.from({ length: 13 }, (_, col) => (
                <circle key={`${row}-${col}`} cx={32 + col * 48} cy={36 + row * 48} r="4" />
              )),
            )}
          </g>
          <path
            d={`M 0 ${H} Q ${W * 0.4} ${H * 0.18} ${W} ${H * 0.52}`}
            fill="none"
            stroke={deep}
            strokeOpacity="0.95"
            strokeWidth="3"
          />
          <circle cx={W * 0.4} cy={H * 0.42} r="40" fill={deep} fillOpacity="0.85" />
        </g>
      ) : null}
    </svg>
  );
}
