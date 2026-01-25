"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Filterlinkhook from "./Filterlinkhook";

function Morebutton({ pageno }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <div className="flex items-center justify-center">
      <Link
        prefetch={false}
        scroll={false}
        replace
        href={
          Filterlinkhook(
            pathname,
            searchParams,
            "pageno",
            Number(pageno) + 1,
            false
          ) || "#"
        }
        className="w-full max-w-64 py-2 rounded-2xl bg-theme text-white text-center"
      >
        Show More
      </Link>
    </div>
  );
}

export default Morebutton;
