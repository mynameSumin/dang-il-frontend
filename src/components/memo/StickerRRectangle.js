import React from "react";
import "../../styles/Memo.css";

const StickerRRectangle = ({ color, style }) => {
  return (
    <svg
      style={style}
      className="sticker sticker-R_rectangle"
      width="80"
      height="98"
      viewBox="0 0 80 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2366_311)">
        <rect
          x="0.1875"
          y="12.3496"
          width="70.9627"
          height="77.0477"
          rx="3"
          fill={color}
        />
      </g>
      <rect
        x="48.2656"
        y="2.85156"
        width="13.9681"
        height="21.7008"
        transform="rotate(-9.83628 48.2656 2.85156)"
        fill="white"
        fill-opacity="0.5"
      />
      <rect
        x="3.55859"
        y="2.85059"
        width="13.9681"
        height="21.7008"
        transform="rotate(-9.83628 3.55859 2.85059)"
        fill="white"
        fill-opacity="0.5"
      />
      <defs>
        <filter
          id="filter0_d_2366_311"
          x="0.1875"
          y="12.3496"
          width="78.9629"
          height="85.0479"
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
            result="effect1_dropShadow_2366_311"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2366_311"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default StickerRRectangle;
