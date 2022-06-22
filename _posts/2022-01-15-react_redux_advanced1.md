---
layout: post
title: "[React] 리덕스 Advanced(1)"
data: '2022-01-15'
category: [React]

---

## Async Action With Rdeux

```
npm i axios
```

json 비동기 action 처리 (미들웨어 미사용)

- action.js(액션 추가)
- user.js(reducer추가)
- UserList.jsx/ UserListContainer.jsx 생성

### action 추가

action.js

```js
//users
//깃헙 API 호출을 시작
export const GET_USERS_START = "GET_USERS_START";

//깃헙 API 호출에 대한 응답이 성공적으로 돌아온 경우
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";

//깃헙 API 호출에 대한 응답이 실패한 경우
export const GET_USERS_FAIL = "GET_USERS_FAIL";

export function getUsersStart() {
  return {
    type: GET_USERS_START,
  };
}

export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
}

export function getUsersFail(error) {
  return {
    type: GET_USERS_FAIL,
    error,
  };
}
```

### reducer 추가

users.js

```js
import { GET_USERS_FAIL, GET_USERS_START, GET_USERS_SUCCESS } from "../actions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export default function users(state = initialState, action) {
  if (action.type === GET_USERS_START) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      data: action.data,
    };
  }
  if (action.type === GET_USERS_FAIL) {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }

  return state;
}
```

### UserList.jsx/ UserListContainer.jsx 생성

UserList.jsx

```js
import { useEffect } from "react";

export default function UserList({ users, getUsers }) {
  //componentMounted 시점에서 API를 불러야 한다
  useEffect(() => {
    getUsers(); //getUsers 부분은 UserListContainer로 빼주고 UserList는 화면에 보이는 정도만 관리한다
  }, [getUsers]);

  if (users.length === 0) {
    return <p>현재 유저 정보 없음</p>;
  }
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.login}</li>
      ))}
    </ul>
  );
}
```

UserListContainer.jsx

```js
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../components/UserList";
import { getUsersFail, getUsersStart, getUsersSuccess } from "../redux/actions";
import axios from "axios";

export default function UserListContainer() {
  const users = useSelector((state) => state.users.data);
  //getUsersfh 받은 비동기 데이터가 action-> reducer-> store-> Provider로 가서 데이터를 가져올수 있다.
  const dispatch = useDispatch();

  const getUsers = useCallback(async () => {
    try {
      dispatch(getUsersStart());
      const res = await axios.get("https://api.github.com/users");
      dispatch(getUsersSuccess(res.data));
    } catch (error) {
      dispatch(getUsersFail(error));
    }
  }, [dispatch]);

  return <UserList users={users} getUsers={getUsers} />;
}
```

App.js

```js
<header className="App-header">
  <UserListContainer />
  <TodoListContainer />
  <TodoFormContainer />
</header>
```

## 리덕스 미들웨어

- 미들웨어가 "디스패치"의 앞뒤에 코드를 추가할 수 있게 해준다.
- 미들웨어가 여러개면 미들웨어가 "순차적으로" 실행된다.
- 두 단계
  - 스토어를 만들때, 미들웨어를 설정하는 부분
    - {createStore, applyMiddleweare} from redux
  - 디스패치가 호출될때 실제로 미들웨어를 통과하는 부분
- dispatch 메소드를 통해 store로 가고 있는 액션을 가로채는 코드

store.js

```js
import { applyMiddleware, createStore } from "redux";
import todoApp from "./reducers/reducer";

function middleware1(store) {
  console.log("middleware1", 0);
  return (next) => {
    console.log("middleware1", 1, next);
    return (action) => {
      console.log("middleware1", 2);
      const returnValue = next(action);
      console.log("middleware1", 3);
      return returnValue;
    };
  };
}

function middleware2(store) {
  console.log("middleware2", 0);
  return (next) => {
    console.log("middleware2", 1, next);
    return (action) => {
      console.log("middleware2", 2);
      const returnValue = next(action);
      console.log("middleware2", 3);
      return returnValue;
    };
  };
}
//console 순서 1-0, 2-0, 2-1, 1-1, 1-2, 2-2, 2-3, 1-3, (이후 1-2, 2-2, 2-3, 1-3)
const store = createStore(todoApp, applyMiddleware(middleware1, middleware2));

export default store;
```

## redux-devtools

```
npm i redux-devtools-extension -D
```

store.js

```js
import { applyMiddleware, createStore } from "redux";
import todoApp from "./reducers/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(todoApp, composeWithDevTools(applyMiddleware()));

export default store;
```

## redux thunk

- 리덕스 미들웨어
- 리덕스에서 비동기 처리를 위한 라이브러리
- 액션 생성자를 활용하여 비동기 처리
- 액션 생성자가 액션을 리턴하지않고, 함수를 리턴

```
npm i redux-thunk
```

store.js

```js
//비동기 사용 준비 완료
const store = createStore(todoApp, composeWithDevTools(applyMiddleware(thunk)));
```

action.js thunk추가 (api를 가지고있던 UserListContainer에서 코들르 잘라온다)

```js
export function getUsersThunk() {
  return async (dispatch) => {
    try {
      dispatch(getUsersStart());
      const res = await axios.get("https://api.github.com/users");
      dispatch(getUsersSuccess(res.data));
    } catch (error) {
      dispatch(getUsersFail(error));
    }
  };
}
```

UserListContainer.jsx

```js
//콜백으로 getUsers를 생성하고 dispatch(getUsersThunk)를 해준다
export default function UserListContainer() {
  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  const getUsers = useCallback(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);
  return <UserList users={users} getUsers={getUsers} />;
}
```

## redux promise middleware

```
npm i redux-promise-middleware
```

store.js

```js
//사용셋팅
const store = createStore(
  todoApp,
  composeWithDevTools(applyMiddleware(thunk, promise))
);
```

action.js

```js
//액션추가
const GET_USERS = "GET_USERS";

export const GET_USERS_PENDING = "GET_USERS_PENDING ";
export const GET_USERS_FULFILLED = "GET_USERS_FULFILLED";
export const GET_USERS_REJECTED = "GET_USERS_REJECTED";
// 위에 세가지는 promise가 반환하는 명칭이다
// 이명칭을 변수명으로 하고 reducer로 넘겨야 reducer가 모든 케이스의 대응할 수 있다.
export function getUsersPromise() {
  return {
    type: GET_USERS,
    payload: async () => {
      const res = await axios.get("https://api.github.com/users");
      return res.data;
    },
  };
}
```

UserListContainer.jsx

```js
export default function UserListContainer() {
  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  const getUsers = useCallback(() => {
    dispatch(getUsersPromise()); // getUserPromise 사용
  }, [dispatch]);
  return <UserList users={users} getUsers={getUsers} />;
}
```

users.js

```js
//reducer 추가 모든 케이스에 대응 할수 있도록 타입 지정
import {
  GET_USERS_FAIL,
  GET_USERS_FULFILLED,
  GET_USERS_PENDING,
  GET_USERS_REJECTED,
  GET_USERS_START,
  GET_USERS_SUCCESS,
} from "../actions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export default function users(state = initialState, action) {
  if (action.type === GET_USERS_START || action.type === GET_USERS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      data: action.data,
    };
  }

  if (action.type === GET_USERS_FULFILLED) {
    return {
      ...state,
      loading: false,
      data: action.payload, //promise가 가져오는 데이터명
    };
  }

  if (action.type === GET_USERS_FAIL) {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }

  if (action.type === GET_USERS_REJECTED) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  }

  return state;
}
```