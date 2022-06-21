---
layout: post
title: "[Javascript] 자바스크립트 블록스코프 & 함수스코프"
data: '2021-12-11'
category: ['Javascript']

---

## 블록 스코프
블록스코프는 블록 {}이 생성될 때마다 새로운 스코프가 형성되는 것을 의미. es6에서 추가된 let, const 변수는 { } 에 의해서 변수의 유효범위가 결정.

- 블록 단위 (if-else문, while문, for문, try-catch문) 내에서만 유효 범위를 갖게 하는 스코프

## 함수 스코프
ES5에서는 전역스코프와 함수스코프 두가지로 나뉨. ES5에는  let이나 const 변수가 없었으므로 함수에서 사용된 {}로만 block스코프가 나눠졌고 함수스코프란 이름으로 스코프를 구분 블록스코프와 마찬가지로 함수안에서 변수의 유효범위가 결정. 

## 블록 스코프가 있을 때 실행 컨텍스트
```js
var b = 30;
let a = 100;

if (a > 20) {
  let a = 10;
  console.log(a);
  console.log(b);
}
```
1. 콜스택0에서 시작 Global 환경레코드 -> object 환경레코드 -> window에서 식별자 b 셋팅 하고 undefined 초기화 -> argument 생성

2. 처음으로 돌아와서 declarative 환경레코드에서 식별자 a를 셋팅한다. (let은 변수 선언문이에 도달했을때 초기화가 이루어지기 때문에 undefined가 아니다. 그냥 a만 셋팅 -> 변수를 위한 메모리 공간 확보하지 않음)

3. this 바인딩한다. (this가 있다면 this가 어떤애를 가르킬까)

4. outer 환경 참조를 설정한다. 없을 경우 null. 

5. global 코드 실행 ->코드첫줄//b변수의 값 할당 , a 초기화 - > a값 할당

6. if문 도달-> if문 블록 스코프생성 -> block렉시컬 환경 -> blcok 환경 레코드 -> let으로 인한 declarative 환경 레코드에서 a 식별자 할당 -> outer환경 참조 연결(global 환경 레코드에 연결된다) -> a 초기화 -> a 값 할당 

7. console.log에 도달(log 함수) -> 함수 실행 컨텍스트 생성(콜스택1생성)-> 함수 렉시컬 환경 생성 -> function 환경 레코드 -> object 환경레코드 -> param 함수 초기화(log함수 로직내 a를 받는 식별자를 알지못해서 임의로 param)/arguments 생성 -> this 바인딩 (함수에서 this 바인딩은 반드시 일어난다/ 현재 코드에 this 는 Global 환경레코드에 window를 가르킨다.) -> outer 환경참조(block렉시컬 환경레코드에 연결/ if문으로 인해 현재 콜스택0이 block환경레코드에 연결되어있기때문에 outer환경참조는 block에 연결 )

8. 함수 코드 실행 -> a값을 파라미터를 할당 -> 처음 만나는 a값 10 실행 (blcok에 a가 더 가까워서 10으로 할당) -> 완료 후 스택 삭제 -> log함수 실행 컨텍스트를 유일하게 참조해주고 있던 스택이 사라지고 log함수렉시컬환경은 가비지 컬렉터의 대상이 됨. 

9. console.log (b)도 똑같이 실행

10. if문 밖으로 나오면 블록스코프 종료 -> globla렉시컬환경을 복귀(몰스택 0 은 다시 global렉시컬환경에 연결된다.) -> block환경레코드는 삭제되지 않고 global환경 레코드에연결되어있음.