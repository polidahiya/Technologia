import React from "react";

function Container({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-2">
      <h2 className="flex items-center font-bold gap-1 text-sm mb-2 mt-1 pl-1">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

export default Container;
