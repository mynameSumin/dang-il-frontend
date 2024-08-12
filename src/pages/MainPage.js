import React, { useState } from "react";
import DeskField from "../components/MakeDesk"; // 생성한 DeskField 컴포넌트
import "../styles/mainPage.css";

export default function MainPage() {
  const handleLogin = () => {
    window.location.href =
      "https://www.dangil-artisticsw.site/auth/google/login";
  }; //해당 코드는 현재 URL을 지정된 URL로 바꾸는 기능을 가진다. 이 코드를 실행하면 브라우저가 새로운 URL로 리디렉션됨.

  const fakeData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 })); // 예시 데이터 20개

  return (
    <div>
      <DeskField fakeData={fakeData} /> {/* DeskField 컴포넌트를 사용합니다. */}
      <div className="login-container">
        <button onClick={handleLogin}>Login with Google</button>
      </div>
    </div>
  );
}
