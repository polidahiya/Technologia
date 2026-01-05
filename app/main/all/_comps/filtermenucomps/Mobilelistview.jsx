"use client";
import React from "react";

export default function Mobilelistview({
  items,
  name,
  multipleMode,
  tempFilters = [],
  setTempFilters,
}) {
  return (
    <div className="flex max-h-96 flex-col divide-y divide-bg1 overflow-y-auto">
      {Object.entries(items).map(([slug, item]) => {
        const selectedValues = tempFilters?.[name] || [];
        const isApplied = selectedValues.includes(slug);

        return (
          <button
            key={slug}
            type="button"
            onClick={() =>
              setTempFilters((prev) => {
                const current = prev[name] || [];

                if (!multipleMode) {
                  return {
                    ...prev,
                    [name]: current[0] === slug ? [] : [slug],
                  };
                }

                return {
                  ...prev,
                  [name]: current.includes(slug)
                    ? current.filter((v) => v !== slug)
                    : [...current, slug],
                };
              })
            }
            className="group flex items-center gap-2 px-2 py-2 text-xs md:text-sm w-full text-left"
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
          </button>
        );
      })}
    </div>
  );
}
