"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { hasOpenPositions } from "@/data/openPositions";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import {
  COURSE_APPLICATION_URL,
  courseApplications,
  openCourseApplications,
} from "@/data/courseApplications";

const INFO_EMAIL = "info@safeainetherlands.org";

type Activity = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  cities: { name: string; href: string }[];
  icon: ReactNode;
  /* Set for activities that run in application cycles. Drives both the status
     dots and the sign-up CTA, which share one intake form across chapters.
     Which chapters are open lives in src/data/courseApplications.ts. */
  tracksApplications?: boolean;
};

const activities: Activity[] = [
  {
    id: "courses",
    title: "Courses",
    subtitle: "AI Safety, Ethics, and Society",
    description:
      "We facilitate a curriculum based on the Center for AI Safety course in two tracks: Technical and Governance. The courses are free and run in 6-week blocks with weekly readings and on-site discussion sessions, covering everything from mechanistic interpretability to AI policy.",
    details: [
      "Technical and Governance tracks",
      "6 weeks per block, 3-4 cohorts per year",
      "2h readings + 2h discussion per week",
      "Certificate upon completion",
    ],
    cities: [
      { name: "Groningen", href: "/chapters/groningen" },
      { name: "Amsterdam", href: "/chapters/amsterdam" },
      { name: "Utrecht", href: "/chapters/utrecht" },
    ],
    tracksApplications: true,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a23.838 23.838 0 0 0-2.471.261c.128.132.24.272.339.42a23.798 23.798 0 0 1 2.132-.68m15.482 0a23.838 23.838 0 0 1 2.471.261c-.128.132-.24.272-.339.42a23.798 23.798 0 0 0-2.132-.68M6.906 7.917A3.001 3.001 0 0 1 9 5.25h6a3.001 3.001 0 0 1 2.094 2.667m-9.188 0a23.936 23.936 0 0 1 9.188 0" />
      </svg>
    ),
  },
  {
    id: "discussion-groups",
    title: "Discussion Groups",
    subtitle: "Weekly deep-dives into AI Safety topics",
    description:
      "Focused groups meeting weekly to discuss, learn, and collaborate on specific AI Safety topics. Each group has at least one experienced mentor guiding the conversation. Topics range from mechanistic interpretability to AI governance and neuroscience-inspired alignment.",
    details: [
      "~2 hours per week",
      "Mentored by experienced researchers",
      "Topics: Interpretability, Governance, Neuralignment, and more",
      "Open to all levels of experience",
    ],
    cities: [
      { name: "Groningen", href: "/chapters/groningen" },
      { name: "Amsterdam", href: "/chapters/amsterdam" },
      { name: "Utrecht", href: "/chapters/utrecht" },
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    id: "events",
    title: "Events",
    subtitle: "Hackathons, talks, and community meetups",
    description:
      "From research hackathons with Apart Research to expert talks, pub quizzes, and AI Safety Chats, our chapters host regular events that bring the community together and create real impact.",
    details: [
      "Research hackathons (with global placement track record)",
      "Expert speaker events and seminars",
      "Social events: pub quizzes, AI Safety Chats",
      "TEDx presentations and conference talks",
    ],
    cities: [
      { name: "Groningen", href: "/chapters/groningen" },
      { name: "Amsterdam", href: "/chapters/amsterdam" },
      { name: "Utrecht", href: "/chapters/utrecht" },
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
];

/* Dot beside a chapter in an activity's "Available in" list. An activity that
   runs in application cycles is strictly open or closed; everything else just
   runs, with no cycle to be outside of. A chapter missing from
   courseApplications falls back to "Running" rather than claiming to be open. */
function cityStatus(activity: Activity, cityName: string) {
  const application = activity.tracksApplications
    ? courseApplications.find((c) => c.chapter === cityName)
    : undefined;

  if (!application) return { dotClass: "bg-emerald-500", label: "Running" };

  return application.open
    ? { dotClass: "bg-emerald-500", label: "Applications open" }
    : { dotClass: "bg-red-500", label: "Applications closed" };
}

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #021c4d 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        <div className="section-container relative z-10">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-4">
              Get Involved
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-navy-900 max-w-3xl mb-6">
              There&apos;s a place for you in SAIN
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              Whether you&apos;re a researcher, student, policymaker, or
              concerned citizen, AI Safety needs diverse perspectives. Join us
              in building a safer future with AI.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              {hasOpenPositions ? (
                <Link href="/open-positions" className="btn-primary">
                  See open positions
                </Link>
              ) : (
                <a
                  href={`mailto:${INFO_EMAIL}?subject=Joining SAIN`}
                  className="btn-primary"
                >
                  Join the team
                </a>
              )}
              <a href="#activities" className="btn-outline">
                Browse our activities
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Open positions pointer */}
      <section
        id={hasOpenPositions ? "open-positions" : "join-team"}
        className="bg-slate-50 section-padding scroll-mt-32"
      >
        <div className="section-container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-center">
            <FadeIn className="lg:col-span-2">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-dutch-orange">
                  Join the team
                </p>
                {hasOpenPositions ? (
                  <>
                    <h2 className="heading-lg mb-4 text-navy-900">
                      Open positions across SAIN
                    </h2>
                    <p className="text-slate-600 leading-relaxed max-w-2xl">
                      SAIN Amsterdam is building its founding team and SAIN
                      Utrecht is hiring across most of its teams. Volunteer
                      roles, three to ten hours per week. One short application
                      form: name, CV, and a motivation letter.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="heading-lg mb-4 text-navy-900">
                      There is always an open application
                    </h2>
                    <p className="text-slate-600 leading-relaxed max-w-2xl">
                      SAIN is run by volunteers across Amsterdam, Utrecht, and
                      Groningen. We do not always list specific roles, but if you
                      are genuinely interested in contributing, send us your CV
                      and a short motivation letter.
                    </p>
                  </>
                )}
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:justify-self-end">
              <div>
                {hasOpenPositions ? (
                  <Link href="/open-positions" className="btn-primary">
                    See all open positions
                  </Link>
                ) : (
                  <a
                    href={`mailto:${INFO_EMAIL}?subject=Joining SAIN`}
                    className="btn-primary"
                  >
                    Email {INFO_EMAIL}
                  </a>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section id="activities" className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                What We Do
              </p>
              <h2 className="heading-lg text-navy-900">
                Activities across our chapters
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-12">
            {activities.map((activity, i) => (
              <FadeIn key={activity.title} delay={i * 0.1}>
                <div id={activity.id} className="card p-8 md:p-10 scroll-mt-32">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-dutch-orange/10 text-dutch-orange flex items-center justify-center shrink-0">
                          {activity.icon}
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-xl text-navy-900">
                            {activity.title}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {activity.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {activity.description}
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {activity.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-2 text-sm text-slate-500"
                          >
                            <svg
                              className="w-4 h-4 text-dutch-orange shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                      {activity.tracksApplications && (
                        <div className="mt-6">
                          {openCourseApplications.length > 0 ? (
                            <a
                              href={COURSE_APPLICATION_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary"
                            >
                              Sign up
                            </a>
                          ) : (
                            <p className="text-slate-500">
                              Applications are currently closed but sign ups for
                              the next cohort will re-open soon.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="lg:border-l lg:border-slate-100 lg:pl-8">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                        Available in
                      </h4>
                      <div className="space-y-3">
                        {activity.cities.map((city) => {
                          const status = cityStatus(activity, city.name);
                          return (
                            <Link
                              key={city.name}
                              href={city.href}
                              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-dutch-orange/5 transition-colors group"
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-2 h-2 rounded-full ${status.dotClass}`}
                                  title={status.label}
                                />
                                <span className="text-sm font-medium text-navy-900 group-hover:text-dutch-orange transition-colors">
                                  SAIN {city.name}
                                </span>
                              </div>
                              <svg
                                className="w-4 h-4 text-slate-300 group-hover:text-dutch-orange transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                              </svg>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-12 text-center">
              <a
                href={COMMUNITY_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Join the community
              </a>
              <p className="mt-3 text-sm text-slate-400">
                Choose the chapter and the
                activities you want to take part in
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Research Hub Pointer */}
      <section id="research-hub" className="section-padding scroll-mt-32 bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-dutch-orange/10 text-dutch-orange flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Research
              </p>
              <h2 className="heading-lg text-navy-900 mb-4">
                SAIN Research Hub
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto mb-8">
                Join the SAIN Research Hub and get matched with PhD+ supervisors
                for impactful AI Safety projects across interpretability,
                evaluation, governance, and more. Open to members from all
                chapters.
              </p>
              <Link href="/research" className="btn-primary">
                Explore the Research Hub
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Start a Chapter */}
      <section id="start-chapter" className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  Start a Chapter
                </p>
                <h2 className="heading-lg text-navy-900 mb-4">
                  Bring SAIN to your city
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto">
                  Starting a local SAIN chapter is one of the best ways multiply your impact when it comes to AI safety. We provide everything you need to get
                  started.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h3 className="font-display font-semibold text-lg text-navy-900 mb-6">
                  What SAIN provides to new chapters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    "The SAIN brand and national recognition",
                    "Operational playbooks and handbooks",
                    "Course curriculum and facilitation guides",
                    "Google Workspace and digital infrastructure",
                    "One-on-one mentorship from experienced organizers",
                    "Outreach templates and media support",
                    "No need for separate legal entity registration",
                    "Connection to the national network",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-600"
                    >
                      <svg
                        className="w-4 h-4 text-dutch-orange shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>

                <h3 className="font-display font-semibold text-lg text-navy-900 mb-4">
                  How to get started
                </h3>
                <ol className="space-y-3 mb-8">
                  {[
                    "Reach out to us expressing your interest in starting a chapter",
                    "SAIN's board guides you through the founding process",
                    "Set up your local communication channels (WhatsApp, Slack, etc.)",
                    "Launch your chapter page on the SAIN website",
                    "Do initial outreach in your city",
                    "Run your first meetup or event",
                    "Consider running the AI Safety, Ethics, and Society course",
                  ].map((step, i) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <span className="w-6 h-6 rounded-full bg-dutch-orange/10 text-dutch-orange text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                <div className="text-center">
                  <a
                    href="mailto:info@safeainetherlands.org?subject=Starting a SAIN chapter"
                    className="btn-primary"
                  >
                    Express Interest
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Donate disabled until SAIN has a donation flow ready. */}
      {false && (
      <section id="donate" className="section-padding bg-navy-950">
        <div className="section-container text-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-4">
              Support Our Work
            </p>
            <h2 className="heading-lg text-white mb-4">
              Help us build the Netherlands&apos; AI Safety ecosystem
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              Your donation directly funds courses, research compute, events,
              and the infrastructure that powers AI Safety work across the
              Netherlands.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:donate@safeainetherlands.org?subject=Donation to SAIN"
                className="btn-primary text-base px-8 py-3.5"
              >
                Donate Now
              </a>
              <a
                href="mailto:info@safeainetherlands.org?subject=Funding SAIN"
                className="btn-secondary text-base px-8 py-3.5"
              >
                Discuss Funding
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
      )}

      {/* Newsletter */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-xl mx-auto text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Stay Updated
              </p>
              <h2 className="heading-md text-navy-900 mb-4">
                Subscribe to our newsletter
              </h2>
              <p className="text-slate-500 mb-6">
                Weekly articles on AI Safety from a range of perspectives.
                Research updates, event announcements, and more.
              </p>
              <a
                href="https://safeainetherlands.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Subscribe on Substack
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
