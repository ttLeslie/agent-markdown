# Quick Start

## Introduction

mylib-template is a component library and toolkit template project based on Vue3, consisting of the following parts:

- UI Component Library: Provides commonly used UI components
- Utility Functions: Offers common utility functions
- Hooks: Provides reusable composable functions
- Directives: Offers commonly used directives

## Installation

Install using a package manager:

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

## Usage

### UI Components

```ts
// Global import
import { createApp } from 'vue';
import UI from '@useAgent/ui';
import '@useAgent/ui/style.css';
const app = createApp(App);
app.use(UI);
// Additionally, add the following configuration to tsconfig.json for type hints:
// "types": ["@useAgent/ui/global.d.ts"]

// Import on demand
import { Button } from '@useAgent/ui';
import '@useAgent/ui/style.css';
const app = createApp(App);
app.use(Button);
```

### Utility Functions

```ts
import { isString } from '@useAgent/utils';
console.log(isString('hello')); // true
```

### Hooks

```ts
import { useCounter } from '@useAgent/hooks';
const { count, increment, decrement } = useCounter();
```

### Directives

```ts
import { vFocus } from '@useAgent/directives';
// Global import
app.directive('focus', vFocus);

// Import on demand
import { vFocus } from '@useAgent/directives';
app.directive('focus', vFocus);
```
