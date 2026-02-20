import React from "react";
import Loadingtile from "@/app/_globalcomps/Loading/Loadingtile";
import Herosectionloading from "@/app/_globalcomps/Loading/Herosectionloading";
import Secondnavloading from "@/app/_globalcomps/Loading/Secondnavloading";

function loading() {
  return (
    <div className="h-screen overflow-hidden bg-bg1">
      <div className="min-h-screen py-2 px-2 md:px-0 w-full">
        <div className="max-w-7xl mx-auto space-y-2 w-full">
          <Herosectionloading fullmode={true} />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
            {/* Overall */}
            <div className="flex items-center justify-center rounded-2xl bg-white p-6 shadow">
              <Loadingtile className={"h-36 w-36"} />
            </div>

            {/* Breakdown */}
            <div className="md:col-span-3 rounded-2xl bg-white p-6 shadow">
              <div className="h-full w-full grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 place-items-center place-content-center">
                {new Array(6).fill(null).map((_, i) => (
                  <Loadingtile key={i} className={"h-24 w-24"} />
                ))}
              </div>
            </div>
          </div>

          <Secondnavloading />

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
                    <td className="px-6 py-2 ">
                      <Loadingtile className={"h-4 w-24"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
}

export default loading;
