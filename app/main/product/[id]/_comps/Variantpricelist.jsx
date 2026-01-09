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
      ? sortedPrices.reduce(
          (best, item, i, arr) =>
            Number(item.sp) < Number(arr[best].sp) ? i : best,
          0
        )
      : -1;

  return (
    <div className="flex flex-col gap-3 pt-4">
      {sortedPrices.map((item, i) => {
        const isBestDeal = i === bestDealIndex;

        const sp = Number(item.sp);
        const mrp = Number(item.mrp);

        const discount =
          mrp && sp && mrp > sp ? Math.round(((mrp - sp) / mrp) * 100) : null;

        const platformKey = item.platform?.toLowerCase();

        return (
          <Link
            prefetch={false}
            key={i}
            href={item.link || "#"}
            target="_blank"
            className={`group flex items-center gap-3 rounded-lg border px-3 py-2 transition
    ${
      isBestDeal
        ? "border-green-500 bg-green-50"
        : "border-slate-200 bg-white hover:border-theme"
    }`}
          >
            {/* LEFT CONTENT */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              {/* ROW 1: Variant */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="truncate text-sm font-semibold text-slate-900">
                  {item.variant}
                </span>

                {isBestDeal && (
                  <span className="shrink-0 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white">
                    Best
                  </span>
                )}
              </div>

              {/* ROW 2: Price + Platform */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                <span className="text-base font-extrabold text-theme">
                  {formatPrice(sp, item.currency)}
                </span>

                {mrp && mrp !== sp && (
                  <span className="text-slate-400 line-through">
                    {formatPrice(mrp, item.currency)}
                  </span>
                )}

                {discount > 0 && (
                  <span className="font-bold text-red-600">
                    {discount}% OFF
                  </span>
                )}

                <span className="text-slate-400">•</span>

                <div className="flex items-center gap-1 text-slate-500">
                  {platformImageMap[platformKey] && (
                    <Nextimage
                      src={platformImageMap[platformKey]}
                      height={14}
                      width={14}
                      alt={item.platform}
                      className="rounded"
                    />
                  )}
                  <span className="truncate">{item.platform}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap
      ${
        isBestDeal
          ? "bg-green-600 text-white"
          : "bg-theme/10 text-theme group-hover:bg-theme group-hover:text-white"
      }`}
            >
              View →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
