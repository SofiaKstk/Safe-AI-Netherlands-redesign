"use client";

import { Fragment, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

/**
 * Three square tabs over one panel. The active tab is white, carries a 3px
 * orange underline, and turns its mono index orange — three cues, so colour is
 * never the only sign of state.
 *
 * On a phone the strip and the panel were far enough apart that switching
 * track meant scrolling up to the tabs and back down to read, so the markup
 * interleaves: header, its panel, header, its panel. Below md that is the
 * reading order, and each track opens under its own header. From md up the
 * grid lifts the three headers into row one and drops every panel into row
 * two, stacked in one cell, which is the strip the desktop already had.
 *
 * That interleaving is why this is a disclosure group rather than a tablist:
 * a tablist owns only tabs, and these headers have their panels between them.
 * One is always open, so it still behaves the way the tabs did.
 */

/* Row one, one column each. Written out because Tailwind reads class names as
   literals and cannot see an interpolated column number. */
const TAB_CELL = ["md:col-start-1", "md:col-start-2", "md:col-start-3"];

/* Row two, spanning all three columns: every panel shares this one cell. */
const PANEL_CELL = "md:col-start-1 md:col-end-4 md:row-start-2";

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
  /** Rungs on disk for `photo`. See scripts/generate-responsive-images.mjs. */
  photoWidths: number[];
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
    cta: { label: "Join the fundamentals series", href: "/chapters/utrecht" },
    photo: "/landing/course-fundamentals.jpg",
    photoWidths: [640, 960, 1280, 1920],
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
        detail:
          "BlueDot Technical AI Safety. 6 weeks, on-site, application-based.",
      },
    ],
    cta: { label: "Join a technical track", href: "/get-involved#courses" },
    photo: "/landing/course-technical.jpg",
    photoWidths: [640, 960, 1280, 1920],
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
      {
        city: "Utrecht",
        detail: "Weekly AI Governance & Policy discussion group.",
      },
      {
        city: "Groningen",
        detail: "Governance track of AI Safety, Ethics, and Society. On-site.",
      },
      {
        city: "Amsterdam",
        detail: "BlueDot Frontier AI Governance. On-site, application-based.",
      },
    ],
    cta: { label: "Join a governance track", href: "/get-involved#courses" },
    photo: "/landing/course-policy.jpg",
    photoWidths: [640],
    photoAlt: "Governance and policy discussion group around a table",
    caption: "Discussion group · Utrecht",
  },
];

const COMPACT = "(max-width: 767.98px)";

/**
 * True while the headers are a stacked list rather than a strip.
 *
 * The server snapshot is `false`, so this only ever reports the strip until
 * the browser has said otherwise. That is safe because nothing here reaches
 * the markup — it decides what a click does, not what renders — so there is
 * no hydration to mismatch.
 */
function useCompact() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(COMPACT);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(COMPACT).matches,
    () => false,
  );
}

