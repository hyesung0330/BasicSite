import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PostMain from './pages/PostMain';
import PostWrite from './pages/PostWrite';

function App() {
    // 토큰 검사: 토큰이 존재하고 비어있지 않은 경우만 로그인 상태로 판단
    const isAuthenticated = localStorage.getItem('token') && localStorage.getItem('token') !== '';

    console.log('isAuthenticated:', isAuthenticated); // 디버깅 로그 추가

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* 로그인 상태가 true일 때만 홈 페이지 접근 허용 */}
            <Route
                path="/home"
                element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
            />
            <Route path="/home/postmain" element={<PostMain />} />
            {/* 잘못된 경로 접근 시 로그인 페이지로 이동 */}
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/home/postwrite" element={<PostWrite />}
/>
        </Routes>
    );
}

export default App;
