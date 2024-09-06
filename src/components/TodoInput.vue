<template>
  <div class="todo-input">
    <input type="text" :placeholder="placeholder" v-model="inputValue">
    <button @click="handleClick">{{ props.btnText }}</button>
  </div>
  <Son />
</template>

<script setup>
console.log('this:', this) // undefined
import {ref} from 'vue'
import Son from './Son.vue'

// 调用 defineProps() 定义组件可接收属性
const props = defineProps({
  placeholder: String,
  btnText: {
    type: String,
    default: '添加',
  }
})

// 调用 defineEmits() 定义组件可触发事件
const emit = defineEmits(['add'])

const inputValue = ref('')
const handleClick = () => {
  console.log('接收到属性 placeholder:', props.placeholder)
  emit('add', inputValue.value)
}
</script>

<!-- <script>
{
  // props: [],
  // props: {},
  emits: [],
  emits: {},
}
</script> -->

<style scoped>

</style>
