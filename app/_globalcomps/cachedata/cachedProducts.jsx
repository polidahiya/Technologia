"use server";
import { getcollection } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";

export async function CachedProduct(productid) {
  if (!productid || productid == "undefined") return null;
  const { ObjectId } = await getcollection();
  if (!ObjectId.isValid(productid)) return null;
  
  return unstable_cache(
    async () => {
      const { Productscollection, ObjectId } = await getcollection();

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

// export async function CachedAllIds() {
//   const allIds = await unstable_cache(
//     async () => {
//       const { Productscollection } = await getcollection();

//       const productsList = await Productscollection.find(
//         {},
//         { projection: { _id: 1 } },
//       ).toArray();

//       return productsList.map((p) => p._id.toString());
//     },
//     ["allids"],
//     { revalidate: CACHE_TIME, tags: ["allids", "all"] },
//   )();

//   return allIds;
// }
// export async function GetproductsfromIds(ids) {
//   return await Promise.all(ids.map((id) => CachedProduct(id)));
// }

export async function Cachedproducts() {
  const allIds = await unstable_cache(
    async () => {
      const { Productscollection } = await getcollection();

      const productsList = await Productscollection.find(
        {},
        { projection: { _id: 1 } },
      ).toArray();

      return productsList.map((p) => ({
        _id: p._id.toString(),
      }));
    },
    ["allproducts"],
    { revalidate: CACHE_TIME, tags: ["allproducts", "all"] },
  )();

  return await Promise.all(allIds.map((item) => CachedProduct(item._id)));
}
