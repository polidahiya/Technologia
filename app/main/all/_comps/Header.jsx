"use client";
import React from "react";
import Link from "next/link";
import Filterlinkhook from "./Filterlinkhook";
import { usePathname, useSearchParams } from "next/navigation";
import { icons } from "@/lib/data";

function Header({ filterArray }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <div className="flex rounded-2xl shadow bg-white p-2 sticky top-0">
      <div className="flex gap-1">
        {filterArray.map((item, i) => {
          return (
            <div key={i} className="flex h-12 bg-bg1 rounded-xl p-1">
              <div className="flex flex-col justify-center px-2  text-sm">
                <p className="font-semibold text-gray-400 text-[10px] ">
                  {item[0]}
                </p>
                <p className="">{item[2]}</p>
              </div>
              <Link
                href={
                  Filterlinkhook(pathname, searchParams, item[0], item[1]) ||
                  "#"
                }
                className="h-6 aspect-square flex items-center justify-center bg-white text-red-600 rounded-lg"
              >
                {icons?.Cross}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="px-3 py-1 bg-bg1 ml-auto">Sort</div>
    </div>
  );
}

export default Header;
