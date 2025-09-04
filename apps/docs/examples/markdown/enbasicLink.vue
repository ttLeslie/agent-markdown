<template>
  <AgentMarkdown :content="content" :href="false" @link-click="handleLinkClick" />
</template>
<script setup lang="ts">
import { AgentMarkdown } from '@useAgent/markdown';

const content = `
Hyperlink：[useAgent](https://.com "useAgent 官网")
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
