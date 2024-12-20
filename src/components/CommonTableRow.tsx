import React, { ReactNode } from 'react';

interface CommonTableRowProps {
  children: ReactNode;
}

const CommonTableRow: React.FC<CommonTableRowProps> = ({ children }) => {
  return <tr className="common-table-row">{children}</tr>;
};

export default CommonTableRow;
