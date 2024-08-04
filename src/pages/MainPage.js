import React from 'react';

const MainPage = () => {
  const handleLogin = () => {
    window.location.href = 'https://www.dangil-artisticsw.site/auth/google/login'; 
  }; //해당코드는 현재 url을 지정된 url로 바꾸는 기능을 가진다. 이 코드를 실행하면 브라우저가 새로운 URL로 리디렉션됨.
    //2. 버튼 클릭시 해당 사이트(이게 구글 로그인 사이트임)로 리디렉션된다.
  return (
    <div>
      <h1> 여기는 메인페이지입니다 !</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default MainPage;
