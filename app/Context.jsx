"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext({});

export function Appwrapper({ children }) {
  const [messagearray, setmessagearray] = useState([]);
  const [showsearchbar, setshowsearchbar] = useState(false);
  const [comparelist, setcomparelist] = useState([null, null, null]);
  const [variantmenu, setvariantmenu] = useState({
    show: false,
    model: null,
    currvariant: null,
  });

  const showdialoginitialvalues = {
    show: false,
    title: "",
    continue: null,
    type: true,
  };
  const [showdialog, setshowdialog] = useState(showdialoginitialvalues);

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
        variantmenu,
        setvariantmenu,
        messagearray,
        setmessagearray,
        setmessagefn,
        showdialog,
        setshowdialog,
        showdialoginitialvalues,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function AppContextfn() {
  return useContext(AppContext);
}
