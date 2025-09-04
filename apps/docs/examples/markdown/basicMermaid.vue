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
    <template #mermaid="{ rawCode }">
      <MermaidComponent :content="rawCode" />
    </template>
  </AgentMarkdown>
</template>
<script setup lang="ts">
import { AgentMarkdown } from '@agent/markdown';
import MermaidComponent from '../component/MermaidComponent.vue';
const content = `

\`\`\`mermaid
pie
    "传媒及文化相关" : 35
    "广告与市场营销" : 8
    "游戏开发" : 15
    "影视动画与特效" : 12
    "互联网产品设计" : 10
    "VR/AR开发" : 5
    "其他" : 15
\`\`\`

`;
</script>
