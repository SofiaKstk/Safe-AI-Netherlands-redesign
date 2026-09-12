import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

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
 * The first answer was to spell the index out below md, every paper as its own
 * row. That read well and was far too long: twelve rows of bibliography is a
 * reference page's job, and this band only has to be evidence that the work
 * lands. So the phone gets the claim, the count, and one way through to the
 * Research Hub, which is where the full list already lives. The marquee is a
 * desktop pleasure and it stays on the desktop.
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

/* Ruled top and bottom so it reads as the index closing rather than a button
   dropped under a heading, and counted from the data so the number cannot
   drift away from the list it promises. */
function PublicationsLink() {
  return (
    <div className="shell md:hidden">
      <Link
        href="/research#publications"
        className="mt-8 flex items-center justify-between gap-5 border-y border-white/16 py-[18px]"
      >
        <span className="font-serif text-[17px] leading-[23px] text-white">
          All {publications.length} publications
        </span>
        <ArrowRight
          size={15}
          weight="light"
          aria-hidden="true"
          className="shrink-0 text-white/50"
        />
      </Link>
    </div>
  );
}

export default function PublicationMarquee() {
  return (
    <>
      <PublicationsLink />
      <div className="mt-10 hidden flex-col gap-3 overflow-hidden py-2 md:flex">
        <Row papers={ROW_ONE} direction="left" />
        <Row papers={ROW_TWO} direction="right" />
      </div>
    </>
  );
}
