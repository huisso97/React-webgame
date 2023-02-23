import React, { useContext } from 'react';

// 내가 몇 번째 줄 몇 번째 칸인지에 대한 정보는 부모로부터 props를 받아서 작업
const Td = ({ rowIndex, cellIndex }) => {
  const { tableData, dispatch } = useContext(Table);

  // 내 데이터가 정확히 무엇인지 구성
  return <td>{tableData[rowIndex][cellIndex]}</td>;
};

export default Td;
