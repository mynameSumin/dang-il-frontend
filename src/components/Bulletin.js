import React, { useState, useEffect, useRef}  from 'react';
import "../styles/Bulletin.css";
import TODAY from "../assets/TODAY.png";
import eraser from "../assets/eraser.png";
import eraserOn from "../assets/eraserOn.png";
import T from "../assets/T.png";
import circlee from "../assets/circlee.png";
import Rectangle from "../assets/Rectangle.png";
import Star from "../assets/Star.png";




const Bulletin = ({bulletin,setBulletin, setShowWindow}, ) => {
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
    console.log('sa')
  }

  const [eraserimg, setEraserimg] = useState(false);
  const eraserClick = () => {
    setTimg(false);
    setEraserimg(true);

    // setTimg(false);
    // setEraserimg(prev => !prev);
    console.log(eraserimg)
  }

  const [showText, setShowText] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [inputText, setInputText] = useState('');

  const [inputTexts, setInputTexts] = useState([]);

  const handleMouseMove = (event) => {
    setCursorPos({
        x: event.clientX-170,
        y: event.clientY-90
    });
  };
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputText) {
      const newText = { inputText, x: cursorPos.x, y: cursorPos.y };
      setInputTexts([...inputTexts, newText]);
      setInputText(''); // 입력 필드 초기화
      e.preventDefault();
      console.log(newText)
    }
    // if (e.key === 'Enter' && inputText.trim()) {
    //   let updatedImages = [...images];
    //   updatedImages[currentImageIndex].texts.push({ text: inputText, x: cursorPos.x, y: cursorPos.y });

    //   setInputText('');
    //   setCurrentImageIndex((currentImageIndex + 1) % images.length);
    //   setImages(updatedImages);
    //   e.preventDefault();

    // }
  }
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const [images, setImages] = useState([
  //   { id: 1, src: "../assets/Rectangle.png", texts: [] },
  //   { id: 2, src: "../assets/circlee.png", texts: [] },
  //   { id: 3, src: "../assets/Star.png", texts: [] },
  // ]);

  const handleTextClick = (index) => {
    if (eraserimg) {
      // 지우개가 활성화되어 있을 때만 텍스트를 삭제
      const updatedTexts = inputTexts.filter((_, i) => i !== index);
      setInputTexts(updatedTexts);
    }
  };

  return (
    <div>
        <div className="BulletinBoard">
            <div className="TopBar"></div>
            <div 
             className={`BulletinBoard-content ${
               eraserimg ? "active" : ""
            }`}
            onMouseEnter={() => setShowText(true)}
            onMouseLeave={() => setShowText(false)}
            onMouseMove={handleMouseMove} 
            >              
            <img src={TODAY} className="TODAY"></img>
            <div className="pen-box">
              <img src={T} className="T" onClick={TClick}></img>
              <img src={eraser} className="eraser" onClick={eraserClick}></img>
            </div>
            </div>
            <div className="BottomBar"></div>


            {showText && !eraserimg && Timg && (
                <input
                    className="bulletin-input-text"
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    style={{
                        position: 'absolute',
                        left: `${cursorPos.x}px`,
                        top: `${cursorPos.y}px`,
                        transform: 'translate(-50%, 0%)',
                        zIndex: 2000 
                    }}
                    placeholder="텍스트를 입력해주세요."
                    autoFocus
                />
            )}
            {/* {images.map((image, index) => (
              <div key={image.id} style={{ position: 'relative' }}>
                <img src={image.src} alt={`Image ${index + 1}`} />
                {image.texts.map((text, idx) => (
                  <div key={idx} style={{ position: 'absolute', left: text.x, top: text.y }}>
                    {text.text}
                  </div>
                ))}
              </div>
          ))} */}

                {inputTexts.map((item, index) => (
                  
                  <div key={index} className="bulletin-memo"
                  style={{ 
                    position: 'absolute', 
                    left: item.x, 
                    top: item.y 
                    }}
                     // 클릭 시 삭제하는 이벤트
                    >
                    <span className="erasergo" onClick={() => handleTextClick(index)}> {item.inputText} </span>
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
