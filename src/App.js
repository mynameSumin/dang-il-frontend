import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginGoogle from './components/LoginGoogle';
import LoginKakao from './components/LoginKakao';
import MainPage from './pages/MainPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> 
        <Route path="/auth/google/callback" element={<LoginGoogle />} />
        <Route path="/auth/kakao/callback" element={<LoginKakao />} />
      </Routes>
    </Router>
  );
};

export default App;

//1. npm start하면 위의 route에서 path="/"에 해당하는 mainpage로 이동함.

