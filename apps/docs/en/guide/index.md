# Quick Start

## Introduction

useAgent is a front - end solution for large - model applications based on Vue3, which provides the following two components:

- Markdown component
- Streaming request library

## Installation

Install via a package manager:

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

## Usage

### Streaming Request Library

```ts
import { StreamFetchClient } from '@useAgent/stream';
```

### Markdown Component

```ts
import { AgentMarkdown } from '@useAgent/markdown';
```
