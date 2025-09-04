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
import { AgentMarkdown } from 'agent-markdown-vue';
import MermaidComponent from '../component/MermaidComponent.vue';
const content = `

\`\`\`mermaid
pie
    "Media and Culture - related" : 35
    "Advertising and Marketing" : 8
    "Game Development" : 15
    "Film, Animation and Special Effects" : 12
    "Internet Product Design" : 10
    "VR/AR Development" : 5
    "Others" : 15
\`\`\`

`;
</script>
