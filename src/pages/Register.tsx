import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../api';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/register', { username, password });
            alert('회원가입 성공! 로그인 페이지로 이동합니다.');
            navigate('/login'); 
        } catch (error) {
            console.error('Error:', error);
            alert('회원가입 실패');
        }
    };

    const BackLogin = () => {
        navigate('/login');
    }

    return (
    <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: '100%', height: '100vh'
            }}>
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}></form>
    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmit}>
            <button type="button" onClick={BackLogin}>뒤로가기</button>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">회원가입 완료</button>
            
</form>
</div>

    );
}

export default Register;
