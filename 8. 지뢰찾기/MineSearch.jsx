import { useContext, useReducer } from 'react';

export const TableContext = useContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
};

// 지뢰심는 함수
// 행,   칸  , 지뢰
const plantMine = (row, cell, mine) => {
  const cadidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];

  while (cadidate.length > row * cell - mine) {}
};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};
