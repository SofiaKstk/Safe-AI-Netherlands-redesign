"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import ScrollCue from "@/components/ScrollCue";
import TalentFunnel from "@/components/TalentFunnel";
import { leadership } from "@/data/leadership";
import { sainDocuments } from "@/data/sainDocuments";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";

const advisors = [
  {
    category: "Technical AI Safety",
    members: [
      {
        name: "Teun van der Weij",
        affiliation: "Research Scientist, Apollo Research; Co-founder, ENAIS",
        link: "https://teunvanderweij.com/",
        image: "/photos/advisory_board/Teun.jpg",
      },
      {
        name: "Jesse Hoogland",
        affiliation: "Co-founder & Director, Resolution",
        link: "https://www.jessehoogland.com/",
        image: "/photos/advisory_board/Jesse.jpg",
      },
      {
        name: "Nandi Schoots",
        affiliation: "FLI Postdoctoral Fellow, University of Oxford",
        link: "https://nandischoots.com/",
        image: "/photos/advisory_board/nandi.jpg"
      },
    ],
  },
  {
    category: "AI Governance & Policy",
    members: [
      {
        name: "Jelle Donders",
        affiliation: "Strategic Advisor AI, Dutch Government",
        link: "https://www.linkedin.com/in/jelle-donders/",
        image: "/photos/advisory_board/Jelle.jpeg",
      },
      {
        name: "Lisa Gotoh",
        affiliation: "Senior Policy Officer AI, Dutch Ministry of Foreign Affairs",
        link: "https://www.linkedin.com/in/lisa-gotoh/",
        image: "/photos/advisory_board/lisa_gotoh_revised.jpeg",
      },
      {
        name: "Robert Praas",
        affiliation: "Data Scientist, CEPS",
        link: "https://www.ceps.eu/ceps-staff/robert-praas/",
        image: "/photos/advisory_board/Robert_Praasjpeg.jpeg",
      },
      {
        name: "Charbel-Raphaël Segerie",
        affiliation: "Executive Director, CeSIA",
        link: "https://crsegerie.com/",
        image: "/photos/advisory_board/charbel.png",
      },
    ],
  },
  {
    category: "Strategy & Operations",
    members: [
      {
        name: "Richard Rushby",
        affiliation: "Director, The Entrepreneurial Ecosystem",
        link: "https://www.linkedin.com/in/richardrushby/",
        image: "/photos/advisory_board/Richard.png",
      },
      {
        name: "Jesselit Jimenez",
        affiliation: "Global Director Strategy & Transformation",
        link: "https://www.linkedin.com/in/jesselit-jimenez-65b0b891/",
        image: "/photos/advisory_board/Video_Jesselit_039_close-up.jpg",
      },
      {
      
        name: "Stephen Corlett",
        affiliation: "Brand Marketing Leader and Consultant",
        link: "https://www.linkedin.com/in/stephen-corlett-8b361731/",
        image: "/photos/advisory_board/Stephen_Corlett.jpg",
      },
    ],
  },
];

