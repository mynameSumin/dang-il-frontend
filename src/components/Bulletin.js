import React, { useState, useEffect, useRef}  from 'react';
import "../styles/Bulletin.css";
import TODAY from "../assets/TODAY.png";
import TODAYN from "../assets/TODAYN.png";
import eraser from "../assets/eraser.png";
import eraserOn from "../assets/eraserOn.png";
import T from "../assets/T.png";
import TN from "../assets/TN.png";
import eraserN from "../assets/eraserN.png";
import circlee from "../assets/circlee.png";
import Rectangle from "../assets/Rectangle.png";
import Star from "../assets/Star.png";




const Bulletin = ({bulletin,setBulletin, setShowWindow, className}) => {
//전체화면에서 가이드문구 5초뒤에 사라짐
const [GuideBulletin, setGuideBulletin] = useState(true);
const [smallPopup, setSmallPopup] = useState(false);

useEffect(() => {
  if (bulletin) {
    setGuideBulletin(true);

    const timerGuide = setTimeout(() => {
      setGuideBulletin(false); 
      const timerPopup = setTimeout(() => {
        setSmallPopup(true); 
        setTimeout(() => {
          setSmallPopup(false); 
        }, 2000);
      }, 0); 

      return () => {
        clearTimeout(timerPopup); 
      };
    }, 1000);

    return () => clearTimeout(timerGuide); 
  }
}, [bulletin]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setBulletin(false);
        setShowWindow(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const [Timg, setTimg] = useState(true);
  const TClick = () => {
    setTimg(true);
    setEraserimg(false)
  }

  const [eraserimg, setEraserimg] = useState(false);
  const eraserClick = () => {
    setTimg(false);
    setEraserimg(true);
  }

  const [showText, setShowText] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [inputText, setInputText] = useState('');
  const [inputTexts, setInputTexts] = useState([]);


  const handleMouseMove = (event) => {
    if (editIndex === null) { 
    setCursorPos({
        x: event.clientX-170,
        y: event.clientY-90
    });
  }};
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();  // 이벤트의 기본 동작을 막습니다.
      if (inputText.trim()) {
        if (editIndex === null) {  // 새 텍스트 추가
          const newText = { inputText, x: cursorPos.x, y: cursorPos.y };
          setInputTexts([...inputTexts, newText]);
        } else {  // 기존 텍스트 수정
          const updatedTexts = inputTexts.map((item, idx) =>
            idx === editIndex ? { ...item, inputText: inputText } : item
          );
          setInputTexts(updatedTexts);
          setEditIndex(null);  // 수정 모드 종료
        }
        setInputText(''); // 입력 필드 초기화
      }
    }
  };
  

  const [editIndex, setEditIndex] = useState(null); // 수정할 텍스트의 인덱스 저장
  const handleTextClick = (index) => {
    if (eraserimg) {
      // 지우개가 활성화되어 있을 때만 텍스트를 삭제
      const updatedTexts = inputTexts.filter((_, i) => i !== index);
      setInputTexts(updatedTexts);
      console.log('지워')
    }

    else if (Timg) {
      setEditIndex(index);
      setInputText(inputTexts[index].inputText); // 현재 텍스트를 입력 필드로 로드
      console.log('글써')
    }
  };

  return (
    <div>
        <div className={`BulletinBoard ${className}`}>
            <div className={`TopBar ${className}`}></div>
            <div 
               className={`BulletinBoard-content ${eraserimg ? "active" : ""} ${className === "night" ? "night" : ""}`}
              onMouseEnter={() => setShowText(true)}
              onMouseLeave={() => setShowText(false)}
              onMouseMove={handleMouseMove} 
            >              
            <img src={className === "night" ? TODAYN : TODAY} className="TODAY"></img>
            <div className="pen-box">
              <img src={className === "night" ? TN : T}  className={`T ${className === "night" ? "night" : ""}`} onClick={TClick}></img>
              <img src={className === "night" ? eraserN : eraser} className={`eraser ${className === "night" ? "night" : ""}`} onClick={eraserClick}></img>
            </div>
            </div>
            <div className={`BottomBar ${className}`}></div>


            {showText && Timg && (
                <input
                    className={`bulletin-input-text ${className === "night" ? "night" : ""}`}
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    style={{
                        position: 'absolute',
                        left: `${editIndex !== null ? inputTexts[editIndex].x : cursorPos.x}px`,
                        top: `${editIndex !== null ? inputTexts[editIndex].y : cursorPos.y}px`,
                        transform: 'translate(-50%, 0%)',
                        zIndex: 2000 
                    }}
                    placeholder="텍스트를 입력해주세요."
                    autoFocus
                />
            )}

          {inputTexts.map((item, index) => (
            
            <div key={index} className="bulletin-memo"
            style={{ 
              position: 'absolute', 
              left: item.x, 
              top: item.y 
              }}>
                {eraserimg ? 
                (<span className={`erasergo ${className === "night" ? "night" : ""}`} onClick={() => handleTextClick(index)}> 
                {item.inputText} </span>) : 
                (<span className={`Tgo ${className === "night" ? "night" : ""}`} onClick={() => handleTextClick(index)}> 
                {item.inputText} </span>)}
              
            </div>
          ))}
         
               
        </div>

        {GuideBulletin && (<div className="BulletinBoardGuide">
            <p className="Welcome">Welcome!</p>
            <p className="p1">자유롭게 흔적을 남겨주세요.</p>
        </div>)}

        {smallPopup && (
          <div className="smallPopup">
            <p>게시판을 나가시려면</p>
            <span>Esc</span>
            <p>를 눌러주세요</p>
            
          </div>
        )}
    </div>
  );
};

export default Bulletin;
