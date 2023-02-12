# 3. 숫자야구

## import와 require 비교

### import 구조 분해 할당

exports 되는 요소가 객체나 배열이면 구조 분해할 수 있다.

### 노드 모듈 시스템

노드 모듈 시스템에서는 아래의 두 코드가 같다.

```javascript
module.exports = {hello:"a"}
exports hello = "a"
```

첫번째 모듈 문법은 common.js이고,
두번째 코드는 es2015 모듈 문법이다.

```javascript
// common.js
const React = require("react");
exports.hello = "hello";
module.exports = NumberBaseball;
```

```javascript
import React, { Component } from "react";

class NumberBaseball extends Component {}

export const hello = "hello"; // import {hello}
export const bye = "hello"; // import {hello, bye}
export default NumberBaseball;
```

## 리액트 반복문(map과 key)

변하는 데이터는 state로 관리한다.

### map

반복되는 것은 배열로 만든다.
map 메서드로 배열 내 요소들을 하나씩 리턴한다.

### key

map 리턴 내 최상위 태그에는 무조건 고유값을 key로 넣어준다.

## 컴포넌트 분리와 props

map return 문의 태그들이 많다면, 하나의 컴포넌트로 분리한다.
필요한 함수와 state는 props로 해당 컴포넌트에 넘겨준다.

### 컴포넌트 분리를 하는 이유

1. 성능 (컴포넌트 렌더링 최적화 가능)
2. 가독성 (코드 관리가 용이)
3. 재사용성 (컴포넌트화하여 재사용성을 높임)

## 주석과 메서드 바인딩

### 리액트 주석

```javascript
{
  /* */
}
```

### 메서드 바인딩

메서드를 화살표 함수(1번째 코드)로 안쓰면 this를 현재 클래스로 가리킬 수 없다.
만약 안쓰고 싶다면, constructor로 구성해서 각 메서드들을 this와 바인딩 해줘야한다.(2번째 코드)

```javascript
...
class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: 0,
    fruits: [],
  };

  onSubmitForm = () => {};

  onChangeInput = () => {};

  render() {}
...
```

```javascript
...
class NumberBaseball extends Component {
  constructor(props) {
    super(props);
    this.state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: 0,
    fruits: [],
    };
    this.onSubmitForm = this.onSubmitForm.bind(this)
  }
  onSubmitForm(e) {
    e.preventDefault
    console.log(this.state.value)
  };

  // 이 메서드는 바인딩이 안되어서 에러
  onChangeInput() {};

  render() {}
...
```

## 숫자야구 만들기

react에서는 불변성을 지키기 위해 push 등 원본배열을 바꾸는 메서드는 쓰면 안된다.

왜냐하면 react가 뭐가 바꼈는지 감지를 못하기 때문이다.

그래서 기존배열을 복사한 후, 새로운 것을 넣어줘야한다.

```javascript
const array2 = [...array, 2];
```

## 숫자야구 Hooks로 전환하기(+useState lazy init)

- 함수 매개변수 내, props를 구조분해할당으로 가져올 수 있다.

- useState내 함수 사용법
  ```javascript
  // 리렌더링할때 최초값 자리이기 때문에 값은 두번째 이상 값부터는 무시하나,  함수가 계속 생성된다.
  const [] = useState(getNumbers());
  // 첫번째 호출에서나온 값만 저장하고, 함수는 재생성안된다.
  useState(getNumbers);
  ```
- setState에서는 매개변수자리가 함수자리이기때문에, 함수를 호출해서 어어야한다.
- 참고 코드

### [숫자야구 함수 컴포넌트](./NumberBaseball-func.jsx)

## React Devtools

리렌더링 자주 일어나는 등의 성능적인 부분을 확인하기 위해 Devtools를 사용한다.

## shouldComponentUpdate

### setState 호출 시, 리렌더링 발생

아래의 코드에서는 onClick내 setState를 호출하기 때문에, 클릭시 리렌더링 발생한다.

```javascript
class Test extends Component {
  state = {
    counter: 0,
  };

  onClick = () => {
    this.setState({});
  };
  render() {
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}
```

### shouldComponentUpdate

어떨 때 리렌더링 되어야하는지 조건을 적어줘서 업데이트를 시켜준다.

```javascript
class Test extends Component {
  state = {
    counter: 0,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter !== nextState.counter) {
      return true;
    }
    return false;
  }

  onClick = () => {
    this.setState({});
  };
  render() {
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}
```

## 억울한 자식 리렌더링 막기(PureComponent와 memo)

### PureComponent

shouldComponentYpdate를 구현한 컴포넌트이다.

원시타입의 state들은 변화를 감지하여, 변화가 일어날 때에만 리렌더링시킨다.

{a:1}에서 setState({a:1})을 할 때, 새로 렌더링 하므로 state에 객체 구조를 안쓰는게 좋다.

또한 내부 구조가 이중, 삼중으로 복잡한 구조로 이루어진 객체 값들은 변화 감지하기 어려우므로, 지양한다.

```javascript
class Test extends PureComponent {
  state = {
    counter: 0,
  };

  onClick = () => {
    this.setState({});
  };
  render() {
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}
```

### memo

부모 컴포넌트가 리렌더링 되면 자식 컴포넌트도 같이 리렌더링된다.
class 에만 PureComponent를 사용할 수 있기 때문에, 함수형에서는 memo를 사용해서 props(자식컴포넌트에서는 state)가 바뀔때에만 리렌더링 시킨다.

## React.createRef

class 형에서 ref를 쓸 때, createRef로 참조값을 초기화한다.
ref.current로 값을 사용한다.

```javascript
// class형 컴포넌트(createRef적용 전)

...
this.inputRef.focus()
...
inputRef;

onInputRef = (c) => {
  this.inputRef = c
}

reunder(){
  return(
    ...
    <input ref={this.onInputRef}/>
  )
}
```

```javascript
// class형 컴포넌트(createRef적용 후)

...
this.inputRef.current.focus()
...
inputRef = createRef()

reunder(){
  return(
    ...
    <input ref={this.inputRef}/>
  )
}
```

## props와 state 연결하기

render 안에서는 setState를 쓰면 무한 리렌더링 시키므로 주의한다.

setState는 값의 변화를 유발 -> render -> render 내 setState 호출 -> render ...

### 자식이 부모의 state를 바꾸는 방법

props를 useState로 초기화 하여, setState로 바꿔준다.

즉, props를 직접 바꾸지 말고, state로 바꾸어서 부모의 props를 바꾸지 않게 한다.

```javascript
const Try = memo(({ tryInfo }) => {
  // props를 state로 바꾼다.
  const [result, setResult] = useState(tryInfo.result);

  const onClick = () => {
    setResult("1");
  };

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{result}</div>
    </li>
  );
});

export default Try;
```
