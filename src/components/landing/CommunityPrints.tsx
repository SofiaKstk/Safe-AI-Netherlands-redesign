/* Plain <img>, not next/image: with `images.unoptimized` the wrapper emits no
   srcset, so the `sizes` below would have been inert. The rungs come from
   scripts/generate-responsive-images.mjs. */
const PHOTO_WIDTHS = [320, 640, 900];
const srcSet = (src: string) =>
  PHOTO_WIDTHS.map((w) => `${src.replace(/\.jpg$/, `-${w}.jpg`)} ${w}w`).join(", ");

/* The strip holds a print between roughly 280 and 390 CSS wide the whole way
   up, which is what keeps two or three of them in view at once. From xl it is
   a fifth of the shell, 256 on the 1440 canvas. */
const SIZES =
  "(min-width: 1440px) 256px, (min-width: 1280px) calc(20vw - 32px), (min-width: 1024px) 30vw, (min-width: 768px) 38vw, (min-width: 640px) 46vw, 72vw";

type Print = {
  src: string;
  alt: string;
  /** Where the crop sits in the frame. */
  position: string;
  /** Square on the strip; the scatter's own crop from xl up. */
  crop: string;
  /** Intrinsic height for the 480px width, matching the widest crop. */
  height: number;
  /** Tilt on the strip: half the scatter's, so the rhythm stays readable. */
  tilt: string;
  /** Where the print lands in the desktop scatter. */
  scatter: string;
};

/**
 * A loose row of prints: shared work, conversations, and time together.
 *
 * The photographs are the argument this band makes — that these are real rooms
 * with real people in them — so the whole question is how big they get to be.
 *
 * Five columns only reach their intended 256px on the 1440 canvas. At 768 they
 * are 122px each, smaller than a phone's, which made the scatter something you
 * squint at on every device between the two. So the scatter waits for xl, and
 * everything below it is a strip you push sideways: one print at a time on a
 * phone at 72vw, two or three on a tablet, each of them around 300px. The next
 * one showing past the edge is the affordance, which is why there are no dots.
 * The strip bleeds to both screen edges so it reads as something that
 * continues rather than a box that ended.
 *
 * The scatter is a composition and survives being small better than a single
 * print does, which is the trade at xl. On the strip the tilt is halved and
 * the tall crop squared off, so one horizon runs across the row.
 */
const PRINTS: Print[] = [
  {
    src: "/landing/print-rooftop.jpg",
    alt: "A rooftop gathering after a SAIN session",
    position: "32% 62%",
    crop: "aspect-[4/3]",
    height: 360,
    tilt: "rotate-[-1.5deg]",
    scatter: "xl:translate-y-4 xl:rotate-[-5deg]",
  },
  {
    src: "/landing/print-lecture.jpg",
    alt: "A SAIN lecture filling a university auditorium",
    position: "58% 36%",
    crop: "aspect-[4/3] xl:aspect-[4/5]",
    height: 600,
    tilt: "rotate-[1deg]",
    scatter: "xl:-translate-y-2 xl:rotate-[3deg]",
  },
  {
    src: "/landing/print-hackathon.jpg",
    alt: "People working together at a table during a hackathon",
    position: "48% 80%",
    crop: "aspect-[4/3]",
    height: 360,
    tilt: "rotate-[-1deg]",
    /* The overlap only exists in the scatter, so the lift does too. */
    scatter: "xl:z-10 xl:rotate-[-2deg] xl:scale-110",
  },
  {
    src: "/landing/print-circle.jpg",
    alt: "An outdoor community gathering in a circle",
    position: "50% 48%",
    crop: "aspect-[4/3]",
    height: 360,
    tilt: "rotate-[1.5deg]",
    scatter: "xl:translate-y-5 xl:rotate-[5deg]",
  },
  {
    src: "/landing/print-indoor.jpg",
    alt: "A SAIN group session indoors",
    position: "64% 40%",
    crop: "aspect-[4/3]",
    height: 360,
    tilt: "rotate-[-1deg]",
    scatter: "xl:-translate-y-2 xl:rotate-[-4deg]",
  },
];

export default function CommunityPrints() {
  return (
    <div
      /* A scroll container has to be reachable without a thumb, so it carries
         a name and a tab stop of its own. */
      role="region"
      aria-label="Photographs from SAIN events"
      tabIndex={0}
      /* The negative margin matches the shell's gutter at each size, so the
         strip reaches the screen edge while its first print still lines up
         with the copy above it. */
      className="scroll-strip -mx-6 flex snap-x snap-mandatory scroll-pl-6 items-center gap-4 overflow-x-auto px-6 pb-9 pt-4 md:-mx-12 md:scroll-pl-12 md:px-12 xl:mx-0 xl:grid xl:w-full xl:grid-cols-5 xl:gap-3 xl:overflow-visible xl:px-2 xl:py-8"
    >
      {PRINTS.map((print) => (
        <figure
          key={print.src}
          className={`community-print relative w-[72vw] shrink-0 snap-start bg-white p-2 shadow-[0_7px_22px_#021C4D1F] sm:w-[46vw] md:w-[38vw] lg:w-[30vw] xl:w-auto xl:shrink ${print.tilt} ${print.scatter}`}
        >
          <div className="overflow-hidden">
            <img
              src={print.src.replace(/\.jpg$/, "-320.jpg")}
              srcSet={srcSet(print.src)}
              sizes={SIZES}
              alt={print.alt}
              width={480}
              height={print.height}
              loading="lazy"
              decoding="async"
              className={`w-full object-cover ${print.crop}`}
              style={{ objectPosition: print.position }}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
