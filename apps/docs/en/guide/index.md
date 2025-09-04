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

:::

## Base usage

In basic usage, the component will render all standard `markdown` syntax by default, including emojis, headings, text styles, lists, links, images, tables, code blocks, formulas, etc.

<demo vue="markdown/enbasic.vue"   />

## Importing Styles

You can use `github - markdown - css` as the basic style, or customize the style according to your needs.

```bash [pnpm]
pnpm add github-markdown-css
```

Importing github-markdown-css

```ts
// main.ts
import 'github-markdown-css/github-markdown.css';
```
