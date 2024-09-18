import DeskField from "../components/MakeDesk";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "../styles/popup.css";
import "../styles/mainPage.css";
import { useCookies } from "react-cookie";

export default function MainPage() {
  const navigate = useNavigate();
  const loginContainerRef = useRef(null);
  const userName = null;
  const [cookies] = useCookies(["session_id"]);
  //사용자 정보 관련
  const [userData, setUserData] = useState([{ id: 0, name: "" }]); // 사용자 데이터
  const [friendData, setFriendData] = useState(null); //사용자 친구 데이터
  const [unknownData, setUnknownData] = useState(null); //모르는 사용자 데이터
  const [allData, setAllData] = useState(null); //모든 사용자 데이터

  //로그인 완료 팝업 관련
  const [showPopup, setShowPopup] = useState(false);

  //드롭 다운 관련
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 추가
  const fieldRef = useRef(null);

  //로그인을 했을 경우 사용자 위주로 보여줄 정보 가져오기
  const getUserDataAfterLogin = async () => {
    try {
      // Fetch 요청
      const response = await fetch("https://dangil-artisticsw.site/mainpage", {
        method: "GET",
        credentials: "include", // 쿠키 포함
        headers: {
          Cookie: "session_id=" + cookies.session_id,
        },
      });

      // 응답 확인
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 응답 데이터를 JSON으로 변환
      const fetchedData = await response.json();
      console.log(fetchedData);

      // 데이터 추출
      const fetchedUserData = fetchedData.data.user_data.my_data;
      const friendData = fetchedData.data.user_data.friend_data;
      const unknownData = fetchedData.data.user_data.unknown_user_data;

      console.log("로그인 된 상태의 데이터", [
        fetchedUserData,
        friendData,
        unknownData,
      ]);

      // 필요한 데이터를 반환
      return [fetchedUserData, friendData, unknownData];
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  // 함수 호출 시 데이터를 가져와 처리하는 예시
  const fetchData = async () => {
    const [fetchedUserData, friendData, unknownData] =
      await getUserDataAfterLogin();
    const allDataArray = [];

    if (fetchedUserData) {
      console.log("userData:", fetchedUserData);
      console.log("friendData:", friendData);
      console.log("unknownData:", unknownData);

      setUserData(fetchedUserData);
      allDataArray.push(fetchedUserData);
      if (friendData.length !== 0) {
        setFriendData(friendData);
        allDataArray.push(...friendData);
      }
      if (unknownData.length !== 0) {
        setUnknownData(unknownData);
        allDataArray.push(...unknownData);
      }
      setAllData(allDataArray);
    }
  };

  useEffect(() => {
    console.log("updatedData", allData);
  }, [allData]);

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
    fetchData();
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
        userData={allData ? allData : [{ id: 0, name: "sumin" }]}
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
              <div className="user-icon2">{userData.name}</div>
              <div className="user-name">{userData.name}</div>
            </div>
          </div>
        </div>
      )}
      <div ref={loginContainerRef} className="login-container">
        <button className="login-button-user">
          <img src="/images/search.png" alt="Search" className="search-img" />
          <FaUserCircle className="user-icon1" />
          <span className="user-name">{userData.name}</span>
          <span
            className={`dropdown-button ${isDropdownOpen ? "active" : ""}`}
            onClick={toggleDropdown}
          >
            ▼
          </span>
          {isDropdownOpen && (
            <div
              className={`dropdown-content ${isDropdownOpen ? "active" : ""}`}
              ref={dropdownRef}
            >
              <button onClick={() => navigate("/friends")}>친구 목록</button>
              <button onClick={() => navigate("/guestbook")}>방명록</button>
              <button onClick={() => navigate("/settings")}>설정</button>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          )}
          <FiMenu className="list-icon" />
        </button>
      </div>
    </div>
  );
}
