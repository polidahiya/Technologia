import React from "react";
import Refreshsite from "./_comps/Refreshsite";
import { revalidateTag } from "next/cache";

async function page() {
  const Revalidatesitefn = async () => {
    "use server";
    revalidateTag("all");
  };
  return (
    <div>
      <Refreshsite Revalidatesitefn={Revalidatesitefn} />
    </div>
  );
}

export default page;
