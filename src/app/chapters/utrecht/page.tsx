import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import lumaPastEventsUtrechtRaw from "@/data/lumaPastEventsUtrecht.json";
import { APPLICATION_REVIEW, isChapterRecruiting } from "@/data/openPositions";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import {
  COURSE_APPLICATION_URL,
  courseApplicationFor,
} from "@/data/courseApplications";
import { CaretRight, Check, GraduationCap } from "@phosphor-icons/react/dist/ssr";

const utrechtIsRecruiting = isChapterRecruiting("Utrecht");

// Course registration is seasonal; open and close it in
// src/data/courseApplications.ts rather than editing the CTA below.
const courseApplication = courseApplicationFor("Utrecht");

const leadership = [
    {
    name: "Riccardo Campanella",
    title: "Director",
    linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
    },
    {
    name: "Luca 'Dug' Dughera",
    title: "Event Lead",
    linkedin: "https://www.linkedin.com/in/luca-dughera/",
    },
    {
    name: "Carolien Tran",
    title: "Discussion Group Lead",
    linkedin: "https://www.linkedin.com/in/carolientran/",
    },
    {
    name: "Elena Clacova",
    title: "Communication lead",
    linkedin: "https://www.linkedin.com/in/elenaclacova/",
    },
    {
    name: "Cem Kaya",
    title: "Research Operations",
    linkedin: "https://www.linkedin.com/in/cem-kaya-om8/",
    },
    {
    name: "Dimitra Tsolka",
    title: "Facilitator",
    linkedin: "https://www.linkedin.com/in/dimitra-tsolka/",
    },
    {
    name: "Max Schaffelder",
    title: "Advisor",
    linkedin: "https://www.linkedin.com/in/maxschaffelder/",
    },

] as const;

const highlights = [
  "3 iterations of the AI Safety Fundamentals program delivered",
  "100+ participants across three editions of the program",
  "Funded by BERI with mentorship from Pathfinder",
  "Guest speaker events including researchers from Anthropic (60+ attendees)",
  "Active local community of 240+ members",
  "LinkedIn engagement rate of ~9% (well above 2% benchmark)",
  "Growing team with focus on doubling to 15 members across 4 teams",
];

const technicalCoursePhotos = [
  {
    week: 1,
    label: "Transformers & mechanistic interpretability",
    image: "/photos/events/utrecht/technical-week-1.jpeg",
  },
  {
    week: 2,
    label: "Probing & representations",
    image: "/photos/events/utrecht/technical-week-2.jpeg",
  },
  {
    week: 3,
    label: "PPO & RLHF",
    image: "/photos/events/utrecht/technical-week-3.jpeg",
  },
  {
    week: 4,
    label: "RLHF, GRPO & reward hacking",
    image: "/photos/events/utrecht/technical-week-4.jpeg",
  },
] as const;

const fundamentalsGraduationPhoto = {
  label: "Program graduation",
  image: "/photos/events/utrecht/aisfundamentals-graduation-ceremony.jpeg",
} as const;

const discussionGroups = [
  {
    name: "Technical AI Safety",
    description:
      "Building learning pathways in Technical AI Safety topics including Mechanistic Interpretability. Reading and discussing current research with a focus on practical understanding.",
  },
  {
    name: "AI Governance & Policy",
    description:
      "Exploring regulatory frameworks, risk management approaches, and governance structures for AI systems. Connecting academic insights with real-world policy challenges.",
  },
];

const discussionGroupPhoto = {
  label: "Europe 2031 scenario discussion",
  image: "/photos/events/utrecht/discussion-eu2031.jpeg",
} as const;

const NATIONAL_SUBSTACK_URL = "https://safeainetherlands.substack.com/";
const UTRECHT_LINKTREE_URL = "https://linktr.ee/sainutrecht";
const UTRECHT_LINKEDIN_POSTS_URL =
  "https://www.linkedin.com/company/sain-utrecht/posts/";
const WIN4AISAFETY_DEVPOST_URL =
  "https://win4aisafety-sain-utrecht.devpost.com/project-gallery";
const WIN4AISAFETY_PROMO_WINNER =
  "/photos/events/utrecht/win4AISafety_congrats_the_winners.jpg";

