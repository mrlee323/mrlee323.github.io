---
layout: post
title: "[React] 리액트 컴포넌트 스타일링 "
data: '2022-01-09'
category: [React]

---

## CSS module, SASS module

classnames 지정을 간편하게 

```
npm install classnames
```
Button.jsx
```js
import React from "react"
import styles from './Button.module.css'//button의 css를 모듈화
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)// classnames에서 css.moudle을 지정하기위해 

console.log(cx('button', 'loading'))
class Button extends React.Component {
  state = {
    loading: false
  }
  render() {
    console.log(classNames('foo', 'bar', 'baz')) //foo bar baz
    console.log(classNames({ foo: true }, { bar: false })) //foo
    console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')) //bar 1
    console.log(classNames(styles['button'], styles['loading'])) //Button_button__q7y66 Button_loading__Oy4o5

    const { loading } = this.state;

    return <button
      onClick={this.startLoading}
      className={cx('button', { loading })} //className button과 true 일때만 나타나는 loading
      {...this.props}
    />
  }

  startLoading = () => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 1000)
  }
}

export default Button;
```
## Styled Component
스타일지정을 간편하게 
```
npm i styled-components
```
App.js
```js
<StyledButton>버튼</StyledButton>
```
StyleButton.jsx
```js
import styled from 'styled-components'
//문자열로 오타를 잡아주지않는다. 타이핑을 신경써서해야함
const StyledButton = styled.button`
background: transparent;
border-radius: 3px;
border: 2px solid palevioletred;
color: palevioletred;
margin: 0 1em;
padding: 0.25em 1em;
font-size: 20px;
`;

export default StyledButton
```
StyleButton에서 일부속성 변경
```js
import styled, { css } from 'styled-components'

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 20px;

  ${props => props.primary && //<StyledButton primary>버튼</StyledButton>적용
    css`
      background: palevioletred;
      color: white;
  `}
`;
export default StyledButton
```
App.js
```js
import logo from './logo.svg';
import styles from "./App.module.css"
import Button from './components/Button'
import StyledButton from './components/StyledButton';
import styled, { createGlobalStyle } from "styled-components"
import StyledA from './components/StyledA'

//PrimaryStyledButton생성해서 StyleButton스타일적용하고 일부분 변경
const PrimaryStyledButton = styled(StyledButton)`
  background: palevioletred;
  color: white;
`

// as로 태그 적용가능
//<StyledButton as="a" href="/">버튼</StyledButton>
//<StyledButton as={UppercaseButton}>button</StyledButton>
const UppercaseButton = props => <button {...props} children={props.children.toUpperCase()}/>

const MyButton = props => <button {...props} children={`MyButton ${props.children}`}/>

//style-component를 이용해서 MyBUtton에 속성적용
//<styledMyButton color="white">적용할수 있음
const StyledMyButton = styled(MyButton)`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${props => props.color || " palevioletred"};
  color: ${props => props.color || " palevioletred"};
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 20px;

  :hover {
    border: 2px solid red;
  }
  ::before {
    content:"@";
  }
`
//global 속성
const GlobalStyle = createGlobalStyle`
  button {
    color: yellow;
  }
`
```
StyledA.jsx
```js
import styled from "styled-components";
//<StyledA href="https://google.com" >태그</StyledA>
//attrs를 통해서 태그 속성을 지정할 수 있다. 
const StyledA = styled.a.attrs(props => ({ target: "_BLANK" }))`
  color: ${(props) => props.color};
`
export default StyledA
```
## React Shadow
다른 영향을 받지않는 독립적인 공간
```
npm i react-shadow
```
장점은 독립적이지만 단점은 공통적으로 주고싶은 속성또한 중복작성 해서 적용해줘야한다. 

```js
import root from "react-shadow"

const styles = ``

 <root.div> //여기 안에있는 태그들은 다른 css의 영향을 받지 않고 오직 styles의 영향을 받는다.
  ...
  <style type="text/css">{styles}</style>
 </root.div>
```
## Ant Design
```
npm i antd
```
전역
```js
import 'antd/dist/antd.css'//index.js
import { datePicker } from 'antd'//App.js
```
분할
```js
import DatePicker from 'antd/es/date-picker';
import 'antd/es/date-picker/style/css
```
icons
```
npm install --save @ant-design/icons
```
```js
import{ GithubOutlined } from "@ant-design/icons"

<GithubOutlined />
```
Row,Col
```js
import { Row, Col } from 'antd';

<Row>
  <Col span={12} style={colStyle()} />
  <Col span={12} style={colStyle()} />
  //Col 전체 24이므로 12는 2등분
</Row>
```
gutter  
columm 사이에 gutter만큼 건너뛰기  
`<Row gutter = {16+8n의 정수}>`
```js
<Row gutter={16}>
  <Col span={12} />
  <Col span={12} />
  //Col 전체 24이므로 12는 2등분
</Row>
```
offset  
`<Col offset ={24중 건너띄고 싶은 정수} />`
```js
<Col span={12} offset={12} /> //offset 12만큼 공백
```
justify/ align  
`<Row type="flex" justify="좌우정렬" align="위아래정렬" />`  
star | center | end | space-between | space-around | top | middle | bottom