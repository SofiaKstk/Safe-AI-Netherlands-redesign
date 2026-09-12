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
import { Cpu, FileText, GlobeHemisphereWest, UsersThree } from "@phosphor-icons/react/dist/ssr";

/** Shows the hiring banner only while the Research Operations Lead role is open. */
const researchLeadIsOpen = isNationalRoleOpen("research-operations-lead");

const hubFeatures = [
  {
    title: "Supervised Matching",
    description: "We connect talented researchers with PhD+ supervisors for structured, mentored AI Safety research projects.",
    icon: (
      <UsersThree className="w-6 h-6" weight="light" aria-hidden="true" />
    ),
  },
  {
    title: "Compute & Support",
    description: "We provide compute resources and logistical support for open collaborations and research projects.",
    icon: (
      <Cpu className="w-6 h-6" weight="light" aria-hidden="true" />
    ),
  },
  {
    title: "National Network",
    description: "Access the full SAIN network: researchers, advisors, and practitioners across all Dutch chapters.",
    icon: (
      <GlobeHemisphereWest className="w-6 h-6" weight="light" aria-hidden="true" />
    ),
  },
  {
    title: "Publication Track",
    description: "Our community has published at NeurIPS, ICLR, and other top venues. We help you build a strong AI Safety research track record.",
    icon: (
      <FileText className="w-6 h-6" weight="light" aria-hidden="true" />
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
                    <UsersThree className="h-5 w-5" weight="light" aria-hidden="true" />
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
                <a
                  href={supervisor.agenda}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group p-5 h-full flex flex-col transition-[translate,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-navy-900/30 motion-safe:hover:-translate-y-0.5"
                >
                  <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={supervisor.image}
                      alt={supervisor.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 transition-colors group-hover:text-dutch-orange">
                    {supervisor.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mt-1">
                    {supervisor.position}
                  </p>
                  {/* The card itself is the link now, so the destination has to
                      be named for anyone who cannot see the hover state. */}
                  <span className="sr-only">Research agenda (opens in a new tab)</span>
                </a>
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

      {/* Publications. The landing's inverse band links here on a phone
          instead of carrying the whole index itself. */}
      <section id="publications" className="scroll-mt-28 section-padding bg-white">
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
