import type { Metadata } from "next";
import Link from "next/link";

import ChapterClose from "@/components/chapters/ChapterClose";
import ChapterHero from "@/components/chapters/ChapterHero";
import CourseBand from "@/components/chapters/CourseBand";
import EvidenceBand from "@/components/chapters/EvidenceBand";
import PastEvents, {
  pastEventsThisYear,
  type RawPastEvent,
} from "@/components/chapters/PastEvents";
import ShowUpBand from "@/components/chapters/ShowUpBand";
import TeamBand, { type TeamMember } from "@/components/chapters/TeamBand";
import lumaPastEventsAmsterdam from "@/data/lumaPastEventsAmsterdam.json";
import { sainAmsTeam } from "@/data/sainAmsTeam";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Amsterdam chapter",
  description:
    "Free courses and a weekly discussion group across UvA, VU Amsterdam, and the city's tech scene, supported by ELLIS Unit Amsterdam.",
};

const LUMA_CALENDAR_ID = "cal-WD5xl5IYLpY7xNm";
const LUMA_PUBLIC_URL = "https://luma.com/user/SAIN_Amsterdam";

const EVENTS_EMAIL = "eventsams@safeainetherlands.org";
const EDU_EMAIL = "eduams@safeainetherlands.org";
const INFO_EMAIL = "infoams@safeainetherlands.org";
const LINKTREE_URL = "https://linktr.ee/sainamsterdam";
const ELLIS_URL = "https://ivi.fnwi.uva.nl/ellis/";

const team: readonly TeamMember[] = sainAmsTeam;

const pastEvents = pastEventsThisYear(
  lumaPastEventsAmsterdam as RawPastEvent[],
);

export default function AmsterdamPage() {
  return (
    <>
      <ChapterHero
        city="Amsterdam"
        subheading="Free courses and a weekly discussion group across UvA, VU Amsterdam, and the city's tech scene, supported by ELLIS Unit Amsterdam."
        photo="/photos/cities/amsterdam-hero.jpg"
        photoAlt="Canal houses leaning over the water in central Amsterdam"
        caption="Amsterdam, where the courses run on site"
        belowCta={
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1 font-sans text-footnote text-navy/65">
            Supported by
            <a
              href={ELLIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <img
                src="/logos/ellis.svg"
                alt="ELLIS Unit Amsterdam"
                width={98}
                height={28}
                className="h-7 w-auto"
              />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        }
      />

      <ShowUpBand
        city="Amsterdam"
        calendarId={LUMA_CALENDAR_ID}
        calendarUrl={LUMA_PUBLIC_URL}
        eventsEmail={EVENTS_EMAIL}
      />

      <CourseBand
        city="Amsterdam"
        heading="Two free courses return in October"
        footnote={
          <>
            The courses are independently run by SAIN Amsterdam and are not
            affiliated with UvA or VU. Questions:{" "}
            <a
              href={`mailto:${EDU_EMAIL}`}
              className="underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {EDU_EMAIL}
            </a>
            .
          </>
        }
        tail={
          <>
            <p className="font-sans text-body text-navy/74">
              A weekly discussion group on technical AI safety reads and
              discusses current research; about two hours a session, guided by
              experienced mentors.
            </p>
            <p className="font-sans text-body text-navy/74">
              Members also run research projects, currently including work on
              failure modes of multi-agent debate.
            </p>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 self-start font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              Visit the Research hub
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </>
        }
      >
        <p className="max-w-[var(--container-copy)] font-sans text-body text-navy/74">
          We run two courses built on BlueDot&rsquo;s curriculum: Technical AI
          Safety and Frontier AI Governance, both on site in Amsterdam. Six
          weeks, about two hours of reading and two hours of discussion a week,
          with a certificate on completion; selection is application-based. The
          last iteration reached more than 70 people: students, PhDs, engineers,
          policymakers, and consultants. Facilitators include PhDs,
          risk-management consultants, and an ELLIS assistant professor.
        </p>
      </CourseBand>

      <TeamBand
        city="Amsterdam"
        body="SAIN Amsterdam is co-directed by Ana Paula Castillo Rodriguez and Andreea Chivu, with a team covering research, education, events, and PR. Formerly AI Safety Amsterdam (AISA), the chapter draws people from BSc students to professionals at companies like Deloitte and Shell, and from independent researchers to ELLIS assistant professors."
        team={team}
      />

      {/* No prints: there are no Amsterdam event photographs in the repo, and
          a city skyline standing in for a room would be the one thing this
          band exists to rule out. The rows carry it until photographs arrive. */}
      <EvidenceBand
        heading="This already happened in Amsterdam"
        body="The chapter has delivered courses to more than 70 participants, run a season of weekly discussion groups, and presented at the AI020 Conference and TEDxUniversiteit van Amsterdam."
      >
        <PastEvents events={pastEvents} />
      </EvidenceBand>

      <ChapterClose
        city="Amsterdam"
        eventsEmail={EVENTS_EMAIL}
        eduEmail={EDU_EMAIL}
        infoEmail={INFO_EMAIL}
        linktreeUrl={LINKTREE_URL}
      />
    </>
  );
}
