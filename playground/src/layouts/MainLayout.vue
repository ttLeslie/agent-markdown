<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        v-model:selected-keys="selectedKeys"
        theme="dark"
        mode="inline"
        @select="onMenuSelect"
      >
        <a-menu-item v-for="route in routes" :key="route.path">
          <template #icon>
            <component :is="route.meta?.icon" />
          </template>
          <span>{{ route.meta?.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding: 0 24px; background: #fff">
        <h2>{{ pageTitle }}</h2>
      </a-layout-header>
      <a-layout-content style="margin: 24px 16px">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { routes } from '@/router';
import type { MenuProps } from 'ant-design-vue';

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['/ui']);
const router = useRouter();

const pageTitle = computed(() => {
  return routes.filter((item) => item.path == selectedKeys.value[0]).pop()?.meta?.title + '演示';
});

const onMenuSelect: MenuProps['onSelect'] = ({ key }) => {
  router.push(key.toString());
};
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background: rgb(255 255 255 / 30%);
}
</style>
