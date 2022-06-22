---
layout: post
title: "[TypeScript] 타입스크립트 컴파일러"
data: '2021-12-22'
category: [TypeScript]
---

## tsconfig schema
최상위 프로퍼티
 - compileOnSave
 - extends
 - compileOptions
 - files
 - include
 - exclued
 - references

 ## compileOnSave
 - 저장하면 자동으로 compile 실행
- true/false(default false)
- 사용가능 프로그램
  - Visual Studio 2015 with TypeScript 1.8.4 이상
  - atom-typescript 플러그인
 ## extends
tsconfig.json파일안에 "extends": "./base.josn"경로를 작성하여
부모파일 base.json파일을 만든다. tsconfig.josn파일에 없는 내용도 base.json파일에 있으면 실행이 가능하다. 
 ## files, include, exclude
- 셋다 설정이 없으면, 전부다 컴파일
### files
- 상대 혹은 절대 경로의 리스트배열
- exclued보다 강력
### include, exclude
- glob 패턴 (akcl .gitignore)
- include
  - exclued보다 약함
  - *같은걸 사용하면, .ts/.tsx/.d.ts만 include(allowJS)
- exclude
  - 설정안하면 4가지(node-modules, bower_components,jspm_packages,\<outDir>)를 default로 제외
  - \<outDir>은 항상제외 (include에 있어도)
 ## compileOptions - typeRoots, types
외부 자바스크립트 라이브러이에 타입핑을 도와줄 수 있도록 패키지화해서 tsconfig.josn 설정 사용할수 있게하는 기능
### @types
- 내장 type definition 시스템  
- 설정 안해도 node_modules/@types라는 모든 경로를 찾아서 사용  
- typeRoots 사용하면 배열 안에 들어있는 경로들 아래서만 가져온다.   
  - node_modules/@types도 사용 내프로젝트안에 @types를 사용하고 싶으면 typeRoot로 지정하면 된다.
- types를 사용하면 배열 안에 모듈 혹은 ./node_modules/@types/ 안의 모듈 이름에서 찾아온다.
  - [] 빈 배열을 넣는다는건 이 시스템을 이용하지 않겠다는 것
- typeRoots와 types를 같이 사용하지 않는다. 

 ## compileOptions- target/ lib
  ### target
  target을 지정하지않으면 default로 ES3에서 사용할수 있게 지정. ES6에서사용할 수 있는 arrow함수경우 ES5를 target으로 하면 function() {}의 모양으로 변경된다.

  - 빌들의 결과물을 어떤 버전인지 설정
  - 지정안하면 es3사용
  ### lib
기본 type definition 라이브러리를 어떤것을 사용할 지 설정  
lib을 지정하지 않을때 
  - target이 es3이면, 디폴트로 lib.d.ts를 사용
  - target이 es5이면, 디폴트로 dom, es5, scripthost를 사용
  - target이 es6이면, 디폴트로 dom, es6, dom.iterable, scripthost를 사용
lib를 지정하면 그 llib배열로만 라이브러리를 사용한다.
 ## compileOptions - outDir, outFile, rootDir
outDir은 compile한 파일이 저장되는 폴더 지정
rootDir compile 될 폴더 지정 지정하지않으면 나를 가지고 있는 부모기준으로 complie 함 
 ## compileOptions - strict

### strict type checking option
- --noImplicitAny
- --noImplicitThis
- --strictNullChecks
- --strictFunctionTypes
- --strictPropertyInitialilzation
- --strictBindCallAplly
- --alwaysStrict

### - --noImplicitAny
명시적이지 않게 any타입을 사용하여, 표현식과 선언에 사용하면 에러를 발생
- any가 맞으면 any라고 지정
### --noImplicitThis
명시적이지 않게 any타입을 사용하여, this표현식에 사용하면 에러 
### --strictNullChecks
strictNullChecks를 설정하지 않으면 모든타입이 null과 undefined값을 가질 수 있다.
### --strictFunctionTypes
매개변수는 범위가 같거나 더 넓어도돼고 반환값은 같거나 좁아야 한다. 
 - 반환타입은 공변적
 - 인자타입은 반공변적
### --strictPropertyInitialilzation
정의되지 않는 클래스의 속성이 생성자에게 초기화되었는지 확인  
### --strictBindCallAplly
function의 내장함수인 bind/call/apply를 사용할 때, 엄격하게 체크하도록하는 옵션
### --alwaysStrict
각 소스파일에 대해 JavaScript의 stict mode로 코드를 분석하고, '엄격하게 사용'을 해체 한다. 


 