import React, { useState, useEffect, memo } from "react";
import "../styles/makeDesk.css";
import "../index.css";

export default function MakeDesk({ mode, userData, fieldRef, onDoubleClick }) {
  const [desks, setDesks] = useState([]);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [howDrag, setHowDrag] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isClickedDesk, setIsClickedDesk] = useState(-1);
  const [initialBound, setInitialBound] = useState(0);

  // 각 데스크의 위치를 설정 (위, 오른쪽 위, 오른쪽 아래, 아래, 왼쪽 아래, 왼쪽 위 순서)
  const translateBox = [
    { dx: 80, dy: -230 },
    { dx: 520, dy: -130 },
    { dx: 530, dy: 190 },
    { dx: 80, dy: 320 },
    { dx: -400, dy: 190 },
    { dx: -400, dy: -130 },
  ];

  // 주어진 중심 데스크를 기준으로 6개의 데스크 위치를 생성하는 함수
  const createSurroundingDesks = (centerDesk, startId, existingDesks) => {
    return translateBox
      .map((offset, index) => {
        const newX = centerDesk.x + offset.dx; //현재 데스크의 x좌표 + offset값
        const newY = centerDesk.y + offset.dy;

        //이미 그 좌표에 데스크가 존재하는지 확인하는 함수
        const isOverlapping = existingDesks.some(
          (desk) =>
            Math.abs(desk.x - newX) < 200 && Math.abs(desk.y - newY) < 200
          //존재하는 데스크의 x좌표와 y좌표 중 하나라도 새로운 데스크와 200 이하로 차이가 난다면 겹치는 것임
        );

        if (!isOverlapping) {
          return {
            id: startId + index + 1,
            x: newX,
            y: newY,
          };
        }
        return null; //겹치면 null
      })
      .filter((desk) => desk !== null); // null이 아닌 객체들만 반환
  };

  // 드래그 가능한 공간을 제한하는 함수
  const adjustIfOutOfBounds = (desks) => {
    const fieldWidth = window.innerWidth;
    const fieldHeight = window.innerHeight;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    //모든 데스크 중 가장 작거나 큰 x좌표와 y좌표를 구함
    desks.forEach((desk) => {
      if (desk.x < minX) minX = desk.x;
      if (desk.y < minY) minY = desk.y;
      if (desk.x > maxX) maxX = desk.x;
      if (desk.y > maxY) maxY = desk.y;
    });

    //가장 크게 나간 부분을 구함
    const largeX = maxX > fieldWidth ? maxX - fieldWidth : 0;
    const offsetX =
      minX > 0 ? largeX : Math.abs(minX) > largeX ? -minX : largeX;
    const largeY = maxY > fieldHeight ? maxX - fieldHeight : 0;
    const offsetY = minY > 0 ? largeY : -maxY > largeY ? -maxY : largeY;

    return offsetX > offsetY
      ? Math.abs(offsetX) + 500
      : Math.abs(offsetY) + 500;
  };

  useEffect(() => {
    const fieldWidth = window.innerWidth;
    const fieldHeight = window.innerHeight;
    const middleOfWidth = fieldWidth / 2 - 237.5;
    const middleOfHeight = fieldHeight / 2 - 133.5;

    // 초기 중심 데스크 설정
    let allDesks = [{ id: 1, x: middleOfWidth, y: middleOfHeight }];
    let deskQueue = [{ id: 1, x: middleOfWidth, y: middleOfHeight }];

    // 나머지 데스크들 위치 설정
    let currentId = 1;
    while (allDesks.length < userData.length && deskQueue.length > 0) {
      const currentCenterDesk = deskQueue.shift();
      const newDesks = createSurroundingDesks(
        currentCenterDesk,
        currentId,
        allDesks
      );
      allDesks = [...allDesks, ...newDesks];
      deskQueue = [...deskQueue, ...newDesks];
      currentId += 6;
    }

    // 설정된 위치를 데스크 배열에 맞게 조정
    let adjustedDesks = allDesks
      .slice(0, userData.length)
      .map((desk, index) => ({
        id: index,
        ...userData[index],
        x: desk.x,
        y: desk.y,
      }));

    setDesks(adjustedDesks);
    const initialBoundValue = adjustIfOutOfBounds(desks);
    setInitialBound(initialBoundValue);
  }, [userData]);

  //마우스 드래그
  const handleMouseDown = (e) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      //데스크가 없는 화면에서는 드래그 막기
      if (
        Math.abs(howDrag.x + deltaX) < initialBound &&
        Math.abs(howDrag.y + deltaY) < initialBound
      ) {
        setHowDrag({ x: howDrag.x + deltaX, y: howDrag.y + deltaY });
        setDesks((prevDesks) =>
          prevDesks.map((desk) => ({
            ...desk,
            x: desk.x + deltaX,
            y: desk.y + deltaY,
          }))
        );
      }
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  //마우스를 떼면 드래그 끝
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const isOutsideViewport = (desk) => {
    const fieldWidth = window.innerWidth;
    const fieldHeight = window.innerHeight;

    return (
      desk.x - 108 < -150 ||
      desk.x + 108 > fieldWidth - 10 ||
      desk.y - 80 < -80 ||
      desk.y > fieldHeight - 200
    );
  };

  return (
    <div
      ref={fieldRef}
      className="field"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {desks &&
        desks.map((box) => (
          <>
            {mode ? (
              <svg
                key={box.id}
                width="419"
                height="285"
                viewBox="0 0 419 285"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={box.id === 0 ? "main-box" : "box"}
                onDoubleClick={() => onDoubleClick(box.id, mode)} // 더블클릭 이벤트 추가
                id={box.id === 0 ? "my-Box" : ""}
                onClick={() => {
                  if (isClickedDesk === box.id) {
                    setIsClickedDesk(-1);
                  } else {
                    setIsClickedDesk(box.id);
                  }
                }}
                style={{
                  position: "absolute",

                  left: `${box.x}px`,
                  top: `${box.y}px`,

                  transform:
                    isClickedDesk === box.id ? "scale(1.2)" : "scale(1)",
                  cursor: "pointer",
                  filter:
                    isClickedDesk === box.id
                      ? "drop-shadow(0px 0px 4px #000D81) drop-shadow(0px 0px 40px #FFFFFF)"
                      : "none",
                }}
              >
                <g opacity="0.8" filter="url(#filter0_d_141_1315)">
                  <path
                    d="M60.2789 136.927H43.4864C41.5631 136.927 40.0039 138.475 40.0039 140.384V241.543C40.0039 243.452 41.5631 245 43.4864 245H60.2789C62.2022 245 63.7613 243.452 63.7613 241.543V140.384C63.7613 138.475 62.2022 136.927 60.2789 136.927Z"
                    fill="#D3DEFD"
                  />
                  <path
                    d="M107.794 136.927H91.0011C89.0778 136.927 87.5187 138.475 87.5187 140.384V241.543C87.5187 243.452 89.0778 245 91.0011 245H107.794C109.717 245 111.276 243.452 111.276 241.543V140.384C111.276 138.475 109.717 136.927 107.794 136.927Z"
                    fill="#6A73A8"
                  />
                  <path
                    d="M84.0363 136.927H67.2438C65.3205 136.927 63.7614 138.475 63.7614 140.384V241.543C63.7614 243.452 65.3205 245 67.2438 245H84.0363C85.9596 245 87.5188 243.452 87.5188 241.543V140.384C87.5188 138.475 85.9596 136.927 84.0363 136.927Z"
                    fill="#586193"
                  />
                  <path
                    d="M131.551 136.927H114.759C112.835 136.927 111.276 138.475 111.276 140.384V241.543C111.276 243.452 112.835 245 114.759 245H131.551C133.474 245 135.034 243.452 135.034 241.543V140.384C135.034 138.475 133.474 136.927 131.551 136.927Z"
                    fill="#404789"
                  />
                  <path
                    d="M79.8333 50C79.8333 44.4772 84.3104 40 89.8333 40H330.184C335.707 40 340.184 44.4772 340.184 50V173.296H79.8333V50Z"
                    fill="#6F7FB5"
                  />
                  <path
                    d="M85.8517 56.4642C85.8517 50.9414 90.3288 46.4642 95.8517 46.4642H324.165C329.688 46.4642 334.165 50.9414 334.165 56.4642V156.832C334.165 162.355 329.688 166.832 324.165 166.832H95.8517C90.3288 166.832 85.8517 162.355 85.8517 156.832V56.4642Z"
                    fill="url(#paint0_linear_141_1315)"
                  />
                  <path
                    d="M340.184 184.056C340.184 195.102 331.23 204.056 320.184 204.056L99.8334 204.056C88.7877 204.056 79.8334 195.102 79.8334 184.056L79.8334 173.296L340.184 173.296L340.184 184.056Z"
                    fill="#CEDAFE"
                  />
                  <rect
                    x="185.947"
                    y="204.056"
                    width="48.1229"
                    height="31.1292"
                    fill="url(#paint1_linear_141_1315)"
                  />
                  <rect
                    x="172.399"
                    y="235.186"
                    width="75.2192"
                    height="9.6452"
                    rx="4.8226"
                    fill="url(#paint2_linear_141_1315)"
                  />
                  <rect
                    x="278.974"
                    y="192.975"
                    width="99.7231"
                    height="51.8556"
                    rx="20"
                    fill="url(#paint3_linear_141_1315)"
                  />
                  <rect
                    x="281.01"
                    y="194.692"
                    width="95.6506"
                    height="36.3077"
                    rx="18.1538"
                    fill="black"
                  />
                  <path
                    d="M329.865 206.344H329.858L328.835 205.105L327.813 206.344H327.805V207.777H327.813L328.835 209.016L329.858 207.777H329.865V206.344Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M329.865 217.528L329.858 217.52L328.835 216.281L327.813 217.52L327.805 217.528V218.953H327.813L328.835 220.2L329.858 218.953H329.865V217.528Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M301.2 204.23L300.325 203.354L299.45 204.23V204.237V211.75L300.325 212.618L301.193 211.75H301.2V204.237V204.23Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M310.812 204.23L309.945 203.354L309.069 204.23V204.237V211.75H309.077L309.937 212.618L310.812 211.75H310.82V204.237V204.23H310.812Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M308.915 203.974L309.79 203.099L308.915 202.224H308.907H301.394L300.519 203.099L301.394 203.966V203.974H308.907H308.915Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M309.039 223.128L309.852 222.315L309.039 221.501V221.494H309.031H302.014V221.501L301.201 222.307L302.014 223.12V223.128H309.031H309.039Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M301.2 213.981L300.325 213.106L299.45 213.981V221.501L300.325 222.369L301.193 221.501H301.2V213.981Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M310.812 214.26L310.007 213.446L309.186 214.26V214.267V221.284H309.194L309.999 222.098L310.812 221.284H310.82V214.267V214.26H310.812Z"
                    fill="#DCDFFF"
                  />
                  <path
                    opacity="0.4"
                    d="M308.915 213.718L309.79 212.85L308.915 211.975H308.907H301.394V211.983L300.519 212.842L301.394 213.718V213.725H308.907H308.915V213.718Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M314.514 204.23L313.647 203.354L312.772 204.23V204.237V211.75H312.779L313.639 212.618L314.514 211.75H314.522V204.237V204.23H314.514Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M324.134 204.23L323.266 203.354L322.391 204.23V204.237V211.75H322.399L323.259 212.618L324.134 211.75H324.142V204.237V204.23H324.134Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M322.229 203.974L323.104 203.099L322.229 202.224H314.716L313.841 203.099L314.716 203.966V203.974H322.229Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M322.229 223.469L323.104 222.601L322.229 221.726V221.718H314.716V221.726L313.841 222.593L314.716 223.461V223.469H322.229Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M314.514 213.981L313.647 213.106L312.772 213.981V221.501H312.779L313.639 222.369L314.514 221.501H314.522V213.981H314.514Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M324.134 213.981L323.266 213.106L322.391 213.981V221.501H322.399L323.259 222.369L324.134 221.501H324.142V213.981H324.134Z"
                    fill="#DCDFFF"
                  />
                  <path
                    opacity="0.4"
                    d="M322.229 213.718L323.104 212.85L322.229 211.975H314.716V211.983L313.841 212.842L314.716 213.718V213.725H322.229V213.718Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M335.279 204.23L334.412 203.354L333.536 204.23H333.529V204.237V211.75H333.536L334.404 212.618L335.271 211.75H335.279V204.237V204.23Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M344.898 204.23L344.023 203.354L343.156 204.23H343.148V204.237V211.75H343.156L344.023 212.618L344.891 211.75H344.898V204.237V204.23Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M342.993 203.974L343.868 203.099L342.993 202.224H342.985H335.473L334.605 203.099L335.473 203.966V203.974H342.993Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M342.993 223.469L343.868 222.601L342.993 221.726V221.718H342.985H335.473V221.726L334.605 222.593L335.473 223.461V223.469H342.993Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M335.279 213.981L334.412 213.106L333.536 213.981H333.529V221.501H333.536L334.404 222.369L335.271 221.501H335.279V213.981Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M344.898 213.981L344.023 213.106L343.156 213.981H343.148V221.501H343.156L344.023 222.369L344.891 221.501H344.898V213.981Z"
                    fill="#DCDFFF"
                  />
                  <path
                    opacity="0.4"
                    d="M342.993 213.718L343.868 212.85L342.993 211.975H342.985H335.473V211.983L334.605 212.842L335.473 213.718V213.725H342.993V213.718Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M348.601 204.23L347.725 203.354L346.858 204.23H346.85V204.237V211.75H346.858L347.725 212.618L348.593 211.75H348.601V204.237V204.23Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M358.213 204.23L357.345 203.354L356.47 204.23V204.237V211.75H356.478L357.345 212.618L358.213 211.75H358.22V204.237V204.23H358.213Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M356.315 203.974L357.19 203.099L356.315 202.224H356.307H348.794L347.927 203.099L348.794 203.966V203.974H356.307H356.315Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M356.315 223.469L357.19 222.601L356.315 221.726V221.718H356.307H348.794V221.726L347.927 222.593L348.794 223.461V223.469H356.307H356.315Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M348.601 213.981L347.725 213.106L346.858 213.981H346.85V221.501H346.858L347.725 222.369L348.593 221.501H348.601V213.981Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M358.213 213.981L357.345 213.106L356.47 213.981V221.501H356.478L357.345 222.369L358.213 221.501H358.22V213.981H358.213Z"
                    fill="#DCDFFF"
                  />
                  <path
                    opacity="0.4"
                    d="M356.315 213.718L357.19 212.85L356.315 211.975H356.307H348.794V211.983L347.927 212.842L348.794 213.718V213.725H356.307H356.315V213.718Z"
                    fill="#DCDFFF"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_141_1315"
                    x="0.00390625"
                    y="0"
                    width="418.693"
                    height="285"
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
                    <feOffset />
                    <feGaussianBlur stdDeviation="20" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0.0354123 0 0 0 0 0.354123 0 0 0 0.3 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_141_1315"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_141_1315"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_141_1315"
                    x1="95.6067"
                    y1="49.2191"
                    x2="312.18"
                    y2="166.832"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#616182" />
                    <stop offset="1" stopColor="#2E2E36" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_141_1315"
                    x1="210.008"
                    y1="204.056"
                    x2="210.008"
                    y2="235.186"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#8C9DD5" />
                    <stop offset="1" stopColor="#BAC6F8" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_141_1315"
                    x1="210.009"
                    y1="235.186"
                    x2="210.009"
                    y2="244.831"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#8C9DD5" />
                    <stop offset="1" stopColor="#BAC6F8" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_141_1315"
                    x1="281.892"
                    y1="218.903"
                    x2="374.681"
                    y2="218.903"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#B6C2F5" />
                    <stop offset="1" stopColor="#8D9DD6" />
                  </linearGradient>
                </defs>
              </svg>
            ) : (
              <svg
                key={box.id}
                width="522"
                height="347"
                viewBox="0 0 522 347"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={box.id === 0 ? "main-box" : "box"}
                onDoubleClick={() => onDoubleClick(box.id, mode)} // 더블클릭 이벤트 추가
                id={box.id === 0 ? "my-Box" : ""}
                onClick={() => {
                  if (isClickedDesk === box.id) {
                    setIsClickedDesk(-1);
                  } else {
                    setIsClickedDesk(box.id);
                  }
                }}
                style={{
                  position: "absolute",

                  left: `${box.x}px`,
                  top: `${box.y}px`,
                  // opacity: isOutsideViewport(box) ? 0.3 : 1,
                  transform:
                    isClickedDesk === box.id ? "scale(1.2)" : "scale(1)",
                  cursor: "pointer",
                  filter:
                    isClickedDesk === box.id
                      ? "drop-shadow(0px 0px 4px #000D81) drop-shadow(0px 0px 40px #FFFFFF)"
                      : "none",
                }}
              >
                <g filter="url(#filter0_d_2054_193)">
                  <path
                    d="M66.6466 166.357H44.7934C42.2905 166.357 40.2615 168.372 40.2615 170.857V302.501C40.2615 304.985 42.2905 307 44.7934 307H66.6466C69.1495 307 71.1785 304.985 71.1785 302.501V170.857C71.1785 168.372 69.1495 166.357 66.6466 166.357Z"
                    fill="#C9C4F7"
                  />
                  <path
                    d="M128.481 166.357H106.628C104.125 166.357 102.096 168.372 102.096 170.857V302.501C102.096 304.985 104.125 307 106.628 307H128.481C130.984 307 133.013 304.985 133.013 302.501V170.857C133.013 168.372 130.984 166.357 128.481 166.357Z"
                    fill="#726AA8"
                  />
                  <path
                    d="M97.5636 166.357H75.7104C73.2075 166.357 71.1785 168.372 71.1785 170.857V302.501C71.1785 304.985 73.2075 307 75.7104 307H97.5636C100.067 307 102.096 304.985 102.096 302.501V170.857C102.096 168.372 100.067 166.357 97.5636 166.357Z"
                    fill="#5B5893"
                  />
                  <path
                    d="M159.398 166.357H137.545C135.042 166.357 133.013 168.372 133.013 170.857V302.501C133.013 304.985 135.042 307 137.545 307H159.398C161.901 307 163.93 304.985 163.93 302.501V170.857C163.93 168.372 161.901 166.357 159.398 166.357Z"
                    fill="#4A4089"
                  />
                  <path
                    d="M92.094 50.2202C92.094 44.6974 96.5711 40.2202 102.094 40.2202H420.905C426.428 40.2202 430.905 44.6974 430.905 50.2202V213.687H92.094V50.2202Z"
                    fill="#796FB5"
                  />
                  <path
                    d="M99.9263 58.6323C99.9263 53.1095 104.403 48.6323 109.926 48.6323H413.073C418.596 48.6323 423.073 53.1095 423.073 58.6323V195.274C423.073 200.797 418.596 205.274 413.073 205.274H109.926C104.403 205.274 99.9263 200.797 99.9263 195.274V58.6323Z"
                    fill="url(#paint0_linear_2054_193)"
                  />
                  <path
                    d="M430.905 233.717C430.905 244.763 421.95 253.717 410.905 253.717L112.094 253.717C101.048 253.717 92.094 244.763 92.094 233.717L92.094 213.687L430.905 213.687L430.905 233.717Z"
                    fill="#D2CEFE"
                  />
                  <rect
                    x="230.187"
                    y="253.717"
                    width="62.6255"
                    height="40.5104"
                    fill="url(#paint1_linear_2054_193)"
                  />
                  <rect
                    x="212.556"
                    y="294.228"
                    width="97.8876"
                    height="12.5519"
                    rx="5"
                    fill="#ABA0E5"
                  />
                  <rect
                    x="351.248"
                    y="239.296"
                    width="129.776"
                    height="67.4831"
                    rx="25"
                    fill="url(#paint2_linear_2054_193)"
                  />
                  <rect
                    x="353.898"
                    y="241.531"
                    width="124.476"
                    height="47.2495"
                    rx="23.6248"
                    fill="black"
                  />
                  <path
                    d="M417.477 256.694H417.467L416.136 255.082L414.806 256.694H414.796V258.559H414.806L416.136 260.172L417.467 258.559H417.477V256.694Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M417.477 271.249L417.467 271.239L416.136 269.626L414.806 271.239L414.796 271.249V273.103H414.806L416.136 274.726L417.467 273.103H417.477V271.249Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M380.173 253.943L379.034 252.804L377.896 253.943V253.953V263.73L379.034 264.858L380.163 263.73H380.173V253.953V253.943Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M392.682 253.943L391.553 252.804L390.414 253.943V253.953V263.73H390.424L391.543 264.858L392.682 263.73H392.692V253.953V253.943H392.682Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M390.212 253.61L391.351 252.471L390.212 251.332H390.202H380.425L379.286 252.471L380.425 253.6V253.61H390.202H390.212Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M390.374 278.536L391.432 277.478L390.374 276.419V276.409H390.364H381.232V276.419L380.174 277.467L381.232 278.526V278.536H390.364H390.374Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M380.173 266.633L379.034 265.494L377.896 266.633V276.42L379.034 277.548L380.163 276.42H380.173V266.633Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M392.682 266.995L391.634 265.937L390.565 266.995V267.005V276.137H390.575L391.624 277.196L392.682 276.137H392.692V267.005V266.995H392.682Z"
                    fill="#DCDFFF"
                  />
                  <path
                    opacity="0.4"
                    d="M390.212 266.29L391.351 265.161L390.212 264.022H390.202H380.425V264.032L379.286 265.151L380.425 266.29V266.3H390.202H390.212V266.29Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M397.5 253.943L396.371 252.804L395.232 253.943V253.953V263.73H395.242L396.361 264.858L397.5 263.73H397.51V253.953V253.943H397.5Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M410.018 253.943L408.889 252.804L407.75 253.943V253.953V263.73H407.761L408.879 264.858L410.018 263.73H410.028V253.953V253.943H410.018Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M407.539 253.61L408.678 252.471L407.539 251.332H397.762L396.623 252.471L397.762 253.6V253.61H407.539Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M407.539 278.98L408.678 277.851L407.539 276.712V276.702H397.762V276.712L396.623 277.841L397.762 278.969V278.98H407.539Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M397.5 266.633L396.371 265.494L395.232 266.633V276.42H395.242L396.361 277.548L397.5 276.42H397.51V266.633H397.5Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M410.018 266.633L408.889 265.494L407.75 266.633V276.42H407.761L408.879 277.548L410.018 276.42H410.028V266.633H410.018Z"
                    fill="#DCDFFF"
                  />
                  <path
                    opacity="0.4"
                    d="M407.539 266.29L408.678 265.161L407.539 264.022H397.762V264.032L396.623 265.151L397.762 266.29V266.3H407.539V266.29Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M424.522 253.943L423.393 252.804L422.254 253.943H422.244V253.953V263.73H422.254L423.383 264.858L424.512 263.73H424.522V253.953V253.943Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M437.04 253.943L435.901 252.804L434.773 253.943H434.762V253.953V263.73H434.773L435.901 264.858L437.03 263.73H437.04V253.953V253.943Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M434.561 253.61L435.7 252.471L434.561 251.332H434.551H424.774L423.645 252.471L424.774 253.6V253.61H434.561Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M434.561 278.98L435.7 277.851L434.561 276.712V276.702H434.551H424.774V276.712L423.645 277.841L424.774 278.969V278.98H434.561Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M424.522 266.633L423.393 265.494L422.254 266.633H422.244V276.42H422.254L423.383 277.548L424.512 276.42H424.522V266.633Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M437.04 266.633L435.901 265.494L434.773 266.633H434.762V276.42H434.773L435.901 277.548L437.03 276.42H437.04V266.633Z"
                    fill="#DCDFFF"
                  />
                  <path
                    opacity="0.4"
                    d="M434.561 266.29L435.7 265.161L434.561 264.022H434.551H424.774V264.032L423.645 265.151L424.774 266.29V266.3H434.561V266.29Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M441.858 253.943L440.72 252.804L439.591 253.943H439.581V253.953V263.73H439.591L440.72 264.858L441.848 263.73H441.858V253.953V253.943Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M454.367 253.943L453.238 252.804L452.099 253.943V253.953V263.73H452.109L453.238 264.858L454.367 263.73H454.377V253.953V253.943H454.367Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M451.897 253.61L453.036 252.471L451.897 251.332H451.887H442.111L440.982 252.471L442.111 253.6V253.61H451.887H451.897Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M451.897 278.98L453.036 277.851L451.897 276.712V276.702H451.887H442.111V276.712L440.982 277.841L442.111 278.969V278.98H451.887H451.897Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M441.858 266.633L440.72 265.494L439.591 266.633H439.581V276.42H439.591L440.72 277.548L441.848 276.42H441.858V266.633Z"
                    fill="#DCDFFF"
                  />
                  <path
                    d="M454.367 266.633L453.238 265.494L452.099 266.633V276.42H452.109L453.238 277.548L454.367 276.42H454.377V266.633H454.367Z"
                    fill="#DCDFFF"
                  />
                  <path
                    opacity="0.4"
                    d="M451.897 266.29L453.036 265.161L451.897 264.022H451.887H442.111V264.032L440.982 265.151L442.111 266.29V266.3H451.887H451.897V266.29Z"
                    fill="#DCDFFF"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_2054_193"
                    x="0.261475"
                    y="0.220215"
                    width="520.763"
                    height="346.779"
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
                    <feOffset />
                    <feGaussianBlur stdDeviation="20" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2054_193"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2054_193"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_2054_193"
                    x1="112.621"
                    y1="52.2175"
                    x2="394.462"
                    y2="205.274"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#616182" />
                    <stop offset="1" stop-color="#2E2E36" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_2054_193"
                    x1="261.5"
                    y1="253.717"
                    x2="261.5"
                    y2="294.228"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#9D8CD5" />
                    <stop offset="1" stop-color="#BDBAF8" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_2054_193"
                    x1="355.046"
                    y1="273.038"
                    x2="475.798"
                    y2="273.038"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#C2B6F5" />
                    <stop offset="1" stop-color="#9C8DD6" />
                  </linearGradient>
                </defs>
              </svg>
            )}
            <div
              onDoubleClick={() => onDoubleClick(box.id, mode)}
              className="user-desk-name"
              id={box.id == 0 ? "my-name" : `name_ + ${box.id}`}
              style={{
                opacity: isOutsideViewport(box) ? 0.3 : 0.7,
                left: `${box.x + 120 - box.name.length * 6}px`,
                top: `${box.y + 175}px`,
                cursor: "pointer",
                transform:
                  isClickedDesk === box.id
                    ? "scale(1.2) translateY(10px)"
                    : "scale(1)",
              }}
            >
              <a>{box.name}의 데스크</a>
            </div>
          </>
        ))}
    </div>
  );
}
