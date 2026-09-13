/**
 * Course application status, per chapter.
 *
 * Single source of truth for the chapter course pages, the courses page and the
 * landing course tabs, so a cohort is never advertised as open in one place and
 * closed in another.
 *
 * To open or close a cohort: flip `open` for that chapter and edit its
 * deadlines.
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
      /** Written out the way they appear on the page, e.g. "18 September". */
      deadlines: { participants: string; facilitators: string };
    }
  | {
      open: false;
      /** Shown in place of the sign-up CTA while applications are closed. */
      closedNote: string;
    }
);

export const courseApplications: CourseApplication[] = [
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
    open: true,
    deadlines: { participants: "11 September", facilitators: "10 September" },
  },
  {
    chapter: "Utrecht",
    href: "/chapters/utrecht#programs",
    open: true,
    deadlines: { participants: "18 September", facilitators: "15 September" },
  },
];

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

/** "Utrecht", "Utrecht or Groningen", "A, B or C" — for prose. */
export function formatCityList(chapters: readonly { chapter: string }[]): string {
  const names = chapters.map((c) => c.chapter);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} or ${names[names.length - 1]}`;
}
