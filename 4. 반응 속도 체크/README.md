# 4. 반응 속도 체크

## React 조건문

### JSX 구조분해하기

조건문에 따른 렌더링이 다를 시, 구조분해를 해서 렌더링하는 방법도 있다.

```javascript
renderAverage();
```

## setTimeout 넣어 반응속도체크

### timeout 초기화

clearTimeout 내, 초기화할 timeoutId를 인자로 넣어 초기화한다.

setTimeout이 콜스택으로 넘어가더라도 clearTimeout으로 제거할 수 있다.

### time check

지속 시간을 재기 위해 `this.startTime`선언.

리렌더링을 원치않기 때문에, `state`가 아닌 `this.startTime`으로 선언한다.

## 성능 체크

개발자 도구 -> React

쓸데 없는 렌더링이 없는지 성능을 한다.

불필요한 렌더링이 일어나는 부분을 따로 컴포넌트로 떼서 분리한다.

## 반응 속도 체크 hooks로 전환하기

### useRef

화면은 바꾸고 싶지 않은데, 값을 바꾸고 싶을 경우(렌더링을 다시 시키고 싶지 않은 값)들은 useRef로 초기화한다.(화면에 영향을 안미친다)

useState의 값들은 setState가 호출될때마다 리렌더링되지만, ref.current는 값을 직접 바꾸어도 리렌더링이 되지 않는다.

ref는 변하는 값을 잠시 저장해둔다고 기억하자!
