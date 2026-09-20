"use client";

import { Fragment, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react/dist/ssr";

/**
 * Three cities over one calendar.
 *
 * There is no machine-readable feed of upcoming events anywhere in this repo.
 * What each chapter keeps is a live Luma calendar, so the honest thing the site
 * can do is put the three of them behind one strip of tabs rather than send a
 * reader through three chapter pages to find out what is on this week.
 *
 * The chrome is SAIN's: square headers, the sliding 3px orange underline from
 * the course tabs, a hairline frame. The interior is Luma's and will not match
 * the system, which is the trade for the calendar being live rather than a
 * screenshot of a Tuesday that has passed.
 *
 * A panel is mounted the first time its tab is opened and then kept, hidden,
 * when the reader moves on. Mounting only the open one meant every switch
 * tore down a Luma document and loaded a fresh one: the band flashed cream,
 * then Luma's white, then the events, and going back to a city did it all
 * again. Nothing loads for a tab nobody has opened.
 */

type City = {
  id: string;
  city: string;
  /** Luma calendar id behind the embed. */
  calendar: string;
  /** The chapter's public Luma page, for readers who want the whole thing. */
  publicUrl: string;
  publicLabel: string;
};

const CITIES: City[] = [
  {
    id: "utrecht",
    city: "Utrecht",
    calendar: "cal-2gYun0D26BriJ5z",
    publicUrl: "https://lu.ma/sain-utrecht-events",
    publicLabel: "See the full Utrecht calendar on Luma",
  },
  {
    id: "groningen",
    city: "Groningen",
    calendar: "cal-jjqTmBdWcqoyEUF",
    publicUrl: "https://luma.com/user/SAINGroningen",
    publicLabel: "See the full Groningen calendar on Luma",
  },
  {
    id: "amsterdam",
    city: "Amsterdam",
    calendar: "cal-WD5xl5IYLpY7xNm",
    publicUrl: "https://luma.com/user/SAIN_Amsterdam",
    publicLabel: "See the full Amsterdam calendar on Luma",
  },
];

/* Row one, one column each. Written out because Tailwind reads class names as
   literals and cannot see an interpolated column number. */
const TAB_CELL = ["md:col-start-1", "md:col-start-2", "md:col-start-3"];

/* Row two, spanning all three columns: the open panel takes this one cell. */
const PANEL_CELL = "md:col-start-1 md:col-end-4 md:row-start-2";

export default function CalendarTabs() {
  const [activeId, setActiveId] = useState(CITIES[0].id);
  const [visited, setVisited] = useState<string[]>([CITIES[0].id]);
  const open = (id: string) => {
    setActiveId(id);
    setVisited((ids) => (ids.includes(id) ? ids : [...ids, id]));
  };
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  /* Arrow keys move between headers, and only between headers: the panel below
     holds a third-party document with its own keys. */
  const onHeaderKeyDown = (index: number) => (event: React.KeyboardEvent) => {
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + CITIES.length) % CITIES.length;
    open(CITIES[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      className="border border-navy/10 bg-white md:grid md:grid-cols-3"
      role="group"
      aria-label="Chapter calendars"
    >
      {CITIES.map((entry, i) => {
        const on = entry.id === activeId;
        return (
          <Fragment key={entry.id}>
            <button
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              id={`calendar-tab-${entry.id}`}
              aria-expanded={on}
              /* Only the open panel is mounted, so only the open header may
                 point at one: an aria-controls naming an id that is not in the
                 document sends assistive tech looking for nothing. */
              aria-controls={on ? `calendar-panel-${entry.id}` : undefined}
              onClick={() => open(entry.id)}
              onKeyDown={onHeaderKeyDown(i)}
              /* The divider belongs to the gap between two headers, not to
                 either header's state. Stacked, it runs above each one. */
              className={`relative flex min-h-[64px] w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors md:justify-start ${
                i > 0 ? "border-t border-navy/10 md:border-t-0 md:border-l md:border-l-navy/10" : ""
              } ${
                on
                  ? /* The desktop indicator is a shared-layout element sliding
                       between headers. Stacked there is nothing to slide along,
                       so the rule is drawn plainly as the seam between a header
                       and the calendar it just opened. */
                    "bg-white border-b-[3px] border-b-orange md:border-b-transparent"
                  : "border-b-[3px] border-b-transparent hover:bg-cream focus-visible:bg-cream"
              } ${TAB_CELL[i]} md:row-start-1`}
            >
              {on && (
                <motion.span
                  layoutId="calendar-tab-indicator"
                  className="absolute inset-x-0 -bottom-[3px] hidden h-[3px] bg-orange md:block"
                  transition={{
                    duration: reduce ? 0 : 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              )}
              <span
                className={`font-serif text-xl leading-6 ${on ? "text-navy" : "text-navy/72"}`}
              >
                {entry.city}
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

            {visited.includes(entry.id) && (
              <div
                id={`calendar-panel-${entry.id}`}
                role="region"
                aria-labelledby={`calendar-tab-${entry.id}`}
                hidden={!on}
                /* Stacked, the open header's own orange rule is already the
                   seam; a navy hairline under it would be a second line. */
                className={`${PANEL_CELL} md:border-t md:border-navy/10`}
              >
                {/* Its own scrollport, and a fixed height: a third-party
                    document is not allowed to decide how tall this band is, nor
                    to hand its width back to the page body. White, the same
                    ground Luma's light theme paints, so the embed does not
                    flash from cream to white as it arrives. */}
                <div className="h-[560px] w-full overflow-auto bg-white md:h-[680px]">
                  <iframe
                    src={`https://luma.com/embed/calendar/${entry.calendar}/events?lt=light`}
                    title={`Upcoming SAIN ${entry.city} events`}
                    loading="lazy"
                    className="h-full w-full border-0"
                    allowFullScreen
                  />
                </div>
                <p className="border-t border-navy/10 px-6 py-4">
                  <a
                    href={entry.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                  >
                    {entry.publicLabel}
                    <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
