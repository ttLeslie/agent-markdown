<template>
  <div>
    <VMarkdownRenderer :content="fullContent" @link-click="handleLinkClick" />
  </div>
</template>

<script setup lang="ts">
import { VMarkdownRenderer } from '@useAgent/markdown';
const handleLinkClick = (href: string, title: string) => {
  console.log(href, title);
};
const fullContent = `
### 行内公式
$e^{i\\pi} + 1 = 0$

### 块级公式
$$
F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt
$$

### mermaid 饼状图

\`\`\`mermaid
pie
    "传媒及文化相关" : 35
    "广告与市场营销" : 8
    "游戏开发" : 15
    "影视动画与特效" : 12
    "互联网产品设计" : 10
    "VR/AR开发" : 5
    "其他" : 15
\`\`\`

\`\`\`localvue
\`\`\`

\`\`\`javascript
const useAgent = ''
\`\`\`

![示例图片](https://element-plus-x.com/logo.png "一张示例图")

`;
</script>

<style scoped></style>
