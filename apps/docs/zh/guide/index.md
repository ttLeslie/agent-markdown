# 快速开始

## 介绍

useAgent 是一个基于 Vue3 的大模型应用前端解决方案，提供了以下两个部分：

- Markdown 组件
- 流式请求工具库

## 安装

使用包管理器安装：

::: code-group

```bash [npm]
npm install @useAgent/markdown @useAgent/stream
```

```bash [yarn]
yarn add @useAgent/markdown @useAgent/stream
```

```bash [pnpm]
pnpm add @useAgent/markdown @useAgent/stream
```

```bash [bun]
bun add @useAgent/markdown @useAgent/stream
```

:::

## 使用

### 流式请求工具库

```ts
import { StreamFetchClient } from '@useAgent/stream';
```

### Markdown 组件

```ts
import { AgentMarkdown } from '@useAgent/markdown';
```
