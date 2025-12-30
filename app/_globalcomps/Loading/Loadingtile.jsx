import React from "react";

function Loadingtile({ className, children }) {
  return (
    <div
      className={`rounded-md bg-gray-100 overflow-hidden relative text-transparent ${
        className || "w-10 aspect-square"
      }`}
    >
      <div className="absolute h-full shimmer w-24 bg-gradient-to-r from-gray-100 via-white to-gray-100 z-10" />
      <span className="opacity-0">{children}</span>
    </div>
  );
}

export default Loadingtile;
