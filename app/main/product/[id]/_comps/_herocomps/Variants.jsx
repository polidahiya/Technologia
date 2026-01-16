import React from "react";
import { CachedVariants } from "@/app/_globalcomps/cachedata/Cachedvariants";
import Link from "next/link";
import formatPrice from "@/app/_globalcomps/Formateprice";

async function Variants({ product }) {
  const list = (await CachedVariants(product?.model)) || [];

  if (list.length <= 1) return null;

  return (
    <div className="md:col-span-2 flex gap-2 overflow-x-scroll">
      {list.map((variant, i) => {
        const pricedata = variant?.price[0];
        const currentvar = variant?.variant == product?.variant;
        return (
          <Link
            key={i}
            href={`/main/product/${variant?._id}`}
            prefetch={false}
            className={`px-3 py-1 rounded-md border  whitespace-nowrap ${
              currentvar
                ? "text-theme border-theme bg-theme/5"
                : "bg-bg1 border-gray-300"
            }`}
          >
            <span className="text-sm">{variant?.variant}</span> <br />
            <span className="text-green-600">
              {formatPrice(pricedata?.sp, pricedata?.currency)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default Variants;
