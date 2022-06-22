---
layout: post
title: "[Firebase] Firebase stoage"
data: '2021-12-02'
category: [Firebase]
---

- 내가가진 파일을 서버로 보내기

## firebase storage 시작/설정

- html script에 주소 입력하여 연결
```html
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
```

- html script에 `var storage = firebase.storage();` 입력

- Rules로 가서 규칙에 `allow read, write: if true;`로 고쳐준다 

- uploadFile 함수를 생성

  여기까지가 storage에 파일을 올리는 함수 데이터베이스에 저장된것은 아님

  file은 input에 파일을 선택했을때에 그 첫번째 파일을 말함 files[0]

  ref는 storage에 file.name 

  put file을 저장

```js
function uploadFile () {
  var file = document.querySelector("input[type=file]").files[0];
  var ref = storage.ref().child(file.name);

  ref.put(file).then(function(snapshot) {
    
    //해당파일에 url 받아오는 함수
    snapshot.ref.getDownloadURL().then(function (url) {
      console.log(url);
  })
}
```

  




