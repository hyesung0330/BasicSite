import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostWrite: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const submitPost = async () => {
    try {
      await axios.post('http://localhost:8000/posts', { title, content });
      alert('글이 작성되었습니다!');
      navigate('/home/postmain'); // 글 목록 페이지로 이동
    } catch (error) {
      console.error('Error:', error);
      alert('글 작성에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1>글쓰기</h1>
      <div>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button onClick={submitPost}>작성</button>
    </div>
  );
};

export default PostWrite;
