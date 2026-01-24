import React from "react";
import Loadingtile from "./Loadingtile";

function Secondnavloading() {
  return (
    <div
      className={`flex gap-2 p-1 md:p-2 sticky top-0 bottom-0 shadow bg-white rounded-2xl z-10 overflow-x-auto no-scrollbar`}
    >
      {new Array(10).fill(null).map((_, i) => (
        <Loadingtile key={i} className={"w-36 min-w-36 h-9"} />
      ))}
    </div>
  );
}

export default Secondnavloading;
