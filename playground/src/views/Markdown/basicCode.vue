<template>
  <AgentMarkdown :content="content">
    <template #code="{ lang, rawCode }">
      <div class="custom-code-block">
        <div
          class="code-block-header"
          style="padding: 10px; background-color: #00000014; border-radius: 4px"
        >
          <span class="code-block-lang">{{ lang }}</span>
        </div>
        <pre><code class="language-{{ lang }}">{{ rawCode }}</code></pre>
      </div>
    </template>
  </AgentMarkdown>
</template>
<script setup lang="ts">
import { AgentMarkdown } from '@useAgent/markdown';

const content = `
## 自定义代码块样式

\`\`\`javascript
const code = "Element-Plus-X";
\`\`\`

`;
</script>
<style scoped>
.markdown-body {
  font-size: 16px;
}
</style>
