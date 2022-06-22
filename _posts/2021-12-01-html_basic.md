---
layout: post
title: "[HTML&CSS] HTML 정리"
data: '2021-12-01'
category: ['HTML&CSS']

---

## HTML 부모와 자식 관계

- 요소안에 요소의 관계를 내부에 있는 요소는 자식이고 감싸고있는 요소가 부모요소

- 자식요소는 들여쓰기로 통해 구분하고 코딩을 할 때 다른사람이 코드를 볼 때에도 보기 편하게 정리

- 감싸고있는 요소는 자식요소 포함 하위요소라고 표현/나를 감싸고 있느 요소는 부모요소 포함 상위요소라고 표현

## 빈태그 

- 빈태그 : 닫히는 태그가 없는 태그 

- <tag> 편리함 vs <tag/> 안전함 

- 태그 기능확장 <태그 속성 = "값">내용</태그> 빈태그에서는 대표적으로 img, input이 있음


## 인라인과 블록

- 인라인요소: 글자를 만들기위한 요소

  요소가 수평으로 쌓임

  줄바꿈 처리가 띄어쓰기로 인식 

  가로/세로 사이즈를 가질수 없음

  위아래 margin/padding 모두 적용안됨 좌우만 가능 

  인라인안에 블록요소가 들어갈수 없음/ 인라인안에 인라인은 가능

- 블록요소: 상자를 만들기위한 요소

  요소가 수직으로 쌓임

  가로/세로 너비 지정 가능

  margin/padding 모두 적용 가능 

  블록안에 블록 가능/ 블록안에 인라인도 가능

## html 핵심요소

- div [block] 특별한 의미가 없는 구분을 위한 요소

- h1 [block] 제목을 의미하는 요소

  h1 ~ h6 숫자가 작을수록 더 중요한 제목 

- p [blcok] 문장을 의미하는 요소

- img [inline] 이미지 삽입하는 요소

  <img src="" alt=""> alt 이미지가 화면에 출력이 안되었을때 표시 -필수속성

- ul [blcok] 순서가없는 목록/ ol [block] 순서가 있는 목록

  li [blcok] 목록 내 항목/ ul안에 생성하는 요소로 ul과 li는 세트

- a [inline] 하이퍼링크를 지정하는 요소 

  href의 속성을 통해 이동 경로 지정

  target 속성 사용시 _blank 값을 넣으면 새탭에 표시

- span [inline] 특별한 의미가 없는 구분을 위한 요소


- br [inline] 줄바꿈

- input [inline-block] 사용자가 데이터 입력하는 요소

  type속성을 통해 입력받을 데이터의 타입을 지정 (text, checkbox, radiobox..)

  value속성은 타입이 text일때 미리 입력된 값

  placeholder속성은 입력할 값의 힌트 

  disabled속성은 입력 요소 비활성화 

  checkbox는 checked가 붙어있는 input 요소는 체크되어있는 상태로 표시

  radio는 name속성에 같은 이름을 지정해서 그룹으로 묶으면 하나의 요소에만 선택 가능

- label [inline] input이 checkbox일때 글자를 선택해도 체크가됨

- table [blcok] 표

  tr 행(row)

  td 열(column) table data 셀


## 태그 속성

- title 요소의 정보나 설명을 지정

- style 요소에 적용할 스타일 지정

- class 요소를 지칭하는 중복가능 이름

- id 요소를 지칭하는 고유한 이름

- data요소 data-이름 ="데이터" 문자데이터 텍스트 요소에 데이터를 지정