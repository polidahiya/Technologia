import React from "react";

function Multiselectmenu({ state, setState, statename, options, title }) {
  // Add item if not already in the list
  const Handleadd = (value) => {
    if (!state.includes(value)) {
      setState((pre) => ({ ...pre, [statename]: [...state, value] }));
    }
  };

  // Remove item from the list
  const Handleremove = (value) => {
    setState((pre) => ({
      ...pre,
      [statename]: state.filter((item) => item !== value),
    }));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{title}</label>
      <div className="flex items-center gap-1 my-2 flex-wrap">
        {state.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm bg-slate-100 h-10 p-1 pl-5 rounded-md"
          >
            {item}
            <button
              type="button"
              onClick={() => Handleremove(item)}
              className="bg-white h-full aspect-square rounded-sm"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="mt-1 block w-full px-2 border rounded-md">
        <select
          onChange={(e) => {
            Handleadd(e.target.value);
            e.target.value = "";
          }}
          className="block w-full py-2 outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select Collections
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

export default Multiselectmenu;
