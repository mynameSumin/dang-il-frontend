import React, { useState, useRef, useEffect } from "react";
import SquareMemo from "../components/memo/SquareMemo";
import RectangleMemo from "../components/memo/RectangleMemo";
import CircleMemo from "../components/memo/CircleMemo";
import StarMemo from "../components/memo/StarMemo";
import RRectangleMemo from "./memo/RRectangleMemo";
import closeBtn from "../assets/close.png";
import "../styles/Memo.css";

import StickerSquare from "./memo/StickerSquare";
import StickerRectangle from "./memo/StickerRectangle";
import StickerRRectangle from "./memo/StickerRRectangle";
import StickerCircle from "./memo/StickerCircle";
import StickerStar from "./memo/StickerStar";
import zIndex from "@mui/material/styles/zIndex";

const AddMemo = ({
  setKey,
  showWindow,
  setShowWindow,
  activeWindow,
  setActiveWindow,
  desktopRef,
}) => {
  const [memo, setMemo] = useState("");
  const [color, setColor] = useState("#faebd7");
  const [shape, setShape] = useState("square-memo");
  const [sticker, setSticker] = useState("sticker-square");
  const [list, setList] = useState([]);
  const sliderRef = useRef("");
  const thumbRef = useRef("");

  const selectShape = (name) => {
    const selected = document.querySelector(`.${shape}`);
    selected.classList.remove("selected");
    const select = document.querySelector(`.${name}-memo`);
    select.classList.add("selected");
    setShape(name + "-memo");
    const selectedSticker = document.querySelector(".active-sticker");
    if (selectedSticker) {
      selectedSticker.classList.remove("active-sticker");
    }
    setSticker("sticker-" + name);
  };

  const moveSticker = (name) => {
    const stickerNew = document.querySelector(`.${name}`);
    stickerNew.classList.add("active-sticker");

    // 마우스가 움직일 때 스티커를 따라다니게 함
    const handleMouseMove = (e) => {
      stickerNew.style.zIndex = "888";
      stickerNew.style.top = e.clientY + "px";
      stickerNew.style.left = e.clientX + "px";
    };

    document.addEventListener("mousemove", handleMouseMove);

    // 클릭하면 스티커를 그 자리에 고정시키고 마우스 이동 이벤트를 제거
    const handleClick = (e) => {
      document.removeEventListener("mousemove", handleMouseMove);
      stickerNew.classList.remove("active-sticker");
      stickerNew.style.zIndex = "-1";
      const newSticker = {
        shape: name,
        fixColor: color,
        x: e.clientX,
        y: e.clientY,
        text: memo,
      };

      // 새로운 스티커를 상태에 추가
      setList((prevStickers) => [...prevStickers, newSticker]);

      desktopRef.current.removeEventListener("dblclick", handleClick); // 클릭 이벤트 제거
    };
    desktopRef.current.addEventListener("dblclick", handleClick);
  };

  const renderSticker = (sticker, index) => {
    const { shape, fixColor, x, y, text } = sticker;
    const style = {
      top: y,
      left: x,
      position: "fixed",
      zIndex: "1",
      opacity: "1",
    };

    switch (shape) {
      case "sticker-square":
        return (
          <StickerSquare
            key={index}
            color={fixColor}
            text={text}
            style={style}
            setShowWindow={setShowWindow}
            showWindow={showWindow}
          />
        );
      case "sticker-rectangle":
        return (
          <StickerRectangle
            key={index}
            color={fixColor}
            text={text}
            style={style}
            setShowWindow={setShowWindow}
            showWindow={showWindow}
          />
        );
      case "sticker-R_rectangle":
        return (
          <StickerRRectangle
            key={index}
            color={fixColor}
            text={text}
            style={style}
            setShowWindow={setShowWindow}
            showWindow={showWindow}
          />
        );
      case "sticker-circle":
        return (
          <StickerCircle
            key={index}
            color={fixColor}
            text={text}
            style={style}
            setShowWindow={setShowWindow}
            showWindow={showWindow}
          />
        );
      case "sticker-star":
        return (
          <StickerStar
            key={index}
            color={fixColor}
            text={text}
            style={style}
            setShowWindow={setShowWindow}
            showWindow={showWindow}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const slider = sliderRef.current;
      const thumb = thumbRef.current;
      if (!slider || !thumb) return;

      const rect = slider.getBoundingClientRect();
      let x = e.clientX - rect.left;

      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;

      const percentage = (x / rect.width) * 100;

      // 다양한 밝기와 채도를 섞어서 더 풍부한 색상 제공
      const hue = (percentage * 360) / 100; // 색상 (0~360)
      const saturation = 100; // 채도
      const lightness = 50 + percentage / 2; // 밝기를 더 다양하게 조정

      const newColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

      setColor(newColor);
      thumb.style.left = `${x - thumb.offsetWidth / 2}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (e) => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const thumb = thumbRef.current;
    thumb.addEventListener("mousedown", handleMouseDown);

    return () => {
      thumb.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <>
      <StickerSquare color={color} />
      <StickerRectangle color={color} />
      <StickerRRectangle color={color} />
      <StickerCircle color={color} />
      <StickerStar color={color} />
      {list.map((sticker, index) => {
        return renderSticker(sticker, index);
      })}
      <div
        className="add-memo-window"
        id={activeWindow == "add-memo" ? "open" : ""}
      >
        <img
          src={closeBtn}
          className="close-btn"
          alt="Close"
          onClick={() => {
            setShowWindow(false);
            setActiveWindow("");
          }}
        />
        <div className="memo-title">메모하기</div>
        <div className="textarea-wrapper">
          <textarea
            className="memo-content"
            maxLength="30"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder={`여기에 메모를 적어주세요!\n(5줄 이내로 작성 가능합니다)`}
          />
          <div id="charCount" className="count">
            {memo.length} / 30
          </div>
        </div>

        <div className="color-change" ref={sliderRef}>
          <div className="color-thumb" ref={thumbRef} />
        </div>

        <div className="shape-select">
          <div
            className="square-memo selected"
            onClick={() => selectShape("square")}
          >
            <SquareMemo color={color} />
          </div>
          <div
            className="rectangle-memo"
            onClick={() => selectShape("rectangle")}
          >
            <RectangleMemo color={color} />
          </div>
          <div
            className="R_rectangle-memo"
            onClick={() => selectShape("R_rectangle")}
          >
            <RRectangleMemo color={color} />
          </div>
          <div className="circle-memo" onClick={() => selectShape("circle")}>
            <CircleMemo color={color} />
          </div>
          <div className="star-memo" onClick={() => selectShape("star")}>
            <StarMemo color={color} />
          </div>
        </div>

        <div
          className="complete memo"
          id={memo.length !== 0 ? "ok" : ""}
          onClick={() => {
            if (memo.length !== 0) {
              moveSticker(sticker);
              setMemo("");
              setShowWindow(false);
              setActiveWindow("");
            }
          }}
        >
          붙이기
        </div>
      </div>
    </>
  );
};

export default AddMemo;
