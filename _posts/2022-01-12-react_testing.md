---
layout: post
title: "[React] 리액트 단위테스트 "
data: '2022-01-12'
category: [React]

---

## Unit Test & Jest 사용
```
npm i jest -D

"scripts" : {
 "test" : "jest"
}

npx jest --watchAll
```
### Unit Test
- 통합테스트에 비해 빠르고 쉽다
- 통합테스트를 진행하기전에 문제를 찾아낼 수 있지만, 통합테스를 성공하지 않을수 있다.
- 테스트 코드의 동작을 설명하는 명세가 된다.
  - 테스트를 읽고 어떻게 동작하는지도 예측 가능하다.
- 단위테스트를 작성하고 코딩을 해야한다. 

### Jest (Testing 프레임워크)
- facebook의 오픈소스
- Easy Setup
- Instant Feddback(고친파일만 빠르게 테스트를 다시해주는 기능)
- Snapshot Testing(컴포넌트 테스트에 중요한 역할을 하는 스냅샷)

test방법
```js
describe('expect test', ()=>{
  it("37 to equal 37", ()=>{
    expect(37).toBe(37)
    //예상이 37인데 결과가 37이 맞어?
  })
  it("{age:39} to equal {age:39}", ()=>{
    expect({age:39}).toEqual({age:39})
    //expect({age:39}).toBe({age:39})가르키고있는곳이 다르기때문에 Fail 
  })
  it(".toHaveLength", ()=>{
    expect("hello").toHaveLength(5)
    //length가 5맞어?
  })
  it(".toHaveProperty", ()=>{
    expect({name:"Mark"}).toHaveProperty("name")
    //Property로 name이 있어?
    expect({name:"Mark"}).toHaveProperty("name","Mark")
    //Property로 name이 있고 Mark가 있어?
  })
  it(".toBeDefined", ()=>{
    expect({name:"Mark"}.name).toBeDefined()
    //객체의 name은 defined한 상태야?
  })
  it(".toBeFalsy", ()=>{
    expect(false).toBeFalsy()
    expect(0).toBeFalsy()
    expect('').toBeFalsy()
    expect(null).toBeFalsy()
    expect(undefined).toBeFalsy()
    expect(NaN).toBeFalsy()
    //falsy한 값이 맞아?
  })
  it('.toBeGreaterThan', () => {
    expect(10).toBeGreaterThan(9)
    //10은 9보다 커?
  })
  it('.toBeGreaterThanOrEqual', () => {
    expect(10).toBeGreaterThanOrEqual(10)
    //10은 10보다 크거나 같아?
  })
  it('.toBeInstanceOf', () => {
    class Foo {}
    expect(new Foo()).toBeInstanceOf(Foo)
  })
})
```
비동기 test
- async test with async-await
```js
describe('use async test', ()=>{
  it('async-await', async ()=>{
    function p(){
      return new Promise(resolve => {
        setTimeout(()=>{
          resolve(37)
        }, 1000)
      })
    }
    const data = await p()
    return expect(data).toBe(37)
  })
})

describe('use async test', ()=>{
  it('async-await, catch', async ()=>{
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(()=> {
          reject(new Error('error'))
        },1000)
      })
    }
    try{
      await p()
    } catch (error){
      expect(error).toBeInstanceOf(Error)
    }
  })
})
```
## testing-libraryreact 활용

### Button 컴포넌트 테스트 시나리오
1. 컴포넌트가 정상적으로 생성
2. button이라고 쓰여있는 엘리먼트는 HTMLButtonElement이다.
3. 버튼을 클릭하면, p태그 안에 '버튼이 방금눌렸다'라고 쓰여진다.
4. 버튼을 클릭하기 전에는, p태그안에'버튼이 눌리지 않았다.'라고 쓰여진다
5. 버튼을 클릭하고 5초뒤에는, p태그 안에' 버튼이 눌리지 않았다'라고 쓰여진다.
6. 버튼을 클릭하면 5초동안 버튼이 비활성화 된다.   

