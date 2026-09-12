"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { aisigTeam } from "@/data/aisigTeam";
import { APPLICATION_REVIEW, isChapterRecruiting } from "@/data/openPositions";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import {
  COURSE_APPLICATION_URL,
  courseApplicationFor,
} from "@/data/courseApplications";

const groningenIsRecruiting = isChapterRecruiting("Groningen");

// Course registration is seasonal; open and close it in
// src/data/courseApplications.ts rather than editing the CTA below.
const courseApplication = courseApplicationFor("Groningen");

const EDU_GRO_EMAIL = "edugro@safeainetherlands.org";
const EVENTS_GRO_EMAIL = "eventsgro@safeainetherlands.org";

/** SAIN Groningen Luma calendar — from embed / page HTML (`cal-…`). */
const LUMA_CALENDAR_ID = "cal-jjqTmBdWcqoyEUF";
/** Public Luma profile for SAIN Groningen. */
const LUMA_PUBLIC_URL = "https://luma.com/user/SAINGroningen";

const discussionGroups = [
  {
    name: "Technical AI Alignment",
    description:
      "Explores how to align capable ML systems with human intent: scalable oversight, evaluation and red-teaming, preference learning, robustness, and deployment risks, with weekly readings and discussion grounded in current research.",
  },
  {
    name: "AI Governance & Privacy",
    description:
      "Shaping policies for AI's ethical and responsible use. Discussing guidelines, regulations, and accountability mechanisms to ensure AI systems are transparent, secure, fair, and free of bias.",
  },
];

const NATIONAL_SUBSTACK_URL = "https://safeainetherlands.substack.com/";
const GRONINGEN_LINKTREE_URL = "https://linktr.ee/saingroningen";

const groningenContactByRole = [
  { label: "Formal collaboration", email: "infogro@safeainetherlands.org" },
  { label: "Community Manager", email: "cmgro@safeainetherlands.org" },
  { label: "Education", email: "edugro@safeainetherlands.org" },
  { label: "Research", email: "research@safeainetherlands.org" },
  { label: "Events", email: "eventsgro@safeainetherlands.org" },
  { label: "Substack", email: "substack@safeainetherlands.org" },
  { label: "Public Outreach", email: "prgro@safeainetherlands.org" },
];

const researchHighlights = [
  {
    title: "Steering LLMs using Conceptors",
    venue: "NeurIPS 2024",
    authors: "Joris Postmus, Steven Abreu",
    link: "https://jorispos.github.io/conceptor_steering/",
  },
  {
    title: "Self-Ablating Transformers",
    venue: "ICLR 2025",
    authors: "Jeremias Ferrao",
    link: "https://openreview.net/pdf?id=QcmEb490bK",
  },
  {
    title: "The Anatomy of Alignment",
    venue: "NeurIPS 2025 Spotlight",
    authors: "Jeremias Ferrao, Matthijs van der Lende, Ilija Lichkovski",
    link: "https://arxiv.org/abs/2509.12934",
  },
  {
    title: "EU-Agent-Bench",
    venue: "NeurIPS 2025",
    authors: "Ilija Lichkovski, Alexander Müller, Mariam Ibrahim, Tiwai Mhundwa",
    link: "https://arxiv.org/abs/2510.21524",
  },
];

