import React, { memo } from 'react';
import Tr from './Tr';

const Table = memo(({ dispatch, tableData }) => {
  return (
    <table>
      <tbody>
        {Array(tableData?.length)
          .fill()
          .map((tr, i) => {
            return (
              <Tr
                key={i}
                dispatch={dispatch}
                rowIndex={i}
                rowData={tableData[i]}
              />
            );
          })}
      </tbody>
    </table>
  );
});

export default Table;
