import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './pages/MainPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> 
        <Route path="/auth/callback" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;

//1. npm start하면 위의 route에서 path="/"에 해당하는 mainpage로 이동함.



