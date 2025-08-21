import type { App } from 'vue';
import { VMarkdownRenderer } from './components';

export { version } from './version';

const components = [VMarkdownRenderer];

function install(app: App) {
  components.forEach((component) => {
    app.use(component);
  });
}

export { install };

export * from './components';

export default {
  install,
};
