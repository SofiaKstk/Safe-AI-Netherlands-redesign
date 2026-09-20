import type { Metadata } from "next";
import { Archivo, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoursePopup from "@/components/CoursePopup";

/* IBM Plex Serif gives headings and editorial labels their scholarly voice. */
const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-plex-serif",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

/* Archivo is the work: everything you read as a sentence of interface. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://safeainetherlands.org"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Safe AI Netherlands",
    template: "%s | SAIN",
  },
  description:
    "SAIN provides the community, courses and resources to help students and professionals join the AI Safety field in the Netherlands. Every programme is free.",
  keywords: [
    "AI Safety",
    "Netherlands",
    "SAIN",
    "AI research",
    "AI governance",
    "AI alignment",
    "AI ethics",
  ],
  verification: {
    google: "k0Z89-ZBoJwJsgttXh8i0RILGDy72FQR9N2ynoyFgYg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  /* Served straight from public/ rather than rasterised on the fly. The old
     /icon route used next/og, whose bundled font it cannot resolve on Windows,
     so both `next dev` and `next build` failed there. A static SVG needs no
     runtime and satisfies `output: export`. Still missing: a 180x180 PNG
     apple-touch-icon, since iOS does not render SVG icons. */
  icons: {
    icon: [
      { url: "/sain-symbol.svg", type: "image/svg+xml" },
      { url: "/sain-symbol.svg", sizes: "any" },
    ],
    shortcut: ["/sain-symbol.svg"],
  },
  openGraph: {
    title: "Safe AI Netherlands",
    description:
      "SAIN provides the community, courses and resources to help students and professionals join the AI Safety field in the Netherlands. Every programme is free.",
    url: "https://safeainetherlands.org",
    siteName: "Safe AI Netherlands",
    images: [
      {
        url: "/sain-symbol.svg",
        width: 512,
        height: 512,
        alt: "Safe AI Netherlands logo",
      },
    ],
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Safe AI Netherlands",
  alternateName: "SAIN",
  url: "https://safeainetherlands.org",
  logo: "https://safeainetherlands.org/sain-symbol.svg",
  sameAs: [
    "https://www.linkedin.com/company/safe-ai-netherlands/",
    "https://www.instagram.com/sainetherlands/",
    "https://safeainetherlands.substack.com/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${plexSerif.variable} ${archivo.variable}`}
    >
      <head>
        <link rel="prefetch" href="/about" />
        <link rel="prefetch" href="/get-involved" />
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-navy antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-100 focus:bg-white focus:px-4 focus:py-2 focus:text-navy focus:outline focus:outline-2 focus:outline-navy"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* Renders nothing unless a chapter is taking applications, or the URL
            carries ?preview-popup. */}
        <CoursePopup />
      </body>
    </html>
  );
}
