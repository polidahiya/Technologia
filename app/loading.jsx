import React from "react";
import Loadingnav from "./_globalcomps/Loading/Loadingnav";
import Homepageloading from "./_globalcomps/Loading/Homepageloading";

function loading() {
  return (
    <div className="h-screen overflow-hidden bg-bg1">
      <Loadingnav />
      <Homepageloading />
    </div>
  );
}

export default loading;
