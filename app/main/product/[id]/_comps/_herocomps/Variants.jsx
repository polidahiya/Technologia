import React from "react";
import { CachedVariants } from "@/app/_globalcomps/cachedata/Cachedvariants";
import Link from "next/link";
import formatPrice from "@/app/_globalcomps/Formateprice";

async function Variants({ product }) {
  const list = product?.variant
    ? (await CachedVariants(product?.model)) || []
    : [];

  if (list.length <= 1) return null;

  return (
    <div className="w-full mt-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {list.map((variant, i) => {
          const pricedata = variant?.price?.[0];
          const current = variant?.variant === product?.variant;
          const available = variant?.price?.some(
            (p) => p.status === "Available",
          );

          return (
            <Link
              key={i}
              href={`/main/product/${variant?._id}`}
              replace
              prefetch={false}
              className={`
                px-3 py-1.5 rounded-md border text-sm
                flex items-center gap-2
                transition-colors
                ${
                  current
                    ? "border-theme text-theme bg-theme/5"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }
                ${!available && "opacity-50"}
              `}
            >
              {/* availability dot */}
              <span
                className={`w-1.5 min-w-1.5 h-1.5 rounded-full ${
                  available ? "bg-green-600" : "bg-red-600"
                }`}
              />

              <span className="whitespace-nowrap">{variant?.variant}</span>

              <span className="text-green-600 font-medium">
                {formatPrice(pricedata?.sp, pricedata?.currency)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Variants;
