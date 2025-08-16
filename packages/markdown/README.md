# @useAgent/ui

Vue 3 组件库，基于 Vue 3 + TypeScript 构建的现代化组件库。

## 特性

- 🚀 基于 Vue 3 + TypeScript 构建
- 📦 支持按需引入
- 💪 使用 Monorepo + pnpm 工作区管理
- 📝 完整的类型定义
- 🔧 完善的开发工具链

## 安装

```bash
npm install @useAgent/ui

yarn add @useAgent/ui

pnpm add @useAgent/ui
```

## 快速开始

### 全局引入

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

import VUI from '@useAgent/ui';
import '@useAgent/ui/style.css';

const app = createApp(App);
app.use(VUI);
app.mount('#app');
```

### 按需引入

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

import { Button } from '@useAgent/ui';
import '@useAgent/ui/style.css';

const app = createApp(App);
app.use(Button);
app.mount('#app');
```

## 使用示例

```vue
<template>
  <VButton @click="open = true">弹窗</VButton>
  <VButton type="primary">按钮</VButton>
  <VButton type="success">按钮</VButton>
  <VButton type="warning">按钮</VButton>
  <VButton type="danger">按钮</VButton>
  <VButton type="info">按钮</VButton>
  <VDialog v-model:open="open">
    <div>弹窗测试2222</div>
  </VDialog>
</template>

<script setup lang="ts">
import { VButton, VDialog } from '@useAgent/ui';
import { ref } from 'vue';
const open = ref(false);
</script>
```
