[English](./README.en.md) | **简体中文**

👉 [在线文档](https://ttleslie.github.io/agent-markdown/)

# agent-markdown-vue

基于 markdown-it 的 Vue3 组件，助力开发者快速搭建企业级大模型应用。

## 特性

- ⚡️ 极致渲染性能：基于 Markdown 文本生成 VNode，实现增量渲染，大文本/图表场景无卡顿
- 🔧 高灵活拓展：覆盖全场景插槽，支持自定义代码块（含 mermaid）、行内/块级交互组件、图片等
- 🛡️ 企业级安全：内置 XSS 防护，支持 sanitize 模式（依赖 dompurify），渲染用户内容更安心

## 安装

使用任意包管理器安装：

```bash [npm]
npm install agent-markdown-vue --save-dev
```

```bash [yarn]
yarn add agent-markdown-vue --save-dev
```

```bash [pnpm]
pnpm add agent-markdown-vue --save-dev
```

## 基本用法

组件默认支持所有标准 Markdown 语法渲染，包括 emoji、标题、文本样式、列表、链接、图片、表格、代码块、公式等。

```vue
<template>
  <AgentMarkdown :content="markdownContent" />
</template>
<script setup lang="ts">
import { AgentMarkdown } from 'agent-markdown-vue';

const markdownContent = `
# Title Example

This is a **bold text** and this is an *italic text*.

- List item 1
- List item 2

`;
```

## 联系方式

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/49dab50f756340a3995a8c062c5df7f8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6I2J5Lic5rKh5pyJ5rS-5a-55ZCX:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjMzNTgwNDgyOTIwOTE1MCJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1757126956&x-orig-sign=tEk1jGOM19dIYIN6pCRn9synE4I%3D)
