<template>
  <VDialog v-model:open="open">
    <div>弹窗测试2222</div>
  </VDialog>
  <button @click="open = true">弹窗</button>
</template>

<script setup lang="ts">
import { VDialog } from '@useAgent/ui';
import { ref } from 'vue';
const open = ref(false);
</script>
<style scoped lang="scss">
button {
  all: revert;
}
</style>
