---
layout: post
title: "[React] 원티드 프리온보딩 사전과제 리팩토링"
data: '2021-07-07'
category: [React]
---

## 1. Login input 최적화

- login 구현에서 ref를 사용해서 최적하는것이 과제였다. ref로 구현을 했지만 state를 사용했을때와 렌더링에 차이가 없어 제대로 구현한게 맞는가 하는 의구심이 들었다. 


### useValidation

```js
import { useState } from 'react';
import validation from '../utils/validation';

const useValidation = (email_ref, password_ref) => {
  const [isValidation, setIsValidation] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    const { id, value } = e.target;

    id === 'email'
      ? (email_ref.current = value)
      : (password_ref.current = value);

    if (isValidation[id] === '')
      setIsValidation((isValidation) => ({ ...isValidation, [id]: false }));

    setIsValidation((isValidation) => ({
      ...isValidation,
      [id]: validation(id, value),
    }));
  };

  return { isValidation, onChange };
};

export default useValidation;
```

login구현할때 validation 할때 hook으로 만들어서 구현했다. onChange를 통해 validation state값을 변경해주는데 처음 구현했을때에는 input의 value가 바뀔때마다 state가 변경이 일어나서 ref를 사용했다고해서 렌더링이 달라지지 않았다. 

```js
const onChange = (e) => {
  const { id, value } = e.target;

  id === 'email'
    ? (email_ref.current = value)
    : (password_ref.current = value);

  if (isValidation[id] === '')
    setIsValidation((isValidation) => ({ ...isValidation, [id]: false }));

  if (isValidation[id] === validation(id, value)) return;

  setIsValidation((isValidation) => ({
    ...isValidation,
    [id]: validation(id, value),
  }));
};

```

해설을 참고하니 딱 한줄의 코드만 추가하면 렌더링을 최적화할수 있었다. 
<code>if (isValidation[id] === validation(id, value)) return</code> 이 코드를 중간에 넣어주면서 validation의 boolean타입이 바뀔때에만 state를 변경해주면서 value에 값이 변경될때 false가 연속으로 반환될때 변경이 없다가 true가 되면 그때 state가 변경되는 구조이다. 다시 value가 true에서 다시 false값으로 변경되면 state값도 false로 변경된다. 

항상 input을 구현할때 state를 사용해서 구현했는데, 그때마다 렌더링을 어떻게 최적화할까 고민을 많이 했던것 같다. ref는 focus나 blur처리할때만 사용했었는데 이렇게 최적화할때 사용할 수 있다는게 새로웠다. 

## 2. 반응형 theme로 적용

처음 반응형을 구현할때 적용할 부분에 각각 media 를 사용해서 구현했다. 이 부분을 styled-component에 ThemeProvider를 사용하여 리팩토링을 했다. 또 공통을 사용되는 색상이나 css 요소들을 theme으로 관리하여 각 컴포넌트에서 styled-component로 props로 받아서 사용했다.

### index.js
```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
```

### theme.js

```js
const color = {
  active: '#0095f6',
  disabled: '#b2dffc',
};

const size = {
  mobile: '650px',
};

const media = {
  max: `(max-width: ${size.mobile})`,
  min: `(min-width: ${size.mobile})`,
};

const border = {
  main: '1px solid #ccc',
  sub: '1px solid #eee',
};

export const theme = {
  color,
  size,
  media,
  border,
};
```

### CommentInput.js
```js
...

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 13px;
  margin-top: 8px;
  border-top: ${({ theme }) => theme.border.sub};
`;

...
```

## 3. login 인증 hook으로 생성 

validation은 hook으로 구현했는데, login과 logout은 필요한 부분에서 함수를 만들어서 사용했었다. 그렇다보니 중복되는 코드들이 있었고 이를 리팩토링하고자 custom hook을 만들었다.
hook을만들어서 localstorage에서 얻은 유저정도, login function, logou function을 return 시켜서 필요한 컴포넌트에서 가져다가 사용했다.

과제 해설을 보니 context를 사용하여 login정보를 provider로 자식컴포넌트에서 사용할수 있도록 구현되어있었다. 내가 구현한 인증부분에서는 state관리를 하지 않아서 custom hook으로만 구현 하는 방향을 진행했다. 


### useAythenticated.js

```js
import React, { useCallback, useMemo } from 'react';
import signIn from '../utils/signIn';

