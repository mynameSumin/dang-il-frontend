import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginKakao = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 인증 코드 추출
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      // Google 인증 코드를 FastAPI 서버로 전송
      fetch(`https://dangil-artisticsw.site/auth/kakao/callback`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Kakao Token and user data:", data);

          localStorage.setItem("token", data.id_token);
          localStorage.setItem("showPopup", "true"); // 팝업 표시 플래그 설정
          props.loginHandler();
          navigate("/mainpage");
        })
        .catch((error) => {
          console.error("kakao Login Error:", error);
        });
    } else {
      console.error("No authorization code found");
    }
  }, [navigate]);

  return null;
};

export default LoginKakao;
