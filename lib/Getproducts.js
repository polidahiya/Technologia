"use server";
import Getdata from "@/app/_globalcomps/navbar/searchbar/Getdata";
import SortFn from "@/app/_hooks/Sortproducts";
import { filters } from "./data";

export default async function Getproducts(
  search = "",
  appliedfilters = {},
  sort = "default",
  maxProducts = 10
) {
  const products = search ? await Getdata(search, sort) : await SortFn(sort);

  const filteredProducts = [];

  for (const product of products) {
    const isMatch = Object.entries(appliedfilters).every(
      ([filterSlug, value]) => {
        // PRICE FILTER
        if (filterSlug === "Price") {
          const [min, max] = value.split("-").map(Number);
          return product?.price?.some(
            (a) => (a.sp || a.mrp) >= min && (a.sp || a.mrp) <= max
          );
        }

        const selectedSlugs = value.split(",");
        const filter = filters[filterSlug];
        if (!filter) return true;

        // OR logic inside same filter group
        return selectedSlugs.some((optionSlug) => {
          const option = filter.options[optionSlug];
          return option?.operation?.(product);
        });
      }
    );

    if (isMatch) {
      filteredProducts.push(product);
      if (filteredProducts.length == maxProducts) break; // 🚀 EARLY EXIT
    }
  }

  return {
    products: filteredProducts,
    hasNext: !(maxProducts > filteredProducts.length),
  };
}
