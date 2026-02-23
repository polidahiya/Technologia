import React from "react";
import Getproducts from "@/lib/Getproducts";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";
import { Topfiveui } from "../../_comps/Topfives";
import { getMaxPriceRange } from "../../_comps/Topfives";

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
            Gaming: "bestGaming",
          },
          "totalantutu",
          5,
          true,
          true,
        ),
        Getproducts(
          "",
          {
            ReleaseDate: "available",
            Device: deviceType.toLowerCase() || "smartphone",
          },
          "totalantutu",
          5,
          true,
          true,
        ),
      ]);
      return a;
    },
    [`Topfives-gaming-${deviceType}-${maxPrice}`],
    {
      revalidate: CACHE_TIME,
      tags: [
        `Topfives-gaming-${deviceType}-${maxPrice}`,
        "Topfives-gaming",
        "all",
      ],
    },
  )();

  const sections = [
    {
      title: `Top ${deviceType?.toLowerCase() == "tablet" ? "Tablets" : "Phones"} (Under ${maxPrice})`,
      data: (data[0]?.products || [])?.map((a) => ({
        ...a,
        link: `/main/product/${a?._id}/Gaming`,
      })),
      morelink: `/main/all?ReleaseDate=available&Gaming=bestGaming&sort=totalantutu&Price=0-${maxPrice}`,
    },
    {
      title: `Top Performers: AnTuTu`,
      data: (data[1]?.products || [])?.map((a) => ({
        ...a,
        link: `/main/product/${a?._id}/Gaming`,
      })),
      morelink: `/main/all?ReleaseDate=available&Gaming=bestGaming&sort=totalantutu`,
    },
  ];

  return (
    <>
      {sections.map((section, i) => (
        <Topfiveui key={i} section={section} i={i} />
      ))}
    </>
  );
}
