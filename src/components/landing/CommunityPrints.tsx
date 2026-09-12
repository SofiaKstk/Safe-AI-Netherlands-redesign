/**
 * A table of photographs, not a gallery component. Each print gets a white 8px
 * mat, a small rotation, and a navy-tinted shadow, so the section reads as
 * evidence someone laid out by hand. The centre print sits slightly proud.
 */

type Print = {
  src: string;
  alt: string;
  objectPosition: string;
  /** Positioning is deliberately hand-placed; there is no grid here. */
  frame: string;
  image: string;
};

const PRINTS: Print[] = [
  {
    src: "/landing/print-lecture.jpg",
    alt: "A SAIN lecture filling a university auditorium",
    objectPosition: "58% 36%",
    frame: "left-[18px] top-8 w-[140px] rotate-[-11deg] sm:w-[188px] lg:top-16",
    image: "h-[176px] sm:h-[236px]",
  },
  {
    src: "/landing/print-indoor.jpg",
    alt: "A group session indoors",
    objectPosition: "64% 40%",
    frame: "right-2 top-4 w-[170px] rotate-[8deg] sm:left-[318px] sm:right-auto sm:w-[248px] lg:top-[42px]",
    image: "h-[110px] sm:h-[160px]",
  },
  {
    src: "/landing/print-rooftop.jpg",
    alt: "A rooftop gathering after a session",
    objectPosition: "32% 62%",
    frame: "bottom-8 left-4 w-[180px] rotate-[-7deg] sm:w-[268px] lg:bottom-auto lg:left-9 lg:top-72",
    image: "h-[116px] sm:h-[172px]",
  },
  {
    src: "/landing/print-circle.jpg",
    alt: "An outdoor gathering in a circle",
    objectPosition: "50% 48%",
    frame: "bottom-6 right-0 w-[150px] rotate-[6deg] sm:left-[338px] sm:right-auto sm:w-[228px] lg:bottom-auto lg:top-[292px]",
    image: "h-[96px] sm:h-[144px]",
  },
];

export default function CommunityPrints() {
  return (
    <div className="relative h-[420px] w-full max-w-[640px] lg:h-[540px] lg:w-[640px] lg:shrink-0">
      {PRINTS.map((print) => (
        <figure
          key={print.src}
          className={`absolute bg-white p-2 shadow-[0_12px_28px_#021C4D29] ${print.frame}`}
        >
          <img
            src={print.src}
            alt={print.alt}
            loading="lazy"
            className={`w-full object-cover ${print.image}`}
            style={{ objectPosition: print.objectPosition }}
          />
        </figure>
      ))}

      <figure className="absolute left-[22%] top-[28%] z-10 w-[210px] rotate-[-2.5deg] bg-white p-2 shadow-[0_14px_32px_#021C4D33] sm:left-[168px] sm:w-[312px] lg:top-[150px]">
        <img
          src="/landing/print-hackathon.jpg"
          alt="People working together at a table during a hackathon"
          className="h-[142px] w-full object-cover sm:h-[212px]"
          style={{ objectPosition: "48% 80%" }}
        />
      </figure>
    </div>
  );
}
