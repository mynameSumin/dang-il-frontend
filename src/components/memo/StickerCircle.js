import React, { useState } from "react";
import "../../styles/Memo.css";

const StickerCircle = ({ color, style, text, setShowWindow, showWindow }) => {
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
        onDoubleClick={() => {
          handleDoubleClick();
          setShowWindow(!showWindow);
        }}
        style={showWindow ? expandedStyle : style}
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
            fillOpacity="0.5"
          />
        </g>

        <text
          pointerEvents="none"
          x="46%"
          y="55%"
          dominantBaseline="middle" // 텍스트를 정가운데 정렬
          textAnchor="middle" // 텍스트를 중앙 정렬
          fill="white" // 텍스트 색상 설정
          fontSize={showWindow ? "8" : "21"}
          fontFamily="Roboto"
          fontWeight="800"
        >
          {text ? (
            !showWindow ? (
              <tspan x="46%">{text.slice(0, 3)}</tspan>
            ) : (
              text.match(/.{1,8}/g).map((chunk, index) => (
                <tspan x="46%" dy={`${index === 0 ? -2.3 : 1.2}em`} key={index}>
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

        <defs>
          <filter
            id="filter0_d_2187_268"
            x="0.798828"
            y="0.645508"
            width="88.3516"
            height="100.524"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
      <div className={`info ${isExpanded ? "active" : ""}`}>
        메모지를 더블클릭하면 원래대로 돌아갑니다
      </div>
    </>
  );
};

export default StickerCircle;
