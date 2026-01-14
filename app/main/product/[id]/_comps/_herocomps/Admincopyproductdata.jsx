"use client";
import React from "react";
import copytoclipboard from "@/app/_globalcomps/copytoclipboard";

function Admincopyproductdata({ product }) {
  return (
    <button className="text-blue-600 text-sm" onClick={() => copytoclipboard(JSON.stringify(product))}>
      Copy product data
    </button>
  );
}

export default Admincopyproductdata;
