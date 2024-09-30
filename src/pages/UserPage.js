import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import YouTube from "react-youtube";
import Clock from "../components/Clock.js";
import Book from "../components/Book";
import "../styles/userPage.css";

import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import changeMusic from "../assets/chageMusic.png";
import bookbutton from "../assets/bookbutton.png";
import memobutton from "../assets/memobutton.png";
import closeBtn from "../assets/close.png";
import Panel from "../components/Panel"; // 새로운 컴포넌트 import
import AddYoutube from "../components/AddYoutube.js";
import Memo from "../components/AddMemo.js";

const UserPage = () => {
  const { userId } = useParams(); // URL에서 userId를 받아옴
  const navigate = useNavigate();
  const minUserId = 0; // 최소 사용자 ID 설정
  const maxUserId = 17; // 최대 사용자 ID 설정
  const [isListVisible, setIsListVisible] = useState(false);
  const panelRef = useRef(null);
  const [mode, setMode] = useState(true);
  const [click, setClick] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [editBook, setEditBook] = useState(false); // 책 편집 화면 표시 여부
  const [tagbutton, settagbutton] = useState(false); //태그버튼 눌렀을때 색변환
  const [key, setKey] = useState("bHvT0SNITuU");
  const [bookName, setBookName] = useState("Book Name");
  const [showWindow, setShowWindow] = useState(false);
  const [activeWindow, setActiveWindow] = useState("");

  const handleClick = (windowType) => {
    // 창을 열 때 창 타입 설정 (음악 창 또는 메모 창)
    setActiveWindow(windowType);
    setShowWindow(true);
  };

  const bookRef = useRef(null);
  // 책 클릭시 편집화면 활성화
  const bookImageClick = async (e) => {
    e.stopPropagation();
    setEditBook(!editBook);
    try {
      const response = await fetch(
        "https://dangil-artisticsw.site/space/3661157737",
        {
          method: "GET",
          credentials: "include", // 쿠키 포함 설정
        }
      );

      const bookNameData = await response.json();
      const bookNameList = bookNameData.data.user_space_data.book_list;

      setBookName();
    } catch (error) {
      console.error("Error handling the book name:", error);
    }
  };

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

  const LeftSettingtoggle = (e) => {
    e.stopPropagation(); // 패널을 클릭할 때 이벤트 전파 방지
    setIsListVisible(!isListVisible);
  };

  return (
    <div>
      {/* 단축 버튼들 */}

      <div className="memo-youtube-book">
        <img
          src={memobutton}
          className="add-memo"
          onClick={() => {
            setShowWindow(true);
            setActiveWindow("memo");
          }}
        />
        <img
          src={changeMusic}
          className="change-music"
          onClick={() => {
            setShowWindow(!showWindow);
            setActiveWindow("change-music");
          }}
        />
        <img src={bookbutton} className="bookbutton" />
      </div>
      {/*
       */}
      <AddYoutube
        setKey={setKey}
        showWindow={showWindow}
        setShowWindow={setShowWindow}
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
      />
      <Memo
        setKey={setKey}
        showWindow={showWindow}
        setShowWindow={setShowWindow}
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
      />
      <div className="background" id={showWindow ? "blur" : ""}>
        <div className="add-color"></div>

        {/* 유튜브 관련 파트 */}
        <div className="player-box">
          <YouTube
            iframeClassName="player"
            videoId={key}
            opts={{
              width: "25%",
              height: "24.9%",
              playerVars: {
                rel: 1,
                autoplay: 1, // 자동재생
                loop: 1, // 반복재생
                modestbranding: 1, // YouTube 로고 숨김
                mute: 1, // 음소거 (브라우저 자동재생 정책으로 인해 필요)
                playlist: "bHvT0SNITuU", // 반복 재생을 위해 playlist에 videoId 추가
              },
            }}
            //이벤트 리스너
            onEnd={(e) => {
              e.target.stopVideo(1);
            }}
          />
        </div>

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
            <span
              className="icon"
              onClick={() => {
                navigate("/mainpage");
              }}
            >
              M
            </span>
          </button>
          <Panel
            mode={mode}
            ref={panelRef}
            isListVisible={isListVisible}
            setIsListVisible={setIsListVisible}
            LeftSettingtoggle={LeftSettingtoggle}
          />

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

        <div class="image-container">
          <img src={sun} id="sun" />
          <img src={moon} id="moon" />
        </div>
        <div
          className={mode ? "day-color" : "night-color"}
          id={animation ? "active-day" : click ? "active-night" : ""}
        />
        <div className="bookshelfbox">
          <div className="cols-bookbox">
            <div className="col-book1" onClick={bookImageClick}>
              <Book
                bookRef={bookRef}
                editBook={editBook}
                setEditBook={setEditBook}
                bookName={bookName}
                setBookName={setBookName}
              />
            </div>
            <div className="col-book2"></div>
            <div className="col-book3"></div>
            <div className="col-book4"></div>
          </div>

          <div className="rows-bookbox">
            <div className="row-book1"></div>
            <div className="row-book2"></div>
            <div className="row-book3"></div>
            <div className="row-book4"></div>
          </div>
        </div>

        {mode ? (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1916 1080"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_397_66)">
              <rect
                width="1920"
                height="1080"
                transform="translate(0.15918)"
                fill="#656565"
              />
              <rect
                opacity="0.5"
                x="1493.11"
                y="94.5652"
                width="5.29932"
                height="293.696"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1836.27"
                y="94.5652"
                width="5.29932"
                height="293.696"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1176.77"
                y="393.561"
                width="5.29932"
                height="321.637"
                transform="rotate(-90 1176.77 393.561)"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1519.93"
                y="393.561"
                width="5.29932"
                height="321.637"
                transform="rotate(-90 1519.93 393.561)"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1176.77"
                y="549.931"
                width="5.29932"
                height="321.637"
                transform="rotate(-90 1176.77 549.931)"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1519.93"
                y="549.931"
                width="5.29932"
                height="321.637"
                transform="rotate(-90 1519.93 549.931)"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1176.77"
                y="713.593"
                width="5.29932"
                height="321.637"
                transform="rotate(-90 1176.77 713.593)"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1519.93"
                y="713.593"
                width="5.29932"
                height="321.637"
                transform="rotate(-90 1519.93 713.593)"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1493.11"
                y="414.586"
                width="5.29932"
                height="130.046"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1836.27"
                y="414.586"
                width="5.29932"
                height="130.046"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1493.11"
                y="570.954"
                width="5.29932"
                height="137.34"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1836.27"
                y="570.954"
                width="5.29932"
                height="137.34"
                fill="#C8DBFF"
              />
              <g filter="url(#filter0_f_397_66)">
                <rect
                  opacity="0.5"
                  x="1493.11"
                  y="94.5652"
                  width="5.29932"
                  height="293.696"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1836.27"
                  y="94.5652"
                  width="5.29932"
                  height="293.696"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1176.77"
                  y="393.561"
                  width="5.29932"
                  height="321.637"
                  transform="rotate(-90 1176.77 393.561)"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1519.93"
                  y="393.561"
                  width="5.29932"
                  height="321.637"
                  transform="rotate(-90 1519.93 393.561)"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1176.77"
                  y="549.931"
                  width="5.29932"
                  height="321.637"
                  transform="rotate(-90 1176.77 549.931)"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1519.93"
                  y="549.931"
                  width="5.29932"
                  height="321.637"
                  transform="rotate(-90 1519.93 549.931)"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1176.77"
                  y="713.593"
                  width="5.29932"
                  height="321.637"
                  transform="rotate(-90 1176.77 713.593)"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1519.93"
                  y="713.593"
                  width="5.29932"
                  height="321.637"
                  transform="rotate(-90 1519.93 713.593)"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1493.11"
                  y="414.586"
                  width="5.29932"
                  height="130.046"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1836.27"
                  y="414.586"
                  width="5.29932"
                  height="130.046"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1493.11"
                  y="570.954"
                  width="5.29932"
                  height="137.34"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1836.27"
                  y="570.954"
                  width="5.29932"
                  height="137.34"
                  fill="#CEDFFF"
                />
              </g>
              <path
                fill-rule="evenodd"
                clipRule="evenodd"
                d="M1149.16 68.8652H1863.16V734H1149.16V68.8652ZM1519.37 94.5942H1835.54V388.256H1519.37V94.5942ZM1519.37 414.609H1835.54V544.628H1519.37V414.609ZM1493.01 544.628V414.609H1176.78V544.628H1493.01ZM1176.78 570.98H1493.01V708.271H1176.78V570.98ZM1519.37 570.98H1835.54V708.271H1519.37V570.98ZM1493.01 94.5942V388.256H1176.78V94.5942H1493.01Z"
                fill="#808EBD"
              />
              <rect
                x="232.691"
                width="1688.2"
                height="1080"
                fill="url(#paint0_linear_397_66)"
              />
              <rect
                x="0.15918"
                width="246.285"
                height="1080"
                fill="url(#paint1_linear_397_66)"
              />
              <rect
                x="412.779"
                y="595.257"
                width="492.723"
                height="83.2285"
                transform="rotate(90 412.779 595.257)"
                fill="#6B7AB2"
              />
              <path
                d="M412.314 722.463H876.787L805.475 751.436H338.576L412.314 722.463Z"
                fill="#A4B5ED"
              />
              <path
                d="M412.882 907.478H876.79L806.331 942.666H338.883L412.882 907.478Z"
                fill="#A4B5ED"
              />
              <rect
                x="876.788"
                y="543.709"
                width="544.271"
                height="83.2285"
                transform="rotate(90 876.788 543.709)"
                fill="#6B7AB2"
              />
              <path
                fill-rule="evenodd"
                clipRule="evenodd"
                d="M303.762 562.435H338.929H770.309H805.476V597.602V751.163V786.33V939.892V975.059V1087.98H770.309V975.059H338.929V1087.98H303.762V975.059V939.892V786.33V751.163V597.602V562.435ZM770.309 939.892V786.33H338.929V939.892H770.309ZM770.309 751.163V597.602H338.929V751.163H770.309Z"
                fill="#8095CE"
              />
              <path
                d="M407.263 543.709H876.788L805.476 562.435H303.762L407.263 543.709Z"
                fill="#A4B5ED"
              />
              <rect
                x="388.342"
                y="137.539"
                width="512.512"
                height="232.461"
                fill="#AAB7D3"
              />
              <rect
                x="384.118"
                y="137.539"
                width="512.512"
                height="232.461"
                fill="url(#paint2_linear_397_66)"
              />
              <rect
                x="246.444"
                y="192.052"
                width="11.1416"
                height="46.8813"
                rx="5.5708"
                transform="rotate(129.099 246.444 192.052)"
                fill="#154287"
              />
              <rect
                x="222.282"
                y="165.824"
                width="12.4586"
                height="322.622"
                transform="rotate(33.333 222.282 165.824)"
                fill="#154287"
              />
              <rect
                x="63.2725"
                y="375.527"
                width="12.4586"
                height="704.473"
                fill="#154287"
              />
              <path
                d="M314.692 203.018L264.111 265.261L233.375 240.284C216.187 226.316 213.577 201.059 227.545 183.871C241.512 166.683 266.769 164.073 283.957 178.041L314.692 203.018Z"
                fill="url(#paint3_linear_397_66)"
              />
              <circle
                cx="333.122"
                cy="270.258"
                r="41.2473"
                transform="rotate(129.099 333.122 270.258)"
                fill="white"
              />
              <path
                className="stand-head"
                onClick={() => {
                  setAnimation(true);
                  setClick(true);
                  const sun = document.getElementById("sun");
                  const moon = document.getElementById("moon");
                  sun.classList.remove("night-day");
                  moon.classList.remove("night-day");
                  sun.classList.add("animate");
                  moon.classList.add("animate");

                  setTimeout(() => {
                    setMode(!mode);
                  }, 3950);
                }}
                fill-rule="evenodd"
                clipRule="evenodd"
                d="M263.861 265.024C257.73 279.246 258.556 322.299 276.922 353.118L308.523 314.232L340.123 275.347L340.123 275.347L371.506 236.728L403.593 197.245C369.55 185.717 326.918 194.106 314.106 203.195L288.437 234.781L288.438 234.781L263.861 265.024Z"
                fill="url(#paint4_linear_397_66)"
              />
              <path
                d="M380.118 377.632C380.118 373.213 383.7 369.632 388.118 369.632H901.076C905.494 369.632 909.076 373.213 909.076 377.632V383.561C909.076 387.979 905.494 391.561 901.076 391.561H388.118C383.7 391.561 380.118 387.979 380.118 383.561V377.632Z"
                fill="#617BB5"
              />
              <path
                d="M380.118 102.565C380.118 98.1469 383.7 94.5652 388.118 94.5652H901.076C905.494 94.5652 909.076 98.1469 909.076 102.565V129.539C909.076 133.957 905.494 137.539 901.076 137.539H388.118C383.7 137.539 380.118 133.957 380.118 129.539V102.565Z"
                fill="#617BB5"
              />
              <path
                d="M375.895 377.632C375.895 373.213 379.476 369.632 383.895 369.632H896.853C901.271 369.632 904.853 373.213 904.853 377.632V383.561C904.853 387.979 901.271 391.561 896.853 391.561H383.895C379.476 391.561 375.895 387.979 375.895 383.561V377.632Z"
                fill="url(#paint5_linear_397_66)"
              />
              <path
                d="M375.895 102.565C375.895 98.1469 379.476 94.5652 383.895 94.5652H896.853C901.271 94.5652 904.853 98.1469 904.853 102.565V129.539C904.853 133.957 901.271 137.539 896.853 137.539H383.895C379.476 137.539 375.895 133.957 375.895 129.539V102.565Z"
                fill="url(#paint6_linear_397_66)"
              />
              <path
                d="M447.621 157.963L450.107 151.41H452.784L448.817 160.707L448.808 165.629H446.383L446.374 160.59L442.468 151.41H445.136L447.621 157.963Z"
                fill="#9BAAC5"
              />
              <path
                d="M438.864 162.66H435.079L434.334 165.629H431.771L435.902 151.41H438.111L442.165 165.629H439.601L438.864 162.66ZM435.677 160.326H438.293L437.002 155.092L435.677 160.326Z"
                fill="#9BAAC5"
              />
              <path
                d="M421.957 165.629V151.41H425.222C425.806 151.41 426.351 151.492 426.86 151.655C427.368 151.811 427.83 152.035 428.245 152.328C428.609 152.569 428.933 152.865 429.216 153.217C429.504 153.562 429.755 153.94 429.969 154.35C430.217 154.851 430.408 155.405 430.541 156.01C430.679 156.615 430.749 157.26 430.749 157.944V159.115C430.749 159.773 430.685 160.395 430.558 160.981C430.431 161.567 430.252 162.104 430.021 162.592C429.802 163.028 429.545 163.432 429.25 163.803C428.956 164.168 428.632 164.474 428.28 164.721C427.87 165.014 427.417 165.239 426.92 165.395C426.429 165.551 425.904 165.629 425.344 165.629H421.957ZM424.408 153.637V163.422H425.344C425.644 163.422 425.924 163.38 426.184 163.295C426.444 163.211 426.681 163.087 426.894 162.924C427.114 162.755 427.31 162.54 427.483 162.28C427.662 162.013 427.815 161.703 427.942 161.352C428.046 161.046 428.124 160.707 428.176 160.336C428.234 159.959 428.263 159.552 428.263 159.115V157.924C428.263 157.514 428.234 157.127 428.176 156.762C428.124 156.391 428.046 156.052 427.942 155.746C427.815 155.382 427.648 155.056 427.44 154.77C427.238 154.483 427.001 154.249 426.73 154.067C426.522 153.93 426.291 153.826 426.037 153.754C425.788 153.676 425.517 153.637 425.222 153.637H424.408Z"
                fill="#9BAAC5"
              />
              <path
                d="M420.156 159.565C420.156 160.177 420.107 160.759 420.009 161.313C419.911 161.86 419.769 162.367 419.584 162.836C419.388 163.305 419.146 163.735 418.857 164.125C418.568 164.516 418.239 164.841 417.869 165.102C417.534 165.33 417.165 165.505 416.761 165.629C416.362 165.759 415.932 165.824 415.47 165.824C414.979 165.824 414.526 165.753 414.11 165.61C413.694 165.466 413.316 165.265 412.976 165.004C412.641 164.731 412.34 164.402 412.075 164.018C411.809 163.627 411.587 163.188 411.408 162.699C411.246 162.25 411.122 161.762 411.035 161.235C410.954 160.707 410.914 160.151 410.914 159.565V157.494C410.914 156.869 410.96 156.277 411.053 155.717C411.151 155.157 411.292 154.64 411.477 154.164C411.656 153.715 411.873 153.308 412.127 152.944C412.387 152.579 412.684 152.267 413.019 152.006C413.348 151.752 413.718 151.557 414.128 151.42C414.538 151.283 414.982 151.215 415.461 151.215C415.946 151.215 416.4 151.287 416.821 151.43C417.249 151.567 417.633 151.765 417.973 152.026C418.314 152.273 418.611 152.573 418.865 152.924C419.125 153.276 419.348 153.663 419.532 154.086C419.735 154.568 419.888 155.095 419.991 155.668C420.101 156.241 420.156 156.85 420.156 157.494V159.565ZM417.687 157.475C417.687 157.11 417.67 156.765 417.636 156.44C417.607 156.108 417.558 155.802 417.488 155.522C417.402 155.17 417.286 154.858 417.142 154.584C416.997 154.304 416.827 154.076 416.631 153.901C416.475 153.77 416.299 153.67 416.102 153.598C415.912 153.526 415.698 153.49 415.461 153.49C415.236 153.49 415.031 153.523 414.846 153.588C414.667 153.653 414.506 153.748 414.361 153.871C414.165 154.054 413.998 154.281 413.859 154.555C413.726 154.828 413.622 155.147 413.547 155.512C413.489 155.792 413.446 156.098 413.417 156.43C413.394 156.762 413.383 157.11 413.383 157.475V159.565C413.383 159.91 413.394 160.242 413.417 160.561C413.44 160.88 413.481 161.176 413.539 161.449C413.602 161.795 413.694 162.11 413.816 162.397C413.943 162.677 414.09 162.905 414.257 163.08C414.413 163.237 414.589 163.357 414.786 163.442C414.988 163.526 415.216 163.569 415.47 163.569C415.713 163.569 415.935 163.53 416.137 163.451C416.339 163.373 416.518 163.259 416.674 163.11C416.87 162.927 417.035 162.699 417.168 162.426C417.306 162.146 417.416 161.83 417.497 161.479C417.56 161.205 417.607 160.906 417.636 160.58C417.67 160.255 417.687 159.916 417.687 159.565V157.475Z"
                fill="#9BAAC5"
              />
              <path
                d="M409.97 153.647H406.08V165.629H403.638V153.647H399.801V151.41H409.97V153.647Z"
                fill="#9BAAC5"
              />
              <path
                fill-rule="evenodd"
                clipRule="evenodd"
                d="M1364.56 786.593C1364.56 782.313 1368.03 778.844 1372.3 778.844C1376.58 778.844 1380.05 782.313 1380.05 786.593V871.504C1380.05 875.922 1383.63 879.504 1388.05 879.504L1715.84 879.504C1720.26 879.504 1723.84 875.922 1723.84 871.504V786.593C1723.84 782.313 1727.31 778.844 1731.59 778.844C1735.87 778.844 1739.34 782.313 1739.34 786.593V879.504V881V887C1739.34 891.418 1735.76 895 1731.34 895L1372.3 895C1368.03 895 1364.56 891.531 1364.56 887.252V879.504C1364.56 879.504 1364.56 879.504 1364.56 879.504C1364.56 879.504 1364.56 879.504 1364.56 879.504V786.593Z"
                fill="url(#paint7_linear_397_66)"
              />
              <rect
                x="1149"
                y="67.3652"
                width="714"
                height="665.135"
                fill="url(#paint8_linear_397_66)"
              />
              <path
                style={{ zIndex: "10" }}
                fill-rule="evenodd"
                clipRule="evenodd"
                d="M1149 67.3652H1863V732.5H1149V67.3652ZM1519.21 93.0942H1835.38V386.756H1519.21V93.0942ZM1519.21 413.109H1835.38V543.128H1519.21V413.109ZM1492.85 543.128V413.109H1176.62V543.128H1492.85ZM1176.62 569.48H1492.85V706.771H1176.62V569.48ZM1519.21 569.48H1835.38V706.771H1519.21V569.48ZM1492.85 93.0942V386.756H1176.62V93.0942H1492.85Z"
                fill="#808EBD"
              />
              <rect
                opacity="0.5"
                x="1492.95"
                y="93.0652"
                width="5.29932"
                height="293.696"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1836.11"
                y="93.0652"
                width="5.29932"
                height="293.696"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1176.61"
                y="392.061"
                width="5.29932"
                height="321.637"
                transform="rotate(-90 1176.61 392.061)"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1519.77"
                y="392.061"
                width="5.29932"
                height="321.637"
                transform="rotate(-90 1519.77 392.061)"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1176.61"
                y="548.431"
                width="5.29932"
                height="321.637"
                transform="rotate(-90 1176.61 548.431)"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1519.77"
                y="548.431"
                width="5.29932"
                height="321.637"
                transform="rotate(-90 1519.77 548.431)"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1176.61"
                y="712.093"
                width="5.29932"
                height="321.637"
                transform="rotate(-90 1176.61 712.093)"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1519.77"
                y="712.093"
                width="5.29932"
                height="321.637"
                transform="rotate(-90 1519.77 712.093)"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1492.95"
                y="413.086"
                width="5.29932"
                height="130.046"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1836.11"
                y="413.086"
                width="5.29932"
                height="130.046"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1492.95"
                y="569.454"
                width="5.29932"
                height="137.34"
                fill="#C8DBFF"
              />
              <rect
                opacity="0.5"
                x="1836.11"
                y="569.454"
                width="5.29932"
                height="137.34"
                fill="#C8DBFF"
              />
              <g filter="url(#filter2_f_397_66)">
                <rect
                  opacity="0.5"
                  x="1492.95"
                  y="93.0652"
                  width="5.29932"
                  height="293.696"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1836.11"
                  y="93.0652"
                  width="5.29932"
                  height="293.696"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1176.61"
                  y="392.061"
                  width="5.29932"
                  height="321.637"
                  transform="rotate(-90 1176.61 392.061)"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1519.77"
                  y="392.061"
                  width="5.29932"
                  height="321.637"
                  transform="rotate(-90 1519.77 392.061)"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1176.61"
                  y="548.431"
                  width="5.29932"
                  height="321.637"
                  transform="rotate(-90 1176.61 548.431)"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1519.77"
                  y="548.431"
                  width="5.29932"
                  height="321.637"
                  transform="rotate(-90 1519.77 548.431)"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1176.61"
                  y="712.093"
                  width="5.29932"
                  height="321.637"
                  transform="rotate(-90 1176.61 712.093)"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1519.77"
                  y="712.093"
                  width="5.29932"
                  height="321.637"
                  transform="rotate(-90 1519.77 712.093)"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1492.95"
                  y="413.086"
                  width="5.29932"
                  height="130.046"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1836.11"
                  y="413.086"
                  width="5.29932"
                  height="130.046"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1492.95"
                  y="569.454"
                  width="5.29932"
                  height="137.34"
                  fill="#CEDFFF"
                />
                <rect
                  opacity="0.5"
                  x="1836.11"
                  y="569.454"
                  width="5.29932"
                  height="137.34"
                  fill="#CEDFFF"
                />
              </g>
              <rect
                x="692.902"
                y="463"
                width="506.421"
                height="349"
                rx="17"
                fill="#1A1A33"
              />
              <path
                d="M686.41 480C686.41 470.611 694.021 463 703.41 463H1175.59C1184.98 463 1192.59 470.611 1192.59 480V795C1192.59 804.389 1184.98 812 1175.59 812H703.41C694.021 812 686.41 804.389 686.41 795V480Z"
                fill="#7A91D4"
              />
              <path
                d="M692.902 749.77H1199.32V795C1199.32 804.389 1191.71 812 1182.32 812H709.902C700.514 812 692.902 804.389 692.902 795V749.77Z"
                fill="#A6A6C3"
              />
              <path
                d="M686.41 749.77H1192.59V795C1192.59 804.389 1184.98 812 1175.59 812H703.41C694.021 812 686.41 804.389 686.41 795V749.77Z"
                fill="#BCC6ED"
              />
              <rect
                x="896.797"
                y="812"
                width="89.5371"
                height="83"
                fill="url(#paint9_linear_397_66)"
              />
              <rect
                x="986.334"
                y="812"
                width="5.48434"
                height="83"
                fill="#9090BB"
              />
              <g clip-path="url(#clip1_397_66)">
                <rect
                  width="475"
                  height="254"
                  transform="translate(702 479)"
                  fill="black"
                />
                <path
                  d="M703 480H1176V732H703V480Z"
                  fill="white"
                  stroke="#1A1A1A"
                  strokeWidth="2"
                />
                <path
                  d="M940 586C928.96 586 920 594.96 920 606C920 617.04 928.96 626 940 626C951.04 626 960 617.04 960 606C960 594.96 951.04 586 940 586ZM940 622C931.18 622 924 614.82 924 606C924 597.18 931.18 590 940 590C948.82 590 956 597.18 956 606C956 614.82 948.82 622 940 622ZM935 615L949 606L935 597V615Z"
                  fill="#1A1A1A"
                />
              </g>
              <path
                d="M703.233 479H1176.61V732.5H703.233V479Z"
                fill="url(#paint10_linear_397_66)"
                fillOpacity="0.43"
              />
              <rect
                x="494.159"
                y="922"
                width="1426"
                height="67"
                fill="url(#paint11_linear_397_66)"
              />
              <path
                d="M554.159 895H1920.16V921H494.159L554.159 895Z"
                fill="#E9EAF9"
              />
              <g filter="url(#filter3_f_397_66)">
                <path
                  d="M554.159 895H1920.16V921H494.159L554.159 895Z"
                  fill="#E9EAF9"
                />
              </g>
              <rect
                x="1147.56"
                y="789.741"
                width="199.641"
                height="105.259"
                rx="37"
                fill="url(#paint12_linear_397_66)"
              />
              <rect
                x="1151.37"
                y="793.9"
                width="192.015"
                height="73.2654"
                rx="36.6327"
                fill="url(#paint13_linear_397_66)"
              />
              <path
                d="M1183.62 828.132V811.866L1185.51 810.023L1187.41 811.866V828.132L1185.51 829.975L1183.62 828.132Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1256.89 828.132V811.866L1258.79 810.023L1260.68 811.866V828.132L1258.79 829.975L1256.89 828.132Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1213.27 828.132V811.866L1215.17 810.023L1217.07 811.866V828.132L1215.17 829.975L1213.27 828.132Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1286.55 828.132V811.866L1288.44 810.023L1290.34 811.866V828.132L1288.44 829.975L1286.55 828.132Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1183.62 849.364V833.098L1185.51 831.255L1187.41 833.098V849.364L1185.51 851.207L1183.62 849.364Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1256.89 849.364V833.098L1258.79 831.255L1260.68 833.098V849.364L1258.79 851.207L1256.89 849.364Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1213.27 849.364V833.098L1215.17 831.255L1217.07 833.098V849.364L1215.17 851.207L1213.27 849.364Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1286.55 849.364V833.098L1288.44 831.255L1290.34 833.098V849.364L1288.44 851.207L1286.55 849.364Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1187.87 828.628L1204.14 828.628L1205.98 830.524L1204.14 832.42L1187.87 832.42L1186.03 830.524L1187.87 828.628Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1261.15 828.628L1277.41 828.628L1279.25 830.524L1277.41 832.42L1261.15 832.42L1259.3 830.524L1261.15 828.628Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1217.53 828.628L1233.79 828.628L1235.64 830.524L1233.79 832.42L1217.53 832.42L1215.68 830.524L1217.53 828.628Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1290.8 828.628L1307.07 828.628L1308.91 830.524L1307.07 832.42L1290.8 832.42L1288.96 830.524L1290.8 828.628Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1187.87 807.534L1204.14 807.534L1205.98 809.431L1204.14 811.327L1187.87 811.327L1186.03 809.431L1187.87 807.534Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1261.15 807.534L1277.41 807.534L1279.25 809.431L1277.41 811.327L1261.15 811.327L1259.3 809.431L1261.15 807.534Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1217.53 807.534L1233.79 807.534L1235.64 809.431L1233.79 811.327L1217.53 811.327L1215.68 809.431L1217.53 807.534Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1290.8 807.534L1307.07 807.534L1308.91 809.431L1307.07 811.327L1290.8 811.327L1288.96 809.431L1290.8 807.534Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1249.6 816.455L1249.6 819.53L1247.38 822.177L1245.15 819.53L1245.15 816.455L1247.38 813.808L1249.6 816.455Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1249.6 840.773L1249.6 843.848L1247.38 846.495L1245.15 843.848L1245.15 840.773L1247.38 838.126L1249.6 840.773Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1187.87 849.739L1204.14 849.739L1205.98 851.635L1204.14 853.531L1187.87 853.531L1186.03 851.635L1187.87 849.739Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1261.15 849.739L1277.41 849.739L1279.25 851.635L1277.41 853.531L1261.15 853.531L1259.3 851.635L1261.15 849.739Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1217.53 849.739L1233.79 849.739L1235.64 851.635L1233.79 853.531L1217.53 853.531L1215.68 851.635L1217.53 849.739Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1290.8 849.739L1307.07 849.739L1308.91 851.635L1307.07 853.531L1290.8 853.531L1288.96 851.635L1290.8 849.739Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1204.41 828.132V811.866L1206.31 810.023L1208.2 811.866V828.132L1206.31 829.975L1204.41 828.132Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1277.69 828.132V811.866L1279.58 810.023L1281.48 811.866V828.132L1279.58 829.975L1277.69 828.132Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1234.07 828.132V811.866L1235.96 810.023L1237.86 811.866V828.132L1235.96 829.975L1234.07 828.132Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1307.34 828.132V811.866L1309.24 810.023L1311.13 811.866V828.132L1309.24 829.975L1307.34 828.132Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1204.41 849.364V833.098L1206.31 831.255L1208.2 833.098V849.364L1206.31 851.207L1204.41 849.364Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1277.69 849.364V833.098L1279.58 831.255L1281.48 833.098V849.364L1279.58 851.207L1277.69 849.364Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1234.07 849.364V833.098L1235.96 831.255L1237.86 833.098V849.364L1235.96 851.207L1234.07 849.364Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M1307.34 849.364V833.098L1309.24 831.255L1311.13 833.098V849.364L1309.24 851.207L1307.34 849.364Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                style={{ pointerEvents: "none" }}
                d="M-31.0439 -32.7485H1948.04L1951.04 1112.75H-28.0439L-31.0439 -32.7485Z"
                fill="url(#paint14_radial_397_66)"
                fillOpacity="0.2"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_397_66"
                x="1156.77"
                y="74.5652"
                width="704.801"
                height="659.028"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="10"
                  result="effect1_foregroundBlur_397_66"
                />
              </filter>
              <filter
                id="filter1_f_397_66"
                x="1236.25"
                y="73.292"
                width="233.22"
                height="136.61"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="10"
                  result="effect1_foregroundBlur_397_66"
                />
              </filter>
              <filter
                id="filter2_f_397_66"
                x="1156.61"
                y="73.0652"
                width="704.8"
                height="659.028"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="10"
                  result="effect1_foregroundBlur_397_66"
                />
              </filter>
              <filter
                id="filter3_f_397_66"
                x="474.159"
                y="875"
                width="1466"
                height="66"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="10"
                  result="effect1_foregroundBlur_397_66"
                />
              </filter>
              <linearGradient
                id="paint0_linear_397_66"
                x1="1325.74"
                y1="-54.6273"
                x2="1325.74"
                y2="1171.76"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#D8DFF7" />
                <stop offset="1" stopColor="#9EAFDE" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_397_66"
                x1="0.15918"
                y1="540"
                x2="246.444"
                y2="540"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DBE1F8" />
                <stop offset="1" stopColor="#9AADDC" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_397_66"
                x1="384.118"
                y1="73.9812"
                x2="909.585"
                y2="431.303"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FDFEFF" />
                <stop offset="1" stopColor="#CDD6F8" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_397_66"
                x1="283.764"
                y1="177.884"
                x2="233.182"
                y2="240.127"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#A6B6EC" />
                <stop offset="1" stopColor="#244C99" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_397_66"
                x1="398.379"
                y1="151.577"
                x2="231.154"
                y2="357.355"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3C5CAF" />
                <stop offset="1" stopColor="#131B45" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_397_66"
                x1="375.895"
                y1="380.596"
                x2="904.853"
                y2="380.596"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#A7B6F0" />
                <stop offset="1" stopColor="#748BD5" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_397_66"
                x1="375.895"
                y1="116.052"
                x2="904.853"
                y2="116.052"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#A7B6F0" />
                <stop offset="1" stopColor="#748BD5" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_397_66"
                x1="1563.9"
                y1="778.844"
                x2="1563.9"
                y2="889.941"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#7687C4" />
                <stop offset="1" stopColor="#334584" />
              </linearGradient>
              <linearGradient
                id="paint8_linear_397_66"
                x1="1506"
                y1="67.3652"
                x2="1506"
                y2="732.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EEF4FF" />
                <stop offset="1" stopColor="#B6C3F4" />
              </linearGradient>
              <linearGradient
                id="paint9_linear_397_66"
                x1="941.565"
                y1="812"
                x2="941.565"
                y2="895"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9EA5CA" />
                <stop offset="1" stopColor="#BCC6ED" />
              </linearGradient>
              <linearGradient
                id="paint10_linear_397_66"
                x1="787.554"
                y1="479"
                x2="1111.23"
                y2="696.205"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0.5" />
                <stop offset="1" stopColor="#001B6D" />
              </linearGradient>
              <linearGradient
                id="paint11_linear_397_66"
                x1="494.159"
                y1="955.5"
                x2="1920.16"
                y2="955.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#CAD5FF" />
                <stop offset="1" stopColor="#172864" />
              </linearGradient>
              <linearGradient
                id="paint12_linear_397_66"
                x1="1185.62"
                y1="796.414"
                x2="1247.38"
                y2="934.658"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#B2C1E9" />
                <stop offset="1" stopColor="#4851C1" />
              </linearGradient>
              <linearGradient
                id="paint13_linear_397_66"
                x1="1176.06"
                y1="793.9"
                x2="1338.97"
                y2="867.166"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#414141" />
                <stop offset="1" stopColor="#010101" />
              </linearGradient>
              <radialGradient
                id="paint14_radial_397_66"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(988.793 547.363) rotate(90) scale(572.749 989.544)"
              >
                <stop stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="#3F69F2" />
              </radialGradient>
              <clipPath id="clip0_397_66">
                <rect
                  width="1920"
                  height="1080"
                  fill="white"
                  transform="translate(0.15918)"
                />
              </clipPath>
              <clipPath id="clip1_397_66">
                <rect
                  width="475"
                  height="254"
                  fill="white"
                  transform="translate(702 479)"
                />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 1921 1080"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2072_1393)">
              <rect
                width="1920"
                height="1080"
                transform="translate(0.65918)"
                fill="#656565"
              />
              <rect
                x="233.191"
                y="0.973633"
                width="1688.2"
                height="1080"
                fill="url(#paint0_linear_2072_1393)"
              />
              <rect
                x="0.65918"
                width="246.285"
                height="1080"
                fill="url(#paint1_linear_2072_1393)"
              />
              <rect
                x="413.279"
                y="595.257"
                width="492.723"
                height="83.2285"
                transform="rotate(90 413.279 595.257)"
                fill="#120D23"
              />
              <path
                d="M412.814 722.463H877.287L805.975 751.436H339.076L412.814 722.463Z"
                fill="#2D2149"
              />
              <path
                d="M413.382 907.478H877.29L806.831 942.666H339.383L413.382 907.478Z"
                fill="#2E2149"
              />
              <rect
                x="877.288"
                y="543.709"
                width="544.271"
                height="83.2285"
                transform="rotate(90 877.288 543.709)"
                fill="#120D23"
              />
              <path
                fill-rule="evenodd"
                clipRule="evenodd"
                d="M339.429 562.435H770.809H805.976V597.602V751.163V786.33V939.892V975.059V1087.98H770.809V975.059L339.429 975.059V1087.98H304.262V975.059V939.892V786.33V751.163V597.602V562.435L339.429 562.435ZM770.809 939.892V786.33L339.429 786.33V939.892L770.809 939.892ZM770.809 751.163V597.602L339.429 597.602V751.163L770.809 751.163Z"
                fill="#180E2D"
              />
              <path
                d="M407.763 543.709H877.288L805.976 562.435H304.262L407.763 543.709Z"
                fill="#2D2149"
              />
              <rect
                x="388.842"
                y="137.539"
                width="512.512"
                height="232.461"
                fill="#1E1543"
              />
              <rect
                x="384.618"
                y="137.539"
                width="512.512"
                height="232.461"
                fill="url(#paint2_linear_2072_1393)"
              />
              <path
                d="M554.659 895H1920.66V921H494.659L554.659 895Z"
                fill="#FDD8CE"
              />
              <g filter="url(#filter0_f_2072_1393)">
                <path
                  d="M555.39 894.478H1921.39V920.478H495.39L555.39 894.478Z"
                  fill="#FFF0EC"
                />
              </g>
              <path
                d="M1149.66 68.8652H1863.66V734H1149.66V68.8652Z"
                fill="url(#paint3_linear_2072_1393)"
              />
              <path
                fill-rule="evenodd"
                clipRule="evenodd"
                d="M1149.66 68.8652H1863.66V734H1149.66V68.8652ZM1519.87 94.5942H1836.04V388.256H1519.87V94.5942ZM1519.87 414.609H1836.04V544.628H1519.87V414.609ZM1493.51 544.628V414.609H1177.28V544.628H1493.51ZM1177.28 570.98H1493.51V708.271H1177.28V570.98ZM1519.87 570.98H1836.04V708.271H1519.87V570.98ZM1493.51 94.5942V388.256H1177.28V94.5942H1493.51Z"
                fill="#452D67"
              />
              <path
                d="M494.659 921H1920.66V988H494.659V921Z"
                fill="url(#paint4_linear_2072_1393)"
              />
              <rect
                x="246.944"
                y="192.052"
                width="11.1416"
                height="46.8813"
                rx="5.5708"
                transform="rotate(129.099 246.944 192.052)"
                fill="black"
              />
              <rect
                x="222.782"
                y="165.824"
                width="12.4586"
                height="322.622"
                transform="rotate(33.333 222.782 165.824)"
                fill="black"
              />
              <rect
                x="63.7725"
                y="375.527"
                width="12.4586"
                height="704.473"
                fill="black"
              />
              <path
                d="M315.192 203.018L264.611 265.261L233.875 240.284C216.687 226.316 214.077 201.059 228.045 183.871C242.012 166.683 267.269 164.073 284.457 178.041L315.192 203.018Z"
                fill="url(#paint5_linear_2072_1393)"
              />
              <circle
                cx="333.622"
                cy="270.258"
                r="41.2473"
                transform="rotate(129.099 333.622 270.258)"
                fill="#FBC8B4"
              />
              <path
                fill-rule="evenodd"
                clipRule="evenodd"
                className="stand-head"
                onClick={() => {
                  setAnimation(false);
                  const sun = document.getElementById("sun");
                  const moon = document.getElementById("moon");
                  sun.classList.remove("animate");
                  moon.classList.remove("animate");
                  sun.classList.add("night-day");
                  moon.classList.add("night-day");
                  setTimeout(() => {
                    setMode(!mode);
                  }, 1300);
                }}
                d="M264.361 265.024C258.23 279.246 259.056 322.299 277.422 353.118L309.023 314.232L340.623 275.347L340.623 275.347L372.006 236.728L404.093 197.245C370.05 185.717 327.418 194.106 314.606 203.195L288.937 234.781L288.938 234.781L264.361 265.024Z"
                fill="#100C0A"
              />
              <rect
                opacity="0.5"
                x="1515.13"
                y="94.5652"
                width="5.29932"
                height="293.696"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1177.27"
                y="94.5652"
                width="5.29932"
                height="293.696"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1863.66"
                y="68.8652"
                width="5.29932"
                height="665.135"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1177.27"
                y="414.561"
                width="5.29932"
                height="316.6"
                transform="rotate(-90 1177.27 414.561)"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1177.27"
                y="94.8645"
                width="5.29932"
                height="316.6"
                transform="rotate(-90 1177.27 94.8645)"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1515.13"
                y="414.561"
                width="5.29932"
                height="320.976"
                transform="rotate(-90 1515.13 414.561)"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1515.13"
                y="94.8645"
                width="5.29932"
                height="320.976"
                transform="rotate(-90 1515.13 94.8645)"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1177.27"
                y="570.931"
                width="5.29932"
                height="316.323"
                transform="rotate(-90 1177.27 570.931)"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1515.13"
                y="570.931"
                width="5.29932"
                height="320.976"
                transform="rotate(-90 1515.13 570.931)"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1177.27"
                y="713.593"
                width="5.29932"
                height="316.912"
                transform="rotate(-90 1177.27 713.593)"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1515.13"
                y="713.593"
                width="5.29932"
                height="320.976"
                transform="rotate(-90 1515.13 713.593)"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1166.52"
                y="739.299"
                width="5.29932"
                height="702.435"
                transform="rotate(-90 1166.52 739.299)"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1515.13"
                y="414.586"
                width="5.29932"
                height="130.046"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1177.27"
                y="414.586"
                width="5.29932"
                height="130.046"
                fill="#170F36"
              />
              <rect
                opacity="0.5"
                x="1515.13"
                y="570.954"
                width="5.29932"
                height="137.34"
                fill="#170F36"
              />
              <path
                d="M380.618 377.632C380.618 373.213 384.2 369.632 388.618 369.632H901.576C905.994 369.632 909.576 373.213 909.576 377.632V383.561C909.576 387.979 905.994 391.561 901.576 391.561H388.618C384.2 391.561 380.618 387.979 380.618 383.561V377.632Z"
                fill="#190E38"
              />
              <path
                d="M380.618 102.565C380.618 98.1469 384.2 94.5652 388.618 94.5652H901.576C905.994 94.5652 909.576 98.1469 909.576 102.565V129.539C909.576 133.957 905.994 137.539 901.576 137.539H388.618C384.2 137.539 380.618 133.957 380.618 129.539V102.565Z"
                fill="#190E38"
              />
              <path
                d="M376.395 377.632C376.395 373.213 379.976 369.632 384.395 369.632H897.353C901.771 369.632 905.353 373.213 905.353 377.632V383.561C905.353 387.979 901.771 391.561 897.353 391.561H384.395C379.976 391.561 376.395 387.979 376.395 383.561V377.632Z"
                fill="url(#paint6_linear_2072_1393)"
              />
              <path
                d="M376.395 102.565C376.395 98.1469 379.976 94.5652 384.395 94.5652H897.353C901.771 94.5652 905.353 98.1469 905.353 102.565V129.539C905.353 133.957 901.771 137.539 897.353 137.539H384.395C379.976 137.539 376.395 133.957 376.395 129.539V102.565Z"
                fill="url(#paint7_linear_2072_1393)"
              />
              <path
                d="M448.121 157.963L450.607 151.41H453.284L449.317 160.707L449.308 165.629H446.883L446.874 160.59L442.968 151.41H445.636L448.121 157.963Z"
                fill="#504678"
              />
              <path
                d="M439.364 162.66H435.579L434.834 165.629H432.271L436.402 151.41H438.611L442.665 165.629H440.101L439.364 162.66ZM436.177 160.326H438.793L437.502 155.092L436.177 160.326Z"
                fill="#504678"
              />
              <path
                d="M422.457 165.629V151.41H425.722C426.306 151.41 426.851 151.492 427.36 151.655C427.868 151.811 428.33 152.035 428.745 152.328C429.109 152.569 429.433 152.865 429.716 153.217C430.004 153.562 430.255 153.94 430.469 154.35C430.717 154.851 430.908 155.405 431.041 156.01C431.179 156.615 431.249 157.26 431.249 157.944V159.115C431.249 159.773 431.185 160.395 431.058 160.981C430.931 161.567 430.752 162.104 430.521 162.592C430.302 163.028 430.045 163.432 429.75 163.803C429.456 164.168 429.132 164.474 428.78 164.721C428.37 165.014 427.917 165.239 427.42 165.395C426.929 165.551 426.404 165.629 425.844 165.629H422.457ZM424.908 153.637V163.422H425.844C426.144 163.422 426.424 163.38 426.684 163.295C426.944 163.211 427.181 163.087 427.394 162.924C427.614 162.755 427.81 162.54 427.983 162.28C428.162 162.013 428.315 161.703 428.442 161.352C428.546 161.046 428.624 160.707 428.676 160.336C428.734 159.959 428.763 159.552 428.763 159.115V157.924C428.763 157.514 428.734 157.127 428.676 156.762C428.624 156.391 428.546 156.052 428.442 155.746C428.315 155.382 428.148 155.056 427.94 154.77C427.738 154.483 427.501 154.249 427.23 154.067C427.022 153.93 426.791 153.826 426.537 153.754C426.288 153.676 426.017 153.637 425.722 153.637H424.908Z"
                fill="#504678"
              />
              <path
                d="M420.656 159.565C420.656 160.177 420.607 160.759 420.509 161.313C420.411 161.86 420.269 162.367 420.084 162.836C419.888 163.305 419.646 163.735 419.357 164.125C419.068 164.516 418.739 164.841 418.369 165.102C418.034 165.33 417.665 165.505 417.261 165.629C416.862 165.759 416.432 165.824 415.97 165.824C415.479 165.824 415.026 165.753 414.61 165.61C414.194 165.466 413.816 165.265 413.476 165.004C413.141 164.731 412.84 164.402 412.575 164.018C412.309 163.627 412.087 163.188 411.908 162.699C411.746 162.25 411.622 161.762 411.535 161.235C411.454 160.707 411.414 160.151 411.414 159.565V157.494C411.414 156.869 411.46 156.277 411.553 155.717C411.651 155.157 411.792 154.64 411.977 154.164C412.156 153.715 412.373 153.308 412.627 152.944C412.887 152.579 413.184 152.267 413.519 152.006C413.848 151.752 414.218 151.557 414.628 151.42C415.038 151.283 415.482 151.215 415.961 151.215C416.446 151.215 416.9 151.287 417.321 151.43C417.749 151.567 418.133 151.765 418.473 152.026C418.814 152.273 419.111 152.573 419.365 152.924C419.625 153.276 419.848 153.663 420.032 154.086C420.235 154.568 420.388 155.095 420.491 155.668C420.601 156.241 420.656 156.85 420.656 157.494V159.565ZM418.187 157.475C418.187 157.11 418.17 156.765 418.136 156.44C418.107 156.108 418.058 155.802 417.988 155.522C417.902 155.17 417.786 154.858 417.642 154.584C417.497 154.304 417.327 154.076 417.131 153.901C416.975 153.77 416.799 153.67 416.602 153.598C416.412 153.526 416.198 153.49 415.961 153.49C415.736 153.49 415.531 153.523 415.346 153.588C415.167 153.653 415.006 153.748 414.861 153.871C414.665 154.054 414.498 154.281 414.359 154.555C414.226 154.828 414.122 155.147 414.047 155.512C413.989 155.792 413.946 156.098 413.917 156.43C413.894 156.762 413.883 157.11 413.883 157.475V159.565C413.883 159.91 413.894 160.242 413.917 160.561C413.94 160.88 413.981 161.176 414.039 161.449C414.102 161.795 414.194 162.11 414.316 162.397C414.443 162.677 414.59 162.905 414.757 163.08C414.913 163.237 415.089 163.357 415.286 163.442C415.488 163.526 415.716 163.569 415.97 163.569C416.213 163.569 416.435 163.53 416.637 163.451C416.839 163.373 417.018 163.259 417.174 163.11C417.37 162.927 417.535 162.699 417.668 162.426C417.806 162.146 417.916 161.83 417.997 161.479C418.06 161.205 418.107 160.906 418.136 160.58C418.17 160.255 418.187 159.916 418.187 159.565V157.475Z"
                fill="#504678"
              />
              <path
                d="M410.47 153.647H406.58V165.629H404.138V153.647H400.301V151.41H410.47V153.647Z"
                fill="#504678"
              />
              <path
                fill-rule="evenodd"
                clipRule="evenodd"
                d="M1365.06 786.593C1365.06 782.313 1368.53 778.844 1372.8 778.844C1377.08 778.844 1380.55 782.313 1380.55 786.593V871.504C1380.55 875.922 1384.13 879.504 1388.55 879.504L1716.34 879.504C1720.76 879.504 1724.34 875.922 1724.34 871.504V786.593C1724.34 782.313 1727.81 778.844 1732.09 778.844C1736.37 778.844 1739.84 782.313 1739.84 786.593V879.504V881V887C1739.84 891.418 1736.26 895 1731.84 895L1372.8 895C1368.53 895 1365.06 891.531 1365.06 887.252V879.504C1365.06 879.504 1365.06 879.504 1365.06 879.504C1365.06 879.504 1365.06 879.504 1365.06 879.504V786.593Z"
                fill="url(#paint8_linear_2072_1393)"
              />
              <path
                d="M1320.62 790.928L1411.45 839.904L1516.07 895H1320.62V790.928Z"
                fill="url(#paint9_linear_2072_1393)"
              />
              <rect
                x="693.492"
                y="462"
                width="506.421"
                height="349"
                rx="17"
                fill="#221933"
              />
              <path
                d="M687 479C687 469.611 694.611 462 704 462H1176.18C1185.57 462 1193.18 469.611 1193.18 479V794C1193.18 803.389 1185.57 811 1176.18 811H704C694.611 811 687 803.389 687 794V479Z"
                fill="#6B5784"
              />
              <path
                d="M693.492 748.77H1199.91V794C1199.91 803.389 1192.3 811 1182.91 811H710.492C701.103 811 693.492 803.389 693.492 794V748.77Z"
                fill="#5B4865"
              />
              <path
                d="M687 748.77H1193.18V794C1193.18 803.389 1185.57 811 1176.18 811H704C694.611 811 687 803.389 687 794V748.77Z"
                fill="#C7A4B8"
              />
              <rect
                x="897.387"
                y="811"
                width="89.5371"
                height="83"
                fill="url(#paint10_linear_2072_1393)"
              />
              <rect
                x="986.924"
                y="811"
                width="5.48434"
                height="83"
                fill="#5B4865"
              />
              <g clip-path="url(#clip1_2072_1393)">
                <rect
                  width="475"
                  height="254"
                  transform="translate(706 479)"
                  fill="black"
                />
                <path
                  d="M707 480H1180V732H707V480Z"
                  fill="white"
                  stroke="#1A1A1A"
                  strokeWidth="2"
                />
                <path
                  d="M944 586C932.96 586 924 594.96 924 606C924 617.04 932.96 626 944 626C955.04 626 964 617.04 964 606C964 594.96 955.04 586 944 586ZM944 622C935.18 622 928 614.82 928 606C928 597.18 935.18 590 944 590C952.82 590 960 597.18 960 606C960 614.82 952.82 622 944 622ZM939 615L953 606L939 597V615Z"
                  fill="#1A1A1A"
                />
              </g>
              <rect
                x="1148.06"
                y="789.741"
                width="199.641"
                height="105.259"
                rx="37"
                fill="url(#paint11_linear_2072_1393)"
              />
              <path
                d="M1151.87 830.533C1151.87 810.301 1168.27 793.9 1188.5 793.9H1307.25C1327.48 793.9 1343.88 810.301 1343.88 830.533C1343.88 850.765 1327.48 867.166 1307.25 867.166H1188.5C1168.27 867.166 1151.87 850.765 1151.87 830.533Z"
                fill="url(#paint12_linear_2072_1393)"
              />
              <path
                d="M1184.12 828.132V811.866L1186.01 810.023L1187.91 811.866V828.132L1186.01 829.975L1184.12 828.132Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1257.39 828.132V811.866L1259.29 810.023L1261.18 811.866V828.132L1259.29 829.975L1257.39 828.132Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1213.77 828.132V811.866L1215.67 810.023L1217.57 811.866V828.132L1215.67 829.975L1213.77 828.132Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1287.05 828.132V811.866L1288.94 810.023L1290.84 811.866V828.132L1288.94 829.975L1287.05 828.132Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1184.12 849.364V833.098L1186.01 831.255L1187.91 833.098V849.364L1186.01 851.207L1184.12 849.364Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1257.39 849.364V833.098L1259.29 831.255L1261.18 833.098V849.364L1259.29 851.207L1257.39 849.364Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1213.77 849.364V833.098L1215.67 831.255L1217.57 833.098V849.364L1215.67 851.207L1213.77 849.364Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1287.05 849.364V833.098L1288.94 831.255L1290.84 833.098V849.364L1288.94 851.207L1287.05 849.364Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1188.37 828.628L1204.64 828.628L1206.48 830.524L1204.64 832.42L1188.37 832.42L1186.53 830.524L1188.37 828.628Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1261.65 828.628L1277.91 828.628L1279.75 830.524L1277.91 832.42L1261.65 832.42L1259.8 830.524L1261.65 828.628Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1218.03 828.628L1234.29 828.628L1236.14 830.524L1234.29 832.42L1218.03 832.42L1216.18 830.524L1218.03 828.628Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1291.3 828.628L1307.57 828.628L1309.41 830.524L1307.57 832.42L1291.3 832.42L1289.46 830.524L1291.3 828.628Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1188.37 807.534L1204.64 807.534L1206.48 809.431L1204.64 811.327L1188.37 811.327L1186.53 809.431L1188.37 807.534Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1261.65 807.534L1277.91 807.534L1279.75 809.431L1277.91 811.327L1261.65 811.327L1259.8 809.431L1261.65 807.534Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1218.03 807.534L1234.29 807.534L1236.14 809.431L1234.29 811.327L1218.03 811.327L1216.18 809.431L1218.03 807.534Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1291.3 807.534L1307.57 807.534L1309.41 809.431L1307.57 811.327L1291.3 811.327L1289.46 809.431L1291.3 807.534Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1250.1 816.455L1250.1 819.53L1247.88 822.177L1245.65 819.53L1245.65 816.455L1247.88 813.808L1250.1 816.455Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1250.1 840.773L1250.1 843.848L1247.88 846.495L1245.65 843.848L1245.65 840.773L1247.88 838.126L1250.1 840.773Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1188.37 849.739L1204.64 849.739L1206.48 851.635L1204.64 853.531L1188.37 853.531L1186.53 851.635L1188.37 849.739Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1261.65 849.739L1277.91 849.739L1279.75 851.635L1277.91 853.531L1261.65 853.531L1259.8 851.635L1261.65 849.739Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1218.03 849.739L1234.29 849.739L1236.14 851.635L1234.29 853.531L1218.03 853.531L1216.18 851.635L1218.03 849.739Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1291.3 849.739L1307.57 849.739L1309.41 851.635L1307.57 853.531L1291.3 853.531L1289.46 851.635L1291.3 849.739Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1204.91 828.132V811.866L1206.81 810.023L1208.7 811.866V828.132L1206.81 829.975L1204.91 828.132Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1278.19 828.132V811.866L1280.08 810.023L1281.98 811.866V828.132L1280.08 829.975L1278.19 828.132Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1234.57 828.132V811.866L1236.46 810.023L1238.36 811.866V828.132L1236.46 829.975L1234.57 828.132Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1307.84 828.132V811.866L1309.74 810.023L1311.63 811.866V828.132L1309.74 829.975L1307.84 828.132Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1204.91 849.364V833.098L1206.81 831.255L1208.7 833.098V849.364L1206.81 851.207L1204.91 849.364Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1278.19 849.364V833.098L1280.08 831.255L1281.98 833.098V849.364L1280.08 851.207L1278.19 849.364Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1234.57 849.364V833.098L1236.46 831.255L1238.36 833.098V849.364L1236.46 851.207L1234.57 849.364Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <path
                d="M1307.84 849.364V833.098L1309.74 831.255L1311.63 833.098V849.364L1309.74 851.207L1307.84 849.364Z"
                fill="#FFE8E2"
                fillOpacity="0.3"
              />
              <g filter="url(#filter1_f_2072_1393)">
                <path
                  style={{ visibility: animation ? "visible" : "hidden" }}
                  d="M493.457 922.229L275.599 352.991L401.544 197.014L1918.73 922.229H493.457Z"
                  fill="url(#paint13_linear_2072_1393)"
                  fillOpacity="0.5"
                />
              </g>
              <path
                style={{ visibility: animation ? "visible" : "hidden" }}
                d="M495.694 922.229L277.835 352.991L403.78 197.014L1920.96 922.229H495.694Z"
                fill="url(#paint14_linear_2072_1393)"
                fillOpacity="0.8"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_2072_1393"
                x="475.39"
                y="874.478"
                width="1466"
                height="66"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="10"
                  result="effect1_foregroundBlur_2072_1393"
                />
              </filter>
              <filter
                id="filter1_f_2072_1393"
                x="206.099"
                y="127.514"
                width="1782.13"
                height="864.215"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="34.75"
                  result="effect1_foregroundBlur_2072_1393"
                />
              </filter>
              <linearGradient
                id="paint0_linear_2072_1393"
                x1="1949.71"
                y1="0.973624"
                x2="233.191"
                y2="1123.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3F2871" />
                <stop offset="1" stopColor="#1A1337" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2072_1393"
                x1="0.65918"
                y1="540"
                x2="228.723"
                y2="540"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#251C43" />
                <stop offset="1" stopColor="#181331" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2072_1393"
                x1="384.618"
                y1="73.9812"
                x2="910.085"
                y2="431.303"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#7672A2" />
                <stop offset="1" stopColor="#30215C" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_2072_1393"
                x1="1839.77"
                y1="84.0791"
                x2="1214.62"
                y2="734"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4D3494" />
                <stop offset="1" stopColor="#28175F" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_2072_1393"
                x1="494.659"
                y1="954.5"
                x2="1920.66"
                y2="954.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#A17B7E" />
                <stop offset="1" stopColor="#605273" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_2072_1393"
                x1="284.264"
                y1="177.884"
                x2="233.682"
                y2="240.127"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#281F49" />
                <stop offset="1" stopColor="#120B27" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_2072_1393"
                x1="376.395"
                y1="380.596"
                x2="905.353"
                y2="380.596"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A406D" />
                <stop offset="1" stopColor="#2E2154" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_2072_1393"
                x1="376.395"
                y1="116.052"
                x2="905.353"
                y2="116.052"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A406D" />
                <stop offset="1" stopColor="#2F2255" />
              </linearGradient>
              <linearGradient
                id="paint8_linear_2072_1393"
                x1="1564.4"
                y1="778.844"
                x2="1564.4"
                y2="889.941"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#64558C" />
                <stop offset="1" stopColor="#3F3384" />
              </linearGradient>
              <linearGradient
                id="paint9_linear_2072_1393"
                x1="1339.3"
                y1="821.728"
                x2="1477.14"
                y2="932.963"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1B1363" stopOpacity="0.5" />
                <stop offset="1" stopColor="#371363" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint10_linear_2072_1393"
                x1="942.155"
                y1="811"
                x2="942.155"
                y2="894"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#AD87A5" />
                <stop offset="1" stopColor="#C8A5B9" />
              </linearGradient>
              <linearGradient
                id="paint11_linear_2072_1393"
                x1="1162.92"
                y1="789.741"
                x2="1315"
                y2="895"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#D7BDB0" />
                <stop offset="1" stopColor="#41359C" />
              </linearGradient>
              <linearGradient
                id="paint12_linear_2072_1393"
                x1="1177.09"
                y1="800.693"
                x2="1313.79"
                y2="857.577"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#473739" />
                <stop offset="1" stopColor="#0C0A0D" />
              </linearGradient>
              <linearGradient
                id="paint13_linear_2072_1393"
                x1="315.704"
                y1="268.112"
                x2="1371.71"
                y2="922.229"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFB5AC" stopOpacity="0.6" />
                <stop offset="1" stopColor="#FFEADF" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint14_linear_2072_1393"
                x1="317.941"
                y1="268.112"
                x2="1373.95"
                y2="922.229"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFB5AC" stopOpacity="0.6" />
                <stop offset="1" stopColor="#FFEADF" stopOpacity="0" />
              </linearGradient>
              <clipPath id="clip0_2072_1393">
                <rect
                  width="1920"
                  height="1080"
                  fill="white"
                  transform="translate(0.65918)"
                />
              </clipPath>
              <clipPath id="clip1_2072_1393">
                <rect
                  width="475"
                  height="254"
                  fill="white"
                  transform="translate(706 479)"
                />
              </clipPath>
            </defs>
          </svg>
        )}
      </div>
    </div>
  );
};

export default UserPage;
