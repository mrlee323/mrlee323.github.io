---
layout: post
title: "[Vue] Vue.js 영화 검색사이트 만들기(1)"
data: '2022-01-03'
category: [Vue]

---

## Router
```
npm install vue-router@4
```
main.js
```js
import { createApp } from 'vue'
import App from './App'
import router from './routes'

createApp(App)
  .use(router) //플러그인
  .mount('#app')
```
```js
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'

export default createRouter({
  //Hash
  // https://google.com/#/search
  // # 특정페이지에서 새로고침할때 페이지를 찾을수 없다를 방지할수 있다.
  history: createWebHashHistory(),
  //pages
  // https://google.com/
  // / -> main /about -> about page
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    }
  ]
})
```

## Bootstrap
```scss
// Default variable overrides
$primary: #FDC000;
//이 설정은 veriables위에 설정을 해야한다. 아래에 설정하면 이미 veriable이 값을 정하기때문에 위에 작성해야한다. 

// Required
// 부트스트랩 가져오기
@import "../../node_modules/bootstrap/scss/functions";
@import "../../node_modules/bootstrap/scss/variables";
@import "../../node_modules/bootstrap/scss/mixins";
@import "../../node_modules/bootstrap/scss/root";

@import "../../node_modules/bootstrap/scss/bootstrap";
```
## Header-Nav

compoenents -> Header.vue  
Header.vue
```html
<!-- bootstap의 nav양식을 가져와서 사용 -->
<template>
  <header>
    <div class="nav nav-pills">
    <!-- vue router-link로 인한 class 명이 router-link-active이어서 active로 변겨해야 부트스르랩의 기능을 사용할 수 있다.  -->
      <div 
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink 
          :to="nav.href"
          active-class="active"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>
```
```js
<script>
export default {
  data() {
    return {
      navigations: [
        {
          name: 'Saerch',
          href: '/'
        },
            {
          name: 'Movie',
          href: '/movie'
        },
            {
          name: 'About',
          href: '/about'
        }
      ]
    }
  }
}
</script>
```
App.vue에 Headervue를 연결해 준다. 
```html
<template>
  <Header />
  <!-- Router로 페이지가 변해도 Header는 그대로  -->
  <RouterView />
</template>
```
```js
<script>
import Header from '~/components/Header'

export default {
  components: {
    Header
  }
}
</script>
```

## Header-Logo
RouterLink를 통해 nav에 연결해주고 링크를 홈을로 설정한다.   
components -> Logo.vue
```html
<template>
  <RouterLink
    to="/"
    class="logo">
    <span>OMDbAPI</span>.COM
  </RouterLink>
</template>
```

```js
<style lang="scss" scoped>
@import "~/scss/main";
.logo{
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  text-decoration: none;
  color: $black;
  &:hover {
    color: $black;
  }
  span{
    color: $primary;
  }
}
</style>
```
Header.vue
```html
 <header>
   <!-- header제일 위에 위치 -->
    <Logo />
    <div class="nav nav-pills">
      ...
```
```js
import Logo from '~/components/Logo'
export default {
  components:{
    Logo
  },
 ...
 ``` 

## Headline
components -> Headline.vue
```html
<template>
  <div class="container">
    <!-- container bootstrap에서 제공하는 메인 페이지를 감싸는 클래스로 뷰포트에 따라 사이즈를 바꿔준다. -->
    <h1>
      <span>OMDb API</span><br />
      THE OPEN><br />
      MOVIE DATABASE
    </h1>
    <p>
      The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.<br />
      If you find this service useful, please consider making a one-time donation or become a patron.
    </p>
  </div>
</template>
```
```scss
<style lang="scss" scoped>
@import "~/scss/main";
.container {
  padding-top: 40px;
}
h1 {
  line-height: 1;
  font-family: "Oswald", sans-serif;
  font-size: 80px;
  span {
    color: $primary;
  }
}
p {
  margin: 30px 0;
  color: $gray-600;
}
</style>
```
routes폴더에 Home.vue 파일에 Header를 연결해준다. 
```html
<template>
  <Headline />
</template>
```
```js
<script>
import Headline from '~/components/Headline'
export default {
  components: {
    Headline
  }
}
</script>
```