Button.test.js
```js
import { act, fireEvent, render } from "@testing-library/react"
import Button2 from "./Button2"

describe('Button 컴포넌트(@testing-library/react)', ()=>{
  //1번
  it('컴포넌트가 정상적으로 생성된다', ()=>{
    const button = render(<Button2 />)
    expect(button).not.toBe(null)
  })//가지고온 button이 null이 아니지?

  //2번
  it('"button"이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.', ()=>{
    const {getByText} = render(<Button2 />)
    const buttonElement = getByText("button")//button이름의 엘리먼트찾기
    expect(buttonElement).toBeInstanceOf(HTMLButtonElement)
  })//Button2를 렌더해서 getByText로 button을 찾아 
  //그 buttonElement는 HTMLButtonElement지?

  //3번
  it('버튼을 클릭하면, p태그 안에 "버튼이 방금눌렸다"라고 쓰여진다.', ()=>{
    const {getByText} = render(<Button2 />)
    const buttonElement = getByText("button")
    fireEvent.click(buttonElement);
    const p = getByText("버튼이 방금 눌렸다")
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(HTMLParagraphElement)
  })//fireEvent로 buttonElemnt를 click해 
  //버튼이 방금눌렸다가 있어를 p에 담아서 HTMLParagraphElement 확인해봐

  //4번
  it('버튼을 클릭하기 전에는, p태그안에"버튼이 눌리지 않았다."라고 쓰여진다', ()=>{
    const {getByText} = render(<Button2 />)
    const p = getByText("버튼이 눌리지 않았다")
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(HTMLParagraphElement)
  })
  //event가 없는상태 getByText로 버튼이 눌리지 않았다를 찾아서 p에 담고 HTMLParagraphElement 확인해봐

  //5번
  it('- 버튼을 클릭하고 5초뒤에는, p태그 안에 "버튼이 눌리지 않았다"라고 쓰여진다.', ()=>{
    jest.useFakeTimers()//5초가 흐르지 않아도 확인이가능

    const {getByText} = render(<Button2 />)
    const buttonElement = getByText("button")
    fireEvent.click(buttonElement);

    //5초 흐른다
    act(()=>{// 
      jest.advanceTimersByTime(5000);
    })
    
    const p = getByText("버튼이 눌리지 않았다")
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(HTMLParagraphElement)
  })//button찾고 click하고 5초후에 버튼이 눌리지 않았다가 HTMLParagraphElement에 있어?
 
  //6번
  it('버튼을 클릭하면 5초동안 버튼이 비활성화 된다.',()=>{
    jest.useFakeTimers()
   
    const {getByText} = render(<Button2 />)
    const buttonElement = getByText("button")
    fireEvent.click(buttonElement);

    //비활성화
    expect(buttonElement).toBeDisabled()
    //5초 흐른다
    act(()=>{
      jest.advanceTimersByTime(5000);
    })
    // 활성화
    expect(buttonElement).not.toBeDisabled()
    
    const p = getByText("버튼이 눌리지 않았다")
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(HTMLParagraphElement)
  }) //click이라는 event가 발생했을때 buttonElement가 비활성화상태 맞아? 그리고 5초후 buttonElemnet가 비활성화상태아닌거 맞아? 그리고 이상태에서 '버튼이 눌리지않았다'가 HTMLParagraphElement있어?
})
```
Button2.jsx
```jsx
import { useState, useRef, useEffect } from "react"

const BUTTON_TEXT = {
  NORMAL: '버튼이 눌리지 않았다',
  CLICKED: '버튼이 방금 눌렸다'
}

export default function Button() {

  const [message, setMessage] = useState(BUTTON_TEXT.NORMAL)
  
  const timer = useRef()

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [])
  return (
    <div>
      <button onClick={click} disabled={message === BUTTON_TEXT.CLICKED}>button</button>
      <p>{message}</p>
    </div>
  )

  function click() {
    setMessage(BUTTON_TEXT.CLICKED)
    timer.current = setTimeout(() => {
      setMessage(BUTTON_TEXT.NORMAL)
    }, 5000)
  }
}
```