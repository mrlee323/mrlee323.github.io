---
layout: post
title: "[Vue] Vue Components"
data: '2021-12-31'
category: [Vue]

---
## 기초

App.vue
```html
//html
  <MyBtn> Banana</MyBtn>
  <!-- MyBtn안에 내용은 MyBtn파일에 slot자리에 모두 들어간다.  -->
  <MyBtn 
    :color="color">
    <!-- v-bind 생략 color에 데이터 color (#000)들어옴- -->
    <span style="color:red">Banana</span>
  </MyBtn>
    <!-- span포함 모든 데이터가 slot자리에 들어간다. -->
  <MyBtn 
    large 
    color="royalblue">Apple</MyBtn>
    <!-- class에 large추가로 large에 해당하는 속성으로 변경 -->
  <MyBtn>Cherry</MyBtn>
  <button>Banana</button>
```
```js
//vue
import MyBtn from '~/components/MyBtn'
//  MyBtn 연결
export default {
  components: {
    MyBtn
    // MyBrn 컴포넌트 연결 
  },
  data() {
    return {
      color: '#000'
    }
  }
}
```
MyBtn.vue
```html
//html
  <div 
    :class="{ large }"
    :style="{ backgroundColor: color}"
    class="btn">
    <slot></slot>
    <!-- 이자리로 MyBtn이 들어옴 -->
  </div>
```
```js
//vue
export default {
  props: {
    color: {
      type: String,
      default: 'grey'
    },
    large: {
      type: Boolean,
      default: false
    }
  }

}
```
```css
//css
<style scoped lang="scss">
/* scss 적용 */
 .btn{
   display: inline-block;
   margin: 4px;
   padding: 6px 12px;
   border-radius: 4px;
   background-color: gray;
   color: #fff;
   cursor: pointer;
   line-height: 1.4;
   &.large{
      font-size: 20px;
   padding: 10px 20px;
   }
 }
</style>
```
## 속성 상속

App.vue
```html
//html
<MyBtn 
  class="heropy"
  style="color: red"
  title="Hello World!">
  <!-- 자식요소가 한개일때 class명이 상속된다. 자식요소가 두개이상이면 적용이 안된다. -->
  Banana
</MyBtn>
```
MyBtn.vue
//html
```html
<div class="btn">
  <slot></slot>
  <!-- 데이터들어가는자리 -->
</div>
<h1 v-bind="$attrs"></h1>
<!-- 속성 한번에 적용하기 v-bind 약어없이 전부 작성 -->
<!-- <h1 
    :class="$attrs.class"
    :style="$attrs.style"></h1> -->
```
```js
<script>
export default {
  inheritAttrs: false,
  // 상속 속성 false 상속하지 않겠다.
  // 원래는 App.vue의 속성을 상속받는다.
  created(){
    console.log(this.$attrs)
    // 여기서 this.attrs는 App.vue에서 MyBtn에 적용된 속성들을 말한다. 
  }
}
</script>
```
## Emit
App.vue
```html
//html
<MyBtn 
  @heropy="log" // $event를 log메소드에 넘겨준다.
  @change-msg="logMsg"> // this.msg를 logMsg로 넘겨준다.
  Banana
</MyBtn>
```
```js
<script>
import MyBtn from '~/components/MyBtn3'

export default {
  components: {
    MyBtn
  },
  methods: {
    log(event) {//event를 받은 log 메소드는 click!!과 event를 보여준다. 
      console.log('click!!')
      console.log(event)
    },
    logMsg(msg){//this.msg를 console.log로 보여준다. 
    //그때그때 바뀌는 데이터가 감지되어 콘솔로 보여진다.
      console.log(msg)
    }
  }
}
</script>
```
MyBtn.vue
```html
//html
  <div class="btn">
    <slot></slot>
  </div>
  <h1 @dblclick="$emit('heropy', $event)">ABC</h1>
  <!-- h1을 더블 클릭시 이벤트감지 heropy에게 $event를 넘겨준다. -->
  <input 
    type="text"
    v-model="msg" />
    <!-- input 요소의 양방향 데이터 msg -->
```
```js
<script>
export default {
  emits: [
    'heropy',//이벤트 감지
    'changeMsg'
  ],
  data () {
    return{
      msg: ''//msg 초기값
    }
  },
  watch: {//msg 지켜보기
    msg() {//msg변경이 일어나면 changeMsg에 this.msg를 넘겨준다.
      this.$emit('changeMsg', this.msg)
    }
  }
}
</script>
```
### slot
약어
- v-bind: => :
- v-on: => @
- v-slot: => #

```
<slot>Apple</slot>은 MyBtn에 내용이 없을 경우 default로 보여지지만 MyBtn에 데이터가 있을경우 대체되어진다. 
```
App.vue
```html
//html
<MyBtn> 
    <template #icon>
      <!-- # v-slot:의 약어 -->
      <span>(b)</span> 
    </template>
    <template #text>
      <span>Banana</span>
    </template>
  </MyBtn>
  <!-- 순서가 뒤바뀌어도 MyBtn의 셋팅대로 보여진다. -->
```
MyBtn.vue
//html
```html
<div class="btn">
   <slot name="icon"></slot>
   <slot name="text"></slot>
 </div>
```

## Provide, Inject
App.vue
```html
<template>
  <button @click="message = 'Good?'">Click!</button>
  <h1>App: {{ message }}</h1>
  <!-- App.vue의 message -->
  <Parent />
  <!-- parent에서 가져온다 -->
</template>
```
```js
<script>
import Parent from '~/components/Parent'
import { computed } from 'vue'

export default {
  components: {
    Parent
  },
  data(){
    return{
      message: 'Hello Future!!'
    }
  },
  provide(){
    return {
      msg: computed(() => this.message)
      //msg라는건 메시지의 계산된 값만 보내는것
    }
  }
}
</script>
```
Parent.vue
```html
<template>
  <Child />
  <!-- Child한테 가져온다 -->
</template>
```
```js
<script>
import Child from '~/components/Child'
export default {
  components: {
    Child
  }
}
</script>
```
Child.vue
```html
<template>
  <div>
    child: {{ msg.value }}
    <!-- child의 데이터 msg는 어디서? -->
    <!-- App.vue가준 msg는 computed된 값중 value를 찾아서 대입 -->
  </div>
</template>
```
```js
<script>
export default {
  inject: ['msg']
  // msg 데이터를 받는다 
}
</script>
```
## ref(reference)

ref는 화면을 표시할때 사용하기때문에
화면이 표시된직후의 mounted에서는 사용할 수 있지만, 구성만되어진 created의 직후에는 undefined값을 가진다. 

App.vue
```html
<template>
  <Hello ref="hello"/>
</template>
```
```js
<script>
import Hello from '~/components/Hello'
export default {
  components: {
    Hello
  },
  mounted() {
    console.log(this.$refs.hello.$el)//<h1>hello~</h1>
    // 요소가 1개일때
    console.log(this.$refs.hello.$refs.good)//<h1>Good</h1>
    //요소가 2개일때
  }
}
</script>
```
Hello.vue
```html
<template>
  <h1>hello~</h1>
  <h1 ref="good">Good</h1>
</template>
```
