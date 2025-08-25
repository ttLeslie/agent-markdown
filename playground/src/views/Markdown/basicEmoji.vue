<template>
  <AgentMarkdown :content="content">
    <template #emoji="{ content }">
      <span>{{ content }}</span>
    </template>
  </AgentMarkdown>
</template>
<script setup lang="ts">
import { AgentMarkdown } from '@useAgent/markdown';

const content = `
:smile: :laughing: :kissing:
:blush:	 :smiley:	:relaxed:
:smirk:	 :heart_eyes:	 :kissing_heart:
:kissing_closed_eyes:	 :flushed:	 :relieved:
`;
</script>
<style scoped>
.markdown-body {
  font-size: 16px;
}
</style>
