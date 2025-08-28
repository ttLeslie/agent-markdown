<template>
  <AgentMarkdown :content="content">
    <template #image="{ src, alt, title }">
      <div class="custom-image-block">
        <img :src="src" :alt="alt" :title="title" />
        <div class="custom-image-caption">title ：{{ title }}</div>
        <div class="custom-image-alt">alt：{{ alt }}</div>
      </div>
    </template>
  </AgentMarkdown>
</template>
<script setup lang="ts">
import { AgentMarkdown } from '@AgentMarkdown/markdown';

const content = `

![示例图片](https://element-plus-x.com/logo.png "一张示例图")


`;
</script>
