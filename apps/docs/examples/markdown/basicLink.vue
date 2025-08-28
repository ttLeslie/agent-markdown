<template>
  <AgentMarkdown :content="content" :href="false" @link-click="handleLinkClick" />
</template>
<script setup lang="ts">
import { AgentMarkdown } from '@AgentMarkdown/markdown';

const content = `
超链接：[useAgent](https://element-plus-x.com "useAgent 官网")
`;

const handleLinkClick = (e: Event, href: string, title: string) => {
  console.log(e, href, title);
};
</script>
<style scoped>
.markdown-body {
  font-size: 16px;
}
</style>
