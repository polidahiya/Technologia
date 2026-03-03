"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Slote } from "@/app/_globalcomps/comparemenu/Comparemenu";
import { AiOutlineDelete } from "react-icons/ai";
import { AppContextfn } from "@/app/Context";

function Compareslots({ slot1 = null }) {
  const { comparelist, setcomparelist } = AppContextfn();

  useEffect(() => {
    setcomparelist([slot1, null, null]);
  }, []);

  return (
    <section className="relative bg-white rounded-2xl shadow">
      <h2 className="relative flex items-center gap-2 px-6 py-4 font-extrabold border-b border-slate-200 font-tenor tracking-wider">
        Compare
        <span className="block absolute h-1/2 w-1 bg-theme rounded-r-full top-1/2 left-0 -translate-y-1/2" />
      </h2>
      <div className="md:h-40 w-full flex flex-col md:flex-row">
        {comparelist.map((item, i) => (
          <Slote
            key={i}
            item={item}
            i={i}
            comparelist={comparelist}
            setcomparelist={setcomparelist}
            suggestionspostion="top-full translate-y-1"
          />
        ))}
        <div className="flex-1 w-full px-2 flex flex-row-reverse md:flex-col items-center justify-center mt-2 md:mt-0 gap-2">
          <Link
            href={`/main/compare/${comparelist
              .filter(Boolean)
              .map((p) => p?._id)
              .join("/")}`}
            className="w-full block text-center py-2 px-10 bg-theme text-white rounded-md"
          >
            Compare
          </Link>
          <button
            className="w-full flex items-center justify-center gap-1 text-center py-2 px-10  text-red-500 rounded-md bg-bg1"
            onClick={() => setcomparelist([null, null, null])}
          >
            <AiOutlineDelete /> Clear all
          </button>
        </div>
      </div>
    </section>
  );
}

export default Compareslots;
