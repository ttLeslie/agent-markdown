<template>
  <AgentMarkdown :content="content" @link-click="handleLink" />
</template>
<script setup lang="ts">
import { AgentMarkdown } from 'agent-markdown-vue';

const content = `
## emoji :kissing: :kissing: :kissing:

# n级标题 

**粗体文本** __这也是粗体文本__ *斜体文本*  _这也是斜体文本_ ***粗斜体文本*** ~~删除线的文本~~ 超链接 [agent-markdown](https://ttleslie.github.io/agent-markdown/ "agent-markdown")

- 无序列表项

1. 有序列表项



| 姓名 | 年龄 | 职业 |
| ---- | ---- | ---- |
| agent-markdown  [agent-markdown](https://ttleslie.github.io/agent-markdown/ "agent-markdown") | 11   | Agent |
| agent-markdown  [agent-markdown](https://ttleslie.github.io/agent-markdown/ "agent-markdown") | 11   | Agent |


>一段引用文本
>
>> 嵌套的引用文本

### 图片

![示例图片](https://thaka.bing.com/th/id/OIP.aBW9fjZTNtddeFpYAzcgJwHaLB?&rs=1&pid=ImgDetMain&o=7&rm=3 "一张示例图")

### 行内代码

用 \`agent-markdown-vue\` 表示 行内块代码用 \`\` 语句

### 代码块

\`\`\`javascript
const code = "agent-markdown-vue";
\`\`\`

### 行内公式

Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

### 块级公式

$$
F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt
$$

`;

const handleLink = (e: Event, href: string, title: string) => {
  window.open(href, '_blank');
};
</script>

<style scoped>
.markdown-body {
  font-size: 16px;
}
</style>
