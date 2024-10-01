import React, { useState, useRef, useEffect, forwardRef } from 'react';
import "../styles/Book.css";
import icon from "../assets/+ icon.png";
import total from "../assets/total.png";
import Lock from "../assets/Lock.png";
import { useCookies } from "react-cookie";
import X from "../assets/X.png";
import circle from "../assets/circle.png";
import home from "../assets/home.png";
import download from "../assets/download.png";
import eraser from "../assets/eraser.png";
import lightpen from "../assets/lightpen.png";
import newpage from "../assets/newpage.png";
import T from "../assets/T.png";



const Book = forwardRef(
  ({editBook, setEditBook, bookName, setBookName}, bookRef) => {
  const [cookies] = useCookies(["session_id"]);
  // 편집 모드 상태 (기본값은 false로 비편집 상태)
  const [NameEditing, setNameEditing] = useState(false);

  // 책 내용 저장
  const [noteDescription, setNoteDescription] = useState('');

  // +버튼 상태
  const [plusButton, setPlusButton] = useState(false);
  // const [XButton, setXButton] = useState(false);

  // 책이름 관련 start

  // 책 이름 상태
  // const [bookName, setBookName] = useState("Book Name");  
  // const bookRef = useRef(null);
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
    if (e.key === 'Enter' || e.key === 'Escape' /*Escape은 Esc를 의미함*/) {
      setNameEditing(false); // 편집 상태 종료
      console.log("편집 모드 종료");
      // if (빈배열) {
      //   createBook()
      // }
      // else {
      //   updateBook(bookName, bookText);

      // }
      // try {
      //   const response = await fetch("https://dangil-artisticsw.site/book/update", {
      //     method: "PUT",
      //     credentials: "include" // 쿠키 포함 설정
      //   });
  
      //   const bookNameData = await response.json();
      //   const bookNameList = bookNameData.data.user_space_data.book_list;
        
      //   if (bookNameList.length === 0){ // bookNameList의 길이 확인
      //     createBook(bookName);
      //     console.log('처음생성')
      //   } else {
      //     updateBook(bookName, "설명을 여기에 입력");
      //     console.log('이미생성된기록있음')
      //   }
      // } catch (error) {
      //   console.error('Error handling the book name:', error);
      // }
    }
  };




  // 책 정보 업데이트
  const updateBook = async (newTitle, newDescription) => {
    try {
      const response = await fetch('https://dangil-artisticsw.site/book/update', {
        method: 'PUT', // PUT 메소드 사용
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          note_title: bookName, // 기존 제목
          new_note_title: newTitle, // 새 제목
          new_note_description: newDescription // 새 설명
        })
      });
      if (!response.ok) throw new Error('Failed to update book');
      const data = await response.json();
      console.log('Book updated:', data);
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };


