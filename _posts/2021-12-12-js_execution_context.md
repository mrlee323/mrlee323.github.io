---
layout: post
title: "[Javascript] 자바스크립트 실행컨텍스트 & 동작원리"
data: '2021-12-12'
category: ['Javascript']

---

메모리 준비/실행과 블록스코프에서 봤던 루트를 실행 컨텍스트라 할수 있다. 실행 컨텍스트란 실행 가능한 코드가 평가되고 실행되는 환경을 제공하며 실행 결과값을 관리하는 부분이다. 실행 콘텍스트는 간단히 말해서 자바스크립트 코드를 해석하고 실행하는 환경의 추상적인 계념입니다. Javascript로 작성된 모든 코드들은 실행 콘텍스트 안에서 작동됩니다.

## 실행 가능한 코드 
global코드/function코드/eval코드

- global코드: 전역 변수를 관리하기위한 최상위 스코프. 전역에 정의된 함수, 클래스 등의 내부코드는 포함하지않는다.

- function코드: 지역 스코프를 생성하고 지역변수, 매개변수, argument 객체를 관리한다. 함수 내부에 중첩된 함수, 클래스 등의 내부 코드는 포함되지 않는다.

- eval코드: 빌트인 전역함수인 eval함수에 인수로 전달되어 실행되는 소스코드 독자적 스코프 생성된다.

## 실행 컨텍스트 타입
global 실행컨텍스트/function 실행컨텍스트/eval실행컨텍스트

- global 실행 컨텍스트: 기본 컨텍스트로 어느 함수에도 포함되지 않은 코드는 global 실행 콘텍스트에 포함한다. window객체인 전역객체를 생성하고 this의 값을 전역객체와 동일하게 설정한다.(node.js인경우 global객체생성)자바스크립트 프로그램에는 하나의 global실행 컨텍스트만 존재한다.

- function 실행 컨텍스트: 함수가 호출될 때마다 실행된 함수를 위한 새로운 실행 콘텍스트가 생성된다. 여러개가 존재할수 있다.

- eval 실행 컨텍스트: 자체 실행컨텍스트를 얻지만 eaval 사용하지 않는것을 권장한다.


## 실행 스택 
실행컨텍스트가 생성되면 실행스택에 push가 된다. 실행 스택은 코드 실행 중에 생성된 모든 실행 콘텍스트들을 저장하는 데 사용되는 후입선출(LIFO) 구조를 가지는 스택이다. 코드를 실행하면 코드가 실행되는 시간의 흐름에 따라 실행 컨텍스트 스택에는 실행 컨텍스트가 추가(Push)되고 제거(Pop)된다. 최상위에 존재하는 실행 컨텍스트는 언제나 현재 실행 중인 코드의 실행 컨텍스트이며 Running 실행컨텍스트 라 부른다.


<img width="100%" src="/public/img/stack.png" alt="실행컨텍스트 스택">


# 스크립트의 시작 Global 실행 컨텍스트
스크립트 요소에 처음 만나는 시점에 <mark>global 실행 컨텍스트</mark>가 생성된다. 

## 1. Global 실행 컨텍스트

### 렉시컬 환경 컴포넌트 와 변수 환경 컴포넌트 

- 렉시컬 환경 컴포넌트 :식별자 - 변수 매핑을 가지는 구조이다. 즉, 변수와 해당 변수에 대입된 값이 매핑되는 곳이다. 식별자는 변수/함수의 이름을 말하며, 변수는 실제 객체 또는 윈시 값에 대한 참조이다.

- 변수 환경 컴포넌트 : 변수환경 또한 렉시컬 환경이고 렉시컬 환경의 모든 프로퍼티와 요소를 가진다. ES6에서 두 환경으 차이점은 변수 환경은 변수(var)바인딩만 저장하고 렉시컬환경은 함수 선언과 변수(let 과 const)바인딩을 저장한다. 

### Global 렉시컬 환경의 구성요소 

