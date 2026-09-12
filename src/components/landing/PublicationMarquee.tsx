import { publications, type Publication } from "@/data/research";

/**
 * Two rows of venue-and-title chips drifting in opposite directions on the
 * inverse ground. The rest state is the static Paper landing: hovering pauses
 * the row, and prefers-reduced-motion stops both outright.
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
      <span className="whitespace-nowrap font-sans text-[13px] font-medium leading-[18px] text-orange">
        {paper.venueShort}
      </span>
      <span className="block h-3.5 w-px bg-white/20" aria-hidden="true" />
      <span className="whitespace-nowrap font-serif text-[15px] leading-5 text-white">
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

export default function PublicationMarquee() {
  return (
    <div className="mt-10 flex flex-col gap-3 overflow-hidden py-2">
      <Row papers={ROW_ONE} direction="left" />
      <Row papers={ROW_TWO} direction="right" />
    </div>
  );
}
