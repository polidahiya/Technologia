import React from "react";
import Getproducts from "@/lib/Getproducts";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";

export default async function Topfives({ price }) {
  const maxPrice = Number(price?.[0]?.sp || price?.[0]?.mrp) + 2000;

  const data = await Promise.all([
    Getproducts(
      "",
      { ReleaseDate: "available", Price: `0-${maxPrice}` },
      "totalscore",
      5,
      true,
      true,
    ),
    Getproducts(
      "",
      { ReleaseDate: "available", Price: `0-${maxPrice}` },
      "performancescore",
      5,
      true,
      true,
    ),
    Getproducts(
      "",
      { ReleaseDate: "available", Price: `0-${maxPrice}` },
      "camerascore",
      5,
      true,
      true,
    ),
  ]);

  const sections = [
    {
      title: `Top Phones (Under ${maxPrice})`,
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
