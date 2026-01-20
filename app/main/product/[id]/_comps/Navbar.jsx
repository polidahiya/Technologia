"use client";
import React, { useEffect, useRef } from "react";
import { useScrollSpy } from "@/app/_hooks/Spyscrollhook";

function Navbar({ navitems, stickyat = "top-0", scrolloffset = 0 }) {
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
    <>
      <div
        className={`flex gap-2 p-1 md:p-2 sticky ${stickyat} bottom-0 shadow bg-white rounded-2xl z-10
                    overflow-x-auto no-scrollbar`}
      >
        {navitems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            ref={(el) => (itemRefs.current[label] = el)}
            className="flex items-center gap-1 md:gap-2 p-1 md:p-2 pr-5 md:pr-5 rounded-full
                     bg-bg1 shadow text-xs md:text-sm font-medium whitespace-nowrap
                     hover:bg-gray-200 transition scroll-ml-3"
            onClick={() => {
              if (!label) return;
              const el = document.getElementById(label);
              if (!el) return;

              const headerOffset = scrolloffset; // change if you have sticky header
              const elementPosition = el.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }}
          >
            <span
              className={`w-6 h-6 md:w-8 md:h-8 p-1 md:p-2 rounded-full flex items-center justify-center
              ${active === label ? "bg-theme text-white" : "bg-white"}
            `}
            >
              {Icon}
            </span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default Navbar;
