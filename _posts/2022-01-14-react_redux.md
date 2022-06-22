---
layout: post
title: "[React] Redux"
data: '2022-01-14'
category: [React]

---

## Redux 개요
Redux로 store에 state를 여러 component가 자유롭게 사용할수있다. 
```
npm i redux
```

## Action
- 액션은 사실 그냥 객체(object)이다
- 두가지 형태
  - {type:'TEST'}//payload없이 액션
  - {type:'TEST', params:'hello'}//payload 있는 액션
  - type만이 필수 프로퍼티이며, type은 문자열이다

### 리덕스 액션 생성자
```js
function 액션 생성자(...args) {return 액션}
```
- 액션을 생성하는 함수를 "액션 생성자(Action Creator)"라고 한다.
- 함수를 통해 액션을 생성해서, 액션 객체를 리턴해준다.
- createTest('hello');// {type:'TEST', params: 'hello'}리턴

### 리덕스 액션이 하는일
- 액션  생성자를 통해 액션을 만들어 낸다.
- 만들어낸 액션 객체를 리덕스 스토어에 보낸다.
- 리덕스 스토어가 액션 객체를 받으면 스토어의 상태 값이 변경된다.
- 변경된 상태 값에 의해 상태를 이용하고 있는 컴포넌트가 변경된다. 
- 액션은 스토어에 보내는 일종의 인풋이라 생각할 수 있다. 

### 액션 준지
- 액션의 타입을 정의하여 변수로 정의
   - 강제는 아님
   - 타입을 문자열로 넣기에는 실수를 유발  가능성이 크다
   - 미리 정의한 변수를 사용하면, 스펠링에 주의를 덜 기울여도 된다.
- 액션 객체를 만들어 내는 함수를  만드는 단계
  - 하나의 액션 객체를 만들기 위해 하나의 함수를 만들어낸다
  - 액션의 타입은 미리 정의한 타입 변수로 부터 가져와서 사용한다. 
## Reducers

### 리덕스의 리듀서란
- 액션을 처리해주는 로직
- 액션을 주면, 그 액션이 적용되어 달라진 결과를 만들어 준다.
- 함수
  - Pure Function (항상같은 값을 반환)
  - Immutable(리듀서를 통해 스테이트가 달라졌음을 리덕스가 인지하는 방식)
```js
function 리듀서(previousState, action) {
  return newState
}
```
- 액션을 받아서 스테이트를 리턴하는 구조
- 인자로 들어오는 previousState와 리턴되는 newState는 다른 참조를 가지도록 한다.

actions.js
```js
export const ADD_TODO = "ADD_TODO" //액션 문자열

function addTodo(todo) { //액션 생성함수
  return {
    type: ADD_TODO,
    todo,
  }
}
```
reducers.js
```js
import { ADD_TODO } from './actions'
// state
// ['코딩', '점심먹기']
const initialState = []

function todoApp(previousState = initialState, action) {
  //초기값 설정
  // if(previousState === undefined) {
  //   return []
  // }
  if(action.type === ADD_TODO){
    return[...previousState, action.todo]
  }
  return previousState
}
```
액션을 변수에 정의하고 생성함수를 만들고 초기값 설정까지는 js만 사용한다.

## createStore
스토어를 만드는 함수
```js
const store = createSotre(리듀서)
```
```js
createStore<S>(
  reducer: Reducer<S>,
  proloadedState: S,
  enhaner?: StoreEnhancer<S>
):Sotre<S>
```
store
```js
store.getState()

store.dispatch(액션;, store.dispatch(액션생성자())

const unsubscribe = store.subscribe(()=>{})
  //리턴이 unsubscribe라는 점
  //unsubscribe()하면 제거

store.replaceReducer(다른리듀서)
```
### 스토어 생성
store.js
```js
import { createStore } from 'redux'
import { todoApp } from './reducers'

const store = createStore(todoApp)

export default store
```
index.js
```js
import store from './redux/store';
import { addTodo } from './redux/actions';

const unsubscribe = store.subscribe(()=>{
  console.log(store.getState())//state상태 확인
}) //변경사항 구독

store.dispatch(addTodo("coding"))
store.dispatch(addTodo("read book"))
unsubscribe() // todo가 추가되더라도 더이상 구독을 안해서 console.log실행되지 않는다.
```

## combineReducers
- redux로 부터 import
- reducer가 많아지면 combineReducers 으로 한번에 묶어서 반환해준다.
- 또 각 reducer를 각자의 파일로 분배해서 생성
- combineReducers도 따로 생성

reducers 폴더(filter.js/todo.js/reducer.js)

reducer.js // 각 reducer를 모아서 반환해주는 combineReducers
```js
import { combineReducers } from "redux"
import todos from "./todos"
import filter from "./filter"

const reducer = combineReducers({
  todos,
  filter,
})

export default reducer
```
todos.js //todo를 관리하는 reducer
```js
import { ADD_TODO, COMPLETE_TODO } from "../actions"

const InitialState = []

export default function todos(previousState = InitialState, action) {

  if(action.type === ADD_TODO){
    return  [...previousState, { text: action.text, done: false }]
  }

  if(action.type === COMPLETE_TODO){
    return previousState.map((todo, index)=>{
      if(index === action.index){
        return{...todo, done:true}
      } 
      return todo
    })
  }

  return previousState
}
```
filter.js // filter를 관리하는 reducer
```js
import { SHOW_ALL, SHOW_COMPLETE } from "../actions"

const InitialState = 'ALL'

export default function filter(previousState =InitialState, action) {
 
  if(action.type === SHOW_COMPLETE) {
    return "COMPLETE"
  } 

  if(action.type === SHOW_ALL) {
    return "ALL"
  } 

  return previousState
}
```

