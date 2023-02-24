import React, { memo, useCallback, useContext } from 'react';
import { CLICK_CELL } from './TicTacToe';

// 내가 몇 번째 줄 몇 번째 칸인지에 대한 정보는 부모로부터 props를 받아서 작업
const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  const handleClick = useCallback(() => {
    // 이미 클릭을 했다면 dispatch 되지 않도록 처리
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  // 내 데이터가 정확히 무엇인지 구성
  return <td onClick={handleClick}>{cellData}</td>;
});

export default Td;
