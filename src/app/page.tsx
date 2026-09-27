import type { Metadata } from "next";
import Link from "next/link";

import CourseLab from "@/components/landing/course-concepts/CourseLab";
import FoldPin from "@/components/landing/FoldPin";
import MissionStatement from "@/components/landing/MissionStatement";
import Reveal from "@/components/landing/Reveal";
import ResearchSteps from "@/components/landing/ResearchSteps";
import ResearchIllustration from "@/components/landing/ResearchIllustration";
import ResearchOffer from "@/components/landing/ResearchOffer";
import HeroChart from "@/components/landing/HeroChart";
import SectionOrbits from "@/components/landing/SectionOrbits";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import { ATLAS } from "@/data/chapterAtlas";
import {
  formatCityList,
  openCourseApplications,
} from "@/data/courseApplications";
import { ArrowRight, ArrowUpRight, GraduationCap } from "@phosphor-icons/react/dist/ssr";

/* No `title` here on purpose: the landing falls through to the root layout's
   `title.default`, so the tab reads "Safe AI Netherlands" and nothing more.
   The claim still reaches search and link previews via the description. */
export const metadata: Metadata = {
  description:
    "SAIN provides the community, courses and resources to help students and professionals join the AI Safety field in the Netherlands. Every programme is free.",
};


/* The four kinds of work SAIN opens doors into, named once under the claim
   they belong to. They were four cells with an icon apiece, which gave a
   passing mention the footprint of a section. */
const careerTracks = [
  "Technical research",
  "Governance and policy",
  "Field building",
  "Security and compute",
];


function Arrow() {
  return (
    <ArrowRight size={16} weight="regular" aria-hidden="true" />
  );
}

