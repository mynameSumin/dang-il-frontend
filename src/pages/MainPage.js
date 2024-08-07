import React, { useState, useEffect, useRef } from "react";
import "../styles/mainPage.css";

export default function MainPage() {
  const [desks, setDesks] = useState([]);
  const fakeData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 })); // 예시 데이터 20개
  const fieldRef = useRef(null);

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
        const newX = centerDesk.x + offset.dx;
        const newY = centerDesk.y + offset.dy;
        const isOverlapping = existingDesks.some(
          (desk) =>
            Math.abs(desk.x - newX) < 200 && Math.abs(desk.y - newY) < 200
        );

        if (!isOverlapping) {
          return {
            id: startId + index + 1,
            x: newX,
            y: newY,
          };
        }
        return null;
      })
      .filter((desk) => desk !== null); // null이 아닌 객체들만 반환
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
      currentId += 6;
    }

    // 설정된 위치를 데스크 배열에 맞게 조정
    const adjustedDesks = allDesks
      .slice(0, fakeData.length)
      .map((desk, index) => ({
        ...fakeData[index],
        x: desk.x,
        y: desk.y,
      }));

    setDesks(adjustedDesks);
  }, []);

  return (
    <div ref={fieldRef} className="field">
      {desks.map((box) => (
        <div
          id={box.id}
          key={box.id}
          className={box.id === 1 ? "main-box" : "box"}
          style={{ left: box.x, top: box.y, position: "absolute" }}
        />
      ))}
    </div>
  );
}
