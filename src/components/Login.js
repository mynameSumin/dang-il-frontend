// src/components/Login.js
import React from "react";
import { Button } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Login = () => {
  const handleGoogleLoginSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    console.log("Google Login Success:", decoded);

    // 서버로 Google 토큰을 전송하여 인증 처리
    try {
      const res = await axios.post("http://localhost:3000/auth", {
        token: response.credential,
      });
      console.log("Server response:", res.data);
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  return (
    <div>
      <Button
        onClick={() => {
          window.location.href = process.env.REACT_APP_KAKAO_AUTH_URL;
        }}
        variant="contained"
        color="primary"
      >
        카카오로 로그인하기
      </Button>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginFailure}
      />
    </div>
  );
};

export default Login;
