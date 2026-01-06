import React from "react";
import Clientpage from "./Clientpage";
import { CachedProduct } from "@/app/_globalcomps/cachedata/cachedProducts";

async function page({ searchParams }) {
  const { edit, copy } = await searchParams;
  let productdata = {}

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
      <Clientpage productdata={productdata} />
    </div>
  );
}

export default page;
