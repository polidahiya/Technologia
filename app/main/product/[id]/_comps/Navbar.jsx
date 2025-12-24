"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useScrollSpy } from "@/app/_hooks/Spyscrollhook";

function Navbar({ navitems, stickyat = "top-0" }) {
  const active = useScrollSpy(navitems.map((s) => s.label));

  // store refs for each nav item
  const itemRefs = useRef({});

  useEffect(() => {
    const el = itemRefs.current[active];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "start", // ⬅️ brings active item to start
        block: "nearest",
      });
    }
  }, [active]);

  return (
    <div
      className={`flex gap-2 p-2 sticky ${stickyat} shadow bg-white rounded-2xl z-10
                    overflow-x-auto no-scrollbar`}
    >
      {navitems.map(({ label, icon: Icon }) => (
        <Link
          key={label}
          href={`#${label}`}
          ref={(el) => (itemRefs.current[label] = el)}
          className="flex items-center gap-2 p-2 pr-5 rounded-full
                     bg-gray-100 text-sm font-medium whitespace-nowrap
                     hover:bg-gray-200 transition scroll-ml-3"
        >
          <span
            className={`w-8 h-8 p-2 rounded-full flex items-center justify-center
              ${active === label ? "bg-theme text-white" : "bg-white"}
            `}
          >
            {Icon}
          </span>
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}

export default Navbar;
