"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, X as XIcon } from "@phosphor-icons/react/dist/ssr";

import {
  courseApplications,
  formatCityList,
  openCourseApplications,
} from "@/data/courseApplications";

/**
 * The course announcement, shown once per cohort.
 *
 * It appears only while at least one chapter is taking applications, so the
 * data file is the switch: close the last cohort and the popup is gone
 * site-wide. A reader who dismisses it is not asked again for that cohort;
 * the dismissal is stored against the open chapters and their deadlines, so
 * the next cohort, with new dates, shows it once more without anyone editing
 * a version string.
 *
 * Design review: append `?preview-popup` to any URL and it opens regardless
 * of the data and of any dismissal. Closed chapters then show their closed
 * note in place of a deadline, so the layout can be judged with real copy.
 *
 * The chrome is the system's: a white sheet with square corners on a navy
 * scrim, italic kicker with the 7px orange square, serif heading with the
 * cities on a subheading line, hairline rows for the deadlines, one accent
 * button per open city, and a plain text link to put it off. Nothing rounded,
 * nothing glassy.
 */

const OPEN_DELAY_MS = 1500;
const PREVIEW_PARAM = "preview-popup";

/* One key per cohort: the open chapters and their participant deadlines. */
const DISMISS_KEY = `sain:course-popup-dismissed:${openCourseApplications
  .map((c) => `${c.chapter}:${c.deadlines.participants}`)
  .join("|")}`;

export default function CoursePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has(PREVIEW_PARAM);
    setPreview(forced);
    if (forced) {
      setIsOpen(true);
      return;
    }
    if (openCourseApplications.length === 0) return;

    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISS_KEY) === "true";
    } catch {
      /* Blocked storage: show it, and it simply returns next visit. */
    }
    if (dismissed) return;

    const timer = window.setTimeout(() => setIsOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (preview) return;
    try {
      window.localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      /* Nothing to persist to. */
    }
  }, [preview]);

  /* Scroll lock, focus trap, Escape. */
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen, close]);

  if (typeof document === "undefined") return null;

  /* Open chapters lead. In preview every chapter is listed so the closed
     state can be seen too. */
  const listed = preview
    ? [...courseApplications].sort((a, b) => Number(b.open) - Number(a.open))
    : openCourseApplications;
  const open = listed.filter((c) => c.open);
  const cities = formatCityList(open.length ? open : listed);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-navy/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            onClick={close}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-popup-title"
            aria-describedby="course-popup-description"
            tabIndex={-1}
            className="relative max-h-[calc(100dvh-2rem)] w-full max-w-[560px] overflow-y-auto bg-white shadow-[0_18px_60px_#021C4D40] outline-none"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-5 inline-flex size-10 items-center justify-center text-navy/60 transition-colors hover:text-navy focus-visible:text-navy"
            >
              <XIcon size={18} weight="light" aria-hidden="true" />
            </button>

            <div className="px-7 pb-8 pt-7 sm:px-9 sm:pb-9 sm:pt-8">
              <p className="kicker flex items-center gap-3 pr-10 text-kicker-sm text-navy/65">
                <span className="size-[7px] shrink-0 bg-orange" aria-hidden="true" />
                {open.length ? "Applications open" : "Courses"}
              </p>
              <h2
                id="course-popup-title"
                className="mt-4 max-w-[440px] pr-6 font-serif text-heading-sm text-navy"
              >
                Free AI Safety courses, in person.
              </h2>
              {/* The cities on their own line, so the heading stays two lines
                  whether one chapter is open or all three. */}
              <p className="mt-2 font-serif text-title-sm text-navy/72">
                In {cities}.
              </p>
              <p
                id="course-popup-description"
                className="mt-4 max-w-[480px] font-sans text-caption leading-[22px] text-navy/74"
              >
                A few weeks of reading and discussion with people entering the
                field, taught by SAIN&rsquo;s chapters. No previous background is
                needed, and every programme is free. Pick your city to see the
                course and apply.
              </p>

              <ul role="list" className="mt-6 border-b border-navy/10">
                {listed.map((course) => (
                  <li
                    key={course.chapter}
                    className="flex flex-col gap-1 border-t border-navy/10 py-3 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span className="font-serif text-title-sm text-navy sm:w-[120px] sm:shrink-0">
                      {course.chapter}
                    </span>
                    {course.open ? (
                      <span className="font-sans text-footnote text-navy/65">
                        Participants by {course.deadlines.participants}
                        <span aria-hidden="true" className="px-2 text-navy/25">
                          ·
                        </span>
                        Facilitators by {course.deadlines.facilitators}
                      </span>
                    ) : (
                      <span className="font-sans text-footnote text-navy/65">
                        Applications are closed. {course.closedNote}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="flex flex-wrap gap-3">
                  {(open.length ? open : listed).map((course) => (
                    <Link
                      key={course.chapter}
                      href={course.href}
                      onClick={close}
                      className={`${open.length ? "btn-accent" : "btn-outline-ink"} gap-2`}
                    >
                      {course.chapter}
                      <ArrowRight size={16} weight="regular" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="font-sans text-label text-navy/65 underline decoration-navy/25 underline-offset-4 transition-colors hover:text-navy hover:decoration-navy focus-visible:decoration-navy"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
