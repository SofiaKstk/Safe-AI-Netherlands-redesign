"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasOpenPositions } from "@/data/openPositions";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

/* The authorship shell: a civic broadcast strip, then the header. The strip
   scrolls away once read; the header pins to the top for the rest of the page.
   Nav is a flat row of three routes. No filled active pill, no desktop
   hamburger, no dropdowns: the /community page hands out the city doors, so
   Community is a plain link like the other two. */

const navigation: {
  name: string;
  href: string;
  isActive: (path: string) => boolean;
}[] = [
  {
    name: "Community",
    href: "/community",
    /* The chapter pages live under the Community door, so they light it up. */
    isActive: (p) =>
      p === "/community" ||
      p.startsWith("/community/") ||
      p.startsWith("/chapters"),
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
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* The broadcast is read once on arrival, then it scrolls away. Only the
          header pins, so the nav sits at the very top rather than 42px down
          behind a strip the reader has already taken in. */}
      {hasOpenPositions && (
        <div className="flex items-center justify-center gap-3 bg-orange px-6 py-[11px] md:px-12">
          <p className="kicker text-kicker-sm text-white/85">
            We are hiring
          </p>
          <span
            className="hidden h-px w-[22px] bg-white/50 sm:block"
            aria-hidden="true"
          />
          <Link
            href="/open-positions"
            className="font-sans text-caption text-white underline decoration-white/45 underline-offset-4 transition-colors hover:decoration-white focus-visible:decoration-white"
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
                  : "border-transparent hover:border-navy/40 focus-visible:border-navy/40";

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
              <Link href="/get-involved" className="btn-ghost min-h-[44px]">
                Volunteer
              </Link>
              <Link href="/courses" className="btn-ink min-h-[44px]">
                Join a free course
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex size-11 items-center justify-center border border-navy/20 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <XIcon size={18} weight="light" aria-hidden="true" />
              ) : (
                <ListIcon size={18} weight="light" aria-hidden="true" />
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
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={item.isActive(pathname) ? "page" : undefined}
                  className="flex min-h-[44px] items-center font-sans text-sm leading-5 text-navy"
                >
                  {item.name}
                </Link>
              ))}
              {/* The header keeps both calls to action from sm up, so the sheet
                  only carries them on the narrowest screens -- otherwise the
                  same two buttons show twice between sm and lg. */}
              <Link
                href="/get-involved"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex min-h-[44px] items-center justify-center border border-navy/20 px-4 text-center font-sans text-caption text-navy sm:hidden"
              >
                Volunteer
              </Link>
              <Link
                href="/courses"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center justify-center bg-navy px-4 text-center font-sans text-caption text-white sm:hidden"
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
