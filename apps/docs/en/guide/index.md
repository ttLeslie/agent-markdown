# Quick Start

## Installation

Install using a package manager:

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

## Importing the Component

### Importing the Component Styles

```ts
// main.ts
import '@useAgent/markdown/style.css';
```

## Base usage

In basic usage, the component will render all standard `markdown` syntax by default, including emojis, headings, text styles, lists, links, images, tables, code blocks, formulas, etc.

<demo vue="markdown/enbasic.vue"   />
