<template>
  <a-space>
    <!-- 全局引入测试 -->
    <VButton>按钮</VButton>
    <VButton type="primary">按钮</VButton>
    <VButton type="success">按钮</VButton>
    <VButton type="warning">按钮</VButton>
    <VButton type="danger">按钮</VButton>
    <VButton type="info">按钮</VButton>
  </a-space>
</template>

<script setup lang="ts">
// import { VButton } from '~/@useAgent/ui'; // 本地实时调试，组件修改代码，立马能看到效果，不需要打包
// import { VButton } from '@useAgent/ui'; // 从node_modules/@useAgent/ui/dist/es里面引入的，需要打包ui库
// 导出类型测试
// import type { ButtonProps } from '@useAgent/ui';
// const buttonProps: ButtonProps = {
//   type: 'primary',
// };
</script>
