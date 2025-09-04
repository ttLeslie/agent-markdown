# 快速开始

## 安装

使用包管理器安装：

```shell
npm install @useAgent/markdown --save-dev
// or
yarn add @useAgent/markdown --save-dev
// or
pnpm add @useAgent/markdown --save-dev
```

## 引入组件

### 引入组件样式

```ts
// main.ts
import '@useAgent/markdown/style.css';
```

## 基本用法

基础用法中，组件会默认渲染所有标准 `markdown` 语法，包括 emoji、标题、文本样式、列表、链接、图片、表格、代码块、公式等。

```vue
<template>
  <AgentMarkdown :content="content" />
</template>
<script setup lang="ts">
import { AgentMarkdown } from '@useAgent/markdown';
const content = `# 你好，useAgent`
```
