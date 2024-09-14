import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Clock from "../components/Clock.js";
import Book from "../components/Book.js";
import PDF from "../components/PDF.js";
import Memo from "../components/Memo.js";
import "../styles/UserPage.css";
import { FiEdit } from "react-icons/fi";

const UserPage = () => {
  const { userId } = useParams(); // URL에서 userId를 받아옴
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 추가
  const dropdownRef = useRef(null); // 드롭다운 메뉴의 참조
  const minUserId = 0; // 최소 사용자 ID 설정
  const maxUserId = 8; // 최대 사용자 ID 설정
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isMemoOpen, setIsMemoOpen] = useState(false); // 메모 창의 상태

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

  const toggleDropdown = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    //화면 바깥 클릭하면 토글 목록 닫힘
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsBookOpen(false);
        setIsPDFOpen(false);
        setIsMemoOpen(false);
      }
    };

    // 전역 클릭 이벤트 등록
    document.addEventListener("click", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // 메모
  const memoclick = () => {
    // 메모 창 토글 함수
    setIsMemoOpen(true);
    setIsDropdownOpen(false); // 메모 창을 열 때 드롭다운 메뉴를 숨김
  };

  //책
  const Bookclick = () => {
    // 메모 창 토글 함수
    setIsBookOpen(true);
    setIsDropdownOpen(false); // 메모 창을 열 때 드롭다운 메뉴를 숨김
  };

  //PDF
  const PDFclick = () => {
    // 메모 창 토글 함수
    setIsPDFOpen(true);
    setIsDropdownOpen(false); // 메모 창을 열 때 드롭다운 메뉴를 숨김
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Page</h1>
      <p>Welcome to the user page for user with ID: {userId}</p>
      <Clock userId={userId} /> {/* userId를 Clock에 전달 */}
      <div>
        <h2>User Details</h2>
        <p>Name: [User Name]</p>
        <p>Email: [User Email]</p>
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
          <span className={"dropdown-button"} onClick={toggleDropdown}>
            <FiEdit />
          </span>
          <div
            className={`dropdown-content ${isDropdownOpen ? "active" : ""}`}
            ref={dropdownRef}
          >
            <button onClick={Bookclick}>책</button>
            <button onClick={PDFclick}>PDF</button>
            <button>스탠드</button>
            <button onClick={memoclick}> 메모</button>
          </div>
          {/* 다음 사용자로 이동하는 버튼, 최대 사용자 ID를 초과하면 비활성화 */}
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
        {isBookOpen && <Book />}
        {isPDFOpen && <PDF />}
        {isMemoOpen && <Memo />}

        {/* 메인 페이지로 이동하는 버튼 */}
        <button onClick={handleGoHome} className="home-button">
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default UserPage;
