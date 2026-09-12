import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import {
  groningenEventYears,
  groningenEventsArchive,
} from "@/data/groningenEventsArchive";

export const metadata: Metadata = {
  title: "SAIN Groningen Events Archive",
  description:
    "The Groningen events archive, preserving historical AISIG and SAIN Groningen events.",
};

export default function GroningenEventsArchivePage() {
  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-navy-950 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(/photos/cities/groningen-hero.jpg)` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/75 to-navy-950/55"
          aria-hidden="true"
        />

        <div className="section-container relative z-10">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/chapters/groningen"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                SAIN Groningen
              </Link>
              <span className="text-slate-500">/</span>
              <span className="text-sm text-dutch-orange">Events archive</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl max-w-4xl mb-6">
              The archive
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
              A complete Groningen events archive. Everything before April 30th
              2026 was organized under AISIG; everything after that continues
              under SAIN Groningen.
            </p>
          </FadeIn>
        </div>
      </section>

      <section id="archive-events" className="section-padding bg-slate-50 scroll-mt-28">
        <div className="section-container">
          <div className="space-y-12">
            {groningenEventYears.map((year) => {
              const events = groningenEventsArchive.filter(
                (event) => event.date.includes(year),
              );

              return (
                <div key={year}>
                  <FadeIn>
                    <div className="mb-6 flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-2">
                          Year
                        </p>
                        <h2 className="heading-md text-navy-900">{year}</h2>
                      </div>
                      <span className="text-sm font-medium text-slate-500">
                        {events.length} events
                      </span>
                    </div>
                  </FadeIn>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event, index) => (
                      <FadeIn
                        key={`${event.title}-${event.date}`}
                        delay={Math.min(index * 0.03, 0.18)}
                      >
                        <article className="h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs transition-shadow hover:shadow-md">
                          <div className="relative aspect-16/10 overflow-hidden bg-slate-200">
                            <Image
                              src={event.image}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover select-none pointer-events-none"
                              draggable={false}
                            />
                          </div>
                          <div className="p-6">
                            <p className="text-xs font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                              {event.date}
                              {event.time ? ` | ${event.time}` : ""}
                            </p>
                            <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">
                              {event.title}
                            </h3>
                            <div className="space-y-3 text-sm leading-relaxed text-slate-600">
                              {event.description.split("\n\n").map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                              ))}
                            </div>
                          </div>
                        </article>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
