"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  COURSE_POPUP_VERSION,
  formatCityList,
  openCourseApplications,
} from "@/data/courseApplications";

/* Master switch: set to false to hide the popup site-wide once applications
   close, without removing it from the home page. */
const SHOW_COURSE_POPUP = openCourseApplications.length > 0;

/* Dismissals are stored per popup version, so bumping COURSE_POPUP_VERSION in
   src/data/courseApplications.ts re-shows the popup to everyone who dismissed
   the previous one. */
const DISMISS_KEY = `sain:course-popup-dismissed:${COURSE_POPUP_VERSION}`;

const cityList = formatCityList(openCourseApplications);

const OPEN_DELAY_MS = 1500;

export default function CoursePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!SHOW_COURSE_POPUP) return;

    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISS_KEY) === "true";
    } catch {
      /* Private mode or blocked storage: fall through and show the popup. */
    }
    if (dismissed) return;

    const timer = window.setTimeout(() => setIsOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      /* Nothing to persist to; the popup simply returns on the next visit. */
    }
  }, []);

  /* Lock scroll, trap focus, and close on Escape while open. */
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
        'a[href], button:not([disabled])'
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

  /* Portalled to <body> so no ancestor stacking or overflow context can bury it. */
  if (!SHOW_COURSE_POPUP || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-navy-950/50 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-popup-title"
            aria-describedby="course-popup-description"
            tabIndex={-1}
            className="relative max-h-[calc(100dvh-3rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl outline-hidden"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-5 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-navy-900"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-7 sm:p-9">
              <p className="mb-3 pr-8 text-xs font-semibold uppercase tracking-[0.2em] text-dutch-orange">
                Applications open
              </p>
              <h2
                id="course-popup-title"
                className="pr-8 font-display text-2xl font-bold text-navy-900 sm:text-3xl"
              >
                Join free, in-person AI Safety courses this September!
              </h2>
              <p
                id="course-popup-description"
                className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base"
              >
                Apply today to SAIN’s 6-week courses in {cityList}. Learn
                fundamental concepts in AI safety and governance through
                discussion-based sessions with others interested in the field. <br/>
                Interested? Choose your local city to learn more & apply!
              </p>
              <ul className="mt-5 space-y-1.5 text-sm text-slate-600">
                {openCourseApplications.map((course) => (
                  <li key={course.chapter}>
                    <strong className="font-semibold text-navy-900">
                      {course.chapter}
                    </strong>{" "}
                    — apply by {course.deadlines.participants} (
                    {course.deadlines.facilitators} to facilitate)
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-4 min-[480px]:justify-start">
                <div className="flex flex-wrap justify-center gap-4">
                  {openCourseApplications.map((course) => (
                    <Link
                      key={course.chapter}
                      href={course.href}
                      className="btn-primary"
                    >
                      {course.chapter}
                    </Link>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-navy-900"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