## Search -필터
components -> Search.vue 생성
```html
<template>
  <div class="container">
    <input
  //양방향데이터
      v-model="title"
  //부트스트랩속성
      class="form-control"
      type="text" 
      placeholder="Search for Movies, Series & more" />
    <div class="selects">
      <select
  //select안에 filter데이터를 반복을 통해서 채워준다.
        v-for="filter in filters"
  //filter에 들어갈 데이터
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option 
  //value를 통해 기본값 하지만 나머지 input요소에도 적용되기 때문에 year에만 적용도리수 있도록 v-if 사용  
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
  //filters로 생성된 각 input요소에 데이터채우기
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
  </div>
</template>
```
```js
<script>
export default {
  data() {
    return {
      title : '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name:'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const years = []
            //thisYear올해년도
            const thisYear = new Date().getFullYear()
            //반복을 통해 배열에 연도를 채워준다. 
            for (let i = thisYear; i >= 1985; i -= 1) {
              years.push(i)
            }
            //years배열을 반환해서 years.item의 데이터를 채워준다
            return years
          })()
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  > *{
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
```
## Search - 버튼
```html
<!-- input div인 selects 아래에 button작성 -->
<button 
  class="btn btn-primary"
  @click="apply">//click시 apply 메소드 실행
  Apply
</button>


++ 
<input
      v-model="title"
      class="form-control"
      type="text" 
      placeholder="Search for Movies, Series & more" 
      @keyup.enter="apply" />
      //input에 검색할때 apply를 click외에 input요소에 검색어를 작성하고 enter를 치면 button과 같이 apply 메소드가 실행된다.
```
```scss
// container 안에 btn 속성 값 작성
//flex-shrink는 flex로 정렬되어졌을때 다른 요소로인해 온전한 값이 아닌 줄어든 값을 같게 된느데 이때 줄어들지 않게 값을 0을 주면 width값이 120px이 출력된다. 
.btn{
  width: 120px;
  height: 50px;
  font-weight: 700;
  flex-shrink: 0;
}
```
### axios
Axios는 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리
```
npm i axios
```
```js
import axios from 'axios'
...
 methods: {
    async apply(){//연결 async
      const OMDB_API_KEY='7035c60c'
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&type=${this.type}&y=${this.year}&page=1`) // 비동기를 위한 await
      console.log(res)
    }
  }
  
  //apikey=${OMDB_API_KEY}&s=${this.title}&type=${this.type}&y=${this.year}&page=1
  //apikey는 OMDB_API_KEY
  // s 는 title
  // type은 type
  // y는 year
  // page

  ```

## Vuex
vue는 형제끼리 데이터를 공유하지 못한다. 이를 해결할수 있는 방안으로 vuex가 있는데 vuex는 store의 개념으로 데이터를 한대모아서 module로 각각 동작하는 것이다. 

```
npm i vuex@next
```
store 폴더를 만들어서 index.js, movie.js, about.js를 만들어준다. 

index.js  
movie와 about을 가져와 모듈을 만들어 준다. 
```js
import { createStore } from 'vuex'
import movie from './movie'
import about from './about'

export default createStore ({
  modules: {
    movie,
    about
  }
})
```

main.js
```js
import { createApp } from 'vue'
import App from './App'
import router from './routes'
import store from './store'//폴더안에 index.js 파일을 가져올경우 index.js 를 없이 주소에 폴더명만 적어도 폴더를 가져와 처음 찾는 파일이 index.js 이다. 

createApp(App)
  .use(router) //플러그인
  .use(store)  //저장소
  .mount('#app')
``` 
movie.js  
데이터 가져오기

vue에서 사용하는 같은 기능들이 명칭이 다르기 때문에 주의해야한다. 
명칭만드를뿐 비슷한 기능들을 하기 때문에 쓰임새는 같다. 
```js
export default {
//module!
 namespaced: true,
 //data!
 state: () => ({
  movies: []
}),
 //computed!
 getters: {//상태를 활용해서 데이터를 만들어낸다.
   movieIds(state) {
     return state.movies.map(m => m.imdbID)
   }
 },
 //methods!
 //변이
 //데이터를 변경해주는 메소드 정의 mutations
 mutations: {
   resetMovies(state) {
     state.movies = []
   }
 },
 //비동기 기본
 actions: {
   searchMovies() {
   }
 }
}
```