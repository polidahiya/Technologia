import React from "react";
import { notFound } from "next/navigation";
import Getproducts from "@/lib/Getproducts";
import Link from "next/link";
import { filters } from "@/lib/data";
import Morebutton from "../all/_comps/Morebutton";
import Verification from "@/lib/verification";

import Seoeditbutton from "@/app/_globalcomps/Addseo/Seoeditbutton";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { getseodata } from "@/app/_globalcomps/Addseo/Seodata";
import Metakeywordsreplacer from "@/app/_hooks/Metakeywordsreplcer";

export default async function page({ searchParams }) {
  const tokenRes = await Verification();
  let { pageno = 1 } = await searchParams;
  pageno = Number(pageno);
  // not found check
  if (!Number.isInteger(pageno) || pageno < 1) {
    notFound();
  }

  //
  const pageSize = 100;
  const start = (Number(pageno) - 1) * pageSize;
  const maxProducts = start + pageSize;

  let data = await Getproducts("", {}, "totalantutu", maxProducts, false, true);

  // make it stable (same order every time)
  const key = "antutu-total";

  const seokey = `SEO-${key}`;
  const seodata = await getseodata(seokey);
  const converter = new QuillDeltaToHtmlConverter(seodata?.delta, {});
  const html = converter.convert();

  return (
    <div className="min-h-screen py-2 px-2 md:px-0 w-full max-w-7xl mx-auto space-y-2">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-left">Model</th>
              <th className="p-3 text-left">Chipset</th>
              <th className="p-3 text-left">GPU</th>
              <th className="p-3 text-left">AnTuTu Score</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const products = data.products || [];
              const maxScore = Math.max(
                ...products.map((p) => Number(p?.antutuscore || 0)),
              );

              const brandsmap = new Map();
              return products.map((product, index) => {
                const score = Number(product?.antutuscore || 0);
                const percentage = maxScore
                  ? (50 + (score / maxScore) * 50).toFixed(1)
                  : 0;

                let brandKey = brandsmap.get(product.brand);

                if (!brandKey) {
                  const found = Object.entries(filters.Brand.options).find(
                    ([, v]) => v.name === product.brand,
                  );

                  brandKey = found ? found[0] : null;

                  if (brandKey) {
                    brandsmap.set(product.brand, brandKey);
                  }
                }
                return (
                  <tr key={product?._id} className="text-sm ">
                    {/* Rank */}
                    <td className="p-3 font-semibold pl-5">{index + 1}</td>

                    {/* Brand */}
                    <td className="p-3">
                      <Link
                        href={`/main/all?ReleaseDate=available&Brand=${brandKey}`}
                        prefetch={false}
                        className="hover:underline hover:text-theme"
                      >
                        {product?.brand}
                      </Link>
                    </td>

                    {/* Model */}
                    <td className="p-3">
                      <Link
                        href={`/main/product/${product?._id}`}
                        prefetch={false}
                        className="hover:underline hover:text-theme"
                      >
                        {product?.model}
                      </Link>
                    </td>

                    {/* Chipset */}
                    <td className="p-3">{product?.chipset}</td>

                    {/* GPU */}
                    <td className="p-3">{product?.gpu}</td>

                    {/* Score + Percentage */}
                    <td className="p-3 font-bold">
                      {score != 0 ? (
                        <div className="flex flex-col gap-1">
                          <div>
                            {score.toLocaleString()} ({percentage}%)
                          </div>

                          <div className="w-full h-1 bg-gray-200  overflow-hidden">
                            <div
                              className="h-full bg-theme transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">NA</div>
                      )}
                    </td>
                  </tr>
                );
              });
            })()}
          </tbody>
        </table>
      </div>
      {data.hasNext && <Morebutton pageno={Number(pageno)} />}
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
  );
}

export const generateMetadata = async () => {
  const key = "antutu-total";
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
