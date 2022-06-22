---
layout: post
title: "[React] 리덕스 Advanced(2)"
data: '2022-01-18'
category: [React]

---

## Ducks Pattern

리덕스를 사용할때 편리한 패턴

```
src/redux
- create.js

src/redux/modules
- module1.js
- module2.js
...
- reducer.js(or index.js)
```

reudx폴더 안에 modules 폴더를 만들어 reducer와 action을 모아서 각각 파일을 만든다.
filter파일안에는 filter의 리듀서와 action이 같이 있고, todos파일안에는 todos의 리듀서와 action을 같이 넣는 방법이다.
파일을 만들때 규칙이 있다.

1. 액션을 선언할때 액션명 앞에 프로젝트명과 파일명을 넣어준다

- ex) redux-start/users/GET_USERS_START

2. 리듀서의 함수명을 reducer로 한다.

- 예전에는 각파일명과 reducer명이 같았는데 reducer 함수명 reducer로 바꿔준다.

3. 리듀서 함수를 export default로 지정한다

이렇게 규칙안에서 정리를 하면 액션과 리듀서를 함께 관리할 수있다.
실제 실무에서도 많이 사용하는 패턴이라고 한다.

ex) todos.js

```js
// 액션 타입 정의
export const ADD_TODO = "redux-start/todos/ADD_TODO"; //액션 문자열
export const COMPLETE_TODO = "redux-start/todos/COMPLETE_TODO";

// 액션 생성 함수
// {type : ADD_TODO, text:'할일'}
export function addTodo(text) {
  //액션 생성함수
  return {
    type: ADD_TODO,
    text,
  };
}
// { type: COMPLETE_TODO, index: 3}
export function commpleteTodo(index) {
  return {
    type: COMPLETE_TODO,
    index,
  };
}

// 초기값
const InitialState = [];

//리듀서
export default function reducer(previousState = InitialState, action) {
  if (action.type === ADD_TODO) {
    return [...previousState, { text: action.text, done: false }];
  }

  if (action.type === COMPLETE_TODO) {
    return previousState.map((todo, index) => {
      if (index === action.index) {
        return { ...todo, done: true };
      }
      return todo;
    });
  }

  return previousState;
}
```

## react-router-dom과 redux 함께 쓰기

```
npm i react-router-dom
```

### 라우트 설정

App.js

```js
import "./App.css";
import { Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Todos from "./pages/Todos";
import history from "./history";
import { ConnectedRouter } from "connected-react-router";

function App() {
  return (
    //router사용 페이지만들어서 라우트 연결
    <ConnectedRouter history={history}>
      <Route path="/" exact component={Home} />
      <Route path="/todos" exact component={Todos} />
      <Route path="/users" exact component={Users} />
    </ConnectedRouter>
  );
}

export default App;
```

Home.jsx (pages)

```js
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/todos">Todos</Link>
        </li>
        //링크를 통해서 각 페이지 연결
      </ul>
      <ul>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <button onClick={click}>todos 이동</button>
    </div>
  );
  function click() {
    dispatch(push("/todos"));
  }
}
```

Todos.jsx (pages)

```jsx
import TodoFormContainer from "../containers/TodoFormContainer";
import TodoListContainer from "../containers/TodoListContainer";

export default function Todos() {
  return (
    <div>
      <TodoListContainer />
      <TodoFormContainer />
    </div>
  );
}
```

Users.jsx(paes)

```jsx
import UserListContainer from "../containers/UsserListContainer";

export default function Users() {
  return (
    <div>
      <UserListContainer />
    </div>
  );
}
```

### thunk 에서 라우터 연동하기

thunk 함수 내에서 라우터를 사용해야 될 때
thunk에서 라우터의 history 객체를 사용하려면, BrowserHistory 인스턴스를 만들어서 적용해야 한다.
logger사용할때 가장 마지막에 와야한다.
store.js

