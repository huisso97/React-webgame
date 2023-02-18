# 5. 가위바위보

## 리액트 라이프사이클

### componentDidMount

컴포넌트가 DOM에 붙는 순간 특정 이벤트를 걸 수 있게 해준다.

즉, 컴포넌트 렌더가 첫 실행되고 난 직후 일어나는 동작들을 설정할 수 있다.

setState로 인한 리렌더링등으로는 더이상 componentDidMount가 재실행되지 않는다.

### componentWillUnmount

컴포넌트가 제거되기 직전에 등록하고자 하는 이벤트를 설정할 수 있다.

componentDidMount에서 실행했던 이벤트들을 제거하는 용도로도 사용한다.

### componentDidUpdate

리렌더링 후에는 componentDidUpdate 내 이벤트들이 실행된다.

### class 형 기준 라이프사이클 순서

1. constructor

- state 등이 실행

2. render

- 처음으로 렌더링 시작

3. ref

- 만약 ref를 설정한 것이 있으면, ref 실행

4. componentDidMount

- 첫 렌더링 된 후, 실행
- 비동기 요청을 많이 한다.

5. componentDidUpdate

- setState/props 바뀔때마다 render가 다시 실행되면 componentDidUpdate 실행

- shouldComponentUpdate
  - setState/props 바뀔때마다 특정 조건을 걸어서 리렌더링 시킬 것인지 여부를 결정하는 메서드

6. componentWillUnmount

- 부모가 나를 없앴을 때, 실도되면서 해당 컴포넌트 소멸
- 비동기 요청 정리를 한다.

## setInterval과 라이프사이클 연동하기

### setInterval, setTimeout

setInterval, setTimeout과 같은 비동기 요청들은 unmount시 정리해준다.

메모리를 차지하기 때문!

### 클로저 문제

비동기 함수에서 바깥의 변수값을 참조하면 클로저 문제가 발생한다.

그러므로 비동기 함수 내에서 변수값을 참조해서 사용한다.

함수 바깥의 변수값은 계속 해당 동일한 값을 반환해주기 때문에, 함수 내에서 참조값을 바꿀 수 없다.

## 고차 함수와 Q&A

### 고차 함수

```javascript

  onClickBtn = (choice) => {

  }


  render() {
    return(
        <button id="paper" className="btn" onClick={(()=>this.onClickBtn("보")}>
            보
          </button>
    )
  }
```

- 고차함수 위치 확인

```javascript

  onClickBtn = (choice) =>()=> {

  }


  render() {
    return(
        <button id="paper" className="btn" onClick={(this.onClickBtn("보")}>
            보
          </button>
    )
  }
```

## Hooks와 useEffect

### useEffect 라이프사이클 대체

```javascript
// componentDidMount
//componentDidUpdate 역할 (1대1 대응은 아님)
useEffect(() => {
  // componentWillUnmount 역할
  return () => {};
}, []);
```

### useEffect 인수 배열

두 번째 인수 배열에 넣은 값들이 바뀔 때, useEffect가 실행된다.
배열에는 useEffect를 다시 실행할 값만 넣는다.

## 클래스와 Hooks 라이프사이클 비교

### 클래스

클래스의 경우, componentDidMount나 componentDidUpdate에서 모든 state를 조건문으로 분기 처리한다.

```javascript
componentDidMount() {
  this.setState({
    imgCoord: 3,
    score:1,
    result:2
  })
}
```

### 함수

함수형 컴포넌트의 경우에는 state들마다 각각의 useEffect를 만들 수 있다.

```javascript
useEffect(() => {
  setImgCoord();
  setScore();
}, [imgCoord, score]);

useEffect(() => {
  setResult();
}, [result]);
```

## useInterval

```javascript
import { useRef, useEffect } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    // ref로 계속 최신 콜백을 실행하도록 하는 함수
    // 해당 useEfeect의 의존배열에 콜백을 안넣고 하기 최신 값을 참조하는 방법
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return savedCallback.current;
}

export default useInterval;
```

### callback을 ref로 감싸는 이유

- ref로 콜백을 참조하게 되면 3번째 useEffect에서는 콜백을 의존배열에 넣을 필요가 없다.
- 즉, 콜백이 바뀌어도 새로 setInterval이 안되지만 최신 callback을 참조할 수 있기 때문이다.
- 만약 아래와 같이 바로 의존배열에 넣어 구현한다면, callback이 바뀌면서 interval이 clear되고 다시 set되는 순간(0.1초)이 누적되어 딜레이되는 현상이 발생한다.

```javascript
function useInterval(callback, delay) {
  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, callback]);
}
```
