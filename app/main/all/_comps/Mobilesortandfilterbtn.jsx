"use client";
import React from "react";
import { PageContextfn } from "../Pagecontext";
import { LuFilter } from "react-icons/lu";
import { TbSortDescending } from "react-icons/tb";

function Mobilesortandfilterbtn() {
  const { setshowfilter, setshowsort } = PageContextfn();

  return (
    <div className="w-full flex gap-2 p-2 bg-white rounded-2xl shadow">
      <button
        className="flex items-center justify-center gap-1 w-full py-2 rounded-xl bg-bg1"
        onClick={() => setshowfilter(true)}
      >
        <LuFilter className="w-4 h-4" />
        Filter
      </button>
      <button
        className="flex items-center justify-center gap-1 w-full py-2 rounded-xl bg-bg1"
        onClick={() => setshowsort(true)}
      >
        <TbSortDescending className="w-4 h-4" />
        Sort
      </button>
    </div>
  );
}

export default Mobilesortandfilterbtn;
