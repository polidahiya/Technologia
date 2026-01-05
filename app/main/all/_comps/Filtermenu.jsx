import React from "react";
import Mobile from "./filtermenucomps/Mobile";
import Laptop from "./filtermenucomps/Laptop";

function Filtermenu({ appliedfilters, device }) {
  if (device == "desktop") {
    return <Laptop appliedfilters={appliedfilters} />;
  } else {
    return <Mobile appliedfilters={appliedfilters} />;
  }
}

export default Filtermenu;
