import React, { useState, useRef, useEffect } from "react";
import { FiEdit } from 'react-icons/fi';
import Group43 from "../assets/Group 43.png";
import Group43N from "../assets/Group 43-n.png"
import Union from "../assets/Union.png";
import "../styles/Panel.css";

const Panel = ({ isListVisible, LeftSettingtoggle }) => {
//tag 관련 
  const [activeTag, setActiveTag] = useState('');
  const [defaultTag, setdefaultTag] = useState(true);
  const [tagbutton, settagbutton] = useState(false); //태그버튼 눌렀을때 색변환
  const panelRef = useRef(null);
  const [mode, setMode] = useState(true);

  const TagClick = (tag) => {
    setActiveTag(tag);
    setdefaultTag(false);
    settagbutton(true);
  };
  
  // 패널이 열릴 때 초기 상태로 리셋
  useEffect(() => {
    if (isListVisible) {
      setdefaultTag(true);
      setActiveTag('');
      settagbutton(false);
    }
  }, [isListVisible]);  // 의존성 배열에 isListVisible 추가

  return (
    <div>
      <FiEdit onClick={LeftSettingtoggle} style={{ cursor: "pointer" }} />
      {mode ? (
            <div ref={panelRef} className={`list-panel ${isListVisible ? "visible" : ""}`}>
            <div className='panel-topdiv'>
              <p className='deskDesign'>데스크 꾸미기</p>
              <img src={Group43} id="Group43"/>
            </div>
            <div className="rowline1"></div>
            <div className="all-tag">
            <div className={`design-tag ${activeTag === 'curtain' ? "active" : ""}`} onClick={() => TagClick('curtain')}>
                <p className={activeTag === 'curtain' ? "active" : ""}>#커텐</p>
              </div>
              <div className={`design-tag ${activeTag === 'wallpaper' ? "active" : ""}`} onClick={() => TagClick('wallpaper')}>
                <p className={activeTag === 'wallpaper' ? "active" : ""}>#벽지</p>
              </div>
              <div className={`design-tag ${activeTag === 'board' ? "active" : ""}`} onClick={() => TagClick('board')}>
                <p className={activeTag === 'board' ? "active" : ""}>#게시판</p>
              </div>
              <div className={`design-tag ${activeTag === 'lighting' ? "active" : ""}`} onClick={() => TagClick('lighting')}>
                <p className={activeTag === 'lighting' ? "active" : ""}>#조명</p>
              </div>
            </div>
            <div className="rowline1"></div>
            {defaultTag === true && (
              <div className='default-panel-design'>
                <p className='all-items'>모든 아이템(9)</p>
                <div className="panel-textbox">
                  <div>
                    <p className="panel-text">모던한 커텐</p>
                    <div className="panel-box">
                      {/*여기에 이미지 들어가야함*/}
                    </div>
                  </div>
  
                  <div>
                    <p className="panel-text">블라인드 커텐</p>
                    <div className="panel-box">
                      {/*여기에 이미지 들어가야함*/}
                    </div>
                  </div>
                </div>
  
                <div className="panel-textbox">
                  <div>
                    <p className="panel-text">모던한 벽지</p>
                    <div className="panel-box">
                      {/*여기에 이미지 들어가야함*/}
                    </div>
                  </div>
  
                  <div>
                    <p className="panel-text">별이 쏟아지는 벽지</p>
                    <div className="panel-box">
                      {/*여기에 이미지 들어가야함*/}
                    </div>
                  </div>
                </div>
  
                <div className="panel-textbox">
                  <div>
                    <p className="panel-text">모던한 게시판</p>
                    <div className="panel-box">
                      {/*여기에 이미지 들어가야함*/}
                    </div>
                  </div>
  
                  <div>
                    <p className="panel-text">마구잡이 게시판</p>
                    <div className="panel-box">
                      {/*여기에 이미지 들어가야함*/}
                    </div>
                  </div>
                </div>
  
                <div className="panel-textbox">
                  <div>
                    <p className="panel-text">감성 옐로우 라이트</p>
                    <div className="panel-box">
                      {/*여기에 이미지 들어가야함*/}
                    </div>
                  </div>
  
                  <div>
                    <p className="panel-text">집중 화이트 라이트</p>
                    <div className="panel-box">
                      {/*여기에 이미지 들어가야함*/}
                    </div>
                  </div>
                </div>
  
                <div className="panel-textbox">
                  <div>
                    <p className="panel-text">총명 블루 라이트</p>
                    <div className="panel-box">
                      {/*여기에 이미지 들어가야함*/}
                    </div>
                  </div>
                </div>
              </div>)}
  
                    {activeTag === 'curtain' && (
                  <div id="curtain">
                  <p className='all-items'>커텐 아이템(2)</p>
                    <div className="panel-textbox">
                      <div>
                        <p className="panel-text">커텐 제거</p>
                        <div className="panel-box"> 
                          <img src={Union} id="Union"/>
                        </div>
                      </div>
  
                      <div>
                        <p className="panel-text">모던한 커텐</p>
                        <div className="panel-box"></div>
                      </div>
                    </div>
                    
                    <div className="panel-textbox">
                      <div>
                        <p className="panel-text">블라인드 커텐</p>
                        <div className="panel-box"></div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTag === 'wallpaper' && (
                  <div id="wallpaper">
                    <p className='all-items'>벽지 아이템(2)</p>
                    <div className="panel-textbox">
                      <div>
                        <p className="panel-text">모던한 벽지</p>
                        <div className="panel-box"></div>
                      </div>

                      <div>
                        <p className="panel-text">별이 쏟아지는 벽지</p>
                        <div className="panel-box"></div>
                      </div>                      
                    </div>
                  </div>
                )}
                {activeTag === 'board' && (
                  <div id="board">
                    <p className='all-items'>게시판 아이템(2)</p>
                    <div className="panel-textbox">
                      <div>
                        <p className="panel-text">모던한 게시판</p>
                        <div className="panel-box"></div>
                      </div>

                      <div>
                        <p className="panel-text">마구잡이 게시판</p>
                        <div className="panel-box"></div>
                      </div>                      
                    </div>
                  </div>
                )}
                {activeTag === 'lighting' && (
                  <div id="lighting">
                    <p className='all-items'>조명 아이템(3)</p>
                    <div className="panel-textbox">
                      <div>
                        <p className="panel-text">감성 옐로우 라이트</p>
                        <div className="panel-box"> 
                        </div>
                      </div>
  
                      <div>
                        <p className="panel-text">집중 화이트 라이트</p>
                        <div className="panel-box"></div>
                      </div>
                    </div>
                    
                    <div className="panel-textbox">
                      <div>
                        <p className="panel-text">총명 블루 라이트</p>
                        <div className="panel-box"></div>
                      </div>
                    </div>
                  </div>
                )}
                  </div>
          ) : (
            <div ref={panelRef} className={`list-panel ${isListVisible ? "visible" : ""}`}>
          <div className='panel-topdiv'>
            <p className='deskDesign-n'>데스크 꾸미기</p>
            <img src={Group43N} id="Group43-n"/>
          </div>
          <div className="rowline1"></div>
          <div className="all-tag">
            <div className="design-tag-n" onClick={() => TagClick('curtain')}><p>#커텐</p></div>
            <div className="design-tag-n" onClick={() => TagClick('wallpaper')}><p>#벽지</p></div>
            <div className="design-tag-n" onClick={() => TagClick('board')}><p>#게시판</p></div>
            <div className="design-tag-n" onClick={() => TagClick('lighting')}><p>#조명</p></div>
          </div>
          <div className="rowline1"></div>
          {defaultTag === true && (
            <div className='default-panel-design'>
              <p className='all-items-n'>모든 아이템(9)</p>
              <div className="panel-textbox">
                <div>
                  <p className="panel-text-n">모던한 커텐</p>
                  <div className="panel-box">
                    {/*여기에 이미지 들어가야함*/}
                  </div>
                </div>

                <div>
                  <p className="panel-text-n">블라인드 커텐</p>
                  <div className="panel-box">
                    {/*여기에 이미지 들어가야함*/}
                  </div>
                </div>
              </div>

              <div className="panel-textbox">
                <div>
                  <p className="panel-text-n">모던한 벽지</p>
                  <div className="panel-box">
                    {/*여기에 이미지 들어가야함*/}
                  </div>
                </div>

                <div>
                  <p className="panel-text-n">별이 쏟아지는 벽지</p>
                  <div className="panel-box">
                    {/*여기에 이미지 들어가야함*/}
                  </div>
                </div>
              </div>

              <div className="panel-textbox">
                <div>
                  <p className="panel-text-n">모던한 게시판</p>
                  <div className="panel-box">
                    {/*여기에 이미지 들어가야함*/}
                  </div>
                </div>

                <div>
                  <p className="panel-text-n">마구잡이 게시판</p>
                  <div className="panel-box">
                    {/*여기에 이미지 들어가야함*/}
                  </div>
                </div>
              </div>

              <div className="panel-textbox">
                <div>
                  <p className="panel-text-n">감성 옐로우 라이트</p>
                  <div className="panel-box">
                    {/*여기에 이미지 들어가야함*/}
                  </div>
                </div>

                <div>
                  <p className="panel-text-n">집중 화이트 라이트</p>
                  <div className="panel-box">
                    {/*여기에 이미지 들어가야함*/}
                  </div>
                </div>
              </div>

              <div className="panel-textbox">
                <div>
                  <p className="panel-text-n">총명 블루 라이트</p>
                  <div className="panel-box">
                    {/*여기에 이미지 들어가야함*/}
                  </div>
                </div>
              </div>
            </div>)}

          {activeTag === 'curtain' && (
            <div id="curtain">
              
            </div>
          )}
          {activeTag === 'wallpaper' && (
            <div id="wallpaper">
              {/* 여기에 벽지 관련 내용 */}
              <p>벽지 관련 내용이 표시됩니다.</p>
            </div>
          )}
          {activeTag === 'board' && (
            <div id="board">
              {/* 여기에 게시판 관련 내용 */}
              <p>게시판 관련 내용이 표시됩니다.</p>
            </div>
          )}
          {activeTag === 'lighting' && (
            <div id="lighting">
              {/* 여기에 조명 관련 내용 */}
              <p>조명 관련 내용이 표시됩니다.</p>
            </div>
          )}
          </div>
          )}
    </div>
  );
};

export default Panel;
