import Link from "next/link";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";

/* Inverse navy close. Newsreader italic for the stichting line and the column
   titles, Archivo for the links. One bottom rule, then the legal line and the
   cities. No second logo treatment. */

type FooterLink = { name: string; href: string; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Community",
    links: [
      { name: "Chapters", href: "/#chapters" },
      { name: "Groningen", href: "/chapters/groningen" },
      { name: "Amsterdam", href: "/chapters/amsterdam" },
      { name: "Utrecht", href: "/chapters/utrecht" },
      { name: "Join the community", href: COMMUNITY_JOIN_URL, external: true },
    ],
  },
  {
    title: "Programmes",
    links: [
      { name: "Courses", href: "/get-involved#courses" },
      { name: "Discussion groups", href: "/get-involved#discussion-groups" },
      { name: "Events", href: "/get-involved#events" },
      { name: "Research hub", href: "/research" },
      { name: "Research handbook", href: "/research/handbook" },
    ],
  },
  {
    title: "Organisation",
    links: [
      { name: "About", href: "/about" },
      { name: "Team", href: "/team" },
      { name: "Open positions", href: "/open-positions" },
      { name: "Contact", href: "/contact" },
      { name: "Newsletter", href: "https://safeainetherlands.substack.com/", external: true },
    ],
  },
];

const documents: FooterLink[] = [
  { name: "Vision", href: "/about/vision" },
  { name: "Theory of Change", href: "/about/theory-of-change" },
  { name: "Code of Conduct", href: "/about/code-of-conduct" },
];

function FooterAnchor({ link }: { link: FooterLink }) {
  const className =
    "font-sans text-sm leading-5 text-white/78 transition-colors hover:text-white";

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.name}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.name}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/16 bg-navy">
      <div className="shell pb-10 pt-[52px]">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex w-full max-w-[420px] flex-col gap-3.5 lg:max-w-[300px] lg:shrink-0 xl:max-w-[420px]">
            <img
              src="/landing/logo-light-113.png"
              srcSet="/landing/logo-light-113.png 1x, /landing/logo-light-226.png 2x, /landing/logo-light-339.png 3x"
              alt="Safe AI Netherlands"
              className="h-12 w-auto self-start"
              width={113}
              height={48}
            />
            <p className="kicker text-[15px] leading-5 text-white/50">
              Stichting Safe AI Netherlands
            </p>
            <a
              href="mailto:info@safeainetherlands.org"
              className="font-sans text-sm leading-5 text-white/78 transition-colors hover:text-white"
            >
              info@safeainetherlands.org
            </a>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-[11px]">
                <p className="kicker text-[15px] leading-5 text-white/50">{column.title}</p>
                {column.links.map((link) => (
                  <FooterAnchor key={link.name} link={link} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[26px] flex flex-col justify-between gap-3 border-t border-white/16 pt-[18px] sm:flex-row sm:items-center">
          <p className="font-sans text-[13px] leading-[18px] text-white/45">
            &copy; {new Date().getFullYear()} Safe AI Netherlands
          </p>
          <div className="flex flex-wrap gap-5">
            {documents.map((document) => (
              <Link
                key={document.name}
                href={document.href}
                className="font-sans text-[13px] leading-[18px] text-white/45 transition-colors hover:text-white/80"
              >
                {document.name}
              </Link>
            ))}
          </div>
          <p className="font-sans text-[13px] leading-[18px] text-white/45">
            Utrecht &middot; Groningen &middot; Amsterdam
          </p>
        </div>
      </div>
    </footer>
  );
}
