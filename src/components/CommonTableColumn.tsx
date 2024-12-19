import React, { ReactNode } from 'react';

interface CommonTableColumnProps {
  children: ReactNode; // 자식 컴포넌트 타입
}

const CommonTableColumn: React.FC<CommonTableColumnProps> = ({ children }) => {
  return <td className="common-table-column">{children}</td>;
};

export default CommonTableColumn;