const useAuthenticated = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem('user'));

  const login = (email, password) => {
    try {
      signIn(email, password);
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: email,
          password: password,
        })
      );
    } catch (e) {
      alert('이메일 또는 비밀번호가 일치하지 않습니다');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    alert('로그아웃되었습니다');
  };

  return { isAuthenticated, login, logout };
};

export default useAuthenticated;

```

## 4. image onload를 사용한 feed load 

이 과제를 하면서 onload를 처음 접해서 이런기능이 있다는걸 이번에 알게되었다. 과제를 하면서 onload에 대해 공부하고 어떤 기능인지는 어느정도 공부가 되었는데 이상하게 적용하면 내가 원하는대로 구현이 안됐다. 나중에 보니 애초에 내가 접근을 잘못했던 거였다.

나느 onload를 통해서 isLoading에 state를 false로 변경해주는 코드를 작성했는데 내가 구현한 방식으로하면 화면이 전혀 보이지 않았다. 그이유가 isLoading을 통해 랜더 자체를 막아버렸기때문이었다.

### FeedFrom.js
```js
const FeedForm = ({ feed }) => {
  const { id, profile, content, url, like } = feed;
  const [isLoading, setIsLoading] = useState(true);

  return (
    {!isLoding  &&
     (<Container >
      <Header>
        <Profile>
          <ProfileImage src={profile} alt="profile" />
          <Id>{id}</Id>
        </Profile>
        <MoreHorizOutlinedIcon />
      </Header>
      <Image src={url} alt="img" onLoad={() => setIsLoading(false)} />
      <Icon>
        <IconWrap>
          <FavoriteBorderOutlinedIcon />
          <MapsUgcOutlinedIcon />
          <SendRoundedIcon />
        </IconWrap>
        <BookmarkBorderOutlinedIcon />
      </Icon>
      <Like>좋아요 {like}개</Like>
      <ContentWrap>
        <ContentId>{id}</ContentId>
        <Content>{content}</Content>
      </ContentWrap>
      <Comment />
    </Container>)
    }
  );
};
```

isLoding으로 인해 랜더링이 자체가 안돼서 image에 있는 onload function이 실행되지 않았다.그래서 화면이 전체가 나오지 않았던거였는데 나는 접근 자체가 잘못되었다는 생각을 못하고 이미지 태그만 제외하고 나머지 부분을 isLoading에따라 랜더링이 되도록 구혔했다. 수정을 하면서도 이상하다는 생각을 했는데 막상 어떻게 해야할지몰라서 조건에 맞게는 된것같아 그대로 제출 했었다.

나중에 보니 css로 display값만 변경해주면 되는 거 였다. feed를 감싸고 있는 container에 props로 isLoading을 주고 styled-compoenent에서 받아서 isLoading에 value에 따라 none을 할것인지 block을 할것이지 만 적용해주면 됐다. 

```js
const Container = styled.div`
  display: ${({ isLoading }) => (isLoading ? 'none' : 'block')};
  width: 500px;
  margin: 10px auto;
  background-color: #fff;
  border: ${({ theme }) => theme.border.main};
  @media (max-width: 650px) {
    width: 100vw;
  }
`;
```

## 마무리

input 최적화도그렇고 onload도 구현할때 뭔가 조금씩 부족한부분이 있었는데 해설을 보니 구현은 얼추 비슷하게 된것같아보였다. 성능면에서는 많은 차이가 있어보였다. 공부를하면서 하나하나 구현을 하다보니 그 쓰임새를 제대로 파악하지않고 구현에 급급했던게 아니었나 싶다. 성능면에서는 아쉬움이 크지만 이런 경험을 통해서 앞으로 좀 더 나은 구현을 할 수 있다고 생각한다. 

