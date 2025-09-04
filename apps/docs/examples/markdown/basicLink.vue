<template>
  <AgentMarkdown :content="content" :href="false" @link-click="handleLinkClick" />
</template>
<script setup lang="ts">
import { AgentMarkdown } from 'agent-markdown-vue';

const content = `
超链接：[agent-markdown](https://ttleslie.github.io/agent-markdown/ "agent-markdown 官网")
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
