# 快速开始

## 安装

使用包管理器安装：

::: code-group

```bash [npm]
npm install agent-markdown-vue --save-dev
```

```bash [yarn]
yarn add agent-markdown-vue --save-dev
```

```bash [pnpm]
pnpm add agent-markdown-vue --save-dev
```

```bash [bun]
bun add agent-markdown-vue --save-dev
```

:::

## 基本用法

基础用法中，组件会默认渲染所有标准 `markdown` 语法，包括 emoji、标题、文本样式、列表、链接、图片、表格、代码块、公式等。

<demo vue="markdown/basic.vue"   />

## 引入样式

你可以使用 `github-markdown-css`作为基本的样式，也可以根据需要自定义样式。

```bash [pnpm]
pnpm add github-markdown-css
```

引入 `github-markdown-css`:

```ts
// main.ts
import 'github-markdown-css/github-markdown.css';
```
