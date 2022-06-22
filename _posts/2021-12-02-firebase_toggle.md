---
layout: post
title: "[Firebase] Firebase 토글을 사용하여 데이터 적용"
data: '2021-12-02'
category: [Firebase]
---

## 토글로 좋아요 기능 만들기

- toggleLikeOnDB 함수 생성

- toggleLike 함수에서 like 증감연산자 뒤에 toggleLikeOnDB(photos[i])추가

  like가 변경뒤 그 변경된 해당 사진의 정보를 toggleLikeOnDB로 보냄

- toggleLikeOnDB함수 

  db에 like 변경사항을 update

  db에 컬렉션 my_info안에 doc.id에 like를 업데이트

  then(function () {}) 은 로드지연로 인해 완료되지 않고 다음 함수 넘어가는것을 방지하고자 해당 함수가 완료되면 다음을 진행하라는 함수

  db에 컬렉션 photos에 해당.idx를 찾아 likes를 db likes에 반영 하고 다시 loadPhotos(서버데이터 사이트반영)함수 실행

```js
  function toggleLikeOnDB (photo) {
    db.collection("my_info").doc(my_info.docId).update({
      like: my_info.like
    }).then(function () {
      db.collection("photos").doc(String(photo.idx)).update({
        likes: photo.likes
      }).then(function () {
        loadPhotos();
      });
    });
  }
```

## 토글로 팔로우 기능 만들기

- 우선 팔로우를 페이지 안에 표시 

- showPhotos함수 안에 추가

  my_info follow에 각 해당 user_id가 있으면 span을 만들어 FOLLOW를 입력하고 span을 .author에 삽입
```js
  if (my_info.follow.indexOf(photo.user_id) > -1) {
    var followSpan = document.createElement("span");
    followSpan.innerHTML = "FOLLOW"

    photoNode.querySelector(".author").append(followSpan);
  }
```
- .author에 user_id와 follow 구분되게 css 변경

- user_id를 눌렀을때 follow의 유/무가 변경되게 함수생성

  toggleFollow 함수 생성

- showPhotos에 이벤트 생성

  photoNode(article.hidden의 자식까지 포함 전체)에서 .author를 click하면 toggleFollow함수에 photo.user_id매개변수로 실행

```js
  photoNode.querySelector(".author").addEventListener(
  "click", function () { toggleFollow(photo.user_id) }
```
- toggleFollow 함수

  매개변수로 user_id를 받아서 해당 user_id가 나의 follow에 없으면 추가하고 있으면 filter를 통해 해당 user_id를 나의 follow에서 삭제

  이미 follow가 되어있는 상태에서 user_id를 클릭하면 follow 취소가 되므로 my_info follow에서 해당 user_id를 삭제

  변경사항을 db 컬렉션 my_info에 doc.id에 follow를 반영하고 loadPhotos를 통해 서버에데이터를 다시 사이트로 반영 

```js
  function toggleFollow (user_id) {
    if (my_info.follow.indexOf(user_id) === -1) {
      my_info.follow.push(user_id);
    } else {
      my_info.follow = my_info.follow.filter(
        function (it) { return it !== user_id; }
      );
    }
    db.collection("my_info").doc(my_info.docId).update({
      follow: my_info.follow
    }).then(function () {
      loadPhotos();
    });
  }
```
