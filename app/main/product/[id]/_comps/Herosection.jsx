import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { icons } from "@/lib/data";
import formatPrice from "@/app/_globalcomps/Formateprice";
import Comparebutton from "./Comparebutton";
import VariantPriceList from "./Variantpricelist";

export default function Herosection({ product }) {
  const pricedata = product?.price[0];

  return (
    <section className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-2 gap-8">
      <div className="">
        <Link href={`/main/product/${product?._id}`}>
          <Nextimage
            src={product.images?.[0]}
            alt={product.model}
            height={420}
            width={536}
            loading="lazy"
            className="w-full max-h-[420px] object-contain rounded-xl"
          />
        </Link>
        <div className="flex item-center justify-center mt-5">
          <Comparebutton product={product} />
        </div>
      </div>

      <div className="">
        <h1 className="text-3xl font-bold font-tenor">
          {product.brand} {product.model}
        </h1>

        <p className="opacity-70 font-semibold">{product.deviceType}</p>

        <div className="flex items-center gap-4 mt-3">
          <span className="text-3xl font-bold text-theme">
            {formatPrice(pricedata?.sp, pricedata?.currency)}
          </span>
          {product.mrp != pricedata?.sp && (
            <span className="line-through text-slate-400">
              {formatPrice(pricedata?.mrp)}
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
        <VariantPriceList prices={product.price} />
      </div>
    </section>
  );
}
