---
layout: post
title: "[Javascript] 자바스크립트 Promise"
data: '2021-12-25'
category: ['Javascript']

---

콜백지옥같은 문제점으로인해 콜백함수에서 대체할수 있는 방법 중 하나가 Promise이다. 

## Promise란?

현재에는 당장 얻을수 없지만 가까운 미래에는 얻을 수 있는 어떤 데이터에 접근 하기 윟나 방법을 제공한다.

## promise 생성 방법

```js
const promise = new Promise(function(resolve, reject {...}));
```
```js
function returnPromise() {
  return new Promise((resolve, reject) => { ... });
}
```

resolve() : 일반적으로 resolve() 함수의 인자로 미래 시점에 얻게될 결과

reject() : 미래 시점에 발생할 예외 

```js
function devide(numA, numB) {
  return new Promise((resolve, reject) => {
    if(numB === 0) reject( new Error("Unable to devide by 0."));
    else resolve(numA/ numB);
  })

devide(8, 2)
  .then((result) => console.log("성공:", result))
  .catch((error) => console.log("실패:", error))
  //성공: 4

devide(8,0)
  .then((result) => console.log("성공:", result))
  .catch((error) => console.log("실패:", error))
  //실패: Error: Unable to devide by 0.
  //   at Promise (<anonymous>:4:20)
  //   at new Promise (<anonymous>)
  //   at devide (<anonymous>:2:12)
  //   at <anonymous>:1:1
}
```
출력 결과가 정상적인 인자를 넘겼을때 `then()`  
비정상적인 인자를 넘긴경우 `catch()`


## Promise 사용방법

REST API를 호출할때 사용되는 브라우저 내장 함수인 fetch()를 사용한다. 
```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => console.log("response:", response))
  .catch((error) => console.log("error:", error));

//response: Response {type: "cors", url: "https://jsonplaceholder.typicode.com/posts/1", redirected: false, status: 200, ok: true, …}
``` 

## 메서드 체이닝
```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((post) => console.log("post:", post))
  .catch((error) => console.log("error:", error));

//post: {userId: 1, id: 1, title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", body: "quia et suscipit↵suscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto"}

```

```js
fetch("https://jsonplaceholder.typicode.com/posts/1")//url 데이터
  .then((response) => response.json())//응답 json형태 가져오기
  .then((post) => post.userId)//json에 userId 추출 
  .then((userId) => "https://jsonplaceholder.typicode.com/users/" + userId)//새로운 url에 userId의 대한 주소
  .then((url) => fetch(url))//url 데이터 연결
  .then((response) => response.json())//새로운 json 가져오기
  .then((user) => console.log("user:", user))//새로가져온 json 파일에서 user 출력
  .catch((error) => console.log("error:", error));

//user: {id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", address: {…}, …}
```

`최근에는 메서드 체이닝하는 코딩 스타일에서 async/await 키워드를 사용하는 방식으로 대체되고 있는 추세이다.`

<div>
  [참조]<br/>
  <a href="https://www.daleseo.com/js-async-promise/" target="_blank">https://www.daleseo.com/js-async-promise/</a>
</div>

