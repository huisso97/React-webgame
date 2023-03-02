# 9. [v5]react-router

## React Router 도입하기

`npm i react-router`
`npm i react-router-dom`

## Link 와 브라우저라우터

React는 여러 페이지가 있는 "척" 하는 Single Page Application이라는 것을 잊지 말자!

그래서 `a`태그로 쓰면 에러가 나고, 가상의 주소로 갈 수 있는 `Link`태그를 서서 Route의 경로를 부르도록 한다.

## React 함수형에서는 React를 2개 이상 import 할 수 없다.

![img](..\img\error.PNG)[출처: 제로초 리액트 웹게임 9-2 강의]

각 게임들을 불러오는 과정에서 다음과 같은 에러가 발생하였다.

이는 훅에서는 import 해오는 React가 다르면 에러가 발생하기 때문이다.

그래서 class형으로 각 게임 컴포넌트들을 불러온다.(class 형은 서로 다른 React를 불러올 수 있다.)

이때, class형을 사용하기 위해서 다음의 babel plugin을 추가로 설치해준다.
`@babel/plugin-proposal-class-properties`

## 해시라우터, params, withRouter

### 해시라우터

브라우저라우터의 경우, 새로고침시 서버에 해당 url을 요청하기 때문에 서버에서는 해당 경로가 없어 에러가 뜬다.

반면, 해시라우터는 `localhost:8080/#/lotto-generator`와 같이, #이하로 구성되어 클라이언트에서 기억하는 경로이기때문에, 새로고침시에도 서버에서 에러 반환 없이 해당 경로의 UI가 나오게 된다.

그러나, 서버는 해당 경로를 모르기 때문에 SEO 최적화가 어렵다.

### 동적 라우팅

아래의 `:name`과 같이 파라미터(파람스)를 붙여서 동적으로 라우트를 연결해준다.

이는 여러 줄의 라우터 코드를 하나로 통일해줄 수 있다.

즉, 파라미터가 각각의 라우터 역할을 할 수 있도록 연결해주면 된다.

```javascript
<Route path="/game/:name" component={GameMatcher} />
```

### withRouter

만약 Route로 연결하지 않은 Component에서 history, location, match 을 쓰고 싶다면 해당 컴포넌트를 withRouter함수로 감싸준다.(HOC)

## 쿼리스트링과 URLSearchParams

주소에다가 쿼리스트링 형태로 데이터를 붙여줄 수 있다.

서버도 퀴리스트링이라고 데이터를 알아차릴 수 있다.

```javascript
<Link path="/game/number-baseball?query=10&hello=sohui&bye=react">
  쿼리스트링
</Link>
```

### URLSearchParams

쿼리스트링에서 특정 데이터 키의 값을 받아올 때, 다음과 같이 URLSearchParams로 객체값을 불러온 후, ?를 slice로 자른다.

해당 객체값에서 불러오고자 하는 데이터의 키을 통해 값을 가져온다.

```javascript
let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
console.log(urlSearchParams.get("hello"));
```

## render props, switch, exact

### render props

자식 라우터 컴포넌트에 부모의 history, match, location를 props로 넘겨줄 때는 아래와 같이 render속성에 함수를 넣는다.

```javascript
<Route path="/" render={(props) => <GameMatcher {...props} />} />
```

### switch

아래와 같이 동적라우팅된 라우터와 일반 라우터가 함께 있어 서로의 경로가 겹쳐졌을 때, 두 컴포넌트가 모두 렌더링된다.

```javascript
<Route path="/game/:name" component={GameMatcher} />
<Route path="/game/lotto-generator" component={Lotto} />
```

switch태그는 위와 같은 경우, 해당 경로가 라우터들 중 최초로 일치하는 하나의 라우터만 렌더링해주는 역할을 한다. 즉, 여러개의 child 라우터 중 무조건 하나만 표시한다.

```javascript
<Switch>
  <Route path="/game/:name" component={GameMatcher} />
  <Route path="/game/lotto-generator" component={Lotto} />
</Switch>
```

### exact

Switch로 감싸도 상위주소와 하위주소가 겹쳐지는 경우, 두 개의 컴포넌트가 동시에 렌더링된다.

이때는 exact속성을 붙여, 정확히 "/"인 경로에서는 해당 컴포넌트가 렌더링되도록 제한을 걸어준다. 즉, 하위경로가 안걸리도록 제한해준다.
<Switch>
<Route exact path="/" component={Index} />
<Route path="/game/:name" component={GameMatcher} />
</Switch>

# 9. [v6]react-router

## v5 -> v6 차이점

- Switch => Routes
- exact 없어짐
- render => element

```javascript
<Routes>
  <Route path="/" element={<Lotto />>} />
  <Route path="/game/:name" element={<GameMatcher />>} />
</Routes>
```

- history => useNavigate
