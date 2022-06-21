---
layout: post
title: "[Firebase] Firebase Sort & Filter 적용"
data: '2021-12-02'
category: [Firebase]
---
## firebase Sort & Filter 적용

- 서버에서 필터링을 받아오기위해 내가 설정한 필터 기능 삭제
  
  var filtered = photos; 서버에서 필터를 받기위해 새로 입력

## 서버에서 정렬가져오기

- .orderBy("name", "desc")

  이 코드를 loadPhotos 함수 안 db.collection("photos")뒤에 삽입 

  loadPhotos  함수로 서버에 데이터를 사이트로 불러올때 정렬

 <a href=" https://firebase.google.com/docs/firestore/query-data/order-limit-data?authuser=0#web-version-8" target="_blank"> https://firebase.google.com/docs/firestore/query-data/order-limit-data?authuser=0#web-version-8</a>

## 서버에서 필터가져오기

- .where("population", ">", 100000)

  이 코드도 정렬과 같은 위치에 삽입 

## firebase에서 정렬과 필터를 동시사용시 제한사항
```js
  citiesRef.where("population", ">", 100000).orderBy("country");
```
  (2021/11/30) 현재 firebase에서는 위와 같은 orderBy사용을 제한

  where와 orderby를 같이 사용할때에는 동일한 필드 범위를 사용해야함을 명시

  위 코드에서 population에 대한 필터를 사용하였으므로, orderby역시 population에 대한 정렬을 사용 

## 서버에 필터 적용하기 


- var filterName = 'all'; 입력

  filterName은 현재 선택된 필터를 적용

- getFilterParams 함수 생성

  함수안에 각 필터의 값을 바로 적지 않고 함수로 만든것은 페이지가 실행될때 로드 순서로인한 문제를 해결하기 위함이다

  함수로 만들지 않고 바로 값을 적으면 로드 순서로 인해 앞에 함수가 실행되기전 이미 값이 정해져 버리기때문이다

```js
  var getFilterParams = {
    all: function () { return ['idx', '>', 0] },
    mine: function () { return ['user_id', '==', my_info.id] },
    like: function () { return ['idx', 'in', my_info.like] },
    follow: function () { return ['user_id', 'in', my_info.follow] }
  }
```
- 필터함수를 loadPhotos함수에 삽입

  여기서 `getFilterParams[filterName]()[0]`의 의미는 현재 filterName이 all로 되어있으므로 getFilterParams에 all의 함수를 실행하는데 배열에 [0]을 가져옴 그러므로 all의 [0]은 idx임 

  필터의 코드에 맞게 적용하는 각 값을 불러옴 

  결국 아래의 코드는 .where('idx', '>', 0)과 같음 

```js
  .where(
    getFilterParams[filterName]()[0],
    getFilterParams[filterName]()[1],
    getFilterParams[filterName]()[2]
  )
```
- setFilter 함수에 filter 적용 부분을 filterNam = _filter;로 수정하고 laodPhotos함수를 삽입

- 로드 순서는 다음과 같다

  처음 페이지 로드시 init함수 실행

  init함수 안에 loadPhotos 함수 실행

  loadPhotos함수가 실행되면서 db의 photos 정보를 필터해서 가져옴 

    - 이때 getFilterParams 함수가 실행되고 filterName = all로 지정되어있으므로 전체사진보기로 필터 실행됨

    - 처음에 filterName이 all이 아닌 다른 필터로 지정되면, 로드 순서때문에 적용되지않고 빈페이지로 실행됨

  loadPhotos안 showPhotos함수로 화면에 데이터 표시

  __중요 코딩을 할때에는 로드순서를 생각하고 코딩을 해야함__