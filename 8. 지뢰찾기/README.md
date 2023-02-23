# 8. 지뢰찾기

## Context API 소개와 지뢰찾기

### Context API

Context API를 설정하면 그 아래와 자유롭게 값 공유가 가능하다.

## createContext와 Provider

1. createContext 함수로 Context를 만들고, 안에 초기값을 넣는다.

2. Context API로 값을 공유하고자 하는 컴포넌트들을 Provider 로 감싸준다.

3. 자식 컴포넌트들에게 넘겨줄 값들을 value에 넣는다.

4. 자식 컴포넌트들은 useContext로 해당 값에 접근이 가능해진다.

```javascript
// 부모 컴포넌트
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
```

> 주의: 저렇게 value에 직접 값을 넣게 되면, 매번 새로운 객체로 값을 형성하기 때문에 자식 컴포넌트 리렌더링이 발생한다. 그러므로, value 값을 useMemo로 캐싱 후 넘겨준다.

```javascript
// 리팩토링
const MineSearch = () => {
  // dispatch는 값이 안바뀌기 때문에, 배열에 안넣어도된다.
  const value = useMemo(() => {
    tableData: state.tableData, dispatch;
  }, [state.tableData]);
  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};
```

```javascript
// 자식 컴포넌트
import { TableContext } from './MineSearch';
import { useContext } from 'react';

const Form = () => {
  const value = useContext(TableContext);
};
```

## useContext 사용해 지뢰 칸 렌더링

`Td`, `Tr` , `Table` 컴포넌트 참고

## 왼쪽 오른쪽 클릭 로직 작성하기

### dispatch와 ContextAPI

- useContext로 공유하고 있는 dispatch를 가지고 온다.
- dispatch로 특정 이벤트를 실행시켜, 값을 바꾼다.
- 해당 값을 useContext로 접근한다.

### 오른쪽 클릭 로직

1. `e.preventDefault()`로 우클릭 기본 이벤트 결과를 없앤다.
2. switch 로 데이터에 따라 이벤트를 처리한다.

## 지뢰 개수 표시하기

## 빈 칸들 한 번에 열기

## 승리 조건 체크와 타이머

## Context api 최적화
