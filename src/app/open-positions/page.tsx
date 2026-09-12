import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import {
  APPLICATION_REVIEW,
  APPLICATION_TIMELINE,
  ROLES,
  TEAM_LABELS,
  TEAM_ORDER,
  type Role,
  type Team,
  buildApplicationUrl,
  chapterPositions,
  hasOpenPositions,
  isChapterRecruiting,
  isNationalRecruiting,
  nationalPosting,
  openNationalPostings,
  recruitingChapters,
} from "@/data/openPositions";

const INFO_EMAIL = "info@safeainetherlands.org";

export const metadata: Metadata = hasOpenPositions
  ? {
      title: "Open Positions",
      description:
        "Volunteer roles open across SAIN's chapters. Apply with your CV and a short motivation letter.",
    }
  : {
      title: "Join SAIN",
      description:
        "Interested in volunteering with Safe AI Netherlands? There is always an open application — get in touch.",
    };

type GroupedPosting = {
  team: Team;
  roles: Array<{ role: Role; positions?: number; note?: string }>;
};

function groupByTeam(
  postings: NonNullable<
    (typeof chapterPositions)[number]["postings"]
  >
): GroupedPosting[] {
  const byTeam = new Map<Team, GroupedPosting["roles"]>();
  for (const posting of postings) {
    const role = ROLES[posting.roleId];
    if (!role) continue;
    const list = byTeam.get(role.team) ?? [];
    list.push({ role, positions: posting.positions, note: posting.note });
    byTeam.set(role.team, list);
  }
  return TEAM_ORDER.filter((team) => byTeam.has(team)).map((team) => ({
    team,
    roles: byTeam.get(team)!,
  }));
}

