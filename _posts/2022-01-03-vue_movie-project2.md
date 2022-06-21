---
layout: post
title: "[Vue] Vue.js 영화 검색사이트 만들기(2)"
data: '2022-01-03'
category: [Vue]

---

## 영화 검색
데이터 받아오기
이전에는 Search.vue에서 직접 데이터를 받았는데 store가 생기면서 데이터 받는곳을 movie.js로 옮긴다. 
```js
import axios from 'axios'
//axios 도 같이 가져온다. 
export default {
  namespaced: true,
  state: () => ({
    movies: [],
    message: '',
    loading: false
    //불변데이터
    //여기서 데이터 변경 불가 
      }),
  getters: {},
  mutations: {
    //데이터 변경을 위해 여기서 코드 작성
    updateState(state, payload) {
      // Search데이터를 배열로 받아 각각 state의 값을 넣어준다. 
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  actions: {
    async searchMovies({ commit }, payload) {
      //여기서 commit은 context중 하나 
      //payload는 데이터 인수 
        const { title, type, number, year } = payload
        const OMDB_API_KEY='7035c60c'
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
        //this를 제거하고 각데이터를 변수로 만들어서 데이터를 받아준다. 
        const { Search, totalResult } = res.data
        //api로 받아온 데이터를 변수에 담아준다. 
        commit('updateState', {
          movies: Search
          //movies라는 이름으로 Search데이터를 받아 updateState실행
        })
    }
  }
}
```
Search.vue 데이터 변경
```js
//데이터 받아오는 메소드는 movie.js로 옮기고 Apply를 클릭했을 때 실행되는 메소드를 넣어준다. 
methods: {
    async apply() {
      //store의 movie의 serchMoveies 실행
      //serachMovies가  actions이기때문에 dispatch사용
      //Mutations일때는 
      this.$store.dispatch('movie/searchMovies',{
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
        //serchMovies를 실행할때 받을 인수를 데이터로 지정해준다. 
      })
    }
  }
```
movieList.vue
```html
<template>
  <div class="container">
    <div class="inner">
      <MovieItem
        v-for="movie in movies"
        //계산된 데이터 안 반복
        :key="movie.imdbID" 
        :movie="movie"
        //movieItem에 movie라는 이름으로 movie data전달  />
    </div>
  </div>
</template>
```
```js
<script>
import MovieItem from '~/components/MovieItem'
export default {
  components: {
    MovieItem
  },
  computed: {
    movies() {
      return this.$store.state.movie.movies
      //movie.js 묘듈의 movies 데이터 전달
    }
  }
}
</script>
```
movieItme.vue
```js
// title가져오기
<template>
  <div>{{ movie.Title }}</div>
</template>

<script>
export default {
  props: {
    movie: {// movieList가 전달해준 movie data
      type: Object,
      default: () => ({}) //참조데이터는 함수로 만들어서 반환해야한다. 
    }
  }
}
</script>
```
## 영화 검색 추가 요청
```js
actions: {
  ...
  //page load는 기본 10개씩 
  //20,30개 load를 위해 설정
  const total = parseInt(totalResults, 10)
  //API에서 받아온 totalResults는 String data로 10진수 숫자로 변경    
  const pageLength = Math.ceil(total / 10)
  // page를 10으로 나눠서 총 page수를 계산해준다. 

  if(pageLength > 1) { //이미 page 11은 load가 되었으므로 2부터 시작할수 있게한다.
    for(let page =2; page <= pageLength; page += 1) {
      if( page > (number/10)) break
      // 여기서 number는 한번서치할때 load갯수 
      // API에서 처음 로드로 주는 데이터 갯수는 10개로 지정되어있다
      // number가 30이면 페이지수를 3개이상나오면 다시불러오기를 break
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
      //number 30이면 page가 3이 될때까지 반복진행 
      const { Search } = res.data
      commit('updateState', {
        movies: [...state.movies, ...Search]
        //덮어쓰지않기위해 
}
```
### ID 중복제거
movie.js
```js
actions: {
  ...
}
commit('updateState', {
        movies: _uniqBy(Search,'imdbID')
        //Search로 받은 데이터를 lodash를 사용하여 ID의 중복값을 제거해준다.
      })
      ...

      commit('updateState', {
            movies: [
              ...state.movies, 
              ..._uniqBy(Search,'imdbID')]
              //추가로드하는 데이터에 대해서도 적용해준다. 
```

