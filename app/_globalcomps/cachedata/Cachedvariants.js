"use server";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";
import { Cachedproducts } from "./cachedProducts";

export async function CachedVariants(variantname) {
  if (!variantname) return [];

  return unstable_cache(
    async () => {
      const products = await Cachedproducts();

      if (!Array.isArray(products)) return [];

      return products
        .filter(
          (p) =>
            p?.model === variantname &&
            Array.isArray(p?.price) &&
            p.price.length > 0 
        )
        .map((p) => ({
          _id: p._id,
          variant: p?.variant ?? "",
          price: p.price,
        }))
        .sort((a, b) => a.price[0].sp - b.price[0].sp);
    },
    [`Variant-${variantname}`],
    {
      revalidate: CACHE_TIME,
      tags: [`Variant-${variantname}`, "Variant", "all"],
    }
  )();
}
