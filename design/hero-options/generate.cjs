// Generates three refined variants of sain-learning-to-steering.svg.
// Shared parts, so the three differ only where the option says they do.
const fs = require("fs");
const path = require("path");
const OUT = process.argv[2];

const NAVY = "#021C4D";
const ORANGE = "#FF6025";

// The curve and axes are untouched from the shipped file.
const shipped = fs.readFileSync(process.argv[3], "utf8");
const axesAndCurve = shipped.slice(
  shipped.indexOf('<path d="M76 66'),
  shipped.indexOf('<path d="M503 269'),
);

// One body, drawn once. Local canvas is 0..76 wide, 0..110 tall; feet at y=110.
const head = `
<path d="M32 26 C27 15 32 4 43 4 C55 3 62 13 58 25 L56 34 C51 44 36 41 33 32Z" fill="white" />
<path d="M31 24 C25 14 30 2 40 2 C48 -3 61 4 62 14 C56 16 50 14 45 10 C41 17 36 21 31 24Z" fill="${NAVY}" />
<path d="M49 24h.3 M52 31 Q48 35 44 32" stroke-width="2.4" />`;
const legs = `<path d="M25 80 L23 102 Q15 103 16 110 L37 110 L44 85 L49 104 Q44 105 45 110 L68 110 Q69 106 61 101 L60 79Z" fill="${NAVY}" />`;
const torso = `<path d="M33 41 C17 43 8 55 9 69 C10 80 23 86 39 82 L64 82 C75 73 70 52 55 43Z" fill="white" />`;
const collar = `<path d="M43 42 L48 49 L56 43" />`;

// Reader: both forearms come forward to the book, drawn as two clean sleeves
// (the shipped loop-and-blob cuffs are gone), then the book covers the hands.
const reader = `
${legs}${torso}${collar}
<path d="M17 56 C13 66 17 76 29 79" />
<path d="M70 58 C74 68 70 77 62 80" />
${head}
<path d="M35 57 Q44 55 51 61 Q59 57 69 59 L66 82 Q57 79 49 84 Q42 78 33 79Z" fill="white" />
<path d="M51 61 L49 84" stroke="${ORANGE}" />
<path d="M39 68 L45 69 M39 74 L46 75 M55 68 L62 67 M55 74 L62 73" stroke-opacity=".35" stroke-width="1.6" />`;

// Typist: one sleeve down to the keys, the far arm hidden by the laptop.
const typist = `
${legs}${torso}${collar}
<path d="M17 56 C12 66 15 78 27 83" />
${head}
<path d="M35 62 L78 62 L72 85 L30 85Z" fill="white" />
<path d="M26 86 L78 86 M53 73 L58 73" stroke="${ORANGE}" />`;

// Steerer: the raised arm now ends at y=-16 instead of -39, so the arm is
// about two and a half heads long rather than three and a half.
const steerer = `
${legs}
<path d="M33 41 C17 44 8 54 9 69 C10 81 21 86 36 83 L61 82 L66 57 C76 48 85 30 88 6 L88 -16 Q86 -21 82 -17 L81 4 C76 24 66 36 55 42Z" fill="white" />
${collar}
<path d="M17 56 C13 66 17 76 29 79" />
${head}`;

function figure(body, x, y, s) {
  // Stroke compensated for the group scale so all three read at the same weight.
  const sw = (2.4 / s).toFixed(2);
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke-width="${sw}">${body}</g>`;
}

// The tether runs from the steerer's hand to the curve. Hand is local (85,-16).
function tetherAndHand(x, y, s) {
  const hx = x + 85 * s;
  const hy = y - 16 * s;
  return `
<path d="M${hx.toFixed(1)} ${hy.toFixed(1)} C${(hx + 4).toFixed(1)} ${(hy - 30).toFixed(1)} 451 232 410 225.8238" stroke="${ORANGE}" stroke-width="2.2" />
<path d="M${(hx - 3).toFixed(1)} ${(hy + 1).toFixed(1)} Q${(hx - 7).toFixed(1)} ${(hy - 4).toFixed(1)} ${(hx - 2).toFixed(1)} ${(hy - 5).toFixed(1)} L${(hx + 2).toFixed(1)} ${(hy - 3).toFixed(1)}" stroke-width="2.1" fill="white" />
<circle cx="410" cy="225.8238" r="12" fill="white" stroke="${ORANGE}" stroke-width="3" />`;
}

const BASE = 420; // x axis
const feet = (s) => BASE - 110 * s;

const OPTIONS = {
  // A. As shipped: the same three sizes and positions, only the lines tidied.
  a: [
    ["reader", 310, 0.67],
    ["typist", 357, 0.7],
    ["steerer", 414, 1],
  ],
  // B. A gentler step up in size: the third figure is a little taller, not a
  //    different species.
  b: [
    ["reader", 288, 0.78],
    ["typist", 348, 0.82],
    ["steerer", 416, 0.94],
  ],
  // C. Three peers at one size; what changes between them is only what they
  //    are doing.
  c: [
    ["reader", 284, 0.84],
    ["typist", 348, 0.84],
    ["steerer", 416, 0.84],
  ],
};

const bodies = { reader, typist, steerer };

for (const [key, placements] of Object.entries(OPTIONS)) {
  let figs = "";
  let tether = "";
  for (const [name, x, s] of placements) {
    const y = feet(s);
    figs += figure(bodies[name], x, y, s);
    if (name === "steerer") tether = tetherAndHand(x, y, s);
  }
  const svg = `<svg width="720" height="500" viewBox="0 0 720 500" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="${NAVY}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${axesAndCurve}${tether.split("\n").slice(0, 2).join("\n")}${figs}${tether.split("\n").slice(2).join("\n")}</g></svg>`;
  fs.writeFileSync(path.join(OUT, `hero-${key}.svg`), svg);
}
console.log("written");
