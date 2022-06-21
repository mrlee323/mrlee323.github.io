---
layout: post
title: "[HTML&CSS] SCSS"
data: '2021-12-27'
category: ['HTML&CSS']

---

scss와 sass는 거의 동일하지만 {}이나 ;에서 차이가 있다. scss를 사용하는 주된 목적은 css에서 중복되는 선택자에서 중첩기능을 제공하고, 특정색상에 변수의이름으로 대입해서 사용할 수 있다. 

## 프로젝트 생성
npm init -y를 통해 프로젝트를 시작하고 parcel-bundler를 개발용으로 설치한다. scss를 작성하면 parcel-bundler가 필요한 모듈인 sass 설치하고 css 변환을 해준다. 이때 변환된 파일은 dist폴더안에 저장되어있다. 

## scss 주석

/* \*/ 와 // 모두 사용가능하다.하지만 css 컴팡리 됐을때 /* */는 주석으로 표현되어 나타나지만 //는 아예없는 나타나지않는다. 

## 중첩

선택자의 중복이 발생할때 중첩기능을 통해 css에서 선택자를 일일히 작성하는 것보다 편리하게 사용할 수 있다.

```scss
.container{
  > ul{// >기호를 통해 css 똑같이 자식선택자를 표시할수 있다.
    li{
      font-size: 40px;
      .name{ 
        color:royalblue;
      }
      .age{
        color: orange;
      }
    }
  }
}
```
```css
.container > ul li {
  font-size: 40px;
}
.container > ul li .name {
  color: royalblue;
}
.container > ul li .age {
  color: orange;
}

```
## 상위 선택자 참조
```scss
.btn{
  position: absolute;
  &.active{
    color:red;
  }
}

.list{
  li{
    &:last-child{ //자신이 포함된 상위 선택자 참조
    //or  &기호가 상위선택자로 치환이 된다.
      margin-right: 0;
    }
  }
}

.fs{
  &-small {ont-size: 12px;}// css에서 .fs-small과 같은 선택자이다.
  &-mediun {font-size: 14px;}
  &-large {font-size: 16px;}
}
```
## 중첩된 속성
네임스페이스 : 이름을 통해 구분 가능한 범위를 만들어내는 것으로 일종의 유효범위를 지정한느 방법을 말한다.
```scss
.box {
  font: { 
    weight: bold;
    size: 10px;
    family: sans-serif;
  };
  margin: {
    top: 10px;
    left: 20px;
  };
  padding: {
    top: 10px;
    bottom: 40px;
    left: 20px;
    right: 30px;
  };
}
```
## 변수
```scss
.container{
  $size: 200px; //$을 사용하여 변수를 만들수 있다.
  position:fixed;
  top: $size;//200px
  .item{
    $size: 100px;//변수의 값을 재할당할수 있다. 
    width: $size;//100px
    height: $size;//100px
    transform: translateX($size);
  }
  left: $size;// 재할당된 범위 밖이지만 size의 변수의 값이 변한 상태이므로 이후 size의 값은 변한 값으로 적용된다.
}
 .box{
   width: $size;//error
   // 변수는 {}안에 범위를 갖으므로 범위 밖에서 할당했을때 에러가 발생한다.
 }
```
## 산술 연산
```scss
div{
  width: 20px + 20px; //40px
  height: 40px - 10px; //30px
  font-size: 10px * 2; //20px
  margin: 30px / 2; // 30px/2
 // margin: (30px / 2);  15px;
 // margin: &size / 2; 
 // margin: (10px + 12px) / 2;  11px;
  padding: 20px % 7; //6px
}
//산술 단위가 같아야 한다.
//calc(100% -200px); 로표기하면 css 에 그대로 표기되어 css에서 계산되어 화면에 구현된다.

span{
  font-size: 10px;
  line-height: 10px;
  font-family: serif;
  font: 10px / 10px serif;
  // /연산이 되지 않는 이유는 font와 같이 단축속성을 사용할 때 /을 사용하기 때문이다. 
}
```
## 재활용
```scss
@mixin center {//@mixin을 이용하여 공통속성을 묶어서 필요한 요소에 @include로 사용할 수 있다.
  display: flex;
  justify-content: center;
  align-items: center;
}
.container{
  @include center;
  .item{
    @include center;
  }
}
.box{
  @include center;
}
----------------------------------------------
@mixin box($size: 100px, $color: tomato){
  width: $size;
  height: $size;
  background-color: $color;
}//공통 속성에서 요소마다 다른 수치를 사용하고 싶을때는 매개변수로 필요에 의해  수치를 바꿀수 있으며 기본값을 지정하여 사용할 수 있다. 
.container{
  @include box(200px, red);
  .item {
    @include box($color:green);//키워드 인수
    //인수는 순서대로 대입되기때문에 앞 매개변수는 기본값을 사용하고 뒤에 색상만 변경하고 싶으면 키워드인수를 사용하여 색상만 적용할 수 있다.
  }
}
.box{
  @include box(100px);
}
```
## 반복문
```scss
@for $i from 1 through 10 {// i변수 1 부터 10 반복
  .box:nth-child(#{$i}){//#{}를 사용하여 데이터 보관
    width: 100px * $i; // 100 *1 부터 100 * 10 까지
  }
}
```
##  함수
```scss
@mixin center {//@mixin css 스타일 다루기
  display: flex;
  justify-content: center;
  align-items: center;
}

@function ratio($size, $ratio){//@function 일반적이 값을 처리
  @return $size * $ratio
}

.box{
  $width: 160px;
  width: $width;
  height: ratio($width, 9/16);//90px; youtube 비율 16/9
  @include center;
}
```
## 색상내장 함수
```scss
.box{
  $color: royalblue;
  width: 200px;
  height: 100px;
  margin: 20px;
  border-radius: 10px;
  background-color: $color;
  &:hover {
    background-color: darken($color, 10%);// royalblue색상이 10%더 어두워진다.
    //button에 유용하게 사용
  }
  &.built-in{
    background-color: mix($color, red);// royalblue와 red 색상 mix
    background-color: lighten($color, 10%);// royalblue색상이 10%더 밝아진다.
    background-color: saturate($color, 40%);// royalblue색상이 40% 채도가 더 높아진다.
    background-color: desaturate($color, 40%);// royalblue색상이 40% 채도가 더 낮춰진다.
    background-color: garyscale($color);// royalblue색상을 그레이로
    background-color: invert($color);// royalblue색상을 반전
    background-color: rgba($color, .5);// royalblue색상을 50% 반투명
  }
}
```
## 가져오기
```scss
<main>
@import "./sub", "./sub2";
// main scss에 다른 scss를 가져온다. 쉼표를 통해서 여러개를 가져올수있다. css와 달리 url표시없이 해도 에러가 발생하지 않는다.

$color: royalblue;

.container {
  h1{
    color: $color;
  }
}

<sub>
body{
  .container{
    background-color: orange;
  }
}
<sub2>
body{
  background-color: royalblue;
}
```
## 데이터 종류 & 반복문 @each
```scss
$number: 1; //.5, 100px, 1em
$string: bold; //relative, "../images/a.png"
$color: red; // blue, #ffffff, rgba(0,0,0,0.1)
$bollean: true; //false
$null: null; //null
$list: orange, royalblue, yellow;
$map: (
  o: orange,
  r: royalblue,
  y: yellow
);
@each $c in $list {//@each 키워드를 통해서 list에 있는 데이터들을 반복적으로 c라는 변수에 담아서 {}사이에서 처리
  .box{
    color: $c;
  }
}
//.box{color:orange;}
//.box{color:royalblue;}
//.box{color:yellow;}
@each $key, $value in $map {
  .box-#{$key}{
    color: $value;
  }
}
//.box-o {color: orange;}
//.box-r {color: royalblue;}
//.box-y {color: yellow;}

```
## 재활용 @content
```scss
@mixin left-top{
  position: absolute;
  top: 0;
  left: 0;
  @content;
}
.container{
  width: 100px;
  height: 100px;
  @include left-top;
}
.box{
  width: 200px;
  height: 300px;
  @include left-top {
    bottom: 0;// include 안에 새로운 속성을 적용하면
    //@mixin 안에 @content에 들어간다.
    right: 0;
    margin: auto;
  }
}
```
 