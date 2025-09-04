<template>
  <AgentMarkdown :content="content">
    <template #code="{ lang, rawCode }">
      <div class="custom-code-block">
        <div class="code-block-header">
          <span class="code-block-lang">{{ lang }}</span>
          <button class="copy-btn">复制</button>
        </div>
        <pre><code class="language-{{ lang }}">{{ rawCode }}</code></pre>
      </div>
    </template>
  </AgentMarkdown>
</template>

<script setup lang="ts">
import { AgentMarkdown } from 'agent-markdown-vue';
const content = `
\`\`\`javascript
const code = "agent-markdown-vue";
\`\`\`
`;
</script>
