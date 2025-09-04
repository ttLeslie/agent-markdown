<template>
  <AgentMarkdown :content="content">
    <template #image="{ src, alt, title }">
      <div class="custom-image-block">
        <div class="custom-image-caption">{{ title }}</div>
        <img :src="src" :alt="alt" :title="title" />
      </div>
    </template>
  </AgentMarkdown>
</template>
<script setup lang="ts">
import { AgentMarkdown } from '@useAgent/markdown';

const content = `![An example image](https://thaka.bing.com/th/id/OIP.aBW9fjZTNtddeFpYAzcgJwHaLB?&rs=1&pid=ImgDetMain&o=7&rm=3 "An example image")`;
</script>
