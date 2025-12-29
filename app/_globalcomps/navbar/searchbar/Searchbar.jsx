import React from "react";
import { Search } from "lucide-react";

function Searchbar() {
  return (
    <div className="hidden md:flex flex-1 max-w-lg mx-6">
      <div className="relative w-full bg-white rounded">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search phones, brands, chips..."
          className="w-full  px-10 py-2 text-sm outline-none "
        />
      </div>
    </div>
  );
}

export default Searchbar;
