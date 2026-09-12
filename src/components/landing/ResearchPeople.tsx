import Image from "next/image";
import { supervisors } from "@/data/research";

/* Each supervisor is a link to their research agenda. Since the standalone
   "Research agenda" link is gone, the hover state is now the only visible sign
   that the card does anything, so it carries three cues at once: the portrait
   lifts toward the reader, its ring brightens, and a rule draws under the name
   from the left. The rule matters beyond decoration. design.md requires colour
   to be paired with a non-colour cue, so the name turning orange cannot be the
   whole signal.

   Tailwind v4 already gates `hover:` behind `@media (hover: hover)`, so none of
   this fires from a tap on a touch screen. The two transforms sit behind
   `motion-safe:`; the colour changes survive reduced motion because they carry
   the affordance and do not move anything. */
export default function ResearchPeople() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
      {supervisors.map((person) => (
        <a
          key={person.name}
          href={person.agenda}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center text-center last:col-span-2 sm:last:col-span-1"
        >
          <span className="block size-[110px] overflow-hidden rounded-full border border-white/25 transition-[scale,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-white/60 motion-safe:group-hover:scale-[1.04] md:size-[130px]">
            <Image
              src={person.imageSmall}
              alt=""
              width={312}
              height={312}
              sizes="130px"
              className="size-full object-cover"
            />
          </span>

          <h4 className="mt-4 font-serif text-[18px] leading-6 text-white">
            {/* inline-block so the rule below hugs the name rather than the
                full width of the grid column. */}
            <span className="relative inline-block transition-colors duration-200 group-hover:text-orange">
              {person.name}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-orange transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
            </span>
          </h4>

          <p className="mt-2 max-w-[200px] text-[13px] leading-5 text-white/70">
            {person.positionShort}
          </p>
          {/* The whole supervisor is the link now, so the destination has to be
              named for anyone who cannot see the hover state. */}
          <span className="sr-only">Research agenda (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}
