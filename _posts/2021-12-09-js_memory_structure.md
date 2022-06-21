---
layout: post
title: "[Javascript] 자바스크립트 메모리 구조"
data: '2021-12-09'
category: ['Javascript']

---

자바스크립트 메모리구조는 <mark>코드영역, 스택영역, 데이터영역, 힙영역<mark>으로 나눌수 있다. 

## 코드영역
실행할 프로그램의 코드가 저장되는 영역으로 텍스트 영역
코드 영역은 실행 파일을 수행하는 명령어들이 메모리 공간 쪽으로 제어문, 함수, 상수 등이 지정된다.

```js
//코드영역
let a = 100
var b = 30
if (a >50) {
  let a = 10;
  console.log(a);
  console.log(b);
}
```
## 스택영역
함수 호출시 지역변수와 매개변수가 저장되는 임시 메모리 영역 
스택 영역에 저장되는 함수의 호출 정보를 stack frame라고 부르며 함수 호출이 완료되면 스택 영역에 함수 정보들은 소멸된다. 

<a href="/programming/stack">스택</a>

## 데이터영역
메모리의 데이터(Data) 영역은 프로그램의 전역 변수(global), 정적(static) 변수, 배열(array), 구조체(structure)가 저장되는 영역  
실행 도중에 전역 변수가 변경될 수도 있으니 Read-Write로 지정

## 힙영역
사용자 프로그래머가 직접 할당/해제 하는 메모리 영역
힙 영역은 메모리의 낮은 주소부터 높은 주소까지 올라가는 절차 형식으로 할당

```
Javascript에선 heap은
객체, 배열, 함수와 같이 크기가 동적으로 변할 수 있는 참조타입 값을 저장한다
```


[참조]  

<a href="https://junghn.tistory.com/entry/" target="_blank">https://junghn.tistory.com/entry/</a><br/>
<a href="https://velog.io/@milkyway/
%EB%A9%94%EB%AA%A8%EB%A6%AC-%ED%9E%99heap%EA%B3%BC-%EC%BD%9C%EC%8A%A4%ED%83%9DCall-stack" target="_blank">https://velog.io/@milkyway/
%EB%A9%94%EB%AA%A8%EB%A6%AC-%ED%9E%99heap%EA%B3%BC-%EC%BD%9C%EC%8A%A4%ED%83%9DCall-stack</a>



