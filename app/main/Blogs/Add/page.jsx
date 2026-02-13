import React from "react";
import Clientpage from "./Clientpage";
import Verification from "@/lib/verification";
import { notFound } from "next/navigation";
import { getcollection } from "@/lib/db";

async function page({ searchParams }) {
  const { edit = null } = await searchParams;

  const tokenres = await Verification();
  if (!tokenres?.verified) notFound();

  let editdata = null;
  if (edit) {
    try {
      const { blogscollection, ObjectId } = await getcollection();
      const blog = await blogscollection.findOne({ _id: new ObjectId(edit) });
      blog._id = blog._id.toString();
      editdata = blog;
    } catch (error) {
      console.log(error);
    }
  }

  return <Clientpage editdata={editdata} />;
}

export default page;
