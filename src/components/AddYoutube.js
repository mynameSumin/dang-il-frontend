import closeBtn from "../assets/close.png";
import { useState } from "react";
import { saveUrl, deleteUrl, updateUrl } from "../utils/data";
// import { useCookies } from "react-cookie";

const AddYoutube = ({
  userRealId,
  setKey,
  showWindow,
  setShowWindow,
  activeWindow,
  setActiveWindow,
}) => {
  const [url, setUrl] = useState("");
  const [vid, setVid] = useState("");
  const [errorMessage, setErrorMessage] = useState(" ");
  const [videoId, setVideoId] = useState("");

  // 유튜브 링크 검증 및 ID 추출 함수
  const validateYoutubeUrl = (inputUrl) => {
    const youtubeRegex = /^https:\/\/www\.youtube\.com\/watch\?v=([^&]+)/;

    const match = inputUrl.match(youtubeRegex);

    if (match) {
      const videoId1 = match[1]; // 바로 추출한 값을 사용
      setErrorMessage(" "); // 유효한 경우 에러 메시지 제거
      setVideoId(videoId1); // 상태 업데이트
      setKey(videoId1);
      setVid(videoId1); // vid를 업데이트 하지만 바로 vid를 의존하지 않고 match[1]을 사용
      console.log("키추출  ", videoId1);
      setShowWindow(false);
      setActiveWindow("");
      setUrl("");
      return true;
    } else {
      setErrorMessage("잘못된 주소입니다");
      setVideoId("");
      return false;
    }
  };

  // const [cookies] = useCookies(["session_id"]);

  const handleApplyClick = () => {
    const youtubeRegex = /^https:\/\/www\.youtube\.com\/watch\?v=([^&]+)/;
    // URL 검증
    if (validateYoutubeUrl(url)) {
      console.log("유효한 URL:", url);
      const match1 = url.match(youtubeRegex);
      console.log("유효키 ", match1);
      console.log()
      // 추가 로직을 여기서 처리 (예: URL 저장 또는 처리)
      saveUrl(userRealId, match1[1]);
    } else {
      console.log("유효하지 않은 URL");
      // 에러 메시지 출력
    }
  };

  return (
    <>
      <div
        className="change-music-window"
        id={activeWindow == "change-music" ? "open" : ""}
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
          onClick={() => {
            handleApplyClick();
          }} // 버튼 클릭 시 검증 및 처리
        >
          적용하기
        </div>
      </div>
    </>
  );
};

export default AddYoutube;
