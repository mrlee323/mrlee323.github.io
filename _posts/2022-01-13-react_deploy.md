---
layout: post
title: "[React] React 배포하기"
data: '2022-01-13'
category: [React]

---

## npm run build(in create-react-app Project)
- production 모드로 빌드되어,'build;폴더에 파일생성
  - 이렇게 만들어진 파일들을 웹서버를 통해 사용자가 접근할 수 있도록 처리
- build/static 폴더 안에 JS, CSS 파일들이 생성
  - 파일 이름에 hash값이 붙는다. 
    - long term caching techniques
    - ex) main.eb74f3d0.chunk.css

## SPA 프로젝트 배포 이해하기
### SPA Deploy 특징
- 모든 요청을 서버에 하고 받아오는 형태가 아님
- 라우팅 경로에 상관없이 리액트 앱을 받아 실행
- 라우팅은 받아온 리액트 앱을 실행 후 적용
- static 파일을 제외한 모든 요청을 index.html로 응답해 주도록 잡업

(setve -s build / AWS S3에 배포/ node.js express/Nginx)
## serve 패키지로 React Wep App 배포하기
```
npm install serve -g
serve -s build
```
-serve라는 패키지를 전역으로 설치합니다.
-serve명령어를 -s옵션을 build폴더를 지정하여 실행한다.
  - -s 옵션은 어떤 라우팅으로 요청해도 index.html을 응답하도록 한다

## AWS S3에 React Wep App 배포하기
- 버킷이름은 고유한것으로 중복허용안한다
- 업로드 
  - 파일추가 (build안 모든 파일)
  - 폴더추가 (static)
- 속성-> 정적 웹사이트 호스팅 -> 인덱스 문서(index.html)
- 권한 -> 퍼블릭엑세스 차단 편집 -> 모든 퍼블릭 엑세스 차단 체크 해제 -> 저장 
- 권한 -> 버킷 정책 -> "Resource":["arn:aws:s3:::react-web-app-test/*"] -> 저장 

## NginX로 React Wep App 배포하기
- Ubuntu Server 설치
- 보안 그룹 구성 -> 보안 그룹 이름: react-web-app-test -> 유형에 HTTP 추가
- 새 키 페어 생성 -> 키 페어 이름 (fastcampus) -> 키페어다운로드 -> 인스턴스 시작
- 인스턴스 -> Name수정(react web app test)
- 인스턴스 -> 퍼블릭 주소 복사 -> 터미널 이동
```
//ll로 파일 확인

ssh ubuntu@(퍼블릭 주소) -i fastcampus.pem

//'fastcompus.pem' are too open

chmod 400 fastcampus.pem//권한조정

ssh ubuntu@(퍼블릭 주소) -i fastcampus.pem

//접속완료

ubuntu@ip-172-31-12185:

//파일 다운 빌드
git clone https://github.com/xid-mark/tic-tac-toe.git

cd tic-tac-toe

//node 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

// 마지막 export NVM_DIR 부분 프로파일 넣는다

nano ~/.profile //실행 후 NVM_DIP붙여넣는다

exit

ssh ubuntu@(퍼블릭 주소) -i fastcampus.pem

nvm

cd tic-tac-toe

nvm install

npm ci

npm run build

//ubuntu 서버에 NginX 최신버전 설치
sudo apt-get update 

sudo apt-get upgrade

//wget을 이용해 nginx key를 다운 받는다
wget http://nginx.org/keys/nginx_signing.key

sudo apt-key add nginx_singing.key

sudo rm -rf nginx_signing.key

sudo nano /etc/apt/sources.list

//복사해서 sources.list 맨아래에 붙여넣기
deb http://nginx.org/packages/mainline/ubuntu/ trusty nginx
deb- src http://nginx.org/packages/mainline/ubuntu trusty nginx

sudo apt-get update 

sudo apt-get upgrade
 
sudo apt-get install nginx //설치

nginx -v// 버전확인

sudo rm -rf /etc/nginx/sites-available/default //삭제

sudo nano /etc/nginx/sites-available/default//생성

server {
  listen      80;
  server_name localhost;

  root /home/ubuntu/tic-tac-toe/build;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}

sudo service nginx restart
```
## node.js express로 React Wep App 배포하기
```
npm i express
```
root에 server.js파일 생성
```js
const express = require('express')
const path = require('path')

const app = express();

app.use(express.static(path.join(__dirname, 'bhild')))

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(9000)

```
```
node server.js
```
## 서버사이드 렌더링 이해하기
- 서버에서 응답을 가져올때, 기존처럼 static file 만을 가져오는 것이 아니고, 먼저 서버에서 응답값을 만들어서 내려주고, 그후에 static file을 내려준다.
- static file을 다 내려받고, 리액트 앱을 브라우저에서 실행한 뒤에는 SPA 처럼 동작하게 된다. 

### React Server Side Rendering
- React Component를 브라우저가 아니라 Node.js에서 사용
- ReactDOMServer.renderToString(<App />)
  -  결과가 문자열
  - 이것을 응답으로 내려준다.
- 라우팅, 리덕스오 ㅏ같은 처리를 서버에서 진행하고 내려준다.
  - 복잡하고 어렵다
- JSX 가포함된 리액트 코드를 서버에서 읽을 수 있도록 babel 설정을 해야한다.
server.js
```js
const express = require('express')
const path = require('path')
const ReactDOMServer = require('react-dom/server')
const React  = require('react')
const fs = require('fs')

const app = express();

app.use(express.static(path.join(__dirname, 'bhild')))

app.get('/test', (req, res) => {
  const ssr = ReactDOMServer.renderToString(React.createElement('div', null, 'hello'))
  const indexHtml = fs
  .readFileSync(path.join(__dirname, 'build', 'index.html'))
  .toString().replace('<div id="root"></div>', `<div id="root">${ssr}</div>`)

  res.send(indexHtml)
})

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(9000)
```