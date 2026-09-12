import type { CSSProperties } from "react";

/**
 * The SAIN Talent Pipeline. The trapezoids narrow because the path narrows:
 * a course is open to anyone, a full-time role is not. The last band is solid
 * orange because that is the destination, and the photographs inside the bands
 * are texture — evidence that each step is a room that exists — not hero crops.
 */

type Band = {
  /** Trapezoid width at the top, in the 432px design canvas. */
  width: number;
  /** Bottom edge inset, as a percentage of the band width. */
  inset: number;
  /** The section of this page that describes the step. */
  href: string;
  label: string;
  labelClass: string;
  photo: string;
  objectPosition: string;
  fill: string;
  restOpacity: number;
  hoverOpacity: number;
  blend: "multiply" | "luminosity";
};

const BANDS: Band[] = [
  {
    width: 432,
    inset: 8.8,
    href: "#courses",
    label: "Join a free course",
    labelClass: "text-base leading-5 text-navy",
    photo: "/landing/funnel-01.jpg",
    objectPosition: "38% 34%",
    fill: "#021C4D0B",
    restOpacity: 0.1,
    hoverOpacity: 0.26,
    blend: "multiply",
  },
  {
    width: 356,
    inset: 9,
    href: "#community",
    label: "Participate in SAIN's community",
    labelClass:
      "max-w-[280px] text-center text-[15px] leading-[19px] text-navy",
    photo: "/landing/funnel-02.jpg",
    objectPosition: "72% 42%",
    fill: "#021C4D0B",
    restOpacity: 0.14,
    hoverOpacity: 0.26,
    blend: "multiply",
  },
  {
    width: 292,
    inset: 8.9,
    href: "#research",
    label: "Contribute and collaborate on research or projects",
    labelClass: "max-w-[230px] text-center text-sm leading-[18px] text-navy",
    photo: "/landing/funnel-03.jpg",
    objectPosition: "82% 30%",
    fill: "#021C4D0D",
    restOpacity: 0.1,
    hoverOpacity: 0.26,
    blend: "multiply",
  },
  {
    width: 240,
    inset: 9.2,
    href: "#careers",
    label: "Undertake a fellowship or internship in AI Safety",
    labelClass:
      "max-w-[190px] text-center text-[13px] leading-[17px] text-navy",
    photo: "/landing/funnel-04.jpg",
    objectPosition: "42% 48%",
    fill: "#021C4D0E",
    restOpacity: 0.1,
    hoverOpacity: 0.26,
    blend: "multiply",
  },
  {
    width: 196,
    inset: 10.2,
    href: "#careers",
    label: "Work full-time in AI Safety",
    labelClass: "max-w-[150px] text-center text-sm leading-[18px] text-white",
    photo: "/landing/funnel-05.jpg",
    objectPosition: "50% 40%",
    fill: "#FF6025",
    restOpacity: 0.12,
    hoverOpacity: 0.32,
    blend: "luminosity",
  },
];

const WIDEST = BANDS[0].width;
const BAND_HEIGHT = 86;
const LAST = BANDS.length - 1;

/**
 * Left-edge x at every horizontal rule, accumulated from the band insets. The
 * funnel is concave rather than a straight cone — each band tapers less
 * sharply than the one above it — so the side is a polyline, and it has to be
 * drawn as one path. Five separate trapezoid outlines gave every junction two
 * stacked horizontal rules and five independent stroke runs, which is what
 * made the bands read as stacked shapes instead of one funnel.
 */
const EDGES = BANDS.reduce<number[]>(
  (acc, band) => [
    ...acc,
    acc[acc.length - 1] + (band.inset / 100) * band.width,
  ],
  [0],
);

const y = (i: number) => i * BAND_HEIGHT;
const right = (i: number) => WIDEST - EDGES[i];

/* Top edge, then the right side down to the orange band, then the left side. */
const SILHOUETTE =
  `M 0 0 L ${WIDEST} 0` +
  Array.from({ length: LAST }, (_, i) => ` L ${right(i + 1)} ${y(i + 1)}`).join(
    "",
  ) +
  ` M 0 0` +
  Array.from({ length: LAST }, (_, i) => ` L ${EDGES[i + 1]} ${y(i + 1)}`).join(
    "",
  );

