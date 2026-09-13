/**
 * Open positions content for the /open-positions page.
 *
 * Source of truth for role descriptions: working_docs/foundations/06_role_templates.md
 * Roles here are written as marketing-friendly distillations that still reflect
 * the full template (mission, responsibilities, preferred background, collaborations).
 *
 * To open or close a position for a chapter, edit `chapterPositions` below.
 * For roles that belong to SAIN Netherlands as a whole rather than to a single
 * chapter, edit `nationalPosting`.
 */

// -----------------------------------------------------------------------------
// Application form (Google Form)
// -----------------------------------------------------------------------------

/**
 * Single Google Form for all chapters and roles.
 *
 * PRE-SHIP BLOCKER (checked 13 September 2026): fetching the URL below returns
 * HTTP 401 with an ordinary browser user agent, which means the form is not
 * publicly readable: it is either restricted to signed-in or in-organisation
 * Google accounts, or it no longer exists. A public form answers 200. Every
 * chapter apply button on /open-positions points here, so before this page
 * ships someone has to open the form in a logged-out browser and confirm an
 * outside applicant can reach and submit it. If they cannot, point the chapter
 * apply CTAs at the chapter inboxes until the form is public.
 *
 * SETUP NOTES:
 * - Form fields: Name, Email, Chapter (Amsterdam / Utrecht), Role(s), CV upload,
 *   Motivation letter upload (or long-text), LinkedIn (optional), availability.
 * - Email routing: configure a Google Apps Script trigger on form submission
 *   that emails info@safeainetherlands.org plus the relevant chapter inbox
 *   (infoams@ or infoutr@) based on the "Chapter" answer. Apps Script template
 *   is left as an action item for whoever sets up the form. Until that trigger
 *   exists the page must not promise where an application lands, so the
 *   routing sentence has been taken out of the how-to-apply copy.
 * - Pre-fill: this URL is appended with `&entry.<id>=<value>` to pre-select the
 *   chapter and role for the applicant. Until the form exists, the URL below is
 *   a placeholder that links to the contact page so the page is never broken.
 */
export const APPLICATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfp_XJWTbIUzf7szLlq4pe_RXUYxeK8B1SzKt5TUwkREmINtA/viewform";

/**
 * Application form for the Research Operations Lead role only.
 *
 * National roles do not go through the chapter Google Form: each one has its
 * own form, because the questions are role-specific rather than
 * chapter-and-role shaped. This Airtable form is for the Research Operations
 * Lead and nothing else. Give any future national role its own URL rather
 * than reusing this one.
 */
export const RESEARCH_OPERATIONS_LEAD_APPLICATION_FORM_URL =
  "https://airtable.com/appMwcwhDIpVSvLrz/pagfucm2gVY91sjPg/form";

/**
 * Pre-fill entry IDs for the Google Form. Still unconfirmed: replace with the
 * real IDs read off a pre-filled link from the live form (open the form, use
 * "Get pre-filled link", and read the entry ids out of the resulting URL).
 * Google silently drops unknown entry keys, so a wrong id costs the applicant
 * nothing except a field they fill in themselves. Nothing on the page promises
 * the pre-fill until these are verified.
 */
export const FORM_PREFILL = {
  chapterEntryId: "entry.2132087508",
  roleEntryId: "entry.542644840",
};

export function buildApplicationUrl(opts?: {
  chapter?: string;
  role?: string;
}): string {
  const url = new URL(APPLICATION_FORM_URL);
  url.searchParams.set("usp", "pp_url");
  if (opts?.chapter) {
    url.searchParams.set(FORM_PREFILL.chapterEntryId, opts.chapter);
  }
  if (opts?.role) {
    url.searchParams.set(FORM_PREFILL.roleEntryId, opts.role);
  }
  return url.toString();
}

/**
 * Exact text of the Communications Team Member option in the Google Form.
 * Web Designer, Content Creator, and Graphic Designer are presented as
 * distinct roles on the website but pre-fill this single form option, since
 * they are specialisations of the Communications Team Member role.
 */
export const COMMS_TEAM_FORM_VALUE =
  "Communications Team member (general or Web Designer, Content Creator, Graphic Designer, Photographer)";

// -----------------------------------------------------------------------------
// Role catalogue
// -----------------------------------------------------------------------------

export type Team =
  | "directors"
  | "education"
  | "events"
  | "communications"
  | "community"
  | "outreach"
  | "research";

export const TEAM_LABELS: Record<Team, string> = {
  directors: "Chapter Leadership",
  education: "Education",
  events: "Events",
  communications: "Communications",
  community: "Community",
  outreach: "Outreach",
  research: "Research",
};

