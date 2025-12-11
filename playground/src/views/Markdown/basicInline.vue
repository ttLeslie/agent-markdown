<template>
  <div class="test-container">
    <h1>内联标签插槽测试</h1>
    <AgentMarkdown
      :content="content"
      :md-options="{
        breaks: true,
        html: true,
      }"
      :sanitize="true"
    >
      <!-- 特定标签的插槽：span -->
      <template #HtmlSpan="{ tag, attrs, content }">
        <span class="highlight-tag"> 🔍 {{ content }} {{ attrs[0]['data-content'] }} </span>
      </template>
    </AgentMarkdown>
  </div>
</template>

<script setup lang="ts">
import { AgentMarkdown } from '~/agent-markdown-vue';

const content = `
# 内联标签测试

## 基础文本


内容12313<span data-type="card" data-title="苏州市人民政府" data-content="https://thaka.bing.com/th/id/OIP.aBW9fjZTNtddeFpYAzcgJwHaLB?&rs=1&pid=ImgDetMain&o=7&rm=3"></span>12313
11 <br>11
`;
</script>

<style scoped>
.test-container {
  max-width: 800px;
  padding: 20px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.quote-tag {
  padding: 0.2rem 0.4rem;
  font-size: 10px;
  color: #00000080;
  cursor: pointer;
  background-color: #0000000f;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.quote-tag:hover {
  color: #000000b3;
  background-color: #0000001a;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  transform: translateY(-1px);
}

/* 自定义样式 */
.highlight-tag {
  padding: 2px 6px;
  font-weight: bold;
  background-color: #ffeb3b;
  border-radius: 4px;
}

.custom-link {
  color: #2196f3;
  text-decoration: none;
  border-bottom: 2px solid #2196f3;
  transition: all 0.3s ease;
}

.custom-link:hover {
  color: #1976d2;
  border-bottom-color: #1976d2;
}

.custom-strong {
  color: #e91e63;
}

.custom-em {
  font-style: italic;
  color: #9c27b0;
}

.custom-image-container {
  display: inline-block;
  padding: 10px;
  background-color: #f5f5f5;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.custom-image {
  max-width: 200px;
  border-radius: 4px;
}

.image-caption {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #666;
  text-align: center;
}

.custom-code {
  padding: 2px 6px;
  font-family: monospace;
  color: #d32f2f;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.custom-mark {
  padding: 2px 6px;
  color: white;
  background-color: #ff9800;
  border-radius: 4px;
}

.custom-sup {
  font-weight: bold;
  color: #4caf50;
}

.custom-sub {
  font-weight: bold;
  color: #2196f3;
}

.custom-q {
  padding-left: 10px;
  font-style: italic;
  color: #673ab7;
  border-left: 3px solid #673ab7;
}
</style>
