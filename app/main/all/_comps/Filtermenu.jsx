"use client";
import React from "react";
import Link from "next/link";
import { icons } from "@/lib/data";
import { usePathname, useSearchParams } from "next/navigation";

export const filters = [
  {
    name: <>{icons?.dollar} Price</>,
    slug: "Price",
    options: [
      { name: "Below ₹10,000", slug: "below10k", operation: () => {} },
      { name: "₹10,000 – ₹15,000", slug: "10to15k", operation: () => {} },
      { name: "₹15,000 – ₹20,000", slug: "15to20k", operation: () => {} },
      { name: "₹20,000 – ₹30,000", slug: "20to30k", operation: () => {} },
      { name: "₹30,000 – ₹40,000", slug: "30to40k", operation: () => {} },
      { name: "₹40,000 – ₹60,000", slug: "40to60k", operation: () => {} },
      { name: "Above ₹60,000", slug: "above60k", operation: () => {} },
    ],
  },
  {
    name: <>{icons?.processor} Performance</>,
    slug: "Performance",
    options: [
      {
        name: "Flagship Performance",
        slug: "flagshippreformance",
        operation: () => {},
      },
      {
        name: "Upper Mid-Range",
        slug: "uppermidrangeperformance",
        operation: () => {},
      },
      { name: "Mid-Range", slug: "midrangeperformance", operation: () => {} },
      {
        name: "Entry Level",
        slug: "entrylevelperformance",
        operation: () => {},
      },
    ],
  },
  {
    name: <>{icons?.apple} Brand</>,
    slug: "Brand",
    options: [
      { name: "Apple", slug: "Apple", operation: () => {} },
      { name: "Samsung", slug: "Samsung", operation: () => {} },
      { name: "Google", slug: "Google", operation: () => {} },
      { name: "Realme", slug: "Realme", operation: () => {} },
      { name: "Huawei", slug: "Huawei", operation: () => {} },
      { name: "Xiaomi", slug: "Xiaomi", operation: () => {} },
      { name: "Oppo", slug: "Oppo", operation: () => {} },
      { name: "Vivo", slug: "Vivo", operation: () => {} },
      { name: "OnePlus", slug: "OnePlus", operation: () => {} },
      { name: "iQOO", slug: "iQOO", operation: () => {} },
      { name: "Motorola", slug: "Motorola", operation: () => {} },
      { name: "Nokia", slug: "Nokia", operation: () => {} },
      { name: "Sony", slug: "Sony", operation: () => {} },
      { name: "Lenovo", slug: "Lenovo", operation: () => {} },
      { name: "Asus", slug: "Asus", operation: () => {} },
      { name: "Micromax", slug: "Micromax", operation: () => {} },
      { name: "Asus", slug: "Asus", operation: () => {} },
      { name: "Nothing", slug: "Nothing", operation: () => {} },
    ],
  },
  {
    name: <>{icons?.gaming} Gaming</>,
    slug: "Gaming",
    options: [
      {
        name: "Best Gaming Phones",
        slug: "bestgamingphones",
        operation: () => {},
      },
      { name: "High FPS Gaming", slug: "highfpsgaming", operation: () => {} },
      {
        name: "Dedicated Cooling",
        slug: "dedicatedcooling",
        operation: () => {},
      },
      { name: "Gaming Triggers", slug: "gamingtriggers", operation: () => {} },
    ],
  },
  {
    name: <>{icons?.fingerprint} Features</>,
    slug: "Features",
    options: [
      {
        name: "In-Display Fingerprint",
        slug: "indisplayfingerprint",
        operation: () => {},
      },
      { name: "Stereo Speakers", slug: "stereospeakers", operation: () => {} },
      { name: "Headphone Jack", slug: "headphonejack", operation: () => {} },
      {
        name: "IP Rated (Water Resistant)",
        slug: "iprated",
        operation: () => {},
      },
    ],
  },
  {
    name: <>{icons?.connectivity} Connectivity</>,
    slug: "Connectivity",
    options: [
      { name: "5G Phones", slug: "5gphones", operation: () => {} },
      { name: "Wi-Fi 6 / 6E", slug: "wifi6", operation: () => {} },
      { name: "Bluetooth 5.3+", slug: "bluetooth5", operation: () => {} },
      { name: "NFC Support", slug: "nfc", operation: () => {} },
      { name: "eSIM Support", slug: "esim", operation: () => {} },
    ],
  },
  {
    name: <>{icons?.ram} Memory</>,
    slug: "Memory",
    options: [
      { name: "8GB RAM & Above", slug: "8gbram", operation: () => {} },
      { name: "12GB RAM & Above", slug: "12gbram", operation: () => {} },
      {
        name: "256GB Storage & Above",
        slug: "256gbstorage",
        operation: () => {},
      },
      {
        name: "Expandable Storage",
        slug: "expendablestorage",
        operation: () => {},
      },
    ],
  },
  {
    name: <>{icons?.screen} Display</>,
    slug: "Display",
    options: [
      { name: "AMOLED Display", slug: "amoled", operation: () => {} },
      { name: "120Hz Refresh Rate", slug: "120hz", operation: () => {} },
      { name: "144Hz Refresh Rate", slug: "144hz", operation: () => {} },
      { name: "HDR Display", slug: "hrdisplay", operation: () => {} },
      { name: "Curved Display", slug: "curveddisplay", operation: () => {} },
    ],
  },
  {
    name: <>{icons?.battery} Battery</>,
    slug: "Battery",
    options: [
      { name: "5000mAh & Above", slug: "5kmah", operation: () => {} },
      { name: "Fast Charging (67W+)", slug: "fastcharge", operation: () => {} },
      {
        name: "Wireless Charging",
        slug: "wirelesscharge",
        operation: () => {},
      },
      { name: "Reverse Charging", slug: "reversecharge", operation: () => {} },
    ],
  },
  {
    name: <>{icons?.rearcamera} Camera</>,
    slug: "Camera",
    options: [
      { name: "Best Camera Phones", slug: "bestcamera", operation: () => {} },
      { name: "108MP & Above", slug: "108mp", operation: () => {} },
      { name: "50MP Camera Phones", slug: "50mp", operation: () => {} },
      { name: "With OIS", slug: "ois", operation: () => {} },
      { name: "4K Video Recording", slug: "4kvideo", operation: () => {} },
      {
        name: "Good Selfie Camera",
        slug: "goodselfiecamera",
        operation: () => {},
      },
    ],
  },
];

