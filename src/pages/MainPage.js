import React, { useState, useEffect, useRef } from "react";
import "../styles/mainPage.css";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

export default function MainPage() {
  const [desks, setDesks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState('Guest'); // 초기 값은 'Guest'
  const fieldRef = useRef(null);
  const loginContainerRef = useRef(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const shouldShowPopup = localStorage.getItem('showPopup');
    if (shouldShowPopup === 'true') {
      setShowPopup(true);
      localStorage.removeItem('showPopup');
      
      // 3초 후 팝업 숨기기
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

  const handleLogin = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleKakaoLogin = () => {
    window.location.href = "https://www.dangil-artisticsw.site/auth/kakao/login";
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://www.dangil-artisticsw.site/auth/google/login";
  };

  const fakeData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 }));

  const translateBox = [
    { dx: 80, dy: -230 },
    { dx: 520, dy: -130 },
    { dx: 530, dy: 190 },
    { dx: 80, dy: 320 },
    { dx: -400, dy: 190 },
    { dx: -400, dy: -130 },
  ];

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
      .filter((desk) => desk !== null);
  };

  useEffect(() => {
    const fieldWidth = window.innerWidth;
    const fieldHeight = window.innerHeight;
    const middleOfWidth = fieldWidth / 2 - 237.5;
    const middleOfHeight = fieldHeight / 2 - 133.5;

    let allDesks = [{ id: 1, x: middleOfWidth, y: middleOfHeight }];
    let deskQueue = [{ id: 1, x: middleOfWidth, y: middleOfHeight }];
    let currentId = 1;
    while (allDesks.length < fakeData.length && deskQueue.length > 0) {
      const currentCenterDesk = deskQueue.shift();
      const newDesks = createSurroundingDesks(currentCenterDesk, currentId, allDesks);
      allDesks = [...allDesks, ...newDesks];
      deskQueue = [...deskQueue, ...newDesks];
      currentId += 6;
    }

    const adjustedDesks = allDesks.slice(0, fakeData.length).map((desk, index) => ({
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
      <div ref={loginContainerRef} className="login-container">
        <button onClick={handleLogin} className="login-button">
          <FaUserCircle className="login-icon" />
          <span className="login-text">{userName}</span> {/* 여기에 유저 이름 표시 */}
          <span className="login-divider">|</span>
          <span className="login-text">Log in</span>
          <FiMenu className="login-icon" />
        </button>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
          <img src="/images/send.png" className="send-img" />
            <h2>Welcome!</h2>
            <p>Connect to your space now</p>
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
              <img src="/images/kakao.png" alt="Kakao" className="login-kakao-img" />
              카카오로 시작
            </button>
            <button className="google-login-button" onClick={handleGoogleLogin}>
              <img src="/images/google.png" alt="Google" className="login-google-img" />
              구글로 시작
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
