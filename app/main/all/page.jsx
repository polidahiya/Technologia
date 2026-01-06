import React from "react";
import Verification from "@/lib/verification";
import { Cachedproducts } from "@/app/_globalcomps/cachedata/cachedProducts";
import Herosection from "../product/[id]/_comps/Herosection";
import Filtermenu from "./_comps/Filtermenu";
import { filters } from "@/lib/data";
import Appliedfilters from "./_comps/Appliedfilters";
import Getdata from "@/app/_globalcomps/navbar/searchbar/Getdata";
import SortFn from "@/app/_hooks/Sortproducts";
import DeviceDetector from "@/app/_globalcomps/Devicedetector";
import { Pagectxwrapper } from "./Pagecontext";
import Mobilesortandfilterbtn from "./_comps/Mobilesortandfilterbtn";
import Sortmenumobile from "./_comps/sortmenucomps/Sortmenumobile";
import Sortmenulaptop from "./_comps/sortmenucomps/Sortmenulaptop";

async function page({ searchParams }) {
  const tokenRes = await Verification();
  const {
    sort = "default",
    search = null,
    ...appliedfilters
  } = await searchParams;
  const device = await DeviceDetector();
  const products = search ? await Getdata(search) : await Cachedproducts();

  const sortedproducts = (await SortFn(products, sort)) || [];

  const filteredProducts = sortedproducts.filter((product) => {
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

  const cutproducts=filteredProducts.slice(0, 10)

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
    <Pagectxwrapper>
      <div className="w-full min-h-screen p-2">
        <div className="w-full flex gap-2 max-w-6xl mx-auto">
          <Filtermenu appliedfilters={appliedfilters} device={device} />
          {device != "desktop" && <Sortmenumobile appliedSort={sort} />}
          <div className="w-full lg:max-w-[864px] space-y-2">
            {device == "desktop" ? (
              <div className="flex gap-2 ">
                <Appliedfilters filterArray={filterArray} device={device} />
                <Sortmenulaptop appliedSort={sort} />
              </div>
            ) : (
              <div className="space-y-2">
                <Mobilesortandfilterbtn />
                {filterArray.length > 0 && (
                  <Appliedfilters filterArray={filterArray} device={device} />
                )}
              </div>
            )}

            <div className="w-full space-y-2">
              {cutproducts.map((product, i) => {
                return <Herosection key={i} product={product} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </Pagectxwrapper>
  );
}

export default page;
