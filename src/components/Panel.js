import React, { useState, useRef, useEffect, forwardRef } from "react";
import { FiEdit } from "react-icons/fi";
import Group43 from "../assets/Group 43.png";
import Group43N from "../assets/Group 43-n.png";
import Union from "../assets/Union.png";
import UnionN from "../assets/UnionN.png";
import LeftVector from "../assets/LeftVector.png";
import "../styles/Panel.css";
import yellowlight from "../assets/yellowlight.png";
import yellowlightN from "../assets/yellowlightN.png";
import whitelight from "../assets/whitelight.png";
import whitelightN from "../assets/whitelightN.png";
import bluelight from "../assets/bluelight.png";
import bluelightN from "../assets/bluelightN.png";
import blind from "../assets/blind.png";
import blindN from "../assets/blindN.png";
import decoRec from "../assets/decoRec.png";
import decoRecN from "../assets/decoRecN.png";
import ManyStar from "../assets/ManyStar.png";
import ManyStarN from "../assets/ManyStarN.png";
import modernBulletin from "../assets/modernBulletin.png";
import modernBulletinN from "../assets/modernBulletinN.png";
import modernCurtain from "../assets/modernCurtain.png";
import modernCurtainN from "../assets/modernCurtainN.png";
import randomBulletin from "../assets/randomBulletin.png";
import randomBulletinN from "../assets/randomBulletinN.png";

