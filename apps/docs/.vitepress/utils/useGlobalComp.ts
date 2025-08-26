// import type { App, Component } from 'vue';
// // 如果报：“找不到模块“@useAgent/ui”或其相应的类型声明”的错误，记得先build打包一下
// import * as UI from '@useAgent/ui';

// export function useGlobalComp(app: App) {
//   // 注册 UI 组件
//   Object.entries(UI).forEach(([key, component]) => {
//     if (key !== 'default' && isVueComponent(component)) {
//       app.component(key, component);
//     }
//   });

//   // 注册 其他 组件
//   // app.component('Demo', Demo);
// }

// function isVueComponent(component: any): component is Component {
//   return (
//     typeof component === 'object' && (component.install || component.render || component.setup)
//   );
// }
