"use client";
import React, { useState } from "react";
import Image from "next/image";

function Nextimage({ ...props }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Image
      loading={!props.priority ? "lazy" : "eager"}
      onError={() => {
        setImgError(true);
      }}
      title={props?.alt || "Image"}
      unoptimized={imgError}
      {...props}
    />
  );
}

export default Nextimage;
