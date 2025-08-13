<template>
  <div class="demo">
    <button @click="increment">increment</button>
    <span>{{ count }}</span>
    <button @click="decrement">decrement</button>
  </div>
</template>

<script setup>
import { useCounter } from '@agentX/hooks';

const { count, increment, decrement } = useCounter();
</script>

<style scoped lang="scss">
.demo {
  display: flex;
  flex-direction: column;

  span {
    text-align: center;
  }
}
</style>
