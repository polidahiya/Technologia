import React from "react";
import Secondnavloading from "@/app/_globalcomps/Loading/Secondnavloading";
import Loadingtile from "@/app/_globalcomps/Loading/Loadingtile";

function loading() {
  return (
    <div className="min-h-screen p-2">
      <div className="max-w-6xl mx-auto space-y-2">
        <div className="sticky -top-8 md:-top-16 bg-bg1 rounded-2xl z-10 space-y-2">
          <div className={`bg-white  transition-all duration-300  h-60`}>
            <div className="sticky top-18 rounded-2xl overflow-hidden shadow bg-white">
              <div className="flex transition-all duration-300">
                {/* Left column */}
                <div
                  className={`flex-1 max-w-48 flex flex-col items-center justify-center gap-2 h-60`}
                >
                  <Loadingtile className={"w-20 md:w-28 h-8"} />
                  <Loadingtile className={"w-20 md:w-28 h-8"} />
                  <Loadingtile className={"w-20 md:w-28 h-8"} />
                </div>

                {["_", "_"].map((_, i) => {
                  return (
                    <div
                      key={i}
                      className={`relative flex-1 flex flex-col justify-center items-center border-r border-slate-200 last:border-r-0 px-1 md:px-2 h-60`}
                    >
                      {/* flex container */}
                      <div>
                        <Loadingtile className={"w-20 h-20 md:w-32 md:h-32"} />
                        <div
                          className={`transition-all duration-300 text-center text-sm mt-2`}
                        >
                          <Loadingtile className={"w-full md:w-32 h-5"} />
                          <Loadingtile className={"w-full md:w-32 h-5 mt-2"} />
                        </div>
                      </div>
                      {/* store links */}
                      <div className="flex items-center justify-center gap-2 flex-wrap mt-2">
                        <div className="flex items-center gap-2">
                          <Loadingtile className={"w-5 h-5"} />
                          <Loadingtile className={"w-5 h-5"} />
                        </div>
                        <Loadingtile className={"w-full md:w-32 h-5"} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Secondnavloading />
        </div>

        {/* score table */}
        <section className="relative bg-white rounded-2xl shadow overflow-hidden">
          <h2 className="relative flex  items-center gap-2 px-6 py-4 font-extrabold border-b border-slate-200 font-tenor tracking-wider">
            <Loadingtile className={"h-8 w-24"} />
            <span className="block absolute h-1/2 w-1 bg-theme rounded-r-full top-1/2 left-0 -translate-y-1/2 "></span>
          </h2>
          <table className="w-full text-sm">
            <tbody>
              <tr className={`border-b last:border-0 border-bg1`}>
                <td className="px-6 py-2 w-1/3 md:w-48 ">
                  <Loadingtile className={"h-4 w-full"} />
                </td>
                <td className="px-6 py-2">
                  <Loadingtile className={"h-16 w-16 mx-auto"} />
                </td>
                <td className="px-6 py-2">
                  <Loadingtile className={"h-16 w-16 mx-auto"} />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        {/* spec table */}
        <section className="relative bg-white rounded-2xl shadow overflow-hidden">
          <h2 className="relative flex  items-center gap-2 px-6 py-4 font-extrabold border-b border-slate-200 font-tenor tracking-wider">
            <Loadingtile className={"h-8 w-24"} />
            <span className="block absolute h-1/2 w-1 bg-theme rounded-r-full top-1/2 left-0 -translate-y-1/2 "></span>
          </h2>
          <table className="w-full text-sm">
            <tbody>
              {new Array(7).fill(null).map((_, i) => (
                <tr key={i} className={`border-b last:border-0 border-bg1`}>
                  <td className="px-6 py-2 w-1/3 md:w-48 ">
                    <Loadingtile className={"h-4 w-full"} />
                  </td>
                  <td className="px-6 py-2">
                    <Loadingtile className={"h-4 w-24 mx-auto"} />
                  </td>
                  <td className="px-6 py-2">
                    <Loadingtile className={"h-4 w-24 mx-auto"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default loading;
