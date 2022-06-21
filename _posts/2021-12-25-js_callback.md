---
layout: post
title: "[Javascript] 자바스크립트 콜백함수"
data: '2021-12-25'
category: ['Javascript']

---

```js
function findUser(id) {
  const user = {
    id: id, 
    name: "User" + id,
    email: id + "@test.com"
  };
  return user 
}

const user = findUser(1)
console.log("user:", user);
// user: {id: 1, name: "User1", email: "1@test.com}
```

콜백함수
```js
function findUserAndCallBack(id, cb){
  const user = {
    id: id, 
    name: "User" + id,
    email: id + "@test.com"
  };
  cb(user)
}
findUserAndCallBack(1, function (user) {
  console.log("user:", user)
});
// user: {id: 1, name: "User1", email: "1@test.com}
```

두개의 코드는 같은 값을 반환 할 수 있다. 하지만 두 함수에는 차이가 있는데 첫번째 코드는 결과값을 리턴하고 함수 외부에서 결과값을 이용하여 작업을 수행한다. 하지만 두번째 코드는 결과값을 이용해 해야할 작업까지 함수 내부에서 수행하기 때문에 결과값을 리턴할 필요가 없다. 

## 콜백함수 비동기 처리

비동기 함수 : 호출부에서 실행 결과를 기다리지 않아도 되는 함수 

동기 함수 : 호출부에서 실행 결과가 리턴될 때 까지 기다려야 하는 함수 

```js
function findUserAndCallBack(id, cb) {
  setTimeout(function () {
    console.log("waited 0.1 sec.");
    const user = {
      id: id,
      name: "User" + id,
      email: id + "@test.com",
    };
    cb(user);
  }, 100);
}

findUserAndCallBack(1, function (user) {
  console.log("user:", user);
});
```
위에 코드는 setTimeout을 사용할 때 콜백함수를 사용하면 return값을 받지 않아서 setTimeout으로 인해 undefined 값을 받지 않고 함수내부에서 수행하기 때문에 정상적으로 코드가 출력된다. 



`요즘 추세는 콜백함수를 중첩해서 사용하지 않는다고 한다. 들여쓰기로 인해 코드 가독성일 떨어지며, 콜백지옥에 빠지게 되는 경우가 있어 Promise 나 async/await를 이용하는 방법으로 대체한다. `

<div>
  [참조]<br/>
  <a href="https://www.daleseo.com/js-async-callback/" target="_blank">https://www.daleseo.com/js-async-callback/</a><br/>
</div>
