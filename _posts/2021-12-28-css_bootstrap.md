---
layout: post
title: "[HTML&CSS] 부투스트랩"
data: '2021-12-28'
category: ['HTML&CSS']

---

## 부트스트랩 연결하기

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
```
위 코드를 head 안에 붙여준다. js script에 경우 bundle과 seperate가 있는데 bundle을 popper가 포함되어있고 seperate에는 없다. 내가 이미 프로젝트에서 popper를 사용중이면 seperate를 사용하면 된다. 

## 버튼과 버튼 그룹
```html
<div class="btn-group"> 
  <!-- btn-group은 버튼을 그룹화해서 연결해서 보여준다 -->
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-outline-secondary">Secondary</button>
    <!-- ouline을 사용해서 outline으로 표시 가능 -->
    <button type="button" class="btn btn-success">Success</button>
    <div class="btn btn-outline-primary" disabled>ABC</div>
    <!-- 속성에 disablee를 추가하면 사용할 수 없는 버튼으로 변경  -->
  </div>
```

## 드롭다운과 리스트
드롭다운
```html
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
```
리스트
```html
  <ul class="list-group">
    <li class="list-group-item list-group-item-action">An item</li>
    <!-- list-group-item-action hover했을때 바탕이 연한 그레이로 바뀜 -->
    <li class="list-group-item list-group-item-action active">A second item</li>
    <!-- active 바탕이 블루로 바뀜 -->
    <li class="list-group-item list-group-item-action">A third item</li>
    <li class="list-group-item list-group-item-action">A fourth item</li>
    <li class="list-group-item list-group-item-action">And a fifth one</li>
  </ul>

  ```
  ## 모달

  ```html
<!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- modal body안에 로그인 form 삽입 -->
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Submit</button>
          <!-- save change 버튼을 submit 버튼으로 변경 -->
        </div>
      </div>
    </div>
  </div>
```
```js
// 모달이 보여졌을때 input요소에 포커스
const emailInputEl = document.querySelector('#exampleInputEmail1')
const modalEl = document.querySelector('#exampleModal')

modalEl.addEventListener('shown.bs.modal', function() {
  emailInputEl.focus()
})
//show.bs.modal은 bootstrap에서 제공하느 이벤트 요소 
//이외에도 show hide hidden 등 부트스트랩에서 제공하는 이벤트 요소가 있다. 
```

## 툴팁
툴팁 컴포넌트는 성능상에 문제로 포함되어 있지않아 초기화를 직접해야 한다. 

툴팁은 hover했을때 옆이나 위아래에 작은 말풍선 상자처럼 설명을 나타내준다. 

```js
//초기화
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
 querySelector로 선택해서 생성자함수를 만들어준다 
```

## npm 프로젝트 생성
cdn 링크로 연결 할 경우 각 기능에 커스터마이징이 불가능 하다  npm으로 프로젝트를 생성해서 관리하면 커스터마이징이 가능하다. 
```
npm init -y

npm i -D parcel-bundler

npm install bootstrap

npm run dev //"dev": "parcel index.html"

npm i @popperjs/core
```

```scss
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";
@import "../node_modules/bootstrap/scss/root";
@import "../node_modules/bootstrap/scss/bootstrap";

$theme-colors: (
  "primary":    $primary,
  "secondary":  orange,
  "success":    $success,
  "info":       $info,
  "warning":    $warning,
  "danger":     $danger,
  "light":      $light,
  "dark":       $dark
);
```
```js
//초기화
import Dropdown from  'bootstrap/js/dist/dropdown'
import Modal from 'bootstrap/js/dist/modal'

const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl)
})

new Modal(document.getElementById('modal'))
```
 