## 영화 검색 코드 리팩토링
영화정보를 받아오는 지역함수를 만든다.
재활용이 가능하고 데이터 은닉효과도 있다. 

action에서 정의되어있던 데이터 받아오는 코드들을 잘라서
새로운 함수를 만들어준다. 

```js
function _fetchMovie(payload) {
  const { title, type, year, page} = payload
  const OMDB_API_KEY='7035c60c'
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`


  return new Promise((resolve, reject) => {
    axios.get(url)//axios로 데이터를 받아와서 이행과 예외를 구분한다.
      .then((res)=>{      
        if(res.data.Error){//API에서 자동으로 오류를 거르는걸 나에게 표시해준다
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch( err => {
        reject(err.message)
      })
  })
}
```
action의 변경사항
```js
 actions: {
    async searchMovies({ state, commit }, payload) {
    //더이상 payload를 구조분해해서 title,  type, year를 넣어주지 안하도된다.
    //데이터를 받아올때 수행이되는지 오류가나는지를 구분해서 진행하기위해 try/catch사용
      try{
        const res = await _fetchMovie({
          //데이터를 받아오는 url대신 데이터를 받아주는 지역함수를 넣어준다.
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search,'imdbID')
        })
    
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)
  
        if(pageLength > 1) {
          for(let page =2; page <= pageLength; page += 1) {
            if( page > (payload.number/10)) break
            //number는 데이터 받아올때 정의되지 않았기때문에 
            //앞에 payload를 붙여준다.
            const res = await _fetchMovie({
              //여기도 url 변경
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [
                ...state.movies, 
                ..._uniqBy(Search,'imdbID')]
            })
          }
        }
      } catch (message) {
        commit('updateState', {
          //예외처리 메시지 
          // 오류가발생하면 오류가난 데이터를 빈배열로 바꿔주고
          //state 안에있는 message에 message넣어 표시한다. 
          movies: [],
          message
        })        
      }
    }
  }
}
```

## 영화 아이템
MovieItem.vue
```html
<template>
  <div 
    :style="{ backgroundImage: `url(${movie.Poster})`}"
    class="movie">
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </div>
</template>
```

## container 너비 사용자지정
```scss
//부트스트랩설정을 활용한 너비지정
$container-max-widths: (
  sm: 504px,
  md: 704px,
  lg:924px,
  ml:1140px,
  xxl:1364px
);
```
## 에러 메시지 출력과 로딩 애니메이션
main.js
```js
 actions: {
    async searchMovies({ state, commit }, payload) {//처음 로딩될때 
    //loading이 true면 끝 
    //여러번 enter로인한 반복작업을 막아줌
      if(state.loading) return
      //updateState의 데이터 수정
      commit('updateState', {
        //데이터를 찾으면 loading은 true가 되고 
        //messgae는 없어진다.
        message: '',
        loading: true
      })
      ...
      catch (message) {
        commit('updateState', {
          movies: [],
          message
        })        
      } finally {// 오류여부상관 없이 실행
        commit('updateState', {
          loading: false
        })
      }
```
MovieList.vue
```html
<template>
  <div class="container">
    <div
      :class="{ 'no-result': !movies.length}"
      class="inner">
      //innder class에 검색된 영화가 없으면 class에 no-result를 준다
      //이 no-result는 css에서 inner 부피를 주기위한것
      <div 
        v-if="loading" 
        class="spinner-border text-primary"></div>
        //loading을 하고 있으면 
        //로딩이미지를 보여준다
      <div
        v-if="message"
        class="message">
        {{ message }}
      </div>
      <div 
        v-else //로딩이아니면 movie를 보여준다.
        class="movies">
        <MovieItem
          v-for="movie in movies"
          :key="movie.imdbID" 
          :movie="movie" />
      </div>
</template>
```
```js
computed: {
  ...
  loading(){
      return this.$store.state.movie.loading
    }
}
```
## Footer
Footer.vue
```html

<template>
  <footer>
    <Logo />
    <a
      href="http://github.com/ParkYongWoong"
      target="_blank">
      //해당년도 
       {% raw %} (c) {{ new Date().getFullYear() }} {% endraw %}
      HEROPY
    </a>
  </footer>
</template>
  
```
```js
<script>
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  }
}
</script>
```
```scss
<style lang="scss" scoped>
footer{
  padding:70px 0;
  text-align: center;
  opacity: .3;
  .logo{
    display: block;
    margin-bottom: 4px;
  }
}
</style>
```
App.vue
```html
<template>
  <Header />
  <RouterView />
  <Footer />
</template>
```