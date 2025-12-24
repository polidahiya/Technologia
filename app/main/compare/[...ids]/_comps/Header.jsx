"use client";
import React, { useEffect, useState } from "react";

function CompareHeader({ products }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-10 bg-white  transition-all duration-300 rounded-2xl overflow-hidden ${
        compact ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="">
        <div
          className="flex transition-all duration-300"
         
        >
          {/* Left column */}
          <div
            className={`flex-1 max-w-48 flex items-center font-semibold bg-bg1 border-r border-slate-200 transition-all duration-300 ${
              compact ? "h-14 px-4" : "h-40 px-6"
            }`}
          >
            Compare
          </div>

          {products.map((product, i) => (
            <div
              key={i}
              className={`flex-1 flex flex-col items-center justify-center border-r border-slate-200 last:border-r-0 transition-all duration-300 ${
                compact ? "h-14 py-1" : "h-40 py-4"
              }`}
            >
              <img
                src={product.images?.[0]}
                alt={product.model}
                className={`object-contain transition-all duration-300 ${
                  compact ? "w-10 h-10" : "w-20 h-20"
                }`}
              />

              <div
                className={`text-center transition-all duration-300 ${
                  compact ? "text-xs mt-1" : "text-sm mt-2"
                }`}
              >
                <div className="font-semibold line-clamp-1">
                  {product.model}
                </div>

                <div className="font-bold text-green-600">
                  ${product.offerPrice || product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompareHeader;
