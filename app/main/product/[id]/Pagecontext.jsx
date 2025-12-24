"use client";
import { createContext, useContext,  } from "react";

const AppContext = createContext({});

export function Pagectxwrapper({ children }) {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}

export function PageContextfn() {
  return useContext(AppContext);
}
