import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import CommunityPrints from "@/components/landing/CommunityPrints";
import CourseTabs from "@/components/landing/CourseTabs";
import Reveal from "@/components/landing/Reveal";
import ResearchSteps from "@/components/landing/ResearchSteps";
import ResearchIllustration from "@/components/landing/ResearchIllustration";
import HeroChart from "@/components/landing/HeroChart";
import PathwayTrail from "@/components/landing/PathwayTrail";
import SectionOrbits from "@/components/landing/SectionOrbits";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import {
  formatCityList,
  openCourseApplications,
} from "@/data/courseApplications";
import {
  ArrowRight,
  Bank,
  Broadcast,
  Buildings,
  Flask,
  PencilSimpleLine,
  ShieldCheck,
  Stack,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

/* No `title` here on purpose: the landing falls through to the root layout's
   `title.default`, so the tab reads "Safe AI Netherlands" and nothing more.
   The claim still reaches search and link previews via the description. */
export const metadata: Metadata = {
  description:
    "SAIN provides the community, courses and resources to help students and professionals join the AI Safety field in the Netherlands. Every programme is free.",
};

/* The photograph is the one each chapter page opens with, so arriving on the
   chapter is a continuation of the picture the hover already showed. These are
   720x280 crops of those heroes, not the heroes themselves: `output: "export"`
   ships images unoptimized, and the three full-size JPEGs come to 3.8MB for a
   band this size. `npm run images` writes them; the crop window for each city
   lives there, next to the reason it is what it is. */
const chapters = [
  {
    city: "Utrecht",
    href: "/chapters/utrecht",
    photo: "/photos/cities/utrecht-index.webp",
  },
  {
    city: "Groningen",
    href: "/chapters/groningen",
    photo: "/photos/cities/groningen-index.webp",
  },
  {
    city: "Amsterdam",
    href: "/chapters/amsterdam",
    photo: "/photos/cities/amsterdam-index.webp",
  },
];

/* Career destinations. A 26px orange icon, a 240px serif title, a description
   that grows, and a 160px destination: one shared rhythm, so the rows read as
   a list rather than four cards. Phosphor at light weight is the closest match
   to the 1.4 stroke the rest of the page draws with. */
const careerTracks = [
  {
    title: "Technical research",
    description: "Interpretability, evaluations and control research at labs and institutes.",
    destination: "Labs and institutes",
    Icon: Flask,
    DestinationIcon: Buildings,
  },
  {
    title: "Governance and policy",
    description: "Advising ministries, regulators and standards bodies on frontier AI.",
    destination: "Public sector",
    Icon: PencilSimpleLine,
    DestinationIcon: Bank,
  },
  {
    title: "Field building",
    description: "Running programmes, chapters and communications for the Dutch ecosystem.",
    destination: "Community",
    Icon: Broadcast,
    DestinationIcon: UsersThree,
  },
  {
    title: "Security and compute",
    description: "Model security, compute governance and assurance engineering.",
    destination: "Industry",
    Icon: ShieldCheck,
    DestinationIcon: Stack,
  },
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
            "linear-gradient(in oklab 180deg, white 0%, white 95%, #f7f5f2 100%)",
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
                className="btn-accent"
              >
                Join the community
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </Reveal>
          <Reveal hero delay={0.08} className="flex min-w-0 items-center justify-center lg:justify-end">
            <HeroChart />
          </Reveal>
        </div>
      </section>

      {/* Chapters. A thin index band: cities as peers, left hairline, no cards. */}
      <section id="chapters" aria-labelledby="chapters-heading" className="scroll-mt-36 border-t border-navy/10 bg-cream">
        <div className="shell band-index flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* "Communities" in the label, "chapters" in the anchor and the
              links: the word on the page changed, the URL others link to did
              not. */}
          <h2 id="chapters-heading" className="kicker pt-0.5 text-kicker text-navy/65 lg:w-[300px] lg:shrink-0">
            Local communities
          </h2>
          <div className="grid flex-1 gap-6 sm:grid-cols-3">
            {chapters.map((chapter) => (
              <article
                key={chapter.city}
                className="chapter-cell relative isolate border-l border-navy/14 py-5 pl-[18px] pr-4"
              >
                {/* The city is always there, faint, and hover brings it up.
                    It fades in from the left rather than covering the cell:
                    the name and the link keep clean cream under them at rest
                    and flat navy under them on hover, and the photograph gets
                    the half of the cell that has nothing written on it. */}
                <span className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                  <Image
                    src={chapter.photo}
                    alt=""
                    width={720}
                    height={280}
                    loading="eager"
                    className="chapter-cell-photo h-full w-full object-cover"
                  />
                  <span className="chapter-cell-scrim absolute inset-0 bg-navy" />
                </span>
                <h3 className="font-serif text-title text-navy">{chapter.city}</h3>
                <Link
                  href={chapter.href}
                  className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm leading-5 text-navy underline decoration-navy/20 underline-offset-4 after:absolute after:inset-0 hover:decoration-navy focus-visible:decoration-navy"
                >
                  View chapter
                  <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Courses. The mission copy and the funnel it was built around moved
          to /about, where the argument and the diagram sit together; what is
          left on this ground is the first step itself. */}
      <section
        id="courses"
        aria-labelledby="courses-heading"
        className="relative isolate scroll-mt-36 overflow-hidden border-t border-navy/10 bg-white"
      >
        <SectionOrbits className="-left-20 top-6 h-[400px] w-[300px] md:-left-12" />
        <div className="shell band-section-top relative isolate pb-14">
          <div className="mx-auto mb-10 max-w-[640px] text-center">
            <h2 id="courses-heading" className="font-serif text-heading text-navy">Start with a free course</h2>
            <p className="mt-2.5 font-sans text-body leading-[26px] text-navy/74">
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
          <Reveal><CourseTabs /></Reveal>
        </div>
      </section>

      {/* Show the community first, then explain how to join it. */}
      <section id="community" aria-labelledby="community-heading" className="relative isolate scroll-mt-36 overflow-hidden bg-white">
        <SectionOrbits className="-bottom-32 -left-20 h-[500px] w-[375px] rotate-[-20deg] md:-left-12" />
        <div className="shell"><div className="border-t border-navy/14" /></div>
        <div className="shell band-community flex flex-col gap-12 md:gap-16">
          <Reveal><CommunityPrints /></Reveal>
          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,620px)] xl:gap-16">
            <div className="flex flex-col gap-4">
              <p className="kicker text-kicker text-navy/65">Community</p>
              <h2 id="community-heading" className="max-w-[480px] font-serif text-heading-sm text-navy">
                The community is how SAIN works.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-6">
              <p className="max-w-[600px] font-sans text-body text-navy/74">
                Weekly sessions, hackathons, and the evenings after. People meet friends and
                collaborators here, and often find their next step in AI Safety.
              </p>
              <ul className="flex flex-col gap-2.5 font-sans text-kicker-sm leading-[22px] text-navy">
                {[
                  "Friends working on the same problems",
                  "A network across Utrecht, Groningen and Amsterdam",
                  "Events you can walk into",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    {/* Navy, not orange. design.md reserves orange for joining,
                        hiring and active state: "If a page uses orange only as
                        a bullet dot, it is not SAIN." The CTA below is where
                        the orange belongs. */}
                    <span className="h-px w-4 shrink-0 bg-navy/30" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              {/* Same words as the hero's button on purpose: one label per
                  destination, so the second ask reads as the same door rather
                  than a new one. */}
              <a href={COMMUNITY_JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn-accent">
                Join the community
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* One research story: the invitation, the people, and the work they publish. */}
      <section id="research" aria-labelledby="research-heading" className="scroll-mt-36 bg-navy text-white">
        <div className="shell band-research">
          <Reveal className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:gap-12 xl:grid-cols-[minmax(0,650px)_minmax(0,1fr)] xl:gap-24">
            <div className="flex flex-col items-start gap-6">

              <h2 id="research-heading" className="max-w-[560px] font-serif text-heading">The SAIN Research Hub</h2>
              <p className="max-w-[590px] text-body text-white/75">Bring your academic expertise to AI Safety. Connect with researchers, develop a focused project, and take your work further with support from SAIN.</p>
              <div className="mt-2 flex flex-wrap items-center gap-6">
                <a href="https://forms.gle/na3wbBR4V1YVHAnFA" target="_blank" rel="noopener noreferrer" className="btn-accent">Join as a researcher<span className="sr-only"> (opens in a new tab)</span></a>
              </div>
            </div>
            <ResearchIllustration />
          </Reveal>

          <ResearchSteps />
        </div>
      </section>

      {/* Careers. Paper band: a quote, then the destinations as hairline rows. */}
      <section id="careers" aria-labelledby="careers-heading" className="scroll-mt-36 border-t border-navy/10 bg-cream">
        <div className="shell band-section flex flex-col gap-9">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] xl:grid-cols-[minmax(0,1fr)_minmax(280px,520px)]">
            <div className="flex min-w-0 flex-col gap-[22px]">
              <p className="kicker text-kicker text-navy/65">Careers</p>
              <h2 id="careers-heading" className="max-w-[620px] font-serif text-heading-sm text-navy">Build an AI Safety career</h2>
              <p className="max-w-[720px] font-sans text-body text-navy/74">
                Most people who end up working on AI Safety did not plan for it. We shorten that
                path with mentorship, funding advice, and introductions to the labs, institutes and
                ministries hiring in Europe right now.
              </p>
              <Link
                href="/open-positions"
                className="btn-outline-ink self-start"
              >
                See open positions
              </Link>
            </div>

            {/* Dropped to the heading's line rather than the band's top edge.
                Level with the "Careers" kicker the quote read as a second
                label for the section; level with the heading it reads as
                something the section is saying. The offset is the left
                column's own stack: the kicker's 24px line and the 22px gap
                under it. */}
            <blockquote className="flex min-w-0 flex-col gap-[18px] lg:mt-[46px]">
              <p className="kicker text-base leading-[22px] text-navy/65">
                Internship · Existential Risk Observatory
              </p>
              <p className="font-serif text-title font-light leading-[31px] text-navy">
                &ldquo;Without this community I almost certainly wouldn&rsquo;t be where I
                am.&rdquo;
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

          <div>
            {careerTracks.map((track) => (
              <div
                key={track.title}
                className="flex flex-col gap-4 border-t border-navy/10 px-[22px] py-[18px] lg:flex-row lg:items-center lg:gap-6"
              >
                <div className="flex items-center gap-4 lg:contents">
                  <track.Icon
                    size={26}
                    weight="light"
                    className="shrink-0 text-orange"
                    aria-hidden="true"
                  />
                  <h3 className="font-serif text-title-sm text-navy lg:w-[200px] lg:shrink-0 xl:w-[240px]">
                    {track.title}
                  </h3>
                </div>
                <p className="flex-1 font-sans text-ui leading-[23px] text-navy/68">
                  {track.description}
                </p>
                <p className="flex items-center gap-[7px] font-sans text-caption text-navy/65 lg:w-[140px] lg:shrink-0 xl:w-40">
                  <track.DestinationIcon
                    size={16}
                    weight="light"
                    className="shrink-0 text-navy/45"
                    aria-hidden="true"
                  />
                  {track.destination}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get involved. Inverse, because this band asks for a decision. */}
      <section id="involved" aria-labelledby="involved-heading" className="scroll-mt-36 bg-navy">
        <div className="shell band-close grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] xl:grid-cols-[minmax(0,1fr)_minmax(280px,520px)]">
          <div className="flex min-w-0 flex-col gap-[22px]">
            <p className="kicker text-kicker text-white/60">Get involved</p>
            <h2 id="involved-heading" className="max-w-[580px] font-serif text-closing text-white">
              The next decade is being decided now
            </h2>
            <p className="font-sans text-body text-white/78">
              Every SAIN programme is free and run by volunteers. Start with a course, or write to
              us about helping run one.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* The trail's first stop and this button have to mean the same
                  thing: the course section on this page. */}
              <Link href="#courses" className="btn-accent">
                Start with a free course
              </Link>
              <Link href="/get-involved" className="btn-ghost-inverse">
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
