# 1. 구구단

## 첫 리액트 컴포넌트 (class)

기본기를 다지기 위해 `create-react-app` 이 아닌 `html`로 시작

리액트는 데이터와 화면의 일치를 목표로 한다.

즉, 데이터가 바뀌면 화면도 자동으로 바뀌는 원리를 기반으로 작동한다. (데이터 중심)

### 컴포넌트란?

데이터와 화면(return문)을 하나로 묶어 놓은 단위를 컴포넌트라고 한다.

### 가독성을 위한 JSX(XML!)

#### 원시적인 JSX return 문

```javascript
return React.createElement('button', {onClick:()=>this.setState({liked:true}), "Like"})
```

#### onClick 함수에 arrow function으로 setState를 처리하는 이유

1번의 jsx코드는 2번의 자바스크립트 코드의 click 함수에 대한 로직이 동일하다.

즉, onClick의 자리는 함수 자리이므로 함수를 넘겨줘야하는데(arrow function 혹은 arrow function으로 만들어진 함수), setState는 함수가 아니기 때문에 함수 형태로 넣어주는 것이다.

```javascript
// 1. jsx 코드
...
  return (
    <button onClick={() => this.setState({ liked: true })}>Like</button>
  );
...

// 2. javascript
  addEventListener("click", () => this.setState({liked:true}))
```

#### babel

위의 코드를 그대로 돌리면 자바스크립트는 jsx문법을 모르기 때문에 에러가 뜬다.

이때 babel을 사용하여 react코드를 javascript 코드로 변환한다.

1. 아래의 스크립트를 추가한다.
   `<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>`
2. 각 스크립트 태그마다 `type="text/babel`을 추가한다.

#### React 17 vs React 18

- React 17

```javascript
ReactDOM.render(<LikeButton />, document.querySelector("#root")); // React 17버전 코드
```

- React 18
  - React 18 버전에서 위의 17버전의 코드로 구성이 되어있다면, 작동은 하지만 18버전의 기능을 사용할 수 없다.

```javascript
ReactDOM.createRoot(document.querySelector("#root")).render(<LikeButton />);
```

### 클래스 컴포넌트의 형태

#### React의 불변셩

React에서는 객체를 함부로 바꾸지 않는다.(불변성을 지킨다)

```javascript
// 아래와 같이 직접 바꾸지 않는다.
<button onClick={() => (this.state.liked = true)}>Like</button>
```

#### 자바스크립트 배열 메서드 차이

##### pop, push, shift, splice

- 배열을 직접적으로 수정한다.
- 리액트에서는 해당 객체들도 직접 객체를 바꾸면 안된다.

##### concat, slice

- 새로운 배열을 만들어낸다.
- 리액트에서는 위의 메서드를 활용하여 객체를 복사해서 수정한다.

### 구구단 리액트로 만들기

`GuGuDan.html` 코드 참고

### Fragment와 기타 팁들

#### Fragment vs div

- 자식 태그들을 감싸는 부모 태그를 만들 때, `div`의 경우 불필요한 css 태그가 하나 더 생기게 된다.
- Fragment(<></>)의 경우, 위의 문제점을 해결해준다.

### 함수형 setState

만약 예전 state와 변경된 현재의 state를 같이 쓰고 싶다면?

- setState안에 함수를 만들어서 prevState를 불러온다!

```javascript
this.setState((prevState) => {
  return {
    result: `${prevState.value} 정답`,
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: "",
  };
});
```

### ref

DOM에 직접 접근하고 싶을 때, ref 속으을 추가하여 이벤트를 걸어주면 된다.

### jsx 내 함수는 따로 뺀다.

jsx는 데이터가 바뀔 때마다 리렌더링 된다. 그러면 jsx 내 구현된 함수 또한 재생성되어 렌더링되기 때문에 웹 성능이 낭비된다.

그래서 함수와 같은 로직들은 따로 만들어 변수로 할당한다.
