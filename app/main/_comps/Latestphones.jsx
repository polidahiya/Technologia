import React from "react";
import Link from "next/link";
import Comparebutton from "../product/[id]/_comps/Comparebutton";
import Nextimage from "@/app/_globalcomps/Nextimage";
import formatPrice from "@/app/_globalcomps/Formateprice";

function Latestphones({ products }) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-base md:text-lg">New Release</h3>
        <Link
          prefetch={false}
          href="/main/all?ReleaseDate=available"
          className="text-theme font-medium text-sm md:text-base"
        >
          View All
        </Link>
      </div>

      {/* Mobile scroll / Desktop grid */}
      <div
        className="
          flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2
          md:grid md:grid-cols-5 md:gap-4 md:overflow-visible
        "
      >
        {products.map((item, i) => (
          <div
            key={i}
            className="
              snap-start
              min-w-[75%] sm:min-w-[45%]
              md:min-w-0
            "
          >
            <SmartphoneCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SmartphoneCard({ item }) {
  const pricedata = item?.price?.[0];

  return (
    <div className="h-full rounded-xl bg-white shadow-sm hover:shadow-md transition">
      {/* Image */}
      <Link
        prefetch={false}
        href={`/main/product/${item?._id}`}
        className="block aspect-square overflow-hidden rounded-t-xl"
      >
        <Nextimage
          src={item?.images?.[0]}
          alt={item?.model}
          height={420}
          width={536}
          loading="lazy"
          className="h-full w-full object-contain p-3 md:p-4 transition-transform hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-3 md:p-4 flex flex-col gap-2">
        {/* Title */}
        <div>
          <p className="text-[11px] text-gray-500">{item?.brand}</p>
          <h3 className="text-sm md:text-base font-semibold line-clamp-2">
            {item?.model}
          </h3>
        </div>

        {/* Specs */}
        <ul className="text-[12px] md:text-sm text-gray-600 space-y-1">
          <li className="truncate">
            📱 {item?.display?.[0]?.size} {item?.display?.[0]?.type}
          </li>
          <li className="truncate">⚡ {item?.chipset}</li>
          <li className="hidden md:block">
            📷 {item?.RearCameramegapixels} MP Camera
          </li>
          <li className="hidden md:block">
            🔋 {item?.batteryCapacity} mAh
          </li>
        </ul>

        {/* Price + CTA */}
        <div className="mt-2 flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <span className="font-bold text-theme text-base md:text-xl">
              {formatPrice(pricedata?.sp, pricedata?.currency)}
            </span>
            {pricedata?.mrp !== pricedata?.sp && (
              <span className="line-through text-slate-400 text-xs md:text-sm">
                {formatPrice(pricedata?.mrp)}
              </span>
            )}
          </div>

          <Comparebutton product={item} />
        </div>
      </div>
    </div>
  );
}

export default Latestphones;
