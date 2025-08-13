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
npm install @agentX/ui @agentX/utils @agentX/hooks @agentX/directives
```

```bash [yarn]
yarn add @agentX/ui @agentX/utils @agentX/hooks @agentX/directives
```

```bash [pnpm]
pnpm add @agentX/ui @agentX/utils @agentX/hooks @agentX/directives
```

```bash [bun]
bun add @agentX/ui @agentX/utils @agentX/hooks @agentX/directives
```

:::

## Usage

### UI Components

```ts
// Global import
import { createApp } from 'vue';
import UI from '@agentX/ui';
import '@agentX/ui/style.css';
const app = createApp(App);
app.use(UI);
// Additionally, add the following configuration to tsconfig.json for type hints:
// "types": ["@agentX/ui/global.d.ts"]

// Import on demand
import { Button } from '@agentX/ui';
import '@agentX/ui/style.css';
const app = createApp(App);
app.use(Button);
```

### Utility Functions

```ts
import { isString } from '@agentX/utils';
console.log(isString('hello')); // true
```

### Hooks

```ts
import { useCounter } from '@agentX/hooks';
const { count, increment, decrement } = useCounter();
```

### Directives

```ts
import { vFocus } from '@agentX/directives';
// Global import
app.directive('focus', vFocus);

// Import on demand
import { vFocus } from '@agentX/directives';
app.directive('focus', vFocus);
```
