import DefaultTheme from 'vitepress/theme';
// 引入UI库的样式
import '@useAgent/ui/style.css';
import { useGlobalComp } from '../utils/useGlobalComp';
// 自定义样式重载
import './styles/global.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    useGlobalComp(app);
  },
};
