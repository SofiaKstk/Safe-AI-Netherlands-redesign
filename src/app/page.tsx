"use client";

import Link from "next/link";
import CoursePopup from "@/components/CoursePopup";
import FadeIn from "@/components/FadeIn";
import ScrollCue from "@/components/ScrollCue";
import {
  APPLICATION_REVIEW,
  hasOpenPositions,
  isNationalRecruiting,
  recruitingChapters,
} from "@/data/openPositions";

/** "A", "A and B", "A, B and C". */
function joinWithAnd(items: string[]): string {
  if (items.length < 3) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/**
 * Reads as "SAIN Netherlands, Amsterdam and Utrecht". The national posting
 * comes first so an open national role still names something when every
 * chapter is at capacity.
 */
const recruitingNames = joinWithAnd([
  ...(isNationalRecruiting ? ["Netherlands"] : []),
  ...recruitingChapters.map((c) => c.chapterSlug),
]);

const pathways = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 6.75A2.25 2.25 0 0 1 6.75 4.5h3.5c.69 0 1.25.56 1.25 1.25v13.75H6.75A2.25 2.25 0 0 0 4.5 21V6.75Zm7 12.75V5.75c0-.69.56-1.25 1.25-1.25h3.5A2.25 2.25 0 0 1 18.5 6.75V21a2.25 2.25 0 0 0-2.25-1.5H11.5ZM7.5 8.5h2.5m-2.5 3h2.5m5-3h2.5m-2.5 3h2.5"
        />
      </svg>
    ),
    title: "Take our AI Safety course",
    description:
      "Join the \"AI Safety, Ethics, and Society\" course, available in Technical and Governance tracks across our local chapters.",
    href: "/get-involved#courses",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="6.5" cy="7" r="1.5" />
        <circle cx="17.5" cy="7" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="6.5" cy="17" r="1.5" />
        <circle cx="17.5" cy="17" r="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8m-8 10h8M7.7 8.2l3 2.9m5.6-2.9-3 2.9m-5.6 5.6 3-2.9m5.6 2.9-3-2.9" />
      </svg>
    ),
    title: "Research with us",
    description:
      "Join the SAIN Research Hub and get matched with PhD+ supervisors for impactful AI Safety projects, from mechanistic interpretability to governance.",
    href: "/research",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: "Join your local community",
    description:
      "Connect with AI Safety advocates in your city through discussion groups, hackathons, seminars, and regular meetups.",
    href: "/get-involved#chapters-list",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    ),
    title: "Shape the conversation",
    description:
      "Write for our Substack, speak at events, or contribute to AI Safety outreach to help raise awareness across the Netherlands.",
    href: "https://safeainetherlands.substack.com/",
  },
];

const chapters = [
  {
    city: "Groningen",
    description: "Groningen's hub for AI Safety education, research, and community.",
    href: "/chapters/groningen",
  },
  {
    city: "Amsterdam",
    description:
      "AI Safety in the Netherlands' largest city. Building a diverse community across UvA, VU Amsterdam, and the broader Amsterdam tech ecosystem.",
    href: "/chapters/amsterdam",
  },
  {
    city: "Utrecht",
    description:
      "AI Safety in the heart of the Netherlands. Building a multidisciplinary community at Utrecht University and beyond, with international backing and a growing research focus.",
    href: "/chapters/utrecht",
  },
];



