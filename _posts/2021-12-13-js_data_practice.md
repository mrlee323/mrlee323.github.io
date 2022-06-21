---
layout: post
title: "[Javascript] 자바스크립트 data"
data: '2021-12-13'
category: ['Javascript']

---

## 문자
String 전역 객체는 문자열(문자의 나열)의 생성자
```js
const result = 'Hello world'.indexof('world')//6
--------------------------------------------------
const result= 'Hello world'.indexof('Heropy')// -1

//String.prototype.indexOf(serchValue)
```
매개변수 : searchValue (찾으려는 문자열)
반환 값 : searchValue의 첫번째 인덱스/없으면 -1
 
 ```js
  const str = '0123'
 //length 문자의 갯수
 console.log(str.length)//4


 const str = 'Hello world!'
//index.of 문자인덱스
 console.log (str.indexof('HEROPY') !== -1)//fasle

// slice 문자추출
console.log(str.slice(6,11))//world (0에서 시작해서 3의직전 까지 추출)

//replace 문자대체
console.log(str.replace('world','HEROPY'))// world를 찾아서 HEROPY로 교체
console.log(str.replace(' world!',''))//Hello


const str = 'thesecon@gamil.com'
//match 문자추출
//정규표현식 
console.log(str.match(/.+(?=@)/)[0]) //thesecon
//@ 앞에서 [0]번째 문자

//trim
const str = '    Hello world  '
console.log(str.trim())//공백제거 Hellow world
 ```

## 숫자와 수학
```js
const pi = 3.14159265358979
console.log(pi)

//toFixed
const str = pi.toFixed(2)//pi에서 소수 둘째자리까지 
console.log(str)// 3.14
console.log(typeof str)//string toFixed를 사용하면 문자로 반환

//자바스크립트 전역함수
//setTimeout, setInterval, clearTimeout, clearInterval
//parseInt,  parseFloat

const integer = parseInt(str)// 정수반환
const float = parseFloat(str)// 부동 소수점 수 반환
console.log(integer)//3
console.log(float)//3.14
console.log(typeof integer, typeof float)//number, number
```

```js
console.log('abs: ', Math.abs(-12))//abs: 12
console.log('min: ', Math.min(2, 8))//min: 2
console.log('max: ', Math.max(2, 8))//max: 8
console.log('ceil: ', Math.ceil(3.14))//ceil: 4(정수기준올림)
console.log('floor: ', Math.floor(3.14))//floor: 3
console.log('round: ', Math.round(3.14))//round: 4
console.log('random: ', Math.random(3.14))//random: 0.051025176670133788

function random() {
  return Math.floor(Math.random()*10)
} //0~9까지 정수를 얻을수 있는 함수
```

