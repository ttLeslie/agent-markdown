<template>
  <AgentMarkdown :content="content" />
</template>
<script setup lang="ts">
import { AgentMarkdown } from '@useAgent/markdown';

const content = `
## emoji :kissing: :kissing: :kissing:

# n - level Headings 

**Text** __Text__ *Text*  _Text_ ***Text*** ~~Text~~ Hyperlink [useAgent](https:// "useAgent")

- Unordered list item

1. Ordered list item



| Name|	Age|	Profession|
| ---- | ---- | ---- |
| useAgent [useAgent_link](https://.com "useAgent") | 11   | Agent |
| useAgent [useAgent_link](https://.com "useAgent") | 11   | Agent |


>A quoted text
>
>> Nested quoted text

### Images

![Images](https://thaka.bing.com/th/id/OIP.aBW9fjZTNtddeFpYAzcgJwHaLB?&rs=1&pid=ImgDetMain&o=7&rm=3 "An example image")

### Inline Code

Use \`@useAgent\` to represent inline code blocks use \`\` statements

### Code Blocks

\`\`\`javascript
const code = "@useAgent/markdown";
\`\`\`

### Inline Formulas

Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

### Block Formulas

$$
F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt
$$

`;
</script>

<style scoped>
.markdown-body {
  font-size: 16px;
}
</style>
