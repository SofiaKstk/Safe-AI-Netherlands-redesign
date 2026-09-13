"use client";

import { Fragment, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

/**
 * The landing's disclosure tabs, carrying a chapter's courses instead of the
 * national tracks: square headers over one shared panel, the active one white
 * with a 3px orange underline that slides between them and an orange-ink
 * index, so state is never colour alone.
 *
 * Below md the markup interleaves header and panel, because a strip at the top
 * of a phone screen and a panel below the fold means switching course is a
 * scroll up and a scroll back down. There, one may be closed to nothing; on the
 * strip one is always open.
 */

export type Course = {
  id: string;
  title: string;
  /** One paragraph: what it is, how long, where, what you leave with. */
  summary: string;
  outlineTitle: string;
  outline: string[];
};

/* Written out: Tailwind reads class names as literals, so an interpolated
   column number would never reach the stylesheet. */
const TAB_CELL = ["md:col-start-1", "md:col-start-2", "md:col-start-3"];
const COMPACT = "(max-width: 767.98px)";

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

export default function CourseDisclosure({ courses }: { courses: Course[] }) {
  const [activeId, setActiveId] = useState<string | null>(courses[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const compact = useCompact();
  const reduce = useReducedMotion();

  const toggle = (id: string) =>
    setActiveId((current) => (current === id && compact ? null : id));

  /* Carried back from a phone by a rotation or a resized window. */
  useEffect(() => {
    if (!compact && activeId === null) setActiveId(courses[0].id);
  }, [compact, activeId, courses]);

  const onHeaderKeyDown = (index: number) => (event: React.KeyboardEvent) => {
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + courses.length) % courses.length;
    setActiveId(courses[next].id);
    tabRefs.current[next]?.focus();
  };

  const columns =
    courses.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  const panelSpan =
    courses.length === 2
      ? "md:col-start-1 md:col-end-3 md:row-start-2"
      : "md:col-start-1 md:col-end-4 md:row-start-2";

  return (
    <div
      className={`bg-white md:grid ${columns}`}
      role="group"
      aria-label="Courses in this chapter"
    >
      {courses.map((course, i) => {
        const on = course.id === activeId;
        return (
          <Fragment key={course.id}>
            <button
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              id={`course-${course.id}`}
              aria-expanded={on}
              aria-controls={`course-panel-${course.id}`}
              onClick={() => toggle(course.id)}
              onKeyDown={onHeaderKeyDown(i)}
              className={`relative flex w-full min-h-[88px] items-center gap-4 border-t border-navy/12 px-6 py-5 text-left transition-colors md:flex-col md:items-stretch md:justify-center md:gap-1.5 md:border-t-0 ${
                i > 0 ? "md:border-l md:border-l-navy/10" : ""
              } ${
                on
                  ? "border-b-[3px] border-b-orange md:border-b-transparent"
                  : "border-b-[3px] border-b-transparent hover:bg-cream focus-visible:bg-cream"
              } ${TAB_CELL[i]} md:row-start-1`}
            >
              {on && (
                <motion.span
                  layoutId="chapter-course-indicator"
                  className="absolute inset-x-0 -bottom-[3px] hidden h-[3px] bg-orange md:block"
                  transition={{
                    duration: reduce ? 0 : 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              )}
              <span className="flex min-w-0 flex-1 flex-col gap-1.5 md:contents">
                <span
                  className={`font-sans text-index tracking-normal ${
                    on ? "text-orange-ink" : "text-navy/65"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-serif text-xl leading-6 ${
                    on ? "text-navy" : "text-navy/72"
                  }`}
                >
                  {course.title}
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
              {...(on ? {} : ({ inert: "" } as Record<string, string>))}
              id={`course-panel-${course.id}`}
              role="region"
              aria-labelledby={`course-${course.id}`}
              tabIndex={on ? 0 : -1}
              animate={{ opacity: on ? 1 : 0 }}
              transition={{
                duration: reduce || !on ? 0 : 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`${on ? "flex" : "hidden md:flex"} ${panelSpan} w-full flex-col gap-[18px] px-6 py-8 md:border-t md:border-navy/12 md:px-8 ${
                on ? "" : "pointer-events-none"
              }`}
            >
              <p className="max-w-[var(--container-copy-wide)] font-sans text-[15.5px] leading-[25px] text-navy/78">
                {course.summary}
              </p>

              <div className="max-w-[var(--container-copy-wide)]">
                <p className="kicker pb-2 text-kicker-sm text-navy/65">
                  {course.outlineTitle}
                </p>
                <ol className="font-sans text-ui text-navy">
                  {course.outline.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-t border-navy/10 py-[7px]"
                    >
                      <span className="w-[22px] shrink-0 font-sans text-xs text-orange-ink">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </Fragment>
        );
      })}
    </div>
  );
}
