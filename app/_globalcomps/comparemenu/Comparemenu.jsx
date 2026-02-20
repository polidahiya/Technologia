"use client";
import React, { useEffect, useState } from "react";
import { AppContextfn } from "@/app/Context";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Nextimage from "../Nextimage";
import Link from "next/link";
import { icons } from "@/lib/data";
import formatPrice from "../Formateprice";
import Searchbar from "../navbar/searchbar/Searchbar";
import { AiOutlineDelete } from "react-icons/ai";

function Comparemenu({ device }) {
  const { comparelist, setcomparelist } = AppContextfn();
  const [showmenu, setshowmenu] = useState(false);
  const heightvalue = device == "mobile" ? 440 : 160;

  useEffect(() => {
    setshowmenu(true);
  }, [comparelist]);

  return (
    <AnimatePresence>
      {!comparelist.every((item) => !item) && (
        <motion.div
          initial={{ y: heightvalue }}
          animate={{ y: showmenu ? 0 : heightvalue }}
          exit={{
            y: heightvalue,
            opacity: 0,
          }}
          className={`fixed -bottom-20 md:-bottom-8 left-1/2 -translate-x-1/2 md:h-48 w-full pt-2 md:pt-0 pb-28 md:pb-0 max-w-7xl bg-white rounded-t-3xl z-10 border border-slate-300`}
        >
          {device == "mobile" && (
            <div className="flex justify-between items-center gap-2 p-2 bg-bg2 sticky top-0 rounded-2xl shadow mx-2">
              <div className="w-8" />
              <h2 className="text-white">Compare</h2>
              <button
                className="h-8 w-8 rounded-xl bg-bg1 flex items-center justify-center"
                onClick={() => setshowmenu(false)}
              >
                {icons.Cross}
              </button>
            </div>
          )}

          <div className="md:h-40 w-full flex flex-col md:flex-row">
            {comparelist.map((item, i) => (
              <Slote
                key={i}
                item={item}
                i={i}
                comparelist={comparelist}
                setcomparelist={setcomparelist}
              />
            ))}
            <div className="flex-1 w-full px-2 flex flex-row-reverse md:flex-col items-center justify-center mt-2 md:mt-0 gap-2">
              <Link
                href={`/main/compare/${comparelist
                  .filter(Boolean)
                  .map((p) => p?._id)
                  .join("/")}`}
                className="block text-center py-2 px-10 bg-theme text-white rounded-md"
                onClick={() => setshowmenu(false)}
              >
                Compare
              </Link>
              <button
                className="flex items-center gap-1 text-center py-2 px-10  text-red-500 rounded-md bg-bg1"
                onClick={() => setcomparelist([null, null, null])}
              >
                <AiOutlineDelete /> Clear all
              </button>
            </div>
          </div>
          <div className="absolute -top-12 left-2 h-10 flex gap-2">
            <button
              className="h-full flex items-center gap-2 rounded-full bg-bg2 text-white px-1.5 pr-6 shadow"
              onClick={() => setshowmenu((pre) => !pre)}
            >
              {/* Avatar stack */}
              <div className="relative h-8 w-[70px]">
                {comparelist.map((item, i) => {
                  if (!item) return null;

                  return (
                    <div
                      key={i}
                      className="absolute top-0 h-8 w-8 rounded-full bg-white overflow-hidden"
                      style={{
                        transform: `translateX(${i * 18}px)`,
                        zIndex: 10 - i,
                      }}
                    >
                      <Nextimage
                        src={item?.images?.[0] || "/uiimages/404.jpg"}
                        alt={item?.model}
                        width={32}
                        height={32}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                  );
                })}
              </div>

              <span className="text-sm whitespace-nowrap">Compare</span>
            </button>
            {showmenu && device == "desktop" && (
              <button
                onClick={() => setshowmenu((pre) => !pre)}
                className="h-full aspect-square rounded-full rotate-180 bg-bg2 text-white flex items-center justify-center"
              >
                <ChevronUp />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Slote = ({ comparelist, setcomparelist, item, i }) => {
  return (
    <React.Fragment>
      {item ? (
        <Showproduct item={item} i={i} setcomparelist={setcomparelist} />
      ) : (
        <Emptyslote setcomparelist={setcomparelist} i={i} />
      )}
      {i != comparelist.length - 1 && (
        <div className="h-8 md:h-full flex items-center justify-center">
          <Vsbox />
        </div>
      )}
    </React.Fragment>
  );
};
const Showproduct = ({ setcomparelist, item, i }) => {
  const { setvariantmenu } = AppContextfn();
  return (
    <div className="relative flex-1 w-full flex items-center gap-2 px-2 min-h-20 md:min-h-auto">
      <div className="w-20 h-20 shrink-0">
        <Nextimage
          src={item?.images[0] || "/uiimages/404.jpg"}
          alt={item?.model}
          height={40}
          width={40}
          className="w-full h-full object-contain object-center mix-blend-multiply"
        ></Nextimage>
      </div>
      <div className="px-1">
        <p className="text-sm font-semibold text-black group-hover:text-theme">
          {item?.model} {item?.variant && <>({item?.variant})</>}
        </p>
        <p className="text-xs text-gray-500">
          From{" "}
          <span className="font-semibold text-theme">
            {formatPrice(item?.price?.[0]?.sp || item?.price?.[0]?.mrp)}
          </span>
          <span className="ml-1 text-[11px] text-gray-400">
            • {item?.price?.[0]?.status}
          </span>
        </p>
        <button
          className="text-sm text-blue-600 flex items-center gap-1"
          onClick={() => {
            setvariantmenu({
              show: true,
              model: item?.model,
              currvariant: item?.variant,
            });
          }}
        >
          {icons?.Replace} Switch Variant
        </button>
      </div>
      {/* remove button */}
      <button
        className="absolute top-2 md:top-5 right-3 text-red-500 md:text-gray-400 text-xl hover:text-red-500 bg-white p-2 md:p-0"
        onClick={() =>
          setcomparelist((prev) => {
            const updated = [...prev];
            updated[i] = null;
            return updated;
          })
        }
      >
        {icons.Cross}
      </button>
    </div>
  );
};

const Emptyslote = ({ setcomparelist, i }) => {
  return (
    <div className="relative flex-1 w-full px-2 flex flex-col items-center justify-center min-h-20 md:min-h-auto">
      <div className="h-10 w-full border border-gray-300 rounded-md">
        <Searchbar
          suggestionspostion="bottom-full -translate-y-1"
          useaction={true}
          action={(p) => {
            setcomparelist((prev) => {
              const updated = [...prev];
              updated[i] = p;
              return updated;
            });
          }}
        />
      </div>
    </div>
  );
};
const Vsbox = () => {
  return (
    <div className="relative h-8 w-8 bg-blue-100 border border-blue-300 rounded-full flex items-center justify-center text-sm">
      VS
      <div className="absolute left-0 -translate-x-full bottom-1/2 translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:bottom-full h-0.5 w-20 md:h-12 md:w-0.5 md:translate-y-0 bg-gray-300"></div>
      <div className="absolute left-full top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:top-full md:translate-y-0 h-0.5 w-20 md:h-12 md:w-0.5 bg-gray-300"></div>
    </div>
  );
};

export default Comparemenu;
