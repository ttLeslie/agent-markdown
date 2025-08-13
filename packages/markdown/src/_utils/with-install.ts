import type { App, Plugin } from 'vue';

export const withInstall = <T>(comp: T) => {
  const c = comp as any;
  c.install = function (app: App) {
    app.component(c.displayName || c.name, comp as T & Plugin);
  };

  return comp as T & Plugin;
};

/**
使用示例：

export default withInstall<
  typeof Cascader & {
    SHOW_PARENT: typeof SHOW_PARENT;
    SHOW_CHILD: typeof SHOW_CHILD;
  }
>(
  Object.assign(Cascader, {
    SHOW_CHILD,
    SHOW_PARENT,
  } as any),
);
*/
