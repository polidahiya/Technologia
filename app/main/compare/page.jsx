import React from "react";
import Comparewith from "../product/[id]/_comps/Comparewith";
import { CachedProduct } from "@/app/_globalcomps/cachedata/cachedProducts";
import Topcomparisons from "../_comps/Topcomparisons";
import Compareslots from "./_comps/Compareslots";
import CompareSEOContent from "./_comps/CompareSEOContent";
import Disclaimer from "../_comps/Disclaimer";

async function page({ searchParams }) {
  const { p1 = null } = await searchParams;
  const product = p1 ? await CachedProduct(p1) : null;
  return (
    <div className="p-2 space-y-2 min-h-screen">
      <section className="text">
        <h1 className="">Compare Smartphones & Tablets Side by Side</h1>

        <p className="">
          Use Tecknologia’s advanced comparison tool to compare smartphones and
          tablets online. Analyze specifications, performance, cameras, battery
          life, pricing in India, and more — all in one structured, side-by-side
          view.
        </p>

        <p>
          Select a device in the first slot below and add up to two more
          products to instantly see the differences. You can also explore
          popular comparisons to check trending phone matchups.
        </p>
      </section>
      <Compareslots slot1={product} />
      {product && (
        <Comparewith product={product} maxproducts={99} skipvariant={true} />
      )}
      <Topcomparisons />
      <div className="text">
        <CompareSEOContent product={product} />
      </div>
      <Disclaimer />
    </div>
  );
}

export async function generateMetadata({ searchParams }) {
  const { p1 = null } = await searchParams;
  const product = p1 ? await CachedProduct(p1) : null;

  // ✅ CASE 1: No product selected (All slots empty)
  if (!product) {
    const title =
      "Compare Smartphones & Tablets Online – Side by Side Mobile Comparison | Tecknologia";

    const description =
      "Compare smartphones and tablets side by side on Tecknologia. Explore detailed specs, prices in India, performance, camera, battery life and popular phone comparisons to find the best device for you.";

    const keywords = [
      "compare smartphones online",
      "mobile comparison India",
      "phone vs phone comparison",
      "tablet comparison tool",
      "best phone comparison site",
      "latest phone comparisons 2026",
      "popular mobile comparisons",
    ];

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `https://tecknologia.in/main/compare`,
      },
      openGraph: {
        title,
        description,
        url: `https://tecknologia.in/main/compare`,
        siteName: "Tecknologia",
        locale: "en_IN",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  // ✅ CASE 2: Product exists in Slot 1
  const title = `${product.model} vs Other Phones – Full Comparison & Specs | Tecknologia`;

  const description = `Compare ${product.model} (${product.variant}) with other smartphones and tablets. Check specs, price in India, performance, camera, battery, and full side-by-side comparison.`;

  const keywords = [
    `${product.model} comparison`,
    `${product.model} vs`,
    `compare ${product.model}`,
    `${product.model} price India`,
    `${product.model} specs`,
    "smartphone comparison tool",
    "mobile compare online India",
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://tecknologia.in/main/compare?p1=${p1}`,
    },
    openGraph: {
      title,
      description,
      url: `https://tecknologia.in/main/compare?p1=${p1}`,
      siteName: "Tecknologia",
      images: product.images?.[0]
        ? [
            {
              url: product.images[0],
              width: 800,
              height: 600,
            },
          ]
        : [],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default page;
