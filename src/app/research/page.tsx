"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import {
  ROLES,
  isNationalRoleOpen,
  nationalPosting,
} from "@/data/openPositions";
import {
  publications,
  supervisors,
  RESEARCH_EMAIL,
  RESEARCH_INTEREST_FORM_URL,
} from "@/data/research";

/** Shows the hiring banner only while the Research Operations Lead role is open. */
const researchLeadIsOpen = isNationalRoleOpen("research-operations-lead");

const hubFeatures = [
  {
    title: "Supervised Matching",
    description: "We connect talented researchers with PhD+ supervisors for structured, mentored AI Safety research projects.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    title: "Compute & Support",
    description: "We provide compute resources and logistical support for open collaborations and research projects.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    title: "National Network",
    description: "Access the full SAIN network: researchers, advisors, and practitioners across all Dutch chapters.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.466.732-3.558" />
      </svg>
    ),
  },
  {
    title: "Publication Track",
    description: "Our community has published at NeurIPS, ICLR, and other top venues. We help you build a strong AI Safety research track record.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
];

export default function ResearchPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pb-20 pt-16 md:pb-28 md:pt-20 bg-white overflow-hidden">
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
              Research Hub
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-navy-900 max-w-3xl mb-6">
              Advancing AI Safety research in the Netherlands
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-8">
              The SAIN Research Hub connects talented researchers with
              experienced supervisors, providing mentorship, compute, and
              community to produce impactful AI Safety research.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/research/handbook" className="btn-primary">
                Read Research Hub Handbook
              </Link>
              <Link href="#supervisors" className="btn-outline">
                View supervisors
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-navy-900">6+</span>
                Active Projects
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-navy-900">20+</span>
                Researchers
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-navy-900">12+</span>
                Publications
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* We're hiring — national Research Lead */}
      {researchLeadIsOpen ? (
        <section className="bg-white pt-10">
          <div className="section-container">
            <FadeIn>
              <div className="flex flex-col gap-5 rounded-2xl border border-dutch-orange/30 bg-linear-to-br from-dutch-orange/6 to-transparent p-6 md:flex-row md:items-center md:justify-between md:p-7">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dutch-orange/15 text-dutch-orange">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-dutch-orange">
                      We&apos;re hiring
                    </p>
                    <h2 className="font-display text-xl font-semibold text-navy-900 md:text-2xl">
                      {ROLES["research-operations-lead"].title}
                    </h2>
                    <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-600">
                      A paid, full-time role leading the Research Hub across
                      every SAIN chapter. Make it flourish end to end and build it into the place where Dutch AI
                      safety research talent gets matched, mentored, and published.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3 md:justify-end">
                  <Link
                    href={`/open-positions#${nationalPosting.slug}`}
                    className="btn-primary"
                  >
                    See position
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      ) : null}

      {/* How It Works */}
      <section id="how-it-works" className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                How It Works
              </p>
              <h2 className="heading-lg text-navy-900 mb-4">
                A structured path to AI Safety research
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Whether you&apos;re a student looking for your first research
                experience or a PhD looking to mentor the next generation, the
                Research Hub has a place for you.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hubFeatures.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-dutch-orange/10 text-dutch-orange flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Supervisors */}
      <section id="supervisors" className="section-padding bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Supervisors
              </p>
              <h2 className="heading-lg text-navy-900 mb-4">
                Research guidance from experienced mentors
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Research Hub participants can work with supervisors across
                technical AI safety, governance, complex systems, and related
                fields.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {supervisors.map((supervisor, i) => (
              <FadeIn key={supervisor.name} delay={i * 0.1}>
                <div className="card p-5 h-full flex flex-col">
                  <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={supervisor.image}
                      alt={supervisor.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-navy-900">
                    {supervisor.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mt-1 mb-5">
                    {supervisor.position}
                  </p>
                  <a
                    href={supervisor.agenda}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto text-sm font-semibold text-dutch-orange hover:text-dutch-orange-dark transition-colors flex items-center gap-1"
                  >
                    Research Agenda
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.25}>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-display font-semibold text-2xl text-navy-900 mb-3">
                  Join as a researcher
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  If you want to be supervised or join an open collaboration
                  project, fill in the expression of interest form. If you are
                  unsure where you fit, email us and we&apos;ll help route you.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={RESEARCH_INTEREST_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Fill in the research form
                  </a>
                  <a
                    href={`mailto:${RESEARCH_EMAIL}?subject=${encodeURIComponent("Research Hub: joining as a researcher")}`}
                    className="btn-outline"
                  >
                    Email research team
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-display font-semibold text-2xl text-navy-900 mb-3">
                  Become a supervisor
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  If you are interested in supervising AI Safety research
                  projects through SAIN, email the Research Hub and we&apos;ll
                  follow up with next steps.
                </p>
                <a
                  href={`mailto:${RESEARCH_EMAIL}?subject=${encodeURIComponent("Research Hub: becoming a supervisor")}`}
                  className="btn-primary"
                >
                  Become a supervisor
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Publications */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Publications
              </p>
              <h2 className="heading-lg text-navy-900 mb-4">
                Research from our community
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Our researchers publish at top venues including NeurIPS, ICLR,
                and compete in international AI Safety hackathons.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {publications.map((paper, i) => (
              <FadeIn key={paper.title} delay={Math.min(i * 0.05, 0.4)}>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-5 h-full flex flex-col group"
                >
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-navy-900/5 text-xs font-medium text-navy-700">
                      {paper.venue}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 mb-2 leading-snug group-hover:text-dutch-orange transition-colors">
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
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-950">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="heading-lg text-white mb-4">
              Contribute to AI Safety research
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
              Whether you want to join a supervised project, contribute to an
              open collaboration, or supervise AI Safety research, here are the
              clearest next steps.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto text-left">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-display font-semibold text-2xl text-white mb-3">
                  Join as a researcher
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  If you want to be supervised or join an open collaboration
                  project, fill in the expression of interest form. If you are
                  unsure where you fit, email us and we&apos;ll help route you.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={RESEARCH_INTEREST_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Fill in the research form
                  </a>
                  <a
                    href={`mailto:${RESEARCH_EMAIL}?subject=${encodeURIComponent("Research Hub: joining as a researcher")}`}
                    className="btn-secondary"
                  >
                    Email research team
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-display font-semibold text-2xl text-white mb-3">
                  Become a supervisor
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  If you are interested in supervising AI Safety research
                  projects through SAIN, email the Research Hub and we&apos;ll
                  follow up with next steps.
                </p>
                <a
                  href={`mailto:${RESEARCH_EMAIL}?subject=${encodeURIComponent("Research Hub: becoming a supervisor")}`}
                  className="btn-primary"
                >
                  Become a supervisor
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
