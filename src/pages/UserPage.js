import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Clock from "../components/Clock.js";
import Book from "../components/Book";
import "../styles/userPage.css";
import { FiEdit } from "react-icons/fi";
import stand from "../assets/stand.png";

const UserPage = () => {
  const { userId } = useParams(); // URL에서 userId를 받아옴
  const navigate = useNavigate();
  const minUserId = 0; // 최소 사용자 ID 설정
  const maxUserId = 17; // 최대 사용자 ID 설정
  const [isListVisible, setIsListVisible] = useState(false);
  const panelRef = useRef(null);

  // 이전 사용자로 이동하는 함수
  const handlePrevUser = () => {
    const prevId = parseInt(userId) - 1;
    if (prevId >= minUserId) {
      navigate(`/user/${prevId}`);
    }
  };

  // 다음 사용자로 이동하는 함수
  const handleNextUser = () => {
    const nextId = parseInt(userId) + 1;
    if (nextId <= maxUserId) {
      navigate(`/user/${nextId}`);
    }
  };

  // 메인 페이지로 이동하는 함수
  const handleGoHome = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  const LeftSettingtoggle = (e) => {
    e.stopPropagation(); // 패널을 클릭할 때 이벤트 전파 방지
    setIsListVisible(!isListVisible);
  };

  useEffect(() => {
    //화면 바깥 클릭하면 토글 목록 닫힘
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsListVisible(false); // 패널 외부 클릭 시 패널 숨김
      }
    };

    // 전역 클릭 이벤트 등록
    document.addEventListener("click", handleClickOutside);

    //컴포넌트 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="background">
      <img src={stand} id="stand" />
      {/* <div style={{ padding: "20px" }}>
      <h1>User Page</h1>
      <p>Welcome to the user page for user with ID: {userId}</p>
      <Clock userId={userId} /> {/* userId를 Clock에 전달 */}
      <div>
        <h2>User Details</h2>
        <p>Name: [User Name]</p>
        <p>Email: [User Email]</p>
        <Book />
        <div className="settings">
          {/* 이전 사용자로 이동하는 버튼, 첫 번째 사용자일 경우 비활성화 */}
          <button
            onClick={handlePrevUser}
            disabled={parseInt(userId) === minUserId}
            className={`control-button ${
              parseInt(userId) === minUserId ? "invisible" : ""
            }`}
          >
            <span className="icon">＜</span>
          </button>
          {/* 중간 기능 버튼 */}
          <button className="control-button">
            <span className="icon">M</span>
          </button>

          <div
            ref={panelRef}
            className={`list-panel ${isListVisible ? "visible" : ""}`}
          >
            <button>메모</button>
            <button>스탠드</button>
            <button>책</button>
          </div>
          <FiEdit onClick={LeftSettingtoggle} style={{ cursor: "pointer" }} />

          <button
            onClick={handleNextUser}
            disabled={parseInt(userId) === maxUserId}
            className={`control-button ${
              parseInt(userId) === maxUserId ? "invisible" : ""
            }`}
          >
            <span className="icon">＞</span>
          </button>
        </div>
        {/* 메인 페이지로 이동하는 버튼 */}
        <button
          onClick={handleGoHome}
          className="home-button"
          style={{ marginTop: "30px" }}
        >
          Go to Home
        </button>
      </div>{" "}
    </div>
  );
};

export default UserPage;
