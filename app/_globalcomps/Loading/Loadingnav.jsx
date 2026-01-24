import React from "react";
import Loadingtile from "./Loadingtile";

function Loadingnav() {
  return (
    <div className="h-16 w-full sticky top-0 left-0 z-50 bg-bg2 border-b">
      <div className="mx-auto max-w-6xl px-4 lg:px-0">
        <div className="flex h-16 items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded bg-primary flex items-center justify-center bg-white">
              <Loadingtile className={"h-10 w-10"} />
            </div>
            <Loadingtile className={"h-10 w-24"} />
          </div>

          <Loadingtile className={"h-9 w-lg ml-8 hidden md:block"} />

          <div className="ml-auto flex items-center gap-2">
            <Loadingtile className={"h-9 w-28"} />
            <Loadingtile className={"h-9 w-9 md:w-16"} />
            <Loadingtile className={"h-9 w-16 hidden md:block"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loadingnav;
