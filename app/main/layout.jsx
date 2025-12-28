import React from "react";
import Navbar from "../_globalcomps/navbar/Navbar";

function layout({ children }) {
  return (
    <div className="bg-bg1">
      <Navbar />
      {children}
    </div>
  );
}

export default layout;