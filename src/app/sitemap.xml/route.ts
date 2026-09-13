const siteUrl = "https://safeainetherlands.org";

const routes = [
  "",
  "/community",
  "/courses",
  "/about",
  "/research",
  "/team",
  "/get-involved",
  "/contact",
  "/chapters/groningen",
  "/chapters/groningen/events",
  "/chapters/utrecht",
  "/chapters/amsterdam",
  "/research/handbook",
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const lastmod = new Date().toISOString();

  const urls = routes
    .map((route, index) => {
      const loc = escapeXml(`${siteUrl}${route}`);
      const changefreq = index === 0 ? "weekly" : "monthly";
      const priority = index === 0 ? "1.0" : "0.8";

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
