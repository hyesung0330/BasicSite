import React, { ReactNode } from 'react';

interface CommonTableColumnProps {
  children: ReactNode;
}

const CommonTableColumn: React.FC<CommonTableColumnProps> = ({ children }) => {
  return <td className="common-table-column">{children}</td>;
};

export default CommonTableColumn;