function Filtermenu() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const generateHref = (name, value) => {
    const params = new URLSearchParams(searchParams.toString());

    // Normalize incoming value to array
    const values = Array.isArray(value) ? value : [value];

    // Current values from URL
    const current = params.get(name)?.split(",").filter(Boolean) || [];

    // Handle "All"
    if (values.includes("All")) {
      params.delete(name);
      return `${pathname}?${params.toString()}`;
    }

    let next = [...current];

    values.forEach((v) => {
      if (next.includes(v)) {
        // Toggle off
        next = next.filter((x) => x !== v);
      } else {
        // Add
        next.push(v);
      }
    });

    // Set or delete param
    if (next.length) {
      params.set(name, next.join(","));
    } else {
      params.delete(name);
    }

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="w-72 space-y-2">
      {filters.map((filter, i) => (
        <Container key={i} title={filter.name}>
          {filter.slug == "Price" && (
            <>
              <div className="flex gap-1">
                <input
                  type="number"
                  name=""
                  id=""
                  className="border border-slate-300 w-full"
                />
                <input
                  type="number"
                  name=""
                  id=""
                  className="border border-slate-300 w-full"
                />
              </div>
              <div>slider</div>
            </>
          )}
          <Listview
            generateHref={generateHref}
            name={filter.slug}
            items={filter.options}
          />
        </Container>
      ))}
    </div>
  );
}

const Container = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-2">
      <h2 className="flex items-center font-bold gap-1 text-sm mb-2 mt-1 pl-1">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
};

const Listview = ({ items, name, generateHref }) => {
  return (
    <div className="flex flex-col divide-y divide-bg1 overflow-y-scroll max-h-96">
      {items.map((item, i) => (
        <Link
          key={i}
          href={generateHref(name, item.slug) || "#"}
          className="group flex items-center gap-2 px-2 py-1 text-xs md:text-sm"
        >
          <span
            className={`block w-3 h-3 rounded-full border border-slate-300 bg-white group-hover:border-theme`}
          ></span>
          <span className="group-hover:text-theme">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Filtermenu;
