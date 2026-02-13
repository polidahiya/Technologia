import React from "react";
import Link from "next/link";

function Newbutton() {
  return (
    <Link
      href="/main/Blogs/Add"
      className="relative flex flex-col items-center justify-center h-full min-h-40 rounded-md border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 transition cursor-pointer"
    >
      <div className="text-4xl text-gray-400">+</div>
      <div className="mt-2 text-sm text-gray-600 font-medium">Add New Blog</div>
    </Link>
  );
}

export default Newbutton;
