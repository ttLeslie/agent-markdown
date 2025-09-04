**English** | [简体中文](./README.zh-CN.md)

# agent-markdown-vue

A Vue3 component based on markdown - it, enabling developers to rapidly build enterprise - level large - model applications.

## Features

- ⚡️ Extreme Rendering Performance: Generate VNode from Markdown text to achieve incremental rendering, ensuring smooth performance in large - text/chart scenarios.
- 🔧 High - flexibility Expansion: Covers slots for all scenarios, supporting customization of code blocks (including mermaid), in - line/block - level interactive components, images, etc.
- 🛡️ Enterprise - level Security: Features built - in XSS protection and supports the sanitize mode (relying on dompurify), making it safer to render user - generated content.

## Installation

Install with any package manager:

```bash [npm]
npm install agent-markdown-vue --save-dev
```

```bash [yarn]
yarn add agent-markdown-vue --save-dev
```

```bash [pnpm]
pnpm add agent-markdown-vue --save-dev
```


### Basic Usage

By default, the component supports the rendering of all standard Markdown syntax, including emojis, headings, text styles, lists, links, images, tables, code blocks, and formulas.

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

![Sample Image](https://picsum.photos/200/300)
`;
</script>
```
