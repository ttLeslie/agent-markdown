<template>
  <a-space>
    <VDialog v-model:open="open">
      <div>弹窗测试2222</div>
    </VDialog>
    <a-button @click="open = true"> 弹窗 </a-button>
  </a-space>
</template>

<script setup lang="ts">
import { VDialog } from '~/@agentX/ui';
import { ref } from 'vue';
console.log(VDialog);
const open = ref(false);
</script>