export default function Home() {
  return (
    <>
      {/* Hero. The claim on the left, the evidence on the right. The white
          ground fades into paper in the last 5% — a seam, not a sky. */}
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, white 0%, white 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -left-8 -top-20 h-[400px] w-[200px] opacity-[0.07] md:-left-4 md:-top-12 md:h-[440px] md:w-[260px] md:opacity-[0.12]"
            style={{
              backgroundImage: "url('/illustrations/hero-orbits.svg')",
              backgroundSize: "260px 440px",
              backgroundRepeat: "no-repeat",
              maskImage: "linear-gradient(to right, black 15%, transparent 100%)",
            }}
          />
          <svg
            className="absolute -bottom-10 -right-10 h-[190px] w-[190px] -scale-x-100 text-navy opacity-[0.06] md:h-[230px] md:w-[230px] md:opacity-[0.09]"
            viewBox="0 0 230 230" fill="none"
          >
            <g stroke="currentColor" strokeWidth="1">
              <circle cx="0" cy="230" r="85" />
              <circle cx="0" cy="230" r="119" />
              <circle cx="0" cy="230" r="153" />
            </g>
            <path d="M167 80 Q168 87 174 88 Q168 89 167 96 Q166 89 160 88 Q166 87 167 80Z" fill="currentColor" />
          </svg>
        </div>
        <div className="shell band-hero grid min-h-[60dvh] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] xl:grid-cols-[minmax(0,700px)_minmax(0,1fr)]">
          <Reveal hero className="flex min-w-0 flex-col gap-6">
            <h1 id="hero-heading" className="font-serif text-display text-navy">
              Your AI Safety career starts here.
            </h1>
            <p className="max-w-[620px] font-sans text-body text-navy/72">
              AI Safety expertise has never been more important than today. SAIN provides the
              community, courses and resources to help students and professionals join the AI
              Safety field. We provide a clear path through education, community and practical
              projects, then connect strong contributors to the organisations, programmes and roles
              where they can take the next step.
            </p>
            <div className="pt-1">
              <a
                href={COMMUNITY_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent gap-2"
              >
                Join the community
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </Reveal>
          <Reveal hero delay={0.08} className="flex min-w-0 items-center justify-center lg:justify-end">
            <HeroChart />
          </Reveal>
        </div>
      </section>

      {/* What SAIN is for, before the page offers any door. Inverse, as a
          deliberate pause between the hero and the first programme: the
          statement gets a ground of its own, and the courses band starts clean
          on white after it. It ranks none of the ways in. */}
      <section
        id="mission"
        aria-labelledby="mission-heading"
        className="scroll-mt-36 bg-navy"
      >
        <div className="shell band-section flex flex-col items-center">
          <h2 id="mission-heading" className="sr-only">
            Why SAIN exists
          </h2>
          <Reveal>
            <MissionStatement />
          </Reveal>
          <Reveal delay={0.05} className="mt-7 flex flex-col items-center gap-3 text-center">
            <p className="max-w-[560px] font-sans text-body text-white/72">
              A free, volunteer-run path from curiosity to contribution, through
              courses, events, research and local chapters.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 font-sans text-label text-white underline decoration-white/40 underline-offset-4 hover:decoration-white focus-visible:decoration-white"
            >
              Why SAIN exists
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Courses. The mission copy and the funnel it was built around moved
          to /about, where the argument and the diagram sit together; what is
          left on this ground is the first step itself. */}
      <section
        id="courses"
        aria-labelledby="courses-heading"
        className="relative isolate scroll-mt-36 overflow-hidden bg-white"
      >
        <SectionOrbits className="-left-20 top-6 h-[400px] w-[300px] md:-left-12" />
        <div className="shell band-section-top relative isolate pb-14">
          <div className="mb-10 max-w-[680px]">
            {/* The glyph that marks "trains" in the statement above, so this
                band reads as the answer to that word. Orange as a large glyph,
                not lettering. */}
            <h2 id="courses-heading" className="flex items-center gap-3.5 font-serif text-heading text-navy">
              <GraduationCap size={38} weight="light" aria-hidden="true" className="shrink-0 text-orange" />
              Start with a free course
            </h2>
            <p className="mt-3 font-sans text-body leading-[26px] text-navy/74">
              Pick a track. Every programme is free and taught in person. What you join, and how it
              runs, depends on the chapter.
            </p>
            {/* Which chapters are taking applications, read from the same file
                the chapter pages read. A cohort can never be advertised as open
                here and closed there, and when the last one closes this line
                removes itself rather than going stale. */}
            {openCourseApplications.length > 0 && (
              <p className="mt-3 font-sans text-caption text-navy/65">
                You can apply now in {formatCityList(openCourseApplications)}.
              </p>
            )}
          </div>
          <Reveal><CourseLab /></Reveal>
        </div>
      </section>

      {/* Show the community first, then explain how to join it. */}
      {/* The fold. Community pins under the header and the navy research
          band slides up over it, as a sheet laid on the paper. CSS only
          (sticky, no scroll listener). The wrapper bounds the pin, so it lets
          go when research ends; FoldPin picks the offset so the whole band has
          been on screen before research covers it, at any window height. */}
      <div>
        <FoldPin>
      {/* Community, made of its chapters. Paper, its own ground between the
          white mission-and-courses run and the navy research band. The claim
          on the left, and on the right the three chapters as prints: each is
          the photograph its chapter page opens with, so the print is the room
          previewed and the whole print is the door. (This replaced both the
          thin "Local communities" strip under the hero, whose #chapters anchor
          it took, and a separate strip of uncaptioned event prints.) */}
      <section id="community" aria-labelledby="community-heading" className="relative isolate scroll-mt-36 overflow-hidden bg-cream">
        <div className="shell band-section grid items-center gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:gap-24">
          <Reveal className="flex flex-col items-start gap-5">
            <p className="kicker text-kicker text-navy/65">Community</p>
            <h2 id="community-heading" className="font-serif text-heading text-navy">
              Participate in the community
            </h2>
            <p className="font-sans text-body text-navy/74 [&_strong]:font-semibold [&_strong]:text-navy">
              <strong>Discussion groups</strong>, <strong>hackathons</strong>,{" "}
              <strong>talks</strong>, and the evenings after. People meet{" "}
              <strong>friends and collaborators</strong> here, and often find their{" "}
              <strong>next step in AI Safety</strong>.
            </p>
            {/* Same words as the hero's button on purpose: one label per
                destination, so the second ask reads as the same door. */}
            <a href={COMMUNITY_JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn-accent mt-2 gap-2">
              Join the community
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Reveal>

          <Reveal delay={0.06} className="min-w-0">
            <nav id="chapters" aria-label="Chapters" className="scroll-mt-36">
              {/* A snap strip below sm, the next print past the edge as the
                  affordance; three across from sm. */}
              <ul
                role="list"
                className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 pt-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:gap-7"
              >
                {ATLAS.map((chapter, i) => (
                  <li key={chapter.id} className="w-[72vw] max-w-[300px] shrink-0 snap-center sm:w-auto sm:max-w-none">
                    <Link
                      href={chapter.href}
                      className={`group block ${i === 1 ? "sm:translate-y-4" : ""}`}
                    >
                      {/* Only the print tilts; the line under it stays level. */}
                      <span
                        className={`block bg-white p-2 shadow-[0_7px_22px_#021C4D1F] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:rotate-0 group-hover:shadow-[0_14px_34px_#021C4D29] group-focus-visible:rotate-0 ${
                          ["-rotate-[2deg]", "rotate-[1.5deg]", "-rotate-[1deg]"][i]
                        }`}
                      >
                        <span className="relative block aspect-[4/5] overflow-hidden bg-cream">
                          <img
                            src={`${chapter.photo}-640.webp`}
                            srcSet={`${chapter.photo}-640.webp 640w, ${chapter.photo}-960.webp 960w`}
                            sizes="(min-width: 1440px) 280px, (min-width: 640px) 30vw, 72vw"
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                          />
                        </span>
                        <span className="flex items-baseline justify-between gap-3 px-1.5 pb-1 pt-3">
                          <span className="font-serif text-title text-navy">{chapter.city}</span>
                          <span className="font-sans text-index tracking-normal text-orange-ink">{chapter.index}</span>
                        </span>
                      </span>
                      <span className="mt-4 flex items-start justify-between gap-3 px-1">
                        <span className="kicker text-kicker-sm text-navy/65">{chapter.origin}</span>
                        <ArrowRight
                          size={16}
                          weight="regular"
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-navy/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-navy"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </section>
        </FoldPin>

      {/* One research story: the invitation, the people, and the work they publish. */}
      <section id="research" aria-labelledby="research-heading" className="relative z-10 scroll-mt-36 bg-navy text-white shadow-[0_-18px_40px_-10px_#021C4D38]">
        {/* band-research rather than a hand-set pt/pb. Every other band on the
            page carries its own clamp from globals.css, and this one was
            running about 30px tighter at 1440 than the bands either side of
            it while the utility written for it sat unused. */}
        <div className="shell band-research">
          <Reveal className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:gap-12 xl:grid-cols-[minmax(0,650px)_minmax(0,1fr)] xl:gap-24">
            <div className="flex flex-col items-start gap-6">
              <h2 id="research-heading" className="max-w-[560px] font-serif text-heading">The SAIN Research Hub</h2>
              <p className="max-w-[590px] text-body text-white/75">Bring your academic expertise to AI Safety. Connect with researchers, develop a focused project, and take your work further with support from SAIN.</p>
              <Link href="/research" className="inline-flex items-center gap-3 text-label leading-6 text-white/80 underline decoration-white/35 underline-offset-4 hover:text-white focus-visible:text-white">
                Visit the Research hub <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <ResearchIllustration />
          </Reveal>

          {/* The offer, then the journey. No kicker above either: the landing
              already runs three of them across eight sections, which is the
              ceiling, and the h2 says what this band is without help. */}
          <Reveal delay={0.05}><ResearchOffer /></Reveal>
          <Reveal delay={0.05}><ResearchSteps /></Reveal>

          {/* The ask, closing the band rather than trailing the last step. It
              used to sit inside step three beside "View all publications",
              where the page's one orange button in this band read as a
              footnote to publishing. It sends readers to the hub rather than
              straight into the interest form: the terms of applying are the
              line beside it, and the page that explains them is one click on.
              The form itself is on /research, twice. */}
          <Reveal delay={0.05} className="mt-12 flex flex-col gap-6 border-t border-white/15 pt-8 md:mt-16 md:flex-row md:items-center md:justify-between md:gap-12">
            <p className="max-w-[520px] font-serif text-title leading-[30px] text-white">
              Apply any time. Determine your commitment per project. Remote participation is welcome.
            </p>
            {/* One label per destination: the three chapter pages and the band
                opener above all call /research "Visit the Research hub", so the
                closing ask is the same door, not a second one. */}
            <Link href="/research" className="btn-accent shrink-0 self-start md:self-auto">
              Visit the Research hub
            </Link>
          </Reveal>
        </div>
      </section>
      </div>

      {/* Careers. The claim, the paragraph that argues it, and the four kinds
          of work named on a closing rule, with the quote alongside.

          The four tracks were cells of their own, which is more room than a
          list of names needs; on one line they read as the range of the thing
          rather than as four items competing with the paragraph above them.

          The quote starts level with the heading. There is no kicker over it
          any more, which is what the quote used to collide with and what the
          hand-set offset here was correcting for. */}
      <section id="careers" aria-labelledby="careers-heading" className="scroll-mt-36 border-t border-navy/10 bg-cream">
        <div className="shell band-index grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(280px,420px)]">
          <div className="flex min-w-0 flex-col gap-[22px]">
            <h2 id="careers-heading" className="max-w-[620px] font-serif text-heading-sm text-navy">
              Build an AI Safety career
            </h2>
            <p className="max-w-[680px] font-sans text-body text-navy/74">
              Most people who end up working on AI Safety did not plan for it. We shorten that
              path with mentorship, funding advice, and introductions to the labs, institutes and
              ministries hiring in Europe right now.
            </p>
            {/* The separators are drawn rather than typed, so a screen reader
                reads four names and not four middots. */}
            <ul role="list" className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-navy/14 pt-4">
              {careerTracks.map((track, i) => (
                <li key={track} className="flex items-center gap-3">
                  {i > 0 ? <span aria-hidden="true" className="text-navy/25">·</span> : null}
                  <span className="kicker text-caption text-navy/65">{track}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The quote is the band's evidence, so it is set apart from the
              argument beside it without leaving its column: a left hairline
              (the chapter cells' device), the words a size up in the light
              serif, and an oversized opening mark as the one typographic
              flourish. The mark sits in the flow, on its own line between the
              context and the words: positioned absolutely it landed under the
              text once the column narrowed. Navy only; orange stays with the
              actions. */}
          <blockquote className="flex min-w-0 flex-col gap-4 border-l border-navy/14 py-1 pl-6 lg:pl-7">
            <p className="kicker text-base leading-[22px] text-navy/65">
              Internship · Existential Risk Observatory
            </p>
            <p className="font-serif text-heading-sm font-light text-navy">
              <span
                aria-hidden="true"
                className="block h-[34px] select-none font-serif text-[72px] leading-[0.9] text-navy/[0.14]"
              >
                &ldquo;
              </span>
              Without this community I almost certainly wouldn&rsquo;t be where I am.
            </p>
            <footer className="border-t border-navy/14 pt-3">
              <cite className="block font-sans text-sm font-medium not-italic leading-5 text-navy">
                Stefano Zuffi
              </cite>
              <p className="kicker mt-1 text-kicker-sm text-navy/65">
                Mapping research on AI alignment techniques and government interventions
              </p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Get involved. Inverse, because this band asks for a decision, and a
          banner rather than a column beside a drawing.

          The funnel stood here and was the reason the band was 400px tall
          with nothing in most of it: the claim, one sentence and two buttons
          come to about 235px, so the diagram left eighty pixels of empty navy
          above and below the words. It also spent the last screen restating
          the five sections the reader had just scrolled through. design.md
          asks a diagram to encode a claim; the funnel has one, that the path
          narrows, and /about is where it is argued.

          What is left is what a close needs. The claim on the left, the two
          ways to act on the right, centred against it. No kicker over the
          heading: a label, a heading and a button row is three things where
          the band is really saying two.

          The line under the heading answers the reason people give for not
          starting. docs/vision.md puts the funnel's first level at "has not
          encountered AI safety" and says plainly that the people who stop
          early are worth having; the heading carries the stakes, so this
          carries the invitation. */}
      <section id="involved" aria-labelledby="involved-heading" className="scroll-mt-36 bg-navy">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2 id="involved-heading" className="max-w-[620px] font-serif text-closing text-white">
              The next decade is being decided now
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              You do not need a background in AI to be useful here. Every SAIN programme is
              free, run by volunteers, and takes you from curious to contributing, so pick
              one and begin.
            </p>
          </div>

          {/* The first band of the funnel on /about and this button have to
              mean the same thing: the course section on this page. */}
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <Link href="#courses" className="btn-accent">
              Start with a free course
            </Link>
            <Link href="/get-involved" className="btn-ghost-inverse">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
