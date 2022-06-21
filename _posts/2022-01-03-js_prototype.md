---
layout: post
title: "[Javascript] 자바스크립트 Object prototype"
data: '2022-01-03'
category: ['Javascript']

---

## 프로토타입 기반 프로그래밍
객체의 원형인 프로토타입을 이용하여 새로운 객체를 만들어내는 프로그래밍 기법 

## 자바스크립트에서 프로토타입

자바스크립트의 모든 객체는 자신을 생성한 객체 원형에 대한 숨겨진 연결을 갇는다. 자기자신을 생성하기 위해 사용된 객체원형을 프로토타입이라 한다. 자바스크립트의 모든 객체는 Object객체의 프로토타입을 기반으로 확장 되었기때문에 이 연결의 긑은 Object객체의 프로토타입 Object이다. 

Prototype Property가 가리키고 있는 Prototype Object와 자기자신을 만들어낸 객체의 원형을 의미하는 Prototype Link 두가지가 있다. 

### Prototype Object 연결

![prototype Object](https://miro.medium.com/max/1400/1*PZe_YnLftVZwT1dNs1Iu0A.png)

함수를 정의하면 Prototype Object도 같이 생성된다. 생성된 함수는 prototype이라는 속성을 통해 Prototype Object에 접근할수 있다. Prototype Object는 인반적인 객체이며 기본 속성으로 constructor와 \_\_proto\_\_를 가지고 있다. 

constructor는 같이 생성된 함수를 가르키고, \_\_proto\_\_는 Prototype Link를 말합니다. 

## Prototype Link

\_\_proto\_\_는 객체가 생성될때 조상이었던 함수의 Prototype Object를 가르킨다. \_\_proto\_\_속성은 모든 객체가 가지고있는 기본속성이다. 

![proto](https://miro.medium.com/max/2400/1*mwPfPuTeiQiGoPmcAXB-Kg.png)

\_\_proto\_\_는 속성을 찾을때까지 상위 프로토타입을 탐색합니다. 최상위 Object의 Prototype Object까지 도달 했는데도 못찾을 경우 undefined를 반환한다. 이렇게 \_\_proto\_\_속성을 통해 상위 프로토타입과 연결되어있는 형태를 프로토타입체인이라고 한다. 