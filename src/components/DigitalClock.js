import React, { useState, useEffect } from "react";
import "../styles/DigitalClock.css";
import ClockOff from "../assets/DigitalOff.png";
import ClockOn from "../assets/ClockOn.png";
import ClockSpan from "../assets/ClockSpan.png";

const segments = [
  ["top", "top-left", "top-right", "bottom-left", "bottom-right", "bottom"], // 0
  ["top-right", "bottom-right"], // 1
  ["top", "top-right", "middle", "bottom-left", "bottom"], // 2
  ["top", "top-right", "middle", "bottom-right", "bottom"], // 3
  ["top-left", "top-right", "middle", "bottom-right"], // 4
  ["top", "top-left", "middle", "bottom-right", "bottom"], // 5
  ["top", "top-left", "middle", "bottom-left", "bottom-right", "bottom"], // 6
  ["top", "top-right", "bottom-right"], // 7
  [
    "top",
    "top-left",
    "top-right",
    "middle",
    "bottom-left",
    "bottom-right",
    "bottom",
  ], // 8
  ["top", "top-left", "top-right", "middle", "bottom-right", "bottom"], // 9
];

const getSegments = (num) => {
  return segments[num]; // 숫자에 해당하는 세그먼트 배열 반환
};

const Digit = ({ value }) => {
  const activeSegments = getSegments(value);
  return (
    <div className="digit">
      {[
        "top",
        "top-left",
        "top-right",
        "middle",
        "bottom-left",
        "bottom-right",
        "bottom",
      ].map((segment) => (
        <img
          key={segment}
          className={`segment ${segment} ${
            activeSegments.includes(segment) ? "on" : "off"
          }`}
          src={activeSegments.includes(segment) ? ClockOn : ClockOff}
          alt="Segment"
        />
      ))}
    </div>
  );
};

const DigitalClock = () => {
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerActive]);

  // Toggle the timer on and off
  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    if (time >= 3600) {
      // 1시간 이상이면 hh:mm 형식
      return (
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Digit value={Math.floor(hours / 10)} />
          <Digit value={hours % 10} />
          <img
            src={ClockSpan}
            className="clock-span"
            id={timerActive ? "on" : ""}
          />
          <Digit value={Math.floor(minutes / 10)} />
          <Digit value={minutes % 10} />
        </div>
      );
    } else {
      // 1시간 미만이면 mm:ss 형식
      return (
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Digit value={Math.floor(minutes / 10)} />
          <Digit value={minutes % 10} />
          <img
            src={ClockSpan}
            className="clock-span"
            id={timerActive ? "on" : ""}
          />
          <Digit value={Math.floor(seconds / 10)} />
          <Digit value={seconds % 10} />
        </div>
      );
    }
  };

  return (
    <div onClick={toggleTimer} className="toggle-timer">
      {formatTime()}
    </div>
  );
};

export default DigitalClock;
