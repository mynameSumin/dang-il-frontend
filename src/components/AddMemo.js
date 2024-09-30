import closeBtn from "../assets/close.png";
import { useState } from "react";
import "../styles/Memo.css";

const AddMemo = ({
  setKey,
  showWindow,
  setShowWindow,
  activeWindow,
  setActiveWindow,
}) => {
  const [memo, setMemo] = useState("");
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
        <div className="music-title">메모하기</div>
        <input
          className="url"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="여기에 메모를 적어주세요"
        />

        <div className="complete" id={memo.length !== 0 ? "ok" : ""}>
          적용하기
        </div>
      </div>
    </>
  );
};

export default AddMemo;
