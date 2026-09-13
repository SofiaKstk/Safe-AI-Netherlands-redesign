/**
 * The path again, as a close. Same five stops as the funnel, but drawn on the
 * inverse ground as a zigzag trail against a single spine — the funnel argues
 * that the path narrows, the trail argues that it is walkable.
 */

const STOPS = [
  { label: "Start with a free course", photo: "/landing/funnel-01.jpg", objectPosition: "38% 34%" },
  {
    label: "Participate in SAIN's community",
    photo: "/landing/funnel-02.jpg",
    objectPosition: "72% 42%",
  },
  {
    label: "Contribute and collaborate on research or projects",
    photo: "/landing/funnel-03.jpg",
    objectPosition: "82% 30%",
  },
  {
    label: "Undertake a fellowship or internship in AI Safety",
    photo: "/landing/funnel-04.jpg",
    objectPosition: "42% 48%",
  },
  {
    label: "Work full-time in AI Safety",
    photo: "/landing/funnel-05.jpg",
    objectPosition: "50% 42%",
  },
];

/* Same photographs as the funnel, same rungs. See
   scripts/generate-responsive-images.mjs. */
const PHOTO_WIDTHS = [320, 640, 768, 1040];
const srcSet = (photo: string) =>
  PHOTO_WIDTHS.map((w) => `${photo.replace(/\.jpg$/, `-${w}.jpg`)} ${w}w`).join(", ");

export default function PathwayTrail() {
  return (
    <div className="relative w-full min-w-0 max-w-[520px] justify-self-end pt-2">
      <span
        /* Anchored to both ends rather than a fixed 424px, because the cards
           below are free to grow now. */
        className="absolute bottom-12 left-1/2 top-12 hidden w-px -translate-x-1/2 bg-white/20 md:block"
        aria-hidden="true"
      />
      <ol className="flex flex-col gap-1.5">
        {STOPS.map((stop, i) => {
          const last = i === STOPS.length - 1;
          const onLeft = i % 2 === 0;

          const card = (
            <div
              className={`relative flex min-h-[92px] items-center overflow-hidden rounded-[3px] border px-4 py-3.5 ${
                last ? "border-orange bg-orange" : "border-white/16 bg-white/8"
              }`}
            >
              <img
                src={stop.photo.replace(/\.jpg$/, "-320.jpg")}
                srcSet={srcSet(stop.photo)}
                /* Half of a 520px trail at md, the whole of it below. */
                sizes="(min-width: 768px) 250px, (min-width: 568px) 520px, calc(100vw - 48px)"
                alt=""
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 size-full object-cover mix-blend-luminosity ${
                  last ? "opacity-[0.14]" : "opacity-[0.22]"
                }`}
                style={{ objectPosition: stop.objectPosition }}
              />
              <p className="relative font-serif text-sm leading-[19px] text-white">{stop.label}</p>
            </div>
          );

          const dot = (
            <span className="mx-auto hidden size-5 items-center justify-center md:flex">
              <span
                className={`size-[9px] rounded-full ${last ? "bg-orange" : "bg-white"}`}
                aria-hidden="true"
              />
            </span>
          );

          return (
            <li key={stop.label} className="grid items-center gap-2 md:grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)]">
              {onLeft ? card : <span className="hidden md:block" />}
              {dot}
              {onLeft ? <span className="hidden md:block" /> : card}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
