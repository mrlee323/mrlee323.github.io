---
layout: post
title: "[HTML&CSS] CSS 선택자"
data: '2021-12-01'
category: ['HTML&CSS']

---

## 기본선택자

- (*) 전체 선택자 : 모든요소 선택

- tag 태그선택자 : 태그이름의 요소 선택

- .class 클래스선택자 : class이름의 요소선택

- #id 아이디선택자 : id이름의 요소 선택 

## 복합선택자

- avcxyz 일치선택자 : abc와 xyz 동시만족하는 요소 선택 ex) span.orange

- abc > xyz 자식선택자 : abc의 자식요소 xyz 선택 ex) ul > .orange

- abc xyz 하위선택자 : abc의 하위 요소 xyz 선택. 띄어쓰기가 선택자의 기호 ex) div .orange

- abc + xyz 인접형제선택자 : abc 다음 형제 요소 xyz하나를 선택 ex) .orange + li

- abc ~ xyz 일반형제선택자 : abc의 다음형제요소 xyz 모두 선택 ex) .orange ~ li

## 가상클래스 선택자

- abc:hover : 요소에 마우스 커서가 올라가 있는 동안 선택

- abc:active : 마우스를 클릭하고 있는 동안 선택

- abc:focus : 포커스(활성화)가되면 선택 주로 input요소 

  taindex 속성은 focus가 될 수 있는 요소로 만듦 ex) tagindex="-1

- abc:first-child : abc가 형제 요소중 첫째라면 선택 ex).fruits span:first-child

- abc:last-child : abc가 형제 요소중 막내라면 선택 

- abc:nth-childe(n) : abc가 형제 요소 중 (n)째라면 선택 

  ex) .fruits *:nth-child(2)->2대신 2n을 쓰면 짝수선택/ 2n+1은 홀수/ n+2는 2부터시작 / n+3은 3부터시작
  
- abc:not(xyz) : xyz가아닌 abc 요소 선택 ex).fruits *:not(span)

## 가상요소 선택자

- abc::before : abc요소의 내부 앞에 내용을 삽입 ex) .box::befor {content: "";}

- abc::after : abc요소의 내부 뒤에 내용을 삽입 ex) .box::after {content: "";}

  before/after 요소는 inline 요소 

## 속성 선택자

- [abc] : 속성 abc를 포함한 요소 선택 ex) [disabled] {}

- [abc="xyz] : 속성 abc를 포함하고 값이 xyz인 요소선택 ex[type="text]

## 스타일 상속

- 부모 요소에 style을 적용했을때 하위 요소에 style이 상속되어 적용됨

- inherit : 강제상속/ 자식요소에 inherit을 입력하면 부모요소 속성을 강제적으로 상속됨

## 선택자 우선순위

- 1순위 style 속성 안 !important (중요도)

- 다음 순위는 순서대로 인라인선언 > id 선택자 > class 선택자 > 태그선택자 > 전체선택자 > 상속

- 순위가 같은 선택자는 더 나중에 작성된 선택자가 우선