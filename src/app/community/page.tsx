import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Reveal from "@/components/landing/Reveal";
import SectionOrbits from "@/components/landing/SectionOrbits";
import CalendarTabs from "@/components/community/CalendarTabs";
import EventPrints from "@/components/community/EventPrints";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import {
  COURSE_APPLICATION_URL,
  courseApplicationFor,
  type ChapterName,
} from "@/data/courseApplications";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Community",
  description:
    "SAIN runs local chapters in Utrecht, Groningen and Amsterdam: weekly discussion groups, free courses, hackathons and talks. See what is on and where to walk in.",
};

/* The three chapters, as an index. Two factual lines apiece, because a reader
   choosing a city is choosing between characters, not between names. No member
   counts for Groningen or Amsterdam: only Utrecht has a verified figure, and an
   invented one next to a real one makes both look invented. */
const chapters: {
  city: string;
  href: string;
  photo: string;
  lines: [string, string];
}[] = [
  {
    city: "Utrecht",
    href: "/chapters/utrecht",
    photo: "/photos/cities/utrecht-index.webp",
    lines: [
      "A multidisciplinary community of 240+ members at Utrecht University and beyond.",
      "Runs AI Safety Fundamentals and the first ARENA-based technical track in SAIN.",
    ],
  },
  {
    city: "Groningen",
    href: "/chapters/groningen",
    photo: "/photos/cities/groningen-index.webp",
    lines: [
      "Active since 2023, first as AISIG, the AI Safety Initiative Groningen. One of the most active AI safety communities in Europe.",
      "Members have published at venues including NeurIPS and ICLR.",
    ],
  },
  {
    city: "Amsterdam",
    href: "/chapters/amsterdam",
    photo: "/photos/cities/amsterdam-index.webp",
    lines: [
      "A diverse community across UvA, VU Amsterdam and the city's tech ecosystem, from BSc students to working professionals.",
      "Supported by the ELLIS Unit Amsterdam.",
    ],
  },
];

/* The course each chapter is currently taking applications for. The dates and
   the open/closed state come from courseApplications.ts, so a cohort can never
   be advertised as open here and closed on the chapter page; only the course's
   name lives here, because that file does not carry it. */
const COURSE_NAMES: Record<ChapterName, string> = {
  Groningen: "AI Safety, Ethics, and Society",
  Utrecht: "AI Safety Fundamentals",
  Amsterdam: "Technical AI Safety & Frontier AI Governance",
};

/* Soonest deadline first, then the chapter whose applications are closed. */
const DEADLINE_ORDER: ChapterName[] = ["Groningen", "Utrecht", "Amsterdam"];

const chapterProvides = [
  "The SAIN brand and national recognition",
  "Operational playbooks and handbooks",
  "Course curriculum and facilitation guides",
  "Google Workspace and digital infrastructure",
  "One-on-one mentorship from experienced organisers",
  "Outreach templates and media support",
  "Connection to the national network",
];

const founderSteps = [
  "Write to us about your city.",
  "Work through the founding process with SAIN's board.",
  "Set up your local channels and your chapter page on this site.",
  "Do the first outreach and run the first meetup.",
  "When you are ready, run a first course; the curriculum and guides are part of the kit.",
];

function Arrow() {
  return <ArrowRight size={16} weight="regular" aria-hidden="true" />;
}

/* The only dated thing the site itself owns. Everything else upcoming lives
   inside a Luma calendar, so these get the hairline rows above the embeds. */
