import React from "react";

const RectangleMemo = ({ color }) => {
  return (
    <svg
      width="26"
      height="20"
      viewBox="0 0 26 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.745117"
        y="0.389648"
        width="25.1747"
        height="18.9938"
        rx="4"
        fill={color}
      />
    </svg>
  );
};

export default RectangleMemo;
