import React from "react";
import Verification from "@/lib/verification";
import { notFound } from "next/navigation";

async function layout({ children }) {
  const tokenRes = await Verification();
  if (!tokenRes.verified) {
    notFound();
  }
  return <div>{children}</div>;
}

export default layout;
