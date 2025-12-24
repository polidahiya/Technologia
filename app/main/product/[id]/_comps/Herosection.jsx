import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { icons } from "@/lib/data";

function Herosection({ product }) {
  return (
    <section className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-2 gap-8">
      <Nextimage
        src={product.images?.[0]}
        alt={product.model}
        height={420}
        width={536}
        loading="lazy"
        className="w-full max-h-[420px] object-contain rounded-xl"
      />

      <div className="">
        <h1 className="text-3xl font-bold font-tenor">
          {product.brand} {product.model}
        </h1>

        <p className="text-bg mt-2">{product.deviceType}</p>

        <div className="flex items-center gap-4 mt-1">
          <span className="text-3xl font-bold text-theme">
            ${product.offerPrice || product.price}
          </span>
          {product.offerPrice && (
            <span className="line-through text-slate-400">
              ${product.price}
            </span>
          )}
        </div>

        {/* Feature badges */}
        <div className="pt-2 text-sm space-y-0.5">
          {[
            {
              icon: icons.processor,
              alt: "processor",
              content: `${product?.chipset} @${product?.maxCpuClockSpeed} GHz`,
            },
            {
              icon: icons.ram,
              alt: "ram",
              content: `${product?.ram} GB RAM (${product?.ramType})`,
            },
            {
              icon: icons.storage,
              alt: "storage",
              content: `${product?.storage} Storage (${product?.storageType})`,
            },
            {
              icon: icons.rearcamera,
              alt: "camera",
              content: `${product?.RearCameramegapixels} Mp Rear Camera`,
            },
            {
              icon: icons.selficamera,
              alt: "selficamera",
              content: `${product?.frontCameramegapixels} Mp Front Camera`,
            },
            {
              icon: icons.battery,
              alt: "battery",
              content: `${product?.batteryCapacity} mAh ${product?.batteryType}`,
            },
            {
              icon: icons.screen,
              alt: "screen",
              content: `${product?.display?.[0]?.size} inches | ${product?.display?.[0]?.type} | ${product?.display?.[0]?.refreshRate} Hz`,
            },
          ].map((item, index) => {
            return (
              <p key={index} className="flex items-center gap-2">
                {item.icon}
                <span>{item.content}</span>
              </p>
            );
          })}
        </div>

        {/* Buy buttons */}
        <div className="flex gap-3 pt-4">
          <Link
            href={product?.amazonLink}
            className="flex items-center gap-2 py-2 px-5 rounded-md shadow"
          >
            <Nextimage
              src="/stores/1519104223.avif"
              height={20}
              width={20}
              alt="amazon"
              className=""
            ></Nextimage>
            Amazon
          </Link>
          <Link
            href={product?.flipkartLink}
            className="flex items-center gap-2 py-2 px-5 rounded-md shadow"
          >
            <Nextimage
              src="/stores/1519104215.avif"
              height={20}
              width={20}
              alt="flipkart"
              className=""
            ></Nextimage>
            Flipkart
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Herosection;
