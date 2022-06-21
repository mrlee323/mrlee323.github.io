---
layout: post
title: "[Firebase] Firebase database"
data: '2021-12-02'
category: [Firebase]
---

## database 만들기
-  왼쪽 사이드바에서 database로 들어가 데이터베이스 만들기
    
    프로덕션모드 선택

    위치선택시 asia-east2를 선택(가까운곳을 선택하면 로드 시간이 적음)

- 문서이동으로 가서 cloud firestore으로 들어가서 cloud firestore 시작하기 클릭


## cloud firestore 시작하기

- 개발환경 설정 웹버전8 firebase 및 cloud firestore 라이브러리를 앱에 추가

- database 안 규칙에서 사용자 권한 및 데이터 구조를 정의 할수 있음

    기본 코드에 true 입력후 게시

- 데이터에서 컬렉션 시작을 누른 후 해당 사이트에 들어가 data를 입력

    컬렉션 시작할때 컬렉션 이름은 data가 담겨있는 변수이름과 같아야함

- 데이터 연결된 변수명(이하 my_info)에 null 입력 (ex)var 변수명 = null; 기존 연결된 변수에는 새로운 변수명으로 수정


## 데이터 읽어오기

- html script에 var db = firebase.firesotre(); 입력

- js파일에는 function loadInfo () {}; 새로운 함수 생성

  시작시 실행되는 함수(init)에 loadInfo(); 입력

- loadInfo함수에 입력 (웹 버전 8사용)
  
  collection my_info data를 get(전부)가져와서 querySnapshot 안에 doc 안에 doc.data()를 my_info로 지정 

  doc.id는 firestore 컬렉션에 my_info안에 있는 문서를 의미

  doc.id를 my_info안에 docID와 연결

```js
    db.collection("my_info").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        my_info = doc.data();

        //서버에서 받아온 doc.id를 나의 my_info에 docID이름으로 연결
        my_info.docID = doc.id

        // 정보 연결 삽입하는 함수
        showInfo(); 
      });
    });
```
  

  <a href="https://firebase.google.com/docs/firestore/quickstart?authuser=0#web-version-8_1" target="_blank">https://firebase.google.com/docs/firestore/quickstart?authuser=0#web-version-8_1</a>

## 데이터 수정하기

- 사이트에서 수정한 내용을 서버로 보내기

- updateInfoDB로 함수생성(서버에 데이터 업데이트)

  updateInfo함수(data를 변경하고 확인완료데이터삽입하는 함수)에 데이터삽입하는 함수 삭제 후 updataInfoDB();를 입력

  firestore collectiondp my_info 문서에 my_info.docID(doc.id) 선택 update

  collection안 필드와 사이트 필드와 연결

  loadInfo()함수 실행을 통해 서버에서 데이터를 받아서 다시 데이터 삽입 실행


```js
function updateInfoDB () {
  db.collection("my_info").doc(my_info.docId).update({
    introduction: my_info.introduction,
    as: my_info.as,
    interest: my_info.interest
  }).then(function () {
    
    loadInfo();
  })
}
```

<a href="https://firebase.google.com/docs/firestore/quickstart?authuser=0#web-version-8_1" target="_blank">https://firebase.google.com/docs/firestore/quickstart?authuser=0#web-version-8_1</a>




  
  




