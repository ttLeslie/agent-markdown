# 快速开始

## 介绍

useAgent 是一个基于 Vue3 的大模型应用解决方案，提供了以下两个部分：

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
import { isString } from '@useAgent/utils';
console.log(isString('hello')); // true
```


### Markdown 组件

```ts
// 全局引入
import { createApp } from 'vue';
import UI from '@useAgent/ui';
import '@useAgent/ui/style.css';
const app = createApp(App);
app.use(UI);
//  tsconfig.json 还需要添加以下配置以获得类型提示：
//  "types": ["@useAgent/ui/global.d.ts"]

// 按需引入
import { Button } from '@useAgent/ui';
import '@useAgent/ui/style.css';
const app = createApp(App);
app.use(Button);
```
