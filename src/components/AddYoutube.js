import closeBtn from "../assets/close.png";
import { useState } from "react";

const AddYoutube = ({ setKey, showWindow, setShowWindow }) => {
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(" ");
  const [videoId, setVideoId] = useState("");

  // 유튜브 링크 검증 및 ID 추출 함수
  const validateYoutubeUrl = (inputUrl) => {
    const youtubeRegex =
      /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$/;
    const match = inputUrl.match(youtubeRegex);

    if (match) {
      setErrorMessage(" "); // 유효한 경우 에러 메시지 제거
      setVideoId(match[1]); // URL에서 ID 추출
      setKey(match[1]);
      setShowWindow(false);
      setUrl("");
      return true;
    } else {
      setErrorMessage("잘못된 주소입니다");
      setVideoId("");
      return false;
    }
  };

  const handleApplyClick = () => {
    // URL 검증
    if (validateYoutubeUrl(url)) {
      console.log("유효한 URL:", url);
      // 추가 로직을 여기서 처리 (예: URL 저장 또는 처리)
    } else {
      console.log("유효하지 않은 URL");
      // 에러 메시지 출력
    }
  };

  return (
    <>
      <div className="change-music-window" id={showWindow ? "open" : ""}>
        <img
          src={closeBtn}
          className="close-btn"
          alt="Close"
          onClick={() => setShowWindow(false)}
        />
        <div className="music-title">유튜브 불러오기</div>
        <input
          className="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)} // 입력할 때 url 상태 업데이트
          placeholder="유튜브 영상 링크를 입력해주세요"
        />
        {errorMessage && <div className="error">{errorMessage}</div>}

        <div
          className="complete"
          id={url.length !== 0 ? "ok" : ""}
          onClick={handleApplyClick} // 버튼 클릭 시 검증 및 처리
        >
          적용하기
        </div>
      </div>
    </>
  );
};

export default AddYoutube;
