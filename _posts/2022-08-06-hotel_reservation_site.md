---
layout: post
title: "[React] 원티드 프리온보딩 호텔 예약 사이트 "
data: "2021-08-06"
category: [React]
---

원티드 프리온보딩 마지막 프로젝트로는 호텔 예약 사이트 구현이었다.

필수 구현 조건으로는 5가지이다.

1. 체크 인/아웃 날짜를 선택할 수 있는 캘린더 구현
2. 투숙객 수를 입력할 수 있는 인풋 폼 구현
3. 제공되는 hotels.json 파일의 데이터 중 체크 인/아웃 기간과 인원수에 해당하는 호텔들을 조회
4. 조회 된 호텔을 무한 스크롤로 노출
5. 호텔 하나를 선택하게 되면 선택한 (체크 인/아웃 - 투숙객 수 - 호텔명) 정보를 가지는 데이터를 로컬 스토리지에 json타입으로 저장.

추가적으로 반응형을 되도록 구현하는것이 조건이었다.

이번 프로젝트에서 내가 맡은 파트는 캘린더 파트였다. 캘린더를 구현하고 checkIn 과 checkOut에 따라 기간을 표시하고 서치바에 value를 전달하는 것이다.

## 1. Query string

이번에 우리가 다른 프로젝트와 다른게 진행한것을 Query string이다. 전역 상태 관리가 필요할때 recoil을 사용해서 적용했는데, 팀 회의때 search 데이터가 과연 전역을 관리가 필요한 상태인가를 논의했다. Saerch 데이터는 데이터를 받아올때만 필요할뿐 전역으로 관리할필요까지는 없다는 결론을 내렸다.

그럼 과연 우리는 어떻게 Search에 데이터를 다른 컴포넌트로 전달할까하다 다른 예약사이트를 참고해보니 대부분에 사이트에 날짜와 검색 조건등이 query string에 담긴것을 볼수 있었다. 이런 방법이 있는지는 알겠지만 이게 가능할지를 몰라 팀원들과 논의끝에 가능하다는 결론이 나서 그렇지 진행하기로 했다.

```js
function useLocationString() {
  const location = useLocation();
  const { search } = location;
  const query = new URLSearchParams(search);
  const result = {
    checkIn: query.get("checkIn") ?? defaultCheckIn,
    checkOut: query.get("checkOut") ?? defaultCheckOut,
    adult: query.get("adult") ?? 2,
    kid: query.get("kid") ?? 0,
    hotelName: query.get("hotelName") ?? "",
  };
  return result;
}

function useNavigateSearch() {
  const navigate = useNavigate();
  return (pathname, params) =>
    navigate({ pathname, search: `?${createSearchParams(params)}` });
}
```

query를 받아오고 요청하는 부분을 hook으로 만들어서 사용했다. Search가 요청되면 navigate에 param을 전달하고, 이걸 api가 받아서 사용하는 방법으로 했다.

<p align="center">
<img src="https://user-images.githubusercontent.com/92876884/185263383-d03a72ea-8f36-4135-a6e1-4b35c931ad8e.png" alt="쿼리스트링">
</p>

처음 시도한 방법이어서 팀원모두가 될지안될지 미지수였는데 생각보다 진행이 잘되었고 우리가 생각한 로직대로 되었다. 호텔 리스트에서 클릭이 발생하면 해당 호텔 이름만 query에 추가하여 상세페이지로 이동이 되고 상세페이지에서도 query string을 이용해서 데이터를 받아왔다.

전역으로 가지고 있어야할 상태가 아니라는 생각에 새롭게 도입해보았는데 결과적으로 좋은경험과 결과를 얻은것 같다.

## 2. 캘린더 구현

처음 내가 생각한 계획은 날짜 선택은 불필요하게 render을 일으킬 필요 없다고 생각하여 Ref를 사용해서 className을 추가하는식으로 구현을 했다. 이렇게 구현하면 캘릭더의 날짜가 수정되더라도 불필요하게 렌더링이 일어나지않는다. 하지만 이후 서치바에 연결하면서 서치바에 바로바로 체크인/체크아웃 날짜가 표시되어야했다. 해당부분에 state를 만들어서 값을 변경시켜주면서 결국 내가 생각한 렌더링 최적화는 불필요하게 Ref를 남용한 격이 되었다. 선택될 때마다 서치바 날짜를 적용하는것보다 날짜체크가 완료되고 적용을 통해 한번만 렌더링이 된다면 조금 더 렌더링을 최소화할수 있지 않을까 생각이 들었다. 하지만 처음 기획을 이해하지못하고 컴포넌트를 구현한 내잘못이 크다. 서치바에 연결하면서 아차 싶었지만 발표일 얼마남지 않은상황에서 전체를 고치기에는 시간이 부족한듯하여 추후 리팩토링을 하는걸로 결론을 내렸다.

<웹 캘린더>

<p align="center">
<img src="https://user-images.githubusercontent.com/92876884/185265172-2ccb80dd-faff-46a2-996b-67ca46909b01.gif" alt="호텔 예약 캘린더">
</p>

<모바일 캘린더>

<p align="center">
<img src="https://user-images.githubusercontent.com/92876884/185265174-656eaebd-c3c4-406e-b13a-be0936fc24cb.gif" alt="호텔 예약 캘린더">
</p>

### 1) 캘린더 UI구현

