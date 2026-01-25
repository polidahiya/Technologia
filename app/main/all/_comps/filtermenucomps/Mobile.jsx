"use client";
import React, { useEffect, useState } from "react";
import { filters } from "@/lib/data";
import { PageContextfn } from "../../Pagecontext";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "@/lib/data";
import Container from "./Container";
import Mobilelistview from "./Mobilelistview";
import { useRouter, usePathname } from "next/navigation";
import Priceselection from "@/app/main/_comps/Priceselection";

function Mobile({ appliedfilters = {} }) {
  const router = useRouter();
  const pathname = usePathname();

  const { showfilter, setshowfilter } = PageContextfn();
  const [tempFilters, setTempFilters] = useState({});
  const [minprice, maxprice] = tempFilters?.Price
    ? tempFilters.Price[0].split("-").map(Number)
    : [0, 200000];


  useEffect(() => {
    if (showfilter) {
      setTempFilters(() => {
        const normalized = {};
        Object.entries(appliedfilters).forEach(([key, value]) => {
          if (!value) {
            normalized[key] = [];
            return;
          }
          normalized[key] = value.split(",").filter(Boolean);
        });

        return normalized;
      });
    }
  }, [showfilter]);

  const handleApply = () => {
    const params = new URLSearchParams();

    Object.entries(tempFilters).forEach(([key, values]) => {
      if (values.length) {
        params.set(key, values.join(","));
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
    setshowfilter(false);
  };

  return (
    <AnimatePresence>
      {showfilter && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 w-full h-dvh overflow-y-scroll bg-bg1 p-2 space-y-2 z-50"
        >
          <div className="flex justify-between items-center gap-2 p-2 bg-bg2  sticky top-0 rounded-2xl shadow z-10">
            <div className="w-8"></div>
            <h2 className="text-white">Filters</h2>
            <button
              className="h-8 w-8 rounded-xl bg-bg1 flex items-center justify-center"
              onClick={() => setshowfilter(false)}
            >
              {icons.Cross}
            </button>
          </div>
          {Object.entries(filters).map(([slug, filter]) => {
            return (
              <Container key={slug} title={filter.name}>
                {slug === "Price" && (
                  <>
                    <Priceselection
                      showactionbutton={false}
                      minvalue={minprice || 20}
                      maxvalue={maxprice || 60000}
                      useaction={true}
                      MinChange={(v) => {
                        setTempFilters((prev) => {
                          const [, currentMax = 200000] =
                            prev.Price?.[0]?.split("-").map(Number) || [];
                          return {
                            ...prev,
                            Price: [`${v}-${currentMax}`],
                          };
                        });
                      }}
                      MaxChange={(v) => {
                        setTempFilters((prev) => {
                          const [currentMin = 0] =
                            prev.Price?.[0]?.split("-").map(Number) || [];
                          return {
                            ...prev,
                            Price: [`${currentMin}-${v}`],
                          };
                        });
                      }}
                    />
                  </>
                )}

                <Mobilelistview
                  name={slug}
                  items={filter.options}
                  multipleMode={filter?.multipleMode}
                  tempFilters={tempFilters}
                  setTempFilters={setTempFilters}
                />
              </Container>
            );
          })}
          <div className="flex gap-2 p-2 bg-white sticky bottom-0 rounded-2xl shadow">
            <button
              className="w-full py-2 rounded-xl bg-bg1"
              onClick={() => setshowfilter(false)}
            >
              Cancel
            </button>
            <button
              className="w-full py-2 rounded-xl bg-theme text-white"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Mobile;
