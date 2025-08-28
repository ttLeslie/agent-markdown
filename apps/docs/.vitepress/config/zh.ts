import { defineConfig } from 'vitepress';

export const zh = defineConfig({
  lang: 'zh-Hans',
  title: 'AgentMarkdown',
  description: '基于markdown-It的 vue3组件',
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    // { text: '首页', link: '/' },
    // { text: '其他', link: '/markdown-examples' },
    // { text: '博客', link: 'https://huangmingfu.github.io/my-blog' },
    // {
    //   text: '更多',
    //   items: [
    //     {
    //       text: '更新日志',
    //       link: 'https://github.com/huangmingfu/vue3-turbo-component-lib-template/blob/master/CHANGELOG.md',
    //     },
    //     {
    //       text: '参与贡献',
    //       link: '',
    //     },
    //   ],
    // },
    // ],
    sidebar: [
      {
        text: '指南',
        items: [{ text: '快速开始', link: '/guide/index' }],
      },
      // {
      //   text: '@AgentMarkdown/markdown',
      //   items: [{ text: 'Markdown', link: '/packages/markdown/index' }],
      // },
      // {
      //   text: '@AgentMarkdown/stream',
      //   items: [{ text: '发送流式请求', link: '/packages/stream/index' }],
      // },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/huangmingfu/vue3-turbo-component-lib-template' },
    ],
  },
});
