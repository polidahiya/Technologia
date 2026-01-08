import React from "react";
import Getproducts from "@/lib/Getproducts";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import formatPrice from "@/app/_globalcomps/Formateprice";

async function Comparewith({ product }) {
  const price = product?.price[0]?.mrp || product?.price[0]?.sp;
  const [min, max] = getCompetitorPriceRange(price);
  const numberofproducts = 10;
  let comparelist = await Getproducts(
    "",
    {
      Price: `${min}-${max}`,
      Device: product?.deviceType?.toLowerCase(),
    },
    "default",
    numberofproducts
  );

  let hasitsown = false;
  for (let a of comparelist?.products) {
    if (a?._id == product?._id) {
      hasitsown = true;
    }
  }

  let products;
  if (hasitsown) {
    products = comparelist?.products.filter((a) => a._id != product._id);
  } else {
    products = comparelist.slice(0, numberofproducts);
  }

  return (
    <section className="relative bg-white rounded-2xl shadow overflow-hidden scroll-mt-32">
      <span className="absolute -top-20 left-0 pointer-events-none"></span>
      <h2 className="relative flex  items-center gap-2 px-6 py-4 font-extrabold border-b border-slate-200 font-tenor tracking-wider">
        {/* {Icon} */}
        Compare with
        <span className="block absolute h-1/2 w-1 bg-theme rounded-r-full top-1/2 left-0 -translate-y-1/2 "></span>
      </h2>
      <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-2">
        {(products || []).map((item, i) => {
          return (
            <Link
              key={i}
              href={`/main/compare/${item?._id}/${product?._id}`}
              className="shadow rounded-2xl p-1 relative bg-bg1"
            >
              {[product, item].map((mob, j) => (
                <div
                  key={j}
                  className={`flex gap-2 w-full h-12 px-2 py-1 ${
                    j == 0 && "border-b border-gray-300"
                  }`}
                >
                  <div className="h-full aspect-square">
                    <Nextimage
                      src={mob?.images[0] || "/uiimages/404.jpg"}
                      alt={mob?.model}
                      height={40}
                      width={40}
                      className="w-full h-full object-contain object-center mix-blend-multiply"
                    ></Nextimage>
                  </div>
                  <div className="px-1">
                    <p className="text-sm truncate font-semibold text-black group-hover:text-theme">
                      {mob?.brand} {mob?.model}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      From{" "}
                      <span className="font-semibold text-theme">
                        {formatPrice(
                          mob?.price?.[0]?.sp || mob?.price?.[0]?.mrp
                        )}
                      </span>
                      <span className="ml-1 text-[11px] text-gray-400">
                        • {mob?.price?.[0]?.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
              <div className="absolute top-1/2 -translate-y-1/2 right-5 h-10 w-10 flex items-center justify-center text-white font-bold text-sm bg-black rounded-full">
                VS
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function getCompetitorPriceRange(price) {
  let delta;

  if (price <= 10000) {
    delta = 1500; // budget segment
  } else if (price <= 15000) {
    delta = 2000;
  } else if (price <= 20000) {
    delta = 2500;
  } else if (price <= 30000) {
    delta = 3500; // hot competition zone
  } else if (price <= 40000) {
    delta = 5000;
  } else if (price <= 60000) {
    delta = 7000;
  } else if (price <= 100000) {
    delta = 10000; // flagship
  } else {
    delta = 15000; // ultra-premium
  }

  return [Math.max(0, price - delta), price + delta];
}

export default Comparewith;
