import type { Metadata } from "next";
import Link from "next/link";

import CommunityPrints from "@/components/landing/CommunityPrints";
import CourseTabs from "@/components/landing/CourseTabs";
import HeroChart from "@/components/landing/HeroChart";
import PathwayTrail from "@/components/landing/PathwayTrail";
import PublicationMarquee from "@/components/landing/PublicationMarquee";
import SectionStars from "@/components/landing/SectionStars";
import SectionOrbits from "@/components/landing/SectionOrbits";
import TalentFunnel from "@/components/landing/TalentFunnel";
import { RESEARCH_EMAIL, supervisors } from "@/data/research";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";

/* No `title` here on purpose: the landing falls through to the root layout's
   `title.default`, so the tab reads "Safe AI Netherlands" and nothing more.
   The claim still reaches search and link previews via the description. */
export const metadata: Metadata = {
  description:
    "SAIN provides the community, courses and resources to help students and professionals join the AI Safety field in the Netherlands. Every programme is free.",
};

const chapters = [
  {
    city: "Utrecht",
    blurb: "Fundamentals, ARENA track, discussion groups",
    href: "/chapters/utrecht",
  },
  {
    city: "Groningen",
    blurb: "Technical and governance tracks",
    href: "/chapters/groningen",
  },
  {
    city: "Amsterdam",
    blurb: "BlueDot technical and governance courses",
    href: "/chapters/amsterdam",
  },
];

/* Career destinations. A 26px orange stroke icon, a 240px serif title, a
   description that grows, and a 160px destination — one shared rhythm, so the
   rows read as a list rather than four cards. */
