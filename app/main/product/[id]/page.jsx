import React from "react";

async function page({ params }) {
  const { id } = await params;
  return <div></div>;
}

export default page;
