import React from "react";
import "../../styles/Memo.css";
import { useState } from "react";

const StickerSquare = ({ color, style, text, setShowWindow, showWindow }) => {
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
        className="sticker sticker-square"
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
            fillOpacity="0.5"
          />
        </g>
        <text
          x="46%" // x축 중앙에 텍스트 배치
          y="55%" // y축에서 적절한 위치에 텍스트 배치
          dominantBaseline="middle" // 텍스트를 정가운데 정렬
          textAnchor="middle" // 텍스트를 중앙 정렬
          fill="white" // 텍스트 색상 설정
          fontSize={showWindow ? "10" : "21"} // 텍스트 크기 설정
          fontFamily="Roboto"
          fontWeight="800"
        >
          {text ? (
            !showWindow ? (
              <tspan x="46%" textLength="70">
                {text.slice(0, 5)}
              </tspan>
            ) : (
              text.match(/.{1,9}/g).map((chunk, index) => (
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
        <defs>
          <filter
            id="filter0_d_2187_267"
            x="0.707031"
            y="0.46582"
            width="88.3516"
            height="99.7041"
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
      <div className={`info ${isExpanded ? "active" : ""}`}>
        메모지를 더블클릭하면 원래대로 돌아갑니다
      </div>
    </>
  );
};

export default StickerSquare;
