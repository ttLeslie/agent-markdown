import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import {
  CommentOutlined,
  ExperimentOutlined,
  SettingOutlined,
  ToolOutlined,
} from '@ant-design/icons-vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/ui',
    name: 'UI',
    meta: {
      title: 'UI 组件',
      icon: CommentOutlined,
    },
    component: () => import('@/layouts/container/Ui.vue'),
  },
  {
    path: '/hooks',
    name: 'Hooks',
    meta: {
      title: 'Hooks',
      icon: ExperimentOutlined,
    },
    component: () => import('@/layouts/container/Hooks.vue'),
  },
  {
    path: '/directives',
    name: 'Directives',
    meta: {
      title: 'Directives',
      icon: SettingOutlined,
    },
    component: () => import('@/layouts/container/Directives.vue'),
  },
  {
    path: '/utils',
    name: 'Utils',
    meta: {
      title: 'Utils',
      icon: ToolOutlined,
    },
    component: () => import('@/layouts/container/Utils.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          redirect: '/ui',
        },
        ...routes,
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/ui',
    },
  ],
});

export default router;
