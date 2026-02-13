"use client";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Revalidatepathfn from "@/app/_serveractions/Revalidatepathfn";
import { AppContextfn } from "@/app/Context";
import { Deleteblog } from "./Serveraction";

function Deletebutton({ post }) {
  const { setshowdialog } = AppContextfn();
  return (
    <button
      className="bg-red-600 text-white rounded-full p-2"
      onClick={() => {
        setshowdialog({
          show: true,
          title: "Delete Blog?",
          continue: async () => {
            await Deleteblog(post);
            await Revalidatepathfn("/main/Blogs");
          },
          type: false,
        });
      }}
    >
      <AiOutlineDelete />
    </button>
  );
}

export default Deletebutton;
