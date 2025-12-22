import React from "react";
import Navbar from "../_globalcomps/navbar/Navbar";

function layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default layout;