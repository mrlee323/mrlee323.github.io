---
layout: post
title: "[HTML&CSS] css 속성"
data: '2021-12-03'
category: ['HTML&CSS']
---

## 너비

- width, height 요소의 가로/세로 너비 

  단위 px, em, vw

-  span의 가로/세로 너비는 콘텐츠의 크기만큼 자동으로 줄어듬

- div의 가로 너비는 최대한 늘리고 세로 너비는 최대한 줄어듬

- max-width, max-height 최대 너비 제한없음 

  단위 px, em, vw

- min-width, min-height 최소 너비 제한 없음 

## 단위

```css
px /픽셀
% /상대적백분율
em /요소의 글꼴 크기
rem /루트 요소(html)의 글꼴 크기
vw /뷰포트 가로 너비의 백분율
vh /뷰포트 세로 너비의 백분율
```

- em은 상대적인 크기 부모요소의 font size에 따라 달라짐

  자식요소가 width 20em 일때 부모요소  fontsize가 10pxdlaus 20em = 200px이다

- rem도 상대적인 크기인데 바로 위 부모가아닌 html을 기준으로 함

  부모의 fontsize가 10px이어도 html fontsiez가 16px이면 20rem 은 320px이다

- vw/vh 화면의 크기와 상관없이 비율을 따라 변동됨

margin 
===

- 요소의 외부 여백을 지정하는 단축 속성

- margin auto를 하면 너비가 있는 요소의 가운데 정렬이 됨

- 음수 사용가능/아이템이 겹침

- margin : top right bottom left;  
  margin : all;  
  margin : top/bottom left/right;  
  margin : top left/right bottom;

- margin-방향 : 개별속성

## padding

- 요소의 내부여백을 지정하는 단축 속성

- % 부모의 요소의 가로 너비에 대한 비율로 지정

- padding에 값을 가지면 요소의 크기가 커진다

- padding : top right bottom left;  
  padding : all;  
  padding : top/bottom left/right;  
  padding : top left/right bottom;

## border

- 요소의 테두리선을 지정하는 단축속성

- border: 선-두께 선-종류 선-색상;

- padding과 같이 요소의 크기가 커진다

- dafault border: medium none black;

- border-width :요소 테두리 선의 두께 

  border-width : top right bottom left;  
  border-width : all;  
  border-width : top/bottom left/right;  
  border-width : top left/right bottom;

- border-style : 요소 테두리 선의 종류

  <mark>none/solid/dashed/</mark>dotted/double

- border-color : 요소 테두리 선의 색상을 지정하는 단축 속성

  transparent/black/선의 색상

  border-color : top right bottom left;  
  border-color : all;  
  border-color : top/bottom left/right;  
  border-color : top left/right bottom;

  색상 이름 : red, tomato, royalblue  
  Hex 색상코드 : #000 #FFFFFF 16진수 색상  
  RGB : rgb(255, 255, 255) 빛의 삼원색  
  RGBA : rgba(0, 0, 0, 0.5) 빛의 삼원색 + 투명도

- border-방향 / border-방향-속성

  border-top: 두께 종류 색상  
  border-top-width: 두께  
  border-top-style: 종류  
  border-top-color: 색상

- borer-radius : 요소의 모소리르 둥글게

  border-radius : l/t r/t r/b l/b;  
  border-radius : all;  
  border-radius : l/t+r/b r/t+l/b;  
  border-radius : l/t r/t+l/b r/b;

## box-sizing

- 요소의 크기 계산 기준을 지정

  content 요소의 내용을 크기 계산  (box-sizing의 default값)
  border-box 요소의 내용 + padding + border 크기 계산

  box-sizing: border-box 커진 요소를 써도 요소 크기가 커지지 않게 적용

# overflow

- 요소의 크기 이상으로 내용이 넘쳤을때, 보여짐을 제어하는 단축 속성

  visible 넘친그대로   
  hidden 넘친내용 잘라서  
  scroll 넘친내용 잘라서 스크롤바생성  
  auto 넘린 내용이 있는 경우에만 자르고 스크롤바 생성

  overflow-x/ overflow-y 방향에 따라 개별 속성

## dispaly

- 요소의 화면 출력 특성

  block 상자요소/ inline 글자요소/ inline-block 글자+상자요소  
  flex 플렉스박스(1차원레이아웃)/ grid 그리드(2차원 레이아웃)  
  none 화면에서 사라짐


## opacity

-  default 1 불투명/ 수치가 작아질수록 투명도가 높아진다(0~1사이)

## font

- font-size/ font-weight/ font-style/ font-family/ line-height

- font-style: 글자의 기울기 

  nomal/ italic

- font-weight: 글자의 두께

  nomal,400/ bold,700/ bolder(부모요소보다)/ lighter(부모요소보다)/ 100~900

- font-size: 글자의 크기

  16px 기본 크기/ px, em, rem 단위로 지정

- line-height: 한 줄의 높이

  숫자(요소 글꼴크기의 배수로 지정)/ px, em, rem 단위로 지정

- font-family: 글꼴1, "글꼴2", ... 글꼴계열;

  글꼴계역 serif 바탕체/ <mark>sans-serif 고딕체</mark>/ monospace 고정너비글꼴

## text