## 배열(1)
```js
const numbers = [1, 2, 3, 4]
const fruits = ['Apple', 'Banana', 'Cherry']

//[1] 인덱스 // 찾는 과정 인덱싱
console.log(number[1])//2
console.log(fruits[2])//Cherry

//.length 배열의 길이
console.log(numbers.length)//4
console.log(fruits.length)//3
console.log([1, 2].length)//2
console.log([].length)//0 배열이 비었는지 확인할수 있다.

//.concat()
console.log(numbers.concat(fruits))//두개의 배열을 병합해서 새로운 배열 데이터로 반환
console.log(numbers)//원본의 배열데이터 변하지않는다.
console.log(fruits)//원본의 배열데이터 변하지않는다.

//.forEach()

fruits.forEach(function (element, index, array) {
  console.log(element, index, array)
})
//Apple 0 ['Apple', 'Banana', 'Cherry']
//Banana 1 ['Apple', 'Banana', 'Cherry']
//Cherry 2 ['Apple', 'Banana', 'Cherry']
//반복적으로 실행 모든 인덱스를 순서대로 데이터 출려
//array element는 잘 사용하지 않는다. 
//매개변수 이름은 자유롭게 

//.map()
const a = fruits.forEach(function(fruit, index) {
  console.log(`${fruit}-${index}`)
})
// const a = fruits.forEach((fruit, index) => {
//   console.log(`${fruit}-${index}`)
// }) 화살표함수
``(백틱) 사용하면 보관을 이용하는 문자데이터
// Apple-0
// Banana-1
// Cherry-2

console.log(a)
//undefined .forEach메소드는 데이터를 반환하지않는다

const b = fruits.map(function(fruit, index) {
  return `${fruit}-${index}`
})
// forEAch와 차이점은 데이터로 새로운 배열을 반환한다.

console.log(b)//['Apple-0', 'Banana-1', 'Cherry-2']

const b = fruits.map(function(fruit, index) {
  return {
    id: index,
    name: fruit
  }
})
// const b = fruits.map((fruit, index) => (return {
//     id: index,
//     name: fruit
//   }))

console.log(b)
// [{},{},{}] 객체데이터를 요소로 갖는 배열을 반환
// {id: 0, name: 'Apple'}
// {id: 1, name: 'Banana'}
// {id: 2, name: 'Cherry'}
```
## 배열(2)
```js
const numbers = [1, 2, 3, 4]
const fruits = ['Apple', 'Banana', 'Cherry']


// .filter() 필터링 새로운 배열 데이터 반환
// 원본 배열은 수정이 되지 않는다.
const a =number.map(number => number < 3)
console.log(a)
//[true, true, false, false]

const b =number.filter(number => number < 3)
console.log(b)
//[1, 2]

console.log(numbers)// [1, 2, 3, 4]

//.find() 주어진 판별 함수를 만족하는 첫 번째 요소 값 반환 
//.findIndex() 찾은 요소의 인덱스 반환

const a = fruits.find(fruit => /^B/.test(fruit))
console.log(a)//Banana

const b = fruits.find(fruit => /^C/.test(fruit))
console.log(b)//2

//.includes() 해당 아이템이 배열에 들어있는지 확인
// true/false로 반환

const a = numbers.includes(3)
console.log(a)//true

const b = fruits.includes('HEROPY')
console.log(b)// false

----------------------------------------------------

const numbers = [1, 2, 3, 4]
const fruits = ['Apple', 'Banana', 'Cherry']

// .push() 배열 가장 뒤에 요소 삽입
// .unshift() 배열 가장 앞에 요소 삽입
// 원본 데이터가 수정됨
numbers.push(5)
console.log(numbers)// [1, 2, 3, 4, 5] 

numbers.unshift(0)
console.log(numbers)// [0, 1, 2, 3, 4, 5] 

----------------------------------------------------

const numbers = [1, 2, 3, 4]
const fruits = ['Apple', 'Banana', 'Cherry']

//.reverse() 배열의 순서를 뒤집는다
// 원본 데이터가 수정됨

numbers.reverse()
fruits.reverse()

console.log(numbers)//[4, 3, 2, 1]
console.log(fruits)//['Cherry', 'Banana', 'Apple']

----------------------------------------------------

const numbers = [1, 2, 3, 4]
const fruits = ['Apple', 'Banana', 'Cherry']

// .splice() 아이템을 지우고, 그자리에 채운다
// 원본 데이터가 수정됨

numbers.splice(2, 1)// 인덱스 2번에서 아이템 한개를 지워라
console.log(numbers)//[1, 2, 4]

numbers.splice(2, 2)// 인덱스 2번에서 아이템 두개를 지워라
console.log(numbers)//[1, 2]

numbers.splice(2, 0, 999)// 인덱스 2번에서 아이템을 0개 지우고 그자리에 999르 넣어라
console.log(numbers)//[1, 2, 999, 3, 4]

numbers.splice(2, 1, 99)// 인덱스 2번에서 아이템을 1개 지우고 그자리에 99르 넣어라
console.log(numbers)//[1, 2, 99, 4]

fruits.splice(2, 0, 'Orange')// 인덱스 2번에서 아이템을 0개 지우고 그자리에 'Orange'를 넣어라
console.log(numbers)//['Apple', 'Banana', 'Orange', 'Cherry']
```
## 객체 
object.prototype.---  
object.---정적(static) 메소드/  {}.---- 사용불가

