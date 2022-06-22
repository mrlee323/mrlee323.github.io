---
layout: post
title: "[Firebase] Firebase update"
data: '2021-12-02'
category: [Firebase]
---

## firestore에 업로드

- var photos = []; 변경 

  photos는 사진 정보가 담겨있는 배열

- uploadPhotoInfo (url) {} 생성 
 
  사진정보 올리는 함수

- uploadFile함수(storage에 올리고 url생성 함수)에 uploadPhotoInfo (url)입력 

  파일을 업로드하고 업로드시 생긴 url을 받아서 실행

- var photoInfo 안에 사진정보 객체로 생성

  __중요__ 각 정보에는 고유 넘버가 필요 idx: Date.now()을 사용함. 

  likes: Math.round(Math.random()*10) 1~9까지 랜덤

- 파이어베이스에 저장하기 (db에 저장)

  데이터베이스 안에 컬렉션 photos 안에 doc photoInfo.idx 안에 photoInfo를 set

  컬렉션 photos가 없을때 photos가 생성됨

  doc의 명명 타입이 string이어서 string으로 변환

  photoInfo에서 고유넘버로 지정한 id가 doc의 문서명이 됨

  .catch는 상황이 문제가있을때 사용 

```js
function uploadPhotoInfo (url) {
  // ...
  db.collection("photos").doc(String(photoInfo.id)).set(photoInfo)
  .then(function () {
    console.log("Success!");
  })
  .catch(function (error) {
    console.error("Error!", error);
  });
}
```

## 업로드한 사진정보 받기

- loadPhotos 함수 생성 

- init함수(처음로드시 실행되는 함수)에 추가

- showphotos함수 url 수정

   처음 연결한 이미지 url을 로컬주소의 url로 다른 컴퓨에서는 존재하지 않으므로 모두가 볼 수 있게 서버에 저장된 url주소로 연결

```js
  "url('" + photo.url + "')";
```
- loadPhotos 함수로 사진 불러오기

  데이터베이스에 photos 컬렉션의 데이터 전부를 가져와서 querySnapshot 안에 doc안에 doc.data를 photosArray에 추가

  photosArray배열을 photo의 데이터를 담는 photos로 지정

  showPhotos(); 새로운사진을 불러서 실행

```js
  function loadPhotos () {
    db.collection("photos").get().then(function (querySnapshot) {
      var photosArray = []
      querySnapshot.forEach(function (doc) {
        photosArray.push(doc.data())
      })
      photos = photosArray;
      showPhotos();
    });
  }
```

## 업로드 하고 갤러리에 표시하기

- 업로드 후 갤러리로 페이지로 이동하면서 새로운 사진이 화면에 표시

- uplaodPhotoInfo 함수에 코드 추가

   db에 photo의 정보를 set하면 setMenu()로 메인페이지 이동하고 loadPhotos()로 새로운정보를 가져옴

```js
  setMenu('gallery');
  loadPhotos();
```