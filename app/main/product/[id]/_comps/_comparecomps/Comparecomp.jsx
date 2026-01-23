import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import formatPrice from "@/app/_globalcomps/Formateprice";
import { icons } from "@/lib/data";

function Comparecomp({ title = "", pairs = [] }) {
  return (
    <section className="relative bg-white rounded-2xl shadow overflow-hidden scroll-mt-32">
      <h2 className="relative flex items-center gap-2 px-6 py-4 font-extrabold border-b border-slate-200 font-tenor tracking-wider">
        {icons.compare} {title}
        <span className="block absolute h-1/2 w-1 bg-theme rounded-r-full top-1/2 left-0 -translate-y-1/2" />
      </h2>
      <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-2">
        {pairs.map(([product1, product2], i) => (
          <Link
            key={i}
            href={`/main/compare/${product2?._id}/${product1?._id}`}
            className="shadow rounded-2xl p-1 relative bg-bg1"
          >
            {[product1, product2].map((mob, j) => (
              <div
                key={j}
                className={`flex gap-2 w-full h-12 px-2 py-1 ${
                  j === 0 ? "border-b border-gray-300" : ""
                }`}
              >
                <div className="h-full aspect-square">
                  <Nextimage
                    src={mob?.images?.[0] || "/uiimages/404.jpg"}
                    alt={mob?.model}
                    height={40}
                    width={40}
                    className="w-full h-full object-contain object-center mix-blend-multiply"
                  />
                </div>

                <div className="px-1 overflow-hidden">
                  <p className="text-sm truncate font-semibold text-black group-hover:text-theme">
                    {mob?.model}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    From{" "}
                    <span className="font-semibold text-theme">
                      {formatPrice(mob?.price?.[0]?.sp || mob?.price?.[0]?.mrp)}
                    </span>
                    <span className="ml-1 text-[11px] text-gray-400">
                      • {mob?.price?.[0]?.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}

            <div className="absolute top-1/2 -translate-y-1/2 right-5 h-10 w-10 flex items-center justify-center text-white font-bold text-sm bg-bg2 rounded-full">
              VS
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Comparecomp;