```js
import { applyMiddleware, createStore } from "redux";
import todoApp from "./modules/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import history from "../history";
//history 생성
//const history = createBrowserHistory()
import { routerMiddleware } from "connected-react-router";

const store = createStore(
  todoApp,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument({ history }),
      //thunk에 withExtraArgument를 사용하면 thunk함수에서 사전에 정해준 값들을 참조 할 수 있다.
      promise,
      routerMiddleware(history)
    )
  )
);

export default store;
```

App.js

```js
function App() {

  return (  //router사용 페이지만들어서 라우트 연결
    <ConnectedRouter history={history}> //history 연결
      <Route path="/" exact component={Home}/>
      ...
```

UserListContainer.jsx

```js
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserList from '../components/UserList'
import { getUsersThunk } from '../redux/modules/users'


export default function UserListContainer() {
  const users = useSelector(state => state.users.data)
  const dispatch = useDispatch()

  const getUsers = useCallback(() => {
    dispatch(getUsersThunk()) //user데이터 받아오기
  return <UserList users={users} getUsers={getUsers} />
}
```

users.js 에서 reducer// redux-thunk 수정

```js
export function getUsersThunk() {
  return async (dispatch, getState, { history }) => {
    try {
      //history 받아옴
      console.log(history);
      dispatch(getUsersStart());
      //sleep
      await sleep(2000);
      const res = await axios.get("https://api.github.com/users");
      dispatch(getUsersSuccess(res.data));
      history.push("/");
    } catch (error) {
      dispatch(getUsersFail(error));
    }
  };
}
```

### 리덕스안에 리듀서로 통째로 연결

```
npm i connected-react-router
```

리액트 라우터와 리덕스 강하게 연결

reducer.js

```js
import { combineReducers } from "redux";
import todos from "./todos";
import filter from "./filter";
import users from "./users";
import { connectRouter } from "connected-react-router";
import history from "../../history";

const reducer = combineReducers({
  todos,
  filter,
  users,
  router: connectRouter(history), //추가
});

export default reducer;
```

store.js

```js
const store = createStore(
  todoApp,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument({ history }),
      //thunk에 withExtraArgument를 사용하면 thunk함수에서 사전에 정해준 값들을 참조 할 수 있다.
      promise,
      routerMiddleware(history) //추가
    )
  )
);
```

App.js

```js
import { ConnectedRouter } from "connected-react-router";
function App() {
  return (
    <ConnectedRouter history={history}>
      <Route path="/" exact component={Home} />
      <Route path="/todos" exact component={Todos} />
      <Route path="/users" exact component={Users} />
    </ConnectedRouter>
  );
}
```

Home.jsx

```js
...
   // click 이벤트 생성
   // connected react router에서 제공하는 push 함수 사용
   // todos로 이동
      <button onClick={click}>todos 이동</button>
    </div>
  );
  function click() {
    dispatch(push("/todos"));
  }
}
```

## redux-saga

```
npm i redux-saga
```

- 미들웨어
- 제너레이터 객체를 만들어 내는 제네레이터 생성 함수를 이용
- 리덕스 사가 미들웨어를 설정하고
- 내가만든사가함수 등록한 후
- 사가 미들웨어 실행
- 등록된 사가 함수를 실행할 액션을 디스패치
- 액션을 모니터링 하고 있다가, 특정 액션이 발생하면 이에 따라 특정 작업을 하는 방식으로 사용

```
redux-saga는 애플리케이션의 "side-effects"들(데이터 요청(fetch) 등의 비동기 작업, 브라우저 캐시 같은 순수하지 않은 것들)을 쉽게 관리하고 효과적으로 실행하고 간단한 테스트와 쉬운 실패 처리를 목적으로 한다.
Redux-Saga는 애플리케이션에서 필요한 사이드 이펙트를 별도의 스레드로 분리해서 관리할 수 있고, 리덕스의 미들웨어로 리덕스의 액션은 스레드를 시작, 중지, 취소시킬 수 있다고 한다.
```

### 사용예

