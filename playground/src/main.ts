import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
// 引入antdv
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
// 引入@agentX/ui
import MyLibUI from '@agentX/ui';
import '@agentX/ui/style.css';

const app = createApp(App);
app.use(Antd); // 全局引入antdv组件
app.use(MyLibUI); // 全局引入@agentX/ui组件
app.use(router);
app.mount('#app');
