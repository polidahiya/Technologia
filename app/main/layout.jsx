import React from "react";
import Navbar from "../_globalcomps/navbar/Navbar";
import Footer from "../_globalcomps/footer/Footer";
import Comparemenu from "../_globalcomps/comparemenu/Comparemenu";
import DeviceDetector from "../_globalcomps/Devicedetector";

async function layout({ children }) {
  const device = await DeviceDetector();
  return (
    <div className="bg-bg1">
      <Navbar device={device} />
      {children}
      <Comparemenu device={device} />
      <Footer />
    </div>
  );
}

export default layout;
