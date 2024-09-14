import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(0); // 타이머의 시간을 초 단위로 관리
  const [isActive, setIsActive] = useState(false); // 타이머가 활성화 여부

  // 백엔드에서 저장된 시간을 가져오는 함수 (사용 시에 추가)
  const fetchSavedTime = async () => {
    // 백엔드에서 타이머 시간을 가져오는 로직 추가
  };

  // 타이머 정보를 백엔드에 저장하는 함수 (사용 시에 추가)
  const saveTimeToBackend = async () => {
    // 백엔드로 타이머 시간을 저장하는 로직 추가
  };

  useEffect(() => {
    fetchSavedTime(); // 페이지 로드 시 저장된 시간 가져오기

    // 컴포넌트가 언마운트되거나 페이지 이동 시 타이머 저장
    return () => {
      saveTimeToBackend(); 
    };
  }, []);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1); // 초 단위로 1씩 증가
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive); // 타이머 시작/정지
  };

  const resetTimer = () => {
    setIsActive(false); // 타이머 정지
    setTime(0); // 시간 초기화
  };

  return (
    <div>
      <h2>{formatTime(time)}</h2>
      <button onClick={toggleTimer}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

function formatTime(time) {
  // 시간이 59분 59초를 넘지 않았을 때는 분과 초만 표시
  if (time < 3600) {
    const minutes = `0${Math.floor((time / 60) % 60)}`.slice(-2);
    const seconds = `0${time % 60}`.slice(-2);
    return `${minutes}분 ${seconds}초`;
  } 
  // 59분 59초를 넘으면 시와 분만 표시
  else {
    const hours = `${Math.floor(time / 3600)}`;
    const minutes = `0${Math.floor((time / 60) % 60)}`.slice(-2);
    return `${hours}시간 ${minutes}분`;
  }
}

export default Clock;