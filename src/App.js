// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Login from './components/Login';
import MainPage from './components/MainPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
    return (
        <GoogleOAuthProvider clientId="878214109902-foblho0fdiscbn5top42n5g6l7393qpn.apps.googleusercontent.com">
            <Router>
                <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/mainpage" element={<MainPage />} />
                    <Route path="/" element={<Login />} />
                    {/* 필요한 다른 경로들도 설정 */}
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
};

export default App;


// // src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Auth from './components/Auth';
// import Login from './components/Login';
// import MainPage from './components/MainPage';

// const App = () => {
//     const [accessToken, setAccessToken] = useState(null);

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/auth" element={<Auth setAccessToken={setAccessToken} />} />
//                 <Route path="/mainpage" element={<MainPage accessToken={accessToken} />} />
//                 <Route path="/" element={<Login />} />
//                 {/* 필요한 다른 경로들도 설정 */}
//             </Routes>
//         </Router>
//     );
// };

// export default App;
