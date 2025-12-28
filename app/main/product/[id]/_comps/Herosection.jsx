import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { icons } from "@/lib/data";
import formatPrice from "@/app/_globalcomps/Formateprice";

export default function Herosection({ product }) {
  const pricedata = product?.price[0];

  return (
    <section className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-2 gap-8">
      <Link href={`/main/product/${product?._id}`}>
        <Nextimage
          src={product.images?.[0]}
          alt={product.model}
          height={420}
          width={536}
          loading="lazy"
          className="w-full max-h-[420px] object-contain rounded-xl"
        />
      </Link>

      <div className="">
        <h1 className="text-3xl font-bold font-tenor">
          {product.brand} {product.model}
        </h1>

        <p className="opacity-70 font-semibold">{product.deviceType}</p>

        <div className="flex items-center gap-4 mt-3">
          <span className="text-3xl font-bold text-theme">
            {formatPrice(pricedata?.sp, pricedata?.currency)}
          </span>
          {product.mrp != pricedata?.sp && (
            <span className="line-through text-slate-400">
              {formatPrice(pricedata?.mrp)}
            </span>
          )}
        </div>

        {/* Feature badges */}
        <div className="pt-2 text-sm space-y-0.5">
          {[
            {
              icon: icons.processor,
              alt: "processor",
              content: `${product?.chipset} @${product?.maxCpuClockSpeed} GHz`,
            },
            {
              icon: icons.ram,
              alt: "ram",
              content: `${product?.ram} GB RAM (${product?.ramType})`,
            },
            {
              icon: icons.storage,
              alt: "storage",
              content: `${product?.storage} Storage (${product?.storageType})`,
            },
            {
              icon: icons.rearcamera,
              alt: "camera",
              content: `${product?.RearCameramegapixels} Mp Rear Camera`,
            },
            {
              icon: icons.selficamera,
              alt: "selficamera",
              content: `${product?.frontCameramegapixels} Mp Front Camera`,
            },
            {
              icon: icons.battery,
              alt: "battery",
              content: `${product?.batteryCapacity} mAh ${product?.batteryType}`,
            },
            {
              icon: icons.screen,
              alt: "screen",
              content: `${product?.display?.[0]?.size} inches | ${product?.display?.[0]?.type} | ${product?.display?.[0]?.refreshRate} Hz`,
            },
          ].map((item, index) => {
            return (
              <p key={index} className="flex items-center gap-2">
                {item.icon}
                <span>{item.content}</span>
              </p>
            );
          })}
        </div>

        {/* Buy buttons */}
        <VariantPriceList prices={product.price} productMrp={product.mrp} />
      </div>
    </section>
  );
}

function VariantPriceList({ prices = [], productMrp }) {
  const platformImageMap = {
    amazon: "/stores/1519104223.avif",
    flipkart: "/stores/1519104215.avif",
  };
  const parseVariant = (variant = "") => {
    const match = variant.match(/(\d+)\s*GB\s*\+\s*(\d+)\s*GB/i);
    if (!match) return { ram: 0, storage: 0 };

    return {
      ram: Number(match[1]),
      storage: Number(match[2]),
    };
  };

  const sortedPrices = [...prices].sort((a, b) => {
    const va = parseVariant(a.variant);
    const vb = parseVariant(b.variant);

    if (va.ram !== vb.ram) return va.ram - vb.ram;
    if (va.storage !== vb.storage) return va.storage - vb.storage;
    return a.sp - b.sp;
  });

  const bestDealIndex = sortedPrices.reduce(
    (best, item, i, arr) => (item.sp < arr[best].sp ? i : best),
    0
  );

  return (
    <div className="flex flex-col gap-3 pt-4">
      {sortedPrices.map((item, i) => {
        const isBestDeal = i === bestDealIndex;

        const discount =
          productMrp && item.sp
            ? Math.round(((productMrp - item.sp) / productMrp) * 100)
            : null;

        return (
          <Link
            key={i}
            href={item.link || "#"}
            className={`group flex items-center justify-between gap-4 rounded-xl border px-5 py-4 transition-all
              ${
                isBestDeal
                  ? "border-green-500 bg-green-50 shadow-md"
                  : "border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-theme"
              }`}
          >
            {/* LEFT */}
            <div className="flex flex-col gap-1">
              {/* Variant */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900">
                  {item.variant}
                </span>

                {isBestDeal && (
                  <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-bold text-white">
                    Best Value
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-theme">
                  {formatPrice(item.sp, item.currency)}
                </span>

                {productMrp && productMrp !== item.sp && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(productMrp, item.currency)}
                  </span>
                )}

                {discount > 0 && (
                  <span className="text-xs font-bold text-red-600">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* Platform */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                {platformImageMap[item.platform] && (
                  <Nextimage
                    src={platformImageMap[item.platform]}
                    height={16}
                    width={16}
                    alt={item.platform}
                    className="rounded"
                  />
                )}
                <span>Available on {item.platform}</span>
              </div>
            </div>

            {/* CTA */}
            <span
              className={`shrink-0 rounded-full px-4 py-1 text-sm font-semibold transition-colors
                ${
                  isBestDeal
                    ? "bg-green-600 text-white"
                    : "bg-theme/10 text-theme group-hover:bg-theme group-hover:text-white"
                }`}
            >
              View Deal →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
