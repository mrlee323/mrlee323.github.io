---
layout: post
title: "[Vue] Vue.js Composition"
data: '2022-01-03'
category: [Vue]

---

## 반응성

```js
export default {
  data() {
    return {
      message: 'Hello Future!!',
      count: 0
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    },
    reverseMessage() {
      return this.message.split('').reverse().join('')
    }
  },
  methods: {
    increase() {
      this.count += 1
    }
  } 
}
```
위 코드는 mesaage를 다루는 코드와 count를 다루는 코드가 섞여있어 직관적이지 못하며, 코드가 복잡해질수록 더 보기 어려워 진다.
이를 해결할 수 있는 방법은 vue에서 제공하는 setup메소드이다.

```js
import {  ref, computed} from 'vue'
export default {
  setup() {
    const message = ref('Hello Future!')
    const reverseMessage = computed(() => {
      return message.value.split('').reverse().join('')
    })

    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increase() {
       count.value += 1
    }
    
    return {
      message,
      reverseMessage,
      count,
      doubleCount,
      increase
    }
  }
}
```
setup을 사용하면 데이터의 반응성이 없다. 반응성이 있게 만들어주려면 데이터에 ref()를 사용하여 객체데이터로 반환해준다. 객체데이터 반환으로 데이터로 바로 사용할 수 없으므로 increase함수에 count를 `count.value`로 사용해야한다. 

```html
<template>
  <h1 @clcik="increase">
    {{ count }}
  </h1>
  <h1 @click="changeMessage">
    {{ message }}
  </h1>
</template>
```
```js
<script>
import { ref, computed, watch, onMounted } from 'vue'
export default {
  setup(){
    const count = ref(0)//반응성을 위한 ref()
    const doubleCount = computed(() => {
      return count.value * 2// count는 객체 값을 가져오려면 .value를 붙여야함
    })
    function increase() {
      count.value += 1
    }

    const message = ref('Hello Futuer!!')
    const reversedMessage = computed(() => {
      return message.value.split('').reverse().join('')
    })
    watch(message, newValue => {
       console.log(newValue)
    })
    function changeMessage() {
      message.value = 'Godd?!'
    }
    console.log(message.value)
    // created는 import 하지 않고 사용할 수 있다.
    // setup이라는 메소드 가 beforeCreated랑 created 사이에서 실행되기때문에 created는 setup안 어디든 사용할수 있다.

    onMounted(() => {
      console.log(count.value)
    })
    //mounted는 import로 가져올때 onMounted로 가져와야함

    return {
      count,
      doubleCount,
      increase,
      message,
      changeMessage,
      //실행되기 위해서는 return을 시켜줘야함 
    }
  }
}
</script>
```

## props, context
```html
<template>
  <!-- v-bind="$attrs App.vue 상속 -->
  <div
    v-bind="$attrs"
    class="btn"
    @click="hello">
    <slot></slot>
  </div>
</template>
```
```js
<script>
import { onMounted } from 'vue'
export default {
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default : 'gray'
    }
  },
  emits: ['hello'],
  //hello event 받아옴
  setup(props, context) {
    //setup안에서는 this를 사용할 수 없음 
    //데이터를 가르키는 props를 사용하거나
    //context를 사용함
    //context는 $를 제거하고 붙여준다. 
    function hello() {
      context.emit('hello')
      //this.$emit('hello')
    }
    onMounted(()=> {
      console.log(props.color)
      console.log(context.attrs)
      //this.$attrs  -> context.attrs
    })
    return{
      hello
    }
  }
}
</script>
```