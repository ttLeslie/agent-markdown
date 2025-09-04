import { withInstall } from '~/_utils';
import MarkdownRenderer from './MarkdownRenderer.vue';

export const AgentMarkdown = withInstall(MarkdownRenderer);
export default AgentMarkdown;

export * from './types';
