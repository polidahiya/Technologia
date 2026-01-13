import React, { useState } from "react";

function InputWithSuggestions({ title, state, onchange, options }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(state.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-600">
        {title}
      </label>

      <input
        type="text"
        value={state}
        onChange={(e) => {
          onchange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          // delay so click can register
          setTimeout(() => setShowSuggestions(false), 300);
        }}
        className="mt-1 block w-full px-3 py-2 border rounded-md outline-none"
        placeholder="Type to search..."
      />

      {showSuggestions && filteredOptions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow max-h-48 overflow-y-auto">
          {filteredOptions.map((item, i) => (
            <div
              key={i}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onchange(item);
                setShowSuggestions(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputWithSuggestions;
