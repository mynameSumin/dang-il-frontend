import React from "react";
import "../../styles/Memo.css";

const StickerStar = ({ color, style }) => {
  return (
    <svg
      style={style}
      className="sticker sticker-star"
      width="97"
      height="92"
      viewBox="0 0 97 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2187_239)">
        <path
          d="M44.8979 1.94551C45.6936 1.05002 47.0926 1.05002 47.8882 1.94551L64.3627 20.4881C64.5548 20.7043 64.7915 20.8763 65.0565 20.9922L87.7824 30.9304C88.88 31.4103 89.3123 32.7409 88.7065 33.7743L76.1623 55.1725C76.0161 55.422 75.9257 55.7002 75.8973 55.9881L73.4682 80.6728C73.3509 81.8649 72.2191 82.6872 71.0491 82.4304L46.8219 77.1126C46.5394 77.0506 46.2468 77.0506 45.9643 77.1126L21.7371 82.4304C20.567 82.6872 19.4352 81.8649 19.3179 80.6728L16.8888 55.9881C16.8605 55.7002 16.7701 55.422 16.6238 55.1725L4.07964 33.7743C3.47383 32.7409 3.90615 31.4103 5.00368 30.9304L27.7296 20.9922C27.9946 20.8763 28.2313 20.7043 28.4234 20.4881L44.8979 1.94551Z"
          fill={color}
        />
        <rect
          x="69.3936"
          y="3.86719"
          width="16.3809"
          height="25.4493"
          transform="rotate(34.4442 69.3936 3.86719)"
          fill="white"
          fill-opacity="0.5"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2187_239"
          x="3.80469"
          y="1.27344"
          width="93.1768"
          height="89.2041"
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
            result="effect1_dropShadow_2187_239"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2187_239"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default StickerStar;
