---
layout: post
title: "[React] 리액트 기초"
data: '2022-01-06'
category: [React]

---

## React Concept

### React Client Side Rendering (CSR)
js가 전부 다운로드 되어 리액트가 정상 실행되기 전까지는 화면이 보이지 않음

1. Sever sending response to Browser

2. Browser Bownloads JS

3. Browser executes React

4. Page now viewable and interactable

### React Sever Side Rendering (CSR)
js가 전부 다운로드 되지 않아도, 일단 화면은 보이지만 유저가 사용할 수 없음

1. Sever sending ready to be rendeered HTML respose to Browser

2. Browser renders the page, now viewable, and browser downloads js

3. Browser executes react

4. Page now interactable

## react 라이브러리 

### 리액트 핵심모듈

1. 리액트 컴포넌트 - HTMLElement 연결하기 
```js
import ReactDOM from 'react-dom';
```
1. 리액트 컴포넌트 만들기
```js
import React from 'react';
```

### 간단하게 리액트 test

```html
  <div id="root"></div>
  <button id="btn_plus">+</button>
```
```css
 * {
    margin: 0;
    padding: 0;
    border: 0;
  }
  #root{
    color: #fff;
    font-size: 20px;
    background-color: green;
    text-align: center;
    width: 200px;

  }
  #btn_plus{
    background-color: red;
    border:2px solid #000;
    font-size: 15px;
    width: 200px;
  }
```
javascript
```js
const root = document.querySelector('#root');
const btn_plus = document.querySelector('#btn_plus')
let i = 0;
root.innerHTML= '<p>init : 0</p>';

btn_plus.addEventListener('click', () =>{
  root.innerHTML = `<p>init: ${++i}</p> `
})
```
javascript - component
```js
const component = {
  message: 'init',
  count: 0,
  render() {
    return `<p>${this.message} : ${this.count}</p>` 
  }
};

function render(rootElement, component) {
  rootElement.innerHTML = component.render()
}

//초기화
render(document.querySelector('#root'), component);

document.querySelector('#btn_plus').addEventListener('click', () => {
  component.message = 'update';
  component.count =component.count +1 ;

  //값이 바뀔때마다 render
  render(document.querySelector("#root"), component)
})
```
React
```js
const Component = props => {
  return React.createElement('p', null, `${props.message} : ${props.count}`)
}

ReactDOM.render(
  React.createElement(Component, {message: 'init', count: 0}, null), 
  document.querySelector('#root')
);

document.querySelector('#btn_plus').addEventListener('click', () => {
  ReactDOM.render(
    React.createElement(Component, {message: 'update', count: 10}, null), 
    document.querySelector('#root')
  );
})
```