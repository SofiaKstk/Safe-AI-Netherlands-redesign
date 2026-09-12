---
name: sain-design
description: "Design, build, or substantially improve official Safe AI Netherlands (SAIN) pages. Use for the marketing site, landing, courses, research hub, careers, community, and any SAIN-authored surface that must carry the civic navy-and-orange language of the Desktop - Landing."
---

# Design official SAIN pages

Act as a SAIN designer, editor, and design engineer. Turn the available material into an official Safe AI Netherlands page. Shape the argument and the interface together. Do not restyle a generic nonprofit template, a lab website, or a SaaS landing.

This file is the design authority. Tokens are the values. The prose is why those values exist and how to apply them. When a later mock disagrees with this file, this file wins unless the user is explicitly changing the system.

**Source of truth.** Paper file [Safe AI Netherlands](https://app.paper.design/file/01M1ETAWAXME52JE86CQ1HDSVZ/1-0), artboard **Desktop - Landing**, captured 12 September 2026. Tokens in that file are live (`var(--color-accent)` and the rest of the `:root` API below). Earlier HTML drafts in Downloads are lineage, not authority. v1 used Spectral, cream `#fbfaf9`, 56px gutters, and uppercase IBM Plex Mono kickers. The landing rejected those. Do not revive them.

## SAIN, and the job of a page

SAIN is Stichting Safe AI Netherlands. It is a volunteer-run civic organisation that upskills students and young professionals in the Netherlands, then connects the strongest people onward to labs, institutes, ministries, and jobs. Every programme is free.

The reader is usually a student, early researcher, or public-sector person who has heard of AI safety and is asking whether a real path exists here. They are not buying software. They are deciding whether to show up on a Tuesday in Utrecht.

If they saw only the first viewport, they should remember three facts:

1. This is a Dutch organisation with a serious institutional voice.
2. There is a path (course, community, research, career), and it is free.
3. The work is already happening. The chart, the cities, the photos, and the papers are evidence, not decoration.

Write for that reader. British spelling (`programme`, `organisation`). Sentence case. Periods on claims. No slogans.

## Use this priority order

When requirements compete, protect them in this order:

1. Preserve supplied facts, names, cities, programme details, and the claim that programmes are free.
2. Preserve this visual system. Do not substitute Inter, Geist, rounded pills, or a second accent.
3. Make the path through SAIN visible. A page that explains "who we are" without showing course → community → contribution → career has failed the job.
4. Keep orange as identity, not garnish. Navy as ink, not a dark-mode theme.
5. Choose a composition that belongs to this material. Do not import a hero-plus-card-grid.
6. Refine responsive behaviour and interaction without flattening the hierarchy.

Ask questions only when proceeding would invent a programme, a city, a publication, a statistic, a legal claim, or a call to action SAIN has not earned. Otherwise omit the unknown and proceed.

## Why this language exists

SAIN talks to universities, ministries, and frontier labs while recruiting students who have never been in those rooms. The design has to look like a Dutch civic body and still feel like a community you can walk into.

**Navy `#021C4D` is ink.** It is close to Dutch government and university blue. It has to survive in a letter from a stichting, on a slide in The Hague, and on a course handout. It is not tech-startup navy (too black) and not flag blue (too bright). On light grounds, hierarchy is navy at different opacities, never a grey scale. Grey would make this look like a product UI.

**Orange `#FF6025` is Dutch and it is action.** The A in the wordmark is orange. The pinwheel interlocks navy and orange through a white core. The announcement bar is a full-bleed orange strip. Orange is not a 10% accent you sprinkle on icons. It marks joining, hiring, the active course track, the last step of the pipeline, and the part of the capability chart that is still rising. If a page uses orange only as a bullet dot, it is not SAIN.

**White is the reading page. Paper `#F7F5F2` is the printed programme.** White is default. Cream is for chapters, courses, and careers, the parts that behave like a schedule. Navy inverse is earned. Use it when the page is presenting proof (publications) or asking for a decision (get involved, footer). Do not default the site to dark.

**Newsreader is the voice. Archivo is the work. IBM Plex Mono is the instrument.** Headlines are a newspaper serif at weight 400, not a bold billboard. Kickers are Newsreader italic, not tracked uppercase. Body is Archivo at 16.5/27. Mono appears only as `01` / `02` / `03` and week numbers. Archivo Black is loaded in the Paper file and unused. Leave it unused.

**Corners are square because this is print, not product.** Buttons, chips, tabs, and sections have radius 0. The only radii in the landing are 3px on inverse trail cards and 50% on 7 to 9px dots. A pill button is a category error.

**Hairlines, not cards.** Structure is 1px navy at 10% (`--color-hairline`). Cards with shadows are the lazy answer. The two shadows that exist are objects: a drop shadow on the funnel (it is a diagram you could pick up) and navy-tinted shadows on tilted photo prints (they are photographs on a table).

## Frame the reader's job

Before designing, privately establish:

- Who opens this, in what city or chapter, to decide what?
- What is the next real action (drop in this week, apply to the hub, volunteer)?
- What evidence makes that action credible (a course that ran, a paper, a named supervisor, a photograph from a room that happened)?
- What should remain available without dominating the first read (KvK, full supervisor list, full publication list)?

Order by reader need. Support two speeds:

- **Walk-in path.** Identity, headline, path, one free CTA.
- **Audit path.** Cities, course outline, supervisors, papers, legal footer.

Every section must answer a new question. Combine duplicates. Do not recap the talent pipeline in prose after the funnel has already drawn it.

## Choose the composition

The first viewport is the argument. On the landing that is a split: Newsreader claim on the left, an exponential chart on the right. The chart is not a dashboard widget. Navy bars become orange at the inflection. The orange is the part of the curve SAIN is pointing at. If you cannot name what the geometry proves, do not draw it.

Name the obvious layout this page type would suggest, then reject it unless the material earns it. A nonprofit landing does not need a centered hero, three circular icons, and a donor strip.

Recurring geometries on the landing, use them when they fit the material:

| Material | Geometry |
|---|---|
| A compounding claim | The exponential bar chart (navy, then orange) |
| A narrowing path | The trapezoid funnel, 432 → 196px, last band solid orange |
| Cities as peers | Three columns under italic "Local chapters", left hairline, no cards |
| A programme with tracks | 3-up square tabs, active tab white with a 3px orange underline |
| Community as fact | Tilted photo prints, white 8px mat, navy-tinted shadow |
| People in a role | Hairline rows, serif name, sans affiliation. Not avatars |
| Work already published | Inverse navy field, quiet counters, venue-and-title chips |
| Career destinations | Full-width hairline rows, 26px orange stroke icon, 240px serif title |
| The path, again, as a close | Inverse navy, zigzag trail, last stop orange |

Open space must amplify the focal object. The hero copy is 700px against a 656px chart with 48px between them and 48px gutters. Do not center a short heading in a 1440px void.

## Authorship shell

Every completed page has the same SAIN authorship outcome.

**Announcement (optional, site-wide).** Full-bleed `--color-accent`. Newsreader italic 15/20 white at 85% for the news. A 22×1 white hairline at 50%. Archivo 13.5/18 white link, underline white at 45%. Padding 11×48. This is a civic broadcast. Do not turn it into a dismissible marketing cookie.

**Header.** 70px min height, padding 14×48, frost `--color-canvas-header`, 1px `--color-hairline` bottom. Pinwheel + wordmark at 72×30 on the left (header lockup: navy wordmark, orange A, pinwheel in both). Nav is Archivo 14/20 `--color-ink`, gap 30px. The active item gets a 1px ink underline, not a fill. Right side: ghost Volunteer, solid ink "Join a free course".

**Footer.** Inverse navy. Light lockup at ~113×48. Newsreader italic 15px at `--color-on-inverse-meta` for the stichting line and column titles. Archivo 14px `--color-on-inverse-body` for links. Bottom rule `--color-on-inverse-hairline`. Copyright and cities Archivo 13px white at 45%. Padding 52×48×40.

Do not invent a second logo treatment. Do not set the wordmark in Newsreader. Do not recolour the pinwheel to a single ink.

## Grid and alignment

Desktop canvas is 1440px. The page gutter is 48px (`--spacing-7`). Inner content is 1344px. Copy columns are 620, 720, or 760px (`--container-copy-narrow`, `--container-copy`, `--container-copy-wide`). Do not let body text run wider than 760px.

Align to a shared edge or a deliberate split. Equivalent peers share type role, padding, and rule position. Chapter columns share a left hairline and an 18px inset. Career rows share a 26px icon slot, a 240px title slot, a growing description, and a 160px destination. Do not align those with `gap` alone.

Section block padding is large and uneven on purpose:

| Band | Block padding | Ground |
|---|---|---|
| Announcement | 11 | accent |
| Header | 14 | frost white |
| Hero | 84 / 76 | white, fading into paper at the bottom |
| Chapters | 46 | paper |
| Mission, research, careers | 88 | white or paper |
| Courses | 56 | paper |
| Community | 0 (fixed 700px band) | white |
| Output | 72 / 56 | inverse |
| Get involved | 92 | inverse |
| Footer | 52 / 40 | inverse |

Do not normalise these to one stack gap. The chapters band is a thin index. Mission is a chapter. Community is a photograph with a caption in type.

## Typography and rhythm

Load Newsreader with optical sizing (`opsz` 6..72), Archivo, and IBM Plex Mono. Fallbacks: `Georgia, serif` for Newsreader, `system-ui, sans-serif` for Archivo, `ui-monospace, monospace` for Plex.

Use only the published roles. Do not invent a 32px headline because the string is short.

| Role | Token | Face | Weight | Size / line / tracking | Use |
|---|---|---|---|---|---|
| Display | `--text-display` | Newsreader | 400 | 46 / 52 / -0.015em | One hero claim per page |
| Closing | `--text-closing` | Newsreader | 400 | 42 / 46 / -0.014em | Get-involved claim only |
| Heading | `--text-heading` | Newsreader | 400 | 38 / 43 / -0.012em | Section turns |
| Title | `--text-title` | Newsreader | 400 | 21 / 26 | City names |
| Quote | `--text-title` | Newsreader | 300 | 21 / 31 | Pull quotes |
| Title SM | `--text-title-sm` | Newsreader | 400 | 19 / 24 | Career track titles. Course tabs on the landing are 20/24, same role. |
| Kicker | `--text-kicker` | Newsreader italic | 400 | 17 / 24 | Section names. Never uppercase |
| Body | `--text-body` | Archivo | 400 | 16.5 / 27 | Reading |
| UI | `--text-ui` | Archivo | 400 | 14.5 / 20 | Accent CTA label |
| Label | `--text-label` | Archivo | 400 | 14 / 20 | Nav, ghosts, footer links |
| Caption | `--text-caption` | Archivo | 400 | 13.5 / 18 | Header buttons, meta |
| Footnote | `--text-footnote` | Archivo | 400 | 13 / 18 | Legal |
| Index | `--text-index` | IBM Plex Mono | 400 | 11 / 14 / 0.1em | `01` `02` `03` |

Hero kicker (the organisation name next to the 7×7 orange square) is Newsreader italic 16/22 at `--color-ink-kicker`. That is a special case of the kicker, not a new role.

**The Square Kicker Rule.** A section kicker is Newsreader italic, ink at 55%, never tracked, never uppercase, never a pill. On white, it may be led by a 7×7 `--color-accent` square (hero only). On inverse, drop the square and use `--color-on-inverse-kicker`.

**The One Display Rule.** `--text-display` appears once. Section turns use `--text-heading`. Do not scale a heading up because the section is important.

**The Mono Rule.** IBM Plex Mono is an index. If it is carrying a sentence, you have the wrong face.

Build vertical rhythm from relationships, not a universal stack:

- Kicker → heading: tight (about 22px in a copy column).
- Heading → first paragraph: close (22px).
- Paragraph → CTA: 4px extra, then the button.
- Group → new section: 88px, or 46px for an index band.

Headings are sentence case. They state a claim or a reader action (`Your AI Safety career starts here.`, `The community is how SAIN works.`, `The next decade is being decided now`). They do not name the section type (`Our mission`, `What we offer`).

## Color, surfaces, and boundaries

Design in navy, orange, white, and paper. Use colour when it is identity, action, or state. Pair it with a non-colour cue (underline, weight, position).

**The Two Inks Rule.** On light grounds, all text is `--color-ink` at an opacity. Do not introduce grey. On inverse grounds, all text is white at an opacity. Do not introduce a second tint.

**The Orange Budget.** Orange is allowed as: the announcement field, the 7×7 kicker square, accent fill buttons, the active 3px tab underline, mono indices when active, list numbers in a course outline, 26px stroke icons on career rows, venue labels on publication chips, the last funnel band, the last trail stop, the rising part of the chart, and the A in the wordmark. It is not allowed as a background wash, a gradient, a glow, or a decorative blob.

The page is one continuous canvas with two alternate grounds (paper, inverse). Earn a surface. Prefer spacing and a 1px hairline before a box.

Hard reject decorative gradients, gradient text, glass cards, blobs, grid backgrounds as ornament, and coloured side rails. The hero may fade from white into paper in the last 5% (`oklab(97.1% 0.0009 0.004)`). That is a seam, not a sky.

Selection colour is orange on white.

## Photography and diagrams

Photographs are evidence. They are people in rooms that happened: lectures, certificates, hackathons, mingling. Never stock. Never generated faces. Never illustration of "AI".

Treatments on the landing:

- **Prints.** White 8px mat, rotate between about −11° and 8°, shadow `0 12px 28px #021C4D29`. The centre print is slightly stronger (`0 14px 32px #021C4D33`). This is a table of photographs, not a gallery component.
- **Multiply in the funnel.** Photo at 10 to 14% opacity, `mix-blend-mode: multiply` (luminosity on the orange terminus), slight grayscale and contrast. The photo is texture inside a diagram, not a hero crop.
- **Caption bar.** On a course image, a `--color-ink` bar at 88% (`#021C4DE0`) with Newsreader italic 15/20 white. `Cohort graduation · SAIN Utrecht`.

Diagrams must encode a claim. The funnel narrows because the path narrows. The chart rises because the underlying quantity rises. If you find yourself drawing a network of dots "to feel like community", stop and use photographs.

## Motion

The Paper landing is still. Encode that as the default.

Allowed in implementation:

- Orange and ink button hover (see Components).
- Funnel band hover from the HTML companion: photo opacity 0.10 → 0.26 (up to 0.32 on the terminus), transform 700ms `cubic-bezier(0.22, 1, 0.36, 1)`. The band is the hit target.
- Publication chips may marquee slowly on inverse, two rows in opposite directions, paused on hover, off when `prefers-reduced-motion`. The rest state is the Paper static.

Forbidden: auto-playing video in the hero, parallax, typed headlines, bounce, scroll-jacking, staggered fade-up on every section.

Focus rings in code: 2px `--color-ink` at 3px offset on light. On orange or inverse, use white.

## Voice

Write like the landing.

Short civic claims. Then a paragraph that names the path. Then a free CTA.

Good: `The goal is simple: help students and young professionals make a first real contribution.`

Good: `That network is not an extra. It is a central part of the organisation.`

Bad: `Empowering the next generation of AI safety leaders.`

Bad: uppercase eyebrows, `Learn more`, `Get started`, `Unlock your potential`.

CTAs name the action and, when true, that it is free: `Join the SAIN Community - Free`, `Join a free course`, `Drop in this week`, `Read the call for applications`, `See open positions`, `Become a supervisor`, `Volunteer`.

Use a hyphen in `Join the SAIN Community - Free` (the hero). Do not use an em dash.

## Components

Buttons are square. Archivo. No shadow. No icon unless the landing uses one (the chapter text link uses a 12px square-cap arrow).

**Accent fill** (`Join the SAIN Community - Free`, `Join the community`, `Join a course`)

```
background: var(--color-accent);
color: var(--color-on-accent);
font: 400 14.5px/20px var(--font-sans);
padding: 14px 24px;
border: 0;
border-radius: 0;
```

Hover: `background: var(--color-accent-hover)`. On inverse, the same fill. Do not invert an accent button to navy on hover. Orange is the identity of joining.

**Ink fill** (`Join a free course` in the header, `Drop in this week`)

```
background: var(--color-primary);
color: var(--color-on-inverse);
font: 400 13.5px/18px var(--font-sans); /* 14px/20px in a section */
padding: 11px 18px; /* 13px 20px in a section */
border-radius: 0;
```

Hover: `background: var(--color-accent)`.

**Ghost on light** (`Volunteer`)

```
background: transparent;
color: var(--color-ink);
border: 1px solid var(--color-hairline-strong);
padding: 10px 16px;
font: 400 13.5px/18px var(--font-sans);
border-radius: 0;
```

Hover: fill ink, text white.

**Outline ink** (`Read the call for applications`, `Become a supervisor`, `See open positions`)

```
border: 1px solid var(--color-ink);
color: var(--color-ink);
padding: 13px 20px;
font: 400 14px/20px var(--font-sans);
border-radius: 0;
```

Hover: fill ink, text white.

**Ghost on inverse** (`Volunteer` in get involved)

```
border: 1px solid var(--color-on-inverse-ghost);
color: var(--color-on-inverse);
padding: 14px 22px;
font: 400 14px/20px var(--font-sans);
```

**Chapter column.** Flex column, padding 2px 0 2px 18px, gap 8px, `border-left: 1px solid var(--color-rule)`. City in Newsreader 21/26 ink. Blurb Archivo 14/20 `--color-ink-secondary`. Link row Archivo 14/20 ink plus the 12px arrow.

**Course tabs.** Height 88px, equal flex, padding inline 24px, gap 6px. Active: white, `border-bottom: 3px solid var(--color-accent)`, mono index in accent. Inactive: `border-left: 1px solid var(--color-hairline)`, `border-bottom: 1px solid #021C4D1F`, index in `--color-ink-kicker`, title in `--color-ink-body`.

**Course outline row.** `border-top: 1px solid var(--color-hairline)`, padding 7px 0, gap 12px. Number IBM Plex Mono 12/18 accent, width 22px. Text Archivo 14.5/20 ink.

**Quote.** Newsreader italic 16/22 at 50% ink for the context line. Newsreader 300 21/31 for the quote. Attribution: 1px `--color-rule` top, Archivo 500 14/20 name, Newsreader italic 15/20 kicker for the role.

**Publication chip.** Inverse only. Padding 14×18, gap 12px, fill `--color-on-inverse-fill`, border `--color-on-inverse-hairline`. Venue Archivo 500 13/18 accent. 1×14 divider white at 20%. Title Newsreader 15/20 white.

**Career row.** Full width, padding 18×22, gap 24px, `border-top: 1px solid var(--color-hairline)`. 26px orange stroke icon (1.4 width, round caps). Do not put the icon in a coloured tile.

**Funnel.** Widths 432, 356, 292, 240, 196. Height 86. Trapezoid SVG stroke navy at about 30 to 34%. Fills navy at about 4 to 5% until the last band, which is solid accent. Origin is a 7px accent dot and an accent arrow. Terminus is a 1×10 `--color-hairline-strong` stem and a 7px accent dot. Container `filter: drop-shadow(0 2px 16px #00000033)`. Labels Newsreader 16 → 13px, white on the last band.

**Trail (inverse).** 520px wide. 1px spine white at 20%. Stops alternate left and right. Cards 240×92, radius 3px, fill `--color-on-inverse-fill`, luminosity photo at 22%. Last card and last dot are accent.

**Nav.** No hamburger on desktop. Do not add a filled active pill.

## Published token API

Use these names with `var()`. Do not invent a parallel `--sain-*` colour, and do not introduce a new hex for a role that already exists. Paper tokens in the SAIN file are the same names.

```css
:root {
  --color-canvas: #FFFFFF;
  --color-canvas-soft: #F7F5F2;
  --color-canvas-inverse: #021C4D;
  --color-canvas-header: #FFFFFFF0;
  --color-ink: #021C4D;
  --color-ink-body: #021C4DBD;
  --color-ink-secondary: #021C4DA8;
  --color-ink-kicker: #021C4D8C;
  --color-ink-meta: #021C4D94;
  --color-hairline: #021C4D1A;
  --color-hairline-strong: #021C4D33;
  --color-rule: #021C4D24;
  --color-on-inverse: #FFFFFF;
  --color-on-inverse-body: #FFFFFFC7;
  --color-on-inverse-kicker: #FFFFFF99;
  --color-on-inverse-meta: #FFFFFF80;
  --color-on-inverse-hairline: #FFFFFF29;
  --color-on-inverse-fill: #FFFFFF14;
  --color-on-inverse-ghost: #FFFFFF52;
  --color-on-accent: #FFFFFF;
  --color-primary: var(--color-ink);
  --color-accent: #FF6025;
  --color-accent-hover: #E65620;
  --color-accent-muted: #FF602580;

  --font-serif: "Newsreader", Georgia, serif;
  --font-sans: "Archivo", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;

  --text-index: 11px;
  --text-footnote: 13px;
  --text-caption: 13.5px;
  --text-label: 14px;
  --text-ui: 14.5px;
  --text-body: 16.5px;
  --text-kicker: 17px;
  --text-title-sm: 19px;
  --text-title: 21px;
  --text-heading: 38px;
  --text-closing: 42px;
  --text-display: 46px;

  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;

  --tracking-index: 0.1em;
  --tracking-heading: -0.012em;
  --tracking-closing: -0.014em;
  --tracking-display: -0.015em;

  --leading-index: 14px;
  --leading-caption: 18px;
  --leading-label: 20px;
  --leading-kicker: 24px;
  --leading-body: 27px;
  --leading-title: 26px;
  --leading-quote: 31px;
  --leading-heading: 43px;
  --leading-closing: 46px;
  --leading-display: 52px;

  --breakpoint-sm: 390px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1440px;

  --container-page: 1440px;
  --container-copy-narrow: 620px;
  --container-copy: 720px;
  --container-copy-wide: 760px;

  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 24px;
  --spacing-6: 32px;
  --spacing-7: 48px;
  --spacing-8: 56px;
  --spacing-9: 88px;

  --radius-none: 0px;
  --radius-hair: 3px;
  --radius-full: 9999px;
}
```

A companion stylesheet with the same tokens lives at `sain-brand.css` in this folder. Prefer it in implementation so the model does not invent type sizes.

Newsreader must be requested with optical sizing:

```
https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,100,400;0,100,500;1,100,400&family=IBM+Plex+Mono:wght@400;500&family=Newsreader:opsz,ital,wght@6..72,0,300;6..72,0,400;6..72,1,400&display=swap
```

## Page pattern (the landing)

Use this order unless the page is a single programme:

1. Announcement
2. Header
3. Hero (claim + evidence viz + accent CTA)
4. Local chapters (paper band, thin)
5. Mission (heading + path copy + funnel)
6. Courses (paper, tabs, outline, photograph)
7. Community (copy + photo prints)
8. Research hub (how it works + supervisor list)
9. Output (inverse, papers)
10. Careers (paper, quote + track rows)
11. Get involved (inverse, trail)
12. Footer

On inner pages, keep the shell (announcement, header, footer) and one inverse close if there is a real action. Do not paste the funnel onto a legal page.

## Responsive behaviour

Desktop is 1440. Below `--breakpoint-md`, stack every split. Gutter 24px. Display 36/40. Heading 32/36. Funnel may shrink in proportion or stack labels as a numbered list if the trapezoids clip. Photo prints reduce to two, less rotation. Tabs stack or scroll horizontally without wrapping the 3px orange underline into a round pill. Do not hide the cities.

## Accessibility

One `h1`. Ordered headings. Skip link. Native buttons and links. Contrast on orange and white is the accent CTA (white on `#FF6025`). Do not set `--color-ink-kicker` at 13px or smaller. Do not use orange as the only sign of the active tab (the 3px underline plus the white fill plus the orange index are three cues). `prefers-reduced-motion` kills the marquee and the funnel photo zoom.

## Reject these

If you are about to ship any of the following, stop and use the landing instead:

- Inter, Geist, Geist Mono, system-ui as the display face, or Archivo Black headlines.
- Spectral (v1). IBM Plex Mono kickers in uppercase (v1/v2).
- Rounded pills, 8px cards, soft grey `#f5f5f5`, or a purple/teal "AI" accent.
- A centered hero with a badge, a gradient mesh, and two buttons of equal weight.
- Icon tiles in coloured squares. Metric boxes with a big number as the section.
- All-caps overlines. Tracked eyebrows. `01 - The mission` as a kicker.
- Grey body text. Black `#000` ink. Orange-on-cream as the page ground.
- Nested cards. Glass. Glow. Gradient text.
- Stock photography, generated people, or abstract 3D "neural" art.
- Dark mode as the default marketing surface.
- Copy that could run on any AI startup (`Build the future`, `Join the movement` without SAIN, `Unlock`).

SAIN restraint is civic ink, one Dutch orange, a newspaper serif, and evidence in the geometry. It is not beige minimalism and it is not a lab dashboard.
