"use server";
import SortFn from "@/app/_hooks/Sortproducts";
import { filters } from "./data";

export default async function Getproducts(
  search = "",
  appliedfilters = {},
  sort = "default",
  maxProducts = 10,
  limitdata = false,
  skipvariant = false,
) {
  const products = await SortFn(sort);
  const filteredProducts = [];
  const seenIds = new Set();
  const seenModel = new Set();

  // 🔹 FILTER ONLY
  if (!search) {
    for (const product of products) {
      if (filteredProducts.length >= maxProducts) break;

      if (seenIds.has(product._id)) continue;
      if (skipvariant && seenModel.has(product.model)) continue;
      if (!applyFilters(product, appliedfilters, filters)) continue;
      seenIds.add(product._id);
      seenModel.add(product.model);

      filteredProducts.push(pickProduct(product, limitdata));
    }

    return {
      products: filteredProducts,
      hasNext: filteredProducts.length === maxProducts,
    };
  }

  // 🔹 SEARCH + FILTER
  const words = search.toLowerCase().slice(0, 40).split(" ").filter(Boolean);
  const MAX_SEARCH_LEVEL = 3;

  for (let searchPoint = 0; searchPoint < MAX_SEARCH_LEVEL; searchPoint++) {
    for (const product of products) {
      if (filteredProducts.length >= maxProducts) break;

      if (seenIds.has(product._id)) continue;
      if (skipvariant && seenModel.has(product.model)) continue;
      if (!Searchmethod(product, words, searchPoint)) continue;
      if (!applyFilters(product, appliedfilters, filters)) continue;

      seenIds.add(product._id);
      seenModel.add(product.model);
      filteredProducts.push(pickProduct(product, limitdata));
    }

    if (filteredProducts.length >= maxProducts) break;
  }

  return {
    products: filteredProducts,
    hasNext: filteredProducts.length === maxProducts,
  };
}

function applyFilters(product, appliedfilters, filters) {
  return Object.entries(appliedfilters).every(([filterSlug, value]) => {
    // PRICE FILTER
    if (filterSlug === "Price") {
      const [min, max] = value.split("-").map(Number);
      return product?.price?.some(
        (a) => (a.sp || a.mrp) >= min && (a.sp || a.mrp) <= max,
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
  });
}

function Searchmethod(product, words, searchPoint = 0) {
  const model = product?.model?.toLowerCase() || "";
  const brand = product?.brand?.toLowerCase() || "";

  switch (searchPoint) {
    case 0:
      return words.every((w) => model.includes(w));
    case 1:
      return words.every((w) => model.includes(w) || brand.includes(w));
    case 2:
      return words.every((w) => brand.includes(w));

    default:
      return false;
  }
}

function pickProduct(product, limitdata) {
  if (!limitdata) return product;

  return {
    _id: product?._id,
    brand: product?.brand,
    model: product?.model,
    variant: product?.variant,
    deviceType: product?.deviceType,
    releaseDate: product?.releaseDate,
    price: product?.price,
    images: product?.images,
    awards: product?.awards,
  };
}