const careerTracks = [
  {
    title: "Technical research",
    description: "Interpretability, evaluations and control research at labs and institutes.",
    destination: "Labs and institutes",
    icon: (
      <>
        <path
          d="M9.5 3.5h5"
          fill="none"
          stroke="#FF6025"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 3.5v6.2L6.4 17.2A3.4 3.4 0 0 0 9.4 22h5.2a3.4 3.4 0 0 0 3-4.8L13.5 9.7V3.5"
          fill="none"
          stroke="#FF6025"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    destinationIcon: (
      <>
        <path d="M4 20.5h16" fill="none" stroke="rgb(2 28 77 / 45%)" strokeWidth="1.4" />
        <path
          d="M6 20.5V10h4v10.5M14 20.5V7h4v13.5"
          fill="none"
          stroke="rgb(2 28 77 / 45%)"
          strokeWidth="1.4"
        />
      </>
    ),
  },
  {
    title: "Governance and policy",
    description: "Advising ministries, regulators and standards bodies on frontier AI.",
    destination: "Public sector",
    icon: (
      <>
        <path
          d="M14.5 5.5l5 5-8.5 8.5H6v-5z"
          fill="none"
          stroke="#FF6025"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.8 7.2l4 4"
          fill="none"
          stroke="#FF6025"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 20.5h12"
          fill="none"
          stroke="#FF6025"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    destinationIcon: (
      <>
        <path
          d="M3 20.5h18"
          fill="none"
          stroke="rgb(2 28 77 / 45%)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M5 20.5V10.5l7-5.5 7 5.5v10"
          fill="none"
          stroke="rgb(2 28 77 / 45%)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Field building",
    description: "Running programmes, chapters and communications for the Dutch ecosystem.",
    destination: "Community",
    icon: (
      <>
        <circle cx="12" cy="12" r="2.2" fill="none" stroke="#FF6025" strokeWidth="1.4" />
        <path
          d="M12 5.2v2.2M12 16.6v2.2M5.2 12h2.2M16.6 12h2.2"
          fill="none"
          stroke="#FF6025"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M7.1 7.1l1.6 1.6M15.3 15.3l1.6 1.6M16.9 7.1l-1.6 1.6M8.7 15.3l-1.6 1.6"
          fill="none"
          stroke="#FF6025"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </>
    ),
    destinationIcon: (
      <>
        <circle cx="8" cy="8.5" r="2" fill="none" stroke="rgb(2 28 77 / 45%)" strokeWidth="1.4" />
        <circle cx="16" cy="8.5" r="2" fill="none" stroke="rgb(2 28 77 / 45%)" strokeWidth="1.4" />
        <circle cx="12" cy="14.8" r="2" fill="none" stroke="rgb(2 28 77 / 45%)" strokeWidth="1.4" />
      </>
    ),
  },
  {
    title: "Security and compute",
    description: "Model security, compute governance and assurance engineering.",
    destination: "Industry",
    icon: (
      <>
        <path
          d="M12 3.5l8 3.2v5.6c0 4.5-3.2 7.6-8 9.2-4.8-1.6-8-4.7-8-9.2V6.7z"
          fill="none"
          stroke="#FF6025"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 12.2l2.1 2.1L15.4 10"
          fill="none"
          stroke="#FF6025"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    destinationIcon: (
      <>
        <rect
          x="4"
          y="6"
          width="16"
          height="5"
          rx="1"
          fill="none"
          stroke="rgb(2 28 77 / 45%)"
          strokeWidth="1.4"
        />
        <rect
          x="4"
          y="13"
          width="16"
          height="5"
          rx="1"
          fill="none"
          stroke="rgb(2 28 77 / 45%)"
          strokeWidth="1.4"
        />
      </>
    ),
  },
];

const hubSteps = [
  "Two ways in. You are matched with a PhD+ supervisor, or you lead an open collaboration.",
  "You work on interpretability, model evaluations, control, or governance. Projects are scoped with your supervisor.",
  "You produce a paper, a replication or a policy brief. SAIN helps you submit and present at conferences.",
  "SAIN supplies compute and the national network across every chapter.",
  "What we ask: a background in computer science, mathematics, law or public policy; a weekly commitment set per project; you can join from any chapter, including remotely.",
];

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M2 6h8M7 3l3 3-3 3"
        fill="none"
        stroke="#021C4D"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero. The claim on the left, the evidence on the right. The white
          ground fades into paper in the last 5% — a seam, not a sky. */}
      <section
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, white 0%, white 95.31%, #f7f5f2 100%)",
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
        <div className="shell grid min-h-[60vh] items-center gap-12 pb-[76px] pt-[84px] lg:grid-cols-[minmax(0,700px)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-6">
            <h1 className="font-serif text-[40px] leading-[1.12] tracking-[-0.015em] text-navy md:text-[46px] md:leading-[52px]">
              Your AI Safety career starts here.
            </h1>
            <p className="max-w-[620px] font-sans text-[16.5px] leading-[27px] text-navy/72">
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
                className="btn-accent"
              >
                Join the SAIN Community - Free
              </a>
            </div>
          </div>
          <div className="flex min-w-0 items-center justify-end">
            <HeroChart />
          </div>
        </div>
      </section>

      {/* Chapters. A thin index band: cities as peers, left hairline, no cards. */}
      <section id="chapters" className="scroll-mt-28 border-t border-navy/10 bg-cream">
        <div className="shell flex flex-col gap-8 py-[46px] md:flex-row md:items-start">
          <h2 className="kicker w-[300px] shrink-0 pt-0.5 text-[17px] leading-6 text-navy/55">
            Local chapters
          </h2>
          <div className="grid flex-1 gap-6 sm:grid-cols-3">
            {chapters.map((chapter) => (
              <article key={chapter.city} className="border-l border-navy/14 py-0.5 pl-[18px]">
                <h3 className="font-serif text-[21px] leading-[26px] text-navy">{chapter.city}</h3>
                <p className="mt-2 font-sans text-sm leading-5 text-navy/66">{chapter.blurb}</p>
                <Link
                  href={chapter.href}
                  className="mt-2.5 inline-flex items-center gap-1.5 font-sans text-sm leading-5 text-navy underline decoration-navy/20 underline-offset-4 transition-colors hover:decoration-navy"
                >
                  View courses
                  <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission and courses are one band on one ground. The funnel's widest
          band already reads "Join a free course", so explaining the pipeline
          and opening its first step is a single argument — splitting it across
          two surfaces made the reader start over halfway through. */}
      <section className="relative isolate overflow-hidden border-t border-navy/10 bg-white">
        <SectionOrbits className="-left-20 top-6 h-[400px] w-[300px] md:-left-12" />
        <div id="mission" className="shell relative isolate scroll-mt-36 pt-[88px]">
          <SectionStars section="mission" />
          <div className="flex w-full flex-col items-center justify-between gap-12 lg:flex-row lg:items-center">
            <div className="flex w-full max-w-[760px] flex-col gap-[22px] lg:shrink-0">
              <h2 className="font-serif text-[38px] leading-[44px] tracking-[-0.012em] md:text-[46px] md:leading-[52px] max-w-[640px] text-navy">
                How SAIN is upskilling the next wave of AI Safety experts in the Netherlands.
              </h2>
              <div className="max-w-[720px] space-y-[27px] font-sans text-[16.5px] leading-[27px] text-navy/74">
                <p>
                  Learn about AI Safety from experts working at the frontier. SAIN&rsquo;s courses,
                  research hub, and community give you a clear way in, whether you&rsquo;re curious
                  or aiming for a career.
                </p>
                <p>
                  The goal is simple: help students and young professionals make a first real
                  contribution. Then we connect the strongest people onward to organisations,
                  programmes, and jobs. That&rsquo;s the SAIN Talent Pipeline.
                </p>
              </div>
              <div className="pt-1">
                <a
                  href={COMMUNITY_JOIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent"
                >
                  Join the community
                </a>
              </div>
            </div>

            <TalentFunnel />
          </div>
        </div>

        <div className="shell mt-10" aria-hidden="true">
          <div className="border-t border-navy/14" />
        </div>
        <div id="courses" className="shell relative isolate scroll-mt-36 pb-14 pt-10">
          <SectionStars section="courses" />
          <div className="mx-auto mb-10 max-w-[640px] text-center">
            <h2 className="font-serif text-[38px] leading-[44px] tracking-[-0.012em] md:text-[46px] md:leading-[52px] text-navy">Start with a free course</h2>
            <p className="mt-2.5 font-sans text-[16.5px] leading-[26px] text-navy/74">
              Pick a track. Every programme is free and taught in person. What you join, and how it
              runs, depends on the chapter.
            </p>
          </div>
          <CourseTabs />
        </div>
      </section>

      {/* Show the community first, then explain how to join it. */}
      <section id="community" className="relative isolate scroll-mt-36 overflow-hidden bg-white">
        <SectionStars section="community" />
        <SectionOrbits className="-bottom-32 -left-20 h-[500px] w-[375px] rotate-[-20deg] md:-left-12" />
        <div className="shell"><div className="border-t border-navy/14" /></div>
        <div className="shell flex flex-col gap-12 py-14 md:gap-16 md:py-[72px]">
          <CommunityPrints />
          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,620px)] lg:gap-16">
            <div className="flex flex-col gap-4">
              <p className="kicker text-[17px] leading-6 text-navy/55">Community</p>
              <h2 className="sain-heading max-w-[480px] text-navy">
                The community is how SAIN works.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-6">
              <p className="max-w-[600px] font-sans text-[16.5px] leading-[27px] text-navy/74">
                Weekly sessions, hackathons, and the evenings after. People find friends here,
                collaborators, and often the next step in AI Safety. That network is not an extra.
                It is a central part of the organisation.
              </p>
              <ul className="flex flex-col gap-2.5 font-sans text-[15px] leading-[22px] text-navy">
                {[
                  "Friends who are in the same work",
                  "A network across Utrecht, Groningen, and Amsterdam",
                  "Events you can walk into",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-0.5 w-4 shrink-0 bg-orange" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={COMMUNITY_JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn-accent">
                Join the SAIN Community - Free
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Research hub. How it works, and who supervises. */}
      <section id="research" className="scroll-mt-36 bg-navy">
        <div className="shell flex flex-col gap-11 py-[88px]">
          <div className="flex max-w-[760px] flex-col gap-[22px]">
            <h2 className="sain-heading text-white">Research hub</h2>
            <p className="font-sans text-[16.5px] leading-[27px] text-white/78">
              A national programme that matches researchers with PhD+ supervisors, and supports open
              collaboration. Open to students, researchers, and people with no formal affiliation,
              from every chapter. Apply at any time.
            </p>
            <Link href="/research" className="btn-ghost-inverse self-start px-5 py-[13px] text-sm">
              Read the call for applications
            </Link>
          </div>

          <div className="grid items-start gap-16 pt-2 lg:grid-cols-[minmax(0,1fr)_minmax(280px,560px)]">
            <div className="flex min-w-0 flex-col gap-[22px]">
              <h3 className="kicker text-[17px] leading-6 text-white/60">How it works</h3>
              <ul className="font-sans text-[15px] leading-6 text-white/78">
                {hubSteps.map((step) => (
                  <li key={step} className="flex items-start gap-3 border-t border-white/16 py-2.5">
                    <span
                      className="mt-2 size-[5px] shrink-0 rounded-full bg-orange"
                      aria-hidden="true"
                    />
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full flex-1 lg:border-l lg:border-white/16 lg:pl-8">
              <h3 className="kicker pb-3 text-[17px] leading-6 text-white/60">Supervisors</h3>
              {supervisors.map((supervisor) => (
                <div
                  key={supervisor.name}
                  className="flex flex-col gap-0.5 border-t border-white/16 py-[11px] sm:flex-row sm:items-baseline sm:gap-5"
                >
                  <span className="w-[196px] shrink-0 font-serif text-base leading-[22px] text-white">
                    {supervisor.name}
                  </span>
                  <span className="min-w-0 font-sans text-[14.5px] leading-[22px] text-white/78">
                    {supervisor.positionShort}
                  </span>
                </div>
              ))}
              <a
                href={`mailto:${RESEARCH_EMAIL}?subject=Becoming a SAIN research supervisor`}
                className="btn-ghost-inverse mt-[18px] px-5 py-[13px] text-sm"
              >
                Become a supervisor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Output. Publication evidence on a quiet paper ground. */}
      <section id="output" className="scroll-mt-36 bg-cream pb-14 pt-[72px]">
        <div className="shell flex flex-col gap-[18px]">
          <p className="kicker text-[17px] leading-6 text-navy/60">Output</p>
          <h2 className="sain-heading text-navy">Already in the literature</h2>
          <p className="max-w-[720px] font-sans text-[16.5px] leading-[27px] text-navy/74">
            Researchers in the hub have published at NeurIPS and ICLR. SAIN helps with submissions
            and presentations. The list below is the current backlog.
          </p>
          <p className="flex flex-wrap gap-7 pt-2 font-sans text-sm leading-5 text-navy/66">
            <span>6+ active projects</span>
            <span>20+ researchers</span>
            <span>12+ publications</span>
          </p>
        </div>

        <PublicationMarquee />
      </section>

      {/* Careers. Paper band: a quote, then the destinations as hairline rows. */}
      <section id="careers" className="scroll-mt-36 border-t border-navy/10 bg-cream">
        <div className="shell flex flex-col gap-9 py-[88px]">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,520px)]">
            <div className="flex min-w-0 flex-col gap-[22px]">
              <p className="kicker text-[17px] leading-6 text-navy/55">Careers</p>
              <h2 className="sain-heading max-w-[620px] text-navy">Build an AI Safety career</h2>
              <p className="max-w-[720px] font-sans text-[16.5px] leading-[27px] text-navy/74">
                Most people who end up working on AI Safety did not plan for it. We shorten that
                path with mentorship, funding advice, and introductions to the labs, institutes and
                ministries hiring in Europe right now.
              </p>
              <Link
                href="/open-positions"
                className="btn-outline-ink self-start px-5 py-[13px] text-sm"
              >
                See open positions
              </Link>
            </div>

            <blockquote className="flex min-w-0 flex-col gap-[18px]">
              <p className="kicker text-base leading-[22px] text-navy/50">
                Internship · Existential Risk Observatory
              </p>
              <p className="font-serif text-[21px] font-light leading-[31px] text-navy">
                &ldquo;Without this community I almost certainly wouldn&rsquo;t be where I
                am.&rdquo;
              </p>
              <footer className="border-t border-navy/14 pt-3">
                <cite className="block font-sans text-sm font-medium not-italic leading-5 text-navy">
                  Stefano Zuffi
                </cite>
                <p className="kicker mt-1 text-[15px] leading-5 text-navy/55">
                  Mapping research on AI alignment techniques and government interventions
                </p>
              </footer>
            </blockquote>
          </div>

          <div>
            {careerTracks.map((track) => (
              <div
                key={track.title}
                className="flex flex-col gap-4 border-t border-navy/10 px-[22px] py-[18px] md:flex-row md:items-center md:gap-6"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" className="shrink-0" aria-hidden="true">
                  {track.icon}
                </svg>
                <h3 className="w-[240px] shrink-0 font-serif text-[19px] leading-6 text-navy">
                  {track.title}
                </h3>
                <p className="flex-1 font-sans text-[14.5px] leading-[23px] text-navy/68">
                  {track.description}
                </p>
                <p className="flex w-40 shrink-0 items-center gap-[7px] font-sans text-[13.5px] leading-[18px] text-navy/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    {track.destinationIcon}
                  </svg>
                  {track.destination}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get involved. Inverse, because this band asks for a decision. */}
      <section id="involved" className="scroll-mt-36 bg-navy">
        <div className="shell grid items-center gap-12 py-[92px] lg:grid-cols-[minmax(0,1fr)_minmax(280px,520px)]">
          <div className="flex min-w-0 flex-col gap-[22px]">
            <p className="kicker text-[17px] leading-6 text-white/60">Get involved</p>
            <h2 className="max-w-[580px] font-serif text-[36px] leading-[1.12] tracking-[-0.014em] text-white md:text-[42px] md:leading-[46px]">
              The next decade is being decided now
            </h2>
            <p className="font-sans text-[16.5px] leading-[27px] text-white/78">
              Every SAIN programme is free and run by volunteers. Start with a course, or write to
              us about helping run one.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/get-involved#courses" className="btn-accent px-[22px] text-sm">
                Join a course
              </Link>
              <Link href="/get-involved" className="btn-ghost-inverse px-[22px]">
                Volunteer
              </Link>
            </div>
          </div>

          <PathwayTrail />
        </div>
      </section>
    </>
  );
}
