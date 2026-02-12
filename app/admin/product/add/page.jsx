import React from "react";
import Clientpage from "./Clientpage";
import { CachedProduct } from "@/app/_globalcomps/cachedata/cachedProducts";
import { Getautofillvalues } from "@/lib/autofillvaluesfn";

async function page({ searchParams }) {
  const { edit, copy } = await searchParams;
  const autofillvalues = await Getautofillvalues();

  let productdata = {};

  if (edit || copy) {
    const product = await CachedProduct(edit || copy);
    if (edit) {
      productdata = product;
    }
    if (copy) {
      const data = product;
      delete data._id;
      productdata = data;
    }
  }

  return (
    <div>
      <Clientpage productdata={productdata} autofillvalues={autofillvalues} />
    </div>
  );
}

export default page;
