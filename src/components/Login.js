// src/components/Login.js
import React from 'react';
import { Button } from '@mui/material';
// require("dotenv").config(); 이거는 서버측(node.js)에서만 사용해야한다고함.

const KAKAO_AUTH_URL = `${process.env.REACT_APP_KAKAO_AUTH_URL}?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;

const Login = () => {
    return (
        <div>
            <Button onClick={() => {
                window.location.href = KAKAO_AUTH_URL;
            }} variant="contained" color="primary">카카오로 로그인하기</Button>
            
            <Button onClick={() => {
                window.location.href = GOOGLE_AUTH_URL;
            }} variant="contained" color="secondary">구글로 로그인하기</Button>
        </div>
    );
};

export default Login;
