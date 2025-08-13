<template>
  <div class="utils-list">
    工具函数汇总：
    <a-space direction="vertical">
      <div v-for="item in allUtils" :key="item.name">
        <div>{{ item.name }}()</div>
      </div>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import * as utils from '@agentX/utils';

const allUtils = Object.entries(utils).map(([name, fn], index) => {
  return {
    name,
    fn,
    index,
  };
});

console.log(`allUtils -->`, allUtils);
</script>
