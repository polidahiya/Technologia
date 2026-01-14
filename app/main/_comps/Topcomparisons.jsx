import React from "react";
import Comparecomp from "../product/[id]/_comps/_comparecomps/Comparecomp";
import { CachedProduct } from "@/app/_globalcomps/cachedata/cachedProducts";

async function Topcomparisons() {
  const complist = [
    ["695f9e52cf7b1fe232c68238", "695f98f0cf7b1fe232c68233"],
    ["696085338cffe7667fa25670", "696084c98cffe7667fa2566f"],
    ["695f9966cf7b1fe232c68234", "6960862b8cffe7667fa25673"],
    ["6960862b8cffe7667fa25673", "696086e48cffe7667fa25675"],
    ["696086e48cffe7667fa25675", "696086898cffe7667fa25674"],
    ["695f9e52cf7b1fe232c68238", "695f9f0a5a971c8625c18825"],
  ];

  const pairs = await Promise.all(
    complist.map(async ([a, b]) => {
      const [pro1, pro2] = await Promise.all([
        CachedProduct(a),
        CachedProduct(b),
      ]);
      return [pro1, pro2];
    })
  );

  return (
    <div>
      <Comparecomp title="Top Comparisons" pairs={pairs} />
    </div>
  );
}

export default Topcomparisons;
