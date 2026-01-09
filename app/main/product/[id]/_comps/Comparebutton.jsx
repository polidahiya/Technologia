"use client";
import React from "react";
import { AppContextfn } from "@/app/Context";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

function Comparebutton({ product }) {
  const { comparelist, setcomparelist, setmessagefn } = AppContextfn();

  const isadded = comparelist.some((item) => item && item._id === product._id);

  const handleClick = () => {
    setcomparelist((prev) => {
      // ✅ REMOVE
      const existingIndex = prev.findIndex(
        (item) => item && item._id === product._id
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = null;
        return updated;
      }

      // ❌ LIMIT REACHED (no empty slot)
      const emptyIndex = prev.findIndex((item) => item === null);
      if (emptyIndex === -1) {
        setmessagefn("Max compare limit reached");
        return prev;
      }

      // ✅ ADD into first empty slot
      const updated = [...prev];
      updated[emptyIndex] = product;
      return updated;
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-3 p-1 pr-5 rounded-full border transition
        ${
          isadded
            ? "bg-green-100 border-green-300 text-green-700"
            : "bg-blue-100 border-blue-300 text-blue-700"
        }`}
    >
      <span className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-white">
        {isadded ? <FiMinus /> : <GoPlus />}
      </span>
      <span className="inline-block w-full text-center">{isadded ? "Added" : "Compare"}</span>
    </button>
  );
}

export default Comparebutton;
