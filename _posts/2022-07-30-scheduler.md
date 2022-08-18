---
layout: post
title: "[React] 원티드 프리온보딩 스케줄러 "
data: "2021-07-30"
category: [React]
---

스케줄러는 개인프로젝트로 일주일간 강의 스케줄을 추가하고 삭제할수 있고, 리스트를 중복없이 관리할수 있도록 스케줄러를 만드는 것이다.

이전까지 기능을 구현할때 구현에 초점을 맞춰 하나하나 추가하면서 코드를 작성하다보니, 코드가 길어지고, 로직도 복잡해졌다. 그러다보니 가독성도 떨어지고 중복되는 코드들도 많았다.

그래서 이번에는 각 컴포넌트에 기능에 초점을 맞춰 컴포넌트를 먼저 구현하고 하나하나 조립해서 사용하듯 구현을 했다. 이렇게 컴포넌트에 초점을 맞춰서 코딩을 하다보니 컴포넌트 자체에 기능을 파악하고 어떻게 방향을 잡아야할지 명확했다.

<p align="center">
 <img width='100%' src="https://user-images.githubusercontent.com/92876884/185265631-f6d12212-860c-4026-bffb-4302288325f1.gif" alt="스케줄생성" >
</p>

## 1. 공통 컴포넌트 구현

AM/PM은 둘중 하나를 선택하기때문에 radio로 요일의 경우 체크된 값을 사용하기때문에 checkbox로 만들었다. 처음부터 컴포넌트별로 구현하지 않았다면 일단 div를 사용해서 구현하고 state로 각 컴포넌트 값을 관리 했을 것이다. 이렇게 기능에 맞게 컴포넌트를 구현하니 불피요한 추가적인 state나 로직들이 사라졌다. 또한 재사용을 할수 있도록 구현해서 중복코드없이 여러개 컴포넌트를 만들수 있었다.

```js
function CheckBox({ id, children }: ICheckBoxProps) {
  return (
    <>
      <Input type="checkbox" id={id} />
      <Label htmlFor={id}>{children}</Label>
    </>
  );
}

function RadioBox({ id, name, children }: IRadioBoxProps) {
  return (
    <>
      <Input type="radio" id={id} name={name} />
      <Label htmlFor={id}>{children}</Label>
    </>
  );
}
```

radio와 checkbox의 value는 감싸는 컴포넌트에 onChange 이벤트를 걸고 이벤트 버블링 이용해서 event.target의 value를 Ref에 전달했다.

```js
  const selectRef = useRef<{ [key: string]: number }>({});
  const radioBoxRef = useRef<string>('');
  const checkBoxRef = useRef<string[]>([]);
```

select부터 radio와 checkbox 모두 Ref에 값을 전달하므로 별도에 렌더링이 없이 값을 변경할수 있다.

## 2. 스케줄 중복 확인

이번 프로젝트에서 내가 가장 많은 고민을 한 부분이다. 새로 스케줄이 생성될때 db에 있는 스케줄과 중복을 확인이 필요했다. 고민을 오래하게 된것은 이것을 client에서하는가 server에서 하는가를 고민했다. 결론은 server에서 하는게 맞다는 생각이 들었다. client단에서 모든 데이터를 불러와서 비교하는 것은 비효율적이란 생각이 들었다. server에 데이터를 요청하기때문에 server에서 특정 데이터를 요청했을때 해당값이 있는지 없는지 확인하는 것이 맞다는 생각이 들었다.

json-server를 이번 과정에서 처음 사용해보는 것이어서 get요청시 query string을 어떻게 조건을 주어야하는지를 하나하나 공부하며 코딩을 했다.

특정 시간을 찾고 싶은데 PM에서 AM으로 넘어가는것을 어떻게 처리해야할지 방법을 찾지 못했다. 아무리 찾아도 해결이 되지않았는데, 한참후에야 내가 구현 조건에 PM 11시까지만 스케줄생성이 된다는 조건이 있었다. PM 11시 이후에 스케줄 생성시 Error 처리하면 금방해결되는 문제였다.

- 중복확인

```js
export const getFilterSchedules = async (
  start: string,
  end: string,
  week: string[]
) => {
  const weeks = week.join("|");
  const response = await axios.get(
    `${BASE_URL}/schedules?day_like=${weeks}&time_gte=${start}&time_lte=${end}`
  );
  const duplicatedDay = [
    ...new Set(
      response.data.map((data: { day: string }) => dayOfWeek[data.day])
    ),
  ].join(",");

  if (response.data.length > 0)
    throw new Error(`${duplicatedDay}에는 이미 해당 시간에 스케줄이 있습니다`);
};
```

요일 또한 어떻게 처리해야 할 지 몰라서 해당시간 데이터를 불러와서 겹치는 요일이 있는지를 client쪽에서 했는데, 나중에 갑자기 like를 사용하면 되지않을까 하는 생각에서 대입해봤는데 내가 원하는 대로 get요청이 이루어졌다.

시간과 요일을 인자로 넘겨서 해당요일과 해당시간을 get요청해서 response 값이 있다면 Error처리 해서 문제를 해결했다. 완성된 코드에서는 axios 요청하는 query string가 정말 짧은데 이 짦은 코드 하나를 생각해내는데 오랜 시간이 걸렸다.

## 3. 스켈줄 생성 post 요청

```js
export const postSchedules = async (data: ISchedule[]) => {
  const request = data.map((schedule) =>
    axios.post(`${BASE_URL}/schedules`, schedule)
  );
  await axios.all(request);
};
```

DB에 데이터는 각 스케줄별로 생성되기때문에 요일이 여러개 일때에는 여러번 post 요청해야했다.

```json
{
  "schedules": [
    {
      "id": 11,
      "day": "Thu",
      "time": "02:30"
    },
    {
      "id": 12,
      "day": "Fri",
      "time": "02:30"
    },
    ...
]}
```

처음에는 간단하게 생각해서 map을 사용해서 post를 요청했는데 이 방법으로 하면 모든 post가 요청되기 전에 react-query에서 업데이트를 해버리는 바람에 오류가 발생했다. 또한 axios를 여러개 요청할때에는 내가했던 map을 이용해서 여러번 요청하는 방법도 옳지 못한 방법이었다.

axios로 여러번 요청 할 경우 <code> axios all</code>을 사용해서 한번에 요청하는 방법으로 해야했다. react query에서도 mutatation에서 mutate를 사용했는데 <code>muatateAsync</code>를 사용해서 모든 요청이 완료되면 mutate가 되도록 수정해주었더니 에러없이 정상적으로 post요청이 이루어지고 업데이트가 되었다.

## 배포

<a href="https://wanted-preonboarding-engall-et4tyq424-jiehoonpark.vercel.app/">https://wanted-preonboarding-engall-et4tyq424-jiehoonpark.vercel.app/</a>

<p align="center">
<img src="https://user-images.githubusercontent.com/92876884/185266709-87e0cb08-8378-4766-b7d9-47409d38b9a4.png" alt="스케줄러">
</p>
