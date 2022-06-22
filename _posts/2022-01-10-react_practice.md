---
layout: post
title: "[React] 리액트 실전활용 "
data: '2022-01-10'
category: [React]

---

## High Order Component
리액트에서 컴포넌트안에 있는 로직을 다시 재활용할수 있는 기술

1. cross-cutting concerns(페이지별로 비슷한 시점에 발생)
2. Original Component는 변경하면 안된다. composition해야한다.
3. 감싸고있는 component에 Unrelated props 준다
4. 최대화

주의
1. render메소드안에 사용하면 안된다.
2. static Methods 새로 만들어진 components에 복사에서 넣는다
3. React.forwardRef

```
npm i --save hoist-non-reat-statics
```

## Controlled Component & Uncontrolled Component

### 엘리먼트의 상태 관리
- 엘리먼트를 가지고 있는 컴포넌트가 관리(Controlled)
- 엘리먼트의 상태를 관리하지 않고, 엘리먼트의 참조만 컴포넌트가 소유(Uncontrolled)

ControlledComponent.jsx
```js
import React from 'react'
class ControlledComponent extends React.Component {
  state = {
    value: ""
  }
  render() {
    const { value } = this.state
    return (
      <div>
        <input value={value} onChange={this.change}/>
        <button onClick={this.click}>전송</button>
      </div>
    )
  }
  //입력에따라 이벤트가 바뀔때 controll을 사용하는 것이 좋다. 
  change = (e) => {
    console.log(e.target.value)
    this.setState({ value: e.target.value })
  }
  click = () => {
    console.log(this.state.value)
  }
}

export default ControlledComponent
```
UncontrolledComponent.jsx
```js
import React from 'react'
{%raw%}
class UncontrolledComponent extends React.Component {
  inputRef = React.createRef();
  //document를 이용해서 실제 돔을 사용하기 보다는 가상돔을 사용하는 것이 좋다.
  render() {
    console.log("initial render", this.inputRef)
    return (
      <div>
        <input style={{ color: 'black' }} ref={this.inputRef} />
        <button onClick={this.click}>전송</button>
      </div>
    )
  }
  componentDidMount() {
    console.log("componentDidMount", this.inputRef)
  }

  click = () => {
    // const input = document.querySelector('#my-input');
    // console.log(input)

    console.log(this.inputRef.current.value)
  }
}
{% endraw%}
export default UncontrolledComponent
```