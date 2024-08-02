import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Auth from './components/Auth';
// import './pages/App.css';  // 스타일을 포함하고 있다면 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/auth/callback" element={<Auth />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  ); //위의 코드설명 : path가 /login일떄 Login 컴포넌트를 렌더링함.
};

export default App;


