"use client";
import React, { useState } from "react";
import { ScoreCircle } from "@/app/main/product/[id]/_comps/_scores/Showscores";

const getValue = (obj, key) => {
  return key.split(".").reduce((acc, k) => acc?.[k], obj) ?? "—";
};

const toNumber = (v) => {
  const n = Number(v);
  return isNaN(n) ? null : n;
};

export default function ScorestableComp({ allscores, scoretitle }) {
  const [expand, setExpand] = useState(false);

  const baseRows = [
    {
      label: "Total",
      key: "totalscore",
      format: (s) => <ScoreCircle score={s?.totalscore} size="sm" />,
    },
  ];

  const expandedRows = [
    {
      label: "Display",
      key: "displayscore",
      format: (s) => <ScoreCircle score={s?.displayscore} size="sm" />,
    },
    {
      label: "Performance",
      key: "performancescore",
      format: (s) => <ScoreCircle score={s?.performancescore} size="sm" />,
    },
    {
      label: "Camera",
      key: "camerascore",
      format: (s) => <ScoreCircle score={s?.camerascore} size="sm" />,
    },
    {
      label: "Battery",
      key: "batteryscore",
      format: (s) => <ScoreCircle score={s?.batteryscore} size="sm" />,
    },
    {
      label: "Connectivity",
      key: "connectionscore",
      format: (s) => <ScoreCircle score={s?.connectionscore} size="sm" />,
    },
    {
      label: "Design",
      key: "designscore",
      format: (s) => <ScoreCircle score={s?.designscore} size="sm" />,
    },
  ];

  return (
    <>
      <Scoretable
        title={scoretitle?.label}
        id={scoretitle?.label}
        Icon={scoretitle?.icon}
        products={allscores}
        rows={[...baseRows, ...(expand ? expandedRows : [])]}
      />
      <div className="flex justify-center">
        <button
          onClick={() => setExpand((p) => !p)}
          className="mb-2 text-sm font-medium text-theme hover:underline"
        >
          {expand ? "Hide detailed scores" : "Show detailed scores"}
        </button>
      </div>
    </>
  );
}

function Scoretable({ title, Icon, rows, products, id }) {
  return (
    <section
      id={id}
      className="relative bg-white rounded-2xl shadow overflow-hidden"
    >
      <h2 className="relative flex items-center gap-2 px-4 md:px-6 py-4 font-extrabold border-b border-slate-300 font-tenor tracking-wider text-theme">
        {Icon}
        {title}
        <span className="block absolute h-1/2 w-1 bg-theme rounded-r-full top-1/2 left-0 -translate-y-1/2 "></span>
      </h2>

      <div className="">
        <table className="w-full text-sm border-collapse">
          <tbody>
            {rows.map((row, i) => {
              // Boolean row → true wins
              let winnerIndexes = [];

              if (row.type === "boolean") {
                winnerIndexes = products
                  .map((p, j) => (getValue(p, row.key) === true ? j : -1))
                  .filter((j) => j !== -1);
              } else {
                const nums = products.map((p) =>
                  toNumber(getValue(p, row.key)),
                );

                const valid = nums.filter((n) => n !== null);

                if (valid.length) {
                  const minmax =
                    row?.win == "min" ? Math.min(...valid) : Math.max(...valid);
                  winnerIndexes = nums
                    .map((n, j) => (n === minmax ? j : -1))
                    .filter((j) => j !== -1);
                }
              }

              const isWinner = (j) => winnerIndexes.includes(j);
              return (
                <tr key={i} className={`border-b border-bg1 flex`}>
                  <td
                    className={`flex-1 flex items-center max-w-48 px-2 md:px-6 py-2 font-medium sticky left-0 border-r border-slate-300`}
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

                    if (row.unit && value !== "—" && value != "") {
                      value = `${value} ${row.unit}`;
                    }

                    return (
                      <td
                        key={j}
                        className={`flex-1 px-2 md:px-6 py-2 text-center ${
                          isWinner(j) ? "bg-green-50 font-semibold" : ""
                        }`}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
