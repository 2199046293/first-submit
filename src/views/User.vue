<template>
  <div class="user">
    用户页面

    <button @click="$router.push('/about')">跳转到关于页面</button>
    <button @click="jump">跳转关于</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

// 调用 useRouter() 函数，其返回值为路由 router 对象实例
// 等价于选项式 API 中的 $router
const router = useRouter()

// 调用 useRoute() 函数，返回当前激活的路由信息
// 等价于选项式 API 中的 $route
const route = useRoute()

console.log('接收到的参数数据:', route.query)

const jump = () => {
  router.push('/about')
}
</script>

<style lang="scss" scoped>

</style>