const Panel = forwardRef(
  (
    {
      mode,
      setDecoClick,
      isListVisible,
      LeftSettingtoggle,
      setIsListVisible,
      deco,
      setDeco,
    },
    ref
  ) => {
    //tag 관련
    const [activeTag, setActiveTag] = useState("");
    const [defaultTag, setdefaultTag] = useState(true);
    const [tagbutton, settagbutton] = useState(false); //태그버튼 눌렀을때 색변환
    const panelRef = useRef(null);

    const TagClick = (tag) => {
      setActiveTag(tag);
      setdefaultTag(false);
      settagbutton(true);
    };

    // 패널이 열릴 때 초기 상태로 리셋
    useEffect(() => {
      if (isListVisible) {
        setdefaultTag(true);
        setActiveTag("");
        settagbutton(false);
      }
    }, [isListVisible]); // 의존성 배열에 isListVisible 추가

    const backButtonClick = () => {
      setIsListVisible(false);
    };

    const modernCurtainF = () => {
      setDecoClick("curtain");
      localStorage.setItem("decoClick", "curtain");
    };

    const removeCurtain = () => {
      setDecoClick("");
      localStorage.setItem("decoClick", "");
    };

    const blindF = () => {
      setDecoClick("blind");
      localStorage.setItem("decoClick", "blind");
    };

    const StarF = () => {
      setDecoClick("Star");
      localStorage.setItem("decoClick", "Star");
    };

    const removeStar = () => {
      setDecoClick("");
      localStorage.setItem("decoClick", "");
    };

    const LightBlue = () => {
      setDecoClick("Blue");
      localStorage.setItem("decoClick", "Blue");
      console.log("blue");
    };
    const LightWhite = () => {
      setDecoClick("White");
      localStorage.setItem("decoClick", "White");
      console.log("white");
    };
    const LightYellow = () => {
      setDecoClick("Yellow");
      localStorage.setItem("decoClick", "Yellow");
      console.log("yellow");
    };

    return (
      <div ref={ref}>
        <FiEdit onClick={LeftSettingtoggle} style={{ cursor: "pointer" }} />
        <div className={`panel-total ${!mode ? "night" : ""}`}>
          <div
            ref={panelRef}
            className={`list-panel ${isListVisible ? "visible" : ""}`}
          >
            <div className="panel-topdiv">
              <p className="deskDesign">데스크 꾸미기</p>
              <img src={mode ? Group43 : Group43N} id="Group43" />
            </div>
            <div className="rowline1"></div>
            <div className="all-tag">
              <div
                className={`design-tag ${
                  activeTag === "curtain" ? "active" : ""
                }`}
                onClick={() => TagClick("curtain")}
              >
                <p className={activeTag === "curtain" ? "active" : ""}>#커텐</p>
              </div>
              <div
                className={`design-tag ${
                  activeTag === "wallpaper" ? "active" : ""
                }`}
                onClick={() => TagClick("wallpaper")}
              >
                <p className={activeTag === "wallpaper" ? "active" : ""}>
                  #벽지
                </p>
              </div>
              <div
                className={`design-tag ${
                  activeTag === "board" ? "active" : ""
                }`}
                onClick={() => TagClick("board")}
              >
                <p className={activeTag === "board" ? "active" : ""}>#게시판</p>
              </div>
              <div
                className={`design-tag ${
                  activeTag === "lighting" ? "active" : ""
                }`}
                onClick={() => TagClick("lighting")}
              >
                <p className={activeTag === "lighting" ? "active" : ""}>
                  #조명
                </p>
              </div>
            </div>
            <div className="rowline1"></div>
            {defaultTag === true && (
              <div className="default-panel-design">
                <p className="all-items">모든 아이템(8)</p>
                <div className="panel-textbox">
                  <div className="panel-textbox2">
                    <p className="panel-text">모던한 커텐</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? modernCurtainN : modernCurtain}
                        onClick={() =>
                          modernCurtainF(
                            !mode ? "modernCurtainN" : "modernCurtain"
                          )
                        }
                        alt="Curtain"
                      />
                    </div>
                  </div>

                  <div className="panel-textbox2">
                    <p className="panel-text">블라인드 커텐</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? blindN : blind}
                        onClick={() => blindF(!mode ? "blindN" : "blind")}
                      />
                    </div>
                  </div>
                </div>

                <div className="panel-textbox">
                  <div className="panel-textbox2">
                    <p className="panel-text">모던한 벽지</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? decoRecN : decoRec}
                        onClick={removeStar}
                      />
                    </div>
                  </div>

                  <div className="panel-textbox2">
                    <p className="panel-text">별이 쏟아지는 벽지</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? ManyStarN : ManyStar}
                        onClick={() => StarF(!mode ? "StarN" : "Star")}
                      />
                    </div>
                  </div>
                </div>

                <div className="panel-textbox">
                  <div className="panel-textbox2">
                    <p className="panel-text">모던한 게시판</p>
                    <div className="panel-box">
                      <img src={!mode ? modernBulletinN : modernBulletin} />
                    </div>
                  </div>

                  {/* <div className="panel-textbox2">
                            <p className="panel-text">마구잡이 게시판</p>
                            <div className="panel-box">
                            <img src={!mode ? randomBulletinN :randomBulletin}/>
                            </div>
                        </div> */}
                  <div className="panel-textbox2">
                    <p className="panel-text">감성 옐로우 라이트</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? yellowlightN : yellowlight}
                        onClick={LightYellow}
                      />
                    </div>
                  </div>
                </div>

                <div className="panel-textbox">
                  <div className="panel-textbox2">
                    <p className="panel-text">총명 블루 라이트</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? bluelightN : bluelight}
                        onClick={LightBlue}
                      />
                    </div>
                  </div>

                  <div className="panel-textbox2">
                    <p className="panel-text">집중 화이트 라이트</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? whitelightN : whitelight}
                        onClick={LightWhite}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTag === "curtain" && (
              <div id="curtain">
                <p className="all-items">커텐 아이템(2)</p>
                <div className="panel-textbox">
                  <div>
                    <p className="panel-text">커텐 제거</p>
                    <div className="panel-box">
                      <img
                        src={mode ? Union : UnionN}
                        onClick={removeCurtain}
                        id="Union"
                        alt="커텐 제거"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="panel-text">모던한 커텐</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? modernCurtainN : modernCurtain}
                        onClick={() =>
                          modernCurtainF(
                            !mode ? "modernCurtainN" : "modernCurtain"
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="panel-textbox">
                  <div>
                    <p className="panel-text">블라인드 커텐</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? blindN : blind}
                        onClick={() => blindF(!mode ? "blindN" : "blind")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTag === "wallpaper" && (
              <div id="wallpaper">
                <p className="all-items">벽지 아이템(2)</p>
                <div className="panel-textbox">
                  <div>
                    <p className="panel-text">모던한 벽지</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? decoRecN : decoRec}
                        onClick={removeStar}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="panel-text">별이 쏟아지는 벽지</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? ManyStarN : ManyStar}
                        onClick={() => StarF(!mode ? "StarN" : "Star")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTag === "board" && (
              <div id="board">
                <p className="all-items">게시판 아이템(1)</p>
                <div className="panel-textbox">
                  <div>
                    <p className="panel-text">모던한 게시판</p>
                    <div className="panel-box">
                      <img src={!mode ? modernBulletinN : modernBulletin} />
                    </div>
                  </div>

                  {/* <div>
                    <p className="panel-text">마구잡이 게시판</p>
                    <div className="panel-box">
                    <img src={!mode ? randomBulletinN :randomBulletin}/>
                    </div>
                  </div> */}
                </div>
              </div>
            )}
            {activeTag === "lighting" && (
              <div id="lighting">
                <p className="all-items">조명 아이템(3)</p>
                <div className="panel-textbox">
                  <div>
                    <p className="panel-text">감성 옐로우 라이트</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? yellowlightN : yellowlight}
                        onClick={LightYellow}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="panel-text">집중 화이트 라이트</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? whitelightN : whitelight}
                        onClick={LightWhite}
                      />
                    </div>
                  </div>
                </div>

                <div className="panel-textbox">
                  <div>
                    <p className="panel-text">총명 블루 라이트</p>
                    <div className="panel-box">
                      <img
                        src={!mode ? bluelightN : bluelight}
                        onClick={LightBlue}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={`backButton ${isListVisible ? "visible" : ""}`}
            onClick={backButtonClick}
          >
            <img src={LeftVector} style={{ width: "40%", height: "35%" }} />
          </div>
        </div>
      </div>
    );
  }
);

export default Panel;
