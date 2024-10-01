import React from "react";
import "../../styles/Memo.css";

const StickerCircle = ({ color, style }) => {
  return (
    <svg
      style={style}
      className="sticker sticker-circle"
      width="90"
      height="102"
      viewBox="0 0 90 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2187_268)">
        <circle cx="40.9747" cy="52.9943" r="40.1759" fill={color} />
        <rect
          x="32.7842"
          y="0.645508"
          width="16.3809"
          height="25.4493"
          fill="white"
          fill-opacity="0.5"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2187_268"
          x="0.798828"
          y="0.645508"
          width="88.3516"
          height="100.524"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2187_268"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2187_268"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default StickerCircle;
