import React from "react";
import Navbar from "../_globalcomps/navbar/Navbar";
import Footer from "../_globalcomps/footer/Footer";
import Comparemenu from "../_globalcomps/comparemenu/Comparemenu";

function layout({ children }) {
  return (
    <div className="bg-bg1">
      <Navbar />
      {children}
      <Comparemenu />
      <Footer />
    </div>
  );
}

export default layout;
