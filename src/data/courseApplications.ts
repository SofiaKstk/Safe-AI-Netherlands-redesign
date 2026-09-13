/**
 * Course application status, per chapter.
 *
 * Single source of truth for the chapter course pages, the courses page and the
 * landing course tabs, so a cohort is never advertised as open in one place and
 * closed in another.
 *
 * To open or close a cohort: flip `open` for that chapter and edit its
 * deadlines.
 *
 * An open entry also carries `closesAfter`, the later deadline as an ISO date.
 * Every read of this file goes through `resolve` below, which reports the entry
 * as closed once that date has passed. A file nobody remembered to edit can
 * therefore go quiet, but it can never print an expired deadline beside a live
 * apply button. The site is a static export, so "now" is the build date: a
 * rebuild is what retires a lapsed cohort.
 */

/** Shared intake form for participants and facilitators, all chapters. */
export const COURSE_APPLICATION_URL =
  "https://sainonboard.fillout.com/t/4fQyZTbTCAus";

export type ChapterName = "Amsterdam" | "Groningen" | "Utrecht";

export type CourseApplication = {
  chapter: ChapterName;
  /** Anchor into the chapter page's Programs section. */
  href: string;
} & (
  | {
      open: true;
      /** Written out the way they appear on the page, with the year, e.g.
       *  "18 September 2026". The year is not decoration: a date without one
       *  reads as ambiguous rather than expired once it has passed. */
      deadlines: { participants: string; facilitators: string };
      /** The later of the two deadlines, ISO `YYYY-MM-DD`, for the guard. */
      closesAfter: string;
      /** Stands in for `closedNote` once the deadlines above have passed. */
      lapsedNote?: string;
    }
  | {
      open: false;
      /** Shown in place of the sign-up CTA while applications are closed. */
      closedNote: string;
    }
);

const DEFAULT_LAPSED_NOTE = "Sign ups for the next cohort will open soon.";

/**
 * An entry whose deadlines have passed reports closed, whatever the file says.
 * This is the one place the guard lives, so no page has to remember it.
 */
function resolve(entry: CourseApplication): CourseApplication {
  if (!entry.open) return entry;
  const closes = new Date(`${entry.closesAfter}T23:59:59`);
  if (Number.isNaN(closes.getTime()) || closes.getTime() >= Date.now()) {
    return entry;
  }
  return {
    chapter: entry.chapter,
    href: entry.href,
    open: false,
    closedNote: entry.lapsedNote ?? DEFAULT_LAPSED_NOTE,
  };
}

const cohorts: CourseApplication[] = [
  {
    chapter: "Amsterdam",
    href: "/chapters/amsterdam#programs",
    open: false,
    closedNote:
      "Sign ups for the next cohort will open in October.",
  },
  {
    chapter: "Groningen",
    href: "/chapters/groningen#programs",
    /* The 11 September cohort has closed. Reopen this entry with the next
       cohort's real dates rather than leaving a passed deadline reading as
       open: every page that renders this file promises the reader that open
       here means open on the chapter's page. */
    open: false,
    closedNote: "Sign ups for the next cohort will open soon.",
  },
  {
    chapter: "Utrecht",
    href: "/chapters/utrecht#programs",
    open: true,
    deadlines: {
      participants: "18 September 2026",
      facilitators: "15 September 2026",
    },
    closesAfter: "2026-09-18",
  },
];

export const courseApplications: CourseApplication[] = cohorts.map(resolve);

export function courseApplicationFor(chapter: ChapterName): CourseApplication {
  const entry = courseApplications.find((c) => c.chapter === chapter);
  if (!entry) throw new Error(`No course application entry for ${chapter}`);
  return entry;
}

export type OpenCourseApplication = Extract<CourseApplication, { open: true }>;

/** Chapters currently taking applications, for the popup and shared CTAs. */
export const openCourseApplications = courseApplications.filter(
  (c): c is OpenCourseApplication => c.open,
);

/** "Utrecht", "Utrecht or Groningen", "A, B or C", for prose. */
export function formatCityList(chapters: readonly { chapter: string }[]): string {
  const names = chapters.map((c) => c.chapter);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} or ${names[names.length - 1]}`;
}
