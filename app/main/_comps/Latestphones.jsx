import React from "react";
import Link from "next/link";
import Comparebutton from "../product/[id]/_comps/Comparebutton";
import Nextimage from "@/app/_globalcomps/Nextimage";
import formatPrice from "@/app/_globalcomps/Formateprice";

function Latestphones({ products }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <div className="flex items-center justify-between py-2 mb-2 bg-white">
        <h3 className="font-semibold">New Release</h3>
        <Link
          prefetch={false}
          href="/main/all"
          className="text-theme font-medium px-5"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2  md:grid-cols-5 gap-2 md:gap-4">
        {products.map((item, i) => {
          return (
            <div key={i} className="">
              <SmartphoneCard item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SmartphoneCard({ item }) {
  const pricedata = item?.price[0];
  return (
    <div className="group w-full max-w-sm rounded-2xl bg-white shadow">
      {/* Image */}
      <Link
        prefetch={false}
        href={`/main/product/${item?._id}`}
        className="relative w-full aspect-square rounded-t-2xl overflow-hidden"
      >
        <Nextimage
          src={item?.images?.[0]}
          alt={item?.model}
          height={420}
          width={536}
          loading="lazy"
          className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title */}
        <div>
          <p className="text-xs text-gray-500">{item?.brand}</p>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
            {item?.model}
          </h3>
        </div>

        {/* Specs */}
        <ul className="text-sm text-gray-600 space-y-1 truncate">
          <li>
            📱 {item?.display[0]?.size} {item?.display[0]?.type}
          </li>
          <li>⚡ {item?.chipset}</li>
          <li>📷 {item?.RearCameramegapixels} Mp Camera</li>
          <li>🔋 {item?.batteryCapacity} mah</li>
        </ul>

        {/* Price + CTA */}
        <div className="mt-2 flex flex-col items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-theme text-xl">
              {formatPrice(pricedata?.sp, pricedata?.currency)}
            </span>
            {pricedata?.mrp != pricedata?.sp && (
              <span className="line-through text-slate-400 text-sm">
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
