import React, { ReactNode } from 'react';
import './CommonTable.css';

// Props 타입 정의
interface CommonTableProps {
  headersName: string[]; // 헤더 이름
  children: ReactNode; // 자식 컴포넌트
}

const CommonTable: React.FC<CommonTableProps> = ({ headersName, children }) => {
  return (
    <table className="common-table">
      <thead>
        <tr>
          {headersName.map((item, index) => (
            <th className="common-table-header-column" key={index}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default CommonTable;