#### 1. global 환경 레코드 
스코프에 포함된 식졀자를 등록하고 등록된 식별자에 바인딩된 값을 관리하는 저장소이다.
#### 2. outer 환경 참조  
외부 렉시컬 환경을 참조를 말한다. 현재 렉시컬 환경에서 변수를 찾을 수 없다면 외부 환경에서 변수를 찾아서 참조한다. global 렉시컬환경이 외부 렉시컬이 존재하지않으므로 참조 값이 null이다. 

### global 환경 레코드의 구성요소

#### 1. object 환경 레코드 : 
BindingObject라고 부르는 객체와 연결되며 BindingObject는 전역 코드 평가 전에 생성된 전역 객체이다. var 키워드로 선언한 전역 변수와 함수 선언문으로 정의된 전역 함수는 object 환경 레코드에 연결된 BindingObject를 통해 전역 객체의 프로퍼티와 메서드가 된다. 전역 객체를 가리키는 식별자(window) 없이 전역 객체의 프로퍼티를 참조(window.alert -> alert로 참조)할 수 있다.


#### 2. declarative 환경 레코드
let과 const 식별자로 선언된 전역 변수는 선언적 환경 레코드에 key(변수명)와 value(변수 값)으로써 등록되어 관리된다. let, const은 선언 단계와 초기화 단계가 분리되어 진행된다. 런타임 실행 흐름이 변수 선언문에 도달하기 전까지 일시적 사각지대(Temporal Dead Zone)에 빠지게 된다.

```js
var a = 3; //var는 선언과 초기화 같이 진행 
/*코드평가시 이지점에 도달시 초기화*/let b = 2; //let은 선언과 초기화 분리 진행 
```
#### 3. this 바인딩 
this가 가르키는 값. global 실행 콘텍스트에서 this의 값은 전역 객체를 가리킨다. 브라우저에서 this의 전역객체는 window객체이다

### window객체
global 환경 레코드에서 object 환경 레코드에 참조되어지는 객체로 전역 객체이다. var 변수 또한 여기에 저장되고 참조된다. window 객체의 프로퍼티가 가진 함수는 function객체가 참조 연결되어있다. 대표적인 예로 console.log는 function 객체를 가진다. 처음 global 실행 컨텍스트가 생성될 때 window객체의 프로퍼티의 function객체도 다같이 생성된다. 

### function 객체
function 객체의 숨김 프로퍼티인 [[Environment]]가 자신이 생성된 렉시컬 환경을 참조한다. 연결고리가 다시 처음 렉시컬 환경으로 향한다. 

<mark>처음 script가 시작되면 Global 실행 컨텍스트가 생성되고 그 안에 global환경레코드 -> object환경레코드 -> window객체 -> window객체의 프로퍼티 function객체가 포함되어있다. 코드를 시작할때 기본 셋팅이라고 생각하면 된다. </mark>



## 2. Global 코드 평가
```js
var b = 30;
let a = 100;

if (a > 20) {
  let a = 10;
  console.log(a);
  console.log(b);
}
```
위 의 코드를 가지로 코드평가를 정리해보자. 처음 script 시작시 global 실행 컨텍스트는 생성되었고 그 다음 과정이다.

#### 평가에서 일어나는 일  
전역 변수 등록 및 (var 변수라면)초기화  
전역 함수 등록 및 (함수선언식이라면)함수 할당  
this값 바인딩  
Scope Chain 생성 

### Global 렉시컬 환경
#### object 환경레코드 식별자 셋팅
object 환경레코드에서 window 객체에 var b = 30 의 대한 식별자 셋팅을 한다. 이때 식별자의 이름은 b이고 초기화로 undefined값 할당한다.

#### declarative 환경 레코드 생성과 식별자 할당
object 환경레코드는 처음 global 실행 컨텍스트가 생성될때 부터 생성되지만 declarative 환경레코드는 필요시 생성된다. 생성된 declarative 환경레코드에 let a = 100의 대한 a 식별자 할당을 한다. 초기화를 하지않아 undefind 값도 없다. 식별자 이름만 할당할 뿐 저장 할 메모리는 없다.

