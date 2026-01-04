"use client";
import React from "react";
import Link from "next/link";
import { filters } from "@/lib/data";
import Filterlinkhook from "./Filterlinkhook";
import { usePathname, useSearchParams } from "next/navigation";
import { PageContextfn } from "../Pagecontext";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "@/lib/data";

function Filtermenu({ appliedfilters, device }) {
  const { showfilter, setshowfilter } = PageContextfn();
  
  if (device == "desktop") {
    return (
      <div className="w-72 space-y-2">
        {Object.entries(filters).map(([slug, filter]) => {
          const appliedValues = appliedfilters?.[slug]?.split(",") ?? [];
          return (
            <Container key={slug} title={filter.name}>
              {/* Special UI for price */}
              {slug === "Price" && (
                <>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      placeholder="Min"
                      className="border border-slate-300 w-full px-2 py-1 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="border border-slate-300 w-full px-2 py-1 rounded"
                    />
                  </div>
                  <div className="mt-2 text-sm text-slate-500">slider</div>
                </>
              )}

              <Listview
                name={slug}
                items={filter.options}
                multipleMode={filter?.multipleMode}
                appliedfilters={appliedValues}
              />
            </Container>
          );
        })}
      </div>
    );
  } else {
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
            <div className="flex justify-between items-center gap-2 p-2 bg-white sticky top-0 rounded-2xl shadow">
              <div className="w-8"></div>
              <h2>Filters</h2>
              <button
                className="h-8 w-8 rounded-xl bg-bg1 flex items-center justify-center"
                onClick={() => setshowfilter(false)}
              >
                {icons.Cross}
              </button>
            </div>
            {Object.entries(filters).map(([slug, filter]) => {
              const appliedValues = appliedfilters?.[slug]?.split(",") ?? [];
              return (
                <Container key={slug} title={filter.name}>
                  {/* Special UI for price */}
                  {slug === "Price" && (
                    <>
                      <div className="flex gap-1">
                        <input
                          type="number"
                          placeholder="Min"
                          className="border border-slate-300 w-full px-2 py-1 rounded"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="border border-slate-300 w-full px-2 py-1 rounded"
                        />
                      </div>
                      <div className="mt-2 text-sm text-slate-500">slider</div>
                    </>
                  )}

                  <Listview
                    name={slug}
                    items={filter.options}
                    multipleMode={filter?.multipleMode}
                    appliedfilters={appliedValues}
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
              <button className="w-full py-2 rounded-xl bg-theme text-white">
                Apply
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
}

const Container = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-2">
      <h2 className="flex items-center font-bold gap-1 text-sm mb-2 mt-1 pl-1">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
};

const Listview = ({ items, name, multipleMode, appliedfilters = [] }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <div className="flex max-h-96 flex-col divide-y divide-bg1 overflow-y-auto">
      {Object.entries(items).map(([slug, item]) => {
        const isApplied = appliedfilters.includes(slug);

        return (
          <Link
            key={slug}
            href={
              Filterlinkhook(
                pathname,
                searchParams,
                name,
                slug,
                multipleMode
              ) || "#"
            }
            className="group flex items-center gap-2 px-2 py-2 text-xs md:text-sm transition-colors"
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
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default Filtermenu;
