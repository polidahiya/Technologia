"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({});

export function Pagectxwrapper({ children }) {
  const [showfilter, setshowfilter] = useState(false);
  useEffect(() => {
    document.body.style.overflow = showfilter ? "hidden" : "auto";
  }, [showfilter]);
  return (
    <AppContext.Provider value={{ showfilter, setshowfilter }}>
      {children}
    </AppContext.Provider>
  );
}

export function PageContextfn() {
  return useContext(AppContext);
}
