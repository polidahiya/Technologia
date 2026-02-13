"use client";
import React from "react";
import { AppContextfn } from "@/app/Context";

function Confirmdialogbox() {
  const { showdialog, setshowdialog, showdialoginitialvalues } = AppContextfn();
  if (showdialog.show) {
    return (
      <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center z-30 bg-black/50">
        <div className="bg-white rounded-md py-10  px-20">
          <p className="text-center">{showdialog.title}</p>
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              className={`px-5 py-1 border rounded-md ${
                showdialog.type
                  ? "text-green-500 border-green-500 lg:hover:text-white lg:hover:bg-green-500"
                  : "text-red-500 border-red-500 lg:hover:text-white lg:hover:bg-red-500"
              }`}
              onClick={() => {
                showdialog.continue();
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

export default Confirmdialogbox;
