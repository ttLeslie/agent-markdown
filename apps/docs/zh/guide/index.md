# 快速开始

## 安装

使用包管理器安装：

::: code-group

```bash [npm]
npm install @useAgent/markdown --save-dev
```

```bash [yarn]
yarn add @useAgent/markdown --save-dev
```

```bash [pnpm]
pnpm add @useAgent/markdown --save-dev
```

```bash [bun]
bun add @useAgent/markdown --save-dev
```

:::

## 引入组件

### 引入组件样式

```ts
// main.ts
import '@useAgent/markdown/style.css';
```

## 基本用法

基础用法中，组件会默认渲染所有标准 `markdown` 语法，包括 emoji、标题、文本样式、列表、链接、图片、表格、代码块、公式等。

<demo vue="markdown/basic.vue"   />
