// src/components/Auth.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const code = new URLSearchParams(location.search).get('code');
        if (code) {
            getKakaoToken(code);
        }
    }, [location]);

    const getKakaoToken = async (code) => {
        try {
            const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
                params: {
                    grant_type: 'authorization_code',
                    client_id: '', // 여기에 올바른 클라이언트 ID를 입력하세요.
                    redirect_uri: 'http://localhost:3000/auth',
                    code: code
                }
            });

            const { access_token } = response.data;
            console.log(access_token);
            getKakaoUserInfo(access_token);
        } catch (error) {
            console.error('Kakao Login Failed:', error);
        }
    };

    const getKakaoUserInfo = async (token) => {
        try {
            const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserInfo(response.data);
            navigate('/mainpage'); // 로그인 후 메인 페이지로 리디렉션
        } catch (error) {
            console.error('Failed to fetch Kakao user info:', error);
        }
    };

    if (!userInfo) {
        return <div>카카오 로그인 중...</div>;
    }

    return (
        <div>
            <h1>사용자 정보</h1>
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
    );
};

export default Auth;




