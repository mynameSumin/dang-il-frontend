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
        // credentials: 'include',  // 쿠키를 포함하고 저장하도록 설정
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