```js
const userAge = {
  //key: value
  name: 'Heropy',
  age: 85
}
const userEmail = {
  name: 'Heropy',
  email: 'thesecon@gamil.com'
}

//.assign  prototype으로 만들어진 전역객체가 아니기 때문에 Object의 전역객체에 직접적을 사용 (정적메소드)
const target = Object.assign(userAge, userEmail)
console.log(target)
// {name: 'Heropy',
//   age: 85,
//   email: 'thesecon@gamil.com'}
console.log(userAge)
// {name: 'Heropy',
//   age: 85,
//   email: 'thesecon@gamil.com'}
console.log(target === userAge)//true
//값이 같다고  true가 아니고 같은 메모리 주소를 가르키기 때문에 true다.
// 객체는 메모리 주소를 가지고 사용 
//참조형 데이터(배열, 객체, 함수)
const a = {k: 123}
const b = {k: 123}
console.log(a === b)//false
//값은 같지만 메모리주소가 다르기때문에 false


const target = Object.assign({}, userAge, userEmail)
//새로운 객체에 userAge와 userEmail을 복사해서 삽입
console.log(target)
// {name: 'Heropy',
//   age: 85,
//   email: 'thesecon@gamil.com'}
console.log(userAge)
// {name: 'Heropy',
//   age: 85}
console.log(target === userAge)//false

----------------------------------------------------

const user = {
  name: 'Heropy',
  age: 85
  email: 'thesecon@gamil.com'
}

const keys = Object.keys(user)
//keys 키만 추출해서 배열로 만들어줌
console.log(keys)//['name', 'age', 'email']

console.log(user['email'])
//thesecon@gamil.com

const values = keys.map(key => user[key])
console.log(values)
//['Heropy', 85, 'thesecon@gamil.com']
```
## 구조 분해 할당