export const TEAM_ORDER: Team[] = [
  "directors",
  "education",
  "events",
  "communications",
  "community",
  "outreach",
  "research",
];

export type Role = {
  id: string;
  title: string;
  team: Team;
  scope: "chapter" | "national";
  reportsTo: string;
  timeCommitment: string;
  /**
   * Short pill shown next to the role title to flag the shape of the
   * commitment, e.g. "Part-time". Shares the accent pill style with
   * `employment.badge` but is independent of it: setting this does not mark
   * the role as salaried or add the terms and benefits block.
   */
  commitmentBadge?: string;
  mission: string;
  responsibilities: string[];
  /**
   * Structured background for volunteer roles. Paid staff roles use the
   * bullet-style `goodFitIf` / `alsoStrong` instead, matching how the job
   * posting itself is written.
   */
  preferredBackground?: {
    field?: string;
    level?: string;
    experience?: string;
    softSkills?: string;
  };
  /** "You may be a good fit if you..." — rendered instead of `preferredBackground`. */
  goodFitIf?: string[];
  /** "Strong candidates may also have..." — non-essential strengths. */
  alsoStrong?: string[];
  collaborations: string;
  /**
   * Set only for paid staff positions. SAIN is otherwise a volunteer
   * organisation, so the presence of this field is what marks a listing as a
   * salaried job and switches the card over to showing terms and benefits.
   */
  employment?: {
    /** Short badge shown next to the role title, e.g. "Paid - Full-time". */
    badge: string;
    location: string;
    salary: string;
    contract: string;
    startDate: string;
    benefits: string[];
  };
  /**
   * Role-specific hiring stages. Overrides the site-wide
   * `APPLICATION_TIMELINE` on this role's card when set.
   */
  applicationProcess?: string[];
  /**
   * Optional override for the value used when pre-filling the form's role
   * field. Useful when several distinct website roles share a single form
   * option (e.g. Communications Team Member specialisations).
   */
  formRoleValue?: string;
  /**
   * Optional label shown on the role card to flag this role as a
   * specialisation of a broader role.
   */
  specialisationOf?: string;
};

