"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { AppContextfn } from "@/app/Context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Getdata from "./Getdata";
import Nextimage from "../../Nextimage";
// import { fbq } from "@/app/_connections/Fbpixel";
// import { event } from "nextjs-google-analytics";
import Loadingtile from "../../Loading/Loadingtile";
import formatPrice from "../../Formateprice";

function Searchbar({
  autoFocus = false,
  suggestionspostion = "top-full translate-y-1",
  useaction = false,
  action = () => {},
}) {
  const router = useRouter();
  const { showsearchbar, setshowsearchbar } = AppContextfn();
  const [searchedproducts, setsearchedproducts] = useState([]);
  const [isfocused, setisfocused] = useState(false);
  const [searchtext, setsearchtext] = useState("");
  const [loading, setloading] = useState(false);

  // Add debounce logic
  useEffect(() => {
    let debounceTimeout;
    const fetchSearchedProducts = async () => {
      if (searchtext.trim() === "") {
        setsearchedproducts([]);
        return;
      }
      //   fbq("track", "Search", {
      //     search_string: searchtext,
      //     content_category: "Furniture",
      //   });
      //   event("search", {
      //     search_term: searchtext,
      //     items: [],
      //   });
      setloading(true);
      const searched = await Getdata(searchtext);
      setloading(false);
      setsearchedproducts(searched);
    };

    debounceTimeout = setTimeout(() => {
      fetchSearchedProducts();
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchtext, showsearchbar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setshowsearchbar(false);
    setisfocused(false);
    if (useaction) return;
    
    router.push(`/main/all?search=${searchtext}`);
  };

  return (
    <div className="relative flex flex-1 max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="relative w-full bg-white rounded"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search phones, brands, chips..."
          className="w-full  px-10 py-2 text-sm outline-none "
          onFocus={() => setisfocused(true)}
          onBlur={() => {
            setTimeout(() => {
              setisfocused(false);
            }, 500);
          }}
          value={searchtext}
          required
          autoFocus={autoFocus}
          onChange={(e) => {
            setisfocused(true);
            setsearchtext(e.target.value);
          }}
        />
      </form>
      {isfocused && (
        <div
          className={`absolute  flex flex-col w-full bg-white rounded shadow overflow-hidden ${suggestionspostion}`}
        >
          {loading ? (
            <Skeletonloading />
          ) : (
            <>
              {searchedproducts.map((item, i) => (
                <Link
                  key={i}
                  href={`/main/product/${item?._id}`}
                  className="group flex gap-2 w-full h-12 px-2 py-1 border-b border-bg1 last:border-0 group hover:bg-bg1"
                  onClick={(e) => {
                    if (useaction) {
                      e.preventDefault();
                      action(item);
                      return;
                    }
                    // setshowsearchbar(false);
                  }}
                >
                  <div className="h-full aspect-square">
                    <Nextimage
                      src={item?.images[0] || "/uiimages/404.jpg"}
                      alt={item?.model}
                      height={40}
                      width={40}
                      className="w-full h-full object-contain object-center mix-blend-multiply"
                    ></Nextimage>
                  </div>
                  <div className="px-1">
                    <p className="text-sm truncate font-semibold text-black group-hover:text-theme">
                      {item?.model}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      From{" "}
                      <span className="font-semibold text-theme">
                        {formatPrice(
                          item?.price?.[0]?.sp || item?.price?.[0]?.mrp
                        )}
                      </span>
                      <span className="ml-1 text-[11px] text-gray-400">
                        • {item?.price?.[0]?.status}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

const Skeletonloading = () => {
  return (
    <>
      {new Array(5).fill(null).map((item, i) => (
        <div
          key={i}
          className="flex gap-2 w-full h-12 px-2 py-1 border-b border-bg1 animate-pulse "
        >
          <Loadingtile className="h-full aspect-square"></Loadingtile>
          <div className="px-1 text-sm flex flex-col gap-0.5 w-full">
            <Loadingtile className="w-3/4">.</Loadingtile>
            <Loadingtile className="w-1/2">.</Loadingtile>
          </div>
        </div>
      ))}
    </>
  );
};

export default Searchbar;
