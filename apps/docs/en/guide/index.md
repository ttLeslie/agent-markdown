# Quick Start

## Installation

Install using a package manager:

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

## Importing the Component

### Importing the Component Styles

```ts
// main.ts
import 'agent-markdown-vue/style.css';
```

## Base usage

In basic usage, the component will render all standard `markdown` syntax by default, including emojis, headings, text styles, lists, links, images, tables, code blocks, formulas, etc.

<demo vue="markdown/enbasic.vue"   />
