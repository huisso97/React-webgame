# 7. 틱택톡

## 틱택토와 useReducer

비동기 처리를 위해서는 리덕스를 써야한다.
그러나, 기본적인 작은 규모의 프로젝트에서는 useReducer도 redux와 동일하게 동작하는 훅이므로 써도 좋다.

### useReducer

useReducer의 첫번째 인자는 reducer 함수로, state를 action에 따라 어떻게 바꿀지 처리한다.

두번째 인자인 initialState는 초기값을 선언한다.

```javascript
const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
};

const reducer = (state, action) => {};
const [state, dispatch] = useReducer(reducer, initialState);
```

## reducer, action, dispatch의 관계

### state를 바꾸고 싶다면?

state를 바꾸고 싶다면, action을 dispatch해서 state를 바꾼다. 그 과정에서 reducer가 특정 action에 따라 어떻게 state를 처리할지 정의한다.

dispatch안에 액션 객체를 넣어 dispatch를 통해 액션을 실행한다.

dispatch가 실행되면 reducer가 실행되어, action의 type에 따라 state를 처리해준다.

reducer에서는 값을 직접 바꾸면 안된다.(불변성을 지킨다.)

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_WINNER':
      // state.winner = action.winner; 이렇게 하면 안된다.
      return {
        ...state, // 스프레드 문법(얕은 복사)으로 값을 복사한 후, 바뀔 부분만 값을 추가하여 바꿈
        winner: action.winner,
      };
  }
};
```

## action 만들어 dispatch하기

리액트에서 불변성을 지키기 위해, action 과 함께온 값들은 얕은 복사를 통해 값을 바꿔줘야한다.

`immer`라는 라이브러리로 해당 코드의 가독성을 해결할 수 있다.

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,

      };
    }
```

## 틱택토 구현하기

Redux는 state가 동기적으로 바뀌는데, useReducer는 state가 비동기적으로 바뀐다.

비동기 state를 처리하기 위해서는 useEffect를 써야한다.

useEffect의 dependency에는 해당 비동기 state를 넣고, state가 바뀌었을 때 특정 로직을 처리한다.

## 테이블 최적화하기

props로 넘기는 값, 함수들은 useCallback, useMemo로 감싸는 것이 좋다. 왜냐하면, 감싸지 않으면 부모 컴포넌트가 렌더링될때 자식 컴포넌트도 같이 렌더링되기 때문이다.
