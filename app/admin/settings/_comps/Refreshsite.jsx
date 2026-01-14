"use client";
import React from "react";
import { AppContextfn } from "@/app/Context";

function Refreshsite({ Revalidatesitefn }) {
  const { setmessagefn } = AppContextfn();
  return (
    <button
      className="px-5 py-2 border bg-theme text-white rounded"
      onClick={async () => {
        await Revalidatesitefn();
        setmessagefn("Site Refreshed");
      }}
    >
      Refresh full site
    </button>
  );
}

export default Refreshsite;
