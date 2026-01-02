import React from "react";
import Verification from "@/lib/verification";
import { Cachedproducts } from "@/app/_globalcomps/cachedata/cachedProducts";
import Herosection from "../product/[id]/_comps/Herosection";
import Filtermenu from "./_comps/Filtermenu";
import { filters } from "@/lib/data";
import Header from "./_comps/Header";
import Getdata from "@/app/_globalcomps/navbar/searchbar/Getdata";
import SortFn from "@/app/_hooks/Sortproducts";

async function page({ searchParams }) {
  const tokenRes = await Verification();
  const { sort, search = null, ...appliedfilters } = await searchParams;
  const products = search ? await Getdata(search) : await Cachedproducts();

  const filteredProducts = products.filter((product) => {
    return Object.entries(appliedfilters).every(([filterSlug, value]) => {
      // for price
      if (filterSlug == "Price") {
        const [min, max] = value.split("-").map((a) => Number(a));
        return product?.price.some(
          (a) => (a.sp || a.mrp) >= min && (a.sp || a.mrp) <= max
        );
      }
      //
      const selectedSlugs = value.split(",");
      const filter = filters[filterSlug];
      if (!filter) return true;
      // OR logic inside same filter group
      return selectedSlugs.some((optionSlug) => {
        const option = filter.options[optionSlug];
        if (!option?.operation) return false;

        return option.operation(product);
      });
    });
  });

  const sortedproducts = await SortFn(filteredProducts, 0);

  const filterArray = [];
  //   if search
  if (search) filterArray.push(["search", search, search]);

  Object.entries(appliedfilters).forEach(([filterSlug, value]) => {
    // price
    if (filterSlug == "Price") {
      filterArray.push([filterSlug, value, value]);
      return;
    }
    //
    const selectedSlugs = value.split(",");
    selectedSlugs.forEach((optionSlug) => {
      const name = filters[filterSlug]?.options[optionSlug]?.name;
      filterArray.push([filterSlug, optionSlug, name]);
    });
  });

  return (
    <div className="min-h-screen py-10">
      <div className="flex gap-2 max-w-6xl mx-auto">
        <Filtermenu appliedfilters={appliedfilters} />
        <div className="space-y-2">
          <Header filterArray={filterArray} />
          <div className="space-y-2">
            {sortedproducts.map((product, i) => {
              return <Herosection key={i} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
