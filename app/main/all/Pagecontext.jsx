"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({});

export function Pagectxwrapper({ children }) {
  const [showfilter, setshowfilter] = useState(false);
  const [showsort, setshowsort] = useState(false);
  useEffect(() => {
    document.body.style.overflow = showfilter || showsort ? "hidden" : "auto";
  }, [showfilter, showsort]);
  return (
    <AppContext.Provider
      value={{ showfilter, setshowfilter, showsort, setshowsort }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function PageContextfn() {
  return useContext(AppContext);
}
