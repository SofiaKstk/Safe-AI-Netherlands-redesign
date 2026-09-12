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
  label: string;
  labelClass: string;
  photo: string;
  objectPosition: string;
  fill: string;
  stroke: string;
  restOpacity: number;
  hoverOpacity: number;
  blend: "multiply" | "luminosity";
};

const BANDS: Band[] = [
  {
    width: 432,
    inset: 8.8,
    label: "Join a free course",
    labelClass: "text-base leading-5 text-navy",
    photo: "/landing/funnel-01.jpg",
    objectPosition: "38% 34%",
    fill: "#021C4D0B",
    stroke: "#021C4D4D",
    restOpacity: 0.1,
    hoverOpacity: 0.26,
    blend: "multiply",
  },
  {
    width: 356,
    inset: 9,
    label: "Participate in SAIN's community",
    labelClass: "max-w-[280px] text-center text-[15px] leading-[19px] text-navy",
    photo: "/landing/funnel-02.jpg",
    objectPosition: "72% 42%",
    fill: "#021C4D0B",
    stroke: "#021C4D4D",
    restOpacity: 0.14,
    hoverOpacity: 0.26,
    blend: "multiply",
  },
  {
    width: 292,
    inset: 8.9,
    label: "Contribute and collaborate on research or projects",
    labelClass: "max-w-[230px] text-center text-sm leading-[18px] text-navy",
    photo: "/landing/funnel-03.jpg",
    objectPosition: "82% 30%",
    fill: "#021C4D0D",
    stroke: "#021C4D52",
    restOpacity: 0.1,
    hoverOpacity: 0.26,
    blend: "multiply",
  },
  {
    width: 240,
    inset: 9.2,
    label: "Undertake a fellowship or internship in AI Safety",
    labelClass: "max-w-[190px] text-center text-[13px] leading-[17px] text-navy",
    photo: "/landing/funnel-04.jpg",
    objectPosition: "42% 48%",
    fill: "#021C4D0E",
    stroke: "#021C4D57",
    restOpacity: 0.1,
    hoverOpacity: 0.26,
    blend: "multiply",
  },
  {
    width: 196,
    inset: 10.2,
    label: "Work full-time in AI Safety",
    labelClass: "max-w-[150px] text-center text-sm leading-[18px] text-white",
    photo: "/landing/funnel-05.jpg",
    objectPosition: "50% 40%",
    fill: "#FF6025",
    stroke: "#FF6025",
    restOpacity: 0.12,
    hoverOpacity: 0.32,
    blend: "luminosity",
  },
];

const WIDEST = BANDS[0].width;

export default function TalentFunnel() {
  return (
    <div className="flex w-full max-w-[436px] shrink-0 flex-col items-center overflow-visible drop-shadow-[0_2px_16px_#00000033]">
      {/* Origin: a dot and an arrow into the mouth of the funnel. */}
      <div className="flex flex-col items-center">
        <span className="size-[7px] rounded-full bg-orange" />
        <svg width="9" height="16" viewBox="0 0 9 16" aria-hidden="true">
          <line x1="4.5" y1="0" x2="4.5" y2="10" stroke="#FF6025" />
          <polygon points="4.5,16 1.25,10 7.75,10" fill="#FF6025" />
        </svg>
      </div>

      {BANDS.map((band) => {
        const bottom = band.width - (band.inset / 100) * band.width * 2;
        const offset = (band.inset / 100) * band.width;

        return (
          <div
            key={band.label}
            className="group relative flex h-[86px] items-center justify-center"
            style={{
              width: `${(band.width / WIDEST) * 100}%`,
              maxWidth: `${band.width}px`,
            }}
          >
            <svg
              className="absolute inset-0 size-full"
              viewBox={`0 0 ${band.width} 86`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon
                points={`0,0.5 ${band.width},0.5 ${offset + bottom},85.5 ${offset},85.5`}
                fill={band.fill}
                stroke={band.stroke}
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

            <p className={`relative font-serif ${band.labelClass}`}>{band.label}</p>
          </div>
        );
      })}

      {/* Terminus: a short stem and a dot, so the diagram ends rather than stops. */}
      <div className="flex flex-col items-center pt-0.5">
        <span className="h-2.5 w-px bg-navy/20" />
        <span className="size-[7px] rounded-full bg-orange" />
      </div>
    </div>
  );
}
