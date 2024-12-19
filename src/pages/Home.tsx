import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 제거
        alert('로그아웃 되었습니다.');
        navigate('/login'); // 로그인 페이지로 이동
    };

    const postMain = () => {
        navigate('/home/postmain');
    }
    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            width: '100%', height: '100vh'
        }}>
            <h1>홈 화면</h1>
            <button onClick={onLogout} style={{ marginTop: '20px', padding: '10px 20px' }}>
                로그아웃
            </button>
            <button onClick={postMain} style={{ marginTop: '20px', padding: '10px 20px' }}>
                게시판
            </button>
        </div>
    );
}

export default Home;
