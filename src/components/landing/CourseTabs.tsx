"use client";

import { useRef, useState } from "react";
import Link from "next/link";

/**
 * Three square tabs over one panel. The active tab is white, carries a 3px
 * orange underline, and turns its mono index orange — three cues, so colour is
 * never the only sign of state.
 */

type Track = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  summary: string;
  outlineTitle: string;
  outline: string[];
  cities: { city: string; detail: string }[];
  cta: { label: string; href: string };
  photo: string;
  photoAlt: string;
  caption: string;
};

const TRACKS: Track[] = [
  {
    id: "fundamentals",
    index: "01",
    title: "AI Safety Fundamentals",
    tagline: "First principles. Drop in any week.",
    summary:
      "A weekly series on risks, technical safety and governance, taught so newcomers can drop in. Three editions in Utrecht have reached more than 100 students, researchers, engineers and public-sector people.",
    outlineTitle: "Weekly themes",
    outline: [
      "Introduction — capabilities, risks, and solution families",
      "Risks and incidents — social harms, misuse, loss of control",
      "Technical AI Safety — oversight, evaluations, interpretability",
      "Regulation and governance — EU AI Act, audits, GPAI duties",
      "Why safety is hard — incentives, funding gaps, race dynamics",
      "Pathways — thesis, fellowship, then a full-time role",
    ],
    cities: [
      {
        city: "Utrecht",
        detail: "Weekly, modular. Drop in for any theme. ~60 min.",
      },
    ],
    cta: { label: "Drop in this week", href: "/chapters/utrecht" },
    photo: "/landing/course-fundamentals.jpg",
    photoAlt: "SAIN Utrecht cohort at graduation",
    caption: "Cohort graduation · SAIN Utrecht",
  },
  {
    id: "technical",
    index: "02",
    title: "Technical Alignment",
    tagline: "ARENA, CAIS or BlueDot, by city.",
    summary:
      "Each chapter runs a technical track, with a different curriculum. Utrecht teaches from ARENA. Groningen uses the Center for AI Safety course. Amsterdam uses BlueDot.",
    outlineTitle: "Utrecht ARENA",
    outline: [
      "Transformers and mechanistic interpretability",
      "Probing and representations — linear probes, SAEs",
      "PPO and RLHF — the alignment pipeline",
      "GRPO and reward hacking — seeing failure modes",
    ],
    cities: [
      {
        city: "Utrecht",
        detail: "ARENA. 4 weeks. Streamed lectures; notebook certificate.",
      },
      {
        city: "Groningen",
        detail:
          "Technical track of AI Safety, Ethics, and Society. 6 weeks, 3–4 cohorts a year.",
      },
      {
        city: "Amsterdam",
        detail: "BlueDot Technical AI Safety. 6 weeks, on-site, application-based.",
      },
    ],
    cta: { label: "Join a technical track", href: "/get-involved#courses" },
    photo: "/landing/course-technical.jpg",
    photoAlt: "Technical alignment workshop in progress",
    caption: "Week 1 · Transformers and interpretability",
  },
  {
    id: "policy",
    index: "03",
    title: "Governance & Policy",
    tagline: "Course or discussion group, by city.",
    summary:
      "Amsterdam runs BlueDot Frontier AI Governance. Groningen runs the governance track of AI Safety, Ethics, and Society. Utrecht hosts a weekly AI Governance & Policy discussion group. Facilitators include researchers, risk consultants, and public-sector people.",
    outlineTitle: "Six-week courses (Groningen and Amsterdam)",
    outline: [
      "The EU AI Act — duties across the lifecycle",
      "Dutch implementation — ministries, regulators, standards",
      "Accountability — audits, evidence, GPAI obligations",
      "Risk management — NIST and frontier evaluation",
      "Case studies — accidents, misuse, institutional lag",
      "Pathways — policy fellowships, ministries, standards bodies",
    ],
    cities: [
      { city: "Utrecht", detail: "Weekly AI Governance & Policy discussion group." },
      {
        city: "Groningen",
        detail: "Governance track of AI Safety, Ethics, and Society. On-site.",
      },
      {
        city: "Amsterdam",
        detail: "BlueDot Frontier AI Governance. On-site, application-based.",
      },
    ],
    cta: { label: "Join your chapter", href: "/get-involved#courses" },
    photo: "/landing/course-policy.jpg",
    photoAlt: "Governance and policy discussion group around a table",
    caption: "Discussion group · Utrecht",
  },
];