```js
const user = {
  name: 'Heropy',
  age: 85,
  email: 'thesecon@gamil.com',
  address: 'USA'
}

const {name/*: heropy*/, age, email, address = 'Korea'} = user
//name이름이 바꾸고 싶을때 바꿀 수 있다. 
//E.g user.address
//객체 데이터를 구조분해해서 원하는 속성만 꺼내서 사용
//const, let을 사용해서 변수로만들어 사용할수 있다.
//address 값이 없을때 기본값 Korea


console.log(`사용자의 이름은 ${name}입니다.`)
//사용자의 이름은 Heropy입니다.
console.log(`${name}의 나이는 ${age}세입니다.`)
//Heropy의 나이는 85세입니다.
console.log(`${name}의 이메일 주소는 ${email}입니다.`)
//Heropy의 이메일 주소는 thesecon@gamil.com입니다.
console.log(address)
//USA
//가져올 값이 없으면 undefined

const fruits = ['Apple', 'Banana', 'Cherry']
const [a, b, c, d] = fruits
console.log(a, b, c, d)
//Apple Banana Cherry undefined

const [, b] = fruits
console.log(b)
// 배열데이터는 순서대로 추출하기때문에 ,를 통해서 순서를 지정해준다. 
// [, , c] c를 추출하고 싶을때 
```
## 전개연산자
```js
const fruits = ['Apple', 'Banana', 'Cherry']
console.log(fruits)
//['Apple', 'Banana', 'Cherry'] 배열로 출력
console.log(...fruits)
//console.log('Apple', 'Banana', 'Cherry') 값이 같다
//Apple Banana Cherry 문자데이터 형태로 출력

function toObject(a, b, c) {
  return {
    a: a,
    b: b,
    c: c
  }
}
console.log(toObject(...fruits))
//console.log(toObject('Apple', 'Banana', 'Cherry'))
//console.log(toObject(fruits[0], fruits[1], fruits[2]))
// {a: 'Apple',
//  b: 'Banana',
//  c: 'Cherry'}

-----------------------------------------------------
const fruits = ['Apple', 'Banana', 'Cherry', 'Orange']

function toObject(a, b, ...c) {
  return {
    a: a,
    b: b,
    c: c
  }
}
// ...c rest parameter
console.log(toObject(...fruits))
// {a: 'Apple',
//  b: 'Banana',
//  c: Array(2)} c가 cherry orange를 다받아서 배열 데이터로 받음

const toObject = (a, b, ...c) => ({a, b, c})
//화살표 함수
//속성과 매개변수 이름이 같을 때 축약형을 만들 수 있다.
```
## 불변성
```js
//데이터 불변성

//원시 데이터: String, Number, Boolean, undefined,null
//--------------------------------------------------
//|1:          |2:          |3:           |4:
//--------------------------------------------------
let a = 1 //a -> 메모리1 => 1
let b = 4 //b -> 메모리2 => 4
console.log(a, b, a === b)
//1 4 false a와 b의 메모리 주소가 다름
b = a // b -> 메모리1 b는 메모리1을 가르키게됨
console.log(a, b, a === b)
//1 1 true 값도 같아지지만 메모리주소가 같기때문이다
a =7 // a -> 메모리3 = 7 a의 메모리주소는 3이다
console.log(a, b, a === b)
//7 1 flase 값/메모리 주소가 달라짐 
let c =1 // c -> 메모리1 
console.log(b, c, b === c)
//1 1 true b와 c 모두 메모리1을 가르킨다.

//원시데이터가 기존에 메모리 주소에 존재하면 새롭게 만드는 것이 아닌 기존에 메모리 주소를 가르키게 된다.

---------------------------------------------------
//참조형 데이터: Object, Array, Function
//--------------------------------------------------
//|1: {         }  |2: {         }  |3: {         }  
//--------------------------------------------------

let a = { k: 1} // 메모리1
let b = { k: 1} // 메모리2
console.log(a, b, a === b)//{ k: 1} { k: 1} false
// a 와 b의 메모리주소가 다르기 땜누에 false
// 원시데이터와 달리 새로운 값을 만들때마다 새로운 메모리 주소에 할당 된다.
a.k = 7 //메모리1에 k = 7 저장
b = a // b를 메모리1을 가르키게 함
console.log(a, b, a === b)//{ k: 7} { k: 7} true
a.k = 2 
console.log(a, b, a === b)//{ k: 2} { k: 2} true
// 메모리1의 데이터를 변경했을때 b도 같은 메모리르 가르키고 있기때문에 같이 변경된다.
let c = b // c도 메모리 1을 가르키게됨 
console.log(a, b, c, a === c)//{ k: 2} { k: 2} { k: 2} true
a.k = 9
console.log(a, b, c, a === c)//{ k: 9} { k: 9} { k: 9} true
//데이터를 복사하는 것이 아닌 메모리 주소를 공유하게되는 것임
```
## 얕은 복사와 깊은 복사
얕은 복사: 겉 표면만 복사  
깊은 복사: 내부의 모든 참조관계까지 새로운 메모리로 복사
```js
//--------------------------------------------------
//|1:          |2:          |3:           |4:
//--------------------------------------------------

const user  {
  name: 'Heropy',
  age: 85,
  emails: ['thesecon@gamil.com']
}
const copyUser = user
console.log(copyUser === user) //true
//같은 메모리 주소를 가르킨다

user. age = 22
console.logr('user', user)
//user
//{name: 'Heropy', age: 22, emails: Array(1)}
console.logr('copyUser', copyUser)
//copyUser (user와 같이 변경됨)
//{name: 'Heropy', age: 22, emails: Array(1)}

-------------------------------------------------
//얕은복사
//참조내 참조데이터가 없을때 사용 
const copyUser = Object.assign({}, user)
//user 복사에서 메모리2에 저장
const copyUser = {...user}//전개데이터


//깊은복사
user.emails.push('neo@zillinks.com')
console.log(user.emails === copyUser.emails)//true
//참조형 emails를 복사하지않았기 때문에 같은 메모리주소 데이터를 공유

lodash 사용
import _ from 'lodash'

const copyUser = _.cloneDeep(user)//lodash를 사용해서 깊은 복사
console.log(user.emails === copyUser.emails)//flase
```