## Redux를 React에 연결 (1) - React Redux 미사용
- 단일 store를 만들고 subscribe와 getState를 이용하여, 변경되는 state데이터를 얻어, props로 계속 아래로 전달
- componentDidMount - subscribe
- componentWillUnmunt - unsubscribe

### React Redux 미사용
- Context만들어서 store 를 자유롭게 사용
- components의 state를 관리해주는 hook 분리
- components 만들어서 App.js에 내용 분리

### Context 생성  
ReduxContext.js
```js
import { createContext } from 'react'

const ReduxContext = createContext()

export default ReduxContext

```
index.js
```js
ReactDOM.render(
  <React.StrictMode>
    <ReduxContext.Provider value={store}>
      <App /> //Provider를 사용하면서 App안에모든 컴포넌트가 store를 사용할수 있다.
     </ReduxContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
### Hook 분리
useReduxState.js  
useContext로 store를 가져와서 state 관리 

```js
import { useContext, useState, useEffect } from "react"
import ReduxContext from "../contexts/ReduxContext"

export default function useReduxState(){ //custom hook
  const store = useContext(ReduxContext) //Provider로 준 value={store}

  const [state, setState] = useState(store.getState())

  useEffect(()=>{
    const unsubscribe = store.subscribe(()=>{
      setState(store.getState()) //store에서 state를 받아서 관리
    })
    return ()=>{
      unsubscribe()
    }
  },[store])

  return state
}
```
useReduxDispatch.js  
useContext로 store를 받아와서 dispatch를 통해 action에 접근
```js
import { useContext } from "react"
import ReduxContext from "../contexts/ReduxContext"

export default function useReduxDispatch(){
  const store = useContext(ReduxContext)
  return store.dispatch
}
```
### component 분리
App.js  
이전에 App에 list와 form 요소가 함께 있었는데 이를 component생성하여 분리해준다.
```js
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TodoList />
        <TodoForm />
      </header>
     
    </div>
  );
}
```
TodoList.jsx
```jsx
import useReduxState from "../hooks/useReduxState"

export default function TodoList() {
  const state = useReduxState();

  return <ul>{state.todos.map((todo) => {
    return <li>{todo.text}</li>
  })}</ul>
}
```
TodoForm.jsx
```jsx
import { useRef } from 'react'
import useReduxDispatch from '../hooks/useReduxDispatch'
import { addTodo } from '../redux/actions'

export default function TodoForm() {
  const inputRef = useRef()
  const dispatch = useReduxDispatch()
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={click}>추가</button>
    </div>
  )

  function click() {
    dispatch(addTodo(inputRef.current.value))
  }
}
```
컴포넌트를 분리하면서 필요한 hook이나 action은 각각 가져와서 사용한다.

## Redux를 React에 연결 (2) - React Redux 사용

### react-redux
- Provider컴포넌트를 제공
- connect 함수를 통해 '컨테이너'를 만들어준다
  - 컨테이너는 스토어의 state와 dispatch(액션)을 연결한 컴포넌트에 props로 넣어주는 역할을 한다.
- 필요한것
  - 어떤 state를 어떤 props에 연결할 것인지에 대한 정의
  - 어떤 dispatch(액션)을 어떤 props에 연결할 것인지에 대한 정의
  - 그 props를 보낼 컴포넌트를 정의

```
npm i react-redux
```
처음에 만들었던 reduxContext 대신 react-redux의 Provider를 사용하여 store를 내려준다.
index.js
```js
import store from './redux/store';
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
     </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
component에서 화면을 나타내는 컴포넌트와 데이터를 다루는 컴포넌트를 분리한다  

### TodoList/ TodoListContainer  
TodoList.js
```js
//데이터를 받아서 화면을 구성하는 컴포넌트
export default function TodoList({ todos }) {
  return <ul>{todos.map((todo) => {
    return <li>{todo.text}</li>
  })}</ul>
}
```
TodoListContainer.jsx
```js
//useSelector로 state를 받아서 그중 TodoList에 필요한 todos데이터를 넣어준다
import { useSelector } from "react-redux"
import TodoList from "../components/TodoList"

function TodoListContainer() {
  const todos = useSelector((state) => state.todos)

  return <TodoList todos={todos} />
}

export default TodoListContainer
```
### TodoForm/ TodoFormContianer  
TodoForm.js
```js
import { useRef } from 'react'

export default function TodoForm({ add }) {
  const inputRef = useRef()

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={click}>추가</button>
    </div>
  )

  function click() {
    add(inputRef.current.value)
  }
  //container에서 보내준 add로 값을 dispatch한다. 
}
```
TodoFromContainer.js
```js
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import TodoForm from "../components/TodoForm"
import { addTodo } from "../redux/actions"

//useDispatch를 가져와서 dispatch변수에 할당하여 사용한다 

export default function TodoFormContainer() {
  const dispatch = useDispatch()

  const add = useCallback((text) => {
    dispatch(addTodo(text))
  }, [dispatch])
//dispatch가 변경되었을때 add가 다시 생성되는데 dispatch는 변경되는 경우가 거의 없으므로 처음 만드어진 상태로 계속 사용할 수 있다. 
  return <TodoForm add={add} />
}
```