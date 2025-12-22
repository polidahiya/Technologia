import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";

function Multiplevaluesfield({
  title,
  placeholder,
  state,
  setState,
  statename,
}) {
  const handleAdd = () => {
    setState((pre) => {
      const updatedstate = { ...pre };
      updatedstate[statename] = [...updatedstate[statename], ""];
      return updatedstate;
    });
  };

  const handleDelete = (index) => {
    setState((pre) => {
      const updatedstate = { ...pre };
      updatedstate[statename] = updatedstate[statename].filter(
        (_, i) => i !== index
      );
      return updatedstate;
    });
  };

  const handleStateChange = (index, value) => {
    setState((pre) => {
      const updatedstate = { ...pre };
      updatedstate[statename][index] = value;
      return updatedstate;
    });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{title}</label>
      <ul className="mt-2 space-y-1">
        {state.map((dimension, index) => (
          <div key={index} className="flex items-stretch gap-2 mt-1">
            <input
              type="text"
              value={dimension}
              onChange={(e) => handleStateChange(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 p-2 border rounded-md outline-none"
            />
            <button
              type="button"
              className="px-4 py-2 border rounded-md "
              onClick={() => handleDelete(index)}
            >
              <MdDeleteOutline className="h-full w-full" />
            </button>
          </div>
        ))}
      </ul>
      <button
        type="button"
        className="border border-gray-300 px-5 py-2 rounded-md text-sm mt-2"
        onClick={handleAdd}
      >
        <MdAddToPhotos className="inline" /> Add more
      </button>
    </div>
  );
}

export default Multiplevaluesfield;
