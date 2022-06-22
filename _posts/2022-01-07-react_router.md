---
layout: post
title: "[React] React 라우터 v5 "
data: '2022-01-07'
category: [React]

---

## React 라우팅

### Single Page Application
SPA 라우팅 과정

1. 브라우저에서 최초 '/'경로로 요청을 하면,
2. React Web App을 내려준다.
3. 내려받는 React App 에서 '/'경로에 맞는 컴포넌트를 보여준다. 
4. React App에서 다른 페이지로 이동하는 동작을 수행하면,
5 새로운 경로에 맞는 컴포넌트를 보여준다. 

```
npm i react-router-dom
```

App.js
```js
import { BrowserPouter, Route } from " react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"
import Profile from "./pages/Profile"

function App () {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  )
}

export default App
```

## Dynamic 라우팅
```js
<BrowserRouter>
  <Route path="/" exact component={Home} />
  <Route path="/profile" exact component={Profile} />

  <Route path="/profile/:id" component={Profile} />

  <Route path="/about" component={About} />
</BrowserRouter>
```
Profile.jsx
```jsx
export default function Profile (props) {
 const id = props.match.params.id;
 return(
  <div>
    <h2>Profile 페이지입니다</h2> 
    {id && <p>id는 {id}입니다.</p>}
    // id가 있으면 화면표시 
  </div>
 )
}
```
About.jsx
```
//객체스타일로 
npm i query-string
```
```js
import queryString from 'query-string'

export default function About (props) {
 const searchParams = props.loaction.search
 //const obj = const new URLSearchParams(searchParams)
//obj.get("name")//Mark
 const query = queryString .parse(searchParams)
 //{name : "Mark"}
 

 return(
  <div>
    <h2>About 페이지입니다.</h2>
    {query.name && <p>name 은 {query.name}입니다}
  </div>
 )
}
```

## Switch & NotFound

### Switch => Routes
- 여러 Route중 순서대로 먼저 맞는 하나만 보여준다.
- exact를 뺄 수 있는 로직을 만들 수 있다.
- 가장 마지막에 어디 path에도 맞지 않으면 보여지는 컴포넌트 설정해서, "Not Found"페이지를 만들 수 있다.

- v6 부터 Switch는 Routes로 변경

```js
<BrowserRouter>
  <Switch>
    <Route path="/profile/:id" component={Profile} />
    <Route path="/profile" exact component={Profile} />
    <Route path="/about" component={About} />
    <Route path="/" exact component={Home} />
    //NotFound
    <Route component={NotFound} />
  </Switch>
</BrowserRouter>
```
### NotFound
```js
export default function NotFound(){
  return <div>페이지를 찾을 수 없습니다</div>
} 
```
## JSX링크로 라우팅 이동
App.js
```js
function App() {
  return (
    <BrowserRouter>
      <Links />
      <Switch>
       <Route path="/profile/:id" component={Profile} />
       <Route path="/profile" component={Profile} />
       <Route path="/about" component={About} />
       <Route path="/" exact component={Home} />
       <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
```
Links.jsx
```js
import { Link } from "react-router-dom"

export default function Links() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">profile</Link>
      </li>
      <li>
        <Link to="/profile/1">profile/1</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/about?name=Mark">About?name=Mark</Link>
      </li>
    </ul>
  )
}
```
NavLinks.jsx
```js
import { NavLink } from "react-router-dom"

const activeStyle = { color: "green" }


export default function NavLinks() {
  return (
    <ul>
      <li>
        <NavLink to="/" exact activeStyle={activeStyle}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/profile" exact activeStyle={activeStyle}>profile</NavLink>
      </li>
      <li>
        <NavLink to="/profile/1" activeStyle={activeStyle}>profile/1</NavLink>
      </li>
      <li>
        <NavLink to="/about" activeStyle={activeStyle} isActive={(match, location) => {
          return match !== null && location.search === ""
        }}>About</NavLink>
      </li>
      <li>
        <NavLink to="/about?name=Mark" activeStyle={activeStyle} isActive={(match, location) => {
          return match !== null && location.search === '?name=Mark'
        }} >About?name=Mark</NavLink>
      </li>
    </ul>
  )
}
```
## js로 라우팅 이동
Login.jsx
```js
import LoginButton from "../components/LoginButton"

export default function Login() {

  return (
    <div>
      <h2>Login 페이지 입니다.</h2>
      <LoginButton />
    </div>
  )
}
```
LoginButton.jsx
```js
import { withRouter } from "react-router-dom"
//상위 Login.jsx에게 props받기위해 
//바로 상위가 아니고 더 밑에 있어도 받을 수 있다.

export default withRouter(function LoginButton(props) {
  function login() {
    setTimeout(() => {
      props.history.push('/')
    }, 1000)
  }

  return <button onClick={login}>로그인하기</button>
})
```

## Redirect
App.js
```js
const isLogin = false;
function App() {
  return (
    <BrowserRouter>
      <Links />
      <NavLinks />
      <Switch>
        <Route path="/login" render={()=> isLogin ? <Redirect to="/"/> : <Login /> } />// isLogin이 true면 홈으로 false면 Login페이지로 
        <Route path="/profile/:id" component={Profile} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
```