캘린더 ui를 구현하는 것을 어렵지않게 구현했다. 캘린더를 구현할때 필요한것을 월의 마지막 날짜와 월의 시작 요일이었다. 두가지만 있으면 각 월의 해당하는 캘릭더를 구현이 되었다. grid을 이용해서 캘린더를 구현했는데 시작요일에 1을 더해서 <code>grid-column-start</code>에 적용하면 해당 column에서 부터 grid가 시작된다.

### 2) check-in & check-out 표시하기

```js
const dateRef = useRef<{ [key: string]: HTMLDivElement }>({});

<DayWrap
  key={day}
  start={start}
  dayOfWeek={dayOfWeek}
  ref={ref => {
    if (ref !== null) dateRef.current[date] = ref;
  }}
>
  <Day dayOfWeek={dayOfWeek}>{day}</Day>
</DayWrap>
```

전체를 담을 Ref를 생성해서 각 날짜에 해당 날짜를 key로 ref를 만들었다. 이렇게 되면 이벤트가 발생되어 value받아서 해당 value를 key로 ref접근해서 clssName을 줘서 선택된것을 표시해주었다.

## 2. 반응형적용

캘린더는 웹/모바일 모양이 다르다. 웹 일때는 옆으로 넘기듯 달력이 표시되고, 모바일일때는 전체 월이 스크롤을 통해 넘어갈수 있게 되어있다. 모바일 형태가 내가 처음 구현한 스타일이라 어렵지 않게 바로 약간의 수정만 하고 형태를 맞출수 있었다. 웹 캘린더를 구현할때 조금 난관이 부딪혔다.

### 1) 웹 캘린더 구현하기

처음엔 슬라이드로 구현하면 되나 생각했는데 여러사이트를 참고해본결과 옆으로 넘어가듯 달력이 넘어가는 형태가 아닌 next 버튼을 클릭시 월의 데이터만 변경되듯 보였다. '그럼 state를 사용해야하나??' 생각해서 두개의 월을 state를 변경해주도록 구현해보았다. 이렇게 구현하니 내가 선택했던 날짜가 사라지고 이상하게 표시되었다. 이방법이 아닌면 css적으로 할수 있는 방법이 있지않을까 하는 생각에 방법을 찾다 css에 <code>order</code>라는 것을 알게되었다. <code>flex</code>를 사용한 컴포넌트에서 order를 통해 순서를 바꿀수 있다는 것이었다. 처음 시작월을 state로 관리해서 해당 월과 같으면 order : 1, 다음 월이면 order :2, 나머지는 order 3으로 적용했다.

```js
const MonthContainer = styled.div<{ page: number; month: number }>`
  margin-right: 30px;
  @media ${({ theme }) => theme.deviceSize.middle} {
    margin-right: 0;
  }
  @media (min-width: 820px) {
    order: ${({ page, month }) => {
      if (page === month) return 1;
      if (page + 1 === month) return 2;
      return 3;
    }};
  }
`;
```

### 2) 웹/모바일 캘린더 선택시 다른 로직

웹과 모바일이 캘린더 적용시 다음 로직이 다르다. 웹에서는 캘린더에서 날짜선택이 완료되면 인원을 check 할수 있도록 해달 modal이 open 된다. 모바일에서는 캘린더가 선택이 완료되더라도 적용버튼을 눌러야하며, 적용이 클릭시 바로 data 요청이 된다. 처음에는 css적으로 해결이 될듯하여 라이브러리를 사용하지 않았는데, 로직이 다르다보니 결국 viewport의 사이즈에 따라 로직이 처리가 달라질수있도록 함수를 구현해야했다. react-responsive를 사용할까 하다 width을 알수 있는 hook을 만들어 사용했다.

```js
function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
```

윈도우에 사이즈를 받아서 해당 width가 모바일이면 모바일 로직을 처리하도록 했다.

```js
const handleModal = (key: string, value: boolean) => {
  if (isWebWidth) {
    if (key === "focus") {
      return setIsOpenModal(() => ({ calendar: false, occupancy: false }));
    }
    if (key === "next")
      return setIsOpenModal(() => ({ calendar: false, occupancy: true }));
  }
  if (!isWebWidth) {
    if (key === "next") return;
    if (value) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }

  setIsOpenModal((isOpenModal) => ({ ...isOpenModal, [key]: value }));
};
```

## 3. Search Bar에 데이터 절달

Search Bar에서는 state를 생성하고 해당 state를 변경해주는 식으로 날짜를 전달했다.

```js
const [searchData, setSearchData] =
  useState <
  ISearchData >
  {
    calendar: {
      checkIn: locationQuery.checkIn,
      checkOut: locationQuery.checkOut,
    },
    occupancy: {
      adult: locationQuery.adult ? +locationQuery.adult : 2,
      kid: locationQuery.kid ? +locationQuery.kid : 0,
    },
  };
```

여기서 초기값은 query string에서 checkin/checkout을 가져오는데 만약 queery string에 값이 없으면 default 일주일 뒤에 값을 넣어준다.

캘린더에 setSearchDate를 전달해주는데 내가 컴포넌트를 잘못 분리한건지 props drilling이 발생했다. props로 전달해서 적용을 가능하지만 리팩토링이 필요한듯 했다.

## 배포

<a href="https://wanted-preonboarding-tripbtoz.vercel.app/">https://wanted-preonboarding-tripbtoz.vercel.app/</a>

<p align="center">
<img src="https://user-images.githubusercontent.com/92876884/185263602-18b8524b-a694-4b29-94f9-1bb9cd540637.png" alt="호텔 예약 사이트">
</p>
