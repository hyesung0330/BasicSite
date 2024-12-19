import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/login', { username, password });
            localStorage.setItem('token', response.data.access_token);
            console.log('로그인 성공:', response.data);
            alert('로그인 성공!');
            navigate('/home'); // 홈 페이지로 이동
        } catch (error) {
            console.error('Error:', error);
            setError('로그인에 실패했습니다. ID와 비밀번호를 확인해주세요.');
        }
    };

    const goToRegister = () => {// 화살표 함수로 goToRegister라는 함수 정의. navigate를 사용해 페이지 이동 처리.
        navigate('/register'); // useNavigate 훅을 통해 제공되는 페이지 이동 함수. 해당 경로에 매핑된 컴포넌트를 렌더링
    }; // navigate() 함수는 인자로 전달된 경로로 이동.
    // 전체 동작 흐름
    // 1. 버튼 클릭으로 goToRegister 함수 호출
    // 2. navigate('/register') 가 실행되어 URL이 /register로 변경
    // 3. React Router 설정에 따라 /register 경로에 연결된 Register 컴포넌트가 렌더링

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            width: '100%', height: '100vh'
        }}>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <h2>로그인</h2>
                <input 
                    type="text" 
                    placeholder="Username" 
                    onChange={(e) => setUsername(e.target.value)} 
                    // 'e' 이벤트 객체. 'e.target.value' 입력 필드에 입력된 현재 값을 가져옴
                    value={username}
                    // value={username}: 입력 필드의 값 설정.username상태의 값이 입력 필드에 표시
                    // 단방향 데이터 흐름에 따라 상태 값이 변경되면 입력 필드의 값도 자동으로 변경.
                    // 이를 Controlled Component 라고 칭함.
                    style={{ marginBottom: '10px', padding: '10px' }}
                    // marginBottom: 입력 필드 아래 여백 생성
                    // padding: 입력 필드 내부의 여백 설정
                    // 종합 동작 흐름
                    // 1. 입력 필드가 화면에 렌더링
                    // 2. 사용자가 입력 필드에 값 입력 시, onChange 이벤트 발생
                    // 3. 입력된 값이 setUsername 함수를 통해 username 상태에 저장
                    // 4. 상태가 업데이트되면 입력 필드의 값(value)이 자동으로 변경 되어 화면에 표시
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    style={{ marginBottom: '10px', padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', marginBottom: '10px' }}>로그인</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button 
                    type="button" 
                    onClick={goToRegister}
                
                >
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default Login;
