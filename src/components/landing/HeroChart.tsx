/**
 * The hero's evidence. Demand for AI Safety work compounds; navy bars turn
 * orange at the inflection, and the orange is the part of the curve SAIN is
 * pointing at. Geometry from the Paper file, bar for bar.
 */

/* Bar heights, left to right. Baseline is y=360, the plot is 420px wide. */
const HEIGHTS = [
  20, 20.2, 21.1, 22.5, 24.5, 27.2, 30.6, 34.7, 39.4, 44.9, 51.1, 57.9, 65.5, 73.9, 82.9, 92.8,
  103.3, 114.6, 126.7, 139.5, 153.1, 167.5, 182.6, 198.5, 215.2, 232.7, 251, 270,
];

/* Where navy becomes orange. Everything from here is the rise SAIN is naming. */
const INFLECTION = 23;

const STEP = 420 / (HEIGHTS.length - 1);
const BASELINE = 360;

const curve = HEIGHTS.map((h, i) => `${80 + i * STEP} ${BASELINE - h}`).join(" L ");

export default function HeroChart() {
  return (
    <svg
      className="h-auto w-full max-w-[560px]"
      width="560"
      height="430"
      viewBox="0 0 560 430"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A chart of demand for AI Safety work rising exponentially, with the most recent years marked in orange."
    >
      <g opacity="0.12" stroke="#021C4D">
        {[80, 120, 160, 200, 240, 280, 320, 360].map((y) => (
          <line key={`h${y}`} x1="80" y1={y} x2="500" y2={y} />
        ))}
        {[80, 132.5, 185, 237.5, 290, 342.5, 395, 447.5, 500].map((x) => (
          <line key={`v${x}`} x1={x} y1="80" x2={x} y2="360" />
        ))}
      </g>

      <line x1="80" y1="360" x2="80" y2="70" stroke="#021C4D38" />
      {[270, 180, 90].map((y) => (
        <line key={`t${y}`} x1="72" y1={y} x2="80" y2={y} stroke="#021C4D38" />
      ))}

      {HEIGHTS.map((height, i) => {
        const rising = i >= INFLECTION;
        return (
          <rect
            key={i}
            x={77 + i * STEP}
            y={BASELINE - height}
            width="6"
            height={height}
            fill={rising ? "#FF6025" : "#021C4D"}
            opacity={rising ? 1 : 0.75}
          />
        );
      })}

      <path d={`M ${curve}`} fill="none" stroke="#FF602580" strokeWidth="1.5" />
      <circle cx="500" cy="90" r="6" fill="#FF6025" />
    </svg>
  );
}
