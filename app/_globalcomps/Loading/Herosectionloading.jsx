import React from "react";
import Loadingtile from "./Loadingtile";

function Herosectionloading({ fullmode = false }) {
  return (
    <section className="w-full relative bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* spec score */}
      {!fullmode && (
        <div className="absolute top-3 left-3">
          <Loadingtile className="h-16 w-16 z-10 border border-white"></Loadingtile>
        </div>
      )}

      {/*  */}
      <div className="">
        <Loadingtile className="w-full aspect-square max-h-[420px]" />
        <div className="flex item-center justify-center mt-5">
          <Loadingtile className={"w-48 h-10"} />
        </div>
      </div>

      <div className="">
        <Loadingtile className={"w-full h-9"} />

        <div className="flex gap-2 mt-2">
          <Loadingtile className={"w-24 h-5"} />
          <Loadingtile className={"w-24 h-5"} />
        </div>

        <Loadingtile className={"w-32 h-9 mt-2"} />

        {/* Feature badges */}
        <div className="pt-2 text-sm space-y-0.5 mt-1">
          {new Array(7).fill(null).map((_, i) => (
            <div key={i} className="flex gap-2">
              <Loadingtile className={"w-5 h-5"} />
              <Loadingtile className={"w-48 h-5"} />
            </div>
          ))}
        </div>

        {/* Buy buttons */}
        <Loadingtile className={"w-full h-16 mt-2"} />
        <Loadingtile className={"w-full h-16 mt-2"} />
        {/*variants */}
        <div className="flex gap-2 mt-2">
          <Loadingtile className={"w-36 h-9"} />
          <Loadingtile className={"w-36 h-9"} />
          <Loadingtile className={"w-36 h-9"} />
        </div>
      </div>
    </section>
  );
}

export default Herosectionloading;
