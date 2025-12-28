import React from "react";
import Verification from "@/lib/verification";
import { Cachedproducts } from "@/app/_globalcomps/cachedata/cachedProducts";
import Herosection from "../product/[id]/_comps/Herosection";
import Filtermenu from "./_comps/Filtermenu";

async function page({ searchParams }) {
  const tokenRes = await Verification();
  const allparams = await searchParams;
  console.log(allparams)
  const products = await Cachedproducts();

  return (
    <div className="min-h-screen py-10">
      <div className="flex gap-2 max-w-6xl mx-auto">
        <Filtermenu />
        <div className="space-y-2">
          {products.map((product, i) => {
            return <Herosection key={i} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
