import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); //navigate를 사용하여 페이지를 이동할수있다.

  useEffect(() => {
    // URL에서 인증 코드 추출
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // 인증 코드를 FastAPI 서버로 전송
      fetch(`https://www.dangil-artisticsw.site/auth/google/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
      })
        .then(response => response.json()) // fetch 요청이 완료되면 응답이 response에 담김. response안의 json이란 함수를 실행하여 json형식으로 응답을 파싱함.
        // function (a,b){ return a+b} = (a,b) => a+b
        .then(data => {
          console.log('Token and user data:', data);
          localStorage.setItem('token', data.id_token);
          navigate('/');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.error('No authorization code found');
    }
  }, [navigate]); // useEffect함수의 2번째 파라미터에 값을 넣으면 그 값이 변경될때마다 useEffect함수가 실행됨. 만약 아무값도 넣지 않으면 렌더링될때마다 실행됨.

  return <div>로딩중입니다. 조금만 기다려주세요</div>;
};

export default Login;
