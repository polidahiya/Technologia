"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext({});

export function Appwrapper({ children }) {
  const [messagearray, setmessagearray] = useState([]);
  const [showsearchbar, setshowsearchbar] = useState(false);
  const [comparelist, setcomparelist] = useState([null, null, null]);

  // messages
  const setmessagefn = (message) => {
    setmessagearray([
      ...messagearray,
      { id: Math.random() + new Date().getMilliseconds(), message: message },
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        showsearchbar,
        setshowsearchbar,
        comparelist,
        setcomparelist,
        messagearray,
        setmessagearray,
        setmessagefn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function AppContextfn() {
  return useContext(AppContext);
}
