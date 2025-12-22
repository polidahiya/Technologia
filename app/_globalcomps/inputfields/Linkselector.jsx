"use client";
import React, { useState } from "react";
import Nextimage from "../Nextimage";

function Linkselector({
  collections,
  products,
  selected = {
    type: "",
    id: "",
    collection: ["", ""],
  },
  callback = () => {},
}) {
  const [show, setshow] = useState(false);
  const [type, settype] = useState("collections"); //collections,product

  return (
    <div>
      <button
        type="button"
        className="border rounded-md py-2 w-full"
        onClick={() => setshow(true)}
      >
        Link to : {selected.type}{" "}
        {selected.collection && (
          <>
            {selected.collection[0]} : {selected.collection[1]}
          </>
        )}
      </button>
      {show && (
        <div className="fixed top-0 left-0 h-dvh w-full flex items-center justify-center bg-black/20 z-40 p-2">
          <div className="w-full max-w-3xl bg-white flex flex-col rounded-3xl">
            {/* header */}
            <div className="p-2">
              <div className="flex items-center">
                <div className="flex-1 font-tenor text-2xl pl-5">Link to</div>
                <button
                  type="button"
                  className="w-10 aspect-square rounded-full bg-gray-200"
                  onClick={() => setshow(false)}
                >
                  X
                </button>
              </div>
              <div className="flex gap-2 justify-center mt-2">
                {["collections", "product"].map((item, i) => (
                  <button
                    type="button"
                    key={i}
                    className={`border rounded-md py-2 px-5 ${
                      type == item ? "border-theme text-theme" : ""
                    }`}
                    onClick={() => {
                      settype(item);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            {/* body */}
            <div className="flex flex-col p-5 max-h-96 overflow-y-auto mb-5">
              {type == "collections" && (
                <div className="space-x-1 space-y-1">
                  {collections.map((collection, i) => (
                    <div key={i} className="space-x-1 space-y-1">
                      {collection?.subcat?.map((subcat, j) => {
                        const selectedoption =
                          selected.type == type &&
                          selected.collection[0] == collection?.name &&
                          selected.collection[1] == subcat?.name;
                        return (
                          <button
                            key={j}
                            type="button"
                            className={`px-5 py-1 rounded-full  ${
                              selectedoption
                                ? "bg-theme text-white"
                                : "bg-slate-100"
                            }`}
                            onClick={() => {
                              callback({
                                type: type,
                                id: "",
                                collection: [collection?.name, subcat?.name],
                              });

                              setshow(false);
                            }}
                          >
                            {collection?.name} : {subcat?.name}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
              {type == "product" && (
                <div className="grid grid-cols-3 gap-0.5 ">
                  {products.map((product, i) => {
                    const selectedoption =
                      selected.type == type && selected.id == product._id;
                    return (
                      <div
                        key={i}
                        className=" relative"
                        onClick={() => {
                          callback({
                            type: type,
                            id: product?._id,
                            collection: "",
                          });
                          setshow(false);
                        }}
                      >
                        <div
                          className={`flex items-center justify-center absolute top-0 right-0 w-5 aspect-square text-white ${
                            selectedoption
                              ? "bg-theme"
                              : "bg-white border border-theme"
                          }`}
                        >
                          {selectedoption && "✓"}
                        </div>
                        <Nextimage
                          src={product?.images[0]}
                          alt={product?.name}
                          height={500}
                          width={500}
                          loading="lazy"
                          className="w-full aspect-square object-cover"
                        />
                        <div className="px-4">
                          <p className="flex items-center justify-between flex-wrap mt-[6px]">
                            <span className="line-clamp-2">
                              {product?.name}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Linkselector;
