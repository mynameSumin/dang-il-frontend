import React, { useState, useRef, useEffect } from 'react';
import "../styles/Book.css";
import { RiHomeLine } from "react-icons/ri";
import { RiDownloadLine } from "react-icons/ri";
// import { RxPencil1 } from "react-icons/rx";
import { LuEraser } from "react-icons/lu";
import { LiaHighlighterSolid } from "react-icons/lia";
import { FaRegFile } from "react-icons/fa6";
import icon from "../assets/+ icon.png";
import Ellipse from "../assets/Ellipse 2.png";
import Vector from "../assets/Vector.png";




const Book = ({editBook, setEditBook}) => {
  // 편집 모드 상태 (기본값은 false로 비편집 상태)
  const [isEditing, setIsEditing] = useState(false);
  // 책 이름 상태
  const [bookName, setBookName] = useState("Book Name");  
  const bookRef = useRef(null);

  const [previousBookName, setPreviousBookName] = useState(bookName);
  // 책 내용 저장
  const [noteDescription, setNoteDescription] = useState('');

  //+버튼 상태
  const [plusButton, setPlusButton] = useState(false);

 // 입력값을 상태에 저장
  const handleChange = (event) => {
    setNoteDescription(event.target.value);
  };

  const handleBookClick = (e) => {
    e.stopPropagation(); 
    setEditBook(!editBook); // 책 편집 화면을 활성화
  };

  // p 태그 클릭 시 편집 모드로 전환
  const handleEditClick = (e) => {
    e.stopPropagation(); // 추가: 이벤트 전파를 멈춤
    setIsEditing(true);
  };

  // input 필드에서 엔터 키 또는 포커스를 잃었을 때 호출될 함수
  const handleInputChange = (e) => {
    e.stopPropagation(); // 추가: 이벤트 전파를 멈춤
    setBookName(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    e.stopPropagation(); // 추가: 이벤트 전파를 멈춤
    if(bookName=="") return
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsEditing(false);
      createBook(bookName);
      updateBook(bookName, "설명을 여기에 입력");
    }
  };

  const handleKeyDown = async (event) => {
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

  const handleInputBlur = (e) => {
    e.stopPropagation(); // 추가: 이벤트 전파를 멈춤
     // 입력 값이 공백일 경우 이전 이름을 유지
    if (bookName.trim().length === 0) {
      setBookName(previousBookName); // previousBookName은 이전의 유효한 이름을 저장하는 상태
      console.log('Book name restored to previous valid name.');
    } else {
      createBook(bookName);
    }
    setIsEditing(false);
  };

  //bookName이 유효한 값으로 변경될 때마다 previousBookName을 업데이트
  useEffect(() => {
    if (bookName.trim().length > 0) {
      setPreviousBookName(bookName);
    }
  }, [bookName]);

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


  //책 이름 로드
  // useEffect(() => {
  //   const fetchBookName = async () => {
  //     try {
  //       const response = await fetch('/book/update');
  //       if (!response.ok) throw new Error('Failed to fetch');
  //       const data = await response.json();
  //       setBookName(data.name);
  //     } catch (error) {
  //       console.error('Failed to fetch book name:', error);
  //     }
  //   };
  //   fetchBookName();
  // }, []);

  // 책 정보 업데이트
  const updateBook = async (newTitle, newDescription) => {
    try {
      const response = await fetch('/book/update', {
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
  

  //책 생성시 백엔드에 저장
  const createBook = async (title) => {
    try {
      const response = await fetch('/book/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          note_title: title,
          note_description: 'Description here' // 추가 정보 입력
        })
      });
      const data = await response.json();
      console.log('Book created:', data);
    } catch (error) {
      console.error('Failed to create book:', error);
    }
  };

  return (
    <div ref={bookRef} >
     <img src="/path/to/book.jpg" alt="Book Image" onClick={handleBookClick} style={{ cursor: 'pointer'}}/>
        <div className={`book-page ${editBook ? 'visible': ''}`}>
          <div className="book-name-box">
            <div className="icon-box">
              <RiHomeLine style={{marginLeft: "20", marginRight: "2"}}/>
              <div className="gray-colline"></div>
              <RiDownloadLine/>
              <FaRegFile/>
              {/* <RxPencil1/> */}
              <LiaHighlighterSolid/>
              <LuEraser/>
            </div>
            <div className="book-name">
                {isEditing ? (
                  <input style={{textAlign:'center',  fontSize:'20px'}}
                    type="text"
                    value={bookName}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    onBlur={handleInputBlur}
                    autoFocus
                  />
                ) : (
                  <p onClick={handleEditClick} style={{ cursor: 'text', fontSize:'20px'}}>
                    {bookName}
                  </p>
                )}
            </div>
          </div>     
          <div className="gray-rowline"></div>
          <div className="book-content">
              <textarea
              value={noteDescription}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="book-text"
              placeholder="원하는 글을 작성해주세요"
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
