"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";

interface ChapterPlaceholderProps {
  city: string;
  description: string;
  universityContext?: string;
}

export default function ChapterPlaceholder({
  city,
  description,
  universityContext,
}: ChapterPlaceholderProps) {
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
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/"
                className="text-sm text-slate-400 hover:text-navy-900 transition-colors"
              >
                SAIN
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-sm text-dutch-orange">{city}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-navy-900 max-w-3xl mb-6">
              SAIN {city}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-sm text-amber-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Coming Soon
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <div className="w-20 h-20 rounded-2xl bg-dutch-orange/10 flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-dutch-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="heading-lg text-navy-900 mb-4">
                AI Safety is coming to {city}
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-slate-500 leading-relaxed mb-4">
                {description}
              </p>
            </FadeIn>

            {universityContext && (
              <FadeIn delay={0.25}>
                <p className="text-slate-500 leading-relaxed mb-8">
                  {universityContext}
                </p>
              </FadeIn>
            )}

            <FadeIn delay={0.3}>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-left mb-8">
                <h3 className="font-display font-semibold text-navy-900 mb-4">
                  What a SAIN {city} chapter could look like
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "AI Safety, Ethics, and Society course",
                    "Weekly discussion groups",
                    "Technical hackathons and workshops",
                    "Speaker events and seminars",
                    "Research projects with mentorship",
                    "Connection to national SAIN network",
                    "Shared infrastructure and resources",
                    "Local community building",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-dutch-orange shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-slate-600 mb-6">
                Interested in leading SAIN {city}? We provide everything you
                need: brand, infrastructure, curriculum, mentorship, and more.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`mailto:info@safeainetherlands.org?subject=Starting SAIN ${city}`}
                  className="btn-primary"
                >
                  Get Involved in {city}
                </a>
                <Link href="/get-involved#start-chapter" className="btn-outline">
                  Learn About Starting a Chapter
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* See Other Chapters */}
      <section className="section-padding bg-slate-50">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="heading-md text-navy-900 mb-4">
              Explore active chapters
            </h2>
            <p className="text-slate-500 mb-8">
              While SAIN {city} is launching soon, you can explore what our
              active chapters are doing.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="/chapters/groningen" className="btn-primary">
              Visit SAIN Groningen
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
