<template>
  <div :class="`${name}-demo`">
    <a-tabs v-model:active-key="activeKey" type="card">
      <a-tab-pane v-for="item in renderCmp" :key="item.index" :tab="item.name" />
    </a-tabs>
    <component :is="renderCmp[activeKey]?.component" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  name: string;
}

const props = defineProps<Props>();
const activeKey = ref(0);

const components = import.meta.glob('../views/**/**.vue', {
  eager: true,
  import: 'default',
});

const renderCmp = Object.entries(components)
  .filter(([path]) =>
    path.includes(`/${props.name.charAt(0).toUpperCase() + props.name.slice(1)}/`),
  )
  .map(([path, component], index) => {
    const name = path.match(/[^/]+(?=\.vue$)/)?.[0] || 'error';
    return {
      name,
      component,
      index,
    };
  });
</script>
