# 6. 로또 추첨기

## 로또 추첨기 컴포넌트

### 컴포넌트 분리

재사용되는 요소들은 컴포넌트로 분리하여 재사용성을 높인다.

맨 밑의 자식 컴포넌트들은 대부분 화면 역할을 하는 경우도 있다.

그럴 경우, PureComponent(함수형에서 memo)로 감싸서 성능을 개선한다.

### HOC

함수를 감싸는 함수를 High Order Component, HOC라고 부른다.

memo가 이에 해당한다.

## setTimeout 여러 번 사용하기

다수의 timeoutId는 배열에 담은 후, 컴포넌트 종료 직전에 각 배열을 순회하여 clearTimeout으로 정리를 해준다.

-> 메모리 누수 문제 해결

## componentDidUpdate

특정 state에 대한 조건문을 걸어서 이벤트 실행 여부를 판단한다.

```javascript
componentDidUpdate(prevProps, prevState){
  // 바뀌기 전 state = prevState
  // 바뀐 후 state = state
}
```

## useEffect로 업데이트 감지하기

console.log를 찍어서 언제 useEffect가 실행되는지 확인하면서 값의 흐름을 파악한다.

### 의배배열이 빈배열인 경우

componentDidMount와 동일하다.

### 의존배열 내 요소가 있는 경우

componentDidMount와 componentDidUpdate 둘 다 수행한다.

객체형 요소들은 내부 배열 안의 값을 직접 바꿀 경우에는 불변성을 안지키는 것이기 때문에 감지하지 못한다.

### useEffect 내 return

componentWillUnmount와 동일하다.

## useMemo와 useCallback

### useMemo

복잡한 함수 결괏값을 기억해줘서 리렌더링을 방지해준다.

useMemo의 인자가 바뀌지 않는한, 내부 함수는 다시 실행되지 않는다.

```javascript
const lottoNumbers = useMemo(() => getNumbers(), []);
```

### useRef

일반 값을 기억

### useCallback

함수 자체를 기억하는 훅이다.

함수 컴포넌트가 재실행되어도, useCallback으로 감싼 함수는 다시 만들어지지 않는다.

useCallback 안에 쓰이는 state들은 항상, 의존 배열에 넣어줘야한다. (해당 state가 바뀌면 useCallback 내, 함수 재생성)

그렇지 않으면, 기억력이 좋은 useCallback이 옛날 값을 기억하고 있어, 원치 않는 값으로 로직이 실행될 수 있다.

> 자식컴포넌트에 함수를 props로 넘길때는 무조건 useCallback을 감싸야한다.
> 그렇지 않으면, 매번 함수가 재생성되어 자식컴포넌트에서도 이를 props가 변경된 것으로 감지하고 불필요한 리렌더링이 발생하기 때문이다.

## Hooks에 대한 자잘한 팁들

- 조건문, 함수, 반복문, 다른 hook에서 hook을 사용하지 않는다.
- componentDidMount만 하고 싶을 때
  ```javascript
  useEffect(() => {
    // 실행하고 싶은 이벤트
  }, []);
  ```
- componentDidUpdate만 구현하고 싶을 때

  ```javascript
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // 실행하고 싶은 이벤트
    }
  }, [바뀌는값]); // componentDidUpdate O, componentDidMount X
  ```