export const ROLES: Record<string, Role> = {
  "education-lead": {
    id: "education-lead",
    title: "Education Lead",
    team: "education",
    scope: "chapter",
    reportsTo: "Chapter (Co-)Director",
    timeCommitment: "6 to 10 hours per week, with iteration peaks",
    mission:
      "Run iterations of the AI Safety, Ethics and Society course in the chapter. Run discussion groups. Recruit, train, and support course facilitators and discussion leads. Maintain quality across cohorts and groups.",
    responsibilities: [
      "Plan and run course iterations (3-4 per year per chapter).",
      "Plan and run the relevant discussion groups.",
      "Recruit and onboard course facilitators and discussion leads while communicating closely with the facilitator mentor.",
      "Manage course logistics: cohort design, room booking, curriculum updates, project phase, graduation.",
      "Manage discussion logistics: group design, room booking.",
      "Keep the chapter education inbox in check.",
      "Coordinate with the Communications Lead on course and discussion group marketing.",
    ],
    preferredBackground: {
      field:
        "Open. Comfort with both technical and governance AI safety content essential.",
      level:
        "Master's preferred. Strong bachelor's with prior facilitation considered.",
      experience:
        "Facilitation, teaching, or course design experience preferred. Prior AI safety course participation strongly preferred (e.g. having completed a previous SAIN iteration).",
      softSkills:
        "Written communication, organisation, comfort facilitating discussion-based learning.",
    },
    collaborations:
      "The chapter director, facilitators, Communications Lead, Community Manager.",
  },

  "education-course-facilitator": {
    id: "education-course-facilitator",
    title: "Education Course Facilitator",
    team: "education",
    scope: "chapter",
    reportsTo: "Education Lead",
    timeCommitment: "About 4 hours per week during iterations (one 2-hour session plus prep)",
    mission:
      "Facilitate one cohort of the course. Lead weekly discussions, support participants, and mark final projects.",
    responsibilities: [
      "Read the weekly readings ahead of the cohort.",
      "Run weekly interactive sessions.",
      "Provide feedback on the final project, depending on the course.",
      "Attend the facilitator check-ins with the Education Lead.",
    ],
    preferredBackground: {
      field:
        "Track-aligned: technical track facilitators with technical background; governance track with policy, law, or philosophy background.",
      level:
        "Professional or master's preferred. Strong bachelor's with prior course participation considered.",
      experience:
        "Prior completion of a previous AI safety course (ours or a comparable one) strongly preferred.",
      softSkills:
        "Warmth, ability to draw out quieter participants, willingness to admit uncertainty.",
    },
    collaborations: "Education Lead, fellow facilitators, course participants.",
  },

  "education-discussion-lead": {
    id: "education-discussion-lead",
    title: "Education Discussion Lead",
    team: "education",
    scope: "chapter",
    reportsTo: "Education Lead",
    timeCommitment:
      "About 3 hours per week during the running block (1-hour session plus about 2 hours of prep, curation, and chat moderation)",
    mission:
      "Run one Discussion Group on a specific theme (technical safety, AI governance, privacy, and so on). Maintain a high-quality, casual environment where 8 to 10 participants engage seriously with shared material and with each other.",
    responsibilities: [
      "Pick themes at least a week in advance and prepare questions aligned with the group's focus.",
      "Brief the Communications Lead on promotional details: theme, time, location, description, RSVP mechanism.",
      "Curate reading material before each session: papers, articles, recent cases.",
      "Run the weekly 1-hour session in an informal setting (cafe, rented space, chapter office). Sessions may extend by 30 minutes if participants want to.",
      "Frame the discussion at the start, moderate to keep it balanced, summarise insights at the end. Encourage less participatory members.",
      "Document key points, arguments, disagreements, and open questions in the group's shared session document.",
      "Manage the group's communication platform: keep it on-topic, send reminder posters 2 days before each session, nudge less active participants supportively.",
      "At the start of each block, run the sign-up form, prune inactive members, and refresh the group with new participants.",
      "Surface participants who want to go deeper to the Education Lead, the Research Hub, or Substack opportunities.",
    ],
    preferredBackground: {
      field:
        "Aligned with the group's theme. Technical groups benefit from a CS/ML background; governance and privacy groups benefit from policy, law, ethics, or social-science backgrounds.",
      level: "Bachelor's minimum, master's and above preferred.",
      experience:
        "Prior facilitation, prior reading-group participation, or substantive engagement with the theme. Familiarity with current AI safety discourse in the chosen area is strongly preferred.",
      softSkills:
        "Facilitation (drawing out quieter voices, gently containing dominators), genuine curiosity, comfort moderating without dominating, reliability week to week.",
    },
    collaborations:
      "Education Lead, fellow Discussion Leads, Communications Lead, National Research Operations Lead and chapter Research Operations.",
  },

  "events-lead": {
    id: "events-lead",
    title: "Events Lead",
    team: "events",
    scope: "chapter",
    reportsTo: "Chapter (Co-)Director",
    /* No badge here on purpose. The five chapter roles are peers, and a chip
       reading "Part-time" beside the paid role's "Paid - Full-time" chip read
       as its smaller sibling rather than as unpaid. The hours line under the
       title carries the commitment. */
    timeCommitment: "6 to 10 hours per week",
    mission:
      "Plan and execute the chapter's events. Maintain the chapter's event presence, attract speakers, organise community life. Identify opportunities for SAIN exposure to reach new audiences, strengthen the community, and inspire people into AI safety careers.",
    responsibilities: [
      "Plan a balanced calendar of professional events, community socials, and hackathons. Communicate key dates to Communications Lead.",
      "Identify exposure opportunities for SAIN board and community members.",
      "Recruit and brief external speakers.",
      "Manage event logistics: venue, catering, marketing handover to Communications.",
      "Run the team meeting.",
      "Triage the chapter events inbox.",
      "Coordinate budget with the chapter director.",
    ],
    preferredBackground: {
      field: "Open. Genuine interest in AI safety required.",
      level: "Not relevant.",
      experience:
        "Prior event organisation (student associations, conferences, hackathons) strongly preferred.",
      softSkills:
        "Project management, comfort cold-emailing speakers, calmness under deadline pressure, strong social skills.",
    },
    collaborations:
      "The chapter director, Communications Lead, Community Manager, external speakers, venue contacts.",
  },

  "events-team-member": {
    id: "events-team-member",
    title: "Events Team Member",
    team: "events",
    scope: "chapter",
    reportsTo: "Events Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Work alongside the Events Lead to deliver events end-to-end.",
    responsibilities: [
      "Take ownership of specific events as delegated by the Events Lead.",
      "Help with logistics: bookings, catering, on-site setup.",
      "Attend the weekly team meeting.",
      "Be present at events.",
    ],
    preferredBackground: {
      field: "Open. Strong passion for AI safety.",
      level: "Not relevant.",
      experience:
        "Not required; willingness to learn is enough. Previous experience organising events is a bonus.",
      softSkills: "Reliability, willingness to do hands-on work, social.",
    },
    collaborations: "Events Lead, fellow team members.",
  },

  "communications-lead": {
    id: "communications-lead",
    title: "Communications Lead",
    team: "communications",
    scope: "chapter",
    reportsTo: "Chapter (Co-)Director",
    timeCommitment: "6 to 10 hours per week",
    mission:
      "Run the chapter's internal and external communication. Maintain the chapter's social media presence, coordinate with the national communications leads on shared communication goals, and uphold a consistent brand and tone. Ensure the chapter's events and outputs are optimised for awareness, action (applying to courses), conversion (career switching), or community strengthening.",
    responsibilities: [
      "Run the chapter's Instagram, LinkedIn and WhatsApp announcements in line with the brand kit (agreed templates with SAIN fonts and colours).",
      "Align the content calendar at the beginning of each month with broader organisational goals and SAIN's content pillars.",
      "Identify relevant content to reshare on socials to maintain and grow engagement (advisors, board members, partner organisations).",
      "Propose designs for offline materials, e.g. roll-ups, mugs, T-shirts.",
      "Research and share best practices with Communications Team members.",
      "Delegate tasks with clear expectations and deadlines according to the content calendar.",
      "Coordinate with the Events Lead on event marketing timelines. Drive event anticipation, registration, and post-event recaps.",
      "Coordinate with the Education and Research Leads quarterly on whether any projects benefit from promotion.",
      "Maintain and optimise the chapter portion of the website.",
      "Sync at least quarterly with the other chapters' Communications Leads.",
      "Triage the chapter PR inbox.",
    ],
    preferredBackground: {
      field:
        "Open. Communications, marketing, design, or journalism experience helpful but not required.",
      level: "Bachelor's minimum.",
      experience:
        "Prior social media management, content creation, or journalism. Familiarity with Canva, Figma, or equivalent.",
      softSkills:
        "Writing, visual sense, attention to brand consistency.",
    },
    collaborations:
      "The chapter director, Events Lead, Education Lead, Research Lead, Community Manager, other chapters' Communications Leads.",
  },

  "communications-team-member": {
    id: "communications-team-member",
    title: "Communications Team Member",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Strengthen the chapter's internal and external communication. Coordinate with the Communications Lead on shared goals and a consistent brand and tone across all channels.",
    responsibilities: [
      "Create posts per the chapter's posting calendar across Instagram, LinkedIn or WhatsApp. Create design content, photographs, and videos that can be cross-shared when relevant.",
      "Observe what content performs well, replicate it, and share recommendations with team members.",
      "Cover events live (real-time stories, photos, videos).",
      "Work on local and national SAIN branding.",
      "Attend the weekly team meeting.",
      "Propose ideas based on observed engagement.",
    ],
    preferredBackground: {
      field: "Open.",
      level: "Bachelor's minimum.",
      experience: "Prior content creation helpful.",
      softSkills: "Visual sense, writing, reliability.",
    },
    collaborations: "Communications Lead, Events Lead.",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
  },

  "web-designer": {
    id: "web-designer",
    title: "Web Designer",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Keep the chapter's web presence polished, up to date, and consistent with SAIN's brand.",
    responsibilities: [
      "Build and maintain chapter web pages, ensuring content and design are current.",
      "Implement updates requested by the Communications, Events, or Education Lead.",
      "Optimise pages for readability, mobile responsiveness, and load performance.",
      "Ensure visual consistency with SAIN's brand kit across all web-facing assets.",
      "Propose and prototype improvements to page layout and user flow.",
      "Attend the weekly Communications team meeting.",
    ],
    preferredBackground: {
      field: "Open. Design, computer science, or media studies are helpful.",
      level: "Bachelor's minimum.",
      experience:
        "GitHub experience is a must as our website is developed accordingly. Prior web design or front-end development (portfolio preferred). Familiarity with tools such as Webflow, WordPress, or Figma.",
      softSkills:
        "Visual sense, attention to detail, ability to take and act on feedback.",
    },
    collaborations: "Communications Lead, Communications Team members.",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "content-creator": {
    id: "content-creator",
    title: "Content Creator",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Produce written and multimedia content that communicates SAIN's work, events, and mission to internal and external audiences.",
    responsibilities: [
      "Write copy for social media posts, newsletters, event announcements, and the website in line with SAIN's tone and brand.",
      "Produce short-form video or photo content for Instagram and LinkedIn, including live event coverage (stories, reels, recap posts).",
      "Adapt content to platform and audience: concise and visual for Instagram, professional and substantive for LinkedIn.",
      "Follow the monthly content calendar set by the Communications Lead.",
      "Monitor what content performs well and share observations with the team.",
      "Attend the weekly Communications team meeting.",
    ],
    preferredBackground: {
      field:
        "Open. Journalism, communications, marketing, or media are helpful.",
      level: "Bachelor's minimum.",
      experience:
        "Prior content creation, copywriting, blogging, or social media management helpful. Portfolio or examples of prior work are a strong plus.",
      softSkills:
        "Writing, storytelling, creativity, ability to meet deadlines.",
    },
    collaborations:
      "Communications Lead, Graphic Designer, Events Lead.",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "graphic-designer": {
    id: "graphic-designer",
    title: "Graphic Designer",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Create visual assets that make SAIN's communications distinctive, on-brand, and compelling across digital and print channels.",
    responsibilities: [
      "Design social media visuals, event posters, flyers, and banner graphics in line with SAIN's brand kit.",
      "Produce templates for recurring formats (event announcements, reminder posters, recap cards) for reuse by the Communications team.",
      "Design offline materials such as roll-ups, merchandise, and printed handouts.",
      "Ensure all visual outputs are consistent with SAIN's fonts, colours, and tone.",
      "Incorporate feedback from the Communications Lead and iterate quickly.",
      "Attend the weekly Communications team meeting.",
    ],
    preferredBackground: {
      field:
        "Open. Graphic design, visual communication, or media arts are helpful.",
      level: "Not relevant; portfolio carries more weight than credentials.",
      experience:
        "Prior graphic design work required. Proficiency in Canva, Figma, Adobe Illustrator, Photoshop, or equivalent. Portfolio strongly preferred.",
      softSkills:
        "Visual sense, attention to brand consistency, receptiveness to feedback, ability to work to deadlines.",
    },
    collaborations:
      "Communications Lead, Content Creator, Events Lead, On-Campus Ambassador.",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "photographer": {
    id: "photographer",
    title: "Photographer",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Capture, edit, and deliver high-quality visual imagery that documents SAIN's activities, humanises the organisation's mission, and enhances storytelling across all digital and print platforms.",
    responsibilities: [
      "Photograph live events, workshops, panels, and social gatherings hosted by the chapter.",
      "Conduct planned photo shoots for team portraits, marketing campaigns, and promotional materials.",
      "Edit and touch up raw imagery to maintain a professional, polished aesthetic aligned with SAIN's brand tone.",
      "Organise and maintain a shared digital media library (e.g. Google Drive) with properly tagged, high-resolution assets for the Communications team.",
      "Incorporate feedback from the Communications Lead regarding visual style and selection.",
      "Attend the weekly Communications team meeting.",
    ],
    preferredBackground: {
      field:
        "Open. Photography, media production, or visual arts are helpful.",
      level:
        "Not relevant; portfolio and technical skill carry more weight than credentials.",
      experience:
        "Prior photography and editing experience required. Experience with Adobe Lightroom, Photoshop, or equivalent editing software. Access to professional or semi-professional camera equipment is helpful. A portfolio or gallery of past work is strongly preferred.",
      softSkills:
        "Keen eye for framing and lighting, ability to capture candid moments, reliability in meeting post-production deadlines, and a comfortable demeanour when interacting with event attendees.",
    },
    collaborations:
      "Communications Lead, Content Creator, Events Lead (for event materials).",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "community-manager": {
    id: "community-manager",
    title: "Community Manager",
    team: "community",
    scope: "chapter",
    reportsTo: "Chapter (Co-)Director",
    timeCommitment: "4 to 6 hours per week",
    mission:
      "Welcome people into the chapter community and funnel them into deeper involvement. Be the friendly face and first point of contact.",
    responsibilities: [
      "Identify and welcome new community members (chapter WhatsApp, after course iterations, after events).",
      "Maintain the community relationship management database: track first contact, study, year, level of involvement (GDPR-compliant).",
      "Be present at chapter events; approach new people there.",
      "Funnel interested community members towards open positions, course iterations, and events. Forward opportunities from announcement channels to specific high-potential members.",
      "Triage the chapter community manager inbox.",
      "Attend Team Lead Meetings; flag community insights and pain points.",
    ],
    preferredBackground: {
      field: "Open.",
      level: "Not relevant.",
      experience:
        "Prior community management, student association leadership, or similar helpful.",
      softSkills:
        "Warmth, social fluency, reliability, comfort with light data work.",
    },
    collaborations:
      "The chapter director, all team leads, course graduates, community members.",
  },

  "on-campus-ambassador": {
    id: "on-campus-ambassador",
    title: "On-Campus Ambassador",
    team: "outreach",
    scope: "chapter",
    reportsTo: "Events Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Be SAIN's face on campus. Drive awareness and foot traffic to SAIN events by reaching students where they are: at notice boards, tabling spots, and in passing.",
    responsibilities: [
      "Table at university common areas to introduce SAIN to students and invite them to upcoming events.",
      "Distribute flyers and printed materials across campus ahead of events and course iterations.",
      "Post and maintain advertisements on university notice boards and approved campus display areas.",
      "Engage passersby in friendly, informed conversation about SAIN's activities and mission.",
      "Coordinate with the Events Lead on upcoming dates, materials needed, and target locations.",
      "Report back on campus reception, questions asked, and any leads to pass to the Community Manager.",
    ],
    preferredBackground: {
      field: "Open. Genuine interest in AI safety required.",
      level: "Not relevant.",
      experience:
        "Not required. Prior brand ambassador, student rep, or outreach experience is a bonus.",
      softSkills:
        "Outgoing, approachable, reliable, comfortable initiating conversations with strangers.",
    },
    collaborations:
      "Events Lead, Communications Lead, Community Manager.",
  },

  "research-operations-lead": {
    id: "research-operations-lead",
    title: "Research Operations Lead",
    team: "research",
    scope: "national",
    reportsTo: "Director",
    timeCommitment:
      "Full-time (1.0 FTE), 40 hours per week, 5-day week",
    mission:
      "The SAIN Research Hub already exists: supervisors, projects, and a first cohort of researchers. Your job is to make it flourish end to end and build it into the place where Dutch AI safety research talent gets matched, mentored, and published, with output credible enough that researchers and policymakers cite it. You lead the volunteer Research Operations teams in each chapter city and are responsible for the Hub's results. You report directly to the Director and have a budget for the Hub's operations. We are just starting up, so you will be part of the small national team working at SAIN. This role is heavy on project management rather than research insight.",
    responsibilities: [
      "Set and hold the strategic direction of the Research Hub together with leadership and the Advisory Board.",
      // "Run the supervised research programme: recruit experienced supervisors (typically PhD and beyond), source projects, select and match applicants, and keep projects on track through to a finished, publishable output (anywhere from conference-level to a blog post).",
      // "Run the open collaboration programme: review proposals from researchers who arrive with their own project idea, decide what runs under SAIN's name, connect the right people with each other, and support those projects to completion.",
      "Proactively recruit supervisors and source projects.",
      "Run the application process; match researchers to supervisors and projects.",
      "Monitor active projects, unblock problems as they arise, and intervene when something stalls.",
      "Recruit, onboard, and manage the volunteer Research Operations teams in each chapter city; maintain continuity across academic-year turnover.",
      "Work with Communications to publish and promote the Hub's output; maintain the Research Hub Handbook; track and report Hub metrics.",
    ],
    goodFitIf: [
      "Have demonstrated experience managing a team, volunteers, or junior researchers.",
      "Are familiar with the field of AI safety, both the technical and the governance/policy side.",
      "Are comfortable working with senior people in academia, industry, and government.",
      "Enjoy working in a start-up setting.",
    ],
    alsoStrong: [
      "Published AI safety research.",
      "Familiarity with the Dutch academic and policy landscape.",
      "Professional working proficiency in Dutch.",
    ],
    collaborations:
      "Director, Advisory Board, technical advisors, chapter Research Operations volunteers, supervisors, researchers, Communications.",
    employment: {
      badge: "Paid - Full-time",
      location:
        "Amsterdam, hybrid with a minimum of 3 days in office, plus regular travel to SAIN chapter cities within the Netherlands",
      salary: "€50k-€60k gross per year",
      contract: "1-year contract, 40h, 5-day week",
      startDate: "As soon as possible",
      benefits: [
        "8% holiday allowance",
        "Unlimited holidays",
        "Travel allowance and opportunities to attend national and international conferences",
        "Hybrid working setup (minimum 3 days in office)",
        "A budget for the Research Hub's operations",
      ],
    },
    applicationProcess: [
      "Initial screener: a 30-minute conversation with a member of our leadership team.",
      "Work test: a roughly 2-hour take-home assignment mirroring the real job. If you advance past this stage, we will ask your permission to contact references.",
      "Final conversation: 45 to 60 minutes with the Director and one of our technical advisors, including discussion of your work test.",
      "Work trial: a paid 2-day work trial in Amsterdam or remote, doing exactly what the job requires.",
    ],
  },

  "research-operations": {
    id: "research-operations",
    title: "Research Operations",
    team: "research",
    scope: "national",
    reportsTo: "Research Operations Lead",
    timeCommitment:
      "2 hours per week in quiet times to 8 hours per week when many supervisors and researchers are onboarded",
    mission:
      "Make the Research Hub run smoothly day-to-day. Handle operational logistics, onboard new researchers and supervisors, and shape the research direction with the Research Lead.",
    responsibilities: [
      "Decide the strategic direction of the Research Hub together with the Lead.",
      "Track applicants and ongoing projects (the Research Hub interest tracker).",
      "Send check-in forms and follow up on open ones.",
      "Maintain Discord channels and the GitHub organisation.",
      "Keep the website's research section updated.",
    ],
    preferredBackground: {
      field:
        "Open. Technical background helpful (familiar with GitHub, basic ML literacy).",
      level: "Bachelor's minimum, master's preferred.",
      experience:
        "Prior research support, lab management, or operational role helpful but not required.",
      softSkills:
        "Reliability, attention to detail, comfort with admin work.",
    },
    collaborations:
      "Research Operations Lead, supervisors, researchers.",
  },
};

// -----------------------------------------------------------------------------
// Chapter -> open positions
// -----------------------------------------------------------------------------

export type ChapterPosting = {
  /** Slug used in pre-fill (must match the option text in the Google Form). */
  chapterSlug: string;
  chapterName: string;
  /**
   * The section heading on /open-positions. It states what the chapter is
   * doing ("SAIN Amsterdam is building its core team"), so the reader knows
   * whose schedule they are reading before any role title.
   */
  heading: string;
  /** Body paragraph under the heading while the chapter is recruiting. */
  blurb?: string;
  inboxEmail: string;
  status: "open" | "closed";
  /**
   * Body shown instead of `blurb` when the chapter is closed. Rendered as one
   * sentence with the chapter inbox as an inline link between the two halves,
   * so a closed chapter is a fact with a door, not a section.
   */
  closedNote?: { beforeEmail: string; afterEmail: string };
  /**
   * Each posting references a role id from ROLES. Optionally specify how many
   * positions are open and an override on title or notes for the chapter.
   */
  postings?: Array<{
    roleId: keyof typeof ROLES;
    positions?: number;
    note?: string;
  }>;
};

export const chapterPositions: ChapterPosting[] = [
  {
    chapterSlug: "Amsterdam",
    chapterName: "SAIN Amsterdam",
    heading: "SAIN Amsterdam is building its core team",
    blurb:
      "Co-Directors Ana and Andreea are looking for team leads and team members across all teams. If you want to help shape a chapter from the ground up, this is the moment.",
    inboxEmail: "infoams@safeainetherlands.org",
    status: "open",
    postings: [
      { roleId: "events-lead" },
      { roleId: "photographer" },
      { roleId: "community-manager" },
    ],
  },
  {
    chapterSlug: "Utrecht",
    chapterName: "SAIN Utrecht",
    heading: "SAIN Utrecht is growing its team",
    blurb:
      "Director Riccardo and the current team leads are looking for hands-on contributors who want to grow the chapter.",
    inboxEmail: "infoutr@safeainetherlands.org",
    status: "open",
    postings: [
      { roleId: "education-lead" },
      { roleId: "education-course-facilitator" },

    ],
  },
  {
    chapterSlug: "Groningen",
    chapterName: "SAIN Groningen",
    heading: "SAIN Groningen is at capacity",
    /* The blurb that stood here claimed selective hiring for Communications
       and the Research Hub while `postings` was empty, so a reader was told
       "we are hiring" and then shown nothing to apply for. If Groningen does
       open something, add the posting; do not revive the claim. */
    closedNote: {
      beforeEmail:
        "The Groningen team is full right now, and we are not listing roles there. If you want to be considered when something opens, write to",
      afterEmail: "and tell us what you would like to do.",
    },
    inboxEmail: "infogro@safeainetherlands.org",
    status: "closed",
    postings: [],
  },
];

// -----------------------------------------------------------------------------
// National (SAIN Netherlands-wide) open positions
// -----------------------------------------------------------------------------

export type NationalPosting = {
  /** Anchor slug used for the section on /open-positions. */
  slug: string;
  name: string;
  /** The section heading on /open-positions. */
  heading: string;
  blurb: string;
  inboxEmail: string;
  status: "open" | "closed";
  closedNote?: string;
  postings?: Array<{
    roleId: keyof typeof ROLES;
    positions?: number;
    note?: string;
    /**
     * Each national role has its own application form — there is no shared
     * national form to fall back on, so this is required per role.
     */
    applyUrl: string;
  }>;
};

/**
 * Roles that sit with SAIN Netherlands as a whole rather than with a chapter.
 * Rendered above the chapter sections on /open-positions. Set `status` to
 * "closed" (or empty `postings`) to hide the national section and the Research
 * Hub banner that points at it.
 */
export const nationalPosting: NationalPosting = {
  slug: "national",
  name: "SAIN Netherlands",
  heading: "One paid role on the national team",
  blurb:
    "Most of SAIN runs on volunteers. The Research Operations Lead is the exception: a paid, full-time staff role that works across Amsterdam, Utrecht, and Groningen and reports to the Director. It has its own application form and hiring process, separate from the chapter form below.",
  inboxEmail: "info@safeainetherlands.org",
  status: "open",
  postings: [
    {
      roleId: "research-operations-lead",
      applyUrl: RESEARCH_OPERATIONS_LEAD_APPLICATION_FORM_URL,
    },
  ],
};

/** National roles currently open, in the order declared above. */
export const openNationalPostings = nationalPosting.status === "open"
  ? (nationalPosting.postings ?? [])
  : [];

export const isNationalRecruiting = openNationalPostings.length > 0;

/**
 * Whether a specific national role is currently advertised. Used by
 * /research to decide whether to show its Research Hub hiring banner.
 */
export function isNationalRoleOpen(roleId: keyof typeof ROLES): boolean {
  return openNationalPostings.some((p) => p.roleId === roleId);
}

// -----------------------------------------------------------------------------
// Recruiting state (single source of truth for what the site shows)
// -----------------------------------------------------------------------------

/**
 * A chapter counts as recruiting only when it is marked open AND actually has
 * postings listed. Set a chapter's `status` to "closed" (or empty its
 * `postings`) to hide its recruiting banner and its section on
 * /open-positions.
 */
export function isChapterRecruiting(chapterSlug: string): boolean {
  const chapter = chapterPositions.find((c) => c.chapterSlug === chapterSlug);
  return chapter?.status === "open" && (chapter.postings?.length ?? 0) > 0;
}

/** Chapters currently recruiting, in the order declared above. */
export const recruitingChapters: ChapterPosting[] = chapterPositions.filter(
  (c) => isChapterRecruiting(c.chapterSlug),
);

/**
 * How many volunteer roles are listed across the recruiting chapters. The
 * careers hero counts the page rather than restating a number in prose, so
 * closing a posting changes the sentence without anyone editing it.
 */
export const openChapterPostingCount = recruitingChapters.reduce(
  (total, chapter) => total + (chapter.postings?.length ?? 0),
  0,
);

/**
 * When this is false the whole open-positions surface disappears: the navbar
 * entry, the home and chapter recruiting banners, the get-involved link, and
 * the role listings on /open-positions (which falls back to the standing
 * open-application page). Close every chapter *and* the national posting to
 * switch the site over.
 */
export const hasOpenPositions =
  recruitingChapters.length > 0 || isNationalRecruiting;

// -----------------------------------------------------------------------------
// Review policy + Timeline
// -----------------------------------------------------------------------------

/**
 * There is no hard application deadline: applications are reviewed on a rolling
 * basis as they come in. Update these strings if the cycle ever moves back to a
 * fixed closing date.
 */
export const APPLICATION_REVIEW = {
  label: "Rolling applications",
  phrase: "on a rolling basis",
  sentence:
    "Applications are reviewed on a rolling basis, so apply whenever you are ready.",
};

export type TimelineStep = {
  label: string;
  detail: string;
};

/**
 * Edit these strings whenever the cycle changes. The page surfaces both the
 * default cycle and the "earlier onboarding possible" caveat.
 */
export const APPLICATION_TIMELINE: TimelineStep[] = [
  {
    label: "Applications open",
    detail:
      "Submit your application whenever you are ready. There is no closing date.",
  },
  {
    label: "Rolling review",
    detail:
      "We read applications as they arrive rather than all at once, so applying earlier means hearing back earlier.",
  },
  {
    label: "First-round response",
    detail:
      "Within two to three weeks of applying. Strong candidates are invited to a short intro call with the chapter lead for that team.",
  },
  {
    label: "Trial conversation",
    detail:
      "A 30 to 45 minute call to discuss the role, your motivation, and a small task or scenario relevant to the team.",
  },
  {
    label: "Onboarding",
    detail:
      "If the previous steps go well, the standard onboarding cycle starts right after. Joining SAIN's team at other dates is possible.",
  },
];
