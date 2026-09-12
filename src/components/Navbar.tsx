"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasOpenPositions } from "@/data/openPositions";
import { CaretDown, List, X } from "@phosphor-icons/react/dist/ssr";

/* The authorship shell: a civic broadcast strip, then the header. The strip
   scrolls away once read; the header pins to the top for the rest of the page.
   Nav is a flat row of routes — no filled active pill, no desktop hamburger. */

/* The three chapters, in the order the landing lists them. Community is the
   only route that fans out: the city is what people are actually looking for,
   so the nav hands it over directly instead of routing through an anchor.
   City names only — a description of each track is the chapter page's job. */
const chapters = [
  { city: "Utrecht", href: "/chapters/utrecht" },
  { city: "Groningen", href: "/chapters/groningen" },
  { city: "Amsterdam", href: "/chapters/amsterdam" },
];

const navigation: {
  name: string;
  href: string;
  isActive: (path: string) => boolean;
}[] = [
  {
    name: "Courses",
    href: "/get-involved#courses",
    isActive: (p) => p === "/get-involved",
  },
  {
    name: "Community",
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
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setChaptersOpen(false);
  }, [pathname]);

  /* Escape closes the menu wherever focus sits, and a press anywhere outside
     dismisses it — the two exits people try before reaching for the trigger. */
  useEffect(() => {
    if (!chaptersOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setChaptersOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!chaptersRef.current?.contains(event.target as Node)) {
        setChaptersOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [chaptersOpen]);

  return (
    <>
      {/* The broadcast is read once on arrival, then it scrolls away. Only the
          header pins, so the nav sits at the very top rather than 42px down
          behind a strip the reader has already taken in. */}
      {hasOpenPositions && (
        <div className="flex items-center justify-center gap-3 bg-orange px-6 py-[11px] md:px-12">
          <p className="kicker text-[15px] leading-5 text-white/85">
            We are hiring
          </p>
          <span
            className="hidden h-px w-[22px] bg-white/50 sm:block"
            aria-hidden="true"
          />
          <Link
            href="/open-positions"
            className="font-sans text-[13.5px] leading-[18px] text-white underline decoration-white/45 underline-offset-4 transition-colors hover:decoration-white"
          >
            See open positions
          </Link>
        </div>
      )}

      {/* The mobile panel lives inside the sticky box so it travels with the
          header instead of being left behind at its original offset. */}
      <div className="sticky top-0 z-50">
        <header className="border-b border-navy/10 bg-white/94 backdrop-blur-sm">
          <div className="shell flex min-h-[70px] items-center justify-between gap-6 py-3.5">
            <Link
              href="/"
              className="shrink-0"
              aria-label="Safe AI Netherlands home"
            >
              <img
                src="/landing/logo-navy-121.png"
                srcSet="/landing/logo-navy-121.png 1x, /landing/logo-navy-242.png 2x, /landing/logo-navy-363.png 3x"
                alt="Safe AI Netherlands"
                /* 50px. Past 42px the lockup no longer fits the 70px header, so
                 the bar grows with it rather than cropping the mark. */
                className="h-[50px] w-auto"
                width={121}
                height={50}
              />
            </Link>

            <nav
              className="hidden items-center gap-[30px] lg:flex"
              aria-label="Primary"
            >
              {navigation.map((item) => {
                const active = item.isActive(pathname);
                const underline = active
                  ? "border-navy"
                  : "border-transparent hover:border-navy/40";

                /* Community opens the chapter list rather than jumping to the
                   landing anchor — three cities, nothing else. The anchor is
                   still what the mobile row points at. */
                if (item.name === "Community") {
                  return (
                    <div
                      key={item.name}
                      ref={chaptersRef}
                      className="relative"
                      onMouseEnter={() => setChaptersOpen(true)}
                      onMouseLeave={() => setChaptersOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setChaptersOpen((open) => !open)}
                        aria-expanded={chaptersOpen}
                        aria-haspopup="true"
                        aria-controls="chapters-menu"
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-1.5 border-b py-0.5 font-sans text-sm leading-5 text-navy transition-colors ${underline}`}
                      >
                        {item.name}
                        <CaretDown
                          size={11}
                          weight="bold"
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${
                            chaptersOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {chaptersOpen && (
                        /* The 14px gap between trigger and panel sits inside
                           this wrapper's padding, so the pointer can travel
                           down without the menu closing underneath it. */
                        <div
                          id="chapters-menu"
                          className="absolute left-0 top-full pt-3.5"
                        >
                          <div className="w-[186px] border border-navy/12 bg-white">
                            {chapters.map((chapter) => (
                              <Link
                                key={chapter.city}
                                href={chapter.href}
                                onClick={() => setChaptersOpen(false)}
                                aria-current={
                                  pathname === chapter.href ? "page" : undefined
                                }
                                className="block px-5 py-2.5 font-sans text-sm leading-5 text-navy transition-colors hover:bg-cream"
                              >
                                {chapter.city}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`border-b py-0.5 font-sans text-sm leading-5 text-navy transition-colors ${underline}`}
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
              {mobileOpen ? (
                <X size={18} weight="light" aria-hidden="true" />
              ) : (
                <List size={18} weight="light" aria-hidden="true" />
              )}
            </button>
          </div>
        </header>

        {mobileOpen && (
          <nav
            id="mobile-nav"
            className="border-b border-navy/10 bg-white lg:hidden"
            aria-label="Mobile"
          >
            <div className="shell flex flex-col gap-1 py-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 font-sans text-sm leading-5 text-navy"
                  >
                    {item.name}
                  </Link>
                  {/* No disclosure here: three rows are cheaper to read than a
                      toggle that hides them behind a second tap. */}
                  {item.name === "Community" && (
                    <div className="mb-1 ml-4 flex flex-col border-l border-navy/12">
                      {chapters.map((chapter) => (
                        <Link
                          key={chapter.city}
                          href={chapter.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-1.5 pl-4 font-sans text-[13.5px] leading-[18px] text-navy/70"
                        >
                          {chapter.city}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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
    </>
  );
}
