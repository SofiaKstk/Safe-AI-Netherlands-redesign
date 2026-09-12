/**
 * Responsive image variants for the landing page.
 *
 * The site builds with `output: 'export'` and `images.unoptimized`, so
 * next/image emits a bare <img> with no srcset and every device downloads the
 * full-size original. The landing was shipping ~15MB of photographs, most of
 * it pixels no viewport ever asks for: 1900px funnel photographs rendered as a
 * 12%-opacity wash inside an 86px band, and a 7990x5329 portrait shown in a
 * 104px circle.
 *
 * This script pre-generates the widths each image is actually displayed at.
 * The markup then carries an explicit srcset/sizes, so the ladder lives in two
 * places and has to agree: change a layout width, change the widths here.
 *
 * Sources are never modified. Variants are written beside them as
 * `<name>-<width><ext>` and are committed, because a static export has no
 * runtime to generate them on demand.
 *
 *   npm run images
 */

import { readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const pub = (p) => path.join(ROOT, "public", p);

/* Each entry says where the file is used and how wide it is drawn there, so
   the ladder can be checked against the markup rather than guessed at. */
const TARGETS = [
  {
    note: "TalentFunnel bands (<=432 CSS) and PathwayTrail cards (<=520 CSS)",
    files: [1, 2, 3, 4, 5].map((n) => `landing/funnel-0${n}.jpg`),
    widths: [320, 640, 768, 1040],
  },
  {
    note: "CommunityPrints: 5 columns at 256 CSS, 2 columns at ~45vw",
    files: [
      "landing/print-rooftop.jpg",
      "landing/print-lecture.jpg",
      "landing/print-hackathon.jpg",
      "landing/print-circle.jpg",
      "landing/print-indoor.jpg",
    ],
    widths: [320, 640, 900],
  },
  {
    note: "CourseTabs panel: full shell width below xl, 624 CSS at 1440",
    files: [
      "landing/course-fundamentals.jpg",
      "landing/course-technical.jpg",
      "landing/course-policy.jpg",
    ],
    widths: [640, 960, 1280, 1920],
  },
  {
    note: "Header and footer lockups, drawn at 121x50 and 113x48",
    files: ["landing/logo-navy.png"],
    widths: [121, 242, 363],
  },
  {
    note: "Footer lockup",
    files: ["landing/logo-light.png"],
    widths: [113, 226, 339],
  },
  {
    /* Two consumers at very different scales: the landing draws these in an
       88-104px circle (312 covers it to 3x), while /research puts them in a
       4/5 card up to ~336 CSS wide. Anything already smaller than 800 keeps
       its original as the large rung. */
    note: "ResearchPeople circle (88-104 CSS) and /research card (~336 CSS)",
    files: [
      "photos/supervisors/steven.webp",
      "photos/supervisors/Fatih_3.png",
      "photos/supervisors/Jobst.png",
      "photos/supervisors/Guillame.jpg",
      "photos/supervisors/Ana_Lucic.png",
    ],
    widths: [312, 800],
  },
];

/* Keep the source's format. Switching a transparent PNG to JPEG would fill its
   background with black, and these are only ever resized, never recoded. */
function encode(pipeline, ext) {
  if (ext === ".png") return pipeline.png({ compressionLevel: 9, palette: true });
  if (ext === ".webp") return pipeline.webp({ quality: 82 });
  return pipeline.jpeg({ quality: 78, mozjpeg: true, progressive: true });
}

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

let sourceBytes = 0;
let variantBytes = 0;
const rows = [];

for (const target of TARGETS) {
  for (const file of target.files) {
    const src = pub(file);
    const ext = path.extname(src);
    const base = src.slice(0, -ext.length);

    const input = await readFile(src);
    const meta = await sharp(input).metadata();
    sourceBytes += input.length;

    for (const width of target.widths) {
      /* Never upscale: a variant wider than the source is bytes spent to
         invent detail. srcset simply has one rung fewer. */
      if (width >= meta.width) {
        rows.push([`${file} @${width}`, "skipped", `source is only ${meta.width}px`]);
        continue;
      }

      const out = `${base}-${width}${ext}`;
      const buffer = await encode(
        sharp(input).resize({ width, withoutEnlargement: true }),
        ext,
      ).toBuffer();

      await writeFile(out, buffer);
      variantBytes += buffer.length;
      rows.push([
        path.relative(path.join(ROOT, "public"), out).split(path.sep).join("/"),
        `${width}px`,
        `${kb(input.length)} -> ${kb(buffer.length)}`,
      ]);
    }
  }
}

for (const [name, width, size] of rows) {
  console.log(`  ${name.padEnd(44)} ${width.padEnd(9)} ${size}`);
}
console.log(
  `\n  ${rows.length} rows. Sources ${kb(sourceBytes)}, all variants together ${kb(variantBytes)}.`,
);
console.log("  A viewport downloads one rung per image, not the whole ladder.");
