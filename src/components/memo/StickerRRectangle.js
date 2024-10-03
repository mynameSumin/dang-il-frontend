import React from "react";
import "../../styles/Memo.css";
import { useState } from "react";

const StickerRRectangle = ({
  color,
  style,
  text,
  setShowWindow,
  showWindow,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDoubleClick = () => {
    setIsExpanded(!isExpanded); // 더블클릭 시 확대/축소 상태 전환
  };

  const expandedStyle = isExpanded
    ? {
        position: "fixed", // 화면 중앙에 배치
        top: "50%",
        left: "50%",
        opacity: "1",
        transform: "translate(-50%, -50%)", // 중앙 정렬
        width: "400px", // 크게 확대된 크기
        height: "400px",
        zIndex: 9999, // 다른 요소들 위에 오도록 설정
      }
    : style; // 기본 스타일 유지

  return (
    <>
      <svg
        style={expandedStyle}
        onDoubleClick={() => {
          handleDoubleClick();
          setShowWindow(!showWindow);
        }}
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
        <text
          x="46%" // x축 중앙에 텍스트 배치
          y="55%" // y축에서 적절한 위치에 텍스트 배치
          dominantBaseline="middle" // 텍스트를 정가운데 정렬
          textAnchor="middle" // 텍스트를 중앙 정렬
          fill="white" // 텍스트 색상 설정
          fontSize={showWindow ? "9" : "21"}
          fontFamily="Roboto"
          fontWeight="800"
        >
          {text ? (
            !showWindow ? (
              <tspan x="46%">{text.slice(0, 4)}</tspan>
            ) : (
              text.match(/.{1,8}/g).map((chunk, index) => (
                <tspan x="46%" dy={`${index === 0 ? -1.8 : 1.2}em`} key={index}>
                  {chunk}
                </tspan>
              ))
            )
          ) : (
            ""
          )}
          {text && text.length > 3 && !showWindow && (
            <tspan x="46%" dy="1.2em">
              {"\n..."}
            </tspan>
          )}
        </text>
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
      <div className={`info ${isExpanded ? "active" : ""}`}>
        메모지를 더블클릭하면 원래대로 돌아갑니다
      </div>
    </>
  );
};

export default StickerRRectangle;
