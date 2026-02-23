import React from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import VariantPriceList from "./Variantpricelist";

function Floatingshopbutton({ product, styles = "md:top-20" }) {
  return (
    <div
      className={`md:sticky  w-full rounded-2xl bg-white p-3 shadow space-y-3 ${styles}`}
    >
      <Nextimage
        src={product?.images[0] || null}
        alt={product?.model}
        height={500}
        width={500}
        loading="lazy"
        className="w-full max-h-[420px] object-contain rounded-xl"
      />
      <h1 className="text-xl font-bold font-tenor">
        {product?.model}{" "}
        {product?.variant && (
          <span className="text-base opacity-50 whitespace-nowrap">
            ( {product?.variant} )
          </span>
        )}
      </h1>

      <VariantPriceList prices={product?.price || []} model={product?.model} />
    </div>
  );
}

export default Floatingshopbutton;
