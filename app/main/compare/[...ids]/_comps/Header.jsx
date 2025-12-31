"use client";
import React, { useEffect, useState } from "react";
import { icons } from "@/lib/data";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import formatPrice from "@/app/_globalcomps/Formateprice";

function CompareHeader({ products }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 220);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`bg-white  transition-all duration-300  h-60`}>
      <div className="sticky top-18 rounded-2xl overflow-hidden shadow">
        <div className="flex transition-all duration-300">
          {/* Left column */}
          <div
            className={`flex-1 max-w-48 flex items-center font-semibold bg-bg1 border-r border-slate-200 transition-all duration-300 ${
              compact ? "h-36 md:h-28" : "h-60"
            }`}
          ></div>

          {products.map((product, i) => {
            const pricedata = product?.price[0];
            return (
              <div
                key={i}
                className={`relative flex-1 flex flex-col justify-center border-r border-slate-200 last:border-r-0 px-1 md:px-2 ${
                  compact ? "h-36 md:h-28" : "h-60 "
                }`}
              >
                {/* flex container */}
                <Link
                href={`/main/product/${product?._id}`}
                  className={`flex flex-col items-center ${
                    compact ? "md:flex-row md:gap-2" : ""
                  }`}
                >
                  <Nextimage
                    src={product.images?.[0]}
                    alt={product.model}
                    height={100}
                    width={100}
                    className={`object-contain transition-all duration-300 ${
                      compact
                        ? "w-10 h-10 md:h-14 md:w-14"
                        : "w-20 md:w-32 h-20 md:h-32"
                    }`}
                  />

                  <div
                    className={`transition-all duration-300 text-center ${
                      compact ? "text-xs  md:text-start" : "text-sm mt-2 "
                    }`}
                  >
                    <div className="font-semibold line-clamp-3 md:text-base">
                      {product.model}
                    </div>

                    <div className="font-bold text-green-600">
                      {formatPrice(
                        pricedata?.mrp || pricedata?.sp,
                        pricedata?.currency
                      )}
                    </div>
                  </div>
                </Link>
                {/* store links */}
                <button className="flex items-center justify-center gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Nextimage
                      src="/stores/1519104215.avif"
                      height={20}
                      width={20}
                      alt="flipkart"
                      className="w-5"
                    ></Nextimage>
                    <Nextimage
                      src="/stores/1519104223.avif"
                      height={20}
                      width={20}
                      alt="amazon"
                      className="w-5 translate-y-0.5"
                    ></Nextimage>
                  </div>
                  <span className="text-blue-600">Visit Stores</span>
                </button>
                <div className="text-xs md:text-base flex items-center justify-center gap-5 mt-1 text-blue-600">
                  {product?.flipkartLink && (
                    <Link
                      href={product?.flipkartLink}
                      className="flex items-center gap-1"
                    >
                      <Nextimage
                        src="/stores/1519104215.avif"
                        height={20}
                        width={20}
                        alt="flipkart"
                        className="w-5"
                      ></Nextimage>
                      <span className="hidden md:inline">flipkart</span>
                    </Link>
                  )}
                  {product?.amazonLink && (
                    <Link
                      href={product?.amazonLink}
                      className="flex items-center gap-1"
                    >
                      <Nextimage
                        src="/stores/1519104223.avif"
                        height={20}
                        width={20}
                        alt="amazon"
                        className="w-5 translate-y-0.5"
                      ></Nextimage>
                      <span className="hidden md:inline">amazon</span>
                    </Link>
                  )}
                </div>
                {/* controls */}
                <div className="flex-col gap-1 absolute top-1 right-1 hidden md:flex">
                  <button className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center">
                    {icons.Cross}
                  </button>
                  <button className="w-5 h-5 rounded-full bg-blue-400 text-white flex items-center justify-center">
                    {icons.Replace}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CompareHeader;
