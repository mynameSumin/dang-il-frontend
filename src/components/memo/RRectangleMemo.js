import React from "react";

const RRectangleMemo = ({ color }) => {
  return (
    <svg
      width="20"
      height="26"
      viewBox="0 0 20 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="19.7012"
        y="0.389648"
        width="25.1747"
        height="18.9938"
        rx="4"
        transform="rotate(90 19.7012 0.389648)"
        fill={color}
      />
    </svg>
  );
};

export default RRectangleMemo;
