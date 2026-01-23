import React from "react";
import Verification from "@/lib/verification";
import Herosection from "../product/[id]/_comps/Herosection";
import Filtermenu from "./_comps/Filtermenu";
import { filters, sortdata } from "@/lib/data";
import Appliedfilters from "./_comps/Appliedfilters";
import DeviceDetector from "@/app/_globalcomps/Devicedetector";
import { Pagectxwrapper } from "./Pagecontext";
import Mobilesortandfilterbtn from "./_comps/Mobilesortandfilterbtn";
import Sortmenumobile from "./_comps/sortmenucomps/Sortmenumobile";
import Sortmenulaptop from "./_comps/sortmenucomps/Sortmenulaptop";
import Morebutton from "./_comps/Morebutton";
import { notFound } from "next/navigation";
import Getproducts from "@/lib/Getproducts";
import Scorecalculator from "@/app/_globalcomps/scorescalculator/Scorecalculator";

async function page({ searchParams }) {
  const tokenRes = await Verification();
  const device = await DeviceDetector();
  let {
    sort = "default",
    pageno = 1,
    search = null,
    ...appliedfilters
  } = await searchParams;
  pageno = Number(pageno);
  // not found check
  if (!Number.isInteger(pageno) || pageno < 1 || !sortdata[sort]) {
    notFound();
  }

  Object.entries(appliedfilters).forEach(([key, value]) => {
    if (!filters[key]) notFound();
    if (key == "Price") return;
    value.split(",").forEach((item) => {
      if (!filters[key].options[item]) notFound();
    });
  });
  //
  const pageSize = 10;
  const start = (Number(pageno) - 1) * pageSize;
  const maxProducts = start + pageSize;

  const data = await Getproducts(search, appliedfilters, sort, maxProducts);

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
              {(data.products || []).map(async (product, i) => {
                const scores = await Scorecalculator(product);
                return (
                  <Herosection
                    key={i}
                    product={product}
                    tokenRes={tokenRes}
                    fullmode={false}
                    scores={scores}
                  />
                );
              })}
              {data.hasNext && <Morebutton pageno={Number(pageno)} />}
            </div>
          </div>
        </div>
      </div>
    </Pagectxwrapper>
  );
}

export default page;
