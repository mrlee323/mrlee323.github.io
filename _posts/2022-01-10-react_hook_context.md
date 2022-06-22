---
layout: post
title: "[React] 리액트 Hook & Context "
data: '2022-01-10'
category: [React]

---

## Basic Hooks 
useState - state 대체
useEffect - 라이프사이클 훅을 대체(componentDidMount, componentDidUpdate, componentWillUnmount//대체이지 동등한 역할은 아님)

### useState
button의 state관리 세가지 방법
1번 class 사용
```jsx
import React from 'react'

export default class Example1 extends React.Component {
  state = { count: 0 }

  render() {
    const { count } = this.state
    return (
      <div>
        <p>You clicked {count} time </p>
        <button onClick={this.click}>Click me</button>
      </div>
    )
  }

  click = () => {
    this.setState({ count: this.state.count + 1 })
  }
}
```
2번 function useState 사용 
```js
import React from 'react'

export default function Example2() {
  const [count, setCount] = React.useState(0); //배열

  return (
    <div>
      <p>You clicked {count} time </p>
      <button onClick={click}>Click me</button>
    </div>
  )

  function click() {
    setCount(count + 1)
    //count 값변경과 다시 처음부터 실행해주는 두가지 기능
  }
}
```
3번 useState안에 객체로 관리
```jsx
import React from 'react'

//useState => count
//useState => { count:0 }
export default function Example3() {
  const [state, setState] = React.useState({ count: 0 }); //배열

  return (
    <div>
      <p>You clicked {state.count} time </p>
      <button onClick={click}>Click me</button>
    </div>
  )

  function click() {
    setState((state) => ({
      count: state.count + 1,
    }))
  }
}
```
### useEffect

```js
import React from 'react'

export default class Example4 extends React.Component {
  state = { count: 0 }

  render() {
    const { count } = this.state
    return (
      <div>
        <p>You clicked {count} time </p>
        <button onClick={this.click}>Click me</button>
      </div>
    )
  }

  componentDidMount() {
    console.log('componentDidMount', this.state.count)
  }//처음 렌더링될때 한번 

  componentDidUpdate() {
    console.log('componentdDidUpdate', this.state.count)
  }//state가 변경될때 마다

  click = () => {
    this.setState({ count: this.state.count + 1 })
  }
}
```
useEffect사용
```js
import React from 'react'

export default function Example5() {
  const [count, setCount] = React.useState(0); //배열

  React.useEffect(() => {
    console.log('componentDidMount')
    return () => {
      //cleanup
      //componentWillUnmount
      //최초한번실행되기 때문에 return함수가 실행되기위해서는 Example5가 소멸될때 뿐이다
    }
  }, [])//빈배열을 넣으면 최초실행만 함 

  React.useEffect(() => {
    console.log('componentDidMount & componentDidUpdate by count', count)
    return () => {
      //cleanup
      console.log('cleanup by count', count)
      //최초실행후 count의 변경으로 실행될때 이전 return함수가 먼저 실행되고 다음 useEffect가 실행된다
      //return함수에서 반환되는 count값이 최초 uesEffet이 실행될때 값이기 때문에 count = 0 이다.
    }
  }, [count])//여러번 사용 가능

  return (
    <div>
      <p>You clicked {count} time </p>
      <button onClick={click}>Click me</button>
    </div>
  )

  function click() {
    setCount(count + 1)
  }
}
```
## Custom Hooks
useSomething

### Custom Hooks 
useWindowWidth.js
```js
import {useState, useEffect} from 'react'
export default function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(()=> {
    const resize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', resize)
      //width의 변경을 감지해서 setWidth를 통해 변경
    return () => [
      window.removeEventListener('resize', resize)
      //eventListner 제거
    ]
  },[])
  return width;
}
```
### HOC
HOC는 컴포넌트를 인자로 받아 새로운 props를추가하여 새로운 컴포넌트로 return 시켜준다.
HOC를 만들때에 네이밍을 앞에 with를 붙여준다
withHasMounted.jsx
```jsx
import React from 'react'

export default function withHasMounted(Component) {
  class NewComponent extends React.Component {
    state = {
      hasMounted: false,
    }
    render() {
      const { hasMounted } = this.state;
      return <Component {...this.props} hasMounted={hasMounted} />
    }//만들어진 hasMounted props로 나간다
    componentDidMount() {
      this.setState({ hasMounted: true })
    }//최초 렌더에서는 false였다가 componentDidMount가 실행되면서 true로바뀌면서 state변경으로 다시 render된다. 
  }
  NewComponent.displayName = `withHasMounted(${Component.name})`
  return NewComponent
}
```
useEffect사용
```js
import { useEffect,useState } from 'react' 

export default function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(()=>{
    setHasMounted(true);
  },[]) //상태가 리턴
  return hasMounted;
}
```
## Additional Hooks
### useReducer
- 다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우
- 다음 state가 이전 state에 의존적인 경우
- Redux 를 안다면 쉽게 사용가능
```jsx
import { useReducer } from 'react'
export default function Example6() {

  //reducer = state를 변경하는 로직이 담겨있는 함수
  const reducer = (state, action) => {
    if (action.type === 'PLUS') {
      return {
        count: state.count + 1
      }
    }
    return state;
  }
  //dispatch -> action 객체를 넣어서 실행

  //action => 객체이고 필수 프롵퍼티로 type을 가진다. 

  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <p>You clicked {state.count} time </p>
      <button onClick={click}>Click me</button>
    </div>
  )
  function click() {
    dispatch({ type: "PLUS" })
  }
}
```
### useMemo, useCallback
```jsx
import { useState, useMemo, useCallback } from 'react'

function sum(persons) {
  console.log('sum...')
  return persons.map(person => person.age).reduce((l, r) => l + r, 0)
}

export default function Example7() {
  const [value, setValue] = useState("")
  const [persons] = useState([
    { name: 'Mark', age: 39 },
    { name: 'Hanna', age: 28 }
  ])
  const count = useMemo(() => {
    return sum(persons);
  }, [persons])//[persons]를 통해 처음 한번만 렌더되고 이후 다시렌더되도 동작하지않는다.
  //[persons]가 없으면 렌더가 될때마다 sum 함수가 계속 실행된다. 
  
  const click = useCallback(() => {
    console.log(value)
  }, []) //초기값만 얻고싶을때 (value값이 변경되도 처음 한번만 실행되기 때문에 useCallback안 value의 값은 변경되지 않는다. )

  return (
    <div>
      <input value={value} onChange={change} />
      <p>{count}</p>
      <button onClick={click}>click</button>
    </div>
  )
  function change(e) {
    setValue(e.target.value)
  }
}
```
### createRef, useRef
```js
import { useState, createRef, useRef } from 'react'

export default function Example8() {
  const [value, setValue] = useState("")
  const input1Ref = createRef();//렌더될때마다 새로 레퍼런스 생성
  const input2Ref = useRef()//렌더가 되도 계속 유지 처음 렌더될때만 undefined
  //useRef, useCallback, useMemo 렌더사이에 형태를 유지한다.

  console.log(input1Ref.current, input2Ref.current)

  return (
    <div>
      <input value={value} onChange={change} />
      <input ref={input1Ref} />
      <input ref={input2Ref} />
    </div>
  )
  function change(e) {
    setValue(e.target.value)
  }
}
```
## React Router Hooks
### useHistory
```js
import { useHistory } from "react-router-dom"
import { withRouter } from "react-router-dom"

//이전에 사용했던 HOC 방법
// export default withRouter(function LoginButton(props) {
//   function login() {
//     setTimeout(() => {
//       props.history.push('/')
//     }, 1000)
//   }
//   return <button onClick={login}>로그인하기</button>
// })

//props를 받지않고 useHistory를 통해 값을 받아올수 있다. 
export default function LoginButton() {
  const history = useHistory()
  function login() {
    setTimeout(() => {
      history.push('/')
    }, 1000)
  }

  return <button onClick={login}>로그인하기</button>
}
```
## 컴포넌트 간 통신
위에서 아래로
```jsx
export default function A() {
  const [value, setValue] = useState('아직 안바뀜')
  return (
    <div>
      <B value={value} />
      <button onClick={click}>E의 값을 바꾸기</button>
    </div>
  )
  function click() {
    setValue("E의 값을 변경")
  }
}

function B({ value }) {
  return (
    <div>
      <p>여긴 B</p>
      <C value={value} />
    </div>
  )
}
function C({ value }) {
  return (
    <div>
      <p>여긴 C</p>
      <D value={value} />
    </div>
  )
}
function D({ value }) {
  return (
    <div>
      <p>여긴 D</p>
      <E value={value} />
    </div>
  )
}
function E({ value }) {
  return (
    <div>
      <p>여긴 E</p>
      <h3>{value}</h3>
    </div>
  )
}
```
아래에서 위로
```jsx
export default function A() {
  const [value, setValue] = useState('아직 안바뀜')
  return (
    <div>
      <p>{value}</p>
      <B setValue={setValue} />
    </div>
  )
}
function B({ setValue }) {
  return (
    <div>
      <p>여긴 B</p>
      <C setValue={setValue} />
    </div>
  )
}
function C({ setValue }) {
  return (
    <div>
      <p>여긴 C</p>
      <D setValue={setValue} />
    </div>
  )
}
function D({ setValue }) {
  return (
    <div>
      <p>여긴 D</p>
      <E setValue={setValue} />
    </div>
  )
}
function E({ setValue }) {
  return (
    <div>
      <p>여긴 E</p>
      <button onClick={click}>클릭</button>
    </div>
  )
  function click() {
    setValue("A의 값을 변경")
  }
}
```
## Context API
하위 컴포넌트 전체에 데이터를 공유하는 법
데이터를 Set 
- 가장 상위 컴포넌트 => 프로바이더
데이터를 Get 
- 모든 하위 컴포넌트 접근 가능 
  - 컨슈머로 하는 방법
  - 클래스 컴포넌트 this.context로 하는 방법
  - 펑셔널 컴포넌트 useContext로 하는 방법

### 데이터 Set 하기
- 컨텍스트 생성
- 컨텍스트.프로바이더 사용
- value 사용

PersonContext.js
```js
import React from 'react'

const PersonContext = React.createContext();

export default PersonContext
```
index.js
```js
const persons = [
  {id:0, name: 'Mark', age: 39},
  {id:1, name: 'Hanna', age: 28}
]
ReactDOM.render(
  <React.StrictMode>
    <PersonContext.Provider value={persons}>
      <App />//App에서는 persons의 대한 데이터를 자유롭게 가져다 쓸수있다.
    </PersonContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
### 데이터 Get하기 (1)- Consumer
- 컨텍스트를 가져온다
- 컨텍스트.컨슈머를 사용
- value를 사용

```jsx
import PersonContext from "../contexts/PersonContext"

export default function Example10() {
  return (
    <PersonContext.Consumer>
      {(persons) => (
        <ul>
          {persons.map((person) => (
            <li>{person.name}</li>
          ))}
        </ul>)}
    </PersonContext.Consumer>
  )
}
```
### 데이터 Get하기(2) - class
- static contextType에 컨텍스트를 설정
- this.context => value

```jsx
import React from 'react'
import PersonContext from '../contexts/PersonContext';

export default class Example11 extends React.Component {
  static contextType = PersonContext;
  render() {
    const persons = this.context
    return <ul>
      {persons.map((person) => (
        <li>{person.name}</li>
      ))}
    </ul>
  }
}
//static contextType = PersonContext;
Example11.contextType = PresonContext;
```
### 데이터 Get하기(3) - functional 가장 많이사용
- usseContext로 컨텍스트를 인자로 호출
- useContext의 리턴이 value

```jsx
import PersonContext from "../contexts/PersonContext"
import { useContext } from "react"

export default function Example12() {
  const persons = useContext(PersonContext)
  //Hook사용

  return (
    <ul>
      {persons.map((person) => (
        <li>{person.name}</li>
      ))}
    </ul>
  )
}
```