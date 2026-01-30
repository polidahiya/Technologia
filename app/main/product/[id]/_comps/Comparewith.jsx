// Comparewith.jsx
import React from "react";
import Getproducts from "@/lib/Getproducts";
import Comparecomp from "./_comparecomps/Comparecomp";

async function Comparewith({ product }) {
  const price = product?.price?.[0]?.mrp || product?.price?.[0]?.sp;
  const [min, max] = getCompetitorPriceRange(price);

  const numberofproducts = 10;

  const comparelist = await Getproducts(
    "",
    product.foldable
      ? {
          Features: "foldable",
        }
      : {
          Price: `${min}-${max}`,
          Device: product?.deviceType?.toLowerCase(),
        },
    "default",
    numberofproducts,
  );

  let products = comparelist?.products || [];

  // Remove self product if present
  products = products.filter((p) => p?._id !== product?._id);

  // Build array of pairs → [[baseProduct, competitor], ...]
  const pairs = products.slice(0, 9).map((item) => [product, item]);

  return <Comparecomp title="Compare with" pairs={pairs} />;
}

function getCompetitorPriceRange(price) {
  let delta;

  if (price <= 10000) delta = 1500;
  else if (price <= 15000) delta = 2000;
  else if (price <= 20000) delta = 2500;
  else if (price <= 30000) delta = 3500;
  else if (price <= 40000) delta = 5000;
  else if (price <= 60000) delta = 10000;
  else if (price <= 100000) delta = 25000;
  else delta = 15000;

  return [Math.max(0, price - delta), Number(price) + delta];
}

export default Comparewith;
