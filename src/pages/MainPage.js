import DeskField from "../components/MakeDesk"; // 생성한 DeskField 컴포넌트
import React, { useState, useEffect, useRef } from "react";
import "../styles/mainPage.css";
import "../styles/popup.css";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

export default function MainPage() {
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState("Guest"); // 초기 값은 'Guest'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 추가
  const fieldRef = useRef(null);
  const loginContainerRef = useRef(null);
  const dropdownRef = useRef(null); // 드롭다운 메뉴의 참조

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const shouldShowPopup = localStorage.getItem("showPopup");
    if (shouldShowPopup === "true") {
      setShowPopup(true);
      localStorage.removeItem("showPopup");

      //3초 후 팝업 숨기기
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (showPopup || showModal) {
      fieldRef.current.classList.add("blurred");
      loginContainerRef.current.classList.add("blurred");
    } else {
      fieldRef.current.classList.remove("blurred");
      loginContainerRef.current.classList.remove("blurred");
    }
  }, [showPopup, showModal]);

  useEffect(() => {
    // 화면 어디든 클릭했을 때 호출되는 이벤트 핸들러
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // 전역 클릭 이벤트 등록
    document.addEventListener("click", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogin = () => {
    setShowModal(true);
    setIsDropdownOpen(false); // 모달 열리면 드롭다운은 닫음
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleKakaoLogin = () => {
    window.location.href = "https://dangil-artisticsw.site/auth/kakao/login";
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://dangil-artisticsw.site/auth/google/login";
  };

  const handleLogout = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    fetch("https://www.dangil-artisticsw.site/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          window.location.href = "/login"; // 로그아웃 후 로그인 페이지로 리디렉션
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("An error occurred during logout:", error);
      });
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = (e) => {
    e.stopPropagation(); // 드롭다운 항목 클릭 시 이벤트 전파 방지
  };

  const fakeData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 })); // 예시 데이터 20개

  return (
    <div>
      <DeskField fakeData={fakeData} fieldRef={fieldRef} />
      <div ref={loginContainerRef} className="login-container">
        {userName === "Guest" ? (
          <button onClick={handleLogin} className="login-button-guest">
            <FaUserCircle className="guest-icon" />
            <span className="text-Guest">Guest</span>
            <span className="login-divider">|</span>
            <span className="text-Login">Log in</span>
            <FiMenu className="list-icon" />
          </button>
        ) : (
          <button className="login-button-user">
            <img src="/images/search.png" alt="Search" className="search-img" />
            <FaUserCircle className="user-icon" />
            <span className="user-name">{userName}</span>
            <span className="dropdown-button" onClick={toggleDropdown}>
              ▼
            </span>
            {isDropdownOpen && (
              <div className="dropdown-content" ref={dropdownRef}>
                <a href="/friends" onClick={handleDropdownItemClick}>
                  친구 목록
                </a>
                <a href="/guestbook" onClick={handleDropdownItemClick}>
                  방명록
                </a>
                <a href="/settings" onClick={handleDropdownItemClick}>
                  설정
                </a>
                <button onClick={handleLogout}>로그아웃</button>
              </div>
            )}
            <FiMenu className="list-icon" />
          </button>
        )}
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <img src="/images/send.png" alt="send" className="send-img" />
            <p className="popup_t1">다시 힘내볼까요?</p>
            <p className="popup_t2">나만의 스페이스로</p>
            <p className="popup_t3">이동 중입니다.</p>
            <div className="user-info">
              <div className="user-icon">MK</div>
              <div className="user-name">{userName}</div>
              <div className="user-time">2 days ago</div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              <AiOutlineClose size={20} />
            </button>
            <div className="TotalText">
              <div className="login-text1">
                <h2 className="you">당신이</h2>
                <h2 className="work">일하는 시간</h2>
              </div>

              <div className="login-text2">
                <p className="workspace">나만의 워크 스페이스로</p>
                <p className="invite"> 여러분을 초대합니다.</p>
              </div>
            </div>
            <button className="kakao-login-button" onClick={handleKakaoLogin}>
              <img
                src="/images/kakao.png"
                alt="Kakao"
                className="login-kakao-img"
              />
              카카오로 시작
            </button>
            <button className="google-login-button" onClick={handleGoogleLogin}>
              <img
                src="/images/google.png"
                alt="Google"
                className="login-google-img"
              />
              구글로 시작
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