function RoleCard({
  role,
  note,
  chapterSlug,
  applyUrl: applyUrlOverride,
}: {
  role: Role;
  note?: string;
  chapterSlug?: string;
  applyUrl?: string;
}) {
  const applyUrl =
    applyUrlOverride ??
    buildApplicationUrl({
      chapter: chapterSlug,
      role: role.formRoleValue ?? role.title,
    });
  
    return (
    <details className="group rounded-2xl border border-slate-200 bg-white open:border-dutch-orange/40 open:shadow-md">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 md:p-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h4 className="font-display text-lg font-semibold text-navy-900">
              {role.title}
            </h4>
            {role.employment ? (
              <span className="ml-1 inline-flex items-center rounded-full bg-dutch-orange/10 px-2.5 py-0.5 text-xs font-semibold text-dutch-orange">
                {role.employment.badge}
              </span>
            ) : null}
            {role.commitmentBadge ? (
              <span className="ml-1 inline-flex items-center rounded-full bg-dutch-orange/10 px-2.5 py-0.5 text-xs font-semibold text-dutch-orange">
                {role.commitmentBadge}
              </span>
            ) : null}
            {role.specialisationOf ? (
              <span className="ml-1 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                Specialisation of {role.specialisationOf}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {role.timeCommitment}. Reports to {role.reportsTo}.
          </p>
          {role.employment ? (
            <p className="mt-1 text-sm text-slate-500">
              {role.employment.location}.
            </p>
          ) : null}
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {role.mission}
          </p>
          {note ? (
            <p className="mt-2 text-sm italic text-slate-500">{note}</p>
          ) : null}
        </div>
        <span
          aria-hidden
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-transform group-open:rotate-45 group-open:border-dutch-orange/40 group-open:text-dutch-orange"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </summary>

      <div className="border-t border-slate-100 px-5 pb-6 pt-5 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-5 md:col-span-2">
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Key responsibilities
              </h5>
              <ul className="mt-3 space-y-2">
                {role.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-relaxed text-slate-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dutch-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {role.goodFitIf?.length ? (
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  You may be a good fit if you
                </h5>
                <ul className="mt-3 space-y-2">
                  {role.goodFitIf.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-slate-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dutch-orange" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {role.alsoStrong?.length ? (
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Strong candidates may also have
                </h5>
                <ul className="mt-3 space-y-2">
                  {role.alsoStrong.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-slate-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="space-y-5">
            {role.preferredBackground ? (
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Preferred background
                </h5>
                <dl className="mt-3 space-y-2 text-sm text-slate-600">
                  {role.preferredBackground.field ? (
                    <div>
                      <dt className="font-semibold text-navy-900">Field</dt>
                      <dd>{role.preferredBackground.field}</dd>
                    </div>
                  ) : null}
                  {role.preferredBackground.level ? (
                    <div>
                      <dt className="font-semibold text-navy-900">Level</dt>
                      <dd>{role.preferredBackground.level}</dd>
                    </div>
                  ) : null}
                  {role.preferredBackground.experience ? (
                    <div>
                      <dt className="font-semibold text-navy-900">Experience</dt>
                      <dd>{role.preferredBackground.experience}</dd>
                    </div>
                  ) : null}
                  {role.preferredBackground.softSkills ? (
                    <div>
                      <dt className="font-semibold text-navy-900">Soft skills</dt>
                      <dd>{role.preferredBackground.softSkills}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            ) : null}
            {role.employment ? (
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  What we offer
                </h5>
                <dl className="mt-3 space-y-2 text-sm text-slate-600">
                  <div>
                    <dt className="font-semibold text-navy-900">Salary</dt>
                    <dd>{role.employment.salary}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-navy-900">Contract</dt>
                    <dd>{role.employment.contract}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-navy-900">Start date</dt>
                    <dd>{role.employment.startDate}</dd>
                  </div>
                </dl>
                <ul className="mt-3 space-y-2">
                  {role.employment.benefits.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-slate-600"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-dutch-orange"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Key collaborations
              </h5>
              <p className="mt-2 text-sm text-slate-600">
                {role.collaborations}
              </p>
            </div>
          </div>
        </div>

        {role.applicationProcess?.length ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Application process
            </h5>
            <ol className="mt-3 space-y-3">
              {role.applicationProcess.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dutch-orange/10 text-xs font-bold text-dutch-orange">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-slate-600">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Apply for this role
          </a>
          <span className="self-center text-xs text-slate-400">
            {applyUrlOverride
              ? ""
              : role.specialisationOf
                ? `Pre-fills the form's "${role.specialisationOf}" option. Mention "${role.title}" in your motivation letter.`
                : "Opens the application form, pre-filled with this role."}
          </span>
        </div>
      </div>
    </details>
  );
}

/**
 * Shown when no chapter is recruiting: the role listings and the timeline are
 * both hidden, and the route keeps working as a standing
 * open-application page instead of 404ing on existing links.
 */
function StandingApplication() {
  return (
    <>
      <section className="relative overflow-hidden bg-white pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #021c4d 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        <div className="section-container relative z-10">
          <FadeIn>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-dutch-orange">
              Join SAIN
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl mb-6 max-w-3xl text-navy-900">
              There is always an open application
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-500">
              SAIN is a volunteer organisation. Our chapters in Amsterdam,
              Utrecht, and Groningen are powered by people who care about the
              development and integration of AI going well in the Netherlands
              and abroad. We do not always list specific roles, but if you are
              genuinely interested in contributing, we would love to hear from
              you.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${INFO_EMAIL}?subject=Joining SAIN`}
                className="btn-primary"
              >
                Email {INFO_EMAIL}
              </a>
              <Link href="/get-involved" className="btn-outline">
                Browse ways to get involved
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-slate-50 section-padding">
        <div className="section-container">
          <FadeIn>
            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 md:p-10">
              <h2 className="heading-md mb-4 text-navy-900">How to apply</h2>
              <p className="mb-6 text-slate-600 leading-relaxed">
                Send us an email with a short introduction, your CV, and a brief
                motivation letter. Tell us which chapter you are interested in
                (Amsterdam, Utrecht, or Groningen) and what draws you to SAIN.
                We will get back to you as soon as we can.
              </p>
              <a
                href={`mailto:${INFO_EMAIL}?subject=Joining SAIN`}
                className="btn-primary"
              >
                Get in touch
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

export default function OpenPositionsPage() {
  if (!hasOpenPositions) {
    return <StandingApplication />;
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #021c4d 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        <div className="section-container relative z-10">
          <FadeIn>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-dutch-orange">
              Open Positions
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl mb-6 max-w-3xl text-navy-900">
              Join SAIN
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mb-6 max-w-2xl text-lg leading-relaxed text-slate-500">
              SAIN is a volunteer organisation. Our chapters in Amsterdam,
              Utrecht, and Groningen are powered by people who care about the
              development and integration of AI going well in the Netherlands and abroad.
              These are the roles we are currently hiring for.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="mb-8 inline-flex flex-wrap items-center gap-3 rounded-2xl border border-dutch-orange/30 bg-dutch-orange/5 px-5 py-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dutch-orange/15 text-dutch-orange">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                  />
                </svg>
              </span>
              <div className="text-sm leading-snug">
                <p className="font-semibold uppercase tracking-wider text-dutch-orange">
                  {APPLICATION_REVIEW.label}
                </p>
                <p className="text-navy-900">{APPLICATION_REVIEW.sentence}</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3">
              {isNationalRecruiting ? (
                <a
                  href={`#${nationalPosting.slug}`}
                  className="rounded-full border border-dutch-orange/40 bg-dutch-orange/5 px-4 py-2 text-sm font-semibold text-dutch-orange transition-colors hover:bg-dutch-orange/10"
                >
                  {nationalPosting.name}
                </a>
              ) : null}
              {recruitingChapters.map((c) => (
                <a
                  key={c.chapterSlug}
                  href={`#chapter-${c.chapterSlug.toLowerCase()}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-navy-900 transition-colors hover:border-dutch-orange/40 hover:text-dutch-orange"
                >
                  {c.chapterName}
                </a>
              ))}
              <a
                href="#how-to-apply"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-navy-900 transition-colors hover:border-dutch-orange/40 hover:text-dutch-orange"
              >
                How to apply
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How to apply + timeline */}
      <section id="how-to-apply" className="bg-slate-50 section-padding scroll-mt-32">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-dutch-orange">
                  How to apply
                </p>
                <h2 className="heading-md mb-4 text-navy-900">
                  One application, any chapter, any role
                </h2>
                <p className="mb-4 text-slate-600 leading-relaxed">
                  All chapter applications go through the same short form. You
                  will pick the chapter and the role, attach your CV, and write
                  a short motivation letter (one page is plenty). Your
                  application is sent to the SAIN national inbox and the
                  chapter you applied to.
                </p>
                {isNationalRecruiting ? (
                  <p className="mb-6 text-slate-600 leading-relaxed">
                    <a
                      href={`#${nationalPosting.slug}`}
                      className="font-semibold text-dutch-orange hover:underline"
                    >
                      {nationalPosting.name}
                    </a>{" "}
                    roles are not tied to a chapter and have their own form and
                    application process.
                  </p>
                ) : null}
                <ul className="mb-8 space-y-3 text-sm text-slate-600">
                  {[
                    "Name and email",
                    "Chapter (Amsterdam, Utrecht, Groningen)",
                    "Role(s) you are applying for",
                    "CV (PDF)",
                    "Short motivation letter (PDF or text)",
                    "Optional: LinkedIn or portfolio link",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-dutch-orange"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={buildApplicationUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Open application form
                  </a>
                  <Link href="/contact" className="btn-outline">
                    Or get in touch first
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-dutch-orange">
                  Timeline
                </p>
                <h3 className="heading-md mb-2 text-navy-900">What happens next</h3>
                <p className="mb-6 text-sm text-slate-500">
                  Applications are reviewed {APPLICATION_REVIEW.phrase}.
                </p>
                <ol className="space-y-5">
                  {APPLICATION_TIMELINE.map((step, i) => (
                    <li key={step.label} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dutch-orange/10 text-sm font-bold text-dutch-orange">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="font-display font-semibold text-navy-900">
                          {step.label}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* National (SAIN-wide) positions — above the chapter sections */}
      {isNationalRecruiting ? (
        <section
          id={nationalPosting.slug}
          className="section-padding scroll-mt-32 bg-white"
        >
          <div className="section-container">
            <FadeIn>
              <div className="rounded-3xl border border-dutch-orange/30 bg-linear-to-br from-dutch-orange/6 to-transparent p-6 md:p-10">
                <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-dutch-orange">
                      Organisation-wide
                    </p>
                    <h2 className="heading-lg mb-4 text-navy-900">
                      {nationalPosting.name}
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                      {nationalPosting.blurb}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-3">
                    <a
                      href={`mailto:${nationalPosting.inboxEmail}?subject=National open positions at SAIN`}
                      className="btn-outline"
                    >
                      {nationalPosting.inboxEmail}
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  {openNationalPostings.map(({ roleId, note, applyUrl }) => {
                    const role = ROLES[roleId];
                    if (!role) return null;
                    return (
                      <RoleCard
                        key={role.id}
                        role={role}
                        note={note}
                        applyUrl={applyUrl}
                      />
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      ) : null}

      {/* Chapter sections */}
      {chapterPositions.map((chapter) => {
        const isRecruiting = isChapterRecruiting(chapter.chapterSlug);
        const grouped = chapter.postings ? groupByTeam(chapter.postings) : [];
        return (
          <section
            id={`chapter-${chapter.chapterSlug.toLowerCase()}`}
            key={chapter.chapterSlug}
            className="section-padding scroll-mt-32 bg-white"
          >
            <div className="section-container">
              <FadeIn>
                <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-dutch-orange">
                      {isRecruiting ? "Now recruiting" : "Currently at capacity"}
                    </p>
                    <h2 className="heading-lg mb-4 text-navy-900">
                      {chapter.chapterName}
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                      {chapter.blurb}
                    </p>
                  </div>
                  {isRecruiting ? (
                    <div className="flex shrink-0 flex-wrap gap-3">
                      <a
                        href={buildApplicationUrl({
                          chapter: chapter.chapterSlug,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        Apply for SAIN {chapter.chapterSlug}
                      </a>
                      <a
                        href={`mailto:${chapter.inboxEmail}?subject=Open positions ${chapter.chapterSlug}`}
                        className="btn-outline"
                      >
                        {chapter.inboxEmail}
                      </a>
                    </div>
                  ) : (
                    <div>
                      <a
                        href={`mailto:${chapter.inboxEmail}?subject=Future openings at SAIN ${chapter.chapterSlug}`}
                        className="btn-outline"
                      >
                        {chapter.inboxEmail}
                      </a>
                    </div>
                  )}
                </div>
              </FadeIn>

              {isRecruiting ? (
                <div className="space-y-12">
                  {grouped.map((group) => (
                    <FadeIn key={group.team}>
                      <div>
                        <div className="mb-5 flex items-center gap-3">
                          <h3 className="font-display text-xl font-semibold text-navy-900">
                            {TEAM_LABELS[group.team]}
                          </h3>
                          <span className="h-px flex-1 bg-slate-200" />
                        </div>
                        <div className="space-y-3">
                          {group.roles.map(({ role, note }) => (
                            <RoleCard
                              key={role.id}
                              role={role}
                              note={note}
                              chapterSlug={chapter.chapterSlug}
                            />
                          ))}
                        </div>
                      </div>
                    </FadeIn>
                  ))}

                  <FadeIn>
                    <div>
                      <div className="mb-5 flex items-center gap-3">
                        <h3 className="font-display text-xl font-semibold text-navy-900">
                          Other
                        </h3>
                        <span className="h-px flex-1 bg-slate-200" />
                      </div>
                      <div className="rounded-2xl border border-dutch-orange/30 bg-linear-to-br from-dutch-orange/5 to-transparent p-5 md:p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="max-w-2xl">
                            <h4 className="font-display text-lg font-semibold text-navy-900">
                              Open application
                            </h4>
                            <p className="mt-1 text-sm text-slate-500">
                              Don&apos;t see a role that fits? Apply anyway.
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                              Interested in AI safety and excited about joining
                              SAIN {chapter.chapterSlug}, but none of the roles
                              above quite suit you? We highly recommend
                              applying regardless. Tell us about yourself and
                              what draws you to SAIN in your motivation letter,
                              and we&apos;ll figure out together what works
                              well for you.
                            </p>
                          </div>
                          <a
                            href={buildApplicationUrl({
                              chapter: chapter.chapterSlug,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary shrink-0"
                          >
                            Apply
                          </a>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              ) : chapter.closedNote ? (
                <FadeIn delay={0.1}>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                    <p className="text-slate-600">{chapter.closedNote}</p>
                  </div>
                </FadeIn>
              ) : 
              null}
            </div>
          </section>
        );
      })}

      {/* Final CTA */}
      <section className="section-padding bg-navy-950">
        <div className="section-container text-center">
          <FadeIn>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-dutch-orange">
              Ready to apply?
            </p>
            <h2 className="heading-lg mb-4 text-white">
              One form. Any chapter. Any role.
            </h2>
            <p className="mx-auto mb-3 max-w-2xl text-lg text-slate-300">
              Send us your CV and a short motivation letter. We will get back to
              you within two to three weeks.
            </p>
            <p className="mx-auto mb-8 max-w-2xl text-sm font-semibold uppercase tracking-widest text-dutch-orange">
              Applications reviewed {APPLICATION_REVIEW.phrase}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={buildApplicationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Open application form
              </a>
              <Link
                href="/contact"
                className="btn-secondary px-8 py-3.5 text-base"
              >
                Contact a chapter directly
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