export default function CourseTabs() {
  const [activeId, setActiveId] = useState<string | null>(TRACKS[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const compact = useCompact();

  /* Closing to nothing is right on a phone: the headers are a list, an open
     panel is most of the screen, and a reader who has finished with a track
     wants the other two back. On the strip it would leave three tabs pointing
     at an empty band, so there one is always open. */
  const toggle = (id: string) =>
    setActiveId((current) => (current === id && compact ? null : id));

  /* Carried back from a phone by a rotation or a resized window. */
  useEffect(() => {
    if (!compact && activeId === null) setActiveId(TRACKS[0].id);
  }, [compact, activeId]);

  const activeIndex = TRACKS.findIndex((track) => track.id === activeId);
  const reduce = useReducedMotion();

  /* Arrow keys still move between headers. Worth keeping: on desktop they are
     a single focus row, and nothing on a phone sends an arrow key. */
  const onKeyDown = (event: React.KeyboardEvent) => {
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (activeIndex + delta + TRACKS.length) % TRACKS.length;
    setActiveId(TRACKS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      className="bg-white md:grid md:grid-cols-3"
      role="group"
      aria-label="Course tracks"
      onKeyDown={onKeyDown}
    >
      {TRACKS.map((active, i) => {
        const on = active.id === activeId;
        return (
          <Fragment key={active.id}>
            <button
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              id={`tab-${active.id}`}
              aria-expanded={on}
              aria-controls={`panel-${active.id}`}
              onClick={() => toggle(active.id)}
              /* The divider belongs to the gap between two tabs, not to either
                 tab's state — hanging it off `on` made it blink on selection.
                 Stacked, that rule runs above each header instead. */
              className={`relative flex w-full min-h-[88px] items-center gap-4 border-t border-navy/12 px-6 py-5 text-left transition-colors md:flex-col md:items-stretch md:justify-center md:gap-1.5 md:border-t-0 ${
                i > 0 ? "md:border-l md:border-l-navy/10" : ""
              } ${
                on
                  ? /* The desktop indicator is a shared-layout element that
                       slides between tabs. Stacked there is nothing to slide
                       along, and the rule reads as the seam between a header
                       and the panel it just opened, so it is drawn plainly. */
                    "border-b-[3px] border-b-orange md:border-b-transparent"
                  : "border-b-[3px] border-b-transparent hover:bg-cream focus-visible:bg-cream"
              } ${TAB_CELL[i]} md:row-start-1`}
            >
              {on && (
                <motion.span
                  layoutId="course-tab-indicator"
                  className="absolute inset-x-0 -bottom-[3px] hidden h-[3px] bg-orange md:block"
                  transition={{
                    duration: reduce ? 0 : 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              )}
              {/* A column of label beside the caret, dissolving back into the
                  button's own column once the headers become a strip. */}
              <span className="flex min-w-0 flex-1 flex-col gap-1.5 md:contents">
                <span
                  className={`font-sans text-[11px] leading-[14px] tracking-normal ${
                    on ? "text-orange" : "text-navy/65"
                  }`}
                >
                  {active.index}
                </span>
                <span
                  className={`font-serif text-xl leading-6 ${on ? "text-navy" : "text-navy/72"}`}
                >
                  {active.title}
                </span>
                <span className="font-sans text-[13.5px] leading-[18px] text-navy/65">
                  {active.tagline}
                </span>
              </span>
              <CaretDown
                size={13}
                weight="bold"
                aria-hidden="true"
                className={`shrink-0 text-navy/45 transition-transform duration-200 md:hidden ${
                  on ? "rotate-180" : ""
                }`}
              />
            </button>

            <motion.div
              initial={false}
              aria-hidden={!on}
              /* `inert`, not `visibility: hidden`. Hiding the outgoing panel took it
           off screen on the first frame, so nothing ever crossfaded; inert
           keeps it painted while it fades but out of the tab order and the
           accessibility tree. Stacked there is no crossfade to protect, so the
           closed panel leaves the flow outright and the next header rises to
           meet the one above it. */
              {...(on ? {} : ({ inert: "" } as Record<string, string>))}
              id={`panel-${active.id}`}
              role="region"
              aria-labelledby={`tab-${active.id}`}
              tabIndex={on ? 0 : -1}
              className={`${on ? "grid" : "hidden md:grid"} ${PANEL_CELL} md:border-t md:border-navy/12 xl:grid-cols-[minmax(0,720px)_minmax(0,1fr)] ${
                on ? "" : "pointer-events-none"
              }`}
            >
            <motion.div
              /* Fade in only. The outgoing column leaves instantly, so no frame
                 ever holds two sets of glyphs on top of each other, and there is
                 no empty gap to sit through either: this ease-out front-loads,
                 putting the incoming text past 60% opacity in roughly 40ms. The
                 fade-out and the wait between the two were what read as abrupt.
                 The photograph crossfading underneath carries the continuity. */
              initial={false}
              animate={{ opacity: on ? 1 : 0 }}
              transition={{
                duration: reduce || !on ? 0 : 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex w-full max-w-[860px] flex-col gap-[18px] px-6 py-8 md:order-none md:px-8 md:pr-9 xl:max-w-none"
            >
              <p className="max-w-[640px] font-sans text-[15.5px] leading-[25px] text-navy/78">
                {active.summary}
              </p>

              <div>
                <p className="kicker pb-2 text-[15px] leading-5 text-navy/65">
                  {active.outlineTitle}
                </p>
                <ol className="font-sans text-[14.5px] leading-5 text-navy">
                  {active.outline.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-t border-navy/10 py-[7px]"
                    >
                      <span className="w-[22px] shrink-0 font-sans text-xs text-orange">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <p className="kicker pb-2 text-[15px] leading-5 text-navy/65">
                  Where you can attend
                </p>
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

              <Link
                href={active.cta.href}
                className="btn-ink mt-auto self-start px-5 py-[13px] text-sm leading-5"
              >
                {active.cta.label}
              </Link>
            </motion.div>

            {/* The photograph keeps its cross-dissolve, so the largest mass on the
            panel never blanks while the text is swapping underneath it. */}
            <motion.div
              initial={false}
              animate={{ opacity: on ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: "linear" }}
              className="relative order-first min-h-[280px] overflow-hidden md:order-none xl:min-h-[587px]"
            >
              <img
                src={active.photo.replace(/\.jpg$/, `-${active.photoWidths[0]}.jpg`)}
                srcSet={active.photoWidths
                  .map((w) => `${active.photo.replace(/\.jpg$/, `-${w}.jpg`)} ${w}w`)
                  .join(", ")}
                /* Full shell width while the panel is stacked; the right-hand
                   column once it splits at xl, which caps at 624 in the 1440
                   canvas. */
                sizes="(min-width: 1440px) 624px, (min-width: 1280px) calc(100vw - 816px), 100vw"
                alt={active.photoAlt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover object-center"
              />
              <p className="kicker absolute inset-x-0 bottom-0 bg-navy/88 px-5 py-2.5 text-[15px] leading-5 text-white">
                {active.caption}
              </p>
            </motion.div>
          </motion.div>
        </Fragment>
        );
      })}
    </div>
  );
}
