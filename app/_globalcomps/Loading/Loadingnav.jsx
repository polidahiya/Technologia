import React from "react";
import Loadingtile from "./Loadingtile";

function Loadingnav() {
  return (
    <div>
      <div className="flex">
        <div className="flex-1 flex items-center gap-2 py-2">
          <Loadingtile className={"w-40 h-10"} />{" "}
          <Loadingtile className={"w-28 h-10 hidden lg:block"} />
        </div>
        <div className="flex-1 items-center gap-2 py-2 hidden lg:flex">
          <Loadingtile className={"w-full h-full"} />
        </div>
        <div className="flex-1 flex items-center justify-end gap-2 py-2">
          <Loadingtile className={"hidden lg:block w-10 aspect-square"} />
          <Loadingtile className={"hidden lg:block w-10 aspect-square"} />
          <Loadingtile className={"hidden lg:block w-10 aspect-square"} />
          <Loadingtile />
        </div>
      </div>
      <div className="items-center justify-center gap-2 py-2 hidden lg:flex">
        <Loadingtile className={"w-40 h-7"} />
        <Loadingtile className={"w-40 h-7"} />
        <Loadingtile className={"w-40 h-7"} />
        <Loadingtile className={"w-40 h-7"} />
        <Loadingtile className={"w-40 h-7"} />
      </div>
    </div>
  );
}

export default Loadingnav;
