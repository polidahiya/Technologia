"use client";
import React, { useEffect, useState } from "react";
import { icons } from "@/lib/data";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import formatPrice from "@/app/_globalcomps/Formateprice";
import { AppContextfn } from "@/app/Context";
import { FiSave, FiShare2, FiEdit } from "react-icons/fi";
import { PageContextfn } from "../Pagecontext";

function CompareHeader({ ids, products }) {
  const { setcomparelist } = AppContextfn();
  const { setshowstore, setselectedproduct } = PageContextfn();

  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check out this amazing page!",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch {
        alert("Cannot share this page.");
      }
    }
  };

  return (
    <div className={`bg-white  transition-all duration-300  h-60`}>
      <div className="sticky top-18 rounded-2xl overflow-hidden shadow">
        <div className="flex transition-all duration-300">
          {/* Left column */}
          <div
            className={`flex-1 max-w-48 flex flex-col items-center justify-center text-sm bg-bg1 border-r border-slate-200  ${
              compact ? "h-36 md:h-28" : "h-60"
            }`}
          >
            <button className="w-full py-2 flex items-center justify-center gap-1">
              <FiSave />
              Save
            </button>
            <button
              className="w-full py-2 flex items-center justify-center gap-1"
              onClick={handleShare}
            >
              <FiShare2 />
              Share
            </button>
            <button
              className="w-full py-2 flex items-center justify-center gap-1"
              onClick={() => {
                setcomparelist((pre) => {
                  const updated = [...pre];
                  products.forEach((item, j) => {
                    updated[j] = item;
                  });
                  return updated;
                });
              }}
            >
              <FiEdit />
              Edit
            </button>
          </div>

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
                  prefetch={false}
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
                <button
                  className="flex items-center justify-center gap-2 flex-wrap"
                  onClick={() => {
                    setshowstore(true);
                    setselectedproduct(product);
                  }}
                >
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
                  <span className="text-blue-600 text-xs md:text-base">
                    Visit Stores
                  </span>
                </button>
                {/* controls */}
                <div className="flex-col gap-1 absolute top-1 right-1 hidden md:flex">
                  <Link
                    prefetch={false}
                    href={`/main/compare/${ids
                      .slice(0, 3)
                      .filter((_, j) => j != i)
                      .join("/")}`}
                    className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center"
                  >
                    {icons.Cross}
                  </Link>
                  <button
                    className="w-5 h-5 rounded-full bg-blue-400 text-white flex items-center justify-center"
                    onClick={() => {
                      setcomparelist((pre) => {
                        const updated = [...pre];
                        products.forEach((item, j) => {
                          updated[j] = i == j ? null : item;
                        });
                        return updated;
                      });
                    }}
                  >
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
