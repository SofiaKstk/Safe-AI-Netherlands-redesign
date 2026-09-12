"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import {
  chapterContactLinks,
  chapterRoleEmails,
  leadershipContacts,
  nationalContacts,
} from "@/data/siteContact";

const socials = [
  {
    name: "Substack",
    href: "https://safeainetherlands.substack.com/",
    description: "Weekly articles on AI Safety",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/safe-ai-netherlands/",
    description: "Follow us for updates",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pb-20 pt-16 md:pb-28 md:pt-20 bg-white overflow-hidden">
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

        <div className="section-container relative z-10">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-4">
              Contact
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-navy-900 max-w-3xl mb-6">
              Get in touch
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              National addresses, chapter teams, named leads, and links to each
              city&apos;s Join &amp; contact section.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* National functional emails */}
      <section id="national-emails" className="section-padding bg-white scroll-mt-28">
        <div className="section-container">
          <FadeIn>
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                National
              </p>
              <h2 className="heading-lg text-navy-900">
                Functional email addresses
              </h2>
              <p className="mt-3 text-sm text-slate-500 max-w-2xl">
                Use these when you know the topic but not which person should read it.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {nationalContacts.map((contact, i) => (
              <FadeIn key={contact.email} delay={Math.min(i * 0.05, 0.25)}>
                <a
                  href={`mailto:${contact.email}`}
                  className="card p-5 h-full flex flex-col"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-dutch-orange mb-2">
                    {contact.label}
                  </span>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    {contact.detail}
                  </p>
                  <div className="mt-auto min-w-0 w-full overflow-x-auto scrollbar-thin">
                    <span className="inline-block text-sm font-medium text-navy-900 whitespace-nowrap">
                      {contact.email}
                    </span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Leadership
              </p>
              <h2 className="heading-lg text-navy-900">
                Named contacts
              </h2>
              <p className="mt-3 text-sm text-slate-500 max-w-2xl">
                National, chapter, and personal addresses where we list more than one inbox for someone.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
            {leadershipContacts.map((person, i) => (
              <FadeIn key={person.names} delay={Math.min(i * 0.06, 0.2)}>
                <div className="card p-6 h-full flex flex-col">
                  <h3 className="font-display font-semibold text-navy-900 mb-1">
                    {person.names}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">{person.role}</p>
                  <ul className="space-y-3 mt-auto">
                    {person.emails.map((row) => (
                      <li
                        key={`${person.names}-${row.label}-${row.email}`}
                        className="text-sm border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                      >
                        <span className="block text-xs uppercase tracking-wide text-slate-400 mb-1">
                          {row.label}
                        </span>
                        <a
                          href={`mailto:${row.email}`}
                          className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors break-normal"
                        >
                          {row.email}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {person.linkedin ? (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-xs text-slate-400 hover:text-navy-900 transition-colors"
                    >
                      Website / profile
                    </a>
                  ) : null}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter role emails */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Chapters
              </p>
              <h2 className="heading-lg text-navy-900">
                Role emails by city
              </h2>
              <p className="mt-3 text-sm text-slate-500">
                Same breakdown as each chapter&apos;s Join &amp; contact section:
                formal collaboration, community, education, events, outreach, and more.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {chapterRoleEmails.map((block, bi) => (
              <FadeIn key={block.chapter} delay={Math.min(bi * 0.08, 0.24)}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 min-w-0 h-full flex flex-col">
                  <h3 className="font-display font-semibold text-lg text-navy-900 mb-1">
                    {block.chapter}
                  </h3>
                  <Link
                    href={block.joinHref}
                    className="text-sm font-medium text-dutch-orange hover:text-dutch-orange-dark mb-5"
                  >
                    Join &amp; contact on chapter page →
                  </Link>
                  <ul className="space-y-0 text-sm flex-1 divide-y divide-slate-200/80">
                    {block.roles.map((row) => (
                      <li
                        key={`${block.chapter}-${row.label}`}
                        className="grid grid-cols-1 md:grid-cols-[minmax(0,max-content)_minmax(0,1fr)] gap-x-4 gap-y-1 py-3 items-start min-w-0"
                      >
                        <span className="text-slate-500 shrink-0">{row.label}</span>
                        <div className="min-w-0 md:flex md:justify-end md:overflow-x-auto md:scrollbar-thin">
                          <a
                            href={`mailto:${row.email}`}
                            className="inline-block font-medium text-navy-900 hover:text-dutch-orange transition-colors whitespace-nowrap"
                          >
                            {row.email}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {chapterContactLinks.map((chapter) => (
                <Link
                  key={chapter.name}
                  href={chapter.href}
                  className="btn-outline"
                >
                  {chapter.name}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Socials */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Stay connected
              </p>
              <h2 className="heading-lg text-navy-900">
                Find us online
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {socials.map((social, i) => (
              <FadeIn key={social.name} delay={i * 0.1}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-6 text-center group"
                >
                  <h3 className="font-display font-semibold text-navy-900 group-hover:text-dutch-orange transition-colors mb-1">
                    {social.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {social.description}
                  </p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-lg mx-auto text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Postal address
              </p>
              <h2 className="heading-md text-navy-900 mb-4">
                Stichting Safe AI Netherlands
              </h2>
              <p className="text-slate-500">
                Hereplein 4<br />
                9711 GA Groningen<br />
                The Netherlands
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