#### this 바인딩
this가 가르키는 값을 찾는다. global 렉시컬 환경은 전역객체로 window 객체를 가르키게 된다.

#### 외부 환경참조
외부 렉시컬 환경 참조 설정한다. global 렉시컬 환경은 외부환경이 때문에 null값을 가진다.

<mark>Global 코드 평가 끝</mark>

# 3. Global코드 실행
```js
var b = 30;
let a = 100;

if (a > 20) {
  let a = 10;
  console.log(a);
  console.log(b);
}
```
### 변수에 값 할당
코드가 실행 되면 bq녀수의 값을 할당하고 let변수에 도달하자마자 a를 초기화하고 바로 값을 할당한다.

### Block 렉시컬 환경
if 문 코드 블록 실행을 위한 블록 스코프 생성된다. blcok렉시컬환경에는 block환경레코드과 outer 환경참조로 구성되어진다. 

#### 식별자 할당
if문 안에 있는 let a = 10에서 식별자 할당을 한다. 위치는 block 환경 레코드 안에 declarative 환경레코드에 식별자 a 를 할당한다.

#### outer 환경참조
if 문의 외부 환경인 global 렉시컬 환경에 외부 환경 참조한다. 

#### block 렉시컬 환경 생성 완료 후 코드 실행 
if 문에 let에 도달했을때 a를 초기화하고 바로 값을 할당한다. 블록 안 a 의 값은 10이 할당된다. 

## 4. 함수 코드평가(함수 실행 컨텍스트 생성)
if 문 안에 console.log의 함수가 실행되면서 함수 실행 컨텍스트가 생성된다.

#### 콜스택 생성
함수 코드평가가 시작되면서 함수 실행 컨텍스트 생성으로 
콜스택이 추가된다. 자바스크립트에서 콜스택 생성은 함수가 실행되었을때 이루어진다. 

####  log함수 렉시컬 환경
함수 렉시컬 환경안에는 function 환경레코드가 존재하며 
object환경 레코드가 생성 된다.

#### 함수초기화 
object환경레코드에 log함수에서 인수 a 의를 파라미터에 함수 초기화로 undefined값을 할당한다.

#### this 바인딩
log 함수의 this 바인딩은 global렉시컬환경의 window를 가르킨다. console.log가 포함되어있는 if를 감싸고있는것이 전역객체이기 때문에 window가 된다. 

#### outer 환경 참조 
log함수 outer 환경참조는 block 렉시컬 환경이다. 

## 5. 함수 코드 실행
생성된 함수렉시컬 환경에 코드를 실행한다.

#### 값 할당
a의 값을 파라미터에 할당하고 외부 렉시컬 환경 참조 체일을 통해 처음만나는 a의 값 10을 찾아 실행한다.
log함수 렉시컬환경에서 outer 환경 참조를 통해 block렉시컬 환경으로 가고 block 렉시컬 환경에 있는 a의 값을 가져온다. 

#### 로그함수 완료
log함수 실행 컨텍스트를 유일하게 참조해주고 있던 스택이 사라지고, 가비지 컬렉터의 대상이 된다. 

#### console.log(b) 반복
console.log(b)또한 log함수 실행 컨텍스트를 반복한다. 


## 6. 블록스코프 종료
모든 코드가 완료되고 if문이 끝나면 if의 블록환경레코드에 연결되어있는 콜스택이 다시 global 렉시컬환경에 연결되어진다. 

<div>
  [참조]<br/>
  <a href="https://velog.io/@code-bebop/JS-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8Execution-Context" target="_blank">https://velog.io/@code-bebop/JS-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8Execution-Context </a><br/>
  <a href="https://velog.io/@hangem422/js-context  
https://kimlog.me/js/2020-01-30-execution-context/" target="_blank">https://velog.io/@hangem422/js-context  
https://kimlog.me/js/2020-01-30-execution-context/</a><br/>
</div>

 
