import type { App } from 'vue';
import { AgentMarkdown } from './components';

export { version } from './version';

const components = [AgentMarkdown];

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
