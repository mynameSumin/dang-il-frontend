import React from "react";

const SquareMemo = ({ color }) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.165039"
        y="0.390625"
        width="25.1747"
        height="25.1747"
        rx="4"
        fill={color}
      />
    </svg>
  );
};

export default SquareMemo;
