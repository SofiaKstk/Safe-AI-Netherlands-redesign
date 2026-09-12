import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { publications, type Publication } from "@/data/research";

/**
 * Two rows of venue-and-title chips drifting in opposite directions on the
 * paper ground. The rest state is the static Paper landing: hovering pauses
 * the row, and prefers-reduced-motion stops both outright.
 *
 * None of that survives a phone. The chips were sized to be caught in passing
 * across a wide screen; at 327px they are small, they are moving, and the one
 * control that stops them is a hover a thumb cannot perform. A drifting target
 * is the worst possible way to offer a link.
 *
 * So below md the same papers stop being a ticker and become what they
 * actually are: an index. Every one of them, in the order the data ranks them,
 * at a size you can read and on a row you can hit. The marquee is a desktop
 * pleasure and it stays on the desktop.
 */

const ROW_ONE = publications.slice(0, 8);
/* The second row is short on its own, so it borrows the opening four papers to
   stay wider than the viewport — otherwise the loop shows a gap. */
const ROW_TWO = [...publications.slice(8), ...publications.slice(0, 4)];

function Chip({ paper }: { paper: Publication }) {
  return (
    <a
      className="pub-chip"
      href={paper.link}
      target="_blank"
      rel="noopener noreferrer"
      title={`${paper.title} — ${paper.authors}`}
    >
      <span className="whitespace-nowrap font-sans text-[13px] font-medium leading-[18px] text-navy">
        {paper.venueShort}
      </span>
      <span className="block h-3.5 w-px bg-navy/20" aria-hidden="true" />
      <span className="whitespace-nowrap font-serif text-[15px] leading-5 text-navy/80">
        {paper.chipTitle}
      </span>
    </a>
  );
}

/* The list is rendered twice so the -50% translate loops without a seam. */
function Row({ papers, direction }: { papers: Publication[]; direction: "left" | "right" }) {
  return (
    <div
      className={`marquee-track flex w-max items-center gap-3 ${
        direction === "left" ? "marquee-left pl-12 pr-3" : "marquee-right pr-12"
      }`}
    >
      {[...papers, ...papers].map((paper, i) => (
        <Chip key={`${paper.link}-${i}`} paper={paper} />
      ))}
    </div>
  );
}

/* One row per paper, hairline-ruled, the whole row a link. The venue leads
   because it is what the reader is weighing; the arrow sits at the right so
   every row ends on the same mark and the destination is named without a
   second line of copy. */
function PublicationIndex() {
  return (
    <div className="shell md:hidden">
      <ol className="mt-9">
        {publications.map((paper) => (
          <li key={paper.link}>
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-5 border-t border-white/16 py-[15px]"
            >
              <span className="flex min-w-0 flex-col gap-1">
                <span className="font-sans text-[12.5px] leading-4 text-white/55">
                  {paper.venueShort}
                </span>
                <span className="font-serif text-[17px] leading-[23px] text-white">
                  {paper.chipTitle}
                </span>
              </span>
              <ArrowUpRight
                size={14}
                weight="light"
                aria-hidden="true"
                className="mt-1 shrink-0 text-white/40"
              />
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function PublicationMarquee() {
  return (
    <>
      <PublicationIndex />
      <div className="mt-10 hidden flex-col gap-3 overflow-hidden py-2 md:flex">
        <Row papers={ROW_ONE} direction="left" />
        <Row papers={ROW_TWO} direction="right" />
      </div>
    </>
  );
}