export default function GroningenPage() {
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-navy-950 overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            videoReady && !videoFailed ? "opacity-0" : "opacity-30"
          }`}
          style={{ backgroundImage: `url(/photos/cities/groningen-hero.jpg)` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <video
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              videoReady && !videoFailed ? "opacity-45" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/photos/cities/groningen-hero.jpg"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
          >
            <source src="/videos/groningen-hero.mp4" type="video/mp4" />
          </video>
        </div>
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
              <span className="text-sm text-dutch-orange">Groningen</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-white max-w-3xl mb-6">
              SAIN Groningen
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              Groningen&apos;s hub for AI Safety education, research, and
              community.
            </p>
          </FadeIn>
          <FadeIn delay={0.28}>
            <div className="flex flex-wrap gap-3">
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
                href={GRONINGEN_LINKTREE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                All Groningen links (Linktree)
              </a>
            </div>
            
          </FadeIn>
        </div>
      </section>

      {/* In-page overview */}
      <section className="border-b border-slate-200 bg-white">
        <div className="section-container py-5 md:py-6">
          <nav
            className="flex flex-wrap justify-center gap-3 md:gap-4 text-base md:text-lg font-semibold text-navy-900"
            aria-label="SAIN Groningen page sections"
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

      {/* Hiring callout */}
      {groningenIsRecruiting ? (
        <section className="bg-dutch-orange/5 border-b border-slate-200">
          <div className="section-container py-6 md:py-8">
            <FadeIn>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                <div className="flex-1">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-dutch-orange">
                    We&apos;re hiring
                  </p>
                  <p className="text-base md:text-lg text-navy-900">
                   Help us build the chapter. Applications are reviewed {APPLICATION_REVIEW.phrase}.
                  </p>
                </div>
                <Link
                  href="/open-positions#chapter-groningen"
                  className="btn-primary shrink-0"
                >
                  See open roles
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      ) : null}

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
            <div className="max-w-2xl">
              <p className="text-sm text-slate-600 mb-3">
                Upcoming events — see details on{" "}
                <a
                  href={LUMA_PUBLIC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                >
                  luma.com/user/SAINGroningen
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
                  title="SAIN Groningen Luma calendar"
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/chapters/groningen/events" className="btn-primary">
                View full archive
              </Link>
              <p className="text-sm text-slate-600">
                Events:{" "}
                <a
                  href={`mailto:${EVENTS_GRO_EMAIL}?subject=${encodeURIComponent("SAIN Groningen: Events")}`}
                  className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                >
                  {EVENTS_GRO_EMAIL}
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Programs: courses, discussion groups, research */}
      <section id="programs" className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Programs
              </p>
              <h2 className="heading-lg text-navy-900">
                What we run in Groningen
              </h2>
            </div>
          </FadeIn>

          {/* Courses */}
          <div className="mt-16 pt-16 border-t border-slate-100 first:mt-0 first:border-t-0 first:pt-0">
          <FadeIn>
            <div className="mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Education
              </p>
              <h2 className="heading-lg text-navy-900">
                AI Safety, Ethics, and Society
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
                  We facilitate the Center for AI Safety course{" "}
                  <strong>&quot;AI Safety, Ethics, and Society&quot;</strong> in
                  two distinct cohorts, each customized to fit two different
                  approaches to AI Safety: <strong>Technical</strong> and{" "}
                  <strong>Governance</strong>. We host both courses on-site in
                  Groningen.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  This course has a broader scope compared to the previously
                  facilitated AGISF, and addresses not only control issues and
                  misalignment but also risks like malicious use, accidents, and
                  societal dependence. We aim for 3-4 cohorts per year, reaching
                  around 60 individuals annually.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-xl p-5">
                    <h4 className="font-display font-semibold text-navy-900 mb-2">
                      Technical Track
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Focuses on the technical aspects of AI Safety, with extra
                      sessions on mechanistic interpretability, adversarial
                      attacks, complex systems, and more.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5">
                    <h4 className="font-display font-semibold text-navy-900 mb-2">
                      Governance Track
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Prioritizes governance and policy aspects, dedicating time
                      to case studies and real-world examples of regulatory,
                      legal, and societal challenges.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="card p-6">
                <h3 className="font-display font-semibold text-navy-900 mb-4">
                  Course Details
                </h3>
                <dl className="space-y-4">
                  {[
                    { label: "Duration", value: "6 weeks per block" },
                    { label: "Workload", value: "2h readings + 2h discussion / week" },
                    { label: "Cohorts per year", value: "3-4 (Block-based)" },
                    { label: "Format", value: "On-site in Groningen" },
                    { label: "Certification", value: "Certificate upon completion" },
                    { label: "Selection", value: "Application-based" },
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
                    These courses are independently led by SAIN Groningen and
                    are not affiliated with the University of Groningen.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <p className="mt-10 text-center text-sm text-slate-600 max-w-2xl mx-auto">
              Questions about the course?{" "}
              <a
                href={`mailto:${EDU_GRO_EMAIL}?subject=${encodeURIComponent("SAIN Groningen: Education / course")}`}
                className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
              >
                {EDU_GRO_EMAIL}
              </a>
            </p>
          </FadeIn>
          </div>

          {/* Discussion groups */}
          <div className="mt-16 pt-16 border-t border-slate-100">
          <FadeIn>
            <div className="mb-12">
              <p className="text-sm font-semibold tracking-wide text-dutch-orange mb-3 normal-case">
                The discussion groups
              </p>
              <h2 className="heading-lg text-navy-900 mb-4">
                Weekly research &amp; discussion
              </h2>
              <p className="text-slate-500 max-w-2xl">
                Focused groups meeting weekly (~2 hours) to discuss, learn, and
                collaborate on specific AI Safety topics. Each group has at
                least one experienced mentor guiding the conversation.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {discussionGroups.map((group, i) => (
              <FadeIn key={group.name} delay={i * 0.1}>
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
          <FadeIn delay={0.2}>
            <p className="mt-8 text-center text-sm text-slate-600 max-w-2xl mx-auto">
              Questions about discussion groups?{" "}
              <a
                href={`mailto:${EDU_GRO_EMAIL}?subject=${encodeURIComponent("SAIN Groningen: Discussion groups")}`}
                className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
              >
                {EDU_GRO_EMAIL}
              </a>
            </p>
          </FadeIn>

          </div>

          {/* Research Highlights */}
          <div className="mt-16 pt-16 border-t border-slate-100">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  Research
                </p>
                <h2 className="heading-lg text-navy-900">
                  Selected research from our members
                </h2>
              </div>
              <Link
                href="/research"
                className="text-sm font-semibold text-dutch-orange hover:text-dutch-orange-dark transition-colors flex items-center gap-1"
              >
                View full Research Hub
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {researchHighlights.map((paper, i) => (
              <FadeIn key={paper.title} delay={i * 0.1}>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-5 h-full flex flex-col group"
                >
                  <span className="text-xs font-medium text-navy-700 bg-navy-900/5 px-2.5 py-0.5 rounded-md self-start mb-3">
                    {paper.venue}
                  </span>
                  <h3 className="font-display font-semibold text-navy-900 group-hover:text-dutch-orange transition-colors mb-2">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-auto">
                    {paper.authors}
                  </p>
                </a>
              </FadeIn>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-padding bg-slate-50">
        <div className="section-container">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                About
              </p>
              <h2 className="heading-lg text-navy-900 mb-6">
                From AISIG to SAIN Groningen
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  SAIN Groningen is the local chapter of Safe AI Netherlands in
                  Groningen, and the direct successor of the AI Safety Initiative
                  Groningen (AISIG). Since 2023 it has grown into one of the most
                  active AI Safety communities in Europe.
                </p>
                <p>
                  Originally student-led, the chapter now includes many
                  professionals and has produced research published at venues
                  including NeurIPS and ICLR. We run education programs,
                  discussion groups, events, and connect to SAIN&apos;s national
                  Research Hub.
                </p>
                <p>
                  SAIN Groningen is directed by Tarteel Mohamed. We organise work across four teams: Education, Research,
                  Events, and PR. This is a structure other SAIN chapters are adopting as
                  they spin up.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="mt-16 pt-16 border-t border-slate-200">
            <FadeIn>
              <div className="mb-10 text-center max-w-2xl mx-auto">
                <h2 className="heading-lg text-navy-900 mb-3">SAIN Groningen Team</h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {aisigTeam.map((person, i) => (
                <FadeIn key={person.name} delay={Math.min(i * 0.03, 0.35)}>
                  <div className="card p-4 h-full">
                    <h3 className="font-display font-semibold text-base text-navy-900">
                      {person.name}
                    </h3>
                    <p className="text-sm font-medium text-dutch-orange mt-1.5 leading-snug">
                      {person.title}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join & contact */}
      <section id="join" className="section-padding bg-navy-950">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="heading-lg text-white mb-4">
              Join &amp; contact
            </h2>
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
                href={GRONINGEN_LINKTREE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                All Groningen links (Linktree)
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.28}>
            <p className="text-sm font-medium text-slate-400 mb-4 max-w-2xl mx-auto">
              Email the right team to contact SAIN Groningen
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {groningenContactByRole.map((row) => (
                <a
                  key={row.email}
                  href={`mailto:${row.email}?subject=${encodeURIComponent(`SAIN Groningen: ${row.label}`)}`}
                  className="inline-flex flex-col items-start rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-left text-sm text-white hover:bg-white/10 hover:border-white/35 transition-colors min-w-42"
                  aria-label={`Email ${row.label} to contact SAIN Groningen`}
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
