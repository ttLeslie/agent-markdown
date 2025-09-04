<!-- basicCode.vue -->
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
// 保持原有脚本不变
import { AgentMarkdown } from '@useAgent/markdown';
const content = `
\`\`\`javascript
const code = "useAgent/markdown";
\`\`\`
`;
</script>

<style scoped>
/* 基础样式（亮色模式） */
.custom-code-block {
  overflow: hidden;
  background: #f6f8fa;
  border-radius: 6px;
}

.code-block-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #00000014;
}

.code-block-lang {
  font-size: 12px;
  color: #333;
}

pre {
  padding: 10px;
  margin: 0;
}

code {
  font-family: monospace;
  color: #333;
}

/* 暗黑模式样式 */
html.dark .custom-code-block {
  background: #1e1e1e; /* 深色背景 */
}

html.dark .code-block-header {
  background-color: #333; /* 深色头部背景 */
}

html.dark .code-block-lang {
  color: #ccc; /* 浅色文字 */
}

html.dark code {
  color: #e0e0e0; /* 代码浅色文字 */
}
</style>