const timeline = [
  {
    year: "2023",
    title: "AISIG Founded",
    description:
      "The AI Safety Initiative Groningen (AISIG) was established as a student-led group dedicated to AI Safety education and awareness.",
  },
  {
    year: "2024",
    title: "Rapid Growth",
    description:
      "AISIG expanded beyond students to include professionals, ran multiple course cohorts, and hosted hackathons with Apart Research.",
  },
  {
    year: "2025",
    title: "National Recognition",
    description:
      "With publications at NeurIPS, ICLR, and other top venues, AISIG became a frontrunner among student-led AI Safety groups in Europe. The breadth expanded to focusing on both students and professionals. Launched the Research Hub.",
  },
  {
    year: "2026",
    title: "SAIN Launched",
    description:
      "From the successes of AISIG, AI Netherlands (SAIN) gets founded, establishing a national initiative with chapters in multiple Dutch cities and a unified infrastructure.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        id="mission"
        className="relative flex min-h-svh items-center overflow-hidden bg-white scroll-mt-28"
      >
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #021c4d 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        <div className="section-container relative z-10 w-full">
          <p className="mx-auto max-w-4xl text-center text-xl font-bold leading-relaxed text-navy-900 md:text-2xl">
            Our mission is to raise awareness of the full spectrum of existing and potential harms from AI,
            inform mitigation priorities through ongoing discourse, and support the realization of effective
            solutions.
          </p>
        </div>
        <ScrollCue href="#pipeline" />
      </section>

      {/* The SAIN Talent Pipeline. The landing makes the claim in one sentence
          and links here; this is where the shape of it lives. Every band is a
          link back to the landing section that describes that step, so the
          diagram is a way into the site rather than a picture of one. */}
      <section id="pipeline" className="section-padding scroll-mt-32 bg-white">
        <div className="section-container">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,436px)]">
            <div className="max-w-2xl">
              <FadeIn>
                <h2 className="heading-lg text-navy-900">The SAIN Talent Pipeline</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                  Each band is a step, and each one is open to anyone ready for it: a free
                  course, a community that keeps meeting once the course ends, research
                  projects that need hands, and the roles people move on to from there.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">
                  It narrows because the path narrows. A course is open to everyone, a
                  full-time role is not. Follow a band to read what that step involves.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} direction="none" className="mx-auto w-full min-w-0 max-w-[436px]">
              <TalentFunnel />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="team" className="section-padding scroll-mt-32 bg-white">
        <div className="section-container">
          <div className="mb-12 text-center">
            <h2 className="heading-lg text-navy-900">Leadership</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {leadership.map((person) => (
              <a
                key={person.name}
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex h-full flex-col p-4"
              >
                <div className="relative mb-4 aspect-4/5 w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display text-base font-semibold text-navy-900 transition-colors group-hover:text-dutch-orange">
                  {person.name}
                </h3>
                <p className="text-sm font-medium text-dutch-orange">{person.role}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section id="advisory-board" className="section-padding scroll-mt-32 bg-slate-50">
        <div className="section-container">
          <div className="mx-auto mb-12 max-w-6xl text-center">
            <h2 className="heading-lg text-navy-900">Advisory Board</h2>
          </div>

          <div className="mx-auto max-w-6xl space-y-10">
            {advisors.map((group) => (
              <div key={group.category}>
                <h3 className="mb-5 text-center font-display text-2xl font-semibold text-navy-900">
                  {group.category}
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {group.members.map((advisor) => (
                    <a
                      key={advisor.name}
                      href={advisor.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card w-full p-5 text-center sm:w-[calc(50%-0.5rem)] lg:w-64"
                    >
                      <div className="relative mb-4 aspect-4/5 w-full overflow-hidden rounded-xl bg-slate-100">
                        {advisor.image ? (
                          <Image
                            src={advisor.image}
                            alt={advisor.name}
                            fill
                            priority
                            sizes="(max-width: 1024px) 50vw, 25vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-navy-800 to-navy-900 font-display text-2xl font-semibold text-white">
                            {advisor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                        )}
                      </div>
                      <h4 className="font-display font-semibold text-navy-900">{advisor.name}</h4>
                      <p className="mt-1 text-sm font-medium text-dutch-orange">{advisor.affiliation}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div id="our-journey" className="scroll-mt-32">
            <FadeIn>
              <div className="mb-16 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-dutch-orange">
                  Our Journey
                </p>
                <h2 className="heading-lg text-navy-900">From AISIG to SAIN</h2>
              </div>
            </FadeIn>

            <div className="mx-auto max-w-3xl">
              {timeline.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.1}>
                  <div className="relative flex gap-6 pb-12 last:pb-0">
                    {i < timeline.length - 1 && (
                      <div
                        className="absolute left-6 top-12 z-0 h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-slate-200"
                        aria-hidden
                      />
                    )}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold tabular-nums text-dutch-orange ring-2 ring-dutch-orange ring-offset-2 ring-offset-white">
                      {item.year}
                    </div>
                    <div className="min-w-0 pt-1">
                      <h3 className="font-display mb-1 font-semibold text-navy-900">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-500">{item.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div id="foundational-documents" className="mt-20 scroll-mt-32 border-t border-slate-200 pt-16">
            <FadeIn>
              <div className="text-center mb-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  Foundational Documents
                </p>
                <h3 className="heading-md text-navy-900">
                  The shared framework behind SAIN
                </h3>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {sainDocuments.map((document, i) => (
                <FadeIn key={document.slug} delay={i * 0.1}>
                  <Link
                    href={`/about/${document.slug}`}
                    className="card p-6 h-full flex flex-col group"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-dutch-orange mb-3">
                      {document.eyebrow}
                    </span>
                    <h4 className="font-display font-semibold text-2xl text-navy-900 group-hover:text-dutch-orange transition-colors mb-3">
                      {document.title}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                      {document.description}
                    </p>
                    <span className="mt-auto text-sm font-semibold text-dutch-orange flex items-center gap-1">
                      Read document
                      <ArrowRight className="w-4 h-4" weight="light" aria-hidden="true" />
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </div>

            <div className="mt-16 pt-16 border-t border-slate-200">
              <FadeIn>
                <div className="mx-auto max-w-xl text-center">
                  <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                    Contact
                  </p>
                  <h3 className="heading-md text-navy-900 mb-4">
                    Emails and chapter contacts
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-8">
                    National role addresses, chapter teams, and leadership inboxes
                    live on one page so we keep details accurate and avoid repeating
                    long lists here.
                  </p>
                  <Link href="/contact" className="btn-primary inline-flex">
                    Contact &amp; emails
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="section-padding bg-navy-950">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                How We Work
              </p>
              <h2 className="heading-lg text-white mb-4">
                National infrastructure, local impact
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                SAIN operates as a national umbrella with local chapters. Each
                chapter operates autonomously while benefiting from shared
                resources, branding, and legal infrastructure.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "National Level",
                items: [
                  "Research Hub & fellowship program",
                  "Substack & national media",
                  "Shared Google Workspace & infrastructure",
                  "Legal entity & financial administration",
                  "Advisory board & partnerships",
                ],
              },
              {
                title: "Chapter Level",
                items: [
                  "Local courses & discussion groups",
                  "Regional events & hackathons",
                  "City-specific outreach",
                  "Local team & leadership",
                  "Community building",
                ],
              },
              {
                title: "What Chapters Get",
                items: [
                  "SAIN brand & authority",
                  "Operational playbooks & templates",
                  "Centralized digital infrastructure",
                  "Mentorship from experienced organizers",
                  "No need for separate legal registration",
                ],
              },
            ].map((col, i) => (
              <FadeIn key={col.title} delay={i * 0.15}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-white mb-4">
                    {col.title}
                  </h3>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-slate-300"
                      >
                        <Check className="w-4 h-4 text-dutch-orange shrink-0 mt-0.5" weight="light" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <Link href="/get-involved" className="btn-primary">
                Get Involved
              </Link>
              <Link href="/get-involved#start-chapter" className="btn-secondary">
                Start a Chapter
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
