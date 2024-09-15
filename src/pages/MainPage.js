import DeskField from "../components/MakeDesk";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "../styles/popup.css";
import "../styles/mainPage.css";

export default function MainPage() {
  const navigate = useNavigate();
  const loginContainerRef = useRef(null);
  const userName = null;
  //사용자 정보 관련
  const [userData, setUserData] = useState([{ id: 0, name: "민수민" }]); // 사용자 데이터
  const [friendData, setFriendData] = useState(null); //사용자 친구 데이터
  const [unknownData, setUnknownData] = useState(null); //모르는 사용자 데이터

  //로그인 완료 팝업 관련
  const [showPopup, setShowPopup] = useState(false);

  //드롭 다운 관련
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 추가
  const fieldRef = useRef(null);

  //로그인을 했을 경우 사용자 위주로 보여줄 정보 가져오기
  const getUserDataAfterLogin = async () => {
    let allData = [];
    const response = await fetch("https://dangil-artisticsw.site/mainPage");

    const handleNavigation = (path) => {
      navigate(path);
    };

    if (response.ok) {
      const fetchedData = await response.json();
      const userData = fetchedData.data.user_data.my_data;
      allData.push(userData);
      console.log("로그인 된 상태의 데이터", allData);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    console.log(isDropdownOpen);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = (e) => {
    e.stopPropagation(); // 드롭다운 항목 클릭 시 이벤트 전파 방지
  };

  //두 번 클릭 시 다른 사용자 페이지로 이동
  const handleDoubleClick = (userId) => {
    navigate(`/user/${userId}`);
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
          window.location.href = "/"; // 로그아웃 후 게스트 모드로 이동
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("An error occurred during logout:", error);
      });
  };

  //로그인 후 모달창 띄우기
  useEffect(() => {
    setShowPopup(true);
    //3초 후 팝업 숨기기
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  }, []);

  //로그인 완료 모달이 뜰 경우 배경 블러처리
  useEffect(() => {
    if (showPopup) {
      fieldRef.current.classList.add("blurred");
      loginContainerRef.current.classList.add("blurred");
    } else {
      fieldRef.current.classList.remove("blurred");
      loginContainerRef.current.classList.remove("blurred");
    }
  }, [showPopup]);

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

  return (
    <div>
      <DeskField
        userData={userData}
        fieldRef={fieldRef}
        onDoubleClick={handleDoubleClick}
      />

      <div>hi</div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <img src="/images/send.png" alt="send" className="send-img" />
            <p className="popup_t1">다시 힘내볼까요?</p>
            <p className="popup_t2">나만의 스페이스로</p>
            <p className="popup_t3">이동 중입니다.</p>
            <div className="user-info">
              <div className="user-icon2">MK</div>
              <div className="user-name">{userName}</div>
              <div className="user-time">2 days ago</div>
            </div>
          </div>
        </div>
      )}
      <div ref={loginContainerRef} className="login-container">
        <button className="login-button-user">
          <img src="/images/search.png" alt="Search" className="search-img" />
          <FaUserCircle className="user-icon1" />
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
      </div>
    </div>
  );
}