/* The terminus keeps its own closed outline, because it is orange, not navy. */
const TERMINUS =
  `M ${EDGES[LAST]} ${y(LAST)} L ${right(LAST)} ${y(LAST)}` +
  ` L ${right(LAST + 1)} ${y(LAST + 1)} L ${EDGES[LAST + 1]} ${y(LAST + 1)} Z`;

export default function TalentFunnel() {
  return (
    <div className="flex w-full max-w-[436px] flex-col items-center overflow-visible drop-shadow-[0_2px_16px_#00000033]">
      {/* Origin: a dot and an arrow into the mouth of the funnel. */}
      <div className="flex flex-col items-center">
        <span className="size-[7px] rounded-full bg-orange" />
        <svg width="9" height="16" viewBox="0 0 9 16" aria-hidden="true">
          <line x1="4.5" y1="0" x2="4.5" y2="10" stroke="#FF6025" />
          <polygon points="4.5,16 1.25,10 7.75,10" fill="#FF6025" />
        </svg>
      </div>

      {/* The bands sit in a box exactly as wide as the widest band, so the
          silhouette drawn over them lines up with their geometry. */}
      <div className="relative w-full max-w-[432px]">
        {BANDS.map((band) => {
          const bottom = band.width - (band.inset / 100) * band.width * 2;
          const offset = (band.inset / 100) * band.width;

          return (
            <a
              key={band.label}
              href={band.href}
              className="group relative mx-auto flex h-[86px] items-center justify-center outline-offset-2 focus-visible:outline-2 focus-visible:outline-navy"
              style={{ width: `${(band.width / WIDEST) * 100}%` }}
            >
              {/* Fill only. The outline is drawn once, over the whole funnel. */}
              <svg
                className="absolute inset-0 size-full"
                viewBox={`0 0 ${band.width} ${BAND_HEIGHT}`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon
                  points={`0,0 ${band.width},0 ${offset + bottom},${BAND_HEIGHT} ${offset},${BAND_HEIGHT}`}
                  fill={band.fill}
                />
              </svg>

              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: `polygon(0 0, 100% 0, ${100 - band.inset}% 100%, ${band.inset}% 100%)`,
                }}
              >
                <img
                  src={band.photo}
                  alt=""
                  loading="lazy"
                  className="size-full scale-100 object-cover opacity-[var(--rest)] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:opacity-[var(--hover)]"
                  style={
                    {
                      objectPosition: band.objectPosition,
                      mixBlendMode: band.blend,
                      "--rest": band.restOpacity,
                      "--hover": band.hoverOpacity,
                    } as CSSProperties
                  }
                />
              </div>

              <p className={`relative font-sans ${band.labelClass}`}>
                {band.label}
              </p>
            </a>
          );
        })}

        {/* One outline for the whole funnel, so the sides are continuous
            through every slope change and no junction carries a doubled rule.
            The rules between bands are deliberately quieter than the
            silhouette: the funnel is one object, subdivided. */}
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          viewBox={`0 0 ${WIDEST} ${y(BANDS.length)}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g stroke="#021C4D26" vectorEffect="non-scaling-stroke">
            {Array.from({ length: LAST - 1 }, (_, i) => i + 1).map((i) => (
              <line key={i} x1={EDGES[i]} y1={y(i)} x2={right(i)} y2={y(i)} />
            ))}
          </g>
          <path
            d={SILHOUETTE}
            fill="none"
            stroke="#021C4D52"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={TERMINUS}
            fill="none"
            stroke="#FF6025"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Terminus: a short stem and a dot, so the diagram ends rather than stops. */}
      <div className="flex flex-col items-center pt-0.5">
        <span className="h-2.5 w-px bg-navy/20" />
        <span className="size-[7px] rounded-full bg-orange" />
      </div>
    </div>
  );
}
