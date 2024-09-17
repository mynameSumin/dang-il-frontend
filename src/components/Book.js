import React, { useState, useRef, useEffect } from 'react';
import "../styles/Book.css";
import { RiHomeLine } from "react-icons/ri";
import { RiDownloadLine } from "react-icons/ri";
import { RxPencil1 } from "react-icons/rx";
import { LuEraser } from "react-icons/lu";
import { LiaHighlighterSolid } from "react-icons/lia";
import { FaRegFile } from "react-icons/fa6";


const Book = () => {
  const [editBook, setEditBook] = useState(false); // 책 편집 화면 표시 여부
  const bookRef = useRef(null);

  const handleBookClick = (e) => {
    e.stopPropagation(); 
    setEditBook(!editBook); // 책 편집 화면을 활성화
  };

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

  return (
    <div ref={bookRef}>
     <img src="/path/to/book.jpg" alt="Book Image" onClick={handleBookClick} style={{ cursor: 'pointer'}}/>
        <div className={`book-page ${editBook ? 'visible': ''}`}>
          <div className="book-name-box">
            <div className="icon-box">
              <RiHomeLine style={{marginLeft: "20", marginRight: "2"}}/>
              <div className="gray-colline"></div>
              <RiDownloadLine />
              <FaRegFile />
              <RxPencil1 />
              <LiaHighlighterSolid />
              <LuEraser />
            </div>
            <p className="book-name">Book name 01</p>
          </div>
          
          <div className="gray-rowline"></div>

          <div className="book-content">
          

          </div>
          <button classNaem="book-button">hi</button>
        </div>
    
    </div>
  );
};

export default Book;
