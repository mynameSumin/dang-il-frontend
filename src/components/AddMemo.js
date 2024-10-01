import closeBtn from "../assets/close.png";
import { useState, useRef, useEffect } from "react";
import "../styles/Memo.css";

const AddMemo = ({
  setKey,
  showWindow,
  setShowWindow,
  activeWindow,
  setActiveWindow,
}) => {
  const [memo, setMemo] = useState("");
  const [color, setColor] = useState("white");
  const [shape, setShape] = useState("square");
  const sliderRef = useRef(null);
  const thumbRef = useRef(null);

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

      const newColor = `hsl(${(percentage * 360) / 100}, 100%, 50%)`;
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
        <input
          className="memo-content"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="여기에 메모를 적어주세요"
        />

        <div className="color-change" ref={sliderRef}>
          <div className="color-thumb" ref={thumbRef}></div>
        </div>

        <div className="shape-select">
          <div className="square"></div>
          <div className="rectangle"></div>
          <div className="R_rectangle"></div>
          <div className="circle"></div>
          <div className="star"></div>
        </div>

        <div className="complete" id={memo.length !== 0 ? "ok" : ""}>
          붙이기
        </div>
      </div>
    </>
  );
};

export default AddMemo;
