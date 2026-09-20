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
   the ladder can be checked against the markup rather than guessed at. An
   entry may set `format` when the rungs should leave the source's container
   behind, for photographs that were handed over as PNG. */
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
    note: "Header lockup, drawn at 182x75",
    files: ["landing/logo-navy.png"],
    widths: [182, 364, 546],
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
  {
    /* /about portraits: leadership tiles at 140-158 CSS, advisory at 132-146.
       The originals were going into those tiles untouched, 6.6MB of them, one
       of which is 7581px square.

       440 is the top rung because the narrowest source is 459 wide and a rung
       wider than its source is skipped, which would leave a srcSet entry
       pointing at a file that was never written. Every rung is JPEG even where
       the source is a PNG: these are photographs, and the two PNGs carry alpha
       that flattens onto the white ground the band draws them on. */
    note: "About portraits: leadership tiles <=158 CSS, advisory <=146 CSS",
    files: [
      "photos/team/Alexander.jpg",
      "photos/team/Tarteel_Mohamed.jpg",
      "photos/team/Ana_resized.jpeg",
      "photos/team/Andreea_resized.jpeg",
      "photos/team/Riccardo_resized.jpeg",
      "photos/advisory_board/Teun.jpg",
      "photos/advisory_board/Jesse.jpg",
      "photos/advisory_board/nandi.jpg",
      "photos/advisory_board/Jelle.jpeg",
      "photos/advisory_board/lisa_gotoh_revised.jpeg",
      "photos/advisory_board/Robert_Praasjpeg.jpeg",
      "photos/advisory_board/charbel.png",
      "photos/advisory_board/Richard.png",
      "photos/advisory_board/Video_Jesselit_039_close-up.jpg",
      "photos/advisory_board/Stephen_Corlett.jpg",
    ],
    widths: [160, 320, 440],
    format: ".jpg",
  },
  {
    /* /community: the hero pair (<=254 CSS) and the EventPrints strip, which
       is 72vw on a phone and about 260 CSS in the xl scatter. These were the
       last full-size sources on the site, shipping 400 to 590KB each to draw
       a print the width of a postcard. webp because several of the sources are
       phone PNGs, where a PNG rung is still several times a webp one. */
    note: "Community hero prints (<=254 CSS) and EventPrints (72vw, <=260 CSS)",
    files: [
      "photos/events/control-hackathon.png",
      "photos/events/forecasting-hackathon.png",
      "photos/events/pub-quiz.jpg",
      "photos/events/tedx-broerstraat.webp",
      "photos/events/utrecht/aisfundamentals-graduation-ceremony.jpeg",
      "photos/events/utrecht/discussion-eu2031.jpeg",
      "photos/events/utrecht/win4AISafety_congrats_the_winners.jpg",
    ],
    widths: [320, 640, 900],
    format: ".webp",
  },
];

/* Crops, not rungs. The chapters band draws each city's hero as a wash behind
   a cell about 330x94, and the three full heroes come to 3.8MB to do it. These
   are the crops it draws instead.

   The band masks its image in from the left, so what a crop keeps on its right
   is the part that is actually seen. `keep` is the fraction of the source width
   the window holds, anchored left: Utrecht's tower stands far enough left in
   the full frame that it sat inside the fade, and dropping the right quarter
   of the frame walks it out into the open. A city whose subject already sits
   right of centre wants 1 and nothing else. */
const CROPS = {
  size: { width: 720, height: 280 },
  files: [
    { src: "photos/cities/utrecht-hero.jpg", out: "photos/cities/utrecht-index.webp", keep: 0.76 },
    { src: "photos/cities/groningen-hero.jpg", out: "photos/cities/groningen-index.webp", keep: 1 },
    { src: "photos/cities/amsterdam-hero.jpg", out: "photos/cities/amsterdam-index.webp", keep: 1 },
  ],
};

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

      /* A target may recode: a photograph shipped as PNG is a photograph, and
         a rung of it should be JPEG. Alpha is flattened onto white first,
         because JPEG has none and the default fill is black. */
      const outExt = target.format ?? ext;
      const recoding = outExt !== ext;
      const out = `${base}-${width}${outExt}`;
      let pipeline = sharp(input).resize({ width, withoutEnlargement: true });
      if (recoding && meta.hasAlpha) pipeline = pipeline.flatten({ background: "#ffffff" });
      const buffer = await encode(pipeline, outExt).toBuffer();

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

/* The crops run after the ladders and print into the same table. */
for (const { src, out, keep } of CROPS.files) {
  const input = await readFile(pub(src));
  const meta = await sharp(input).metadata();
  sourceBytes += input.length;

  const ratio = CROPS.size.width / CROPS.size.height;
  let width = Math.round(meta.width * keep);
  let height = Math.round(width / ratio);
  /* A source shorter than the window can only give a narrower one. */
  if (height > meta.height) {
    height = meta.height;
    width = Math.round(height * ratio);
  }

  const buffer = await sharp(input)
    .extract({ left: 0, top: Math.round((meta.height - height) / 2), width, height })
    .resize(CROPS.size.width, CROPS.size.height, { fit: "cover" })
    .webp({ quality: 72 })
    .toBuffer();

  await writeFile(pub(out), buffer);
  variantBytes += buffer.length;
  rows.push([out, `keep ${keep}`, `${kb(input.length)} -> ${kb(buffer.length)}`]);
}

for (const [name, width, size] of rows) {
  console.log(`  ${name.padEnd(44)} ${width.padEnd(9)} ${size}`);
}
console.log(
  `\n  ${rows.length} rows. Sources ${kb(sourceBytes)}, all variants together ${kb(variantBytes)}.`,
);
console.log("  A viewport downloads one rung per image, not the whole ladder.");
