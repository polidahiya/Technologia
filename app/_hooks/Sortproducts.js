"use server";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";
import { Cachedproducts } from "../_globalcomps/cachedata/cachedProducts";

export default async function SortFn(type = "default") {
  const products = await Cachedproducts();
  return unstable_cache(
    async () => {
      if (type == "default") {
        return products.sort(
          (a, b) => new Date(b?.releaseDate) - new Date(a?.releaseDate)
        ); //newer first
      } else if (type == "pricelh") {
        return products.sort((a, b) => {
          const fa = a.price[0];
          const fb = b.price[0];
          return Number(fa?.sp || fa?.mrp) - Number(fb?.sp || fb?.mrp);
        });
      } else if (type == "pricehl") {
        return products.sort((a, b) => {
          const fa = a.price[0];
          const fb = b.price[0];
          return Number(fb?.sp || fb?.mrp) - Number(fa?.sp || fa?.mrp);
        });
      } else if (type == 3) {
      } else if (type == 4) {
      }
    },
    [`sort-${type}`],
    { revalidate: CACHE_TIME, tags: [`sort-${type}`, "productsIds"] }
  )();
}
