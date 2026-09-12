"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { hasOpenPositions } from "@/data/openPositions";

type NavChild = { name: string; href: string } | { divider: true };

type NavItem =
  | { type: "link"; name: string; href: string }
  | {
      type: "menu";
      name: string;
      /** When set, the label is a link to this path; chevron opens submenu. */
      parentHref: string | null;
      children: NavChild[];
    };

const navigation: NavItem[] = [
  {
    type: "menu",
    name: "Get Involved",
    parentHref: "/get-involved",
    children: [
      {
        name: hasOpenPositions ? "Open positions" : "Join the team",
        href: "/open-positions",
      },
      { divider: true },
      { name: "Courses", href: "/get-involved#courses" },
      { name: "Discussion groups", href: "/get-involved#discussion-groups" },
      { name: "Events", href: "/get-involved#events" },
      { name: "Research Hub", href: "/get-involved#research-hub" },
    ],
  },
  {
    type: "menu",
    name: "About Us",
    parentHref: "/about",
    children: [
      { name: "Mission", href: "/about#mission" },
      { name: "Leadership", href: "/about#team" },
      { name: "Advisory Board", href: "/about#advisory-board" },
      { name: "Our Journey", href: "/about#our-journey" },
      { name: "Foundational documents", href: "/about#foundational-documents" },
    ],
  },
  {
    type: "menu",
    name: "Chapters",
    parentHref: null,
    children: [
      { name: "SAIN Groningen", href: "/chapters/groningen" },
      { name: "SAIN Amsterdam", href: "/chapters/amsterdam" },
      { name: "SAIN Utrecht", href: "/chapters/utrecht" },
      { divider: true },
      { name: "Start a Chapter", href: "/get-involved#start-chapter" },
    ],
  },
  { type: "link", name: "Contact", href: "/contact" },
];

function menuIsActive(item: Extract<NavItem, { type: "menu" }>, pathname: string) {
  if (item.parentHref === "/get-involved") {
    return pathname === "/get-involved" || pathname.startsWith("/open-positions");
  }
  if (item.parentHref === "/about") {
    return pathname === "/about" || pathname.startsWith("/about/");
  }
  if (item.parentHref === null) {
    return pathname.startsWith("/chapters");
  }
  return false;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const onDarkChapterHero =
    (pathname.startsWith("/chapters/groningen") ||
      pathname === "/chapters/amsterdam" ||
      pathname.startsWith("/chapters/utrecht")) &&
    !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  const isSimpleActive = (href: string) => pathname === href;

  const inactiveDesktop = onDarkChapterHero
    ? "text-white/85 hover:text-white hover:bg-white/10"
    : "text-slate-600 hover:text-navy-900 hover:bg-slate-50";

  const activeDesktop = onDarkChapterHero ? "text-white" : "text-dutch-orange";

  const renderDropdownPanel = (children: NavChild[]) => (
    <div className="absolute left-0 top-full mt-1 w-56 animate-fade-in rounded-xl border border-slate-100 bg-white py-2 shadow-lg">
      {children.map((child, i) =>
        "divider" in child ? (
          <div key={i} className="my-1 border-t border-slate-100" />
        ) : (
          <Link
            key={child.name}
            href={child.href}
            className="block px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-dutch-orange"
          >
            {child.name}
          </Link>
        ),
      )}
    </div>
  );

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-slate-100 bg-white/95 shadow-xs backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="section-container flex h-28 items-center justify-between md:h-32">
        <Logo
          inverted={onDarkChapterHero}
          className={scrolled ? "text-navy-900" : onDarkChapterHero ? "text-white" : "text-navy-900"}
        />

        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            if (item.type === "link") {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-lg px-4 py-2 text-base font-medium transition-colors ${
                    isSimpleActive(item.href) && !onDarkChapterHero ? activeDesktop : inactiveDesktop
                  }`}
                >
                  {item.name}
                </Link>
              );
            }

            const menuActive = menuIsActive(item, pathname) && !onDarkChapterHero;
            const sharedActiveClass = menuActive ? activeDesktop : inactiveDesktop;
            const open = openMenu === item.name;

            if (item.parentHref) {
              return (
                <div
                  key={item.name}
                  className="relative flex items-center rounded-lg"
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setTimeout(() => setOpenMenu((m) => (m === item.name ? null : m)), 120);
                    }
                  }}
                >
                  <Link
                    href={item.parentHref}
                    className={`rounded-l-lg py-2 pl-4 pr-2 text-base font-medium transition-colors ${sharedActiveClass}`}
                  >
                    {item.name}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="menu"
                    aria-label={`${item.name} submenu`}
                    className={`rounded-r-lg py-2 pl-1 pr-3 transition-colors ${sharedActiveClass}`}
                    onClick={() => setOpenMenu(open ? null : item.name)}
                  >
                    <Chevron open={open} />
                  </button>
                  {open && renderDropdownPanel(item.children)}
                </div>
              );
            }

            return (
              <div
                key={item.name}
                className="relative"
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setTimeout(() => setOpenMenu((m) => (m === item.name ? null : m)), 120);
                  }
                }}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-haspopup="menu"
                  className={`flex items-center gap-1 rounded-lg px-4 py-2 text-base font-medium transition-colors ${sharedActiveClass}`}
                  onClick={() => setOpenMenu(open ? null : item.name)}
                >
                  {item.name}
                  <Chevron open={open} />
                </button>
                {open && renderDropdownPanel(item.children)}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`rounded-lg p-2 md:hidden ${
            onDarkChapterHero
              ? "text-white/85 hover:bg-white/10 hover:text-white"
              : "text-slate-600 hover:bg-slate-50 hover:text-navy-900"
          }`}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="animate-fade-in border-t border-slate-100 bg-white shadow-lg md:hidden">
          <div className="section-container space-y-1 py-4">
            {navigation.map((item) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block rounded-lg px-4 py-2.5 text-sm font-medium ${
                      isSimpleActive(item.href) ? "text-dutch-orange" : "text-slate-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }

              const menuActive =
                item.parentHref === "/get-involved"
                  ? pathname === "/get-involved" ||
                    pathname.startsWith("/open-positions")
                  : item.parentHref === "/about"
                    ? pathname === "/about" || pathname.startsWith("/about/")
                    : pathname.startsWith("/chapters");

              return (
                <div key={item.name} className="space-y-0.5">
                  {item.parentHref ? (
                    <Link
                      href={item.parentHref}
                      className={`block rounded-lg px-4 py-2.5 text-sm font-medium ${
                        menuActive ? "text-dutch-orange" : "text-slate-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {item.name}
                    </div>
                  )}
                  {item.children.map((child, i) =>
                    "divider" in child ? (
                      <div key={i} className="my-1 border-t border-slate-100" />
                    ) : (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block rounded-lg py-2 pl-8 pr-4 text-sm text-slate-600 hover:text-dutch-orange"
                      >
                        {child.name}
                      </Link>
                    ),
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
