import React from 'react';
import CommonTable from '../components/CommonTable';
import CommonTableRow from '../components/CommonTableRow';
import CommonTableColumn from '../components/CommonTableColumn';

// Props 타입 정의
interface PostListProps {
  headersName: string[]; // 테이블 헤더 이름 배열
}

interface Post {
  id: number;
  title: string;
  date: string;
  views: number;
}

interface PostListProps {
  headersName: string[];
  posts: Post[]; // posts 속성 추가
}

const PostList: React.FC<PostListProps> = ({ headersName, posts }) => {
  return (
    <CommonTable headersName={headersName}>
      {posts.map((post) => (
        <CommonTableRow key={post.id}>
          <CommonTableColumn>{post.id}</CommonTableColumn>
          <CommonTableColumn>{post.title}</CommonTableColumn>
          <CommonTableColumn>{post.date}</CommonTableColumn>
          <CommonTableColumn>{post.views}</CommonTableColumn>
        </CommonTableRow>
      ))}
    </CommonTable>
  );
};

export default PostList;

