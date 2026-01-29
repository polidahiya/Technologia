"use client";
import React, { useEffect, useState } from "react";
import { AppContextfn } from "../Context";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "@/lib/data";
import { CachedVariants } from "./cachedata/Cachedvariants";
import formatPrice from "./Formateprice";
import Loadingtile from "./Loading/Loadingtile";
import { useSessionCache } from "../_hooks/Usesessionhook";
import { CachedProduct } from "./cachedata/cachedProducts";

export default function Variantmenucomp() {
  const { variantmenu, setvariantmenu, setcomparelist } = AppContextfn();
  const [variants, setvariants] = useState([]);
  const [loading, setloading] = useState(false);

  const variantCache = useSessionCache("variants");

  useEffect(() => {
    let cancelled = false;

    async function loadVariants() {
      if (!variantmenu.show || !variantmenu.model) return;

      // 1️⃣ Try session cache first
      const cached = variantCache.get(variantmenu.model);
      if (cached) {
        setvariants(cached);
        return;
      }

      // 2️⃣ Fallback to network / DB
      setloading(true);
      const list = variantmenu?.currvariant
        ? (await CachedVariants(variantmenu.model)) || []
        : [];

      if (!cancelled) {
        setvariants(list);
        variantCache.set(variantmenu.model, list); // 3️⃣ cache it
        setloading(false);
      }
    }

    loadVariants();

    return () => {
      cancelled = true;
    };
  }, [variantmenu.show, variantmenu.model]);

  function closeMenu() {
    setvariantmenu({ show: false, model: null });
  }

  return (
    <AnimatePresence>
      {variantmenu.show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-bg2/40 z-40 p-2"
          onClick={closeMenu}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-3xl rounded-2xl bg-white shadow-xl overflow-hidden p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center gap-2 p-2 bg-bg2 sticky top-0 rounded-2xl shadow z-10">
              <div className="w-8" />
              <h2 className="text-white">Variants List</h2>
              <button
                className="h-8 w-8 rounded-xl bg-bg1 flex items-center justify-center"
                onClick={closeMenu}
              >
                {icons.Cross}
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto rounded-2xl bg-white shadow p-2 mt-2 space-y-2">
              {loading && (
                <>
                  <Loadingtile className="w-full h-[34px]" />
                  <Loadingtile className="w-full h-[34px]" />
                  <Loadingtile className="w-full h-[34px]" />
                </>
              )}

              {!loading && variants.length === 0 && (
                <p className="text-center text-sm text-gray-500 py-6">
                  No variants available
                </p>
              )}

              {!loading &&
                variants.map((variant, i) => {
                  const availablePrice = variant?.price?.find(
                    (p) => p.status === "Available",
                  );

                  const isCurrent = variant.variant === variantmenu.currvariant;

                  return (
                    <div
                      key={i}
                      className={`w-full px-3 py-1.5 rounded-md border text-sm
                        flex items-center gap-2 transition-colors
                        ${
                          isCurrent
                            ? "border-theme text-theme bg-theme/5"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }
                        ${!availablePrice && "opacity-50 cursor-not-allowed"}
                      `}
                    >
                      {/* availability dot */}
                      <span
                        className={`w-1.5 min-w-1.5 h-1.5 rounded-full ${
                          availablePrice ? "bg-green-600" : "bg-red-600"
                        }`}
                      />

                      <span className="">{variant.variant}</span>

                      {availablePrice && (
                        <span className="text-green-600 font-medium ml-auto">
                          {formatPrice(
                            availablePrice.sp,
                            availablePrice.currency,
                          )}
                        </span>
                      )}
                      <div className="flex gap-2 text-xs ml-4 text-blue-600">
                        {new Array(3).fill(null).map((slot, j) => (
                          <button
                            key={j}
                            onClick={async () => {
                              const product = await CachedProduct(variant._id);
                              setcomparelist((prev) => {
                                const updated = [...prev];
                                updated[j] = product;
                                return updated;
                              });
                              closeMenu();
                            }}
                            className="h-full aspect-square bg-blue-100 rounded-full border border-blue-400 p-1 whitespace-nowrap"
                          >
                            Slot {j + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
