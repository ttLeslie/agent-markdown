<template>
  <AgentMarkdown :content="content" />
</template>
<script setup lang="ts">
import { AgentMarkdown } from '@AgentMarkdown/markdown';

const content = `
## emoji :kissing: :kissing: :kissing:

# n级标题 

**粗体文本** __这也是粗体文本__ *斜体文本*  _这也是斜体文本_ ***粗斜体文本*** ~~删除线的文本~~ 超链接 [useAgent](https://element-plus-x.com "Element-Plus-X")

- 无序列表项

1. 有序列表项



| 姓名 | 年龄 | 职业 |
| ---- | ---- | ---- |
| useAgent [useAgent_link](https://element-plus-x.com "Element-Plus-X") | 11   | Agent |
| useAgent [useAgent_link](https://element-plus-x.com "Element-Plus-X") | 11   | Agent |


>一段引用文本
>
>> 嵌套的引用文本

### 图片

![示例图片](https://element-plus-x.com/logo.png "一张示例图")

### 行内代码

用 \`ElmentPlusX\` 表示 行内块代码用 \`\` 语句

### 代码块

\`\`\`javascript
const code = "Element-Plus-X";
\`\`\`

### 行内公式

Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

### 块级公式

$$
F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt
$$

`;
</script>
