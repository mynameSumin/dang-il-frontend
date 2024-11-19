import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginGoogle from "./components/LoginGoogle";
import LoginKakao from "./components/LoginKakao";
import MainPageBeforeLogin from "./pages/MainPageBeforeLogin";
import UserPage from "./pages/UserPage";
import MainPage from "./pages/MainPage";

const App = () => {
  //login
  const [isLogin, setIsLogin] = useState(false);

  // 로그인 성공 시 로그인 상태 true로 변경
  const loginHandler = () => {
    setIsLogin(true);
  };

  // 로그아웃 성공 시 로그인 상태 false로 변경
  const logoutHandler = () => {
    setIsLogin(false);
  };

  const ProtectedRoute = ({ isLogin, children }) => {
    if (!isLogin) {
      return children;
    } else {
      window.location.href = "/mainPage"; // 새로고침하며 페이지 이동
      return null;
    }
  };

  return (
    <Router>
      <Routes>
        {/* 로그인된 경우엔 바로 메인페이지로 이동 */}
        <Route
          path="/"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <MainPageBeforeLogin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/auth/google/callback"
          element={<LoginGoogle loginHandler={loginHandler} />}
        />
        <Route
          path="/auth/kakao/callback"
          element={<LoginKakao loginHandler={loginHandler} />}
        />
      {/* 서버 종료로 인해 로그인이 안되더라도 mainPage 이동이 가능하도록 수정 */}
        <Route
          path="/mainPage"
          element={
            // <ProtectedRoute isLogin={isLogin}>
            //   <MainPage logoutHandler={logoutHandler} />
            // </ProtectedRoute>
            <MainPage logoutHandler={logoutHandler} />
          }
        />
        <Route path="/user/:userId" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
