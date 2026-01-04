import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import formatPrice from "@/app/_globalcomps/Formateprice";

export default function VariantPriceList({ prices = [] }) {
  const platformImageMap = {
    amazon: "/stores/1519104223.avif",
    flipkart: "/stores/1519104215.avif",
  };

  // ✅ Remove invalid / null entries
  const validPrices = prices.filter(
    (p) => p && p.sp && p.variant && p.status !== "out_of_stock"
  );

  const parseVariant = (variant = "") => {
    const match = variant.match(/(\d+)\s*GB\s*\+\s*(\d+)\s*GB/i);
    return match
      ? { ram: Number(match[1]), storage: Number(match[2]) }
      : { ram: 0, storage: 0 };
  };

  // ✅ Sort: RAM → Storage → Price
  const sortedPrices = [...validPrices].sort((a, b) => {
    const va = parseVariant(a.variant);
    const vb = parseVariant(b.variant);

    if (va.ram !== vb.ram) return va.ram - vb.ram;
    if (va.storage !== vb.storage) return va.storage - vb.storage;

    return Number(a.sp) - Number(b.sp);
  });

  // ✅ Best deal = lowest selling price
  const bestDealIndex =
    sortedPrices.length > 0
      ? sortedPrices.reduce((best, item, i, arr) =>
          Number(item.sp) < Number(arr[best].sp) ? i : best
        , 0)
      : -1;

  return (
    <div className="flex flex-col gap-3 pt-4">
      {sortedPrices.map((item, i) => {
        const isBestDeal = i === bestDealIndex;

        const sp = Number(item.sp);
        const mrp = Number(item.mrp);

        const discount =
          mrp && sp && mrp > sp
            ? Math.round(((mrp - sp) / mrp) * 100)
            : null;

        const platformKey = item.platform?.toLowerCase();

        return (
          <Link
            key={i}
            href={item.link || "#"}
            target="_blank"
            className={`group flex items-center justify-between gap-4 rounded-xl border px-5 py-4 transition
              ${
                isBestDeal
                  ? "border-green-500 bg-green-50 shadow-md"
                  : "border-slate-200 bg-white hover:shadow-md hover:border-theme"
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
                  {formatPrice(sp, item.currency)}
                </span>

                {mrp && mrp !== sp && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(mrp, item.currency)}
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
                {platformImageMap[platformKey] && (
                  <Nextimage
                    src={platformImageMap[platformKey]}
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
              className={`shrink-0 rounded-full px-4 py-1 text-sm font-semibold
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
