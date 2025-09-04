<template>
  <AgentMarkdown :content="content" @link-click="handleLink" />
</template>
<script setup lang="ts">
import { AgentMarkdown } from 'agent-markdown-vue';

const content = `
## emoji :kissing: :kissing: :kissing:

# n - level Headings 

**Text** __Text__ *Text*  _Text_ ***Text*** ~~Text~~ Hyperlink [agent-markdown](https://ttleslie.github.io/agent-markdown/ "agent-markdown 官网")

- Unordered list item

1. Ordered list item



| Name|	Age|	Profession|
| ---- | ---- | ---- |
| agent-markdown  [agent-markdown](https://ttleslie.github.io/agent-markdown/ "agent-markdown") | 11   | Agent |
| agent-markdown  [agent-markdown](https://ttleslie.github.io/agent-markdown/ "agent-markdown") | 11   | Agent |


>A quoted text
>
>> Nested quoted text

### Images

![Images](https://thaka.bing.com/th/id/OIP.aBW9fjZTNtddeFpYAzcgJwHaLB?&rs=1&pid=ImgDetMain&o=7&rm=3 "An example image")

### Inline Code

Use \`@agent\` to represent inline code blocks use \`\` statements

### Code Blocks

\`\`\`javascript
const code = "agent-markdown-vue";
\`\`\`

### Inline Formulas

Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

### Block Formulas

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
