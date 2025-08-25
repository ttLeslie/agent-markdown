<template>
  <AgentMarkdown
    :content="content"
    :md-options="{
      breaks: true,
      html: true,
    }"
    :sanitize="true"
  >
    <template #htmlInline="{ tags, attrs }">
      <span>
        <span
          v-if="tags === 'span' && attrs[0].type === 'quote'"
          style="
            padding: 0.2rem 0.4rem;
            font-size: 10px;
            color: #00000080;
            background-color: #0000000f;
            border-radius: 4px;
          "
        >{{ attrs[0].title }}</span>
      </span>
    </template>
  </AgentMarkdown>
</template>
<script setup lang="ts">
import { AgentMarkdown } from '@useAgent/markdown';

const content = `
地铁 6 号线串联虎丘、拙政园、平江路等景点，建议优先使用<span data-type="quote" data-title="苏州市人民政府" data-content="“五一”假期，古城旅游交通出行攻略"> </span> 。
`;
</script>
<style scoped>
.markdown-body {
  font-size: 16px;
}
</style>
