---
layout: post
title: "[Programming] parcel"
data: '2021-12-29'
category: [Programming]

---

구성 없는 단순한 자동 번들링  
소/중형 프로젝트에 적합

  Webpack : 매우 꼼꼼한 구성, 중/대형 프로젝트에 적합

## 프로젝트 생성
```
npm init -y

npm i -D parcel-bundler
```
```json
//package.json
"scripts":{
"dev" : "parcel index.html",
"build": "parcel build index.html
}
```

## 정적파일 연결
bundler에서는 dist폴더에 변환된 상태에서 보이게된다. 그러므로 root에 있는 ico 이미지는 적용이 되지 않는다. 하지만 dist는 그때그때 불러서 사용하는 폴더이기때문에 이미지 파일을 폴더로 넣는것은 좋은 방법이 아니다. 
그렇기 때문에 패키지를 통해 정적파일을 관리를 한다.
```
npm i -D parcel-plugin-static-files-copy
```
```json
//package.json
"staticFiles": {
    "staticPath": "static"
  }
```
json에 위와같이 설정하면 static폴더를 생성하고 그안에 파일을 관리할 수 있다. static이라는 폴더안에 img넣어두면 dist가 없어졌다 다시생겨도 패키지가 다시 추가해준다. 

## autoprefixer
브라우저마다 갖고있는 css에 선택자가 있다 이를 일일히 적용해주기 어렵기때문에 autoprefixer를 통해서 각 브라우저에 맞게 지정해줄수 있다. 
```
npm i -D postcss

npm i -D autoprefixer
```
```json
  "browserslist": [
    "> 1%", //점유율이 1% 이상인 모든 브라우저
    "last 2 versions" // 마지막 두개 버전 
  ]
  ```

```js
.postcssrc.js

//ESM
// commonJS

// import autoprefixer from 'autoprefixer'
const autoprefixer = require('autoprefixer')

// export {
//   plugins: [
//     autoprefixer
//   ]
// }
module.exports = {
  plugin: [
    autoprefixer
  ]
}/
```
autoprefixer와 postcss 버전이 맞지 않으면 오류가 발생한다 autoprefixer가 10이고 postcss가 8이면 autoprefixer의 버전을 9로 낮춰준다. 

공급업체 접두사 


## babel
최신 ECMAscript로 작성된 스크립트를 구형버전에서 작동할수 있는 이전 ES5로 변환해주는 컴파일러

```
npm i -D @babel/preset-env

npm i -D @babel/core
```
```js
// .babelrc.js 생성

module.exports = {
  presets: ['@babel/preset-env']
}

//babel을 통해서 ES5로 컴파일되서 작동
```
```
//babel에서는 기본설정에 async/await를 지원하지 않음
//async/ await를 사용하기위해 

npm i -D @babel/plugin-transform-runtime
```

```js
//.babelrc.js

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    ['@babel/plugin-transform-runtime'] //추가
  ]
}
```

## CLI
커맨드 라인 인터페이스

parcel CLI : https://ko.parceljs.org/cli.html

package.json 파일에 명령어를 통해서 원하는 기능을 추가할 수 있다. 대표족으로 script에 개발용 서버를 열수있도록 'parcel index.html'도 명령어 중 하나이다. 
