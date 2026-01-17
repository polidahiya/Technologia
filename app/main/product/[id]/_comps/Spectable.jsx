import React from "react";

function SpecTable({ title, Icon, rows,id }) {
  return (
    <section  className="relative bg-white rounded-2xl shadow overflow-hidden" id={id}>
      <span className="absolute -top-20 left-0 pointer-events-none" ></span>
      <h2 className="relative flex  items-center gap-2 px-6 py-4 font-extrabold border-b border-slate-200 font-tenor tracking-wider">
        {Icon}
        {title}
        <span className="block absolute h-1/2 w-1 bg-theme rounded-r-full top-1/2 left-0 -translate-y-1/2 "></span>
      </h2>
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([label, value], i) =>
            value ? (
              <tr key={i} className={`border-b last:border-0 border-bg1`}>
                <td className="px-6 py-2 w-1/3 md:w-48 ">{label}</td>
                <td className="px-6 py-2 ">{value}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </section>
  );
}

export default SpecTable;
