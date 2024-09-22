import DeskField from "../components/MakeDesk";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "../styles/popup.css";
import "../styles/mainPage.css";
import "../styles/settingsPopup.css"
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

  //설정 팝업 관련
  const [showSettings, setShowSettings] = useState(false);
  const SettingRef = useRef(null);

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

  const handleSettings = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    setShowSettings(!showSettings); // 설정 팝업 상태를 true로 설정하여 팝업 표시
    setIsDropdownOpen(false); // 드롭다운 메뉴 닫기
  };

  // 체크 로직: sessionStorage에서 팝업 표시 여부 확인
  useEffect(() => {
    const hasPopupShown = sessionStorage.getItem("hasPopupShown");
    // "hasPopupShown" 키에 해당하는 값을 가져옴. 값이 존재하지 않으면 (null), 팝업을 표시해야 함을 의미.


    if (!hasPopupShown) {
      setShowPopup(true);
      sessionStorage.setItem("hasPopupShown", "true");
      // 팝업 표시여부 세션 스토리지에 저장. 브라우저 탭을 닫기 전까지 정보유지, 탭을 재시작하면 사라짐.

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  //로그인 완료 모달이 뜰 경우 배경 블러처리
  useEffect(() => {
    if (showPopup) {
      fieldRef.current.classList.add("blurred");
      loginContainerRef.current.classList.add("blurred");
    } 

    else if (showSettings) {
      fieldRef.current.classList.add("blurred");
    }
    
    else {
      fieldRef.current.classList.remove("blurred");
      loginContainerRef.current.classList.remove("blurred");
      SettingRef.current.classList.remove("blurred");
    }
  }, [showPopup, showSettings]);

      // 화면 어디든 클릭했을 때 호출되는 이벤트 핸들러
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (SettingRef.current && !SettingRef.current.contains(event.target)){
        setShowSettings(false);
      }
    };

    // 전역 클릭 이벤트 등록
    document.addEventListener("click", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <DeskField
        userData={allData ? allData : [{ id: 0, name: "sumin" }]}
        fieldRef={fieldRef}
        onDoubleClick={handleDoubleClick}
      />
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

      {showSettings && (
        <div className="settings-popup">
          <div className="settings-content">
            <div className="settings-header">
              <h3>설정</h3>
              <button onClick={() => setShowSettings(false)} className="close-button">x</button>
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="user-name">이름 변경</label>
                <input type="text" id="user-name" placeholder="User name" />
              </div>
              <div className="form-group">
                <label>권한</label>
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" /> 알림 전체에서 숨기기
                  </label>
                  <label>
                    <input type="checkbox" /> 프로필 사진 변경하기
                  </label>
                  <label>
                    <input type="checkbox" /> 설정 저장하기
                  </label>
                </div>
              </div>
              <button type="submit" className="submit-button">저장하기</button>
            </form>
          </div>
        </div>
      )}

      <div ref={loginContainerRef}  className="login-container">
        <button className="login-button-user">
          <img src="/images/search.png" alt="Search" className="search-img" />
          <FaUserCircle className="user-icon1" />
          <div className="user-name-box">
            <span className="user-name">{userData.name}</span>
            <div className="tag-hover">tag : {userData.tag}</div>
          </div>

          <span
            className={`dropdown-button ${isDropdownOpen ? "active" : null}`}
            onClick={toggleDropdown}
          >
            ▼
          </span>

          <div
            className={`dropdown-content ${isDropdownOpen ? "active" : null}`}
            ref={dropdownRef} 
          >

            <button onClick={() => navigate("/friends")}>친구 목록</button>
            <button onClick={handleSettings} ref={SettingRef}>설정</button>
            <button onClick={handleLogout}>로그아웃</button>
          </div>

          <FiMenu className="list-icon" />
        </button>
      </div>
    </div>
  );
}
