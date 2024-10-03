import React, { useState, useRef, useEffect, forwardRef } from "react";
import "../styles/Book.css";
import icon from "../assets/+ icon.png";
import total from "../assets/total.png";
import Lock from "../assets/Lock.png";
import { useCookies } from "react-cookie";
import X from "../assets/X.png";
import home from "../assets/home.png";
import download from "../assets/download.png";
import eraser from "../assets/eraser.png";
import lightpen from "../assets/lightpen.png";
import newpage from "../assets/newpage.png";
import T from "../assets/T.png";
import LockMode from "../assets/lockMode.png";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import closeBtn from "../assets/close.png";

// 워커 파일 경로 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Book = forwardRef(
  (
    {
      activeWindow,
      setActiveWindow,
      setShowWindow,
      bookName,
      setBookName,
      lockMode,
      setLockMode,
    },
    bookRef
  ) => {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [fileOpen, setFileOpen] = useState(false);
    const [write, setWrite] = useState("");
    const [fileName, setFileName] = useState("");
    const color1 = "#D3DEEE";
    const color2 = "#B3C7EC";
    const color3 = "#D8C7D4";
    const color4 = "#DDD4EF";

    // 파일 선택 함수
    const onFileSelect = (e) => {
      const file = e.target.files[0]; // 파일 객체 가져오기
      if (file) {
        setSelectedFile(file); // 선택된 파일 상태로 저장
        setFileName(file.name);
      }
    };

    // 파일 불러오기 함수 (버튼을 눌렀을 때 호출)
    const onFileLoad = () => {
      if (selectedFile) {
        const fileURL = URL.createObjectURL(selectedFile); // PDF 파일의 URL 생성
        setFile(fileURL);
        setFileOpen(false); // 파일 창 닫기
      }
    };

    // 파일을 드래그 앤 드롭 했을 때 호출되는 함수
    const handleDrop = (e) => {
      e.preventDefault(); // 브라우저 기본 동작 방지
      const droppedFile = e.dataTransfer.files[0]; // 드롭된 파일 객체 가져오기
      if (droppedFile) {
        setSelectedFile(droppedFile);
        setFileName(droppedFile.name); // 파일명 상태 저장
      }
    };

    // 드래그 앤 드롭 이벤트 방지 (드래그된 파일이 새로운 페이지로 열리지 않게)
    const handleDragOver = (e) => {
      e.preventDefault();
    };

    // PDF 문서가 로드되었을 때 호출되는 함수
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };

    const [cookies] = useCookies(["session_id"]);

    // 편집 모드 상태 (기본값은 false로 비편집 상태)
    const [NameEditing, setNameEditing] = useState(false);

    // 책 내용 저장
    const [noteDescription, setNoteDescription] = useState("");

    // +버튼 상태
    const [plusButton, setPlusButton] = useState(false);

    // 책 이름 상태
    const inputRef = useRef(null);
    const textareaRef = useRef(null); // input활성화됐을때 enter나 esc로만 input나갈수있음

    // 책이름 클릭 시 편집 모드로 전환
    const bookNameEdit = (e) => {
      e.stopPropagation();
      setNameEditing(true);
      console.log("편집 모드 활성화");
    };
    // 책이름 변경될때마다 호출되는 함수
    const bookNameChange = (e) => {
      e.stopPropagation(); // 추가: 이벤트 전파를 멈춤
      setBookName(e.target.value);
    };
    // 책이름 변경되고 엔터누르면 호출
    const bookNameEnter = async (e) => {
      e.stopPropagation(); // 이벤트 전파를 멈춤
      if (bookName === "") return; // bookName이 비어있으면 함수 종료
      if (e.key === "Enter" || e.key === "Escape" /*Escape은 Esc를 의미함*/) {
        setNameEditing(false); // 편집 상태 종료
        console.log("편집 모드 종료");
      }
    };

    const saveBook = () => {};

    // 책 정보 업데이트
    const updateBook = async (newTitle, newDescription) => {
      try {
        const response = await fetch(
          "https://dangil-artisticsw.site/book/update",
          {
            method: "PUT", // PUT 메소드 사용
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              note_title: bookName, // 기존 제목
              new_note_title: newTitle, // 새 제목
              new_note_description: newDescription, // 새 설명
            }),
          }
        );
        if (!response.ok) throw new Error("Failed to update book");
        const data = await response.json();
        console.log("Book updated:", data);
      } catch (error) {
        console.error("Failed to update book:", error);
      }
    };

    // 책이 열릴 때 초기 상태로 리셋
    useEffect(() => {
      if (activeWindow === "add-book") {
        setPlusButton(false);
      }
    }, [activeWindow]);

    // 책 이름 작성중일때 외부 클릭 차단 및 엔터 & esc로만 입력 완료 설정
    useEffect(() => {
      const handleDocumentClick = (event) => {
        if (
          NameEditing &&
          inputRef.current &&
          !inputRef.current.contains(event.target) &&
          bookRef.current && // bookRef 추가
          !bookRef.current.contains(event.target)
        ) {
          // 책 컴포넌트 외부 클릭 감지
          event.preventDefault();
          event.stopPropagation(); // 클릭 이벤트 전파를 차단하여 외부 클릭 차단
        }
      };
      // 문서에 클릭 이벤트 추가
      document.addEventListener("click", handleDocumentClick, true);
      // 컴포넌트가 언마운트되면 이벤트 리스너 제거
      return () => {
        document.removeEventListener("click", handleDocumentClick, true);
      };
    }, [NameEditing, inputRef]);

    // 책이름 관련 end
    const HomeButton = (e) => {
      e.stopPropagation(); // 클릭 이벤트 전파를 차단하여 외부 클릭 차단
      if (!lockMode) {
        setActiveWindow("");
        setShowWindow(false);
      }
    };

    // 책내용 저장
    const bookTextChange = (event) => {
      setNoteDescription(event.target.value);
    };
    // 책내용 엔터
    const bookTextEnter = async (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        // Shift 키를 함께 누르지 않은 경우에만 작동
        event.preventDefault(); // 기본 엔터 동작 방지 (새 줄 추가 방지)
        const newNote = noteDescription.trim() + "\n"; // 현재 입력된 내용 끝에 개행 추가
        await saveNoteDescription(newNote); // 백엔드에 저장 (선택 사항)
        setNoteDescription(newNote); // 입력 필드 업데이트 (새 줄 추가)
      }
    };
    // 백엔드로 데이터 전송
    const saveNoteDescription = async (description) => {
      try {
        const response = await fetch("/book/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ new_note_description: description }), // 서버가 기대하는 형식에 맞춰 데이터 전송
        });
        if (!response.ok)
          throw new Error("Failed to save the note description");
        console.log("Note description saved");
      } catch (error) {
        console.error("Error saving note description:", error);
      }
    };

    // side 버튼 활성화될때 circle 클릭이 되는걸 막음.
    const circleClick = (e) => {
      e.stopPropagation();
      console.log("Circle clicked");
    };

    //책 색깔 관련
    const [bookColor, setBookColor] = useState("");
    // 선택된 색상으로 상태 업데이트
    const changeBookColor = (color) => {
      setBookColor(color);
    };

    const PlusButtonClick = (e) => {
      e.stopPropagation();
      setPlusButton((current) => !current);
    };

    //책 전체화면 관련
    const [isFullscreen, setIsFullscreen] = useState(false);
    const totalClick = (e) => {
      e.stopPropagation();
      setIsFullscreen(true);
    };
    //전체화면일때 esc누르면 전체화면 해제됨
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setIsFullscreen(false);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
    //전체화면에서 가이드문구 5초뒤에 사라짐
    const [showGuideEsc, setShowGuideEsc] = useState(true);
    useEffect(() => {
      if (isFullscreen) {
        setShowGuideEsc(true);
        const timer = setTimeout(() => {
          setShowGuideEsc(false); // 3초 뒤에 가이드를 숨김
        }, 3000);

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
      }
    }, [isFullscreen]);

    const backDefaultBook = (e) => {
      e.stopPropagation();
      setIsFullscreen(false);
    };

    const LockClick = (e) => {
      console.log("lock click");
      e.stopPropagation();
      setLockMode(!lockMode);
    };

    return (
      <>
        <div
          bookRef={bookRef}
          className={`book-container ${
            activeWindow == "add-book" ? "visible" : ""
          } `}
        >
          <div
            onDragOver={handleDragOver}
            bookRef={bookRef}
            onClick={(e) => e.stopPropagation()}
            className={`book-page ${isFullscreen ? "fullscreen" : ""} ${
              fileOpen ? "blur" : ""
            }`}
            style={{ backgroundColor: bookColor }}
          >
            <div className="book-name-box">
              <div className="icon-box">
                <img src={home} onClick={HomeButton} className="home" />
                <div className="gray-colline"></div>
                <img src={download} />
                <img
                  src={newpage}
                  onClick={() => {
                    setFileOpen(true);
                  }}
                />
              </div>
              <div className="book-name">
                {NameEditing ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={bookName}
                    onChange={bookNameChange}
                    onKeyDown={bookNameEnter}
                    autoFocus
                    style={{ backgroundColor: bookColor }}
                  />
                ) : (
                  <p
                    onClick={bookNameEdit}
                    style={{
                      cursor: "text",
                      fontSize: "20px",
                      backgroundColor: bookColor,
                    }}
                  >
                    {bookName}
                  </p>
                )}
              </div>
              <div className="bookColors">
                <div
                  className="color1"
                  onClick={() => changeBookColor(color1)}
                ></div>
                <div
                  className="color2"
                  onClick={() => changeBookColor(color2)}
                ></div>
                <div
                  className="color3"
                  onClick={() => changeBookColor(color3)}
                ></div>
                <div
                  className="color4"
                  onClick={() => changeBookColor(color4)}
                ></div>
                {isFullscreen && (
                  <div>
                    <img onClick={backDefaultBook} src={X} />
                  </div>
                )}
              </div>
            </div>
            <div className="gray-rowline"></div>
            <div className="book-content">
              {/* 선택된 파일이 있을 때 PDF 문서 렌더링 */}
              {file && (
                <div>
                  <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                  </Document>
                </div>
              )}

              <textarea
                value={write}
                onChange={(e) => {
                  setWrite(e.target.value);
                }}
                className="book-text"
                placeholder="여기에 내용을 작성하세요."
              />
            </div>
            {isFullscreen && showGuideEsc && (
              <div className="guideEsc">
                <p>
                  전체화면을 해제하시려면 <span className="Esc">Esc</span> 를
                  눌러주세요.
                </p>
              </div>
            )}{" "}
          </div>

          {activeWindow == "add-book" && (
            <>
              <div>
                <div className="btn plus" onClick={PlusButtonClick}>
                  <img
                    className="plus-icon"
                    id={plusButton ? "" : "active"}
                    src={icon}
                    alt="+ icon"
                  />
                </div>
                <div
                  className={`btn lock ${lockMode ? "lock-mode" : ""}`}
                  onClick={LockClick}
                  id={plusButton ? "" : "activeLock"}
                >
                  <img
                    className="lock-icon"
                    src={lockMode ? LockMode : Lock}
                    alt="lock icon"
                  />
                </div>
                <div
                  className="btn total"
                  onClick={totalClick}
                  id={plusButton ? "" : "activeTotal"}
                >
                  <img className="total-icon" src={total} alt="total icon" />
                </div>
              </div>
            </>
          )}
        </div>
        <div
          className="add-file-window"
          id={fileOpen ? "open" : ""}
          onDrop={handleDrop}
        >
          <img
            src={closeBtn}
            className="close-btn"
            alt="Close"
            onClick={() => {
              setFileOpen(false);
            }}
          />
          <div className="memo-title">파일 불러오기</div>
          <div className="drag-and-drop">
            <div>여기에</div>
            <br />
            <div>드래그 앤 드롭</div>
          </div>
          <div className="load-title">혹은 내 컴퓨터에서 직접 불러오기</div>

          {/* 파일 선택 버튼 */}
          <input
            id="fileInput"
            type="file"
            onChange={onFileSelect} // 파일 선택 함수
            accept="application/pdf"
            style={{ display: "none" }}
          />
          <label htmlFor="fileInput" className="custom-file-input">
            파일 불러오기
          </label>
          <div className="file-name">{fileName}</div>
          <div
            className="complete-file"
            id={selectedFile ? "complete" : ""}
            onClick={() => {
              selectedFile && onFileLoad();
            }}
          >
            불러오기
          </div>
        </div>
      </>
    );
  }
);

export default Book;
