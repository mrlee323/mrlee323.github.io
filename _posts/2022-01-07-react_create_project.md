---
layout: post
title: "[React] 리액트 Create React App"
data: '2022-01-07'
category: [React]

---

## Create React App

```
//리액트에 필요한 패키지 설치

npx create-react-app tic-tac-toe

//react-scripts start
//개발용 서버

npm start

//react-scripts build
// production용 서버 

npm run build

//react-scripts test
//jest 설정되어 test code 실행

npm test

//react-scripts eject
//createreact app 밖으로 꺼냄

npm run eject
```
## Prettier
Prettier와 eslint비슷한 역할
prettier에서 불피요하거나, prettier와 충돌 할수 있는 모든 규칙을 끈다. 이구성은 규칙을 끄기만 하기 때문에 다른 설정과 함께 사용하는 것이 좋다. 

## Husky
Git 명령어가 실행되면, 사용자가 지정한 스크립트를 실행시켜주는 Node.js 패키지

Husky를 이용하면, Git에 올리기 전에 자동으로 ESLint와 Prettier가 작동하게 할 수 있다.
## lint-staged
Git에 staged 상태인 파일만 lint해주는 Node.js 패키지

husky만 사용하면 프로젝트의 모든 코드를 검사히기 때문에 비효율적이지만, lint-staged는 Git의 staged한 코드만 검사해서, 보다 효율적인 lint가 가능하다

## 설정

```
// package.json에 lint-staged설정 추가
// pre-commit시 lint-staged가 실행되게 만듬

{
  "husky": {
      "hooks": {
          "pre-commit": "lint-staged",
          "pre-push": "npm test"
      }
  },
  "lint-staged": {
      "*.js": [
          "eslint --fix"
          "prettier --write"
      ]
  }
}
```