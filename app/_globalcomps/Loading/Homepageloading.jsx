import React from "react";
import Loadingtile from "./Loadingtile";

function Homepageloading() {
  return (
    <div className="min-h-screen p-2 max-w-7xl mx-auto space-y-2">
      {/* Top Section */}
      <div className="grid lg:grid-cols-3 gap-2 ">
        {/* Finder */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Price Slider */}
            <div>
              <Loadingtile className={`h-10 w-72`} />
              <div className="flex gap-2 mt-2">
                <Loadingtile className={`h-10 w-full`} />
                <Loadingtile className={`h-10 w-full`} />
              </div>
              <Loadingtile className={`h-5 mt-5`} />
              <Loadingtile className={`h-10 mt-8`} />
            </div>

            {/* Popular Features */}
            <div>
              <div className="grid grid-cols-1 gap-2 max-h-64 overflow-hidden">
                {new Array(6).fill(null).map((_, i) => {
                  return <Loadingtile key={i} className={`h-10`} />;
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <Loadingtile className={`h-10 w-72`} />
          <div className="grid grid-cols-2 gap-2 mb-6 mt-2">
            {new Array(2).fill(null).map((_, i) => (
              <Loadingtile key={i} className={`h-14`} />
            ))}
          </div>

          <Loadingtile className={`h-8 w-40`} />
          <div className="flex flex-wrap gap-2 mt-2">
            {new Array(7).fill(null).map((_, i) => (
              <Loadingtile key={i} className={`h-7 w-20`} />
            ))}
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <Loadingtile className={`h-10 w-44`} />
          <Loadingtile className={`h-10 w-24`} />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {new Array(10).fill(null).map((b, i) => (
            <Loadingtile key={i} className={`h-36 w-36`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepageloading;
