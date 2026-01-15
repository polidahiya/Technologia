import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { icons } from "@/lib/data";
import formatPrice from "@/app/_globalcomps/Formateprice";
import formatDate from "@/app/_globalcomps/Formateddate";
import Comparebutton from "./Comparebutton";
import VariantPriceList from "./Variantpricelist";
import Admincopyproductdata from "./_herocomps/Admincopyproductdata";
import Variants from "./_herocomps/Variants";

export default function Herosection({ product, tokenRes, fullmode = true }) {
  const pricedata = product?.price[0];

  return (
    <section className="relative bg-white rounded-2xl shadow p-6 grid md:grid-cols-2 gap-8">
      <div className="">
        <Link prefetch={false} href={`/main/product/${product?._id}`}>
          <Nextimage
            src={product?.images?.[0]}
            alt={product?.model}
            height={500}
            width={500}
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
          {product.model}{" "}
          {product?.variant && (
            <span className="text-2xl text-slate-400 font-normal">
              ({product?.variant})
            </span>
          )}
        </h1>
        {tokenRes?.verified && <Admincopyproductdata product={product} />}

        <p className="opacity-70 font-semibold">
          {product.deviceType} |{" "}
          {new Date(product?.releaseDate) > new Date() ? (
            <span className="text-blue-500">Upcoming</span>
          ) : (
            formatDate(product?.releaseDate)
          )}
        </p>

        <div className="flex items-center gap-4 mt-3">
          <span className="text-3xl font-bold text-theme">
            {formatPrice(pricedata?.sp, pricedata?.currency)}
          </span>
          {pricedata?.mrp != pricedata?.sp && (
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
      {fullmode && <Variants product={product} />}
      {tokenRes?.verified && (
        <div className="absolute top-2 left-2 flex items-center gap-2 z-10">
          <Link
            prefetch={false}
            href={`/admin/product/add?edit=${product._id}`}
            target="_blank"
            className="bg-theme text-white px-5 py-2 rounded-md"
          >
            Edit
          </Link>
          <Link
            prefetch={false}
            href={`/admin/product/add?copy=${product._id}`}
            target="_blank"
            className="bg-theme text-white px-5 py-2 rounded-md"
          >
            Copy
          </Link>
        </div>
      )}
    </section>
  );
}
