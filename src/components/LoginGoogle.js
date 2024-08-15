import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginGoogle = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      };

      fetch('https://www.dangil-artisticsw.site/auth/google/callback', fetchOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Google Token and user data:', data);
          console.log('User Name:', data.userName);
          localStorage.setItem('token', data.id_token);
          localStorage.setItem('userName', data.userName);  // 유저 이름 저장
          localStorage.setItem('showPopup', 'true'); // 팝업 표시 플래그 설정
          navigate('/');
        })
        .catch(error => {
          console.error('Google Login Error:', error);
        });
    } else {
      console.error('No authorization code found');
    }
  }, [navigate]);

  return <div>로딩중입니다. 조금만 기다려주세요</div>;
};

export default LoginGoogle;



// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LoginGoogle = () => {
//   const navigate = useNavigate();

//   // 특정 이름의 쿠키를 가져오는 함수
//   const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//     return null;
//   };

//   useEffect(() => {
//     // URL에서 인증 코드 추출
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get('code');

//     // 쿠키에서 session_id 추출
//     const sessionId = getCookie('session_id');

//     // 쿠키를 콘솔에 출력해서 확인
//     console.log('Session ID Cookie:', sessionId);

//     if (code) {
//       const fetchOptions = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ code: code }),
//       };

//       if (sessionId) {
//         // 쿠키가 있을 때만 credentials를 포함시킴
//         fetchOptions.credentials = 'include';
//       }

//       // 설정된 fetchOptions 객체를 로그로 출력
//       console.log('Fetch Options:', fetchOptions);

//       // Google 인증 코드를 FastAPI 서버로 전송
//       fetch('https://www.dangil-artisticsw.site/auth/google/callback', fetchOptions)
//         .then(response => {
//           // 응답 헤더를 콘솔에 출력
//           response.headers.forEach((value, name) => {
//             console.log(`${name}: ${value}`);
//           });

//           return response.json();
//         })
//         .then(data => {
//           console.log('Google Token and user data:', data);
//           localStorage.setItem('token', data.id_token);

//           // navigate를 상태 업데이트 이후에 호출하고, 무한 루프 방지
//           navigate('/');
//         })
//         .catch(error => {
//           console.error('Google Login Error:', error);
//         });
//     } else {
//       console.error('No authorization code found');
//     }
//   }, []); // navigate를 의존성 배열에서 제거

//   return <div>로딩중입니다. 조금만 기다려주세요</div>;
// };

// export default LoginGoogle;