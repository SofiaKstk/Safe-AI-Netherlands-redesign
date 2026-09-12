/* Plain <img>, not next/image: with `images.unoptimized` the wrapper emits no
   srcset, so the `sizes` below would have been inert. The rungs come from
   scripts/generate-responsive-images.mjs. */
const PHOTO_WIDTHS = [320, 640, 900];
const srcSet = (src: string) =>
  PHOTO_WIDTHS.map((w) => `${src.replace(/\.jpg$/, `-${w}.jpg`)} ${w}w`).join(", ");

/* A print is 72vw on the strip, and a fifth of a 1344 shell once it becomes
   the scatter. */
const SIZES =
  "(min-width: 1440px) 256px, (min-width: 768px) calc(20vw - 32px), 72vw";

type Print = {
  src: string;
  alt: string;
  /** Where the crop sits in the frame. */
  position: string;
  /** Square on the strip; the scatter's own crop from md up. */
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
 * Two columns of 150px thumbnails was the wrong shape for a phone. The
 * photographs are the argument this band makes — that these are real rooms
 * with real people in them — and at that size not one of them was legible.
 *
 * Below md they become a strip you push with a thumb: one print at a time at
 * 72vw, with the next one showing past the edge. That peek is the affordance,
 * which is why there are no dots under it. The strip bleeds to both screen
 * edges so it reads as something that continues rather than a box that ended.
 *
 * The scatter is a desktop composition and stays there. A carousel that also
 * tilted hard would fight its own rhythm, so on the strip the tilt is halved
 * and the tall crop is squared off to keep one horizon across the row.
 */
const PRINTS: Print[] = [
  {
    src: "/landing/print-rooftop.jpg",
    alt: "A rooftop gathering after a SAIN session",
    position: "32% 62%",
    crop: "aspect-[4/3]",
    height: 360,
    tilt: "rotate-[-1.5deg]",
    scatter: "md:translate-y-4 md:rotate-[-5deg]",
  },
  {
    src: "/landing/print-lecture.jpg",
    alt: "A SAIN lecture filling a university auditorium",
    position: "58% 36%",
    crop: "aspect-[4/3] md:aspect-[4/5]",
    height: 600,
    tilt: "rotate-[1deg]",
    scatter: "md:-translate-y-2 md:rotate-[3deg]",
  },
  {
    src: "/landing/print-hackathon.jpg",
    alt: "People working together at a table during a hackathon",
    position: "48% 80%",
    crop: "aspect-[4/3]",
    height: 360,
    tilt: "rotate-[-1deg]",
    /* The overlap only exists in the scatter, so the lift does too. */
    scatter: "md:z-10 md:rotate-[-2deg] md:scale-110",
  },
  {
    src: "/landing/print-circle.jpg",
    alt: "An outdoor community gathering in a circle",
    position: "50% 48%",
    crop: "aspect-[4/3]",
    height: 360,
    tilt: "rotate-[1.5deg]",
    scatter: "md:translate-y-5 md:rotate-[5deg]",
  },
  {
    src: "/landing/print-indoor.jpg",
    alt: "A SAIN group session indoors",
    position: "64% 40%",
    crop: "aspect-[4/3]",
    height: 360,
    tilt: "rotate-[-1deg]",
    scatter: "md:-translate-y-2 md:rotate-[-4deg]",
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
      className="scroll-strip -mx-6 flex snap-x snap-mandatory scroll-pl-6 items-center gap-4 overflow-x-auto px-6 pb-9 pt-4 md:mx-0 md:grid md:w-full md:grid-cols-5 md:gap-3 md:overflow-visible md:px-2 md:py-8"
    >
      {PRINTS.map((print) => (
        <figure
          key={print.src}
          className={`community-print relative w-[72vw] shrink-0 snap-start bg-white p-2 shadow-[0_7px_22px_#021C4D1F] md:w-auto md:shrink ${print.tilt} ${print.scatter}`}
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