export default function Home() {
  return (
    <>
      <CoursePopup />

      {/* Flowing gradient wrapper covers hero, metrics, and pathways */}
      <div className="relative">
        {/* Orange gradient that flows across the top sections */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-linear-to-l from-dutch-orange/15 via-dutch-orange/5 to-transparent pointer-events-none" />
        {/* Dot pattern across the top sections */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #021c4d 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="section-container relative z-10 py-32 md:py-40">
            <div className="max-w-4xl">
              <FadeIn delay={0.1}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dutch-orange mb-5">
                  STAY SAIN
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1 className="heading-xl text-navy-900 mb-6">
                  Building a safer future{" "}
                  <span className="gradient-text block">with AI</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.35}>
                <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
                  Safe AI Netherlands (SAIN) is a Dutch non-profit that unites researchers, students, and
                  professionals to ensure artificial
                  intelligence is developed and deployed safely.
                </p>
              </FadeIn>
              <FadeIn delay={0.55}>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Link href="/about" className="btn-primary">
                    Our Mission
                  </Link>
                  <Link href="/get-involved" className="btn-outline">
                    Get Involved
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
          <ScrollCue href="#pathways" />
        </section>

        {/* Recruiting banner */}
        {hasOpenPositions ? (
        <section className="relative z-10 pb-6 md:pb-8">
          <div className="section-container">
            <FadeIn>
              <div className="flex flex-col gap-5 rounded-2xl border border-dutch-orange/30 bg-white/80 p-6 shadow-xs backdrop-blur-xs md:flex-row md:items-center md:justify-between md:p-7">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-dutch-orange/15 text-dutch-orange">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-dutch-orange">
                      We are recruiting
                    </p>
                    <h2 className="font-display text-xl font-semibold text-navy-900 md:text-2xl">
                      Open roles across SAIN {recruitingNames}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Help us grow SAIN. Applications are reviewed {APPLICATION_REVIEW.phrase}.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3 md:justify-end">
                  <Link href="/open-positions" className="btn-primary">
                    See open positions
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
        ) : null}

        {/* Pathways */}
        <section id="pathways" className="relative z-10 section-padding pt-12 md:pt-16">
          <div className="section-container">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="heading-lg text-navy-900">
                  What can you do at SAIN?
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pathways.map((pathway, i) => (
                <FadeIn key={pathway.title} delay={i * 0.1}>
                  <Link
                    href={pathway.href}
                    target={pathway.href.startsWith("http") ? "_blank" : undefined}
                    className="card p-6 h-full flex flex-col group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-dutch-orange/10 text-dutch-orange flex items-center justify-center mb-4 group-hover:bg-dutch-orange group-hover:text-white transition-colors duration-300">
                      {pathway.icon}
                    </div>
                    <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">
                      {pathway.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed flex-1">
                      {pathway.description}
                    </p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Chapters */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Local Presence
              </p>
              <h2 className="heading-lg text-navy-900 mb-4">
                SAIN chapters across the Netherlands
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Each SAIN chapter operates locally while benefiting from shared
                national infrastructure and resources.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {chapters.map((chapter, i) => (
              <FadeIn key={chapter.city} delay={i * 0.1}>
                <Link href={chapter.href} className="card p-6 h-full flex flex-col group">
                  <div className="mb-3">
                    <h3 className="font-display font-semibold text-lg text-navy-900 group-hover:text-dutch-orange transition-colors">
                      SAIN {chapter.city}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {chapter.description}
                  </p>
                  <div className="mt-4 text-sm font-medium text-dutch-orange flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center mt-12">
              <Link href="/get-involved#start-chapter" className="btn-outline">
                Start SAIN in your city
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 bg-navy-950 overflow-hidden">
        <div
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[650px] md:h-[650px] opacity-[0.05]"
          style={{
            backgroundImage: `url(/sain-symbol.svg)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-dutch-orange/30 to-transparent" />

        <div className="section-container relative z-10 text-center">
          <FadeIn>
            <h2 className="heading-lg text-white mb-6 text-balance">
              AI Safety is one of the most important challenges of our time
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
              Whether you&apos;re a researcher, student, policymaker, or
              concerned citizen, there&apos;s a place for you in SAIN.
              Join us in shaping the safe development and integration of AI in the
              Netherlands.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/get-involved" className="btn-primary text-base px-8 py-3.5">
                Get Involved
              </Link>
              <Link href="/about" className="btn-secondary text-base px-8 py-3.5">
                About Us
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.42}>
            <p className="mt-10 text-sm md:text-base uppercase tracking-[0.2em] text-dutch-orange font-semibold">
              STAY SAIN
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
