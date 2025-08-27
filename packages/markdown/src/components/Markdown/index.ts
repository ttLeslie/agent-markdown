import { withInstall } from '~/_utils';
import MarkdownRenderer from './MarkdownRenderer.vue';
import 'github-markdown-css';

export const AgentMarkdown = withInstall(MarkdownRenderer);
export default AgentMarkdown;

export * from './types';
