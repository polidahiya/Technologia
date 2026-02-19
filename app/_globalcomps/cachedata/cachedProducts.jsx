"use server";
import { getcollection } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";

export async function CachedProduct(productid) {
  if (!productid || productid === "undefined") return null;

  return unstable_cache(
    async () => {
      const { Productscollection, ObjectId } = await getcollection();

      if (!ObjectId.isValid(productid)) return null;

      const product = await Productscollection.findOne({
        _id: new ObjectId(productid),
      });

      if (!product) return null;

      return {
        ...product,
        _id: product._id.toString(),
      };
    },
    [`product-${productid}`],
    {
      revalidate: CACHE_TIME,
      tags: [`product-${productid}`, "product", "all"],
    },
  )();
}

export async function Cachedproducts() {
  return await unstable_cache(
    async () => {
      const { Productscollection } = await getcollection();

      const productsList = await Productscollection.find({}).toArray();
      productsList.forEach((element) => (element._id = element._id.toString()));
      return productsList;
    },
    ["allproducts"],
    { revalidate: CACHE_TIME, tags: ["allproducts", "all"] },
  )();
}
