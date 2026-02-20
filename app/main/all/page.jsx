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
import Seoeditbutton from "@/app/_globalcomps/Addseo/Seoeditbutton";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { getseodata } from "@/app/_globalcomps/Addseo/Seodata";
import Metakeywordsreplacer from "@/app/_hooks/Metakeywordsreplcer";
import NoResults from "./_comps/Notfoundcomp";
import { Getautofillvalues } from "@/lib/autofillvaluesfn";
import Link from "next/link";

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

  let noproducts = false;
  let data = await Getproducts(search, appliedfilters, sort, maxProducts);
  if (data.products.length == 0) {
    data = await Getproducts("", {}, sort, maxProducts);
    noproducts = true;
  }

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

  // seo
  const keyObject = {
    sort,
    search,
    ...appliedfilters,
  };

  // make it stable (same order every time)
  const key = JSON.stringify(
    Object.keys(keyObject)
      .sort()
      .reduce((acc, k) => {
        acc[k] = keyObject[k];
        return acc;
      }, {}),
  );

  const seokey = `SEO-${key}`;
  const seodata = await getseodata(seokey);
  const converter = new QuillDeltaToHtmlConverter(seodata?.delta, {});
  const html = converter.convert();

  // autofillvalues
  const autofillvalues = await Getautofillvalues();

  return (
    <Pagectxwrapper>
      <div className="w-full min-h-screen p-2">
        <div className="max-w-7xl mx-auto">
          <div className="w-full flex gap-2">
            <Filtermenu appliedfilters={appliedfilters} device={device} />
            {device != "desktop" && <Sortmenumobile appliedSort={sort} />}
            <div className="w-full  space-y-2">
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
                {tokenRes?.verified && (
                  <Link
                    href="/admin/product/add"
                    target="_blank"
                    prefetch={false}
                    className="relative flex flex-col items-center justify-center h-40 rounded-2xl border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 transition cursor-pointer"
                  >
                    <div className="text-4xl text-gray-400">+</div>
                    <div className="mt-2 text-sm text-gray-600 font-medium">
                      Add New Product
                    </div>
                  </Link>
                )}
                {noproducts && (
                  <div className="w-full bg-white shadow rounded-2xl">
                    <NoResults />
                  </div>
                )}
                {(data.products || []).map(async (product, i) => {
                  const scores = await Scorecalculator(product, autofillvalues);
                  return (
                    <Herosection
                      key={i}
                      product={product}
                      tokenRes={tokenRes}
                      fullmode={false}
                      scores={scores}
                      scoretype={sort}
                    />
                  );
                })}
                {data.hasNext && <Morebutton pageno={Number(pageno)} />}
              </div>
            </div>
          </div>
          {/* description */}
          <div
            className="mt-10 text"
            dangerouslySetInnerHTML={{ __html: Metakeywordsreplacer(html) }}
          />
          {/* seo form */}
          {tokenRes?.verified && (
            <div className="mt-5">
              <Seoeditbutton editdata={seodata} seokey={seokey} />
            </div>
          )}
        </div>
      </div>
    </Pagectxwrapper>
  );
}

export const generateMetadata = async ({ searchParams }) => {
  let {
    sort = "default",
    pageno = 1,
    search = null,
    ...appliedfilters
  } = await searchParams;

  const keyObject = {
    sort,
    search,
    ...appliedfilters,
  };

  // make it stable (same order every time)
  const key = JSON.stringify(
    Object.keys(keyObject)
      .sort()
      .reduce((acc, k) => {
        acc[k] = keyObject[k];
        return acc;
      }, {}),
  );

  const seokey = `SEO-${key}`;
  const seodata = await getseodata(seokey);

  return {
    title: Metakeywordsreplacer(seodata?.title || ""),
    description: Metakeywordsreplacer(seodata?.metadesc || ""),
    keywords: Metakeywordsreplacer(seodata?.keywords || ""),
    // alternates: {
    //   canonical: "",
    // },
  };
};

export default page;
