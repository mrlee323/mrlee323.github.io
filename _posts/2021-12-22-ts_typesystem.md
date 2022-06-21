---
layout: post
title: "[TypeScript] 타입스크립트 타입시스템"
data: '2021-12-22'
category: [TypeScript]
---

- 컴파일러에게 사용하는 타입을 명시적으로 지정하는 시스템
- 컴파일러가 자동으로 타입을 추론하는 시스템 

## 타입스크립트 타입시스템
- 타입을 명시적으로 지정
- 타입을 명시적으로 지정하지 않으면, 타입스크립트 컴파일러가 자동으로 타입을 추론(타입추론)

### nolplicitAny 옵션
매개변수 지정하지 않을 경우 any로 추론 

타입을 명시적을 지정하지 않은 경우 타입스크립트가 추론 중 any라고 판단하게 되면 컴파일 에러를 발생시켜 명시적으로 지정하도록 유도

### strickNullChecks 옵션
매개변수를 number로 지정하고 retrun에 타입을 명시하지 않으면 number로 추론된다. 조건에 맞지않은 number의 값이 rutrun되면 undefined가 된다.(number에 undefined 포함되어있음)

모든타입에 자동으로 포함되어있는 null이나 undefined를 제거해준다. 

타입의 null이나 undefined를 제거해주면서 number | undefined로 추론된다. 

```ts
function f5(a:number): number {
  if(a > 0) {
    return a* 38;
  }
}
//매개변수 number
//retrun number
```
### nolmplicitReturns 옵션
함수 내에서 모든 코드가 값을 리턴하지 않으면, 컴파일 에러를 발생시킨다. 
```ts
function f5(a:number): number {
  if(a > 0) {
    return a* 38;
  }
}
//if가 아닌경우에 리턴이 없기때문에
//모든 path에 리턴을 지정해야한다.
```

### object literal type
```ts
function f7(a: { name: string; age: number}): string {
  return `이름은 ${a.name} 이고, 연령대는 ${ Math.floor(a.ge/10) * 10}대 입니다.`; 
}
```

## structual type system
이름이 달라도 구조가같은면, 같은 타입으로 본다. 
```ts
interface Iperson {
  name: string;
  age: number;
  apeak(): string;
}
type PersonType = {
  name: string;
  age: number;
  apeak(): string;
}

```
## nominal type system
구조가 같아도 이름이 다르면, 다른타입이다. 

## Type 호환성

### 서브타입 /슈퍼타입
```ts
let sub2: number[] = [1];
let sup2: object  = sub2;
sub2 = sup2;//error
//sub2는 배열 sup2는 오브젝트
//sub2는 sup2의 서브타입 
//sup2는 sub2의 슈퍼타입
```
- 같거나 서브타입인 경우, 할당이 가능하다 (공변)
- 함수의 매개변수 타입만 같거나 슈퍼타입인 경우, 할당이 가능하다 (반병)

### strictFunctionTyupes 옵션
함수를 할당할 시에 함수의 매개변수 타입이 같거나 슈퍼타입인 경우가 아닌 경우. 에러를 통해 경고한다. 

## 타입 별칭
- interface랑 비슷해보인다.
- Primitive, Union Type, Tuple, Function
- 타입을 다른 이름으로 지정
- 만들어진 타입의 refer로 사용하는 것이지 타입을 만드는것은 아님

## Aliasing Primitive
```ts
type MyStringType = string;
const str = 'world';
let mystr: MyStringType = 'hello';
myStar = str;
```
### Aliasing Union Type
```ts
let person: string | number = 0;
person ='Mark';
type StringOrNumber = string | number;

let another_ StringOrNumber = 0;
another = 'Anna';
```
### Aliasing Tuple
```ts
let person:[string, number] = ['Mark', 35];

type PersonTuple =[string, number];

let another: personTuple = ['Anna', 24];
```
### Aliasing Function
```ts
type EatType = (food: string) => void;
```