- 비동기 작업을 할 때 기존 요청을 취소 처리 할 수 있다.
- 특정 액션이 발생 했을때 이에 따라 다른 액션이 디스패치되게끔 하거나, 자바스크립트 코드를 실행 할 수 있다.
- 웹소켓을 사용하는 경우 Channel 이라는 기능을 사용하여 더욱 효율적으로 코드를 관리 할 수 있다.
- API 요청이 실패했을 때 재요청하는 작업을 할 수 있다.

### side-effect

함수가 일관된 결과를 보장하지 못하거나, 함수 외부 어디든지 조금이라도 영향을 주는 경우 모두 사이드 이펙트를 갖는 것이라 할 수 있다. 다만 외부 세계라는 것을 딱 잘라 정의하기에는 어렵다. 코드의 바깥(outer) 스코프도 외부 세계라 할 수 있고, 사용자의 액션이나 네트워크 통신 역시 당연히 외부 세계라 할 수 있다.

### Generator

함수를 작성 할 때 함수를 특정 구간에 멈춰 놓을 수도 있고, 우너할 때 다시 돌아가게 할 수 도 있다. 결과값을 여러번 반활 할 수도 있다.

```js
function* // 사용

함수뒤에 .next()를 붙여야 실행

제너레이터 함수를 사가라고 부른다

yield delay () 딜레이

yield put() put은 특정 액션 디스패치

//takeEvery, takealtest

export function* counterSaga() { //increaseSaga 액션을 디스패치한 함수
  yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
}
```

store.js

```js
import { applyMiddleware, createStore } from "redux";
import todoApp from "./modules/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import history from "../history";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./modules/rootSaga";

const sagaMiddleware = createSagaMiddleware(); //middleware 생성
const store = createStore(
  todoApp,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument({ history }),
      promise,
      routerMiddleware(history),
      sagaMiddleware
    )
  )
);
sagaMiddleware.run(rootSaga); //rootSage 설정

export default store;
```

users.js

```js
//reudx-saga
const GET_USERS_SAGA_START = "GET_USERS_SAGA_START";

function* getUsersSaga(action) {
  try {
    yield put(getUsersStart());
    //sleep
    yield delay(2000);
    const res = yield call(axios.get, "https://api.github.com/users");
    yield put(getUsersSuccess(res.data));
    yield put(push("/"));
  } catch (error) {
    yield put(getUsersFail(error));
  }
}
export function getUsersSagaSart() {
  return {
    type: GET_USERS_SAGA_START,
  };
}
export function* usersSaga() {
  yield takeEvery(GET_USERS_SAGA_START, getUsersSaga);
}
```

modules/rootSaga.js

```js
import { all } from "redux-saga/effects";
import { usersSaga } from "./users";

export default function* rootSaga() {
  yield all([usersSaga()]);
}
```

UserListContainer.jsx

```jsx
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../components/UserList";
import { getUsersSagaSart, getUsersThunk } from "../redux/modules/users";

export default function UserListContainer() {
  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  const getUsers = useCallback(() => {
    dispatch(getUsersSagaSart()); //middelware에 마지막이 saga 그래서 saga를 dispatch
  }, [dispatch]); //saga 액션을 실행하는 함수가 getUsersSagasSart()액션생성함수의 역할
  return <UserList users={users} getUsers={getUsers} />;
}
```

## redux-action

덕스패턴을 쉽게 구현할수 있게 해주는 라이브러리

```
npm i redux-actions
```

redux-action을 사용한 filter.js

```js
import { createActions, handleActions } from "redux-actions";

// createActions 사용해서 액션 생성 함수/정의 한번에
export const { showAll, showComplete } = createActions(
  "SHOW_ALL",
  "SHOW_COMPLETE",
  {
    prefix: "redux-start/filter",
  }
);

// 초기값
const InitialState = "ALL";

const reducer = handleActions(
  {
    SHOW_ALL: (state, action) => "All",
    SHOW_COMPLETE: () => "COMPLETE",
  },
  InitialState,
  { prefix: "redux-start/filter" }
);

// 리듀서
export default reducer;
```