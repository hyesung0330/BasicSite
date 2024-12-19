import React from 'react';
import PostList from './PostList';
import { useNavigate } from 'react-router-dom';

const PostMain: React.FC = () => {
  const navigate = useNavigate(); // 컴포넌트 내부에서 호출
  const posts = [
    { id: 1, title: '첫번째 게시글입니다.', date: '2020-10-25', views: 6 },
    { id: 2, title: '두번째 게시글입니다.', date: '2020-10-25', views: 5 },
    { id: 3, title: '세번째 게시글입니다.', date: '2020-10-25', views: 1 },
    { id: 4, title: '네번째 게시글입니다.', date: '2020-10-25', views: 2 },
    { id: 5, title: '다섯번째 게시글입니다.', date: '2020-10-25', views: 4 },
  ];

  const Backhome = () => {
    navigate('/home');
  };

  return (
    <>
      <button type="button" onClick={Backhome}>홈으로</button>
      <h1 style={{ textAlign: 'center' }}>게시글 목록</h1>
      <PostList headersName={['글번호', '제목', '등록일', '조회수']} posts={posts} />
    </>
  );
};

export default PostMain;
