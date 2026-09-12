"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasOpenPositions } from "@/data/openPositions";

/* The authorship shell: a civic broadcast strip, then the header. Both are
   sticky, so the announcement stays part of the page rather than scrolling
   away like a marketing banner. Nav is a flat row of routes — no filled
   active pill, no desktop hamburger. */

const navigation: { name: string; href: string; isActive: (path: string) => boolean }[] = [
  {
    name: "Courses",
    href: "/get-involved#courses",
    isActive: (p) => p === "/get-involved",
  },
  {
    name: "Chapters",
    href: "/#chapters",
    isActive: (p) => p.startsWith("/chapters"),
  },
  {
    name: "Research hub",
    href: "/research",
    isActive: (p) => p.startsWith("/research"),
  },
  {
    name: "About",
    href: "/about",
    isActive: (p) => p === "/about" || p.startsWith("/about/"),
  },
  {
    name: "Careers",
    href: "/open-positions",
    isActive: (p) => p.startsWith("/open-positions"),
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="sticky top-0 z-50">
      {hasOpenPositions && (
        <div className="flex items-center justify-center gap-3 bg-orange px-6 py-[11px] md:px-12">
          <p className="kicker text-[15px] leading-5 text-white/85">We are hiring</p>
          <span className="hidden h-px w-[22px] bg-white/50 sm:block" aria-hidden="true" />
          <Link
            href="/open-positions"
            className="font-sans text-[13.5px] leading-[18px] text-white underline decoration-white/45 underline-offset-4 transition-colors hover:decoration-white"
          >
            See open positions
          </Link>
        </div>
      )}

      <header className="border-b border-navy/10 bg-white/94 backdrop-blur-sm">
        <div className="shell flex min-h-[70px] items-center justify-between gap-6 py-3.5">
          <Link href="/" className="shrink-0" aria-label="Safe AI Netherlands home">
            <img
              src="/landing/logo-navy.png"
              alt="Safe AI Netherlands"
              /* 50px. Past 42px the lockup no longer fits the 70px header, so
                 the bar grows with it rather than cropping the mark. */
              className="h-[50px] w-auto"
              width={121}
              height={50}
            />
          </Link>

          <nav className="hidden items-center gap-[30px] lg:flex" aria-label="Primary">
            {navigation.map((item) => {
              const active = item.isActive(pathname);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b py-0.5 font-sans text-sm leading-5 text-navy transition-colors ${
                    active ? "border-navy" : "border-transparent hover:border-navy/40"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2.5 sm:flex">
            <Link href="/get-involved" className="btn-ghost">
              Volunteer
            </Link>
            <Link href="/get-involved#courses" className="btn-ink">
              Join a free course
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center border border-navy/20 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {mobileOpen ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="#021C4D" strokeWidth="1.4" />
              ) : (
                <path d="M3 5h12M3 9h12M3 13h12" stroke="#021C4D" strokeWidth="1.4" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {mobileOpen && (
        <nav id="mobile-nav" className="border-b border-navy/10 bg-white lg:hidden" aria-label="Mobile">
          <div className="shell flex flex-col gap-1 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 font-sans text-sm leading-5 text-navy"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="py-2 font-sans text-sm leading-5 text-navy"
            >
              Contact
            </Link>
            <Link
              href="/get-involved"
              onClick={() => setMobileOpen(false)}
              className="mt-2 border border-navy/20 px-4 py-2.5 text-center font-sans text-[13.5px] leading-[18px] text-navy"
            >
              Volunteer
            </Link>
            <Link
              href="/get-involved#courses"
              onClick={() => setMobileOpen(false)}
              className="bg-navy px-4 py-2.5 text-center font-sans text-[13.5px] leading-[18px] text-white"
            >
              Join a free course
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
