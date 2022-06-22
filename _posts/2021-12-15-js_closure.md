---
layout: post
title: "[Javascript] 자바스크립트 클로저"
data: '2021-12-15'
category: ['Javascript']

---
## 클로저란?
클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다. 

클로저는 반환된 내부함수가 자신이 선언됐을 때의 환경(Lexical environment)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있는 함수를 말한다.

각 함수에는 function객체를 가지고 있다. 이 객체안에는 숨김 프로퍼티로 [[Evironment]]가 있는데 이곳이 함수가 선언된 장소를 기억한다. 함수는 이 곳을 통해 외부 변수에 접근할 수 있다. 

## 자유변수
자유변수는 내부함수가 참조하는 외부함수를 말한다.
```js
const inner = (() => {
  let x = 10;
  return () => { console.log(x);}
})()
```
이 코드에서 x를 자유변수라고 할 수 있다. 코드 대로 즉시실행함수는 실행한 뒤 실행컨텍스트가 반환되더라도 내부함수의해 참조되는 한 유효하여 내부함수의 체인스코프를 통해 참조되어진다. 즉 외부함수가 이미 반환되었어도 외부함수 내의 변수는 이를 필요로 하는 내부함수가 하나 이상 존재하는 경우 계속 유지된다. 이때 내부함수가 외부함수에 있는 변수의 복사본이 아니라 실제 변수에 접근한다.

## 클로저는 어디에 쓰일까?
### 상태유지
클로저가 가장 유용하게 사용되는 상황은 현재 상태를 기억하고 변경된 최신 상태를 유지이다. 
```js
<!DOCTYPE html>
<html>
<body>
  <button class="toggle">toggle</button>
  <div class="box" style="width: 100px; height: 100px; background: red;"></div>

  <script>
    var box = document.querySelector('.box');
    var toggleBtn = document.querySelector('.toggle');

    var toggle = (function () {
      var isShow = false;

      // ① 클로저를 반환
      return function () {
        box.style.display = isShow ? 'block' : 'none';
        // ③ 상태 변경
        isShow = !isShow;
      };
    })();

    // ② 이벤트 프로퍼티에 클로저를 할당
    toggleBtn.onclick = toggle;
  </script>
</body>
</html>
```
위 코드에서 버튼을 클릭하면 이벤트 프로퍼티에 할당한 이벤트 핸들러인 클로저가 호출된다. 이때 .box 요소의 표시 상태를 나타내는 변수 isShow의 값이 변경된다. 변수 isShow는 클로저에 의해 참조되고 있기 때문에 유효하며 자신의 변경된 최신 상태를 게속해서 유지한다.

함수 내 변수는 함수 실행컨텍스트에 에서 평가되어 지기 때문에 함수의 스택이 반환되면 함수 내 변수또한 사라지게 된다. 그렇게 때문에 변화하는 상태에 대해 대응할 수 없다. 그렇기 때문에 변경이 일어나는 변수에 대해서는 전역에서 사용해야 한다. 하지만 클로저가 전역이 아닌 변수가 함수내에서 최신의 상태를 유지할 수 있도록 한다. 자유 변수가 되기 때문이다. 클로저로인해 내부함수가 외부함수를 참조하고 이함수는 자유변수가 되면서 외부함수의 실핼컨텍스트가 반환되더라도 유효한 상태이므로 최신의 상태를 유지할 수 있다.

## 전역변수 사용억제

```
변수의 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적 원인이 될 수 있다. 상태 변경이나 가변(mutable) 데이터를 피하고 불변성(Immutability)을 지향하는 함수형 프로그래밍에서 부수 효과(Side effect)를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다.
```
## 정보은닉

Java나 C++로 객체지향 프로그래밍에는 public과 private 키워드가 있다. 일반적으로 외부에서 접근 가능한 변수/함수들은 public으로 선언하고, 외부에서 사용할 필요가 없거나 사용해서 안 되는 변수/함수들은 private를 사용한다. 클로저는 자바스크립트에서 이러한 역할을 수행해준다. 
```js
a = (function () {
  var privatefunction = function(){
    alert('hello')
  }

  return {
    publicfunction : function(){
      privatefunction()
    }
  }
})()
```
a 내부의 publicfunction 함수는 privatefunction 함수를 호출합니다. publicfunction Scope에는 privatefunction이 없지만 클로저에서 접근할 수 있기 때문에 호출할 수 있다. 여기서 중요한 점은, 우리가 private function을 직접 호출할 수 없고 공개 된 public function 을 통해 호출할 수 있다는 것입니다. 이는 객체지향프로그래밍의 public/private 키워드 같이 공개할 것과 공개하지 않을 것을 정할 수 있고 이를 통해 정보은닉과 캡슐화가 가능하다.



<div>
  [참조]<br/>
  <a href="https://poiemaweb.com/js-closure" target="_blank">https://poiemaweb.com/js-closure</a><br/>
  <a href="http://clipsoft.co.kr/wp/blog/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%81%B4%EB%A1%9C%EC%A0%80closure/" target="_blank">http://clipsoft.co.kr/wp/blog/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%81%B4%EB%A1%9C%EC%A0%80closure/</a><br/>
</div>

