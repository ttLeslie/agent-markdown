import { defineConfig } from 'vitepress';

export const en = defineConfig({
  lang: 'en-US',
  title: 'useAgent Documentation',
  description:
    'A solution based on Vue3 focusing on front - end application scenarios of large models',
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   // { text: 'Others', link: '/markdown-examples' },
    //   { text: 'Blog', link: 'https://huangmingfu.github.io/my-blog' },
    //   {
    //     text: 'More',
    //     items: [
    //       {
    //         text: 'Changelog',
    //         link: 'https://github.com/huangmingfu/vue3-turbo-component-lib-template/blob/master/CHANGELOG.md',
    //       },
    //       // {
    //       //   text: 'Contribute',
    //       //   link: '',
    //       // },
    //     ],
    //   },
    // ],
    sidebar: [
      {
        text: 'Start',
        items: [{ text: 'Introduction', link: 'en/guide/index' }],
      },
      {
        text: '@useAgent/markdown',
        items: [{ text: 'Markdown', link: 'en/packages/markdown/index' }],
      },
      {
        text: '@useAgent/stream',
        items: [{ text: 'Streaming Requests', link: 'en/packages/stream/index' }],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/huangmingfu/vue3-turbo-component-lib-template' },
    ],
  },
});
