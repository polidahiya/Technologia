"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { usePathname, useSearchParams } from "next/navigation";
import Filterlinkhook from "../all/_comps/Filterlinkhook";

function Priceselection({
  showactionbutton = true,
  minvalue = 1000,
  maxvalue = 200000,
  useaction = false,
  MinChange = () => {},
  MaxChange = () => {},
  usepath = "",
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // local state only used when useaction === false
  const [price, setPrice] = useState([minvalue, maxvalue]);

  // 🔑 sync when props change
  useEffect(() => {
    if (!useaction) {
      setPrice([minvalue, maxvalue]);
    }
  }, [minvalue, maxvalue, useaction]);

  const min = useaction ? minvalue : price[0];
  const max = useaction ? maxvalue : price[1];

  const updateMin = (value) => {
    let v = Math.max(0, Math.min(value, max));
    useaction ? MinChange(v) : setPrice([v, max]);
  };

  const updateMax = (value) => {
    let v = Math.min(200000, Math.max(value, min));
    useaction ? MaxChange(v) : setPrice([min, v]);
  };

  const handleSliderChange = ([newMin, newMax]) => {
    if (useaction) {
      MinChange(newMin);
      MaxChange(newMax);
    } else {
      setPrice([newMin, newMax]);
    }
  };

  return (
    <div>
      {/* Inputs */}
      <div className="flex gap-1">
        <input
          type="number"
          min={0}
          max={max}
          value={min}
          onChange={(e) => updateMin(Number(e.target.value))}
          className="border border-slate-300 w-full px-2 py-1 rounded bg-white outline-none"
        />

        <input
          type="number"
          min={min}
          max={200000}
          value={max}
          onChange={(e) => updateMax(Number(e.target.value))}
          className="border border-slate-300 w-full px-2 py-1 rounded bg-white outline-none"
        />
      </div>

      {/* Slider */}
      <div className="bg-white pt-2 pb-8 px-5 mt-5 rounded-md">
        <Slider
          range
          min={1000}
          max={200000}
          step={1000}
          value={[min, max]}
          marks={{
            0: "₹0",
            50000: "₹50K",
            100000: "₹1L",
            150000: "₹1.5L",
            200000: "₹2L",
          }}
          onChange={handleSliderChange}
        />
      </div>

      {/* Action button */}
      {showactionbutton && !useaction && (
        <Link prefetch={false} 
          href={
            Filterlinkhook(
              usepath ? usepath : pathname,
              searchParams,
              "Price",
              `${price[0]}-${price[1]}`,
              false
            ) || `/main/all?Price=${price[0]}-${price[1]}`
          }
          className="w-full bg-theme text-white py-2 rounded-md font-semibold block text-center my-2"
        >
          Go
        </Link>
      )}
    </div>
  );
}

export default Priceselection;
