import React from "react";
import Navbar from "../_globalcomps/navbar/Navbar";
import Footer from "../_globalcomps/footer/Footer";

function layout({ children }) {
  return (
    <div className="bg-bg1">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default layout;
