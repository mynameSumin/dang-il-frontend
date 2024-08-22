import React, { useState, useEffect } from "react";
import "../styles/makeDesk.css";

export default function MakeDesk({ fakeData, fieldRef }) {
  const [desks, setDesks] = useState([]);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isClickedDesk, setIsClickedDesk] = useState(0);

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

  // 화면 밖으로 나가는지를 체크하고 필요한 만큼 이동하는 함수
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
    const offsetX =
      minX < 0 ? -minX : maxX > fieldWidth ? fieldWidth - maxX : 0;
    const offsetY =
      minY < 0 ? -minY : maxY > fieldHeight ? fieldHeight - maxY : 0;

    if (offsetX !== 0 || offsetY !== 0) {
      return desks.map((desk) => ({
        ...desk,
        x: desk.x + offsetX,
        y: desk.y + offsetY,
      }));
    }
    return desks;
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
    while (allDesks.length < fakeData.length && deskQueue.length > 0) {
      const currentCenterDesk = deskQueue.shift();
      const newDesks = createSurroundingDesks(
        currentCenterDesk,
        currentId,
        allDesks
      );
      allDesks = [...allDesks, ...newDesks];
      deskQueue = [...deskQueue, ...newDesks];
      currentId += 6; // 1부터 6 사이의 숫자를 생성
    }

    // 설정된 위치를 데스크 배열에 맞게 조정
    let adjustedDesks = allDesks
      .slice(0, fakeData.length)
      .map((desk, index) => ({
        ...fakeData[index],
        x: desk.x,
        y: desk.y,
      }));

    // 화면 밖으로 나간 경우 전체 데스크를 이동시킴
    adjustedDesks = adjustIfOutOfBounds(adjustedDesks);

    setDesks(adjustedDesks);
  }, [fakeData]);

  //마우스 드래그
  const handleMouseDown = (e) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      setDesks((prevDesks) =>
        prevDesks.map((desk) => ({
          ...desk,
          x: desk.x + deltaX,
          y: desk.y + deltaY,
        }))
      );

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  //마우스를 떼면 드래그 끝
  const handleMouseUp = () => {
    setIsDragging(false);
    // 드래그가 끝난 후 부드럽게 이동하는 모션 추가
  };

  const isOutsideViewport = (desk) => {
    const fieldWidth = window.innerWidth;
    const fieldHeight = window.innerHeight;

    return (
      desk.x < -150 ||
      desk.x > fieldWidth - 10 ||
      desk.y < -80 ||
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
      {desks.map((box) => (
        <svg
          key={box.id}
          width="419"
          height="285"
          viewBox="0 0 419 285"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={box.id === 1 ? "main-box" : "box"}
          onClick={() => {
            setIsClickedDesk(box.id);
          }}
          style={{
            position: "absolute",
            left: `${box.x}px`,
            top: `${box.y}px`,
            opacity: isOutsideViewport(box) ? 0.3 : 1,
            transform: isClickedDesk === box.id ? "scale(1.2)" : "scale(1)",
            cursor: "pointer",
            filter:
              isClickedDesk === box.id
                ? "drop-shadow(0px 0px 10px rgba(0, 136, 210, 1))"
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
      ))}
    </div>
  );
}
