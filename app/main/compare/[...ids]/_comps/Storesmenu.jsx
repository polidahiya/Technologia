"use client";
import React from "react";
import { PageContextfn } from "../Pagecontext";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "@/lib/data";
import VariantPriceList from "@/app/main/product/[id]/_comps/Variantpricelist";

function Storesmenu() {
  const { showstore, setshowstore, selectedproduct } = PageContextfn();

  return (
    <AnimatePresence>
      {showstore && (
        <>
          {/* 🔲 Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setshowstore(false)}
          />

          {/* 🧾 Modal */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          >
            <div
              className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-lg font-bold text-slate-900">Price List</h2>

                <button
                  onClick={() => setshowstore(false)}
                  className="text-slate-400 hover:text-red-500 text-xl"
                >
                  {icons.Cross}
                </button>
              </div>

              {/* Content */}
              <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
                <VariantPriceList prices={selectedproduct?.price || []} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Storesmenu;
