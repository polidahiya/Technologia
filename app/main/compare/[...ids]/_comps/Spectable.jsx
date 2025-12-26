import React from "react";

const getValue = (obj, key) => {
  return key.split(".").reduce((acc, k) => acc?.[k], obj) ?? "—";
};

function CompareSpecTable({ title, Icon, rows, products, id }) {
  return (
    <section
      id={id}
      className="relative bg-white rounded-2xl shadow overflow-hidden scroll-mt-52"
    >
      <h2 className="flex items-center gap-2 px-4 md:px-6 py-4 font-extrabold bg-bg1 border-b border-slate-300 font-tenor">
        {Icon}
        {title}
      </h2>

      <div className="">
        <table className="w-full text-sm border-collapse">
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.key}
                className={`border-b border-bg1 flex even:bg-bg1`}
              >
                <td
                  className={`flex-1 max-w-48 px-2 md:px-6 py-2 font-medium sticky left-0 border-r border-slate-300`}
                >
                  {row.label}
                </td>

                {products.map((product, j) => {
                  let value;

                  if (row.format) {
                    value = row.format(product);
                  } else {
                    value = getValue(product, row.key);
                  }

                  if (row.type === "boolean") {
                    value = value ? "✅ Yes" : "❌ No";
                  }

                  if (row.unit && value !== "—") {
                    value = `${value} ${row.unit}`;
                  }

                  return (
                    <td
                      key={j}
                      className="flex-1 px-2 md:px-6 py-2 text-center"
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CompareSpecTable;
