"use client";
import React from "react";
import Link from "next/link";
import Filterlinkhook from "../Filterlinkhook";
import { usePathname, useSearchParams } from "next/navigation";

function Laptoplistview({ items, name, multipleMode, appliedfilters = [] }) {
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
}

export default Laptoplistview;
