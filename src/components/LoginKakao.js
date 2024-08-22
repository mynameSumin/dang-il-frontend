import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginKakao = () => {
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
        .then((response) => response.json()) // fetch 요청이 완료되면 응답이 response에 담김. response안의 json이란 함수를 실행하여 json형식으로 응답을 파싱함.
        .then((data) => {
          console.log("Kakao Token and user data:", data);

          const userName = data.name;

          localStorage.setItem("token", data.id_token); //setItem은 localStorage에 값을 저장하는 메서드이다. token은 키고 data.id_token은 값이다.
          localStorage.setItem("userName", userName); // 유저 이름 저장
          localStorage.setItem("showPopup", "true"); // 팝업 표시 플래그 설정
          navigate("/");
        })
        .catch((error) => {
          console.error("kakao Login Error:", error);
        });
    } else {
      console.error("No authorization code found");
    }
  }, [navigate]); // useEffect함수의 2번째 파라미터에 값을 넣으면 그 값이 변경될때마다 useEffect함수가 실행됨. 만약 아무값도 넣지 않으면 렌더링될때마다 실행됨.

  return null;
};

export default LoginKakao;
