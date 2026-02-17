import React from "react";
import Getproducts from "@/lib/Getproducts";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";

const ranges = [
  { min: 0, max: 10000 },
  { min: 10000, max: 12000 },
  { min: 12000, max: 15000 },
  { min: 15000, max: 18000 },
  { min: 18000, max: 20000 },
  { min: 20000, max: 25000 },
  { min: 25000, max: 30000 },
  { min: 30000, max: 35000 },
  { min: 35000, max: 40000 },
  { min: 40000, max: 50000 },
  { min: 50000, max: 60000 },
  { min: 60000, max: 80000 },
  { min: 80000, max: 100000 },
  { min: 80000, max: 100000 },
  { min: 100000, max: 120000 },
  { min: 120000, max: 150000 },
  { min: 150000, max: 200000 },
  { min: 200000, max: 300000 },
  { min: 300000, max: 400000 },
  { min: 400000, max: 500000 },
];

function getMaxPriceRange(price) {
  const range = ranges.find((r) => price > r.min && price <= r.max);
  return range ? range.max : null;
}

export default async function Topfives({ price, deviceType }) {
  const Price = Number(price?.[0]?.sp || price?.[0]?.mrp);
  const maxPrice = getMaxPriceRange(Price);

  const data = await unstable_cache(
    async () => {
      const a = await Promise.all([
        Getproducts(
          "",
          {
            ReleaseDate: "available",
            Device: deviceType.toLowerCase() || "smartphone",
            Price: `0-${maxPrice}`,
          },
          "totalscore",
          5,
          true,
          true,
        ),
        Getproducts(
          "",
          {
            ReleaseDate: "available",
            Device: deviceType.toLowerCase() || "smartphone",
            Price: `0-${maxPrice}`,
          },
          "performancescore",
          5,
          true,
          true,
        ),
        Getproducts(
          "",
          {
            ReleaseDate: "available",
            Device: deviceType.toLowerCase() || "smartphone",
            Price: `0-${maxPrice}`,
          },
          "camerascore",
          5,
          true,
          true,
        ),
      ]);
      return a;
    },
    [`Topfives-${maxPrice}`],
    {
      revalidate: CACHE_TIME,
      tags: [`Topfives-${maxPrice}`, "Topfives", "all"],
    },
  )();

  const sections = [
    {
      title: `Top ${deviceType?.toLowerCase() == "tablet" ? "Tablets" : "Phones"} (Under ${maxPrice})`,
      data: data[0],
      morelink: `/main/all?ReleaseDate=available&Price=1000-${maxPrice}&sort=totalscore`,
    },
    {
      title: `Top Performers (Under ${maxPrice})`,
      data: data[1],
      morelink: `/main/all?ReleaseDate=available&Price=1000-${maxPrice}&sort=performancescore`,
    },
    {
      title: `Top Cameras (Under ${maxPrice})`,
      data: data[2],
      morelink: `/main/all?ReleaseDate=available&Price=1000-${maxPrice}&sort=camerascore`,
    },
  ];

  return (
    <>
      {sections.map((section, i) => (
        <div
          key={i}
          className="w-full rounded-2xl bg-white p-3 shadow space-y-3"
        >
          {/* Title */}
          <h2 className="text-lg font-semibold pl-2">{section.title}</h2>

          {/* Products */}
          <div className="space-y-2">
            {(section.data?.products || []).map((product, j) => (
              <Link
                key={j}
                prefetch={false}
                href={`/main/product/${product?._id}`}
                className="flex items-center gap-2 text-sm w-full bg-bg1 p-1 rounded-xl lg:hover:text-theme"
              >
                <Nextimage
                  src={product?.images?.[0] || "/uiimages/404.jpg"}
                  alt={product?.model}
                  height={40}
                  width={40}
                  loading="lazy"
                  className="w-10 mix-blend-multiply h-10 object-contain object-center"
                />
                {product.model}
              </Link>
            ))}
            <Link
              prefetch={false}
              href={section?.morelink}
              className="block w-full px-5 py-2 rounded-xl text-center bg-bg1 lg:hover:text-theme"
            >
              View More
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
