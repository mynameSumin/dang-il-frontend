import DeskField from "../components/MakeDesk";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../styles/popup.css";
import "../styles/mainPage.css";
import "../styles/settingsPopup.css";
import { useCookies } from "react-cookie";
import alram from "../assets/alram.png";
import close from "../assets/close.png";
import addFriend from "../assets/addFriend.png";
import searchBtn from "../assets/search.png";
import addByTag from "../assets/addByTag.png";
import check from "../assets/check.png";
import reject from "../assets/reject.png";
import background from "../assets/background.png";
import {
  getUserDataAfterLogin,
  handleLogout,
  searchFriend,
  inviteFriend,
} from "../utils/data";

export default function MainPage({ logoutHandler }) {
  const navigate = useNavigate();
  const loginContainerRef = useRef(null);
  const [cookies] = useCookies(["session_id"]);
  const [mode, setMode] = useState(true);

  // 별 10개를 생성해서 랜덤 위치에 배치하는 함수
  function createStars() {
    const starContainer = document.querySelector(".night");

    for (let i = 0; i < 10; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.classList.add("twinkle");

      // 랜덤 위치 계산 (0 ~ 100%)
      const randomX = Math.random() * 200;
      const randomY = Math.random() * 200;

      // 랜덤 크기 설정
      const randomSize = Math.random() * 5 + 1; // 2px ~ 5px 크기

      // 별의 위치와 크기 설정
      star.style.left = `${randomX}%`;
      star.style.top = `${randomY}%`;
      star.style.width = `${randomSize}px`;
      star.style.height = `${randomSize}px`;

      // 컨테이너에 별 추가
      starContainer.appendChild(star);

      star.addEventListener("mousedown", () => {
        starContainer.classList.add("dragging");
      });
    }
  }

  // 별을 생성하는 로직을 useEffect로 변경
  useEffect(() => {
    if (!mode) {
      // night 모드일 때만 별 생성
      createStars();
    }
  }, [mode]);

  useEffect(() => {
    if (!mode) {
      // night 모드일 때만 별 생성
      createStars();
    }
  }, [mode]);

  //사용자 정보 관련
  const [userData, setUserData] = useState([{ id: 0, name: "" }]); // 사용자 데이터
  const [friendData, setFriendData] = useState([]); //사용자 친구 데이터
  const [unknownData, setUnknownData] = useState([]); //모르는 사용자 데이터
  const [allData, setAllData] = useState(null); //모든 사용자 데이터

  //팝업 관련
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showFriend, setShowFriend] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);

  //드롭 다운 관련
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 추가
  const fieldRef = useRef(null);
  const modalRef = useRef(null);

  //설정 팝업 관련
  const [showSettings, setShowSettings] = useState(false);
  const SettingRef = useRef(null);
  // 설정-프로필 관련
  const [profileSetting, setProfileSetting] = useState("");
  // 설정-모드관련
  const [modeSetting, setModeSetting] = useState("");
  // 적용하기 & 이름변경 관련
  const [inputValue, setInputValue] = useState("");
  const [applySetting, setApplySetting] = useState(false);
  //설정- 프로필사진
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [clearProfilePic, setClearProfilePic] = useState(false);

  // 친구 관련
  const [filter, setFilter] = useState("");
  const [tag, setTag] = useState("");
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState(null);

  const filteredUsers = friendData.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  // 함수 호출 시 데이터를 가져와 처리하는 예시
  const fetchData = async () => {
    const [fetchedUserData, friendData, unknownData] =
      await getUserDataAfterLogin(cookies);
    const allDataArray = [];

    if (fetchedUserData) {
      setUserData(fetchedUserData);
      allDataArray.push(fetchedUserData);
      if (friendData.length !== 0) {
        setFriendData(friendData);
        allDataArray.push(...friendData);
      }
      if (unknownData.length !== 0) {
        setUnknownData(unknownData);
        allDataArray.push(...unknownData);
      }
      setAllData(allDataArray);
      console.log(allData);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    setIsDropdownOpen(!isDropdownOpen);
  };

  //이름변경관련
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setApplySetting(newValue.trim() !== ""); // 값이 비어있지 않으면 버튼 활성화
  };

  //프로필사진정보 백엔드에서 가져오기
  const fetchProfilePicture = async () => {
    try {
      const response = await fetch(
        "https://dangil-artisticsw.site/getProfilePicture",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: "session_id=" + cookies.session_id,
          },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch profile picture");

      const data = await response.json();
      setProfilePicUrl(data.pictureUrl); // 예상 응답: { pictureUrl: 'url_to_image' }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  //프로필사진 초기화
  const handleClearProfilePicChange = (event) => {
    const isChecked = event.target.checked;
    setClearProfilePic(isChecked);
    if (isChecked) {
      // 프로필 사진 URL을 초기화합니다.
      setProfilePicUrl("");
    }
  };

  // 체크박스 변경 이벤트 핸들러
  const handleProfileFetchCheck = (event) => {
    if (event.target.checked) {
      fetchProfilePicture();
    } else {
      setProfilePicUrl(""); // 체크 해제시 미리보기 제거
    }
  };

  //두 번 클릭 시 다른 사용자 페이지로 이동
  const handleDoubleClick = (userId, mode) => {
    navigate(`/user/${userId}`, {
      state: { mode: mode, userRealId: allData[userId]._id },
    });
  };

  //이름 변경 시 백엔드 변경요청 & 로컬상태 업데이트
  const updateUserName = async (userId) => {
    const updatedUserData = { ...userData, id: userId, name: inputValue };
    setUserData(updatedUserData);

    // 백엔드에 변경 요청

    try {
      const contentBody = {
        user_id: userId,
        new_name: inputValue,
      };
      console.log("으으으으으으으어어어엉, ", contentBody);

      const response = await fetch(
        "https://dangil-artisticsw.site/users/user/name/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", //,
            // Cookie: "session_id=" + cookies.session_id,
          },
          body: JSON.stringify(contentBody),
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to update user name");
      // 서버 응답 처리
      console.log("Name updated successfully on server");
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleSettings = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    setShowSettings(!showSettings); // 설정 팝업 상태를 true로 설정하여 팝업 표시
    setIsDropdownOpen(false); // 드롭다운 메뉴 닫기
  };

  const responseToInvitation = async (res, id) => {
    const response = await fetch(
      "https://dangil-artisticsw.site/friend/apply/response",
      {
        method: "POST",
        credentials: "include", // 쿠키 포함
        headers: {
          Cookie: cookies.session_id,
          "Content-Type": "application/json", // JSON 데이터 전송을 위한 헤더
        },
        body: JSON.stringify({
          consent_status: res,
          sender_id: id,
        }),
      }
    );
    console.log(response);
    if (response.ok) {
      console.log("친구 초대 처리 완료");
    } else {
      console.log("친구 초대 처리 실패");
    }
  };

  const removeBySenderId = (senderId) => {
    const updatedMessages = messages.filter((item) => {
      if (item.data && item.data.sender_id) {
        return item.data.sender_id !== senderId;
      }
      return true;
    });

    // 상태 업데이트
    setMessages(updatedMessages);
  };

  // 체크 로직: sessionStorage에서 팝업 표시 여부 확인
  useEffect(() => {
    const hasPopupShown = sessionStorage.getItem("hasPopupShown");
    // "hasPopupShown" 키에 해당하는 값을 가져옴. 값이 존재하지 않으면 (null), 팝업을 표시해야 함을 의미.

    if (!hasPopupShown) {
      setShowPopup(true);
      sessionStorage.setItem("hasPopupShown", "true");
      // 팝업 표시여부 세션 스토리지에 저장. 브라우저 탭을 닫기 전까지 정보유지, 탭을 재시작하면 사라짐.

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 프로필 섹션을 기본적으로 활성화
    setProfileSetting("profile");
  }, []);

  useEffect(() => {
    fetchData();
    // SSE 연결 (withCredentials 설정)
    const eventSource = new EventSource(
      "https://dangil-artisticsw.site/sse/connect",
      {
        withCredentials: true,
      }
    );

    eventSource.onmessage = function (event) {
      // 서버로부터 받은 데이터를 파싱
      const data = event.data.replace(/'/g, '"');
      const correctedData = data
        .replace(/\bTrue\b/g, true)
        .replace(/\bFalse\b/g, false);
      const receiveData = JSON.parse(correctedData);
      setMessages((prevMessages) => [...prevMessages, receiveData]);
      console.log("messages", messages);
      // 'source'와 'data' 필드 사용
      console.log("data:", receiveData);
      console.log("Source:", receiveData.source);

      // 예: 친구 요청 처리
      if (event.data.source === "/friend/apply") {
        console.log("친구 요청 받음:");
        console.log("보낸 사람 ID:", event.data.sender_id);
        console.log("받는 사람 ID:", event.data.receiver_id);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE 연결 오류:", error);
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    console.log("messages", messages);
    if (
      messages.length !== 0 &&
      messages[messages.length - 1].message ==
        "Friend request accepted successfully"
    ) {
      setFriendData((prevData) => [...prevData, { _id: "test", name: "test" }]);
    }
  }, [messages]);

  //로그인 완료 모달이 뜰 경우 배경 블러처리
  useEffect(() => {
    if (showPopup) {
      fieldRef.current.classList.add("blurred");
      loginContainerRef.current.classList.add("blurred");
    } else if (showSettings) {
      fieldRef.current.classList.add("blurred");
    } else {
      fieldRef.current.classList.remove("blurred");
      loginContainerRef.current.classList.remove("blurred");
      SettingRef.current.classList.remove("blurred");
    }
  }, [showPopup, showSettings]);

  // 화면 어디든 클릭했을 때 호출되는 이벤트 핸들러
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // 전역 클릭 이벤트 등록
    document.addEventListener("click", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //프로필 눌렀을때 해당내용뜸
  const showProfileSettings = () => {
    setProfileSetting(profileSetting === "profile" ? "" : "profile");
    setModeSetting(""); // 모드 설정 비활성화
  };

  //모드 눌렀을때 해당내용 뜸
  const showModeSettings = () => {
    setModeSetting(modeSetting === "mode" ? "" : "mode");
    setProfileSetting(""); // 모드 설정 비활성화
  };

  //적용하기 버튼 눌렀을때
  const applyButton = (userId) => {
    console.log("으어어어222, ", userId);
    if (inputValue.trim()) {
      updateUserName(userId);
      setApplySetting(false); // 버튼 비활성화
    }
  };

  return (
    <div className={mode ? "day" : "night"}>
      <img
        src={background}
        style={{
          position: "fixed",
          top: "0",
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: "888",
          opacity: "0.1",
        }}
      />
      <DeskField
        mode={mode}
        setMode={setMode}
        userData={allData ? allData : [{ id: 0, name: "sumin" }]}
        fieldRef={fieldRef}
        onDoubleClick={handleDoubleClick}
      />
      <button
        onClick={() => {
          setMode(!mode);
        }}
        className="mode"
      >
        낮/밤
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <img src="/images/send.png" alt="send" className="send-img" />
            <p className="popup_t1">다시 힘내볼까요?</p>
            <p className="popup_t2">나만의 스페이스로</p>
            <p className="popup_t3">이동 중입니다.</p>
            <div className="user-info">
              <div className="user-icon2">{userData.name}</div>
              <div className="user-name">{userData.name}</div>
            </div>
          </div>
        </div>
      )}
      {showSettings && (
        <div className="settings-popup">
          <button
            onClick={() => setShowSettings(false)}
            className="close-button"
          >
            X
          </button>
          <div className="setting-profile">
            <div className="settings-header">
              <h3>설정</h3>
              <div className="settings-rowline"></div>
              <p
                className={`settings-menu ${
                  profileSetting === "profile" ? "active" : ""
                }`}
                onClick={showProfileSettings}
              >
                프로필
              </p>
              <p
                className={`settings-menu ${
                  modeSetting === "mode" ? "active" : ""
                }`}
                onClick={showModeSettings}
              >
                모드
              </p>
            </div>
            {profileSetting === "profile" && (
              <div className="settings-profile">
                <p>이름변경</p>
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="이름 입력"
                />
                <p>프로필 사진</p>
                <div className="checkbox-texts">
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="hideInAlram"
                    name="settings"
                  />
                  <label
                    className="checkbox-text"
                    for="hideInAlram"
                    onChange={handleProfileFetchCheck}
                  >
                    연동된 계정에서 불러오기
                  </label>
                </div>

                <div className="checkbox-texts">
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="startWithComputer"
                    name="settings"
                    onChange={handleClearProfilePicChange}
                  />
                  <label className="checkbox-text" for="startWithComputer">
                    프로필 사진 비우기
                  </label>
                </div>

                <div className="profile-see">
                  {!clearProfilePic && profilePicUrl ? (
                    <img
                      src={profilePicUrl}
                      alt="Profile Preview"
                      className="profile-preview-image"
                    />
                  ) : (
                    <span className="before-see">미리보기</span>
                  )}
                </div>
              </div>
            )}

            {modeSetting === "mode" && (
              <div>
                <h2 className="ready-text"> 서비스 준비 중입니다... </h2>
              </div>
            )}
          </div>

          <div>
            <p
              className={`apply-button ${applySetting ? "active" : null}`}
              onClick={() => {
                applySetting && applyButton(userData["_id"]);
              }} // 찾았다 요놈, 프로필
            >
              적용하기
            </p>
          </div>
        </div>
      )}
      ;
      <div ref={loginContainerRef} className="login-container">
        <button className="login-button-user">
          <FaUserCircle className="user-icon1" />
          <div className="user-name-box">
            <span className="user-name">{userData.name}</span>
            <div className="tag-hover">tag : {userData.tag}</div>
          </div>

          <span
            className={`dropdown-button ${isDropdownOpen ? "active" : null}`}
            onClick={toggleDropdown}
          >
            ▼
          </span>
          <div
            className={`dropdown-content ${isDropdownOpen ? "active" : null}`}
            ref={dropdownRef}
          >
            <button
              onClick={() => {
                setShowFriend(true);
                setIsDropdownOpen(false);
                setShowAlert(false);
              }}
            >
              친구 목록
            </button>
            <button onClick={handleSettings} ref={SettingRef}>
              설정
            </button>
            <button
              onClick={() => {
                modalRef.current.classList.add("active");
                setIsDropdownOpen(false);
                fieldRef.current.classList.add("blurred");
              }}
            >
              로그아웃
            </button>
          </div>
          <img
            onClick={() => {
              setShowAlert(!showAlert);
              setShowFriend(false);
              setShowAddFriend(false);
            }}
            className="list-icon"
            src={alram}
          />
        </button>
      </div>
      <div className="logout-modal" ref={modalRef}>
        <div className="logout-description">로그아웃 하시겠습니까?</div>
        <div className="select-container">
          <div
            className="answer no"
            onClick={() => {
              modalRef.current.classList.remove("active");
              fieldRef.current.classList.remove("blurred");
            }}
          >
            아니오
          </div>
          <div
            className="answer"
            onClick={() => {
              handleLogout(cookies);
            }}
          >
            예
          </div>
        </div>
      </div>
      <div className={showAlert ? "window active" : "window"}>
        <img
          className="close-icon"
          src={close}
          onClick={() => {
            setShowAlert(false);
          }}
        />
        <div className="title-container">
          <span className="window-title">알림(0)</span>
          <div className="title"></div>
        </div>
        <div className="messages">
          <div className="message">dangil 님이 친구 요청을 보냈습니다.</div>
          {messages.map((message) => {
            if (message.source == "/friend/apply") {
              return (
                <div
                  className="message"
                  onClick={() => {
                    setShowFriend(true);
                    setShowAlert(false);
                  }}
                >
                  {message.data.sender_id}님이 친구 요청을 보냈습니다.
                </div>
              );
            }
          })}
        </div>
      </div>
      <div
        className={
          showAddFriend ? "add-friend-window active" : "add-friend-window"
        }
      >
        <img
          className="close-icon"
          src={close}
          onClick={() => {
            setShowAddFriend(false);
          }}
        />
        <span className="window-title" id="add-friend-title">
          태그로 검색하기
        </span>
        <form className="search-wrapper" id="add-friend-search">
          <div className="placeholder">tag:</div>
          <input
            type="search"
            id="search"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <img
            onClick={async () => {
              const copy = await searchFriend(tag);
              console.log(copy);
              setSearch(copy);
              console.log("search", search);
            }}
            className="search-icon"
            src={searchBtn}
          />
        </form>
        <div className="tag-friend-container">
          {search && (
            <div className="tag-friend">
              <div
                key={search[0].id}
                className="friend-user"
                id="tag-friend-user"
              >
                <FaUserCircle className="user-icon1" />
                <div>{search[0].name}</div>
              </div>
              <img
                src={addByTag}
                onClick={() => {
                  inviteFriend(userData._id, search[0].id);
                }}
                className="add-by-tag"
              />
            </div>
          )}
        </div>
      </div>
      <div className={showFriend ? "window active" : "window"}>
        <img
          className="close-icon"
          src={close}
          onClick={() => {
            setShowFriend(false);
          }}
        />
        <div className="title-container">
          <form className="search-wrapper">
            <input
              type="search"
              id="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <img className="search-icon" src={searchBtn} />
          </form>
          <img
            onClick={() => {
              setShowAddFriend(true);
            }}
            className="add-friend-icon"
            src={addFriend}
          />
        </div>
        <div className="title-container">
          <span className="window-title">친구신청</span>
          <div className="title"></div>
        </div>
        <div className="friend-invitation-list">
          {messages.map((message) => {
            if (message.source == "/friend/apply") {
              return (
                <div className="friend-invitation-container">
                  <div key={message.data.sender_id} className="friend-user">
                    <FaUserCircle className="user-icon1" />
                    <div>{message.data.sender_name}</div>
                  </div>
                  <div style={{ marginRight: "23px" }}>
                    <button
                      onClick={() => {
                        responseToInvitation(false, message.data.sender_id);
                        removeBySenderId(message.data.sender_id);
                      }}
                      className="select-btn"
                    >
                      <img src={reject} />
                    </button>
                    <button
                      onClick={() => {
                        responseToInvitation(true, message.data.sender_id);
                        removeBySenderId(message.data.sender_id);
                      }}
                      className="select-btn"
                    >
                      <img src={check} />
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="title-container">
          <span className="window-title">친구목록</span>
          <div className="title"></div>
        </div>
        <div className="friend-list">
          {filteredUsers.map((user) => (
            <div key={user.id} className="friend-user">
              <FaUserCircle className="user-icon1" />
              <div>{user.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
