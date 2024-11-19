import DeskField from "../components/MakeDesk.js";
import React, { useState, useEffect, useRef } from "react";
import "../styles/mainPage.css";
import "../styles/popup.css";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function MainPageBeforeLogin() {
  const navigate = useNavigate();
  const fieldRef = useRef(null);
  const loginContainerRef = useRef(null);

  //로그인 모달 관련
  const [showModal, setShowModal] = useState(false);

  //user 정보
  const [user, setUser] = useState([
    {
      _id: "0",
      name: "guest",
      email: "test",
      tag: "test",
      accessibility: false,
    },
  ]);

  //사용자 이름
  const [userName, setUserName] = useState("Guest"); // 초기 값은 'Guest'

  //로그인 전 게스트모드 시 보여줄 정보 가져오기
  const getUserDataBeforeLogin = async () => {
    const response = await fetch(
      "https://dangil-artisticsw.site/guestmode/mainpage"
    );
    if (response.ok) {
      const fetchedData = await response.json();
      const userData = fetchedData.data.user_data.unknown_user_data;
      console.log(fetchedData.data.user_data.unknown_user_data);

      setUser((prevUsers) => [...prevUsers, ...userData]);
    }
  };

  // useEffect(() => {
  //   getUserDataBeforeLogin();
  // }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    setShowModal(true);
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

  const handleDoubleClick = (userId, mode) => {
    navigate(`/user/${userId}`, {
      state: { mode },
    });
  };

  return (
    <div className="day">
      <DeskField
        mode="day"
        userData={user}
        fieldRef={fieldRef}
        onDoubleClick={handleDoubleClick}
      />

      <div ref={loginContainerRef} className="login-container">
        <button onClick={handleLogin} className="login-button-guest">
          <FaUserCircle className="guest-icon" />
          <span className="text-Guest">Guest</span>
          <span className="login-divider">|</span>
          <span className="text-Login">Log in</span>
        </button>
      </div>

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
