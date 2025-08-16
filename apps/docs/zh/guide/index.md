# 快速开始

## 介绍

mylib-template 是一个基于 Vue3 的组件库和工具集模板项目，包含以下几个部分：

- UI 组件库：提供常用的 UI 组件
- 工具函数：提供常用的工具函数
- Hooks：提供可复用的组合式函数
- Directives：提供常用的指令

## 安装

使用包管理器安装：

::: code-group

```bash [npm]
npm install @useAgent/ui @useAgent/utils @useAgent/hooks @useAgent/directives
```

```bash [yarn]
yarn add @useAgent/ui @useAgent/utils @useAgent/hooks @useAgent/directives
```

```bash [pnpm]
pnpm add @useAgent/ui @useAgent/utils @useAgent/hooks @useAgent/directives
```

```bash [bun]
bun add @useAgent/ui @useAgent/utils @useAgent/hooks @useAgent/directives
```

:::

## 使用

### UI 组件

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

### 工具函数

```ts
import { isString } from '@useAgent/utils';
console.log(isString('hello')); // true
```

### Hooks

```ts
import { useCounter } from '@useAgent/hooks';
const { count, increment, decrement } = useCounter();
```

### 指令

```ts
import { vFocus } from '@useAgent/directives';
// 全局引入
app.directive('focus', vFocus);

// 按需引入
import { vFocus } from '@useAgent/directives';
app.directive('focus', vFocus);
```
