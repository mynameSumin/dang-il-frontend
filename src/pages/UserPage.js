import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import Clock from "../components/Clock.js";
import Book from "../components/Book.js";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import changeMusic from "../assets/chageMusic.png";
import bookbutton from "../assets/bookbutton.png";
import memobutton from "../assets/memobutton.png";
import closeBtn from "../assets/close.png";
import Panel from "../components/Panel.js"; // 새로운 컴포넌트 import
import AddYoutube from "../components/AddYoutube.js";
import Memo from "../components/AddMemo.js";
import DigitalClock from "../components/DigitalClock.js";
import Bulletin from "../components/Bulletin.js";
import "../styles/userPage.css";
import "../styles/SVG.css";
import { buttonBaseClasses } from "@mui/material";
import { makeNewBook } from "../utils/bookData.js";
import { useCookies } from "react-cookie";
import { getUserRoom } from "../utils/data.js";
import before from "../assets/before.png";
import next from "../assets/next.png";

const UserPage = () => {
  const [roomData, setRoomData] = useState(null);
  const location = useLocation();
  const { mode, userRealId } = location.state;
  const [currentMode, setCurrentMode] = useState(mode);

  //book 관련
  const [lockMode, setLockMode] = useState(false);
  const [cookies] = useCookies(["session_id"]);
  const { userId } = useParams(); // URL에서 userId를 받아옴
  const navigate = useNavigate();
  const minUserId = 0; // 최소 사용자 ID 설정
  const maxUserId = 17; // 최대 사용자 ID 설정
  const [isListVisible, setIsListVisible] = useState(false);
  const panelRef = useRef(null);
  const desktopRef = useRef(null);
  const desktopNightRef = useRef(null);
  const [click, setClick] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [tagbutton, settagbutton] = useState(false); //태그버튼 눌렀을때 색변환
  const [key, setKey] = useState("bHvT0SNITuU");
  const [bookName, setBookName] = useState("Book Name");
  const [bookList, setBookList] = useState([]);
  const [showWindow, setShowWindow] = useState(false);
  const [activeWindow, setActiveWindow] = useState("");
  const [bulletin, setBulletin] = useState(false);
  const [write, setWrite] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [newUserId, setNewUserId] = useState(userId);
  // 이 함수는 패널에서 호출되어 SVG 상태를 업데이트함
  const [deco, setDeco] = useState(false);

  // const handleSVGChange = (selectedSVG) => {
  //   setSelectedSVG(selectedSVG);
  // };

  const handleClick = (windowType) => {
    if (activeWindow == windowType) {
      //이미 열려있는 창과 클릭한 창이 같을 때
      setShowWindow(false);
      setActiveWindow("");
    } else {
      //다른창을 클릭했을 때
      setActiveWindow(windowType);
      setShowWindow(true);
    }
  };
  const getRoomData = async () => {
    const roomData1 = await getUserRoom(userRealId); // userId를 전달하여 함수 호출
    setRoomData(roomData1);
    if (roomData1) {
      setBookList(roomData1.user_space_data.book_list);
      setKey(roomData1["user_space_data"]["music_url"][0]);
    }
  };

  useEffect(() => {
    // getRoomData 비동기
    getRoomData().then((rd) => {
      console.log("룸데이터에요 ", rd);
    });

    if (currentMode == false) {
      setAnimation(true);
      setClick(true);
      const sun = document.getElementById("sun");
      const moon = document.getElementById("moon");
      sun.classList.remove("night-day");
      moon.classList.remove("night-day");
      sun.classList.add("animate");
      moon.classList.add("animate");
    }
  }, []);

  useEffect(() => {
    if (roomData) console.log("이이이이", roomData);
  }, [roomData]);

  const bookRef = useRef(null);

  // 이전 사용자로 이동하는 함수
  const handlePrevUser = () => {
    setNewUserId(parseInt(newUserId) - 1);
    if (userId - 1 >= minUserId) {
      navigate(`/user/${newUserId}`, { state: "day" });
    }
  };

  // 다음 사용자로 이동하는 함수
  const handleNextUser = () => {
    setNewUserId(parseInt(newUserId) + 1);
    if (userId + 1 <= maxUserId) {
      window.location(``);
      navigate(`/user/${newUserId}`, { state: "day" });
    }
  };

  const LeftSettingtoggle = (e) => {
    e.stopPropagation(); // 패널을 클릭할 때 이벤트 전파 방지
    setIsListVisible(!isListVisible);
  };

  const ClickBulletin = () => {
    setBulletin(true);
    setShowWindow(true);
  };

  const [decoClick, setDecoClick] = useState("");
  //현재값 조정

  useEffect(() => {
    // 여기에 추가적인 재렌더링 시 로직을 넣을 수 있음
    console.log(`Navigated to user: ${userId}`);
  }, [userId]); // userId가 변할 때마다 호출

  useEffect(() => {
    // 저장된 값을 가져오는 부분
    if (userRealId == "105737853036771628932") {
      const decoClickValue = localStorage.getItem("decoClick");

      if (decoClickValue) {
        setDecoClick(decoClickValue);

        console.log(`The decoClick value is: ${decoClickValue}`); // 출력: "Star"
      } else {
        console.log("decoClick value not found in localStorage.");
      }
    }
  }, []);

  const svgPath = {
    Blue: {
      d: "M217.97 725.933L0.111328 156.695L126.057 0.717773L1643.24 725.933H217.97Z",
      fill: "url(#paint0_linear_2420_711)",
      fillOpacity: "0.8",
    },
    Yellow: {
      d: "M218.687 726L0.828125 156.762L126.774 0.784668L1643.96 726H218.687Z",
      fill: "url(#paint0_linear_2085_181)",
      fillOpacity: "0.8",
    },
    White: {
      d: "M218.826 725.743L0.967773 156.505L126.913 0.52832L1644.1 725.743H218.826Z",
      fill: "url(#paint0_linear_2420_717)",
      fillOpacity: "0.8",
    },
    Default: {
      d: "M493.457 922.229L275.599 352.991L401.544 197.014L1918.73 922.229H493.457Z",
      fill: "url(#paint13_linear_2072_1393)",
      fillOpacity: "0.5",
    },
  };

  const currentPath = svgPath[decoClick] || svgPath.Default;

  return (
    <div>
      {/* 단축 버튼들 */}
      
        <div className="memo-youtube-book">
          <img
            src={memobutton}
            className="add-memo"
            onClick={() => {
              handleClick("add-memo");
            }}
          />
          <img
            src={changeMusic}
            className="change-music"
            onClick={() => {
              handleClick("change-music");
            }}
          />
          <img
            src={bookbutton}
            className="add-book"
            onClick={(e) => {
              setWrite("");
              setBookName("Book name");
              setFile(null);
              handleClick("add-book");
            }}
          />
        </div>
      
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
        desktopRef={desktopRef}
        desktopNightRef={desktopNightRef}
      />
      <Book
        bookRef={bookRef}
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
        setShowWindow={setShowWindow}
        bookName={bookName}
        setBookName={setBookName}
        lockMode={lockMode}
        setLockMode={setLockMode}
        setBookList={setBookList}
        write={write}
        setWrite={setWrite}
        fileName={fileName}
        setFileName={setFileName}
        file={file}
        setFile={setFile}
      />
      <DigitalClock />
      {bulletin && (
        <Bulletin
          bulletin={bulletin}
          setBulletin={setBulletin}
          setShowWindow={setShowWindow}
          className={currentMode ? "" : "night"}
        />
      )}
      <div
        className="background"
        onClick={() => {
          if (showWindow && activeWindow !== "" && !lockMode) {
            setActiveWindow("");
            setShowWindow(false);
          }
        }}
        id={showWindow ? "blur" : ""}
      >
        <div className="add-color"></div>

        {/* 유튜브 관련 파트 */}
        <div className="player-box">
          <YouTube
            iframeClassName="player"
            videoId={key} // 찾았다
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
            <img
              src={before}
              style={{
                width: "10px",
                height: "15px",
                paddingLeft: "10px",
                paddingTop: "3px",
              }}
            />
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
            mode={currentMode}
            ref={panelRef}
            isListVisible={isListVisible}
            setIsListVisible={setIsListVisible}
            LeftSettingtoggle={LeftSettingtoggle}
            // handleSVGChange={handleSVGChange}
            setDeco={setDeco}
            deco={deco}
            setDecoClick={setDecoClick}
          />

          <button
            onClick={handleNextUser}
            disabled={parseInt(userId) === maxUserId}
            className={`control-button ${
              parseInt(userId) === maxUserId ? "invisible" : ""
            }`}
          >
            <img
              src={next}
              style={{
                width: "10px",
                height: "15px",
                paddingRight: "10px",
                paddingTop: "3px",
              }}
            />
          </button>
        </div>

        <div className="image-container">
          <img src={sun} id="sun" />
          <img src={moon} id="moon" />
        </div>
        <div
          className={currentMode ? "day-color" : "night-color"}
          id={animation ? "active-day" : click ? "active-night" : ""}
        />
        <div className="bookshelfbox">
          <div className="cols-bookbox">
            <div
              className="col-book"
              onClick={() => {
                setWrite(bookList[0].content);
                setBookName(bookList[0].name);
                setFile(bookList[0].file);
                handleClick("add-book");
              }}
              id={bookList[0] ? "exist" : ""}
              style={
                bookList[0] && {
                  backgroundColor: bookList[0].bookColor,
                }
              }
            ></div>
            <div
              className="col-book"
              onClick={() => {
                setWrite(bookList[1].content);
                setBookName(bookList[1].name);
                setFile(bookList[1].file);
                handleClick("add-book");
              }}
              style={bookList[1] && { backgroundColor: bookList[1].bookColor }}
            ></div>
            <div
              onClick={() => {
                setWrite(bookList[2].content);
                setBookName(bookList[2].name);
                setFile(bookList[2].file);
                handleClick("add-book");
              }}
              style={bookList[2] && { backgroundColor: bookList[2].bookColor }}
              className="col-book"
            ></div>
            <div className="col-book" id={bookList[3] ? "exist" : ""}></div>
          </div>

          <div className="rows-bookbox">
            <div className="row-book"></div>
            <div className="row-book"></div>
            <div className="row-book"></div>
            <div className="row-book"></div>
          </div>
        </div>
        {decoClick === "curtain" && (
          <>
            {currentMode ? (
              <div style={{ zIndex: "103" }}>
                <svg
                  className="curtain"
                  width="804"
                  height="522"
                  viewBox="0 0 804 522"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_2321_386)">
                    <rect
                      x="23.9844"
                      y="31.4932"
                      width="38.3433"
                      height="475.934"
                      fill="url(#paint0_linear_2321_386)"
                    />
                    <rect
                      x="62.3262"
                      y="31.4932"
                      width="38.3433"
                      height="475.934"
                      fill="url(#paint1_linear_2321_386)"
                    />
                    <rect
                      x="100.67"
                      y="31.4932"
                      width="38.3433"
                      height="475.934"
                      fill="url(#paint2_linear_2321_386)"
                    />
                    <rect
                      x="139.014"
                      y="31.4932"
                      width="38.3433"
                      height="475.934"
                      fill="url(#paint3_linear_2321_386)"
                    />
                    <rect
                      x="666.836"
                      y="31.4932"
                      width="38.3433"
                      height="475.934"
                      fill="url(#paint4_linear_2321_386)"
                    />
                    <rect
                      x="177.357"
                      y="31.4932"
                      width="38.3433"
                      height="475.934"
                      fill="url(#paint5_linear_2321_386)"
                    />
                    <rect
                      x="705.182"
                      y="31.4932"
                      width="38.3433"
                      height="475.934"
                      fill="url(#paint6_linear_2321_386)"
                    />
                    <rect
                      x="215.699"
                      y="31.4932"
                      width="38.3433"
                      height="475.934"
                      fill="url(#paint7_linear_2321_386)"
                    />
                    <rect
                      x="743.523"
                      y="31.4932"
                      width="38.3433"
                      height="475.934"
                      fill="url(#paint8_linear_2321_386)"
                    />
                    <rect
                      x="10.2969"
                      y="12.5425"
                      width="782.816"
                      height="14.9133"
                      rx="7.45664"
                      fill="#0A266E"
                    />
                    <rect
                      x="33.584"
                      y="6.32031"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#4662AA"
                    />
                    <rect
                      x="72.6035"
                      y="6.32031"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#4662AA"
                    />
                    <rect
                      x="111.623"
                      y="6.32031"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#4662AA"
                    />
                    <rect
                      x="150.643"
                      y="6.32031"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#4662AA"
                    />
                    <rect
                      x="676.439"
                      y="6.32031"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#4662AA"
                    />
                    <rect
                      x="189.662"
                      y="6.32031"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#4662AA"
                    />
                    <rect
                      x="715.459"
                      y="6.32031"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#4662AA"
                    />
                    <rect
                      x="228.682"
                      y="6.32031"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#4662AA"
                    />
                    <rect
                      x="754.479"
                      y="6.32031"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#4662AA"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2321_386"
                      x="0.296875"
                      y="0.320312"
                      width="802.816"
                      height="521.107"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.434678 0 0 0 0 0.498447 0 0 0 0 0.709679 0 0 0 0.5 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2321_386"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2321_386"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_2321_386"
                      x1="43.156"
                      y1="31.4932"
                      x2="43.156"
                      y2="507.427"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#778DD7" />
                      <stop offset="1" stop-color="#5A6FA9" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_2321_386"
                      x1="81.4978"
                      y1="31.4932"
                      x2="81.4978"
                      y2="507.427"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#D9E0FA" />
                      <stop offset="1" stop-color="#BBC6EE" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_2321_386"
                      x1="119.842"
                      y1="31.4932"
                      x2="119.842"
                      y2="507.427"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#778DD7" />
                      <stop offset="1" stop-color="#5A6FA9" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_2321_386"
                      x1="158.185"
                      y1="31.4932"
                      x2="158.185"
                      y2="507.427"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#D9E0FA" />
                      <stop offset="1" stop-color="#BBC6EE" />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_2321_386"
                      x1="686.008"
                      y1="31.4932"
                      x2="686.008"
                      y2="507.427"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#778DD7" />
                      <stop offset="1" stop-color="#5A6FA9" />
                    </linearGradient>
                    <linearGradient
                      id="paint5_linear_2321_386"
                      x1="196.529"
                      y1="31.4932"
                      x2="196.529"
                      y2="507.427"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#778DD7" />
                      <stop offset="1" stop-color="#5A6FA9" />
                    </linearGradient>
                    <linearGradient
                      id="paint6_linear_2321_386"
                      x1="724.353"
                      y1="31.4932"
                      x2="724.353"
                      y2="507.427"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#D9E0FA" />
                      <stop offset="1" stop-color="#BBC6EE" />
                    </linearGradient>
                    <linearGradient
                      id="paint7_linear_2321_386"
                      x1="234.871"
                      y1="31.4932"
                      x2="234.871"
                      y2="507.427"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#D9E0FA" />
                      <stop offset="1" stop-color="#BBC6EE" />
                    </linearGradient>
                    <linearGradient
                      id="paint8_linear_2321_386"
                      x1="762.695"
                      y1="31.4932"
                      x2="762.695"
                      y2="507.427"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#778DD7" />
                      <stop offset="1" stop-color="#5A6FA9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            ) : (
              <div style={{ zIndex: "103" }}>
                <svg
                  className="curtain"
                  width="812"
                  height="532"
                  viewBox="0 0 812 532"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_2398_453)">
                    <rect
                      x="28.2715"
                      y="36.5791"
                      width="38.3433"
                      height="475.934"
                      fill="#190B40"
                    />
                    <rect
                      x="66.6133"
                      y="36.5791"
                      width="38.3433"
                      height="475.934"
                      fill="#433571"
                    />
                    <rect
                      x="104.957"
                      y="36.5791"
                      width="38.3433"
                      height="475.934"
                      fill="#190B40"
                    />
                    <rect
                      x="143.301"
                      y="36.5791"
                      width="38.3433"
                      height="475.934"
                      fill="#433571"
                    />
                    <rect
                      x="671.123"
                      y="36.5791"
                      width="38.3433"
                      height="475.934"
                      fill="#190B40"
                    />
                    <rect
                      x="181.645"
                      y="36.5791"
                      width="38.3433"
                      height="475.934"
                      fill="#190B40"
                    />
                    <rect
                      x="709.469"
                      y="36.5791"
                      width="38.3433"
                      height="475.934"
                      fill="#433571"
                    />
                    <rect
                      x="219.986"
                      y="36.5791"
                      width="38.3433"
                      height="475.934"
                      fill="#433571"
                    />
                    <rect
                      x="747.811"
                      y="36.5791"
                      width="38.3433"
                      height="475.934"
                      fill="#190B40"
                    />
                    <rect
                      x="14.584"
                      y="17.6284"
                      width="782.816"
                      height="14.9133"
                      rx="7.45664"
                      fill="#170B39"
                    />
                    <rect
                      x="37.8711"
                      y="11.4062"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#372F5C"
                    />
                    <rect
                      x="76.8906"
                      y="11.4062"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#372F5C"
                    />
                    <rect
                      x="115.91"
                      y="11.4062"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#372F5C"
                    />
                    <rect
                      x="154.93"
                      y="11.4062"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#372F5C"
                    />
                    <rect
                      x="680.727"
                      y="11.4062"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#372F5C"
                    />
                    <rect
                      x="193.949"
                      y="11.4062"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#372F5C"
                    />
                    <rect
                      x="719.746"
                      y="11.4062"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#372F5C"
                    />
                    <rect
                      x="232.969"
                      y="11.4062"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#372F5C"
                    />
                    <rect
                      x="758.766"
                      y="11.4062"
                      width="17.7891"
                      height="36.0489"
                      rx="8.89453"
                      fill="#372F5C"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2398_453"
                      x="0.0839844"
                      y="0.90625"
                      width="811.816"
                      height="530.107"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="7.25" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.122237 0 0 0 0 0.0523151 0 0 0 0 0.243012 0 0 0 0.21 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2398_453"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2398_453"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
            )}
          </>
        )}

        {decoClick === "blind" && (
          <>
            {currentMode ? (
              <div style={{ zIndex: "103" }}>
                <svg
                  className="curtain"
                  width="800"
                  height="491"
                  viewBox="0 0 800 491"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_2321_328)">
                    <rect
                      x="10.1152"
                      y="6.32031"
                      width="779.207"
                      height="24.2046"
                      rx="12.1023"
                      fill="url(#paint0_linear_2321_328)"
                    />
                    <g filter="url(#filter1_b_2321_328)">
                      <path
                        d="M25.4688 30.5249H776.117V56.4651C776.117 59.2265 773.879 61.4651 771.117 61.4651H30.4688C27.7073 61.4651 25.4688 59.2265 25.4688 56.4651V30.5249Z"
                        fill="#E3E9FF"
                        fill-opacity="0.8"
                      />
                    </g>
                    <g filter="url(#filter2_b_2321_328)">
                      <rect
                        x="25.4688"
                        y="75.9097"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#E3E9FF"
                        fill-opacity="0.8"
                      />
                    </g>
                    <g filter="url(#filter3_b_2321_328)">
                      <rect
                        x="25.4688"
                        y="121.294"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#E3E9FF"
                        fill-opacity="0.8"
                      />
                    </g>
                    <g filter="url(#filter4_b_2321_328)">
                      <rect
                        x="25.4688"
                        y="166.679"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#E3E9FF"
                        fill-opacity="0.8"
                      />
                    </g>
                    <g filter="url(#filter5_b_2321_328)">
                      <rect
                        x="25.4688"
                        y="212.064"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#E3E9FF"
                        fill-opacity="0.8"
                      />
                    </g>
                    <g filter="url(#filter6_b_2321_328)">
                      <rect
                        x="25.4688"
                        y="257.449"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#E3E9FF"
                        fill-opacity="0.8"
                      />
                    </g>
                    <g filter="url(#filter7_b_2321_328)">
                      <rect
                        x="25.4688"
                        y="302.833"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#E3E9FF"
                        fill-opacity="0.8"
                      />
                    </g>
                    <g filter="url(#filter8_b_2321_328)">
                      <rect
                        x="25.4688"
                        y="348.218"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#E3E9FF"
                        fill-opacity="0.8"
                      />
                    </g>
                    <g filter="url(#filter9_b_2321_328)">
                      <rect
                        x="25.4688"
                        y="393.603"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#E3E9FF"
                        fill-opacity="0.8"
                      />
                    </g>
                    <g filter="url(#filter10_b_2321_328)">
                      <rect
                        x="25.4688"
                        y="438.988"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#E3E9FF"
                        fill-opacity="0.8"
                      />
                    </g>
                    <path
                      d="M51.5684 30.5249H57.4805V473.385C57.4805 475.018 56.157 476.341 54.5244 476.341C52.8918 476.341 51.5684 475.018 51.5684 473.385V30.5249Z"
                      fill="#6F7FB5"
                      fill-opacity="0.2"
                    />
                    <path
                      d="M400.793 30.5249H406.705V473.385C406.705 475.018 405.382 476.341 403.749 476.341C402.116 476.341 400.793 475.018 400.793 473.385V30.5249Z"
                      fill="#6F7FB5"
                      fill-opacity="0.2"
                    />
                    <path
                      d="M741.332 30.5249H747.244V473.385C747.244 475.018 745.921 476.341 744.288 476.341C742.656 476.341 741.332 475.018 741.332 473.385V30.5249Z"
                      fill="#6F7FB5"
                      fill-opacity="0.2"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2321_328"
                      x="0.115234"
                      y="0.320312"
                      width="799.207"
                      height="490.021"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.434678 0 0 0 0 0.498447 0 0 0 0 0.709679 0 0 0 0.5 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2321_328"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2321_328"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_b_2321_328"
                      x="21.4688"
                      y="26.5249"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2321_328"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2321_328"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter2_b_2321_328"
                      x="21.4688"
                      y="71.9097"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2321_328"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2321_328"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter3_b_2321_328"
                      x="21.4688"
                      y="117.294"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2321_328"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2321_328"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter4_b_2321_328"
                      x="21.4688"
                      y="162.679"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2321_328"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2321_328"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter5_b_2321_328"
                      x="21.4688"
                      y="208.064"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2321_328"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2321_328"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter6_b_2321_328"
                      x="21.4688"
                      y="253.449"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2321_328"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2321_328"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter7_b_2321_328"
                      x="21.4688"
                      y="298.833"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2321_328"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2321_328"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter8_b_2321_328"
                      x="21.4688"
                      y="344.218"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2321_328"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2321_328"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter9_b_2321_328"
                      x="21.4688"
                      y="389.603"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2321_328"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2321_328"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter10_b_2321_328"
                      x="21.4688"
                      y="434.988"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2321_328"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2321_328"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_2321_328"
                      x1="10.1152"
                      y1="18.4226"
                      x2="789.322"
                      y2="18.4226"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#AABAE2" />
                      <stop offset="1" stop-color="#859CD6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            ) : (
              <div style={{ zIndex: "103" }}>
                <svg
                  className="curtain"
                  width="799"
                  height="489"
                  viewBox="0 0 799 489"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_2398_438)">
                    <rect
                      x="9.98438"
                      y="5.40625"
                      width="779.207"
                      height="24.2046"
                      rx="12.1023"
                      fill="url(#paint0_linear_2398_438)"
                    />
                    <g filter="url(#filter1_b_2398_438)">
                      <path
                        d="M25.3379 29.6108H775.986V55.551C775.986 58.3124 773.748 60.551 770.986 60.551H30.3379C27.5765 60.551 25.3379 58.3124 25.3379 55.551V29.6108Z"
                        fill="#9386AB"
                        fill-opacity="0.42"
                      />
                    </g>
                    <g filter="url(#filter2_b_2398_438)">
                      <rect
                        x="25.3379"
                        y="74.9956"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#9386AB"
                        fill-opacity="0.42"
                      />
                    </g>
                    <g filter="url(#filter3_b_2398_438)">
                      <rect
                        x="25.3379"
                        y="120.38"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#9386AB"
                        fill-opacity="0.42"
                      />
                    </g>
                    <g filter="url(#filter4_b_2398_438)">
                      <rect
                        x="25.3379"
                        y="165.765"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#9386AB"
                        fill-opacity="0.42"
                      />
                    </g>
                    <g filter="url(#filter5_b_2398_438)">
                      <rect
                        x="25.3379"
                        y="211.15"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#9386AB"
                        fill-opacity="0.42"
                      />
                    </g>
                    <g filter="url(#filter6_b_2398_438)">
                      <rect
                        x="25.3379"
                        y="256.535"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#9386AB"
                        fill-opacity="0.42"
                      />
                    </g>
                    <g filter="url(#filter7_b_2398_438)">
                      <rect
                        x="25.3379"
                        y="301.919"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#9386AB"
                        fill-opacity="0.42"
                      />
                    </g>
                    <g filter="url(#filter8_b_2398_438)">
                      <rect
                        x="25.3379"
                        y="347.304"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#9386AB"
                        fill-opacity="0.42"
                      />
                    </g>
                    <g filter="url(#filter9_b_2398_438)">
                      <rect
                        x="25.3379"
                        y="392.689"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#9386AB"
                        fill-opacity="0.42"
                      />
                    </g>
                    <g filter="url(#filter10_b_2398_438)">
                      <rect
                        x="25.3379"
                        y="438.074"
                        width="750.648"
                        height="30.9402"
                        rx="5"
                        fill="#9386AB"
                        fill-opacity="0.42"
                      />
                    </g>
                    <path
                      d="M51.4375 29.6108H57.3496V472.471C57.3496 474.104 56.0261 475.427 54.3936 475.427C52.761 475.427 51.4375 474.104 51.4375 472.471V29.6108Z"
                      fill="#483961"
                      fill-opacity="0.2"
                    />
                    <path
                      d="M400.662 29.6108H406.574V472.471C406.574 474.104 405.251 475.427 403.618 475.427C401.986 475.427 400.662 474.104 400.662 472.471V29.6108Z"
                      fill="#483961"
                      fill-opacity="0.2"
                    />
                    <path
                      d="M741.201 29.6108H747.113V472.471C747.113 474.104 745.79 475.427 744.157 475.427C742.525 475.427 741.201 474.104 741.201 472.471V29.6108Z"
                      fill="#483961"
                      fill-opacity="0.2"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2398_438"
                      x="0.584375"
                      y="0.00625038"
                      width="798.007"
                      height="488.821"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="4.7" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.262156 0 0 0 0 0.159965 0 0 0 0 0.39579 0 0 0 0.35 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2398_438"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2398_438"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_b_2398_438"
                      x="21.3379"
                      y="25.6108"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2398_438"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2398_438"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter2_b_2398_438"
                      x="21.3379"
                      y="70.9956"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2398_438"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2398_438"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter3_b_2398_438"
                      x="21.3379"
                      y="116.38"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2398_438"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2398_438"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter4_b_2398_438"
                      x="21.3379"
                      y="161.765"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2398_438"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2398_438"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter5_b_2398_438"
                      x="21.3379"
                      y="207.15"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2398_438"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2398_438"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter6_b_2398_438"
                      x="21.3379"
                      y="252.535"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2398_438"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2398_438"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter7_b_2398_438"
                      x="21.3379"
                      y="297.919"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2398_438"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2398_438"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter8_b_2398_438"
                      x="21.3379"
                      y="343.304"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2398_438"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2398_438"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter9_b_2398_438"
                      x="21.3379"
                      y="388.689"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2398_438"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2398_438"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter10_b_2398_438"
                      x="21.3379"
                      y="434.074"
                      width="758.648"
                      height="38.9399"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_2398_438"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_2398_438"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_2398_438"
                      x1="9.98438"
                      y1="17.5086"
                      x2="789.191"
                      y2="17.5086"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3D2861" />
                      <stop offset="1" stop-color="#140E4A" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
          </>
        )}

        {decoClick === "Star" && (
          <>
            {currentMode ? (
              <div style={{ zIndex: "103" }}>
                <svg
                  className="curtain"
                  width="1650"
                  height="620"
                  viewBox="0 0 1650 620"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_2420_595)">
                    <path
                      d="M741.302 161.399L746.049 170.472L755.585 174.989L746.049 179.505L741.302 188.578L736.555 179.505L727.019 174.989L736.555 170.472L741.302 161.399Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter1_d_2420_595)">
                    <path
                      d="M1617.45 146.686L1622.19 155.759L1631.73 160.275L1622.19 164.791L1617.45 173.864L1612.7 164.791L1603.16 160.275L1612.7 155.759L1617.45 146.686Z"
                      fill="white"
                    />
                  </g>
                  <g filter="url(#filter2_d_2420_595)">
                    <path
                      d="M593.834 37.5273L598.581 46.6002L608.118 51.1165L598.581 55.6327L593.834 64.7056L589.087 55.6327L579.551 51.1165L589.087 46.6002L593.834 37.5273Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter3_d_2420_595)">
                    <path
                      d="M765.132 188.577L769.879 197.65L779.415 202.166L769.879 206.682L765.132 215.755L760.385 206.682L750.849 202.166L760.385 197.65L765.132 188.577Z"
                      fill="white"
                      fill-opacity="0.8"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter4_d_2420_595)">
                    <path
                      d="M1611.32 270.687L1616.07 279.759L1625.61 284.276L1616.07 288.792L1611.32 297.865L1606.58 288.792L1597.04 284.276L1606.58 279.759L1611.32 270.687Z"
                      fill="white"
                    />
                  </g>
                  <g filter="url(#filter5_d_2420_595)">
                    <path
                      d="M691.03 297.864L695.776 306.937L705.313 311.453L695.776 315.97L691.03 325.042L686.283 315.97L676.746 311.453L686.283 306.937L691.03 297.864Z"
                      fill="white"
                      fill-opacity="0.8"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter6_d_2420_595)">
                    <path
                      d="M658.849 396.287L663.596 405.36L673.132 409.876L663.596 414.392L658.849 423.465L654.102 414.392L644.565 409.876L654.102 405.36L658.849 396.287Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter7_d_2420_595)">
                    <path
                      d="M232.086 39.4619L236.833 48.5348L246.37 53.051L236.833 57.5672L232.086 66.6401L227.339 57.5672L217.803 53.051L227.339 48.5348L232.086 39.4619Z"
                      fill="white"
                    />
                  </g>
                  <g filter="url(#filter8_d_2420_595)">
                    <path
                      d="M1095.16 39.4619L1099.06 46.9272L1106.91 50.6432L1099.06 54.3592L1095.16 61.8245L1091.25 54.3592L1083.41 50.6432L1091.25 46.9272L1095.16 39.4619Z"
                      fill="white"
                    />
                  </g>
                  <g filter="url(#filter9_d_2420_595)">
                    <path
                      d="M292.14 14.0195L296.046 21.4848L303.893 25.2008L296.046 28.9168L292.14 36.3821L288.234 28.9168L280.388 25.2008L288.234 21.4848L292.14 14.0195Z"
                      fill="white"
                    />
                  </g>
                  <g filter="url(#filter10_d_2420_595)">
                    <path
                      d="M878.366 12.2837L883.113 21.3566L892.65 25.8728L883.113 30.389L878.366 39.4619L873.619 30.389L864.083 25.8728L873.619 21.3566L878.366 12.2837Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter11_d_2420_595)">
                    <path
                      d="M808.618 76.9653L811.706 82.8675L817.91 85.8054L811.706 88.7433L808.618 94.6455L805.53 88.7433L799.326 85.8054L805.53 82.8675L808.618 76.9653Z"
                      fill="white"
                      fill-opacity="0.8"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter12_d_2420_595)">
                    <path
                      d="M1625.61 64.3877L1628.69 70.2899L1634.9 73.2278L1628.69 76.1657L1625.61 82.0679L1622.52 76.1657L1616.31 73.2278L1622.52 70.2899L1625.61 64.3877Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter13_d_2420_595)">
                    <path
                      d="M776.846 123.312L779.934 129.214L786.138 132.152L779.934 135.09L776.846 140.992L773.758 135.09L767.555 132.152L773.758 129.214L776.846 123.312Z"
                      fill="white"
                      fill-opacity="0.8"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter14_d_2420_595)">
                    <path
                      d="M1602.03 110.734L1605.12 116.637L1611.32 119.574L1605.12 122.512L1602.03 128.415L1598.94 122.512L1592.74 119.574L1598.94 116.637L1602.03 110.734Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter15_d_2420_595)">
                    <path
                      d="M21.8582 504.072L24.9462 509.974L31.1499 512.912L24.9462 515.85L21.8582 521.752L18.7701 515.85L12.5664 512.912L18.7701 509.974L21.8582 504.072Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter16_d_2420_595)">
                    <path
                      d="M289.679 409.876L292.767 415.778L298.971 418.716L292.767 421.654L289.679 427.556L286.591 421.654L280.388 418.716L286.591 415.778L289.679 409.876Z"
                      fill="white"
                    />
                  </g>
                  <g filter="url(#filter17_d_2420_595)">
                    <path
                      d="M1062.74 36.3823L1065.82 42.2845L1072.03 45.2224L1065.82 48.1603L1062.74 54.0625L1059.65 48.1603L1053.44 45.2224L1059.65 42.2845L1062.74 36.3823Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter18_d_2420_595)">
                    <path
                      d="M1305.95 19.8467L1309.04 25.7489L1315.24 28.6868L1309.04 31.6247L1305.95 37.5269L1302.86 31.6247L1296.66 28.6868L1302.86 25.7489L1305.95 19.8467Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter19_d_2420_595)">
                    <path
                      d="M740.238 24.8613L745.338 34.6096L755.585 39.4619L745.338 44.3143L740.238 54.0625L735.138 44.3143L724.892 39.4619L735.138 34.6096L740.238 24.8613Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter20_d_2420_595)">
                    <path
                      d="M1557.23 12.2837L1562.33 22.0319L1572.57 26.8843L1562.33 31.7366L1557.23 41.4849L1552.13 31.7366L1541.88 26.8843L1552.13 22.0319L1557.23 12.2837Z"
                      fill="white"
                    />
                  </g>
                  <g filter="url(#filter21_d_2420_595)">
                    <path
                      d="M1480.22 31.7002L1485.32 41.4484L1495.57 46.3008L1485.32 51.1531L1480.22 60.9014L1475.12 51.1531L1464.88 46.3008L1475.12 41.4484L1480.22 31.7002Z"
                      fill="white"
                    />
                  </g>
                  <g filter="url(#filter22_d_2420_595)">
                    <path
                      d="M1609.18 578.292L1614.28 588.04L1624.53 592.893L1614.28 597.745L1609.18 607.493L1604.08 597.745L1593.83 592.893L1604.08 588.04L1609.18 578.292Z"
                      fill="white"
                    />
                  </g>
                  <g filter="url(#filter23_d_2420_595)">
                    <path
                      d="M671.451 140.859L673.487 144.749L677.576 146.686L673.487 148.623L671.451 152.513L669.416 148.623L665.326 146.686L669.416 144.749L671.451 140.859Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter24_d_2420_595)">
                    <path
                      d="M437.157 50.1699L439.193 54.0605L443.282 55.9971L439.193 57.9337L437.157 61.8242L435.122 57.9337L431.032 55.9971L435.122 54.0605L437.157 50.1699Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter25_d_2420_595)">
                    <path
                      d="M720.893 107.577L722.929 111.467L727.018 113.404L722.929 115.34L720.893 119.231L718.858 115.34L714.769 113.404L718.858 111.467L720.893 107.577Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter26_d_2420_595)">
                    <path
                      d="M941.625 27.8076L943.66 31.6982L947.75 33.6348L943.66 35.5714L941.625 39.4619L939.589 35.5714L935.5 33.6348L939.589 31.6982L941.625 27.8076Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter27_d_2420_595)">
                    <path
                      d="M711.437 129.205L713.473 133.095L717.562 135.032L713.473 136.968L711.437 140.859L709.402 136.968L705.312 135.032L709.402 133.095L711.437 129.205Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter28_d_2420_595)">
                    <path
                      d="M960.23 42.4082L962.266 46.2988L966.355 48.2354L962.266 50.1719L960.23 54.0625L958.195 50.1719L954.105 48.2354L958.195 46.2988L960.23 42.4082Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter29_d_2420_595)">
                    <path
                      d="M708.643 246.592L710.679 250.482L714.768 252.419L710.679 254.356L708.643 258.246L706.608 254.356L702.519 252.419L706.608 250.482L708.643 246.592Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter30_d_2420_595)">
                    <path
                      d="M1602.03 217.257L1604.07 221.148L1608.16 223.084L1604.07 225.021L1602.03 228.912L1600 225.021L1595.91 223.084L1600 221.148L1602.03 217.257Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter31_d_2420_595)">
                    <path
                      d="M1606.08 388.207L1608.12 392.098L1612.21 394.034L1608.12 395.971L1606.08 399.861L1604.05 395.971L1599.96 394.034L1604.05 392.098L1606.08 388.207Z"
                      fill="white"
                    />
                  </g>
                  <g filter="url(#filter32_d_2420_595)">
                    <path
                      d="M1619.48 404.049L1621.51 407.939L1625.6 409.876L1621.51 411.813L1619.48 415.703L1617.44 411.813L1613.35 409.876L1617.44 407.939L1619.48 404.049Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter33_d_2420_595)">
                    <path
                      d="M1606.08 510.001L1608.12 513.892L1612.21 515.829L1608.12 517.765L1606.08 521.656L1604.05 517.765L1599.96 515.829L1604.05 513.892L1606.08 510.001Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter34_d_2420_595)">
                    <path
                      d="M316.586 427.557L318.621 431.447L322.711 433.384L318.621 435.32L316.586 439.211L314.55 435.32L310.461 433.384L314.55 431.447L316.586 427.557Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter35_d_2420_595)">
                    <path
                      d="M1126.46 19.0342L1128.5 22.9247L1132.58 24.8613L1128.5 26.7979L1126.46 30.6885L1124.42 26.7979L1120.33 24.8613L1124.42 22.9247L1126.46 19.0342Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter36_d_2420_595)">
                    <path
                      d="M1264.24 25.873L1266.28 29.7636L1270.37 31.7002L1266.28 33.6368L1264.24 37.5273L1262.21 33.6368L1258.12 31.7002L1262.21 29.7636L1264.24 25.873Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter37_d_2420_595)">
                    <path
                      d="M1185.49 42.4082L1187.52 46.2988L1191.61 48.2354L1187.52 50.1719L1185.49 54.0625L1183.45 50.1719L1179.36 48.2354L1183.45 46.2988L1185.49 42.4082Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter38_d_2420_595)">
                    <path
                      d="M1382.4 48.2354L1384.44 52.1259L1388.53 54.0625L1384.44 55.9991L1382.4 59.8896L1380.37 55.9991L1376.28 54.0625L1380.37 52.1259L1382.4 48.2354Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter39_d_2420_595)">
                    <path
                      d="M786.14 297.864L788.175 301.755L792.264 303.691L788.175 305.628L786.14 309.519L784.104 305.628L780.015 303.691L784.104 301.755L786.14 297.864Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter40_d_2420_595)">
                    <path
                      d="M814.742 234.938L816.778 238.828L820.867 240.765L816.778 242.701L814.742 246.592L812.707 242.701L808.617 240.765L812.707 238.828L814.742 234.938Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter41_d_2420_595)">
                    <path
                      d="M1631.73 222.36L1633.77 226.25L1637.86 228.187L1633.77 230.124L1631.73 234.014L1629.69 230.124L1625.61 228.187L1629.69 226.25L1631.73 222.36Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter42_d_2420_595)">
                    <path
                      d="M195.457 492.418L197.492 496.309L201.582 498.245L197.492 500.182L195.457 504.072L193.421 500.182L189.332 498.245L193.421 496.309L195.457 492.418Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter43_d_2420_595)">
                    <path
                      d="M765.132 309.519L767.167 313.409L771.257 315.346L767.167 317.282L765.132 321.173L763.096 317.282L759.007 315.346L763.096 313.409L765.132 309.519Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter44_d_2420_595)">
                    <path
                      d="M723.687 404.049L725.723 407.939L729.812 409.876L725.723 411.813L723.687 415.703L721.652 411.813L717.562 409.876L721.652 407.939L723.687 404.049Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter45_d_2420_595)">
                    <path
                      d="M496.938 27.8076L498.974 31.6982L503.063 33.6348L498.974 35.5714L496.938 39.4619L494.903 35.5714L490.813 33.6348L494.903 31.6982L496.938 27.8076Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter46_d_2420_595)">
                    <path
                      d="M650.691 358.124L652.727 362.015L656.816 363.951L652.727 365.888L650.691 369.778L648.656 365.888L644.566 363.951L648.656 362.015L650.691 358.124Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter47_d_2420_595)">
                    <path
                      d="M521.183 423.465L523.219 427.356L527.308 429.292L523.219 431.229L521.183 435.12L519.148 431.229L515.059 429.292L519.148 427.356L521.183 423.465Z"
                      fill="white"
                    />
                  </g>
                  <g filter="url(#filter48_d_2420_595)">
                    <path
                      d="M71.4364 439.211L73.4719 443.101L77.5613 445.038L73.4719 446.975L71.4364 450.865L69.4009 446.975L65.3115 445.038L69.4009 443.101L71.4364 439.211Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter49_d_2420_595)">
                    <path
                      d="M407.013 425.4L409.048 429.291L413.137 431.228L409.048 433.164L407.013 437.055L404.977 433.164L400.888 431.228L404.977 429.291L407.013 425.4Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter50_d_2420_595)">
                    <path
                      d="M798.389 413.746L800.424 417.637L804.513 419.573L800.424 421.51L798.389 425.4L796.353 421.51L792.264 419.573L796.353 417.637L798.389 413.746Z"
                      fill="white"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2420_595"
                      x="715.019"
                      y="149.399"
                      width="52.5664"
                      height="51.1782"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_d_2420_595"
                      x="1591.16"
                      y="134.686"
                      width="52.5664"
                      height="51.1782"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter2_d_2420_595"
                      x="567.551"
                      y="25.5273"
                      width="52.5664"
                      height="51.1782"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter3_d_2420_595"
                      x="738.849"
                      y="176.577"
                      width="52.5664"
                      height="51.1782"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter4_d_2420_595"
                      x="1585.04"
                      y="258.687"
                      width="52.5664"
                      height="51.1782"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter5_d_2420_595"
                      x="664.746"
                      y="285.864"
                      width="52.5664"
                      height="51.1782"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter6_d_2420_595"
                      x="632.565"
                      y="384.287"
                      width="52.5664"
                      height="51.1782"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter7_d_2420_595"
                      x="205.803"
                      y="27.4619"
                      width="52.5664"
                      height="51.1782"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter8_d_2420_595"
                      x="1071.41"
                      y="27.4619"
                      width="47.5049"
                      height="46.3623"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter9_d_2420_595"
                      x="268.388"
                      y="2.01953"
                      width="47.5049"
                      height="46.3623"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter10_d_2420_595"
                      x="852.083"
                      y="0.283691"
                      width="52.5664"
                      height="51.1782"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter11_d_2420_595"
                      x="787.326"
                      y="64.9653"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter12_d_2420_595"
                      x="1604.31"
                      y="52.3877"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter13_d_2420_595"
                      x="755.555"
                      y="111.312"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter14_d_2420_595"
                      x="1580.74"
                      y="98.7344"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter15_d_2420_595"
                      x="0.566406"
                      y="492.072"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter16_d_2420_595"
                      x="268.388"
                      y="397.876"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter17_d_2420_595"
                      x="1041.44"
                      y="24.3823"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter18_d_2420_595"
                      x="1284.66"
                      y="7.84668"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter19_d_2420_595"
                      x="712.892"
                      y="12.8613"
                      width="54.6934"
                      height="53.2012"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter20_d_2420_595"
                      x="1529.88"
                      y="0.283691"
                      width="54.6934"
                      height="53.2012"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter21_d_2420_595"
                      x="1452.88"
                      y="19.7002"
                      width="54.6934"
                      height="53.2012"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter22_d_2420_595"
                      x="1581.83"
                      y="566.292"
                      width="54.6934"
                      height="53.2012"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter23_d_2420_595"
                      x="653.326"
                      y="128.859"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter24_d_2420_595"
                      x="419.032"
                      y="38.1699"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter25_d_2420_595"
                      x="702.769"
                      y="95.5767"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter26_d_2420_595"
                      x="923.5"
                      y="15.8076"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter27_d_2420_595"
                      x="693.312"
                      y="117.205"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter28_d_2420_595"
                      x="942.105"
                      y="30.4082"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter29_d_2420_595"
                      x="690.519"
                      y="234.592"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter30_d_2420_595"
                      x="1583.91"
                      y="205.257"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter31_d_2420_595"
                      x="1587.96"
                      y="376.207"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter32_d_2420_595"
                      x="1601.35"
                      y="392.049"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter33_d_2420_595"
                      x="1587.96"
                      y="498.001"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter34_d_2420_595"
                      x="298.461"
                      y="415.557"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter35_d_2420_595"
                      x="1108.33"
                      y="7.03418"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter36_d_2420_595"
                      x="1246.12"
                      y="13.873"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter37_d_2420_595"
                      x="1167.36"
                      y="30.4082"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter38_d_2420_595"
                      x="1364.28"
                      y="36.2354"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter39_d_2420_595"
                      x="768.015"
                      y="285.864"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter40_d_2420_595"
                      x="796.617"
                      y="222.938"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter41_d_2420_595"
                      x="1613.61"
                      y="210.36"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter42_d_2420_595"
                      x="177.332"
                      y="480.418"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter43_d_2420_595"
                      x="747.007"
                      y="297.519"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter44_d_2420_595"
                      x="705.562"
                      y="392.049"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter45_d_2420_595"
                      x="478.813"
                      y="15.8076"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter46_d_2420_595"
                      x="632.566"
                      y="346.124"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter47_d_2420_595"
                      x="503.059"
                      y="411.465"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter48_d_2420_595"
                      x="53.3115"
                      y="427.211"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter49_d_2420_595"
                      x="388.888"
                      y="413.4"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter50_d_2420_595"
                      x="780.264"
                      y="401.746"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_595"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_595"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
            ) : (
              <div style={{ zIndex: "103" }}>
                <svg
                  className="curtain"
                  width="1650"
                  height="534"
                  viewBox="0 0 1650 534"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_2420_650)">
                    <path
                      d="M1617.15 146.484L1621.89 155.557L1631.43 160.073L1621.89 164.59L1617.15 173.663L1612.4 164.59L1602.86 160.073L1612.4 155.557L1617.15 146.484Z"
                      fill="#E3CEFF"
                    />
                  </g>
                  <g filter="url(#filter1_d_2420_650)">
                    <path
                      d="M593.534 37.3257L598.281 46.3986L607.818 50.9148L598.281 55.431L593.534 64.5039L588.787 55.431L579.251 50.9148L588.787 46.3986L593.534 37.3257Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter2_d_2420_650)">
                    <path
                      d="M764.831 188.375L769.578 197.448L779.115 201.965L769.578 206.481L764.831 215.554L760.084 206.481L750.548 201.965L760.084 197.448L764.831 188.375Z"
                      fill="#E5B8FF"
                      fill-opacity="0.8"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter3_d_2420_650)">
                    <path
                      d="M878.066 12.082L882.813 21.1549L892.349 25.6711L882.813 30.1874L878.066 39.2603L873.319 30.1874L863.782 25.6711L873.319 21.1549L878.066 12.082Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter4_d_2420_650)">
                    <path
                      d="M808.317 76.7637L811.405 82.6658L817.609 85.6038L811.405 88.5417L808.317 94.4438L805.229 88.5417L799.025 85.6038L805.229 82.6658L808.317 76.7637Z"
                      fill="#E5B8FF"
                      fill-opacity="0.8"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter5_d_2420_650)">
                    <path
                      d="M1625.3 64.186L1628.39 70.0882L1634.6 73.0261L1628.39 75.964L1625.3 81.8662L1622.22 75.964L1616.01 73.0261L1622.22 70.0882L1625.3 64.186Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter6_d_2420_650)">
                    <path
                      d="M776.546 123.11L779.634 129.013L785.837 131.95L779.634 134.888L776.546 140.791L773.458 134.888L767.254 131.95L773.458 129.013L776.546 123.11Z"
                      fill="#E5B8FF"
                      fill-opacity="0.8"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter7_d_2420_650)">
                    <path
                      d="M1601.73 110.533L1604.82 116.435L1611.02 119.373L1604.82 122.311L1601.73 128.213L1598.64 122.311L1592.44 119.373L1598.64 116.435L1601.73 110.533Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter8_d_2420_650)">
                    <path
                      d="M21.5574 503.871L24.6454 509.773L30.8491 512.711L24.6454 515.649L21.5574 521.551L18.4694 515.649L12.2656 512.711L18.4694 509.773L21.5574 503.871Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter9_d_2420_650)">
                    <path
                      d="M289.379 409.674L292.467 415.576L298.67 418.514L292.467 421.452L289.379 427.354L286.291 421.452L280.087 418.514L286.291 415.576L289.379 409.674Z"
                      fill="#E3CEFF"
                    />
                  </g>
                  <g filter="url(#filter10_d_2420_650)">
                    <path
                      d="M1305.65 19.645L1308.74 25.5472L1314.94 28.4851L1308.74 31.423L1305.65 37.3252L1302.56 31.423L1296.36 28.4851L1302.56 25.5472L1305.65 19.645Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter11_d_2420_650)">
                    <path
                      d="M739.937 24.6597L745.038 34.4079L755.284 39.2603L745.038 44.1126L739.937 53.8608L734.837 44.1126L724.591 39.2603L734.837 34.4079L739.937 24.6597Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter12_d_2420_650)">
                    <path
                      d="M1556.92 12.082L1562.02 21.8303L1572.27 26.6826L1562.02 31.535L1556.92 41.2832L1551.82 31.535L1541.58 26.6826L1551.82 21.8303L1556.92 12.082Z"
                      fill="#E3CEFF"
                    />
                  </g>
                  <g filter="url(#filter13_d_2420_650)">
                    <path
                      d="M1479.92 31.4985L1485.02 41.2468L1495.27 46.0991L1485.02 50.9515L1479.92 60.6997L1474.82 50.9515L1464.58 46.0991L1474.82 41.2468L1479.92 31.4985Z"
                      fill="#E3CEFF"
                    />
                  </g>
                  <g filter="url(#filter14_d_2420_650)">
                    <path
                      d="M436.856 49.9683L438.892 53.8588L442.981 55.7954L438.892 57.732L436.856 61.6226L434.821 57.732L430.731 55.7954L434.821 53.8588L436.856 49.9683Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter15_d_2420_650)">
                    <path
                      d="M720.593 107.375L722.628 111.266L726.718 113.202L722.628 115.139L720.593 119.029L718.557 115.139L714.468 113.202L718.557 111.266L720.593 107.375Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter16_d_2420_650)">
                    <path
                      d="M941.324 27.606L943.36 31.4965L947.449 33.4331L943.36 35.3697L941.324 39.2603L939.289 35.3697L935.199 33.4331L939.289 31.4965L941.324 27.606Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter17_d_2420_650)">
                    <path
                      d="M959.93 42.2065L961.965 46.0971L966.054 48.0337L961.965 49.9703L959.93 53.8608L957.894 49.9703L953.805 48.0337L957.894 46.0971L959.93 42.2065Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter18_d_2420_650)">
                    <path
                      d="M708.343 246.39L710.378 250.281L714.468 252.217L710.378 254.154L708.343 258.044L706.307 254.154L702.218 252.217L706.307 250.281L708.343 246.39Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter19_d_2420_650)">
                    <path
                      d="M1608.99 315.144L1611.02 319.035L1615.11 320.971L1611.02 322.908L1608.99 326.798L1606.95 322.908L1602.86 320.971L1606.95 319.035L1608.99 315.144Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter20_d_2420_650)">
                    <path
                      d="M316.285 427.355L318.321 431.246L322.41 433.182L318.321 435.119L316.285 439.009L314.249 435.119L310.16 433.182L314.249 431.246L316.285 427.355Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter21_d_2420_650)">
                    <path
                      d="M1126.16 18.8325L1128.19 22.7231L1132.28 24.6597L1128.19 26.5963L1126.16 30.4868L1124.12 26.5963L1120.03 24.6597L1124.12 22.7231L1126.16 18.8325Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter22_d_2420_650)">
                    <path
                      d="M1263.94 25.6714L1265.98 29.5619L1270.07 31.4985L1265.98 33.4351L1263.94 37.3257L1261.91 33.4351L1257.82 31.4985L1261.91 29.5619L1263.94 25.6714Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter23_d_2420_650)">
                    <path
                      d="M1185.19 42.2065L1187.22 46.0971L1191.31 48.0337L1187.22 49.9703L1185.19 53.8608L1183.15 49.9703L1179.06 48.0337L1183.15 46.0971L1185.19 42.2065Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter24_d_2420_650)">
                    <path
                      d="M1382.1 48.0337L1384.14 51.9242L1388.23 53.8608L1384.14 55.7974L1382.1 59.688L1380.06 55.7974L1375.98 53.8608L1380.06 51.9242L1382.1 48.0337Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter25_d_2420_650)">
                    <path
                      d="M785.839 297.663L787.874 301.553L791.964 303.49L787.874 305.426L785.839 309.317L783.803 305.426L779.714 303.49L783.803 301.553L785.839 297.663Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter26_d_2420_650)">
                    <path
                      d="M814.441 234.736L816.477 238.626L820.566 240.563L816.477 242.5L814.441 246.39L812.406 242.5L808.316 240.563L812.406 238.626L814.441 234.736Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter27_d_2420_650)">
                    <path
                      d="M1631.43 222.158L1633.47 226.049L1637.55 227.985L1633.47 229.922L1631.43 233.812L1629.39 229.922L1625.3 227.985L1629.39 226.049L1631.43 222.158Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter28_d_2420_650)">
                    <path
                      d="M195.156 492.216L197.192 496.107L201.281 498.043L197.192 499.98L195.156 503.871L193.121 499.98L189.031 498.043L193.121 496.107L195.156 492.216Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter29_d_2420_650)">
                    <path
                      d="M764.831 309.317L766.866 313.207L770.956 315.144L766.866 317.081L764.831 320.971L762.795 317.081L758.706 315.144L762.795 313.207L764.831 309.317Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter30_d_2420_650)">
                    <path
                      d="M723.387 403.847L725.422 407.738L729.511 409.674L725.422 411.611L723.387 415.501L721.351 411.611L717.262 409.674L721.351 407.738L723.387 403.847Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter31_d_2420_650)">
                    <path
                      d="M496.638 27.606L498.673 31.4965L502.762 33.4331L498.673 35.3697L496.638 39.2603L494.602 35.3697L490.513 33.4331L494.602 31.4965L496.638 27.606Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter32_d_2420_650)">
                    <path
                      d="M650.391 357.922L652.426 361.813L656.515 363.75L652.426 365.686L650.391 369.577L648.355 365.686L644.266 363.75L648.355 361.813L650.391 357.922Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter33_d_2420_650)">
                    <path
                      d="M71.1356 439.009L73.1712 442.9L77.2605 444.836L73.1712 446.773L71.1356 450.664L69.1001 446.773L65.0107 444.836L69.1001 442.9L71.1356 439.009Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter34_d_2420_650)">
                    <path
                      d="M406.712 425.199L408.747 429.089L412.837 431.026L408.747 432.962L406.712 436.853L404.676 432.962L400.587 431.026L404.676 429.089L406.712 425.199Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <g filter="url(#filter35_d_2420_650)">
                    <path
                      d="M798.088 413.544L800.123 417.435L804.213 419.372L800.123 421.308L798.088 425.199L796.052 421.308L791.963 419.372L796.052 417.435L798.088 413.544Z"
                      fill="#DBBCFF"
                      fill-opacity="0.5"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2420_650"
                      x="1590.86"
                      y="134.484"
                      width="52.5664"
                      height="51.1782"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_d_2420_650"
                      x="567.251"
                      y="25.3257"
                      width="52.5664"
                      height="51.1782"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter2_d_2420_650"
                      x="738.548"
                      y="176.375"
                      width="52.5664"
                      height="51.1782"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter3_d_2420_650"
                      x="851.782"
                      y="0.0820312"
                      width="52.5664"
                      height="51.1782"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter4_d_2420_650"
                      x="787.025"
                      y="64.7637"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter5_d_2420_650"
                      x="1604.01"
                      y="52.186"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter6_d_2420_650"
                      x="755.254"
                      y="111.11"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter7_d_2420_650"
                      x="1580.44"
                      y="98.5327"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter8_d_2420_650"
                      x="0.265625"
                      y="491.871"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter9_d_2420_650"
                      x="268.087"
                      y="397.674"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter10_d_2420_650"
                      x="1284.36"
                      y="7.64502"
                      width="42.584"
                      height="41.6802"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter11_d_2420_650"
                      x="712.591"
                      y="12.6597"
                      width="54.6934"
                      height="53.2012"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter12_d_2420_650"
                      x="1529.58"
                      y="0.0820312"
                      width="54.6934"
                      height="53.2012"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter13_d_2420_650"
                      x="1452.58"
                      y="19.4985"
                      width="54.6934"
                      height="53.2012"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter14_d_2420_650"
                      x="418.731"
                      y="37.9683"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter15_d_2420_650"
                      x="702.468"
                      y="95.375"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter16_d_2420_650"
                      x="923.199"
                      y="15.606"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter17_d_2420_650"
                      x="941.805"
                      y="30.2065"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter18_d_2420_650"
                      x="690.218"
                      y="234.39"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter19_d_2420_650"
                      x="1590.86"
                      y="303.144"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter20_d_2420_650"
                      x="298.16"
                      y="415.355"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter21_d_2420_650"
                      x="1108.03"
                      y="6.83252"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter22_d_2420_650"
                      x="1245.82"
                      y="13.6714"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter23_d_2420_650"
                      x="1167.06"
                      y="30.2065"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter24_d_2420_650"
                      x="1363.98"
                      y="36.0337"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter25_d_2420_650"
                      x="767.714"
                      y="285.663"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter26_d_2420_650"
                      x="796.316"
                      y="222.736"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter27_d_2420_650"
                      x="1613.3"
                      y="210.158"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter28_d_2420_650"
                      x="177.031"
                      y="480.216"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter29_d_2420_650"
                      x="746.706"
                      y="297.317"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter30_d_2420_650"
                      x="705.262"
                      y="391.847"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter31_d_2420_650"
                      x="478.513"
                      y="15.606"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter32_d_2420_650"
                      x="632.266"
                      y="345.922"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter33_d_2420_650"
                      x="53.0107"
                      y="427.009"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter34_d_2420_650"
                      x="388.587"
                      y="413.199"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter35_d_2420_650"
                      x="779.963"
                      y="401.544"
                      width="36.25"
                      height="35.6543"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2420_650"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2420_650"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
            )}
          </>
        )}
        {/* SVG 렌더링 */}
        {currentMode ? (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1916 1080"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_397_66)">
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
                fillRule="evenodd"
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
                fillRule="evenodd"
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
                onClick={ClickBulletin}
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
                    setCurrentMode(!currentMode);
                  }, 3950);
                }}
                fillRule="evenodd"
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
                fillRule="evenodd"
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
                fillRule="evenodd"
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
                id="#desktop-bottom"
                ref={desktopRef}
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
              <g clipPath="url(#clip1_397_66)">
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
            viewBox="0 0 1920 1080"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2072_1393)">
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
                fillRule="evenodd"
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
                onClick={ClickBulletin}
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
                fillRule="evenodd"
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
                fillRule="evenodd"
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
                    setCurrentMode(!currentMode);
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
                fillRule="evenodd"
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
                ref={desktopNightRef}
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
              <g clipPath="url(#clip1_2072_1393)">
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

              <g filter="url(#filter1_f_2072_1393)" pointerEvents="none">
                <path
                  pointerEvents="none"
                  style={{ visibility: animation ? "visible" : "hidden" }}
                  d="M493.457 922.229L275.599 352.991L401.544 197.014L1918.73 922.229H493.457Z"
                  fill="url(#paint13_linear_2072_1393)"
                  fillOpacity="0.5"
                />
              </g>
              <path
                pointerEvents="none"
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
                {decoClick === "Blue" ? (
                  <>
                    <stop stopColor="#A1ABFF" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#868CFF" stopOpacity="0" />
                  </>
                ) : decoClick === "Yellow" ? (
                  <>
                    <stop stop-color="#FFB5AC" stop-opacity="0.6" />
                    <stop offset="1" stop-color="#FFEADF" stop-opacity="0" />
                  </>
                ) : decoClick === "White" ? (
                  <>
                    <stop stop-color="white" stop-opacity="0.6" />
                    <stop offset="1" stop-color="white" stop-opacity="0" />
                  </>
                ) : (
                  // Default condition
                  <>
                    <stop stopColor="#FFB5AC" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#FFEADF" stopOpacity="0" />
                  </>
                )}

                {/* <stop stopColor="#FFB5AC" stopOpacity="0.6" />
                <stop offset="1" stopColor="#FFEADF" stopOpacity="0" /> */}
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
