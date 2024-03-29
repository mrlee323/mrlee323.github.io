---
layout: post
title: "[React] 원티드 프리온보딩 광고 플랫폼"
data: "2021-07-20"
category: [React]
---

광고 플랫폼은 데이터를 이용해서 주차별 chart와 테이블을 구현하는 대시보드 페이지와, 광고를 생성하고 수정할수 있는 광고광리 페이질 두가지 구현하는 프로젝트이다.

## 1. React Query & Recoil

이번 프로젝트에서는 React Query와 Recoil을 사용하기로했다. 이렇게 두가지를 사용하게 된이유는 비동기 통신과 전역 상태 관리를 구분하여 관리하기 위함이다.

참고  
<a href="https://techblog.woowahan.com/6339/">https://techblog.woowahan.com/6339/</a>

이 글을 보고 많은 깨달음을 얻었던 것 같다. 그동안 나는 store라는 개념이 api 요청하여 그 데이터를 전역으로 상태를 관리하는 것이라고 생각했다. 그런데 이 글에서 보면 store는 client 상태관리의 역할로, 비동기 통신은 store에서 분리해서 server 상태관리로 각 역할에 맡게 사용한다는 것이다.

그동안 개인프로젝트나 작은 프로젝트를 위주로 해서 필요성을 느끼지 못했으나 프로젝트의 규모가 커질수록 거대해진 store에 대해 고려해볼만한 방안이라 생각한다.

이번 프로젝트는 비록 큰 프로젝트는 아니지만 서버와 client상태관리를 각 역할 맡게 구분하여 사용해보면 좋을것 같아 팀회의에서 논의를 해서 두가지를 사용하기로 했다.

## 2. 전체 레이아웃

프로젝트에서 팀원들이 디자인이나 전체 레이아웃에 대한 고민하는 수고를 조금 덜고자 간단하게 피그마를 작업해서 팀원들에게 공유하고 있다. 피그마 작업을 하다보니 기본 레이아웃이나 스타일 적용을 맡게 되었다.

이번 프로젝트 레이아웃은 헤더와 사이드바는 고정하고 메인 파트만 스크롤이 되도록 구현되어야 했다. 처음에는 레이아웃 각 컴포넌트에 fixed를 사용해서 구현했다. 이렇게 구현하면 sroll이 메인만이 아닌 전체 스크롤이 생겼다. 멘토님이 전체 스크롤이아닌 main에만 스크롤이 생기는 방향으로 조언을 해주셔서 해당부분을 리팩토링을했다.

layout 최상단에만 fixed를 주고 <code>grid-template</code>를 사용하여 위치를 조정하고 메인에만 <code>overflow-y: scroll</code>를 적요해서 메인파트에만 스크롤이 생기도록 구현했다.

## 3. 광고관리 페이지

이번에 내가 맡은 파트는 광고관리 페이지 구현이었다. 광고관리 페이지에서 구현요소는 세가지이다.

1. 광고 만들기(form) / 수정
2. 광고 리스트
3. 광고 상태를 통한 필터링

처음 파트를 담당하게 되었을때 크게 어렵지 않을거라 생각했는데, 나중에 하나하나 정리하다보니 form 작성시 validation과 만들기와 수정이 같은 컴포넌트를 재사용해야한다는 점등 고려해야하는 부분들이 생겼다.

- 광고생성

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/92876884/185268209-ac27c7af-6dfe-47a5-adc6-b9f47688d4cd.gif" alt="광고생성" >
</p>

- 광고 수정/삭제

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/92876884/185268206-fadf8549-dbcf-49b8-b40d-caf035787b6a.gif" alt="광고 수정/삭제" >
</p>

- 광고상태 필터링

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/92876884/185268202-6b8b3dda-35ef-404f-b372-e1937b6c90b5.gif" alt="광고상태 필터링" >
</p>

### 1) 광고 만들기 Form / 수정

form을 구현할때 validation이 필요해서 react-hook-form을 사용해서 구현했다. 각 input에 이벤트를 만들어 validation을 체크하지 않아도 돼서 간단하게 구현할 수 있었다. validation은 react-hook-form으로도 가능하지만 여러개를 적용하면 코드가 너무 길어지는 면이 있어, react-hook-form과 같이 많이 사용하는 yup을 통해 좀더 간단하게 정리할수 있었다.

form 라이브러리가 공식 문석도 정리가 잘되어있어서 이해하기 쉬웠다. yup에서 validation을 할때 다른 값을 고려해서 값을 체크하는 부분에서 정보를 찾기어려워 이것저것 대입해보고하는데 조금 시간이 걸렸던 것 같다.

수정할 때 data를 form input에 넣는 것도 react-hook-form에서 제공하는 <code>setValue</code>를 통해서 적용할수 있었다.

### 2) 광고리스트

광고 리스트는 데이터를 불러와 map으로 광고카드를 리스트로 그려주기만 하는 작업이라 어려움없이 진행했다.
카드가 생성되고 삭제될때 바로바로 나타나야하는데, 이번에는 React Query에서 제공하는 useMutation를 통해서 서버 상태 변화를 감지하고 화면을 자동으로 업데이트 해주면서 이전에 영화사이트에서 따로 상태를 관리하지않아도 바로바로 변경이 일어난다.

#### 광고리스트 업데이트 오류

React Query에서 제공하는 useMutation을 이용해서 업데이트를 하려고했는데 제대로 동작하지 않았다. 공식 홈페이지에서 적용하는 방법 그대로 적용했는데 작동이 되지 않았다. 비동기 통신을 맡은 팀원과 해당부분 에러를 찾고있었는데, 원인이 너무 간단했다.

```js
export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(adDelete, {
    onSuccess: () => queryClient.invalidateQueries("ads"),
  });
};
```

React Query에서는 unique Key를 만들어서 각 데이터를 접근할 수 있다. 위 코드에서 'ads'가 unique Key이다. 이 키값이 'ad'로 오타로 인해 제대로 적용이 되지 않았던 것이다. 오타로 인한 간단한 에러였지만 처음 사용하는 라이브러리이기도 하고 콜솔에도 에러메세지가 없다보니 해당 에러를 찾는데 어려웠다. 너무 허무한 곳에 시간이 낭비했다. 오타주의!! 해야겠다.

### 3) 광고 상태를 통한 필터링

광고 상태는 'active'와 'end' 두가지이다. DropDown 'all', 'active', 'end' 세가지로 리스트를 구성하였다. 상태에 따라 data를 filter해서 해당 값을 리스트로 보여준다. DropDown 컴포넌트는 하나를 만들어서 대시보드페이지와 광고관리 페이지에 모두 사용하고있다. 드롭다운에 필요한 option을 props로 배열로 전달하면 된다. 처음 default 값도 전달하면 해당값을 default로 지정할수 있다.

## 배포

<a href="https://wanted-preonboarding-ad-platform.vercel.app/">https://wanted-preonboarding-ad-platform.vercel.app/</a>

<p align="center">
<img src="https://user-images.githubusercontent.com/92876884/185012352-43874c18-beaf-483b-b5f1-0c2cb56f307d.png" alt="ad_platform" >
</p>
