<template>
  <AgentMarkdown :content="content">
    <!-- 通用的代码块渲染 -->
    <template #code="{ lang, rawCode }">
      <div class="custom-code-block" style="background: #f6f8fa">
        <div
          class="code-block-header"
          style="padding: 10px; background-color: #00000014; border-radius: 4px"
        >
          <span class="code-block-lang">{{ lang }}</span>
        </div>
        <pre style="padding: 10px"><code class="language-{{ lang }}">{{ rawCode }}</code></pre>
      </div>
    </template>
  </AgentMarkdown>
</template>
<script setup lang="ts">
import { AgentMarkdown } from '@useAgent/markdown';

const content = `

\`\`\`javascript
const code = "useAgent/markdown";
\`\`\`

`;
</script>
