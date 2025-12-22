import React from "react";

function Dropdownmenu({ title, state, onchange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{title}</label>
      <div className="mt-1 block w-full px-2 border rounded-md">
        <select
          value={options.includes(state) ? state : ""}
          onChange={(e) => {
            onchange(e.target.value);
            e.target.value = "";
          }}
          className="block w-full py-2 outline-none"
        >
          <option value={""} disabled>
            select
          </option>
          {options.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Dropdownmenu;
