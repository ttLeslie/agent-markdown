<script lang="ts" setup>
import { throttle } from 'es-toolkit/compat';
import mermaid from 'mermaid';
import { nextTick, ref, useId, watch } from 'vue';

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  dev: {
    type: Boolean,
    default: false,
  },
});
const domId1 = useId();
const domId2 = useId();
const currentDomId = ref(domId1);
function toggleDomId() {
  const oId = currentDomId.value;
  const oDom = document.getElementById(oId);
  currentDomId.value = oId === domId1 ? domId2 : domId1;
  if (oDom) {
    oDom.innerHTML = '';
  }
}

const htmlString = ref('');

const throttledRender = throttle(render, 400);

// 使用watch替代watchEffect
watch(
  () => props.content, // 明确监听content的变化
  async () => {
    await nextTick();
    throttledRender();
  },
  { immediate: true }, // 确保初始化时执行一次，与watchEffect行为一致
);

function render() {
  mermaid
    .render(currentDomId.value, props.content)
    .then(({ svg, bindFunctions }) => {
      htmlString.value = svg;
      const dom = document.getElementById(currentDomId.value);
      dom && bindFunctions?.(dom);
      toggleDomId();
    })
    .catch(() => {
      props.dev && console.error('Mermaid render error:', props.content);
    });
}
</script>
<template>
  <div class="">
    <div :id="domId1" />
    <div :id="domId2" />
    <div class="template-mermaid" v-html="htmlString" />
  </div>
</template>

<style>
/* 隐藏 Mermaid 错误时的弹窗 */
body > [id^='dv-'] svg {
  position: fixed;
  top: 0;
  left: -9999px;
}
</style>
