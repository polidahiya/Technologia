"use server";
import { Cachedproducts } from "@/app/_globalcomps/cachedata/cachedProducts";
const baseurl = "https://tecknologia.in";
// Utility functions
const xmlEscape = (str) =>
  str
    ?.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const today = new Date().toISOString();

const allProducts = (products) =>
  products.map((p) => ({
    loc: `${baseurl}/main/product/${p?._id}`,
    lastmod: new Date(p?.lastupdated).toISOString() || today,
    changefreq: "daily",
    priority: "0.9",
  }));
const comparisons = (products) => {
  const allcomparisons = [];

  return allcomparisons;
};

export async function GET() {
  try {
    // Fetch data in parallel
    const [allproducts] = await Promise.all([Cachedproducts()]);
    const latestproducts = allproducts.sort(
      (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
    );

    // Generate all URLs
    const allUrls = [
      {
        loc: baseurl,
        lastmod: today,
        changefreq: "daily",
        priority: "1.0",
      },
      ...allProducts(latestproducts),
      ...comparisons(latestproducts),
    ];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allUrls
    .map(
      (url) => `
    <url>
      <loc>${xmlEscape(url.loc)}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
      ${
        url.image
          ? `<image:image>
        <image:loc>${xmlEscape(url.image)}</image:loc>
        <image:caption>${xmlEscape(url.name)}</image:caption>
        <image:title>${xmlEscape(url.name)}</image:title>
      </image:image>`
          : ""
      }
    </url>`
    )
    .join("\n")}
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Sitemap Generation Error:", error);
    return new Response(
      `<error><message>Failed to generate sitemap</message></error>`,
      { status: 500, headers: { "Content-Type": "application/xml" } }
    );
  }
}
