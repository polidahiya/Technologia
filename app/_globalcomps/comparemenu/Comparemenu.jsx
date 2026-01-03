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

function Comparemenu() {
  const { comparelist, setcomparelist } = AppContextfn();
  const [showmenu, setshowmenu] = useState(false);

  useEffect(() => {
    setshowmenu(true);
  }, [comparelist]);

  return (
    <AnimatePresence>
      {!comparelist.every((item) => !item) && (
        <motion.div
          initial={{ y: 160 }}
          animate={{ y: showmenu ? 0 : 160 }}
          exit={{
            y: 160,
            opacity: 0,
          }}
          className={`fixed -bottom-8 left-1/2 -translate-x-1/2 h-48 w-full max-w-6xl bg-white rounded-t-2xl z-10 border border-slate-300`}
        >
          <div className="h-40 w-full flex">
            {comparelist.map((item, i) => (
              <Slote
                key={i}
                item={item}
                i={i}
                comparelist={comparelist}
                setcomparelist={setcomparelist}
              />
            ))}
            <div className="flex-1 w-full px-2 flex flex-col items-center justify-center">
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
                className="flex items-center gap-1 text-sm text-center py-2 px-10  text-red-500 rounded-md"
                onClick={() => setcomparelist([])}
              >
                <AiOutlineDelete /> Clear all
              </button>
            </div>
          </div>
          <button
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-theme text-white w-10 aspect-square flex items-center justify-center rounded-full shadow"
            onClick={() => setshowmenu((pre) => !pre)}
          >
            <ChevronUp
              className={`duration-300 ${showmenu ? "rotate-180" : "rotate-0"}`}
            />
          </button>
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
        <div className="h-full flex items-center justify-center">
          <Vsbox />
        </div>
      )}
    </React.Fragment>
  );
};
const Showproduct = ({ setcomparelist, item, i }) => {
  return (
    <div className="relative flex-1 w-full flex items-center gap-2 px-2">
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
          {item?.brand} {item?.model}
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
      </div>
      {/* remove button */}
      <button
        className="absolute top-5 right-3 text-gray-400 text-xl hover:text-red-500"
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
    <div className="relative flex-1 w-full px-2 flex flex-col items-center justify-center">
      <div className="h-10 border border-gray-300 rounded-md">
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
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full h-12 w-0.5 bg-gray-300"></div>
      <div className="absolute left-1/2 -translate-x-1/2 top-full h-12 w-0.5 bg-gray-300"></div>
    </div>
  );
};

export default Comparemenu;
