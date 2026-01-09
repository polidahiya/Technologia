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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-bg2/40 z-40 p-2"
          onClick={() => setshowstore(false)}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-3xl  rounded-2xl bg-white shadow-xl overflow-hidden  p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center gap-2 p-2 bg-bg2  sticky top-0 rounded-2xl shadow z-10">
              <div className="w-8"></div>
              <h2 className="text-white">Price List</h2>
              <button
                className="h-8 w-8 rounded-xl bg-bg1 flex items-center justify-center"
                onClick={() => setshowstore(false)}
              >
                {icons.Cross}
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto rounded-2xl bg-white shadow p-2 mt-2">
              <VariantPriceList prices={selectedproduct?.price || []} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Storesmenu;
