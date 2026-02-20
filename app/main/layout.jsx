import React from "react";
import Navbar from "../_globalcomps/navbar/Navbar";
import Footer from "../_globalcomps/footer/Footer";
import Comparemenu from "../_globalcomps/comparemenu/Comparemenu";
import DeviceDetector from "../_globalcomps/Devicedetector";
import Verification from "@/lib/verification";
import Variantmenucomp from "../_globalcomps/Variantmenu";

async function layout({ children }) {
  const tokenres = await Verification();
  const device = await DeviceDetector();
  return (
    <div className="bg-bg1">
      <Navbar device={device} tokenres={tokenres} />
      <div className="max-w-7xl mx-auto md:px-2">{children}</div>
      <Comparemenu device={device} />
      <Variantmenucomp />
      <Footer />
    </div>
  );
}

export default layout;
