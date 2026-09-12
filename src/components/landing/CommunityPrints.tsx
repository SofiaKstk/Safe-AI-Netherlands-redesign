import Image from "next/image";

/** A loose row of prints: shared work, conversations, and time together. */
const PRINTS = [
  { src: "/landing/print-rooftop.jpg", alt: "A rooftop gathering after a SAIN session", position: "32% 62%", frame: "rotate-[-5deg] md:translate-y-4", crop: "aspect-[4/3]" },
  { src: "/landing/print-lecture.jpg", alt: "A SAIN lecture filling a university auditorium", position: "58% 36%", frame: "rotate-[3deg] md:-translate-y-2", crop: "aspect-[4/5]" },
  { src: "/landing/print-hackathon.jpg", alt: "People working together at a table during a hackathon", position: "48% 80%", frame: "z-10 rotate-[-2deg] md:scale-110", crop: "aspect-[4/3]" },
  { src: "/landing/print-circle.jpg", alt: "An outdoor community gathering in a circle", position: "50% 48%", frame: "rotate-[5deg] md:translate-y-5", crop: "aspect-[4/3]" },
  { src: "/landing/print-indoor.jpg", alt: "A SAIN group session indoors", position: "64% 40%", frame: "col-span-2 mx-auto w-2/3 rotate-[-4deg] md:col-span-1 md:w-full md:-translate-y-2", crop: "aspect-[4/3]" },
];

export default function CommunityPrints() {
  return (
    <div className="grid w-full grid-cols-2 items-center gap-5 px-2 py-6 md:grid-cols-5 md:gap-3 md:py-8">
      {PRINTS.map((print) => (
        <figure key={print.src} className={`community-print relative bg-white p-2 shadow-[0_7px_22px_#021C4D1F] ${print.frame}`}>
          <div className="overflow-hidden">
          <Image
            src={print.src}
            alt={print.alt}
            width={480}
            height={360}
            sizes="(min-width: 768px) 20vw, 45vw"
            className={`w-full object-cover ${print.crop}`}
            style={{ objectPosition: print.position }}
          />
          </div>
        </figure>
      ))}
    </div>
  );
}
