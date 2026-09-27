"use client";

import { Fragment, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { CaretDown, Check } from "@phosphor-icons/react/dist/ssr";

import { courseApplicationFor } from "@/data/courseApplications";
import { TRACKS } from "@/data/courseTracks";

/**
 * A sentence the reader completes. The tabs ask the reader to know the
 * catalogue; this asks where they are starting from, in their own words, and
 * answers with one track. The rest of the track (its weeks) waits behind a
 * disclosure, so the band opens as a question and a short reply rather than
 * as a syllabus.
 *
 * The blank in the sentence is a button that opens a listbox, the pattern a
 * native select gives, drawn so it reads as part of the sentence. The dotted
 * orange rule and the caret are what say "this is a choice"; the rule turns
 * solid on hover, on focus and while the menu is open.
 *
 * The question guides, it does not gate: every track is open to anyone, and
 * the line under the sentence says so.
 */

/* Each phrase reads on from "I". Grounded in courseTracks: Fundamentals is
   "taught so newcomers can drop in", the technical tracks teach from ARENA,
   CAIS or BlueDot, and the policy track names public-sector people among its
   audience and facilitators. No prerequisite is invented here. */
const ANSWERS = [
  { trackId: "fundamentals", phrase: "am new to AI safety" },
  { trackId: "technical", phrase: "can code, or have a technical background" },
  { trackId: "policy", phrase: "work in policy, law, or the public sector" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/* One tilt per answer, in the community prints' range, so changing the
   sentence visibly lays down a different print. Reduced motion keeps the
   final angle and drops the turn (globals collapse the transition). */
const TILT = ["rotate-[1.5deg]", "rotate-[-1deg]", "rotate-[1deg]"];

export default function ConceptC() {
  const [chosen, setChosen] = useState(0);
  const [open, setOpen] = useState(false);
  /* The option the keyboard is on while the menu is open. */
  const [active, setActive] = useState(0);
  /* The first render shows the default answer without a fade, and the live
     region stays silent: only a choice the reader makes is news. */
  const [touched, setTouched] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();

  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const uid = useId();
  const listId = `${uid}-list`;
  const outlineId = `${uid}-outline`;
  const optionId = (i: number) => `${uid}-option-${i}`;

  const track =
    TRACKS.find((t) => t.id === ANSWERS[chosen].trackId) ?? TRACKS[0];

  const openMenu = () => {
    setActive(chosen);
    setOpen(true);
  };

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  const choose = (i: number) => {
    setTouched(true);
    setChosen(i);
    close(true);
  };

  /* The listbox takes focus when it opens, so arrow keys land on it and a
     screen reader follows aria-activedescendant through the options. */
  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  /* A press anywhere outside the sentence closes the menu without choosing,
     the way a native select does. */
  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const onButtonKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMenu();
    }
  };

  const onListKeyDown = (event: React.KeyboardEvent) => {
    const last = ANSWERS.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: Math.min(active + 1, last),
      ArrowUp: Math.max(active - 1, 0),
      Home: 0,
      End: last,
    };
    if (event.key in moves) {
      event.preventDefault();
      setActive(moves[event.key]);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(active);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close(true);
    } else if (event.key === "Tab") {
      /* Focus travels on as usual; the menu just stops being open. */
      setOpen(false);
    }
  };

  return (
    <div className="bg-white md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-x-12 lg:gap-x-20">
      <div className="min-w-0">
        {/* One step below the band heading, on the role the system keeps for
            quieter turns, so the sentence answers the heading rather than
            competing with it. */}
        <div ref={wrapRef} className="relative">
          {/* The whole sentence is the button, "I" included: a button lays
              out as one inline block, so with "I" outside it a long answer
              wrapped as a unit and left "I" alone on the line above. Only
              the answer carries the rule, so it still reads as the blank. */}
          <button
            ref={buttonRef}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            onClick={() => (open ? close(false) : openMenu())}
            onKeyDown={onButtonKeyDown}
            className="group/blank block max-w-[900px] cursor-pointer text-left font-serif text-heading-sm text-navy"
          >
            I{" "}
            <span
              className={`underline decoration-orange decoration-2 underline-offset-[6px] ${
                open
                  ? "decoration-solid"
                  : "decoration-dotted group-hover/blank:decoration-solid group-focus-visible/blank:decoration-solid"
              }`}
            >
              {ANSWERS[chosen].phrase}
            </span>
            {/* A word joiner keeps the caret with the last word, so it never
                wraps onto a line of its own. */}
            {"\u2060"}
            <CaretDown
              size={17}
              weight="bold"
              aria-hidden="true"
              className={`ml-2 inline-block align-[0.06em] text-navy/55 transition-transform duration-200 group-hover/blank:text-navy ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <motion.ul
              ref={listRef}
              id={listId}
              role="listbox"
              tabIndex={-1}
              aria-label="Where you are starting from"
              aria-activedescendant={optionId(active)}
              onKeyDown={onListKeyDown}
              initial={reduce ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: EASE }}
              /* Anchored to the sentence rather than the blank, so on a phone,
               where the blank can start near the right edge, the menu still
               opens inside the shell. A menu is an object over the page, so
               it earns the navy-tinted shadow; the focus ring would only
               repeat what the highlighted row already shows. */
              className="absolute left-0 top-full z-30 mt-3 w-full max-w-[540px] border border-navy/14 bg-white py-1.5 shadow-[0_12px_32px_#021C4D1F] outline-none"
            >
              {ANSWERS.map((answer, i) => {
                const selected = i === chosen;
                return (
                  <li
                    key={answer.trackId}
                    id={optionId(i)}
                    role="option"
                    aria-selected={selected}
                    onClick={() => choose(i)}
                    onPointerMove={() => setActive(i)}
                    className={`flex cursor-pointer items-baseline gap-3 px-5 py-2.5 font-serif text-title-sm ${
                      i === active ? "bg-cream" : ""
                    } ${selected ? "text-navy" : "text-navy/72"}`}
                  >
                    <span className="w-4 shrink-0 self-center">
                      {selected && (
                        <Check
                          size={16}
                          weight="bold"
                          aria-hidden="true"
                          className="text-orange-ink"
                        />
                      )}
                    </span>
                    <span>
                      <span className="text-navy/45">I </span>
                      {answer.phrase}
                    </span>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </div>

        <p className="mt-2.5 font-sans text-caption text-navy/65">
          Every track is open to anyone. This only suggests where to begin.
        </p>

        <p className="sr-only" aria-live="polite">
          {touched ? `Suggested: start with ${track.title}` : ""}
        </p>

        <motion.div
          /* Keyed on the track, so a new answer mounts a new block. Fade in
           only, as on the tabs: nothing fades out, so no frame holds two
           answers on top of each other. */
          key={track.id}
          initial={touched && !reduce ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="mt-6 border-t border-navy/12 pt-6"
        >
          <div className="flex min-w-0 max-w-[720px] flex-col gap-3">
            <h3 className="font-serif text-title text-navy">
              <span className="text-navy/65">Start with </span>
              {track.title}
            </h3>
            <p className="font-sans text-body text-navy/74">{track.tagline}</p>

            {/* One line of routes. Each city resolves its own chapter anchor
              through courseApplications, so this cannot drift from the
              chapter pages. */}
            <p className="font-sans text-ui text-navy/72">
              Runs in{" "}
              {track.cities.map((entry, i) => (
                <Fragment key={entry.city}>
                  {i > 0 && (i === track.cities.length - 1 ? " and " : ", ")}
                  <Link
                    href={courseApplicationFor(entry.city).href}
                    className="font-serif text-base text-navy underline decoration-navy/25 underline-offset-4 transition-colors duration-200 hover:decoration-navy focus-visible:decoration-navy"
                  >
                    {entry.city}
                  </Link>
                </Fragment>
              ))}
              .
            </p>

            <div>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={outlineId}
                onClick={() => setExpanded((v) => !v)}
                className="group/more mt-1 inline-flex items-center gap-1.5 font-sans text-label text-navy/72 transition-colors hover:text-navy focus-visible:text-navy"
              >
                <span className="underline decoration-navy/25 underline-offset-4 group-hover/more:decoration-navy">
                  See what it covers
                </span>
                <CaretDown
                  size={12}
                  weight="bold"
                  aria-hidden="true"
                  className={`text-navy/45 transition-transform duration-200 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div id={outlineId} hidden={!expanded} className="pt-4">
                <p className="kicker pb-2 text-kicker-sm text-navy/65">
                  {track.outlineTitle}
                </p>
                <ol className="font-sans text-ui text-navy">
                  {track.outline.map((item, n) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-t border-navy/10 py-[7px]"
                    >
                      <span className="w-[22px] shrink-0 font-sans text-xs text-orange-ink">
                        {n + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* A small print on a white mat, set the way the community strip sets
          its photographs: tilted, with the prints' own navy-tinted shadow,
          because it is an object on the page rather than a panel. All three
          photographs stay stacked inside the one mat and cross-dissolve, so
          the print never blanks while the answer swaps. From md only; on a
          phone the reply is the point. */}
      <figure
        aria-hidden="true"
        className={`relative mt-1 hidden w-[240px] shrink-0 bg-white p-2 shadow-[0_7px_22px_#021C4D1F] transition-transform duration-300 md:block lg:w-[300px] ${TILT[chosen]}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {TRACKS.map((t) => (
            <motion.div
              key={t.id}
              initial={false}
              animate={{ opacity: t.id === track.id ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: "linear" }}
              className="absolute inset-0"
            >
              <img
                src={t.photo.replace(/\.jpg$/, `-${t.photoWidths[0]}.jpg`)}
                srcSet={t.photoWidths
                  .map((w) => `${t.photo.replace(/\.jpg$/, `-${w}.jpg`)} ${w}w`)
                  .join(", ")}
                sizes="(min-width: 1024px) 284px, 224px"
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
              <p className="kicker absolute inset-x-0 bottom-0 bg-navy/88 px-3 py-2 text-kicker-sm text-white">
                {t.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </figure>
    </div>
  );
}
