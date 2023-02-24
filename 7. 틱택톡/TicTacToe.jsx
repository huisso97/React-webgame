import Table from './Table';
import React, { useEffect, useReducer } from 'react';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

// action은 상수로 관리
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner 이렇게 직접 값을 바꾸면 안됨
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer 라는 라이브러리로 가독성 해결할 수 있음
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  // 현재찍은 좌표 기준으로 상, 하, 대각선 2방향 체크
  useEffect(() => {
    const [row, cell] = recentCell;
    // 최초 row,cell 값을 -1로 잡아서 표 안의 좌표와의 관심사를 분리하였음
    // 최초 렌더링시에는 둘 다 -1이므로 return
    if (row < 0) return;

    let win = false;
    if (
      (tableData[row][0] === turn) &
      (tableData[row][1] === turn) &
      (tableData[row][2] === turn)
    )
      win = true;
    if (
      (tableData[0][cell] === turn) &
      (tableData[1][cell] === turn) &
      (tableData[2][cell] === turn)
    )
      win = true;
    if (
      (tableData[0][0] === turn) &
      (tableData[1][1] === turn) &
      (tableData[2][2] === turn)
    )
      win = true;
    if (
      (tableData[0][2] === turn) &
      (tableData[1][1] === turn) &
      (tableData[2][0] === turn)
    )
      win = true;

    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all true면 무승부라는 뜻
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: SET_WINNER, winner: null });
        dispatch({ type: RESET_GAME });
      } else {
        // 아직 게임중이라면 차례를 바꾼다
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);
  return (
    <>
      <Table tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
