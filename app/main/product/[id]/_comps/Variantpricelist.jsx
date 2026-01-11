import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import formatPrice from "@/app/_globalcomps/Formateprice";

export default function VariantPriceList({ prices = [] }) {
  const platformImageMap = {
    amazon: "/stores/1519104223.avif",
    flipkart: "/stores/1519104215.avif",
  };

  // ✅ Helper: discount %
  const getDiscountPercent = (sp, mrp) => {
    if (!sp || !mrp || mrp <= sp) return 0;
    return Math.round(((mrp - sp) / mrp) * 100);
  };

  // ✅ Only AVAILABLE prices
  const validPrices = prices.filter(
    (p) => p && p.sp && p.status === "Available"
  );

  // ✅ Sort by selling price (UI order)
  const sortedPrices = [...validPrices].sort(
    (a, b) => Number(a.sp) - Number(b.sp)
  );

  // ✅ Best Value = highest discount → lowest price
  const bestDealIndex =
    sortedPrices.length > 0
      ? sortedPrices.reduce((best, item, i, arr) => {
          const bestItem = arr[best];

          const d1 = getDiscountPercent(item.sp, item.mrp);
          const d2 = getDiscountPercent(bestItem.sp, bestItem.mrp);

          if (d1 !== d2) return d1 > d2 ? i : best;
          if (Number(item.sp) !== Number(bestItem.sp))
            return Number(item.sp) < Number(bestItem.sp) ? i : best;

          return best;
        }, 0)
      : -1;

  return (
    <div className="flex flex-col gap-3 pt-4">
      {sortedPrices.map((item, i) => {
        const isBestDeal = i === bestDealIndex;

        const sp = Number(item.sp);
        const mrp = Number(item.mrp);
        const discount = getDiscountPercent(sp, mrp);

        const platformKey = item.platform?.toLowerCase();

        return (
          <Link
            key={i}
            href={item.link || "#"}
            target="_blank"
            prefetch={false}
            className={`group flex items-center gap-3 rounded-lg border px-3 py-2 transition
              ${
                isBestDeal
                  ? "border-green-500 bg-green-50"
                  : "border-slate-200 bg-white hover:border-theme"
              }`}
          >
            {/* LEFT */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="truncate text-sm font-semibold text-slate-900">
                  {item.label || "Available Offer"}
                </span>

                {isBestDeal && (
                  <span className="shrink-0 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white">
                    Best Value
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                <span className="text-base font-extrabold text-theme">
                  {formatPrice(sp, item.currency)}
                </span>

                {mrp && mrp > sp && (
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

      {/* Optional empty state */}
      {sortedPrices.length === 0 && (
        <div className="text-sm text-slate-500">
          No available offers right now.
        </div>
      )}
    </div>
  );
}
