// src/components/Auth.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
    const location = useLocation();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const code = new URLSearchParams(location.search).get('code'); // 인가코드 추출.
        const provider = new URLSearchParams(location.search).get('provider');
        if (code && provider) {
            sendCodeToBackend(code, provider); // 백엔드로 전달
        }
    }, [location]); //uri바뀔때마다(사용자교체와같은) 백엔드로 새로운 인가코드 전달.

    const sendCodeToBackend = async (code, provider) => {
        try {
            let response;
            if (provider === 'kakao') {
                response = await axios.post('', { code });
            } else if (provider === 'google') {
                response = await axios.post('', { code });
            }
    
            const { access_token } = response.data;
            getUserInfo(access_token, provider);
        } catch (error) {
            console.error(`Failed to send code to backend: ${error}`);
        }
    }; // 여기넣는 URI는 카카오 리다이렉트 URI가 아니라 백엔드 서버의 인가 코드를 처리하는 엔드포인트 URI여야 함. 아직 백엔드에서 개발 덜해서 마치면 넣도록~ 

    const getUserInfo = async (token, provider) => {
        try {
            const url = provider === 'kakao'
                ? 'https://kapi.kakao.com/v2/user/me'
                : 'https://www.googleapis.com/oauth2/v2/userinfo';

            const response = await axios.get(url, {
                headers: {// 엑세스 토큰을 포함하여 요청을 보내고, 카카오 api서버가 이 토큰을 사용해 사용자 요청을 인증하고 사용자 정보를 반환하도록 함.
                    Authorization: `Bearer ${token}`
                }
            });
            setUserInfo(response.data);
        } catch (error) {
            console.error(`Failed to fetch ${provider} user info: ${error}`);
        }
    };

    

    if (!userInfo) {
        const provider = new URLSearchParams(location.search).get('provider');
        return <div>{provider === 'google' ? '구글 로그인 중...' : '카카오 로그인 중...'}</div>;
    }

    return (
        <div>
            <h1>사용자 정보</h1>
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
    );
};

export default Auth;


