---
layout: post
title: "[Programming] webpack"
data: '2021-12-29'
category: [Programming]

---

## webpack 시작
```
npm init -y

npm i -D webpack webpack-cli webpack-dev-server@next
```

```json
"scripts": {
    "dev": "webpack-dev server --mode development",
    //개발용모드로 표시해야한다. 
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.65.0",
    "webpack-cli": "^4.9.1",
    //cli명령어를 사용하기위해 설치 
    //parcel을 자동
    "webpack-dev-server": "^4.0.0-rc.1"
    //수정사항에 대해 바로바로 업데이트를 위해 설치
  }
```

## entry, output
webpack은 parcel과 달리 webpack.config.js파일을 생성해서 어떻게 out할지 설정해줘야한다. 

```js
//import
const path = require('path')//path node 전역 모듈

// export
module.exports = {
  //parcel index.html
  //파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    path: path.resolve(__dirname, 'dist'),//__dirname 노드 전역 변수 현재파일에 경로 
    //resolve 첫번째 인수와 두번째 인수르 합쳐준다 
    filename: 'main.js'
  }
}

//output의 경우 폴더를 따로 설정하지 않으면 default값으로 dist 폴더가 생기고 그안에 진입하는 js 파일과 같은 파일명의 js를 만들어준다. 
```

webpack은 entry/output만해도 세세하게 설정할 수 있다 내가 원하는 대로 설정이 가능하다. 

https://webpack.js.org/configuration/output/

## plugins

```js
const HtmlPlugin = require('html-webpack-plugin')

output: {
  ...
//번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [//구성옵션
    new HtmlPlugin({//생성자함수
      template: './index.html'
      //output 에서 main.js 시작으로 index.html부른다 
    })
  ],
  devServer: {
    host: 'localhost'
    //host주소에 [::]에 loacalhost를 입력
  }
}
```

## 정적 파일 연결

parcel과 같이 static폴더를 생성하여 관리 하면 되는데 약간의 구조적 차이가 있다면 parcel에서는 static폴더에 favicon파일만 있고 images폴더는 root폴더에 있었는데, webpack에서는 staic안에 images 폴더를 만든다. html에서 img를 찾을 때도 ./images로 입력해도 찾을수 있던것은 나중에 static폴더에 있는 파일들을 dist로 복사해서 넣어주기 때문에 dist에서 실행되었을때는 같은 폴더 안에 images폴더가 있게 된다. 
```
npm i -D copy-webpack-plugin
```
```js
const CopyPlugin = require('copy-webpack-plugin')

plugins: [//구성옵션
    new HtmlPlugin({//생성자함수
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        {from: 'static'}
        //static폴더를 복사해서 dist폴더에 넣어준다 
        //여러개 동시에 가능 
      ]
    })
  ]
```

## module
webpack은 css폴더를 가져와서 dist에 합쳐줄뿐 읽을수 없다. 읽기위해서는 패키지를 추가로 설치해야한다. 
```
npm i -D css-loader style-loader
```
```js
//main.js 파일안에 

import '../css/main.css'
```
```js
//webpack.config.js파일
//output안에

module:{
  rules: [
    {
      test: /\.css$/, //.css 끝나는 파일을 찾는다. 
      use: [
        'style-loader', //html에 해석된 style을 삽입
        'css-loader',// js에서 css 해석 할수 있게
        'scss-loader'
      ]
    }
  ]
}
```
## SCSS
```
npm i -D sass-loader sass
```
```js
//main.js 파일안에 

import '../scss/main.scss'
```
```js
//webpack.config.js파일
//output안에

module:{
    rules: [
      {
        test: /\.s?css$/, //.scss 또는 .css로 끝나는 파일을 찾는다. 
        use: [
          'style-loader', //html에 해석된 style을 삽입
          'css-loader',// js에서 css 해석 할수 있게
          'sass-loader'
        ]
      }
    ]
  }
```
## autoprdfixer(postcss)

```
npm i -D postcss autoprefixer postcss-loader
```
```js
//webpack.config.js파일
//output안에

use: [
          'style-loader', //html에 해석된 style을 삽입
          'css-loader',// js에서 css 해석 할수 있게
          'postcss-loader',//공급업체 접두사 적용
          'sass-loader'//sass해석
        ]
```
```js
//.postcssrc.js 생성

module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```
```json
//package.json에 추가
"broweerslist": [
    ">1%",
    "last 2 versions"
  ]
```
## babel
```
npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime
```
```js
//.babelrc.js 생성
module.exports = {
  presets: ['@babel.preset-env'],//일일히 따로 명시 자바스크립트 기능 한번에 제공
  plugin: [//2차원 배열
    ['@babel/plugin-transform-runtime']//비동기 처리
  ]
}
```
```
npm i -D babel-loader
```
```js
//webpack.config.js파일
//output안에

rules: [
      ...,
      {
        test:/\.js$/,
        use: [
          'babel-loader'//읽기위한 매개체
        ]
      }
    ]
```

## Netlify 배포
```
git init //프로젝트생성
```
netlify 사이트에서 
New site form Git 프로젝트 생성  

- basic build settings
  - build command : npm run build
  - publish directory : dist

Deploy site 완료

## NPX, Degit

프로젝트 가져오기 npx digit

git clone으로 저장소를 가져오는 것과 npx digit으로 가져오는 것에는 차이점이 있다. git clone은 이전 버전관리까지 가져오게 되는데 npx digit은 저장소에 저장된 파일만을 가져오게 된다. 
```
npx degit 저장소 다운받을장소폴더
//degit을 사용하려면 설치해야하는데 npx 명령으로 바로 실행하게 된다. 
```
```
//해당폴더에서
cod . -r //을 입력하녀 현재 vscode에서 실행
```
git init으로 새로 프로젝트를 만들수 있다. 




