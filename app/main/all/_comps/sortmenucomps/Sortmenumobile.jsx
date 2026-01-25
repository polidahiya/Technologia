"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "@/lib/data";
import Container from "../filtermenucomps/Container";
import { usePathname, useSearchParams } from "next/navigation";
import { PageContextfn } from "../../Pagecontext";
import { sortdata } from "@/lib/data";
import Link from "next/link";
import Filterlinkhook from "../Filterlinkhook";

function Sortmenumobile({ appliedSort = "default" }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showsort, setshowsort } = PageContextfn();

  return (
    <AnimatePresence>
      {showsort && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 right-0 w-full h-dvh overflow-y-scroll bg-bg1 p-2 space-y-2 z-50"
        >
          <div className="flex justify-between items-center gap-2 p-2 bg-bg2  sticky top-0 rounded-2xl shadow z-10">
            <div className="w-8"></div>
            <h2 className="text-white">Sort</h2>
            <button
              className="h-8 w-8 rounded-xl bg-bg1 flex items-center justify-center"
              onClick={() => setshowsort(false)}
            >
              {icons.Cross}
            </button>
          </div>
          <Container title={""}>
            {Object.entries(sortdata).map(([name, value]) => {
              const isApplied = appliedSort == name;
              return (
                <Link
                  prefetch={false}
                  replace
                  key={name}
                  href={
                    Filterlinkhook(
                      pathname,
                      searchParams,
                      "sort",
                      name,
                      false,
                    ) || "#"
                  }
                  className="group flex items-center gap-2 px-2 py-2 text-xs md:text-sm transition-colors"
                  onClick={() => setshowsort(false)}
                >
                  {/* Checkbox indicator */}
                  <span
                    className={`block h-3 w-3 rounded-full border transition
                ${
                  isApplied
                    ? "border-theme bg-theme"
                    : "border-slate-300 group-hover:border-theme"
                }
              `}
                  />

                  {/* Label */}
                  <span
                    className={`transition-colors
                ${isApplied ? "text-theme font-medium" : "text-slate-700"}
                group-hover:text-theme
              `}
                  >
                    {value.name}
                  </span>
                </Link>
              );
            })}
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sortmenumobile;
