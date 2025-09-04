import { defineConfig } from 'vitepress';

export const en = defineConfig({
  lang: 'en-US',
  title: '@agent/markdown',
  description: 'A Vue3 component based on markdown - It',
  themeConfig: {
    // logo: '/logo.png',
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
    //         link: 'https://github.com/ttLeslie/useAgent-markdown/blob/master/CHANGELOG.md',
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
        text: 'Guide',
        items: [
          { text: 'Quick Start', link: 'en/guide/index' },
          { text: 'Advanced', link: 'en/packages/markdown/index' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/ttLeslie/useAgent-markdown' }],
  },
});
