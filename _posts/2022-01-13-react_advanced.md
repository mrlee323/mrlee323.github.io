---
layout: post
title: "[React] React Advanced "
data: '2022-01-13'
category: [React]

---

## Optimizing Performance
- 필요할 때만 렌더한다

### Reconciliation
- 랜더 전후의 일치 여부를 판단하는 규칙
- 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어 낸다
- 개발자가 key prop을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할 지 표시해 줄 수 있다. 

- 서로다른 타입의 엘리먼트는 다른 트리를 만들어낸다
  (마운트 언마운트가 계속 발생한다.)
- 같은 타입의 엘리먼트는 어트리뷰트를 업데이트시킨다
- 같은 타입의 컴포넌트는 언마운트/마운트가 아닌 업데이트 시킨다

### 서로 다른 타입의 엘리먼트
```js

import React from 'react'

class Foo extends React.Component {
  componentDidMount(){
    console.log("Foo component DidMount")
  }
  componentWillUnmount(){
    console.log("Foo componentWillUnMount")
  }
  render(){
    return <p>Foo</p>
  }
}

class App extends React.Component {
  state = {
    count : 0
  }

  componentDidMount(){
    setInterval(()=>{
      this.setState({count: this.state.count+1})
    },1000)
  }

  render(){
    if(this.state.count % 2 === 0) {
      return (
        <div>
          <Foo />
        </div>
      )
    }//두 Foo는 서로다른 Foo로 DidMount와 WillUnMount가 번갈아 찍힌다
    return (
      <span>
        <Foo />
      </span>
    )
  }
}
```
### 같은 타입에 어트리뷰트가 다를 경우
```js
import React from 'react'

class Foo extends React.Component {
  componentDidMount(){
    console.log("Foo component DidMount")
  }
  componentWillUnmount(){
    console.log("Foo componentWillUnMount")
  }
  render(){
    return <p>Foo</p>
  }
}

class App extends React.Component {
  state = {
    count : 0
  }

  componentDidMount(){
    setInterval(()=>{
      this.setState({count: this.state.count+1})
    },1000)
  }

  render(){
    if(this.state.count % 2 === 0) {
      return (
        <div className="before" title="stuff"></div>
      )
    }
    return (
      <div className="after" title="stuff"></div>
    )
    //1초마다 className만 변경된다
  }
}

export default App
```
### 같은 타입의 컴포넌트
```js
import React from 'react'

class Foo extends React.Component {
  componentDidMount(){
    console.log("Foo component DidMount")
  }
  componentWillUnmount(){
    console.log("Foo componentWillUnMount")
  }
  
  static getDerivedStateFromProps(nextProps, prevProps){
    console.log("Foo getDerivedStateFromProps",nextProps, prevProps)
    return{}
  } //같은 타입의 Foo에 다른 Props를 받아 마운트/언마운트가아닌 업데이트가 된다.

  render(){
    console.log("Foo render")
    return <p>Foo</p>
  }
}

class App extends React.Component {
  state = {
    count : 0
  }

  componentDidMount(){
    setInterval(()=>{
      this.setState({count: this.state.count+1})
    },1000)
  }

  render(){
    if(this.state.count % 2 === 0) {
      return <Foo name="Mark"/>
    }
    return <Foo name="Hanna"/>
  }
}

export default App
```
컴포넌트 매칭
```js
import React from 'react'

class Foo extends React.Component {
  componentDidMount(){
    console.log("Foo componentDidMount")
  }
  componentWillUnmount(){
    console.log("Foo componentWillUnMount")
  }
  
  static getDerivedStateFromProps(nextProps, prevProps){
    console.log("Foo getDerivedStateFromProps",nextProps, prevProps)
    return{}
  }


  render(){
    console.log("Foo render", this.props.children)
    return <p>Foo</p>
  }
}

class App extends React.Component {
  state = {
    count : 0
  }

  componentDidMount(){
    setInterval(()=>{
      this.setState({count: this.state.count+1})
    },1000)
  }

  render(){
    if(this.state.count % 2 === 0) {
      return <ul>
        <Foo key="2">second</Foo>
        <Foo key="3">third</Foo>
      </ul>
    }//key를 달지않으면 순서대로 매칭이 되기때문에third가 WillUnMount되고
    //key를 달면 key로 매칭이되기때문에 first WillUnMount가 된다. 
    return <ul>
      <Foo key="1">first</Foo>
      <Foo key="2">second</Foo>
      <Foo key="3">third</Foo>
  </ul>
  }
}
export default App
```
### Mounting Updating Unmounting 순서
```
Mounting :   
constructor -> getDerivedStateFromProps -> render -> React updates DOM and refs ->componentDidMount
```
```
updating :   
(New props) -> getDerivedStateFromProps -> shouldComponentUpdate(render결정) -> render -> getSanpshotBeforeUpdate -> React updates DOM and refs -> componentDidUpdate  
(setState) -> shouldComponentUpdate(render결정) -> render -> getSanpshotBeforeUpdate -> React updates DOM and refs -> componentDidUpdate  
(forceUpdate) -> render -> getSanpshotBeforeUpdate -> React updates DOM and refs -> componentDidUpdate  
```
```
Unmounting :  
componentWillUnMount
```
![lifecyle](https://media.vlpt.us/images/yuda1124/post/6cd1c2a8-2542-4e12-863f-a6f7bd28cedc/image.png)

### shouldComponentUpdate 설정
```js
import React from 'react'

class Persons extends React.Component {
  //여기서 ReactlPureComponent를 사용하면 shouldComponentUpdate에설정한것과 같은 기능을 얻는다.
  //input의 value만 변경되었을뿐 persons는 변경되지않았음에도 같이 렌더가 되기때문에 렌더가 되지않게 설정할수 있다.

  shouldComponentUpdate(previousProps){
    for(const key in this.props){
      if(previousProps[key] !== this.props[key]){
        return true
      }
    }
    return false
  }
  
  render(){
    console.log('Person render')
    const {name, age} = this.props
      return <div>{name}/{age}</div>
  }
}

class App extends React.Component {
  state = {
    text : "",
    persons : [
      {id:1, name:'Mark', age: 39},
      {id:2, name:'Hanna', age: 29},
    ]
  }

  render(){
    const {text, persons} = this.state
    return (
      <div>
        <input type="text" vaule={text} onChange={this._change} />
        <ul>{persons.map(person=>{
          return <Persons {...person} key={person.id} />
        })}</ul>
      </div>
    )
  }
  _change = e =>{
    this.setState({
      ...this.state,
      test: e.target.vaule,
    })
  }
}

export default App
```
함수일때
```js
import React from 'react'
//React.memo가 shouldComponentUpdate설정 대신
const Persons = React.memo(({name, age})=>{
  console.log("Person render")
  return (
    <div>
      {name}/{age}
    </div>
  )
})

const App=() => {
  const [state, setState] = React.useState({
    text : "",
    persons : [
      {id:1, name:'Mark', age: 39},
      {id:2, name:'Hanna', age: 29},
    ]
  })

  const toPersonClick =React.useCallback(() => {},[])

  const {text, persons} = state
  return (
    <div>
      <input type="text" vaule={text} onChange={change} onClick={toPersonClick}/>
      <ul>{persons.map(person=>{
        return <Persons {...person} key={person.id} />
      })}</ul>
    </div>
  )
  function change (e) {
   setState({
      ...state,
      test: e.target.vaule,
    })
  }
      
}

export default App
```
## createPortal
index
```html
<div id="modal"></div>
```
Modal.jsx
```js
import ReactDOM from 'react-dom'

const Modal = ({ children }) => ReactDOM.createPortal(children, document.querySelector("#modal"))

export default Modal
```
App.js
```js
function App(){
  const [visible, setVisible] = useState(false)

  const open= ()=>{
    setVisible(true)
  }

  const close= ()=>{
    setVisible(false)
  }
  {% raw %}
  return <div>
    <button onClick={open}>open</button>
    {visible && (
      <Modal>
        <div 
          style={{
            width: '100vw', 
            height: '100vh', 
            backgroundColor:'rgba(0,0,0,0.5)'
          }} 
          onClick={close}>Hello</div>
      </Modal>
    )}
  </div>
  {% endraw %}
}
```
## forwardRef
- 하위에 있는 DOM요소에 reference를 지정하기 위해서 상위로 reference를 보낸다  

MyInpu.jsx
```jsx
import React from 'react'

export default React.forwardRef(function MyInput(props, ref) {
  return <div>
    <p>MyInput</p>
    <input ref={ref} />
  </div>
})
```

App.js
```js
import React, { useRef } from 'react'
import MyInput from './components/MyInput';

function App() {
  const myInputRef = useRef();
  const click = ()=>{
    console.log(myInputRef.current.value)
  }
  return <div>
    <MyInput ref={myInputRef} />
    <button onClick={click}>send</button>
  </div>
}

export default App
```