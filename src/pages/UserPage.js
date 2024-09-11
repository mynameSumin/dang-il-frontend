import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Clock from '../components/Clock.js';
import "../styles/UserPage.css";

const UserPage = () => {
  const { userId } = useParams(); // URL에서 userId를 받아옴
  const navigate = useNavigate();
  const minUserId = 0; // 최소 사용자 ID 설정 (1로 변경)
  const maxUserId = 8; // 최대 사용자 ID 설정

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
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <div style={{ padding: '20px' }}>
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
            className={`control-button ${parseInt(userId) === minUserId ? 'disabled' : ''}`}
          >
            <span className="icon">＜</span>
          </button>
          {/* 중간 기능 버튼 */}
          <button className="control-button">
            <span className="icon">M</span>
          </button>
          <button className="control-button">
            <span className="icon">＜/＞</span>
          </button>
          {/* 다음 사용자로 이동하는 버튼, 최대 사용자 ID를 초과하면 비활성화 */}
          <button
            onClick={handleNextUser}
            disabled={parseInt(userId) === maxUserId}
            className={`control-button ${parseInt(userId) === maxUserId ? 'disabled' : ''}`}
          >
            <span className="icon">＞</span>
          </button>
        </div>
        {/* 메인 페이지로 이동하는 버튼 */}
        <button onClick={handleGoHome} className="home-button">Go to Home</button>
      </div>
    </div>
  );
};

export default UserPage;

