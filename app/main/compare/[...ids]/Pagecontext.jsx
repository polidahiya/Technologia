"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext({});

export function Pagectxwrapper({ children }) {
  const [showstore, setshowstore] = useState(false);
  const [selectedproduct, setselectedproduct] = useState(null);
  return (
    <AppContext.Provider
      value={{ showstore, setshowstore, selectedproduct, setselectedproduct }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function PageContextfn() {
  return useContext(AppContext);
}
