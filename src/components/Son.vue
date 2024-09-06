<template>
  <div class="son">
    TodoInput 的孩子组件
    <div>
      使用 app 组件中提供的 message: {{ msg }}
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const msg = inject('message')
</script>

<style lang="scss" scoped>

</style>
