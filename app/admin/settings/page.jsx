import React from "react";
import Refreshsite from "./_comps/Refreshsite";
import Revalidatefn from "@/app/_globalcomps/cachedata/Revalidatefn";

async function page() {
  const Revalidatesitefn = async () => {
    "use server";
    Revalidatefn(["all"]);
  };
  return (
    <div>
      <Refreshsite Revalidatesitefn={Revalidatesitefn} />
    </div>
  );
}

export default page;
