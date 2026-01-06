"use client";
import React from "react";
import { TbSortDescending } from "react-icons/tb";
import Container from "../filtermenucomps/Container";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Filterlinkhook from "../Filterlinkhook";
import { sortdata } from "@/lib/data";

function Sortmenulaptop({ appliedSort = "default" }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <button className="group/menu relative flex items-center justify-center gap-1 rounded-2xl shadow bg-white px-10 z-10">
      <TbSortDescending className="w-4 h-4" /> Sort
      <div className="hidden group-hover/menu:block absolute top-[calc(100%+8px)] right-0 w-60">
        <div className="absolute h-10 w-32 bottom-full right-0"></div>
        <Container title={""}>
          {Object.entries(sortdata).map(([name, value]) => {
            const isApplied = appliedSort == name;
            return (
              <Link prefetch={false} 
                key={name}
                href={
                  Filterlinkhook(pathname, searchParams, "sort", name, false) ||
                  "#"
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
                  {value.name}
                </span>
              </Link>
            );
          })}
        </Container>
      </div>
    </button>
  );
}

export default Sortmenulaptop;
