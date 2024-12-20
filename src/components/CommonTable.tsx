import React, { ReactNode } from 'react';
import './CommonTable.css';

interface CommonTableProps {
  headersName: string[];
  children: ReactNode;
}

const CommonTable: React.FC<CommonTableProps> = ({ headersName, children }) => {
  return (
    <table className="common-table">
      <thead>
        <tr>
          {headersName.map((item, index) => (
            <th key={index} className="common-table-header-column">{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default CommonTable;
