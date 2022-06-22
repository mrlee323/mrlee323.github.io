---
layout: post
title: "[Javascript] 자바스크립트 런타임"
data: '2021-12-10'
category: ['Javascript']

---

## js 엔진 
javascript 엔진dms google V8엔진이다. 

![js엔진](https://miro.medium.com/max/700/1*OnH_DlbNAPvB9KLxUCyMsA.png)

js 엔진은 메모리힙과 호출 스택 두가지로 구성된다.
- 메모리 힙: 메모리 할당 발생
- 호출 스택: 코드가 실행될 때 스택 프레임이 있는곳


## js 런타임

js는 엔진만으로 동작 하지 않는다. setTimeout과 같은 API가 예로 들수 있다. setTimeout은 엔진에서 제공하지 않고 브라우저에서 제공하는 web API이다. 

![js런타임](https://media.vlpt.us/images/graphicnovel/post/ea2635f8-4c94-4cd2-b08f-e393429d09a4/image.png)

- Web APIs : DOM, AJAX, Timer 등 브라우저에서 제공하는 api  
- Callback queue : 콜백 함수들이 대기하는 곳(FIFO 선입선출)
- Event Loop : call stack이 비워질 때마다 callback queue에 대기 중인 콜백함수가 있다면, callback 함수를 call stack에 보내줌.

## 호출 스택

자바스크립트는 단일 스레드 프로그래밍 언어 이므로 단일 호출 스택이 있다. 호출 스택은 프로그램에서 우리가 어디에 있는지르 기록하느 데이터구조이다. 

```js
function multiply(x, y) {
    return x * y;
}
function printSquare(x) {
    var s = multiply(x, x);
    console.log(s);
}
printSquare(5);
```
![호출스택](https://t1.daumcdn.net/cfile/tistory/9995544C5C32151627)

위 그림과 같이 함수 실행을 시작으로 스택 프레임이 쌓이고 작업이 완료되면 하나씩 제거 된다. 


## 비동기 콜백

단일 스레드, 단일 호출 스택로 동작하는 자바스크립트에서 많은 작업을 처리해야 할 때 사용하는 가장 쉬운 해결방법이 비동기 콜백이다.  
비동기 콜백은 동작이 완료할 때 까지 기다리지 않고 다음 동작을 진행하고 나중에 콜백(함수)을 제공한다. 다시말해 코드일부를 실행하고 나중에 실행될 함수를 제공한다. 

## 이벤트 루프/ 콜백 큐

콜백 큐 처리할 메시지 목록과 실행할 콜백 함수들의 리스트이다. 콜백 함수들을 가지고 있다가 스택이 비는 시점에 이벤트 루프를 통해 가지고있던 콜백함수를 스택으로 넘겨준다.  FIFO(First In First Out)의 구조를 가지고 있다. 

![콜백처리과정](https://t1.daumcdn.net/cfile/tistory/99A7234F5C321A7F2B?download)

### 콜백함수란?

CallBack 함수란 이름 그대로 나중에 호출되는 함수를 말한다. 어떤 이벤트가 발생했거나 특정 시점에 도달했을 때 시스템에서 호출하는 함수를 말한다.


## 호출스택 과정

코드 영역/ 콜스택/ web APIs/ 콜백큐/ 이벤트 루프로 이루어져 있다. 

1. setTimeout안에 2초뒤에 실행하는 함수안에 console.log와 함수밖에 console.log가 있다고 가정하자.
```js
setTimeout(() => {
  console.log('Hi')
}, 2000)

console.log('Hello')
```

여기서 출력 순서는 당연히 Hello다음 hi가 출력 된다. SetTimeout이 실행이 완료되지 않은 시점에서 Hello가 출력 될수 있는 이유가 바로 비동기 콜백이다.

2. 콜스택에 setTimeout이 들어가고 실행되기 전까지 Web APIs에 대기하고 있는다. 그 사이에 Hello가 콜스택으로 들어와서 출력되고 사라진다.

3. 시간이 완료된 setTimeout은 콜백큐에서 대기하다가 콜스택에 비어졌을때 이벤트 루프에 의해 콜스택으로 들어가 출력이 된다.

4. 작업이 완료된 함수는 제거된다. 모든 함수를 실행한 스택은 비어있게 된다.

### setTimeout시간이 0일때

```js
setTimeout(() => {
  console.log('Hi')
}, 0)

console.log('Hello')
```

setTimeout의 시간이 0이기 때문에 바로 출력되므로 Hi가 출력되고 Hello가 출력된다고 예상하기 쉽다. 하지만 setTimeout이 시간이 0이더라도 web APIs 넘어갔다가 콜백큐에서 이벤트 루프로 들어오게 되어있다. setTimeout이 web APIs 넘어가면 빈 콜스택에 Hello가 들어와 출력된다. Hello가 출력되고 빈 콜스택에 이벤트루프로 들어와 Hi를 출력된다.

### 무한로프 콘솔이 있다면?
```js
setTimeout(() => {
  console.log('Hi')
}, 0)

console.log('Hello')

while(true){
  console.log('Infinity');
}
```
위 코드에 Hi는 출력 되지 않는다. 그이유는 콜스택이 비어있지 않아서 이다. setTimeout은 web APIs로 넘어가고 Hello가 출력 작업이 완료되고 while문이 실행된다. while문이 실행되면 Infinity를 무한히 출력되므로 콜스택이 비지 않는다. 그러므로 이벤트 루프로 돌아올 수가 없기때문에 Hi는 출력될 수 없다. 


<div>
  [참조]<br/>
  <a href="https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec" target="_blank">https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec</a><br/>
  <a href="https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf " target="_blank">https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf </a><br/>
  <a href="https://velog.io/@graphicnovel/JS-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC" target="_blank">https://velog.io/@graphicnovel/JS-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC</a><br/>  
  <a href="https://www.hanumoka.net/2018/10/24/javascript-20181024-javascript-callback/" target="_blank">https://www.hanumoka.net/2018/10/24/javascript-20181024-javascript-callback/</a><br/>  
</div>



 



