"use client";
import { useState } from "react";
import { GetDisplacementFilter } from "./GetDisplacementFilter";
import { GetDisplacementMap } from "./GetDisplacementMap";
// import styles from "./GlassElement.module.css";

export const GlassElement = ({
  height,
  width,
  depth: baseDepth,
  radius,
  children,
  strength,
  chromaticAberration,
  blur = 2,
  className,
}) => {
  /* Change element depth on click */
  const [clicked, setClicked] = useState(false);
  const depth = baseDepth / (clicked ? 0.7 : 1);

  /* Dynamic CSS properties */
  const style = {
    // height: `${height}px`,
    // width: `${width}px`,
    borderRadius: `${radius}px`,
    backdropFilter: `blur(${blur / 2}px) url('${GetDisplacementFilter({
      height,
      width,
      radius,
      depth,
      strength,
      chromaticAberration,
    })}') blur(${blur}px) brightness(1.1) saturate(1.5)`,
  };


  return (
    <div
      className={className}
      style={style}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
    >
      {children}
    </div>
  );
};
