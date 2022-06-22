---
layout: post
title: "[React] 리액트 컴포넌트"
data: '2022-01-07'
category: [React]

---

## React 오류
react에서 return \<div>로 인해 오류가 발생했다. 
```
ReactJS: "Uncaught SyntaxError: Unexpected token <"
```
해결방법
```js
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<script type="text/babel">
//내용작성
</script>
```
강의 실습용으로 간단한 react를 index.html에서 script로 작성했는데 return으로 div를 주자 오류가 발생했다. 강의에서는 따로 설명은 없었는데 강의화면을 보니 script에서 type이 babel로 되어있어 적용해보니 문제가 해결되었다. 

## Component

```html
<div id="root"></div>
```

### class component
```js
//정의
class ClassComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}
//사용
ReactDOM.render(
      <ClassComponent />,
  document.querySelector('#root')
```
### function component
```js
// 정의 1
function FunctionComponent(){
  return <div>Hello</div>;
}
// 사용
ReactDOM.render(<FunctionComponent />, document.querySelector('#root'))
```
### arrow function component
```js
 // 정의 2
const FunctionComponent = () => <div>Hello</div>
// 사용
ReactDOM.render(<FunctionComponent />, document.querySelector('#root'))
```

## React CreateElement로 component 만들기
```js

React.createElement(
  type, // 태그 이르 문자열 | 리액트 컴포넌트 | React.Fragment 
  [props], // 리액트 컴포넌트에 넣어주는 데이터 객체
  [...children] // 자식으로 넣어주는 요소들 
);

1. 태그 이름 문자열 type
<h1>type이 "태그 이름 문자열"</h1>
ReactDOM.render(
  React.createElement('h1', null, `type이 "태그 이름 문자열" 입니다`),
  document.querySelector('#root')
);

2. 리액트 컴포넌트 type
<Component /> => <p>type이 "React 컴포넌트" 입니다</p>
const Component = () => {
  return React.createElement('p', null, `type이 "React 컴포넌트" 입니다`)
}
ReactDOM.render(
  React.createElement(Component, null, null),
  document.querySelector("#root")
)

3. React.Fragment
ReactDOM.render(
  React.createElement(
    React.Fragment,
    null,
    `type이 "React Fragment" 입니다.`,
    `type이 "React Fragment" 입니다.`,
    `type이 "React Fragment" 입니다.`
  ),
  document.querySelector("#root")
)

4. 복잡한 리액트 엘리먼트 모임
<div>
  <div>
    <h1>주제</h1>
    <ul>
      <li>React</li>
      <li>Vue</li>
    </ul>
  </div>
</div>

ReactDOM.render(
  React.createElement(
    "div", 
    null, 
    React.createElement(
      "div", 
      null, 
      React.createElement("h1", null, "주제"),
      React.createElement(
        "ul", 
        null, 
        React.createElement("li", null, "React"),
        React.createElement("li", null, "Vue")   
      )
    )
  ),
  document.querySelector("#root")
);
```
## JSX
```js
// 우리가 작성한 어떤 코드 => 순수하게 실행 할 수 있는 자바스크립트
// babel

ReactDOM.render(
  <div a="a">
    <div>
      <h1>주제</h1>
      <ul>
        <li>React</li>
        <li>Vue</li>
      </ul>
    </div>
  </div>,
  document.querySelector("#root")
);
```
### JSX 문법
- 최상위 요소가 하나여야 한다.
- 최상위 요소 리턴 하는 경우, ()로 감싸야 한다.
- 자식들을 바로 랜더링 하고 싶으면 <></>를 사용한다. => Fragment
- 자바스크립트 표현식을 사용하려면, {표현식}을 이용합니다.
- if 문을 사용할 수 없다. 
  - 삼항 연산자 혹은 &&을 사용한다. 
- style을 이용해 인라인 스타일링이 가능하다.
- class 대신 className을 사용해 class를 적용할 수 있다.
- 자식 요소가 있으면, 꼭 닫아야 하고, 자식요소가 없으면 열면서 닫아야 한다.
  - \<p>hello\</p>
  - \<br />

## Props & State

Props : 컴포넌트 외부에서 컴포넌트에게 주는 데이터

Sate : 컴포넌트 내부에서 변경할 수 있는 데이터 

둘 다 변경이 발생하면, 랜더가 다시 일어날 수 있다. 

### Render 함수
Props 와 State를 바탕으로 컴포넌트를 그린다. 그리고 두가지다 변경이 되면 컴포넌트를 다시 그린다. 컴포넌트를 그리는 방법을 기술하는 함수가 랜더 함수이다.