- color/ text-decoration/ text-align

  color: 글자의 색상   
  text-align: 문자의 정렬방식(left/right/center/justify)  
  text-decolation: 문자의 장식(none/underline/overline/line-through)
  text-indent: 문자 첫줄의 (양수)들여쓰기/ (음수)내어쓰기

## background

  - background-color/ background-image/ background-size/ bakground-repeat

    background-color: 요소의 배경 색상  
    background-image:url("경로") 요소의 배경 이미지 삽입
    background-size: 이미지 크기  
    bakground-repeat: 바둑판식 반복 (no-repeat/repeat-x/repeat-y) 
    background-position: 이미지 위치 (방향/ 단위)
    background-size: 이미지크기 (단위/cover-가로에 맞추고/contain-세로에 맞추고)  
    background-attachment: 배경 이미지 스크롤 (scroll-요소랑 같이 스크롤/fixed-뷰포트 고정)

# position

- 요소의 위치 지정 기준

  static 기준없음/ relative 요소 자신을 기준/ absolute 위치상 부모요소를 기준/ fixed 뷰포트를 기준/ sticky 스크롤 영역 기준

- position: absolute를 적용하면 공중의 뜨면서 주변과의 상호작용이 무너진다.

  부모 요소의 속성이 position: relative가 있으면 부모요소기준으로 배치된다. 부모요소의 상위 요소에도 relative가 있어도 부모기준으로하며 부모요소가 static하면 그 상위요소에 배치된다. 그상위요소 조차 static이면 뷰포트 기준으로 배치된다. 

- position:fixed도 적용되면 공중의 뜨면서 주변과의 상호작용이 무너진다. 

- 요소 쌓임순서(stack order)  어떤 요소가 사용자와 더가깝게 있는지(위에) 결정

  1 position 속성의 값이 있는 경우 위에 쌓임  
  2 1번 조건이 같으면, z-index 높을수록  
  3 1,2조건이 같으면, html의 다음 구조일수록 

- z-index 부모요소와 동일한 쌓임 정도/ 숫자 높을수록 위에 쌓임

- position: absolute, fixed를 적용하면 display:block으로 바뀜


## flex

- display: flex를 사용하면수직 정렬이 수평으로 정렬로 바뀜

  display: flex가 사용된 요소는 flex container라고 하며 그 하위요소를 flex item이라고 함

- dispaly : flex container의 화면출력 특성

  flex 블록요소와 같이 flex container정의  
  inline-flex 인라인요소와 같이 felx container 정의

  flex-container가 flex는 수직, inline-flex는 수평정렬

- flex-direction 주축을 설정 

  row 행 (좌->우)/ row-reverse 행 (우->좌)  /수평
  column / column reverse  /수직

  row 주축 main-axis 수평/ 교차 축 cross-axis 수직

- flex-wrap : flex items 묶음(줄 바꿈) 여부

  nowrap 묶음없음/ warp 여러 줄바꿈

- justify-content : 주 축의 정렬 방법

  flex-start 왼쪽/ flex-end 오른쪽/ center 중앙 정렬 

- align-content : 교차 축의 여러 줄 정렬 방법 (수직)

  stretch (교차 축으로 늘림)/ flex-start/ flex-end/ center

- align-items : 교차 축의 한 줄 정렬 방법 

  stretch 시작점/ flex-start/ flex-end/ center/ baseline

### flex-item의 속성

- order : flex item의 순서

  숫자가 작을 수록 먼저

- flex-grow : flex item의 증가 너비 비율

  0 default 숫자 증가비율

- flex-shrink : flex item의 감소 너비 비율

  1 default 숫자 감소비율/ 0 감소 사용안함

- flex-basis : flex item의 공간 배분전 기본 너비

  기본너비 없이 배분하고싶으면 flex-basis: 0;

## transition

- transition : 속성명 `지속시간` 타이밍함수 대기시간;

  요소의 전화(시작과끝) 효과를 지정하는 단축 속성

  transition-property/ transition-duration/ transition-timing-function/ transition-delay

- transition-property 전환 효과를 사용할 속성 이를을 지정

- transition-duration 전환 효과의 지속시간을 지정

  효과를 각각 줄수 있음

```css
  div {
    trnasition :
      width .5s,
      backgroun-dolor 2s;
  }
```
- transition-timing-funtion 전환효과의 타이밍 함수를 지정

  ease 느리게 빠르게 느리게/ linear 일정하게  
  ease-in 느리게 빠르게/ ease-out 빠르게 느리게/ ease-in-out 느리게 빠르게 느리게

- transition-delay 전환효과가 몇 초 뒤에 시작할지 대기시간을 지정

## transform

- transform: 변환함수1 변환함수2 변환함수 3...;  
  transform: 원근법 이동 크기 회전 기울임;

- 2D 변환 함수

  translate(x,y), translateX(x), translateY(y) /scale(x,y) -px
  rotate(degree)/skewX(x)/skewY(y) - deg

- 3D 변환 함수

  perspective(n) 원근법(거리) - px
  rotateX(x) x축회전/ rotateY(y) y축회전 - deg

- perspective: 600px; 속성 관찬대상의 부모 perspective-origin  (부모요소)
  transform: perspective(600px); 함수 관찰 대상 transform-origin 

- backface-visibility 3D 변환으로 회전된 요소의 뒷면 숨김 여부

  visible/ hidden