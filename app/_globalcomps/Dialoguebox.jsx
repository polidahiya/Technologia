"use client";
import React, { useState } from "react";
import { AppContextfn } from "@/app/Context";

export default function Dialoguebox() {
  const { showdialog, setshowdialog, showdialoginitialvalues } = AppContextfn();
  const [loading, setloading] = useState(false);

  if (showdialog?.show) {
    return (
      <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center z-30 bg-black/50">
        <div className="bg-white rounded-md py-10  px-20">
          <p className="flex items-center justify-center gap-2 text-center">
            {loading && (
              <span
                className={`inline-block min-w-5 aspect-square border-t-2 border-b-2 ${
                  showdialog?.type ? "border-green-500" : "border-red-500"
                } rounded-full animate-spin`}
              ></span>
            )}
            {showdialog?.title}
          </p>
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              className={`px-5 py-1 border rounded-md ${
                showdialog?.type
                  ? "text-green-500 border-green-500 lg:hover:text-white lg:hover:bg-green-500"
                  : "text-red-500 border-red-500 lg:hover:text-white lg:hover:bg-red-500"
              }`}
              onClick={async () => {
                setloading(true);
                await showdialog?.continue();
                setloading(false);
                setshowdialog(showdialoginitialvalues);
              }}
            >
              Ok
            </button>
            <button
              className="px-5 py-1 border rounded-md"
              onClick={() => {
                setshowdialog(showdialoginitialvalues);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
