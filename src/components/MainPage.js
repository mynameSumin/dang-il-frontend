// src/components/MainPage.js
import React from 'react';

const MainPage = () => {
    return (
        <div>
            <h1>메인 페이지</h1>
            <p>환영합니다! 로그인에 성공하셨습니다.</p>
        </div>
    );
};

export default MainPage;


// // src/components/MainPage.js
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const MainPage = ({ accessToken }) => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log('Access Token:', accessToken); // 액세스 토큰 로그 확인
//     }, [accessToken]);

//     const logout = async () => {
//         try {
//             // 카카오 로그아웃 요청
//             await axios.post('https://kapi.kakao.com/v1/user/logout', null, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}` // 사용자 액세스 토큰을 사용합니다.
//                 }
//             });
//             console.log('로그아웃 성공');
//             // 로그아웃 후 메인 페이지로 이동
//             navigate('/');
//         } catch (error) {
//             console.error('로그아웃 실패:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>메인 페이지</h1>
//             <p>환영합니다! 로그인에 성공하셨습니다.</p>
//             <button onClick={logout}>로그아웃</button>
//         </div>
//     );
// };

// export default MainPage;


