"use server";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";
import { Cachedproducts } from "../_globalcomps/cachedata/cachedProducts";

export default async function SortFn(type = "default") {
  return unstable_cache(
    async () => {
      const products = await Cachedproducts();

      const sorted = [...products]; // ✅ prevent mutation

      if (type === "default") {
        sorted.sort(
          (a, b) => new Date(b?.releaseDate) - new Date(a?.releaseDate)
        );
      } else if (type === "pricelh") {
        sorted.sort((a, b) => {
          const fa = a.price?.[0];
          const fb = b.price?.[0];
          return (
            Number(fa?.sp ?? fa?.mrp ?? Infinity) -
            Number(fb?.sp ?? fb?.mrp ?? Infinity)
          );
        });
      } else if (type === "pricehl") {
        sorted.sort((a, b) => {
          const fa = a.price?.[0];
          const fb = b.price?.[0];
          return (
            Number(fb?.sp ?? fb?.mrp ?? 0) - Number(fa?.sp ?? fa?.mrp ?? 0)
          );
        });
      }

      return sorted;
    },
    [`sort-${type}`],
    {
      revalidate: CACHE_TIME,
      tags: ["productsIds", "all"],
    }
  )();
}