const EDU_UTR_EMAIL = "eduutr@safeainetherlands.org";
const EVENTS_UTR_EMAIL = "eventsutr@safeainetherlands.org";
const INFO_UTR_EMAIL = "infoutr@safeainetherlands.org";

/** SAIN Utrecht Luma calendar — from embed / page HTML (`cal-…`). */
const LUMA_CALENDAR_ID = "cal-2gYun0D26BriJ5z";
/** Public link for the featured calendar / intro session (short lu.ma URL). */
const LUMA_PUBLIC_URL = "https://lu.ma/sain-utrecht-events";

/** Distinct labels; several routes currently share the chapter inbox */
const utrechtContactByRole = [
  { label: "Formal collaboration", email: INFO_UTR_EMAIL },
  { label: "Community Manager", email: "cmutr@safeainetherlands.org" },
  { label: "Education", email: EDU_UTR_EMAIL },
  { label: "Research", email: "research@safeainetherlands.org" },
  { label: "Events", email: EVENTS_UTR_EMAIL },
  { label: "Substack", email: "substack@safeainetherlands.org" },
  { label: "Public Outreach", email: "prutr@safeainetherlands.org" },
];

function academicYearStart(now: Date): Date {
  const year = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
  return new Date(year, 8, 1);
}

function formatEventDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

const pastEvents = (
  lumaPastEventsUtrechtRaw as Array<{
    name: string;
    url: string;
    startAt: string;
  }>
)
  .map((ev) => ({ ...ev, startAt: new Date(ev.startAt) }))
  .filter((ev) => ev.startAt >= academicYearStart(new Date()))
  .sort((a, b) => b.startAt.getTime() - a.startAt.getTime());

