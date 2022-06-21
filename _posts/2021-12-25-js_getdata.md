---
layout: post
title: "[Javascript] 자바스크립트 JSON파일 가져오기"
data: '2021-12-25'
category: ['Javascript']

---

Promise를 사용한 비동기 코딩은 에러가 발생하면 연쇄적인 then()중 어디서 발생했는지 알수없다. 거기다 breakpoint걸고 디버거를 돌려도 화살표함수로 한줄짜리 콜백함수인 경우 breakpoint에서 멈추지 않는다. 그래서 catch()를 사용해야하는데 동기코드와 비동기코드가 섞여 있을 경우 사용이 난해 해진다. 복잡한 구조인경우 Promise가 볍렬로 또는 중첩해서 호출하때 생기며 이럴 경우 들여쓰기로인해 가독성또한 떨어진다. 

## async/await

async/await는 비동기 코드를 동기코드 처럼 보이게 작성할 수 있다.

`async` : async키워드가 붙어있는 함수 내부에서만 사용할 수 있으며  비동기 함수가 리턴하는 Promise로 부터 결과값을 추출 해준다.

`await` : 일반 비동기처리처럼 바로 실행이 다음 라인으로 넘어가는 것이아니라 결과값을 얻을 수 있을 때까지 기다려 준다. 

```js
async function fetchAuthorName(postId) {
  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await postResponse.json();
  const userId = post.userId;
  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const user = await userResponse.json();
  return user.name;
}

fetchAuthorName(1).then((name) => console.log("name:", name));

//name: Leanne Graham
```
async가 붙어이는 함수를 호출하면 명시하지않아도 Promise 객체가 리턴된다. 따라서 호출부에 then()메서드를 통해서 결과값을 출력할 수 있다. 

호출부에 또 다른 aysnc키워드가 붙어있는 함수 내부에 있다면 동일 한 방식으로 await를 사용하여 Promise가 제공ㅎ할 값에 접근 할 수 있다.

```js
async function fetchAuthorName(postId) {
  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await postResponse.json();
  const userId = post.userId;

  try {//비동기 동기 구분없이 try/catch를 사용하여 예외처리 할 수 있다.
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user = await userResponse.json();
    return user.name;
  } catch (err) {
    console.log("Faile to fetch user:", err);
    return "Unknown";
  }
}

fetchAuthorName(1).then((name) => console.log("name:", name));
```

## async/wait를 사용하여 json 파일 연결하기 

```js
const getData = async () => {
  const res = await fetch("https://jeondoh.github.io/FC_Lecture/ToyProject01/files/A1jo.json")
  const data = await res.json();
}
//여기서 필요한 함수실행에 data를 인자로 받으면 그 함수에서 data를 사용할 수 있다. 
//data.bankList.date 
```

