import React, { useState, useRef, useEffect } from 'react';
import "../styles/Book.css";
import { RiHomeLine } from "react-icons/ri";
import { RiDownloadLine } from "react-icons/ri";
import { LuEraser } from "react-icons/lu";
import { LiaHighlighterSolid } from "react-icons/lia";
import { FaRegFile } from "react-icons/fa6";
import icon from "../assets/+ icon.png";
import Ellipse from "../assets/Ellipse 2.png";
import Vector from "../assets/Vector.png";
import { useCookies } from "react-cookie";

const Book = ({editBook, setEditBook}) => {
  const [cookies] = useCookies(["session_id"]);
  // 편집 모드 상태 (기본값은 false로 비편집 상태)
  const [NameEditing, setNameEditing] = useState(false);

  // 책 내용 저장
  const [noteDescription, setNoteDescription] = useState('');

  // +버튼 상태
  const [plusButton, setPlusButton] = useState(false);

  // 책 클릭시 편집화면 활성화
  const bookImageClick = async (e) => {
    e.stopPropagation(); 
    setEditBook(!editBook);
    try {
      const response = await fetch("https://dangil-artisticsw.site/space/3661157737", {
        method: "GET",
        credentials: "include" // 쿠키 포함 설정
      });

      const bookNameData = await response.json();
      const bookNameList = bookNameData.data.user_space_data.book_list;
      
      setBookName()
    } catch (error) {
      console.error('Error handling the book name:', error);
    }

  };


  // 책이름 관련 start

  // 책 이름 상태
  const [bookName, setBookName] = useState("Book Name");  
  const bookRef = useRef(null);
  const inputRef = useRef(null); 
  const textareaRef = useRef(null); // input활성화됐을때 enter나 esc로만 input나갈수있음
  // 책이름 클릭 시 편집 모드로 전환
  const bookNameEdit = (e) => {
    e.stopPropagation();
    setNameEditing(true);
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
  
  // 책 이름 작성중일때 외부 클릭 차단 및 엔터 & esc로만 입력 완료 설정
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        NameEditing && 
        inputRef.current && 
        !inputRef.current.contains(event.target)) {
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
  }, [NameEditing]);

  // 책이름 관련 end
  


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

  const plusMenu = () => {
    setPlusButton(!plusButton);
  }

  // 책편집화면 외부 클릭하면 책편집화면 사라짐
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bookRef.current && !bookRef.current.contains(event.target)) {
          setEditBook(false); // 책 외부 클릭 시 편집화면 숨김
        };
    };
    // 전역 클릭 이벤트 등록
    document.addEventListener("click", handleClickOutside);
    //컴포넌트 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  
  
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

  return (
    <div ref={bookRef} >
     <img src="/path/to/book.jpg" alt="Book Image" onClick={bookImageClick} style={{ cursor: 'pointer'}}/>
        <div className={`book-page ${editBook ? 'visible': ''}`}>
          <div className="book-name-box">
            <div className="icon-box">
              <RiHomeLine style={{marginLeft: "20", marginRight: "2"}}/>
              <div className="gray-colline"></div>
              <RiDownloadLine/>
              <FaRegFile/>
              <LiaHighlighterSolid/>
              <LuEraser/>
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
                  />
                ) : (
                  <p onClick={bookNameEdit} style={{ cursor: 'text', fontSize:'20px'}}>
                    {bookName}
                  </p>
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
              placeholder="원하는 글을 작성해주세요"
              disabled={NameEditing}
            />
          </div>
        </div>
        <img className={`plus-icon ${editBook ? 'visible': ''}`} onClick={plusMenu} src={icon} id="+ icon" />
        
        {plusButton && (
        <div className="side-buttons">
          <img className="side-button1" src={Ellipse} id='Ellipse'></img>
          <img className="side-Vector" src={Vector} id='Vector'></img>
        </div>
      )}
    </div>
  );
};

export default Book;
