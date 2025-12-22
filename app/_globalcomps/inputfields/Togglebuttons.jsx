import React from "react";

function Togglebuttons({
  titlename,
  value,
  positive,
  negative,
  positiveText,
  negativeText,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {titlename}
        <span className={`ml-3 ${value ? "text-green-500" : "text-red-500"}`}>
          {value ? positiveText : negativeText}
        </span>
      </label>
      <div className="w-full md:max-w-72 mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={positive}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded ${
            value
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {positiveText}
        </button>
        <button
          type="button"
          onClick={negative}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded ${
            !value
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {negativeText}
        </button>
      </div>
    </div>
  );
}

export default Togglebuttons;
