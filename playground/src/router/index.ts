import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { ToolOutlined } from '@ant-design/icons-vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/markdown',
    name: 'Markdown',
    meta: {
      title: 'Markdown',
      icon: ToolOutlined,
    },
    component: () => import('@/layouts/container/Markdown.vue'),
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
          redirect: '/markdown',
        },
        ...routes,
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/markdown',
    },
  ],
});

export default router;