### Props & State 실습
Componenet render실행 
```js
ReactDOM.render(
    <Component message="안녕하세요"/>,
    document.querySelector("#root")
  );
```
function Component
```js
//{message : '안녕하세요'}
function Component(props) {
  return (
    <div>
      <h1>{props.message} 이것은 함수로 만든 컴포넌트 입니다.</h1>
    </div>
  )
}
//기본값 설정 function 과 class 모두 적용 가능
Component.defaultProps = {
  message: "기본값"
}
```
class Component
```js
class Component extends React.Component {
  //state 설정
  state = {
    count: 0,
  }
  // 두가지 방법이 있다. 위 방법이 주로 사용되지만 사용할 수 없을때 아래방법을 사용한다.
  // constructor(props) {
  //   super(props);
  //   //초기화
  //   this.state = { count : 0 };
  // }

  render() {
    return (
      <div>
        <h1>{this.props.message} 이것은 클래스로 만든 컴포넌트 입니다.</h1>  
        <p>{this.state.count}</p>
      </div>
    )
  }

  //state 값 변경
  componentDidMount() {
    setTimeout(() => {
      // 객체를 만들어 데이터 수정
      // setState를 사용해서 데이터를 변경할 수 있다.
      this.setState({
        count: this.state.count + 1,
      })

      //앞에 값을 이용한 데이터 수정
      this.setState((previousState) => {
        const nwState = { count: previousState.count +1 }
        return newState
      })
    }, 1000)
  }

  //class에서만 적용가능한 default
  static defaultProps = {
    message: "기본값2"
  }
}
```

## Event Handling

- camelCase로만 사용할 수 있다.
  - onClick, onMouseEnter
- 이벤트에 연결된 자바스크립트 코드는 함수이다.
  - 이벤트 ={함수}와 같이 사용한다
- 실제 DOM 요소들에만 사용 가능하다
  - 리액트 컴포넌트에 사용하면 , 그냥 props로 전달한다. 
  
```js
ReactDOM.render(<Component />, document.querySelector('#root'))
``` 
function  ver.
```js
function Component() {
  return <div>
        <button 
          onClick={() => {console.log('clicked');}}>
          클릭
        </button>
      </div>
}
```
class ver.
```js
class Component extends React.Component {
  state = {
    count: 0,
  }
  //일반 function으로 this를 사용할때 
  //this 바인드를 해줘야한다.
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }
  
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button 
          onClick={() => {
            console.log('clicked');
            this.setState((state)=>({
              ...state,
              count: state.count + 1,
            }))
          }}>
          클릭
        </button>
      </div>
    )
  }
  //render가아닌 따로 클릭으로 인한 이벤트를 만들기위해서는 arrow function을 사용해야 this를 가르킬수 있다.
  //일반 function을 사용할때에는 constructor로 this 바인딩을 해줘야한다. 
  click = () => {
    console.log('clicked');
    this.setState((state)=>({
      ...state,
      count: state.count + 1,
    }))
  }
}
```

## Component Lifecycle

리액트 컴포넌트는 탄생부터 죽음까지 여러지점에서 개발자가 작업이 가능하도록 매서드르 오버라이딩 할 수 있게 해준다.

### componenet 생성및 마운트(< v16.3)
- constructor
- componentWillMount
- render
- componentDidMount

```js
class App extends React.Component {
  state = {
    age: 39,
  }

  constructor(props) {
    super(props);
    console.log('constructor', props)
  }

  render() {
    console.log('render')
    return(
      <div>
        <h2>
          Hello {this.props.name} - {this.state.age}
        </h2>
    </div>
    )
  }

  componentWillMount() {
    console.log('componentWillMount')
  }
  //setInterval로 state가 변경되기때문에 변경될때마다 render가 실행된다.
  componentDidMount() {
    console.log('componentDidMount')
    setInterval(() => {
      this.setState(state => ({...state, age: state.age + 1}))
    },1000)
  }

}
ReactDOM.render(<App name="Mark" /> ,document.querySelector('#root'))
```
### componenet props, state(< v16.3)
- componentWillReceiveProps
  - props를 새로 지정했을 때 바로 호출
  - state의 변경에 반응하지 않는다
    - 여기서 props의 값에 따라 state를 변경해야한다면 setState를 이용해 state를 변경한다. 그러면 다음 이벤트로 각각 가는 것이 아니라 한번에 변경된다. 
