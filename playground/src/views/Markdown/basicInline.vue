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
        <span class="highlight-tag">
          🔍 {{ content }} {{ attrs[0].title }} {{ attrs[0].content }}
        </span>
      </template>

      <!-- 特定标签的插槽：a -->
      <template #HtmlA="{ tag, attrs, content }">
        <a :href="attrs.href" class="custom-link" target="_blank" rel="noopener noreferrer">
          🔗 {{ content }}
        </a>
      </template>

      <!-- 特定标签的插槽：strong -->
      <template #HtmlStrong="{ tag, attrs, content }">
        <strong class="custom-strong"> 💪 {{ content }} </strong>
      </template>

      <!-- 特定标签的插槽：em -->
      <template #HtmlEm="{ tag, attrs, content }">
        <em class="custom-em"> ✨ {{ content }} </em>
      </template>

      <!-- 特定标签的插槽：img -->
      <template #HtmlImg="{ tag, attrs, isSelfClosing }">
        <div class="custom-image-container">
          <img :src="attrs.src" :alt="attrs.alt" class="custom-image" />
          <span v-if="attrs.title" class="image-caption">{{ attrs.title }}</span>
        </div>
      </template>

      <!-- 特定标签的插槽：code -->
      <template #HtmlCode="{ tag, attrs, content }">
        <code class="custom-code"> 📝 {{ content }} </code>
      </template>

      <!-- 特定标签的插槽：mark -->
      <template #HtmlMark="{ tag, attrs, content }">
        <mark class="custom-mark"> 🎯 {{ content }} </mark>
      </template>

      <!-- 特定标签的插槽：sup -->
      <template #HtmlSup="{ tag, attrs, content }">
        <sup class="custom-sup"> ⬆️ {{ content }} </sup>
      </template>

      <!-- 特定标签的插槽：sub -->
      <template #HtmlSub="{ tag, attrs, content }">
        <sub class="custom-sub"> ⬇️ {{ content }} </sub>
      </template>

      <!-- 特定标签的插槽：q -->
      <template #HtmlQ="{ tag, attrs, content }">
        <q class="custom-q" :cite="attrs.cite"> 🗣️ {{ content }} </q>
      </template>
    </AgentMarkdown>
  </div>
</template>

<script setup lang="ts">
import { AgentMarkdown } from '~/agent-markdown-vue';

const content = `
# 内联标签测试

## 基础文本
地铁 6 号线串联虎丘、拙政园、平江路等景点，建议优先使用<span data-type="quote" data-title="苏州市人民政府" data-content="五一假期，古城旅游交通出行攻略">五一假期，古城旅游交通出行攻略</span>。

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
