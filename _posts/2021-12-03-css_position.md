---
layout: post
title: "[HTML&CSS] css position"
data: '2021-12-03'
category: ['HTML&CSS']

---

## float와 position
- float과 같이 독립된 층으로 갖게 되는데, floatsms 기본 flow층과 관계가 있는 반면 position층은 나머지층과 전혀 상호작용을 하지 않는 완전 독립된 층이다. 내가 위치하고 싶은곳에 정확히 배치할수 있도록 해준다.

## position 속성
- position에는 4가지 속성이 있다.
```css
  position:absolute;
  position:relative;
  position:fixed;
  position:static;
  ```
- absolute는 지정된 상위요소 기준으로 절대독립적 배치  
  relative는 기본 flow에서 자신을 기준으로 절대독립적 배치  
  fixed는 뷰포트 기준의 절대독립적 배치  
  static는 default

## absolute
- absolute는 절대독립적이 배치지만 배치 기준에 있어 상대적 조건을 갖는다. 기준이 없이 배치를 했을 때 기준을 찾다가 없으면 html 기준으로 배치를 하게된다.

- 만약 header 오른쪽 상단에 위치하고 싶다고 했을 경우, header에 positon:relative로 기준을 주고 배치하고 싶은 요소에 absolute를 주고 right와 top값을 주면 원하는 위치에 배치할 수 있다. 

- 이처럼 absolute는 relative로 기준을 정해주면 그 기준에 맞춰 배치한다. relatavie뿐만아니라 fixed나 absolute자체도 기준이 될수 있다. absolute가된 요소를 기준으로 다른 요소를 absolute적용해 배치할 수 있따.

## relative
- relative는 보통 absolute의 기준요소가 필요할때 사용하지만, 자기자신을 기준으로 자기자신도 절대적배치를 할수 있다. 

- relative는 자기자신이 기준이되어 배치할 수 있지만, absolute와 다른점이 있다. absolute를 하면 absolute한 요소는 position층으로 가면서 기본 flow와 상호관계가 없어지면서 절대적 배치를 할 수 있다. absolue로 인해 flow층에서 없어지기 때문에 요소들의 배치가 무너지기도 한다. 하지만 relative는 position층으로 간다고 해서 flow층이 무너지지않는다. 본인의 자리를 기준으로 배치가 되기때문에 flow층에 자리를 두고 position에서 위치만 이동이 된다. 

## fixed 
- fixed는 뷰포트를 기준으로 배치가 되기 때문에 내가 스크롤로 페이지를 이동해도 fixed된 요소는 내가 보는 화면 위치에서 움직이지 않는다.

## position으로 인한 변화
- position도 float와 마찬가지로 position 층으로 이동하면서 width/height 값을 지정하지않으면 0되어 너비가 없어지며, 인라인박스가 블록박스가 된다. 이에 예외가 있다면 relative는 기본flow층에 영향을 주지 않고 움직이기 때문에 너비가 줄지도 인라인이 블록으로 바뀌지 않는다. 

## position의 offset
- top, left, right, bottom 으로 기준으로부터의 위치를 지정할 수 있으며, position된 요소가 부피가 없을때 offset에 0값을 주면 부모였던 요소의 부피와 같아진다. 

## z-index
- positio으로 절대적 배치를 하면 요소들이 겹치게되는 경우가 생긴다.이 때 우선순위는 마그업된 순서로 배치되는데 내가 원하는 순서로 배치하고 싶으면 z-index를 사용하면 된다. z-index는 값이 작을 수록 우선순위가 높아진다. 하지만 부모/자식간의 관계가 z-index에 영향을 주므로 관계를 고려해서 z-index를 사용해야 한다.