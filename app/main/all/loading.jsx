import React from "react";
import Loadingtile from "@/app/_globalcomps/Loading/Loadingtile";
import Herosectionloading from "@/app/_globalcomps/Loading/Herosectionloading";

function loading() {
  return (
    <div className="w-full min-h-screen p-2">
      <div className="w-full flex gap-2 max-w-7xl mx-auto">
        {/*  */}
        <div className="w-72 space-y-2 shrink-0 hidden md:block">
          {new Array(3).fill(null).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-2">
              <Loadingtile className={"h-5 w-full"} />
              {i == 0 && (
                <div>
                  <div className="flex gap-2 mt-2">
                    <Loadingtile className={`h-10 w-full`} />
                    <Loadingtile className={`h-10 w-full`} />
                  </div>
                  <Loadingtile className={`h-5 mt-5`} />
                  <Loadingtile className={`h-10 mt-8`} />
                </div>
              )}
              <div className="flex max-h-96 flex-col gap-4 divide-y divide-bg1 mt-2">
                {new Array(7).fill(null).map((_, i) => {
                  return (
                    <div key={i} className="flex gap-2">
                      <Loadingtile className={"w-5 h-5"} />
                      <Loadingtile className={"w-full h-5"} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {/*  */}
        <div className="w-full lg:max-w-[864px] space-y-2">
          {/* laptop */}
          <div className="gap-2 hidden md:flex items-stretch">
            <Appliedfilters />
            <div className="rounded-2xl shadow bg-white p-2">
              <Loadingtile className="w-28 h-12" />
            </div>
          </div>
          {/* mobile */}
          <div className="space-y-2 md:hidden">
            <div className="w-full flex gap-2 p-2 bg-white rounded-2xl shadow">
              <Loadingtile className="w-full h-10"></Loadingtile>
              <Loadingtile className="w-full h-10"></Loadingtile>
            </div>
            <Appliedfilters />
          </div>

          <div className="w-full space-y-2">
            {new Array(3).fill(null).map((_, i) => {
              return <Herosectionloading key={i} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const Appliedfilters = () => {
  return (
    <div className="w-full flex rounded-2xl shadow bg-white p-2">
      <div className="flex gap-1 overflow-x-auto">
        {["_", "_"].map((_, i) => (
          <Loadingtile key={i} className="flex h-12 w-36 bg-bg1 rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default loading;