export default function CourseTabs() {
  const [activeId, setActiveId] = useState(TRACKS[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = TRACKS.findIndex((track) => track.id === activeId);
  const active = TRACKS[activeIndex];

  /* Arrow keys move between tabs, as a tablist is expected to. */
  const onKeyDown = (event: React.KeyboardEvent) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (activeIndex + delta + TRACKS.length) % TRACKS.length;
    setActiveId(TRACKS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="bg-white">
      <div
        className="grid border-b border-navy/12 md:grid-cols-3"
        role="tablist"
        aria-label="Course tracks"
        onKeyDown={onKeyDown}
      >
        {TRACKS.map((track, i) => {
          const on = track.id === activeId;
          return (
            <button
              key={track.id}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${track.id}`}
              aria-selected={on}
              aria-controls={`panel-${track.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActiveId(track.id)}
              /* The divider belongs to the gap between two tabs, not to either
                 tab's state — hanging it off `on` made it blink on selection. */
              className={`flex min-h-[88px] flex-col justify-center gap-1.5 px-6 py-5 text-left transition-colors ${
                i > 0 ? "md:border-l md:border-l-navy/10" : ""
              } ${
                on
                  ? "border-b-[3px] border-b-orange"
                  : "border-b border-b-navy/12 hover:bg-cream"
              }`}
            >
              <span
                className={`font-mono text-[11px] leading-[14px] tracking-[0.1em] ${
                  on ? "text-orange" : "text-navy/55"
                }`}
              >
                {track.index}
              </span>
              <span
                className={`font-serif text-xl leading-6 ${on ? "text-navy" : "text-navy/72"}`}
              >
                {track.title}
              </span>
              <span className="font-sans text-[13.5px] leading-[18px] text-navy/58">
                {track.tagline}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        tabIndex={0}
        className="grid lg:grid-cols-[720px_1fr]"
      >
        <div className="flex flex-col gap-[18px] px-6 py-8 md:px-8 md:pr-9">
          <p className="max-w-[640px] font-sans text-[15.5px] leading-[25px] text-navy/78">
            {active.summary}
          </p>

          <div>
            <p className="kicker pb-2 text-[15px] leading-5 text-navy/50">{active.outlineTitle}</p>
            <ol className="font-sans text-[14.5px] leading-5 text-navy">
              {active.outline.map((item, i) => (
                <li key={item} className="flex items-baseline gap-3 border-t border-navy/10 py-[7px]">
                  <span className="w-[22px] shrink-0 font-mono text-xs text-orange">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="kicker pb-2 text-[15px] leading-5 text-navy/50">Where you can attend</p>
            {active.cities.map((entry) => (
              <div
                key={entry.city}
                className="flex flex-col gap-1 border-t border-navy/10 py-2 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <span className="w-[108px] shrink-0 font-serif text-base leading-[22px] text-navy">
                  {entry.city}
                </span>
                <span className="font-sans text-[14.5px] leading-[22px] text-navy/72">
                  {entry.detail}
                </span>
              </div>
            ))}
          </div>

          <Link href={active.cta.href} className="btn-ink self-start px-5 py-[13px] text-sm leading-5">
            {active.cta.label}
          </Link>
        </div>

        <div className="relative min-h-[280px] overflow-hidden lg:min-h-[587px]">
          <img
            src={active.photo}
            alt={active.photoAlt}
            className="absolute inset-0 size-full object-cover object-center"
          />
          <p className="kicker absolute inset-x-0 bottom-0 bg-navy/88 px-5 py-2.5 text-[15px] leading-5 text-white">
            {active.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
