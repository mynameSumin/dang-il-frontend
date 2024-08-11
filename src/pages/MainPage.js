import React, { useState, useEffect, useRef } from "react";
import "../styles/mainPage.css";

export default function MainPage() {
  const handleLogin = () => {
    window.location.href =
      "https://www.dangil-artisticsw.site/auth/google/login";
  }; //해당코드는 현재 url을 지정된 url로 바꾸는 기능을 가진다. 이 코드를 실행하면 브라우저가 새로운 URL로 리디렉션됨.

  const [desks, setDesks] = useState([]);
  const fieldRef = useRef(null);

  const fakeData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 })); // 예시 데이터 20개

  //사용자 데이터 fetch해오기
  const fetchUserData = () => {
    fetch(`https://dangil-artisticsw.site/guestmode/mainpage`, {
      method: "GET",
    })
      .then((response) => console.log(response))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  let scrollWidth = Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );

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
    fetchUserData();

    const fieldWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
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
    <div>
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
      <div className="login-container">
        <button onClick={handleLogin}>Login with Google</button>
      </div>
    </div>
  );
}
