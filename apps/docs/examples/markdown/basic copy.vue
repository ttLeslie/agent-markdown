<template>
  <div class="container">
    <!-- 控制按钮 -->
    <div class="controls">
      <button :disabled="isTyping" class="control-btn start-btn" @click="startTyping">
        <i class="fas fa-play" /> {{ isTyping ? '正在打字...' : '开始打字' }}
      </button>
      <button class="control-btn restart-btn" @click="restartTyping">
        <i class="fas fa-redo" /> 重新开始
      </button>
    </div>

    <!-- Markdown内容渲染 -->
    <div class="markdown-content">
      <AgentMarkdown :content="content" @link-click="handleLinkClick">
        <!-- 1. 代码块相关插槽 -->
        <!-- 1.1 特定语言的代码块插槽（动态，如mermaid、javascript、vue等） -->
        <!-- <template #mermaid="{ rawCode }">
          <Mermaid :content="rawCode" />
        </template> -->
        <template #javascript="{ lang, rawCode }">
          <div v-if="rawCode !== ''" class="js-code">
            <pre><code class="language-js" v-html="setCodeStyle(rawCode, lang)" /></pre>
          </div>
        </template>
        <template #localvue="{ rawCode }">
          <!-- 自定义lang=localvue的代码块 -->
          <div class="local-vue">
            <p>自定义Vue组件代码：</p>
            <pre>{{ rawCode }}</pre>
          </div>
        </template>

        <!-- 1.2 通用代码块插槽（所有未匹配特定语言的代码块会走这里） -->
        <template #code="{ lang, rawCode }">
          <div class="default-code">
            <p>语言：{{ lang }}</p>
            <pre>{{ rawCode }}</pre>
          </div>
        </template>
      </AgentMarkdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AgentMarkdown, SUPPORTED_LANGUAGES } from '@useAgent/markdown';
import hljs from 'highlight.js';
import { onMounted, ref } from 'vue';
const handleLinkClick = (href: string, title: string) => {
  console.log(href, title);
};

// 原始完整内容
const fullContent = `
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

**这是粗体文本**
__这也是粗体文本__

*这是斜体文本*
_这也是斜体文本_

***这是粗斜体文本***

~~这是带删除线的文本~~

- 无序列表项1
- 无序列表项2
  - 子列表项2.1
  - 子列表项2.2

1. 有序列表项1
2. 有序列表项2
  1. 子列表项2.1
  2. 子列表项2.2

[Element-Plus-X](https://element-plus-x.com "Element-Plus-X")

![示例图片](https://element-plus-x.com/logo.png "一张示例图")

>这是一段引用文本
>
>> 这是嵌套的引用文本

---

| 姓名 | 年龄 | 职业 |
| ---- | ---- | ---- |
| 张三 | 25   | 工程师 |
| 李四 | 30   | 设计师 |

### 行内代码

用 \`ElmentPlusX\` 表示 行内块代码用 \`\` 语句

### 代码块

\`\`\`javascript
const code = "Element-Plus-X";
\`\`\`

### 行内公式
你好 $e^{i\\pi} + 1 = 0$

### 块级公式
$$
F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt
$$
`;

// 用于展示的内容（打字机效果）
const content = ref('');
// 打字机状态
const isTyping = ref(false);
const typingSpeed = ref(10); // 打字速度，毫秒/字符
const currentPosition = ref(0);
const timer = ref<number | null>(null);

// 开始打字
const startTyping = () => {
  if (isTyping.value) return;

  isTyping.value = true;

  // 如果已经完成，从头开始
  if (currentPosition.value >= fullContent.length) {
    content.value = '';
    currentPosition.value = 0;
  }

  typeNextCharacter();
};

// 逐字显示
const typeNextCharacter = () => {
  if (currentPosition.value < fullContent.length && isTyping.value) {
    content.value += fullContent.charAt(currentPosition.value);
    currentPosition.value++;

    // 根据字符类型调整速度，让体验更自然
    let delay = typingSpeed.value;
    const char = fullContent.charAt(currentPosition.value);
    if (['\n', '.', ',', ';', '!', '?'].includes(char)) {
      delay = typingSpeed.value * 5; // 标点符号后稍作停顿
    } else if (char === ' ') {
      delay = typingSpeed.value * 2; // 空格停顿短一些
    }

    timer.value = window.setTimeout(typeNextCharacter, delay);
  } else {
    isTyping.value = false;
  }
};

// 重新开始
const restartTyping = () => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
  content.value = '';
  currentPosition.value = 0;
  startTyping();
};

// 代码样式处理
const setCodeStyle = (rawCode: string, lang: string) => {
  if (rawCode.trim() === '') return rawCode;
  // 检查是否为特殊处理的语言
  if (['mermaid', 'echarts', 'localvue'].includes(lang)) return rawCode;
  // 检查是否为支持的语言，否则使用plaintext
  const language = SUPPORTED_LANGUAGES.includes(lang) ? lang : 'plaintext';
  try {
    return hljs.highlight(rawCode, { language }).value;
  } catch (_e) {
    return hljs.highlight(rawCode, { language: 'plaintext' }).value;
  }
};

// 初始显示全部内容
onMounted(() => {
  content.value = fullContent;
});
</script>

<style scoped>
.container {
  max-width: 1000px;
  padding: 2rem;
  margin: 0 auto;
}

/* 控制按钮样式 */
.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.control-btn {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.start-btn {
  background-color: #4caf50;
}

.start-btn:disabled {
  cursor: not-allowed;
  background-color: #a5d6a7;
}

.restart-btn {
  background-color: #2196f3;
}

.control-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* 原有样式保持不变 */
span[aria-hidden='true'] {
  display: none;
}

.code-content {
  padding: 1rem;
  overflow-x: auto;
  border-radius: 4px;
}

.markdown-content {
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
}
</style>
