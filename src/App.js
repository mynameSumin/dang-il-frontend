// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Login from "./components/Login";
import MainPage from "./pages/MainPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="">
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/mainpage" element={<MainPage />} />
          {/* <Route path="/" element={<Login />} /> */}
          {/* 경로 임시 설정 */}
          <Route path="/" element={<MainPage />} />
          {/* 필요한 다른 경로들도 설정 */}
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
