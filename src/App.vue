<template>
  <div class="app">
    App
    <hr>
    {{ message }}
    <button @click="handleClick">修改message</button>
    <hr>
    <NavBar />

    <hr>
    app 组件接收到 todo-input 传递的数据: {{ receive }} <br>
    <TodoInput placeholder="请输入新待办事项" btnText="新增待办事项" @add="handleAdd" />

    <hr>
    <div>
      <router-link to="/">首页</router-link> |
      <router-link to="/user?username=xiaoming&password=123456">用户</router-link> |
      <router-link to="/about">关于</router-link> |
    </div>
    <router-view />
  </div>
</template>

<!-- <script>
import { ref } from 'vue'

export default {
  name: 'App',
  // 组合式 API 的入口
  setup() {
    const message = ref('Hello Vue')

    return {
      message
    }
  },
  components: {}
}
</script> -->

<!-- setup 语法糖 -->
<script setup>
import { ref, onMounted, onUpdated, provide } from 'vue'
// 顶层引入的组件，可直接在模板中进行渲染(内部会自动实现局部组件的注册)
import NavBar from './components/NavBar.vue'

import TodoInput from './components/TodoInput.vue'

// 定义在顶层的变量，可直接在模板语法中使用
const message = ref('Hello Ref...')
const handleClick = () => {
  message.value = Math.random().toString()
}

// 将祖先组件中的数据提供给后代组件共享使用
provide('message', message)

const receive = ref('')
const handleAdd = (data) => {
  receive.value = data
}

onMounted(() => {
  console.log('app mounted...')
})

onUpdated(() => {
  console.log('app updated...')
})
</script>

<style scoped>

</style>
