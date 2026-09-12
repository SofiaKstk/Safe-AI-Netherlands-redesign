/* Plain <img>, not next/image: with `images.unoptimized` the wrapper emits no
   srcset, so the `sizes` below would have been inert. The rungs come from
   scripts/generate-responsive-images.mjs. */
const PHOTO_WIDTHS = [320, 640, 900];
const srcSet = (src: string) =>
  PHOTO_WIDTHS.map((w) => `${src.replace(/\.jpg$/, `-${w}.jpg`)} ${w}w`).join(", ");

/* Five columns inside a 1344 shell come to 256 CSS each; two columns below md
   come to roughly half the viewport less the gutters and gap. */
const SIZES =
  "(min-width: 1440px) 256px, (min-width: 768px) calc(20vw - 32px), calc(50vw - 42px)";

/** A loose row of prints: shared work, conversations, and time together. */
const PRINTS = [
  { src: "/landing/print-rooftop.jpg", alt: "A rooftop gathering after a SAIN session", position: "32% 62%", frame: "rotate-[-2.5deg] md:translate-y-4 md:rotate-[-5deg]", crop: "aspect-[4/3]" },
  { src: "/landing/print-lecture.jpg", alt: "A SAIN lecture filling a university auditorium", position: "58% 36%", frame: "rotate-[1.5deg] md:-translate-y-2 md:rotate-[3deg]", crop: "aspect-[4/5]" },
  { src: "/landing/print-hackathon.jpg", alt: "People working together at a table during a hackathon", position: "48% 80%", frame: "z-10 rotate-[-1deg] md:rotate-[-2deg] md:scale-110", crop: "aspect-[4/3]" },
  { src: "/landing/print-circle.jpg", alt: "An outdoor community gathering in a circle", position: "50% 48%", frame: "rotate-[2.5deg] md:translate-y-5 md:rotate-[5deg]", crop: "aspect-[4/3]" },
  { src: "/landing/print-indoor.jpg", alt: "A SAIN group session indoors", position: "64% 40%", frame: "col-span-2 mx-auto w-2/3 rotate-[-2deg] md:col-span-1 md:w-full md:-translate-y-2 md:rotate-[-4deg]", crop: "aspect-[4/3]" },
];

export default function CommunityPrints() {
  return (
    <div className="grid w-full grid-cols-2 items-center gap-5 px-2 py-6 md:grid-cols-5 md:gap-3 md:py-8">
      {PRINTS.map((print) => (
        <figure key={print.src} className={`community-print relative bg-white p-2 shadow-[0_7px_22px_#021C4D1F] ${print.frame}`}>
          <div className="overflow-hidden">
          <img
            src={print.src.replace(/\.jpg$/, "-320.jpg")}
            srcSet={srcSet(print.src)}
            sizes={SIZES}
            alt={print.alt}
            width={480}
            height={print.crop === "aspect-[4/5]" ? 600 : 360}
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