export default function UtrechtPage() {
  return (
    <>
      {/* Hero — navy + photo + gradient (same structure as Amsterdam / Groningen) */}
      <section className="relative pb-20 pt-16 md:pb-28 md:pt-20 bg-navy-950 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(/photos/cities/utrecht-hero.jpg)`,
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/70 to-navy-950/50" />

        <div className="section-container relative z-10">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                SAIN
              </Link>
              <span className="text-slate-500">/</span>
              <span className="text-sm text-dutch-orange">Utrecht</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-white max-w-3xl mb-6">SAIN Utrecht</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              AI Safety in the heart of the Netherlands. Building a
              multidisciplinary community at Utrecht University and beyond,
              with international backing and a growing research focus.
            </p>
          </FadeIn>
          <FadeIn delay={0.28}>
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={COMMUNITY_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Join our community
              </a>
              <a
                href={NATIONAL_SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                National newsletter (Substack)
              </a>
              <a
                href={UTRECHT_LINKTREE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                All Utrecht links (Linktree)
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Recruiting banner */}
      {utrechtIsRecruiting ? (
        <section className="bg-white">
          <div className="section-container pt-8 md:pt-10">
            <FadeIn>
              <div className="flex flex-col gap-5 rounded-2xl border border-dutch-orange/30 bg-dutch-orange/5 p-6 shadow-xs md:flex-row md:items-center md:justify-between md:p-7">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-dutch-orange/15 text-dutch-orange">
                    <GraduationCap className="h-6 w-6" weight="light" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-dutch-orange">
                      We are recruiting
                    </p>
                    <h2 className="font-display text-xl font-semibold text-navy-900 md:text-2xl">
                      Open roles at SAIN Utrecht
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Help us grow the chapter. Applications are reviewed {APPLICATION_REVIEW.phrase}.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3 md:justify-end">
                  <Link
                    href="/open-positions#chapter-utrecht"
                    className="btn-primary"
                  >
                    See open positions
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      ) : null}

      {/* In-page overview */}
      <section className="border-b border-slate-200 bg-white">
        <div className="section-container py-5 md:py-6">
          <nav
            className="flex flex-wrap justify-center gap-3 md:gap-4 text-base md:text-lg font-semibold text-navy-900"
            aria-label="SAIN Utrecht page sections"
          >
            <a
              href="#events"
              className="rounded-full border-2 border-slate-200 px-6 py-3 md:px-8 md:py-3.5 hover:border-dutch-orange hover:text-dutch-orange transition-colors"
            >
              Events
            </a>
            <a
              href="#programs"
              className="rounded-full border-2 border-slate-200 px-6 py-3 md:px-8 md:py-3.5 hover:border-dutch-orange hover:text-dutch-orange transition-colors"
            >
              Programs
            </a>
            <a
              href="#about"
              className="rounded-full border-2 border-slate-200 px-6 py-3 md:px-8 md:py-3.5 hover:border-dutch-orange hover:text-dutch-orange transition-colors"
            >
              About
            </a>
            <a
              href="#join"
              className="rounded-full border-2 border-slate-200 px-6 py-3 md:px-8 md:py-3.5 hover:border-dutch-orange hover:text-dutch-orange transition-colors"
            >
              Join &amp; contact
            </a>
          </nav>
        </div>
      </section>

      {/* Win4AISafety promo */}
        <section className="section-padding bg-white border-b border-slate-200">
          <div className="section-container">
            <FadeIn>
              <div className="max-w-3xl mx-auto">
                <h3 className="font-display font-semibold text-navy-900 text-lg md:text-xl text-center mb-4">
                  <a
                    href={WIN4AISAFETY_DEVPOST_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-dutch-orange transition-colors"
                  >
                    Win4AISafety — Open Research Summer Challenge
                  </a>
                </h3>
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  <Image
                    src={WIN4AISAFETY_PROMO_WINNER}
                    alt="Win4AISafety — Open Research Summer Challenge by SAIN Utrecht. Congratulations to the winners."
                    width={1566}
                    height={1197}
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-5">
                  <a
                    href={WIN4AISAFETY_DEVPOST_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    See the project gallery
                  </a>
                </div>
                <p className="text-xs text-slate-500 text-center mt-3 max-w-md mx-auto leading-relaxed">
                  Browse the submissions and results on Devpost.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

      {/* Events */}
      <section id="events" className="section-padding bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Events
              </p>
              <h2 className="heading-lg text-navy-900">
                Past &amp; upcoming events
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <div>
                <p className="text-sm text-slate-600 mb-3">
                  Upcoming events — see details on{" "}
                  <a
                    href={LUMA_PUBLIC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                  >
                    lu.ma/bsv03bzb
                  </a>
                  .
                </p>
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                  <iframe
                    src={`https://luma.com/embed/calendar/${LUMA_CALENDAR_ID}/events?lt=light`}
                    width="100%"
                    height="450"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex={0}
                    title="SAIN Utrecht Luma calendar"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-3">
                  Past events this academic year — recaps on{" "}
                  <a
                    href={UTRECHT_LINKEDIN_POSTS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                  >
                    linkedin.com/company/sain-utrecht
                  </a>
                  .
                </p>
                {pastEvents.length > 0 ? (
                  <div className="rounded-xl border border-slate-200 bg-white h-[450px] overflow-y-auto">
                    <ul className="divide-y divide-slate-100">
                      {pastEvents.map((event, i) => (
                        <li key={`${event.url}-${i}`}>
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors group"
                          >
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 w-20 shrink-0">
                              {formatEventDate(event.startAt)}
                            </span>
                            <span className="font-display font-medium text-navy-900 group-hover:text-dutch-orange transition-colors text-sm md:text-base flex-1">
                              {event.name}
                            </span>
                            <CaretRight className="w-4 h-4 text-slate-300 group-hover:text-dutch-orange transition-colors shrink-0" weight="light" aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-white h-[450px] flex items-center justify-center p-6">
                    <p className="text-sm text-slate-400 text-center max-w-md">
                      No past events in this list yet for the current academic
                      year.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-8 text-sm text-slate-600">
              Events:{" "}
              <a
                href={`mailto:${EVENTS_UTR_EMAIL}?subject=${encodeURIComponent("SAIN Utrecht — Events")}`}
                className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
              >
                {EVENTS_UTR_EMAIL}
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Programs
              </p>
              <h2 className="heading-lg text-navy-900">
                What we run in Utrecht
              </h2>
            </div>
          </FadeIn>

          {/* Courses */}
          <div className="mt-16 pt-16 border-t border-slate-100 first:mt-0 first:border-t-0 first:pt-0">
            <FadeIn>
              <div className="mb-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  Courses
                </p>
                <h2 className="heading-lg text-navy-900">
                  AI Safety Fundamentals
                </h2>
                {courseApplication.open ? (
                  <>
                    <p className="text-slate-600 leading-relaxed mt-4 mb-5 max-w-2xl">
                      Sign up to participate in the upcoming courses or to become a
                      facilitator!
                      <br />
                      Participant deadline: {courseApplication.deadlines.participants}.
                      Facilitator deadline: {courseApplication.deadlines.facilitators}.
                    </p>
                    <a
                      href={COURSE_APPLICATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Sign up
                    </a>
                  </>
                ) : (
                  <p className="text-slate-600 leading-relaxed mt-4 max-w-2xl">
                    Applications are closed. {courseApplication.closedNote}
                  </p>
                )}
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <FadeIn className="lg:col-span-2">
                <div className="card p-8">
                  <p className="text-slate-600 leading-relaxed mb-6">
                    SAIN Utrecht&apos;s <strong className="text-navy-900">AI Safety Fundamentals</strong>{" "}
                    series has run across three iterations, reaching BSc/MSc
                    students, researchers, engineers, and public-sector
                    participants — more than 100 across three editions. Each
                    week spotlights a different theme so newcomers can drop in
                    and keep coming back for the next session. During the 4th week, participants can choose to follow a technical or governance path.
                    It is possible to participate in both paths, but the technical path is more demanding as it will introduce more advanced concepts.
                    Each week pairs a lecture with a discussion group, and participants can also join the local community to continue the conversation.
                    The discussion group schedule is available on{" "}
                    <a
                      href={LUMA_PUBLIC_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                    >
                      our Luma page
                    </a>
                    .
                  </p>

                  <h3 className="font-display font-semibold text-navy-900 text-sm uppercase tracking-wider mb-3 pt-6 border-t border-slate-100">
                    Course outline (weekly themes)
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-600 leading-snug">
                    <li className="flex gap-2">
                      <span className="text-dutch-orange font-semibold shrink-0">1.</span>
                      <span>
                        <strong className="text-navy-900">Introduction</strong> — High-level overview of AI safety, why it matters now, capabilities &amp; diffusion, types of risks and solution strategies (technical &amp; governance).
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-dutch-orange font-semibold shrink-0">2.</span>
                      <span>
                        <strong className="text-navy-900">Types of risks &amp; incidents</strong> — Social harms, frontier risks, misuse, loss of control; real-world cases and how research lags deployment.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-dutch-orange font-semibold shrink-0">3.</span>
                      <span>
                        <strong className="text-navy-900">Why AI Safety is difficult</strong> — Industry incentives, funding gaps, expert disagreement, slow regulation vs. fast labs, geopolitical race dynamics.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-dutch-orange font-semibold shrink-0">4.</span>
                      <div>
                        <span>
                          <strong className="text-navy-900">Path specialization</strong> — You choose one or both of the following paths:
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          <div className="bg-slate-50 rounded-xl p-5">
                            <h4 className="font-display font-semibold text-navy-900 mb-2">
                              Technical Path
                            </h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                              Robustness &amp; jailbreaking, scalable oversight, alignment, evaluations, cybersecurity and agents.
                            </p>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-5">
                            <h4 className="font-display font-semibold text-navy-900 mb-2">
                              Governance Path
                            </h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                              Regulations, the EU AI act, accountability, and international actors.
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="card p-6">
                  <h3 className="font-display font-semibold text-navy-900 mb-4">
                    Course details
                  </h3>
                  <dl className="space-y-4">
                    {[
                      { label: "Duration", value: "4 weeks" },
                      {
                        label: "Workload",
                        value: "1h readings + 1h lecture / week",
                      },
                      {
                        label: "Format",
                        value: "On-site in Utrecht",
                      },
                      {
                        label: "Venue",
                        value: "Utrecht University, Utrecht city center",
                      },
                      {
                        label: "Certification",
                        value: "Certificate upon attending all sessions. Discussion groups are optional. Participating in one of the two paths in week 4 is enough to get the certificate.",
                      },
                      {
                        label: "Audience",
                        value: "Students, researchers, professionals. No previous background requested",
                      },
                    ].map((item) => (
                      <div key={item.label}>
                        <dt className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-0.5">
                          {item.label}
                        </dt>
                        <dd className="text-sm font-medium text-navy-900">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 italic">
                      Topics and timings may shift by cohort — email us for the
                      latest schedule.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <figure className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white max-w-2xl">
                <div className="relative aspect-4/3 bg-slate-100">
                  <Image
                    src={fundamentalsGraduationPhoto.image}
                    alt={`AI Safety Fundamentals — ${fundamentalsGraduationPhoto.label}`}
                    fill
                    sizes="(max-width: 672px) 100vw, 672px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3 border-t border-slate-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-dutch-orange mb-0.5">
                    Cohort highlight
                  </p>
                  <p className="text-sm font-medium text-navy-900 leading-snug">
                    {fundamentalsGraduationPhoto.label}
                  </p>
                </figcaption>
              </figure>
            </FadeIn>

            {/* Technical AI Safety (ARENA) */}
            <div className="mt-16 pt-16 border-t border-slate-100">
              <FadeIn>
                <div className="mb-12">
                  <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                    Courses
                  </p>
                  <h2 className="heading-lg text-navy-900">
                    Technical AI Safety
                  </h2>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <FadeIn className="lg:col-span-2">
                  <div className="card p-8">
                    <p className="text-slate-600 leading-relaxed mb-8">
                      SAIN Utrecht is the{" "}
                      <strong className="text-navy-900">
                        first SAIN chapter
                      </strong>{" "}
                      teaching from{" "}
                      <a
                        href="https://www.arena.education/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                      >
                        ARENA
                      </a>{" "}
                      materials — a four-week technical track from transformer
                      foundations through mechanistic interpretability and
                      alignment, with weekly lectures, notebook exercises, and
                      in-person discussion at Utrecht University.
                    </p>

                    <h3 className="font-display font-semibold text-navy-900 text-sm uppercase tracking-wider mb-3 pt-6 border-t border-slate-100">
                      Course outline (weekly themes)
                    </h3>
                    <ul className="space-y-2.5 text-sm text-slate-600 leading-snug">
                      <li className="flex gap-2">
                        <span className="text-dutch-orange font-semibold shrink-0">1.</span>
                        <span>
                          <strong className="text-navy-900">Transformers &amp; mechanistic interpretability</strong> — From RNNs to modern transformers: tokenization, embeddings, attention, and how models project back to vocabulary. Introduction to reverse-engineering neural networks via weights, activations, and internal circuits.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-dutch-orange font-semibold shrink-0">2.</span>
                        <span>
                          <strong className="text-navy-900">Probing &amp; representations</strong> — Linear probes as detectors in activation space (truth, deception); SAE-based feature decomposition; activation oracles for open-ended questions about model internals. Risk-triage exercises for high-stakes monitoring scenarios.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-dutch-orange font-semibold shrink-0">3.</span>
                        <span>
                          <strong className="text-navy-900">PPO &amp; RLHF</strong> — Why naive policy gradients fail and how PPO stabilises training. The full alignment pipeline: supervised fine-tuning, reward-model training, and PPO optimisation — with the KL penalty as a guard against reward hacking.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-dutch-orange font-semibold shrink-0">4.</span>
                        <span>
                          <strong className="text-navy-900">RLHF, GRPO &amp; reward hacking</strong> — The transformer as an RL agent (tokens as actions, preference as reward). Value heads and actor–critic setups; GRPO with LoRA fine-tuning. Observing reward hacking in practice — mode collapse, prefix exploitation, and mitigation strategies.
                        </span>
                      </li>
                    </ul>
                    <p className="text-sm text-slate-500 mt-6 pt-4 border-t border-slate-100">
                      Each week pairs a lecture with ARENA-inspired notebook
                      assignments using tools such as{" "}
                      <strong className="text-navy-900">TransformerLens</strong>
                      ,{" "}
                      <strong className="text-navy-900">SAELens</strong>, and{" "}
                      <strong className="text-navy-900">Neuronpedia</strong>.
                      Completing the notebooks and attending in person is required
                      for the certificate of completion; lectures are also streamed
                      online for remote participants.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.15}>
                  <div className="card p-6">
                    <h3 className="font-display font-semibold text-navy-900 mb-4">
                      Course details
                    </h3>
                    <dl className="space-y-4">
                      {[
                        { label: "Duration", value: "4 weeks" },
                        {
                          label: "Sessions",
                          value: "Weekly lectures (~90 min) + notebooks",
                        },
                        {
                          label: "Format",
                          value: "In-person lectures, streamed online; hands-on exercises & discussion",
                        },
                        {
                          label: "Venue",
                          value: "Utrecht University",
                        },
                        {
                          label: "Certificate",
                          value: "Complete notebooks & attend in person",
                        },
                        {
                          label: "Prerequisites",
                          value: "Python; linear algebra & probability",
                        },
                        {
                          label: "Materials",
                          value: "Based on ARENA open curriculum",
                        },
                      ].map((item) => (
                        <div key={item.label}>
                          <dt className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-0.5">
                            {item.label}
                          </dt>
                          <dd className="text-sm font-medium text-navy-900">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-400 italic">
                        Technical cohort logistics may differ from fundamentals —
                        email for the current plan.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={0.2}>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {technicalCoursePhotos.map((photo) => (
                    <figure
                      key={photo.week}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                    >
                      <div className="relative aspect-4/3 bg-slate-100">
                        <Image
                          src={photo.image}
                          alt={`Technical AI Safety — Week ${photo.week}: ${photo.label}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="px-4 py-3 border-t border-slate-100">
                        <p className="text-xs font-semibold uppercase tracking-wider text-dutch-orange mb-0.5">
                          Week {photo.week}
                        </p>
                        <p className="text-sm font-medium text-navy-900 leading-snug">
                          {photo.label}
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <p className="mt-10 text-center text-xs text-slate-400 italic max-w-2xl mx-auto mb-6">
                These courses are independently led by SAIN Utrecht and are not
                affiliated with UU.
              </p>
              <p className="text-center text-sm text-slate-600 max-w-2xl mx-auto">
                Questions about the course?{" "}
                <a
                  href={`mailto:${EDU_UTR_EMAIL}?subject=${encodeURIComponent("SAIN Utrecht — Education / course")}`}
                  className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                >
                  {EDU_UTR_EMAIL}
                </a>
              </p>
            </FadeIn>
          </div>

          {/* Discussion groups */}
          <div className="mt-16 pt-16 border-t border-slate-100">
            <FadeIn>
              <div className="mb-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  Discussion groups
                </p>
                <h2 className="heading-lg text-navy-900 mb-4">
                  Weekly research &amp; discussion groups
                </h2>
                <p className="text-slate-500 max-w-2xl">
                  Focused groups meeting weekly to discuss and learn about
                  specific AI Safety topics. Connecting students, researchers,
                  and practitioners for deeper engagement.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              {discussionGroups.map((group, i) => (
                <FadeIn key={group.name} delay={i * 0.05}>
                  <div className="card p-6 h-full">
                    <h3 className="font-display font-semibold text-navy-900 mb-3">
                      {group.name}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {group.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.15}>
              <figure className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white max-w-2xl">
                <div className="relative aspect-4/3 bg-slate-100">
                  <Image
                    src={discussionGroupPhoto.image}
                    alt={`Discussion group — ${discussionGroupPhoto.label}`}
                    fill
                    sizes="(max-width: 672px) 100vw, 672px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3 border-t border-slate-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-dutch-orange mb-0.5">
                    In session
                  </p>
                  <p className="text-sm font-medium text-navy-900 leading-snug">
                    {discussionGroupPhoto.label}
                  </p>
                </figcaption>
              </figure>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 text-sm text-slate-600 max-w-2xl">
                Questions about discussion groups?{" "}
                <a
                  href={`mailto:${EDU_UTR_EMAIL}?subject=${encodeURIComponent("SAIN Utrecht — Discussion groups")}`}
                  className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                >
                  {EDU_UTR_EMAIL}
                </a>
              </p>
            </FadeIn>
          </div>

          {/* Research */}
          <div className="mt-16 pt-16 border-t border-slate-100">
          <FadeIn>
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Research
              </p>
              <h2 className="heading-lg text-navy-900 mb-4">
                Current research directions
              </h2>
              <p className="text-slate-500 max-w-2xl leading-relaxed">
                SAIN Utrecht is expanding from education toward a
                research-enabled hub — including early-stage work on red-teaming
                LLMs, safety evaluation, interpretability, and agent behavior.
                Chapter research isn&apos;t limited to these themes; connect via
                the{" "}
                <Link
                  href="/research"
                  className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                >
                  Research Hub
                </Link>{" "}
                for collaboration across SAIN.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="grid gap-4 max-w-3xl mb-8">
              <div className="card p-6 flex flex-col">
                <span className="text-xs font-medium text-sky-800 bg-sky-100/80 px-2.5 py-0.5 rounded-md self-start mb-3">
                  Upcoming
                </span>
                <h3 className="font-display font-semibold text-navy-900 text-lg leading-snug">
                  Research Hub launch
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  October 2026
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-slate-600 mb-6 max-w-2xl leading-relaxed">
              Members of SAIN Utrecht contributed to this research.
            </p>
            <div className="card p-6 max-w-3xl flex flex-col">
              <span className="text-xs font-medium text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md self-start mb-3">
                Publication
              </span>
              <h3 className="font-display font-semibold text-navy-900 text-lg md:text-xl leading-snug">
                <a
                  href="https://arxiv.org/abs/2507.17951"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-dutch-orange transition-colors"
                >
                  Are LLM Belief Updates Consistent with Bayes&apos; Theorem?
                </a>
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                <a
                  href="https://arxiv.org/abs/2507.17951"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-dutch-orange hover:text-dutch-orange-dark"
                >
                  arXiv:2507.17951
                </a>
              </p>
            </div>
          </FadeIn>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-padding bg-slate-50">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  About
                </p>
                <h2 className="heading-lg text-navy-900 mb-6">
                  Where AI safety meets diverse expertise
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    SAIN Utrecht brings AI Safety to the heart of the
                    Netherlands, engaging a multidisciplinary community of
                    students, researchers, and professionals at Utrecht
                    University and beyond.
                  </p>
                  <p>
                    The chapter is the first AI safety initiative in the
                    Netherlands with both international funding (from BERI) and
                    mentorship integration (from Pathfinder). This unique
                    position enables Utrecht to bridge academic research with
                    practical AI safety work.
                  </p>
                  <p>
                    Under Riccardo Campanella&apos;s leadership, SAIN Utrecht is
                    transitioning from an education-first initiative to a
                    research-enabled hub, with early-stage work on red-teaming
                    LLMs, safety evaluation, interpretability, and agent behavior.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <h3 className="font-display font-semibold text-navy-900 mb-4">
                  Chapter highlights
                </h3>
                <ul className="space-y-3">
                  {highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-600"
                    >
                      <Check className="w-4 h-4 text-dutch-orange shrink-0 mt-0.5" weight="light" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <h2 className="heading-lg text-navy-900 mb-3">SAIN Utrecht Team</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {leadership.map((person, i) => (
              <FadeIn key={person.name} delay={Math.min(i * 0.03, 0.35)}>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-4 h-full block hover:border-dutch-orange transition-colors group"
                  aria-label={`Open ${person.name}'s LinkedIn profile in a new tab`}
                >
                  <h3 className="font-display font-semibold text-base text-navy-900 group-hover:text-dutch-orange transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-sm font-medium text-dutch-orange mt-1.5 leading-snug">
                    {person.title}
                  </p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Join & contact */}
      <section id="join" className="section-padding bg-navy-950">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="heading-lg text-white mb-4">Join &amp; contact</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
              Fill in our onboarding form to get involved. Subscribe to the
              national Substack for articles and updates across SAIN.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href={COMMUNITY_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Join our community
              </a>
              <a
                href={NATIONAL_SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                National newsletter (Substack)
              </a>
              <a
                href={UTRECHT_LINKTREE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                All Utrecht links (Linktree)
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.28}>
            <p className="text-sm font-medium text-slate-400 mb-4 max-w-2xl mx-auto">
              Email the right team to contact SAIN Utrecht
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {utrechtContactByRole.map((row) => (
                <a
                  key={row.label}
                  href={`mailto:${row.email}?subject=${encodeURIComponent(`SAIN Utrecht — ${row.label}`)}`}
                  className="inline-flex flex-col items-start rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-left text-sm text-white hover:bg-white/10 hover:border-white/35 transition-colors min-w-42"
                  aria-label={`Email ${row.label} to contact SAIN Utrecht`}
                >
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </span>
                  <span className="font-display font-semibold text-white">
                    {row.label}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5 break-all">
                    {row.email}
                  </span>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}