- shouldComponentUpdate
  - props만 state만 둘다 변경
  - newProps 와 new State를 인자로 해서 호출
  - return type이 beelean( true면 render/ false면 render가 호출되지않는다. default는 true)
- componentWillUpdate
  - 컴포넌트가 재 랜더링 되기 직전에 불린다. 여기서 setState 같은 것을 쓰면 안된다. 
- render
- componentDidUpdate
  - 컴포넌트가 재 랜더링을 마치면 불린다. 
```js
...
componentWillReceiveProps(nextProps){
  console.log("componentWillReceiveProps", nextProps)
}

  //이게 true여야 렌더링
//진행할지안할지 결정
shouldComponentUpdate(nextProps, nextState){
  console.log("shouldcomponentUpdate", nextProps, nextState)
  return true; 
}
componentWillUpdate(nextProps, nextState){
  console.log(" componentWillUpdate", nextProps, nextState)
}
componentDidUpdate(prevProps, prevState){
  console.log("componenetDidUpdate", prevProps, prevState)
}
...
```
### component 언마운트(< v16.3)
- componentWillUnmount

```js
class App extends React.Component {
      state = {
        age: 39,
      }
      interval = null; //interval 정의
...
componentDidMount() {
  console.log('componentDidMount')
  //interval 사용
  this.interval = setInterval(() => {
    this.setState(state => ({...state, age: state.age + 1}))
  },1000)
}
...
componentWillUnmount() {
  //요소가 없어지면 interval도 끝
  clearInterval(interval);
}
```

### Componenet 라이프사이클 변경(v16.3)
constuctor  
componentWillMount -> getDerivedStateFromProps  
render  
componenetDidMount  

componentWillReceiveProps -> getDrivedStateFromProps  
shouldComponentUpdate  
render  
componentWillUpdate -> getSnapshotBeforUpdate  
(dom에 적용)  
componentDidUpdate  

componenetWillUnmount

```js
class App extends React.Component {
  state = {
    age: 39,
  }
  interval = null;
  constructor(props) {
    super(props);
    console.log('constructor', props)
  }
  render() {
    console.log('render')
    return(
      <div>
        <h2>
          Hello {this.props.name} - {this.state.age}
       </h2>
    </div>
    )
  }
  componentWillMount() {
    console.log('componentWillMount')
  }
  // 특수한경우에만 사용한다 
  // 화면에 값이 변경되지않는다
  // 계속 값을 렌더전으로 셋팅 
  static getDerivedStateFromProps (nextProps, prevState){
    console.log("getDerivedStateFromProps", nextProps, prevState)

    return {
      age: 390
    }
  }
  componentDidMount() {
    console.log('componentDidMount')
    this.interval = setInterval(() => {
      this.setState(state => ({...state, age: state.age + 1}))
    },1000)
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log("shouldcomponentUpdate", nextProps, nextState)

    return true;
  }

  componentDidUpdate(prevProps, prevState){
    console.log("componenetDidUpdate", prevProps, prevState)
  }
  componentWillUnmount() {
    clearInterval(interval);
  }
}
```

```js
let i = 0;

class App extends React.Component {
  state = { list: [] }

  render () {
    return (
      <div id="list" style={height: 100, overflow: "scroll"}>
        {this.state.list.map((i)=>{
          return <div>{i}</div>
        })}  
      </div>
    )
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(state => ({
        list: [...state.list, i++]
      }))
    }, 1000)
  }

  //DOM에 적용하기전 데이터 변경감지
  getSnapshotBeforeUpdate(preProps, prevState) {
    if(prevState.list.length === this.state.list.length) return null
    const list = document.querySelector('#list');
    return list.scrollHeight - list.scrollTop;
  }

  //sanpshot 데이터  가지고
  //데이터 변경 
  componentDidUpdate(prevPros, prevState, snapshot) {
    console.log(snapshot)
    if(snapshot === null) return;
    const list =document.querySelector('#list');
    list.scrollTop = list.scrollHeight - snapshot;
  }
}

ReactDOM.render(<App name="Mark" /> ,document.querySelector('#root'))
```

### componenet 에러 캐치
- componenetDidCatch

```js
//에러 바운더리 
//최상위에 있어야 하위 component의 에러를 catch한다.
    
class App extends React.Component {
  state= {
    hasError : false
  }
  render(){
    if(this.state.hasError){
      return <div>예상치 못한 에러가 발생했다.</div>
    }
    return <WebService />
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true})
  }
}

```