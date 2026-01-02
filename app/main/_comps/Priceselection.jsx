"use client";
import Link from "next/link";
import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";


function Priceselection() {
  const [price, setPrice] = useState([1000, 200000]);

  const handleMinChange = (e) => {
    let value = Number(e.target.value);

    // Clamp min: 0 → 100000
    if (value < 0) value = 0;
    if (value > 100000) value = 100000;

    // Ensure min <= max
    if (value > price[1]) value = price[1];

    setPrice([value, price[1]]);
  };

  const handleMaxChange = (e) => {
    let value = Number(e.target.value);

    // Clamp max: 10000 → 200000
    if (value < 10000) value = 10000;
    if (value > 200000) value = 200000;

    // Ensure max >= min
    if (value < price[0]) value = price[0];

    setPrice([price[0], value]);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-5">
      <h3 className="font-medium mb-3">Price</h3>

      <div className="flex items-center gap-1">
        <span>₹</span>
        <input
          type="number"
          min={0}
          max={100000}
          className="w-full px-2 py-1 rounded border border-slate-300 bg-white"
          value={price[0]}
          onChange={handleMinChange}
        />

        <span className="px-4">to</span>
        <span>₹</span>

        <input
          type="number"
          min={10000}
          max={200000}
          className="w-full px-2 py-1 rounded border border-slate-300 bg-white"
          value={price[1]}
          onChange={handleMaxChange}
        />
      </div>

      <div className="bg-white pt-2 pb-8 px-5 mt-5 rounded-md">
        <Slider
          range               
          min={1000}
          max={200000}
          value={price}
          step={1000}
          marks={{
            0: "₹0",
            50000: "₹50K",
            100000: "₹1L",
            150000: "₹1.5L",
            200000: "₹2L",
          }}
          onChange={setPrice}
        />
      </div>

      <Link
        href={`/main/all?Price=${price[0]}-${price[1]}`}
        className="w-full bg-theme text-white py-3 rounded-xl font-semibold block text-center mt-5"
      >
        Find Mobiles
      </Link>
    </div>
  );
}

export default Priceselection;
