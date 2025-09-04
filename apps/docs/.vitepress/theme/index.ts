import DefaultTheme from 'vitepress/theme';
// 自定义样式重载
// import '@useAgent/markdown/style.css';
import './styles/global.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // useGlobalComp(app);
  },
};
