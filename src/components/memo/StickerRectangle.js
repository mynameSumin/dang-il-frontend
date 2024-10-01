import React from "react";
import "../../styles/Memo.css";

const StickerRectangle = ({ color, style }) => {
  return (
    <svg
      style={style}
      className="sticker sticker-rectangle"
      width="90"
      height="101"
      viewBox="0 0 90 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2187_267)">
        <path
          d="M0.707031 15.8184C0.707031 13.6092 2.49789 11.8184 4.70703 11.8184H77.0589C79.268 11.8184 81.0589 13.6092 81.0589 15.8184V88.1702C81.0589 90.3793 79.268 92.1702 77.0589 92.1702H4.70703C2.49789 92.1702 0.707031 90.3793 0.707031 88.1702V15.8184Z"
          fill={color}
        />
        <rect
          x="32.2393"
          y="2.85156"
          width="13.9681"
          height="21.7008"
          transform="rotate(-9.83628 32.2393 2.85156)"
          fill="white"
          fill-opacity="0.5"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2187_267"
          x="0.707031"
          y="0.46582"
          width="88.3516"
          height="99.7041"
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
            result="effect1_dropShadow_2187_267"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2187_267"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default StickerRectangle;