function DeadlineRow({ chapter }: { chapter: ChapterName }) {
  const entry = courseApplicationFor(chapter);
  return (
    <li className="grid gap-3 border-t border-navy/10 py-5 md:grid-cols-[minmax(0,150px)_minmax(0,1fr)_auto] md:items-center md:gap-8">
      {/* A row in a table of dates, not a section of the page, so the city is
          set in the heading face without claiming a heading level. */}
      <p className="font-serif text-title-sm text-navy">{chapter}</p>
      <div className="min-w-0">
        <p className="font-sans text-ui text-navy">{COURSE_NAMES[chapter]}</p>
        {entry.open ? (
          <p className="mt-1 font-sans text-caption text-navy/65">
            <span>Participants by {entry.deadlines.participants}</span>
            {/* Drawn, not typed into the sentence, so a screen reader reads two
                deadlines and not a middot between them. */}
            <span aria-hidden="true" className="px-2 text-navy/25">
              ·
            </span>
            <span>Facilitators by {entry.deadlines.facilitators}</span>
          </p>
        ) : (
          <p className="mt-1 font-sans text-caption text-navy/65">
            {entry.closedNote}
          </p>
        )}
      </div>
      {entry.open ? (
        <a
          href={COURSE_APPLICATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent justify-self-start md:justify-self-end"
        >
          Sign up
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <Link
          href={entry.href}
          className="inline-flex items-center gap-1.5 justify-self-start font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy md:justify-self-end"
        >
          View chapter
          <Arrow />
        </Link>
      )}
    </li>
  );
}

export default function CommunityPage() {
  return (
    <>
      {/* Hero. The claim on the left, two photographs on the right. This page
          is argued by rooms rather than by geometry, so there is no diagram
          here: the evidence is that the rooms exist and have people in them. */}
      <section
        aria-labelledby="community-hero-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, white 0%, white 95%, #f7f5f2 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute -left-8 -top-20 h-[400px] w-[200px] opacity-[0.07] md:-left-4 md:-top-12 md:h-[440px] md:w-[260px] md:opacity-[0.12]"
            style={{
              backgroundImage: "url('/illustrations/hero-orbits.svg')",
              backgroundSize: "260px 440px",
              backgroundRepeat: "no-repeat",
              maskImage: "linear-gradient(to right, black 15%, transparent 100%)",
            }}
          />
        </div>

        <div className="shell band-hero grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] xl:grid-cols-[minmax(0,640px)_minmax(0,1fr)] xl:gap-16">
          <Reveal hero className="flex min-w-0 flex-col gap-6">
            <h1
              id="community-hero-heading"
              className="font-serif text-display text-navy"
            >
              The community meets every week.
            </h1>
            <p className="max-w-[620px] font-sans text-body text-navy/72">
              SAIN runs three local chapters, in Utrecht, Groningen and Amsterdam.
              Discussion groups, free courses, hackathons, talks, and the evenings
              after. This page shows what is on and where to walk in.
            </p>
            <div className="pt-1">
              {/* The same words and the same destination as the landing hero,
                  on purpose: one label per door, so a reader who has seen it
                  once does not read this as a second commitment. */}
              <a
                href={COMMUNITY_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Join the community
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </Reveal>

          {/* Two prints, overlapped. The hero's job is to look like somewhere
              people already are; the naming is the next band's work, so these
              carry no caption bars to compete with the claim. */}
          <Reveal
            hero
            delay={0.08}
            className="flex min-w-0 items-center justify-center lg:justify-end"
          >
            <div className="flex items-end gap-4 sm:gap-6">
              <figure className="w-[46%] shrink-0 rotate-[-3deg] bg-white p-2 shadow-[0_7px_22px_#021C4D1F] sm:w-[210px]">
                <img
                  src="/photos/events/forecasting-hackathon.png"
                  alt="People working in pairs through a SAIN forecasting hackathon"
                  width={420}
                  height={525}
                  className="aspect-[4/5] w-full object-cover"
                  style={{ objectPosition: "50% 45%" }}
                />
              </figure>
              <figure className="w-[54%] shrink-0 translate-y-4 rotate-[2.5deg] bg-white p-2 shadow-[0_7px_22px_#021C4D1F] sm:w-[270px]">
                <img
                  src="/photos/events/utrecht/win4AISafety_congrats_the_winners.jpg"
                  alt="The winners of Win4AISafety with the SAIN Utrecht organisers"
                  width={540}
                  height={405}
                  className="aspect-[4/3] w-full object-cover"
                  style={{ objectPosition: "50% 40%" }}
                />
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      {/* A normal month. The photographs are the argument; the paragraphs name
          what is in them. Hairline over the band, as on the landing's community
          band, because this is a continuation of the same white canvas. */}
      <section
        id="a-normal-month"
        aria-labelledby="normal-month-heading"
        className="scroll-mt-36 bg-white"
      >
        <div className="shell">
          <div className="border-t border-navy/14" />
        </div>
        <div className="shell band-community flex flex-col gap-12 md:gap-16">
          <Reveal>
            <EventPrints />
          </Reveal>

          <Reveal
            delay={0.05}
            className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,680px)] xl:gap-16"
          >
            <h2
              id="normal-month-heading"
              className="max-w-[420px] font-serif text-heading-sm text-navy"
            >
              Most weeks there is a room to sit in.
            </h2>
            <div className="flex max-w-[680px] flex-col gap-5">
              <p className="font-sans text-body text-navy/74">
                Every chapter runs a weekly discussion group: about two hours, a
                reading and a conversation, with at least one experienced mentor at
                the table. That is the baseline. You can come once, say little, and
                decide afterwards.
              </p>
              <p className="font-sans text-body text-navy/74">
                Around the weekly rhythm sit the bigger moments. This spring
                Groningen ran an AI control hackathon over a March weekend, hosted
                talks by Fatih Turkmen and Tekla Emborg, and took the stage at
                TEDxBroerstraat. Utrecht closed its technical course with a dinner in
                June and announced the winners of Win4AISafety, its open research
                summer challenge. Amsterdam&rsquo;s discussion group kept meeting
                through the summer, from eval methods to the AI Safety Index.
              </p>
              <p className="font-sans text-body text-navy/74">
                And then the evenings after: pub quizzes, intro socials at the start
                of the year, and graduation ceremonies when a course cohort finishes.
                Groningen keeps{" "}
                <Link
                  href="/chapters/groningen/events"
                  className="inline-flex items-baseline gap-1 text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                >
                  a full archive
                  <ArrowRight
                    size={16}
                    weight="regular"
                    aria-hidden="true"
                    className="translate-y-[2px]"
                  />
                </Link>{" "}
                of everything back to 2023.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Local communities. A thin index band: cities as peers, left hairline,
          no cards. The kicker is the band's heading, as on the landing. */}
      <section
        id="chapters"
        aria-labelledby="chapters-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-cream"
      >
        <div className="shell band-index flex flex-col gap-8 lg:flex-row lg:items-start">
          <h2
            id="chapters-heading"
            className="kicker pt-0.5 text-kicker text-navy/65 lg:w-[240px] lg:shrink-0"
          >
            Local communities
          </h2>
          <div className="grid flex-1 gap-6 sm:grid-cols-3">
            {chapters.map((chapter) => (
              <article
                key={chapter.city}
                className="chapter-cell group relative isolate border-l border-navy/14 py-5 pl-[18px] pr-4"
              >
                {/* The photograph each chapter page opens with, faint, masked to
                    fade in from the left so the writing sits on clean cream at
                    rest and on flat navy once the scrim is up. */}
                <span
                  className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
                  aria-hidden="true"
                >
                  <Image
                    src={chapter.photo}
                    alt=""
                    width={720}
                    height={280}
                    loading="lazy"
                    className="chapter-cell-photo h-full w-full object-cover"
                  />
                  <span className="chapter-cell-scrim absolute inset-0 bg-navy" />
                </span>
                <h3 className="font-serif text-title text-navy">{chapter.city}</h3>
                {/* globals.css flips the heading and the link to cream under the
                    scrim; these two lines are this page's addition to the cell,
                    so they carry the same flip as utilities. */}
                <div className="mt-2.5 flex flex-col gap-2">
                  {chapter.lines.map((line) => (
                    <p
                      key={line}
                      className="font-sans text-caption text-navy/72 transition-colors duration-300 group-hover:text-cream group-focus-within:text-cream"
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <Link
                  href={chapter.href}
                  className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm leading-5 text-navy underline decoration-navy/20 underline-offset-4 after:absolute after:inset-0 hover:decoration-navy focus-visible:decoration-navy"
                >
                  View chapter
                  <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The calendar. Deadlines the site owns, then the three live calendars it
          does not. */}
      <section
        id="calendar"
        aria-labelledby="calendar-heading"
        className="relative isolate scroll-mt-36 overflow-hidden border-t border-navy/10 bg-white"
      >
        <SectionOrbits className="-left-20 top-10 h-[400px] w-[300px] md:-left-12" />
        <div className="shell band-section relative isolate">
          <div className="flex max-w-[680px] flex-col gap-4">
            <p className="kicker text-kicker text-navy/65">This month</p>
            <h2 id="calendar-heading" className="font-serif text-heading text-navy">
              Pick a city, pick a date.
            </h2>
            <p className="font-sans text-body text-navy/74">
              Each chapter keeps its calendar on Luma, and the embeds below are
              live. Events are walk-in unless the event page says otherwise. Course
              applications are the one thing with a deadline.
            </p>
          </div>

          <Reveal delay={0.05} className="mt-10">
            <h3 className="sr-only">Course application deadlines</h3>
            <ul className="flex flex-col border-b border-navy/10">
              {DEADLINE_ORDER.map((chapter) => (
                <DeadlineRow key={chapter} chapter={chapter} />
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05} className="mt-12">
            <h3 className="sr-only">Chapter calendars</h3>
            <CalendarTabs />
          </Reveal>

          <p className="mt-6 font-sans text-caption text-navy/65">
            Questions about an event? Every chapter lists its events contact on its
            own page.
          </p>
        </div>
      </section>

      {/* Founding a chapter. A programme sheet on paper: what SAIN hands over on
          the left, what the founder does on the right. */}
      <section
        id="start-chapter"
        aria-labelledby="start-chapter-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-cream"
      >
        <div className="shell band-section">
          <div className="flex max-w-[720px] flex-col gap-4">
            <h2
              id="start-chapter-heading"
              className="font-serif text-heading-sm text-navy"
            >
              Founding a chapter.
            </h2>
            <p className="font-sans text-body text-navy/74">
              No chapter in your city yet? The three that exist all started the same
              way: a few people who wanted a local AI safety community and were
              willing to host the first meetup. SAIN&rsquo;s board guides founders
              through the whole process, and no separate legal entity is needed; new
              chapters operate under the national stichting.
            </p>
          </div>

          <Reveal
            delay={0.05}
            className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div>
              <h3 className="kicker pb-2 text-kicker-sm text-navy/65">
                What SAIN provides
              </h3>
              <ul className="font-sans text-ui text-navy">
                {chapterProvides.map((item) => (
                  <li key={item} className="border-t border-navy/10 py-[9px]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="kicker pb-2 text-kicker-sm text-navy/65">
                What a founder does
              </h3>
              <ol className="font-sans text-ui text-navy">
                {founderSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-baseline gap-3 border-t border-navy/10 py-[9px]"
                  >
                    <span className="w-[22px] shrink-0 font-sans text-xs text-orange-ink">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <div className="mt-10 flex flex-col items-start gap-3">
            <a
              href="mailto:info@safeainetherlands.org?subject=Starting a SAIN chapter"
              className="btn-outline-ink"
            >
              Propose a chapter
            </a>
            <p className="font-sans text-footnote text-navy/65">
              There is no form for this yet; a plain email with your city and a few
              lines about you is exactly right.
            </p>
          </div>
        </div>
      </section>

      {/* The close. Inverse, because this band asks for a decision: the claim on
          the left, the two ways to act on the right. Same labels as the
          landing's close, so both asks read as the same doors. */}
      <section
        id="join"
        aria-labelledby="community-close-heading"
        className="scroll-mt-36 bg-navy"
      >
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2
              id="community-close-heading"
              className="max-w-[620px] font-serif text-closing text-white"
            >
              Nobody in these photographs knew anyone the first time either.
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              Come to one session in the city nearest you. If you want to do more
              than attend, every chapter has volunteer work waiting.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <a
              href={COMMUNITY_JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent"
            >
              Join the community
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/get-involved" className="btn-ghost-inverse">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
