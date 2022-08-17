---
layout: post
title: "[React] 원티드 프리온보딩 영화 정보 사이트"
data: "2021-07-13"
category: [React]
---

이번 영화정보사이트에서 내가 맡은 파트는 영화 상세페이지이다. 영화 상세 페이지는 영화리스트 클릭시 이동되는 페이지로 영화의 상세정보와 즐겨찾기 기능이 필수 구현 요소이다. 추가 적인 구현 요소로는 상세페이지의 영화와 같은 장르의 영화들을 추천해주는 영화리스트를 추가하기로 했다.

타입스크립트를 사용하여 구현하고, 반응형을 고려하여 프로젝트를 진행하기로 했다.

<상세페이지 피그마 - 웹>

<p align="center">
  <img src="https://user-images.githubusercontent.com/92876884/184994033-8d8a19ba-e4c5-4890-a91b-377d6644359f.png" alt="상세페이지" />
</p>

## 1. 타입스크립트

타입스크립트를 이번에 처음 사용해봐서 에러를 처리하는 데 너무 힘들었다. 그동안 내가 얼마다 타입에 상관없이 코딩을 했는지 알수있었다.

```js

import { IMovie, IMovieDetail } from 'src/types/Movie';

interface PostDetailProps {
  movie: IMovie;
  getSimilarList: (genre: string) => void;
  handleLoad: (key: string) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({
  movie,
  getSimilarList,
  handleLoad,
}) => {...}

```

db에서 가져오는 데이터에 대한 타입은 따로 파일을 생성하여 import 해서 사용하는 방법으로 재사용했다.

각 컴포넌트에서 props의 타입은 각 컴포넌트에서 생성해서 사용했다.

타입스크립트를 사용하면서 느낀것은 변수를 생성하거나 함수를 생성할때 타입을 지정해놓으면 사용할때에는 타입이 유추되어진다는 것이다. 처음에 온갖대에다 타입을 적용하니 에러가 발생해서 에러를 찾는대 많은 시간을 허비했다. 이후에는 생성할때와 props 전달 할때에만 정확히 타입을 지정해주고 나서 에러가 많이 사라지고 타입이 잘 추론되어 적용되었다.

## 2. 반응형

<상세페이지 피그마 - 모바일>

<p align="center">
<img alt="responsive_detail_page" src="https://user-images.githubusercontent.com/92876884/184994036-e9876de9-1ddf-4f8b-aa5c-e0539a9a4695.png" />
</p>

모바일과 웹에 구조가 변경되는 부분들은 css media를 사용하여 적용했다.

웹에서는 background가 있고 모바일에는 없는 구조이다. 처음에는 background를 img 태그를 사용해서 사용했는데 background가 최상단인데 img태그인 것이 맞이 않다고 생각하여 background를 div태그를 이용해서 css background에 imgage를 적용해서 구현했다.

## 3. 즐겨찾기 버튼

상세정보를 받아올때 param으로 받은 id를 이용해서 즐겨찾기 상태를 api에 patch했다. 이렇게 할결우 새로고침을 해야 즐겨찾기 상태가 변경되어 표시되었다. 상태관리 라이브러리를 사용하지 않아서 즐겨찾기의 상태를 따로 useState로 관리해서 클릭이 발생하때 api에 patch요청이 되는 동시에 state를 변경해서 ui를 변경해주었다.

### 즐겨찾기 버튼 클릭시 화면 깜빡임 에러

즐겨찾기 버튼을 구현하고 실행해보았을때 계속적인 화면에 깜빡임이 발생했다. 혹시나 렌더링으로인한 깜빡임인가 싶어 구조도 바꿔보고 버튼의 위치도 바꿔보았지만 해결이 되지 않았다. 이후 팀원들에게 에러를 공유하고 방법을 강구했다. 이후 알게된 에러의 이유는 movies.json 때문이었다. 현재 프로젝트는 json-server를 이용해 movies.json 데이터를 server 데이터처럼 이용해서 구혔했다. movies.json에 위치가 public에 위치했는데 즐겨찾기가 변경될때마다 json에 데이터가 변경되면서 public이 변경되어 전체가 새로고침되는 현상이었다. 이후 movies.json의 위치를 root에 data폴더를 만들어 해당 폴더로 이동시키고나서 깜빡임 에러는 해결이 되었다.

## 배포

<a href="https://wanted-preonboarding-movie-info-site.vercel.app/">https://wanted-preonboarding-movie-info-site.vercel.app/</a>