// 책이 열릴 때 초기 상태로 리셋
useEffect(() => {
  if (editBook) {
    setPlusButton(false);
    }
}, [editBook]); // 의존성 배열에 isListVisible 추가

  
  // 책 이름 작성중일때 외부 클릭 차단 및 엔터 & esc로만 입력 완료 설정
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        NameEditing && 
        inputRef.current && 
        !inputRef.current.contains(event.target) &&
        bookRef.current && // bookRef 추가
        !bookRef.current.contains(event.target)) // 책 컴포넌트 외부 클릭 감지
        {
        event.preventDefault();
        event.stopPropagation(); // 클릭 이벤트 전파를 차단하여 외부 클릭 차단
      }
    };
    // 문서에 클릭 이벤트 추가
    document.addEventListener('click', handleDocumentClick, true);
    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [NameEditing, inputRef]);

  // 책이름 관련 end
  
  const HomeButton = (e) => {
    e.stopPropagation(); // 클릭 이벤트 전파를 차단하여 외부 클릭 차단
    setEditBook(false);
  }

  // 책내용 저장
  const bookTextChange = (event) => {
    setNoteDescription(event.target.value);
  };
  // 책내용 엔터
  const bookTextEnter = async (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {  // Shift 키를 함께 누르지 않은 경우에만 작동
      event.preventDefault();  // 기본 엔터 동작 방지 (새 줄 추가 방지)
      const newNote = noteDescription.trim() + '\n';  // 현재 입력된 내용 끝에 개행 추가
      await saveNoteDescription(newNote);  // 백엔드에 저장 (선택 사항)
      setNoteDescription(newNote);  // 입력 필드 업데이트 (새 줄 추가)
    }
  };
  // 백엔드로 데이터 전송
  const saveNoteDescription = async (description) => {
    try {
      const response = await fetch('/book/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_note_description: description })  // 서버가 기대하는 형식에 맞춰 데이터 전송
      });
      if (!response.ok) throw new Error('Failed to save the note description');
      console.log('Note description saved');
    } catch (error) {
      console.error('Error saving note description:', error);
    }
  };

  // side 버튼 활성화될때 circle 클릭이 되는걸 막음.
  const circleClick = (e) => {
    e.stopPropagation(); 
    console.log('Circle clicked'); 
  };

  //책 생성시 백엔드에 저장
  const createBook = async (title) => {
    try {
      const response = await fetch('https://dangil-artisticsw.site/book/create', {
        method: 'POST',
        credentials: "include", // 쿠키 포함
        headers: {
        Cookie: "session_id=" + cookies.session_id,
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          note_title: title,
          note_description: 'hi' // 추가 정보 입력
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Failed to create book:', error);
    }
  };
  //책 색깔 관련
  const [bookColor, setBookColor] = useState('')
   // 선택된 색상으로 상태 업데이트
  const changeBookColor = (color) => {
    setBookColor(color);
  };


  const PlusButtonClick = (e) => {
    e.stopPropagation(); 
    setPlusButton(current => !current);
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
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
  }

  const LockClick = (e) => {
    e.stopPropagation(); 
  };

    // `editBook` 상태가 변경될 때마다 `plusButton`을 초기화
    useEffect(() => {
      if (editBook) {
        setPlusButton(false); // `editBook`이 true일 때 `plusButton` 초기화
        setIsFullscreen(false);
      }
    }, [editBook]);

  return (
    
    <div bookRef={bookRef}>
        <div 
          bookRef={bookRef} 
          onClick={(e) => e.stopPropagation()} 
          className={`book-page ${editBook ? 'visible' : ''} ${isFullscreen ? 'fullscreen' : ''}`}
          style={{ backgroundColor: bookColor }}>
          <div className="book-name-box">
            <div className="icon-box">
              <img src={home} onClick={HomeButton} className="home"/>
              <div className="gray-colline"></div>
              <img src={download}/>
              <img src={newpage}/>
              <img src={T}/>
              <img src={lightpen}/>
              <img src={eraser}/>
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
                  style={{ cursor: 'text', fontSize:'20px', backgroundColor: bookColor}}>
                    {bookName}
                  </p>
                )}
            </div>
            <div className="bookColors">
                <div className="color1" onClick={() => changeBookColor('#D3DEEE')}></div>
                <div className="color2" onClick={() => changeBookColor('#B3C7EC')}></div>
                <div className="color3" onClick={() => changeBookColor('#D8C7D4')}></div>
                <div className="color4" onClick={() => changeBookColor('#DDD4EF')}></div>
                {isFullscreen && (
                  <div>
                    <img  onClick={backDefaultBook} src={X}/>    
                  </div>
                )}
            </div>
          </div>     
          <div className="gray-rowline"></div>
          <div className="book-content">
              <textarea
              ref={textareaRef}
              value={noteDescription}
              onChange={bookTextChange}
              onKeyDown={bookTextEnter}
              className="book-text"
              // placeholder="원하는 글을 작성해주세요"
              disabled={NameEditing}
            />
          </div>

          {isFullscreen && showGuideEsc && (
            <div className="guideEsc">
              <p>전체화면을 해제하시려면  <span className="Esc">Esc</span> 를 눌러주세요.
              </p>
            </div>  
          )}
        </div>

        {editBook && (
            <>
            <div>
              {!plusButton && (
                <img className="plus-icon" onClick={PlusButtonClick} src={icon} alt="+ icon"/>
              )}

              {plusButton && (
                <div className="side-buttons">
                  <div>
                    <img className="circleTop" onClick={circleClick} src={circle} alt="circle"/>
                    <img className="circleMid" onClick={circleClick} src={circle} alt="circle"/>
                    <img className="circleBottom" onClick={circleClick} src={circle} alt="circle"/>
                  </div>

                  <div className="clickbox">
                    <img className="Lock" onClick={LockClick} src={Lock} alt="Lock icon"/>
                    <img className="total" onClick={totalClick} src={total} alt="Overlay icon"/>
                    <img className="X" onClick={PlusButtonClick} src={X} alt="Overlay icon"/>
                  </div>
                </div>
              )}
              </div>
            </>
          )}
    </div>
  );
});

export default Book;
