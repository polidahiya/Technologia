import React from "react";
import { RiDeleteBackFill } from "react-icons/ri";

function Standardinputfield({
  titlename,
  value,
  isRequired = false,
  type = "text",
  onchange = () => {},
  clear = () => {},
  placeholder = "",
  clearbutton = false,
}) {
  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-600">
        {titlename}
      </label>
      <div className="flex items-stretch gap-2 mt-1">
        <input
          type={type}
          value={value}
          onChange={onchange}
          required={isRequired}
          className="w-full h-full p-2 border rounded-md outline-none"
          placeholder={placeholder}
        />
        {clearbutton && (
          <button
            type="button"
            className="px-4 py-2 border rounded-md "
            onClick={clear}
          >
            <RiDeleteBackFill className="h-full w-full" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Standardinputfield;
