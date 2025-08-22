<script lang="ts">
import { type VNode, defineComponent, h } from 'vue';
import MarkdownIt, { type Options } from 'markdown-it';
import { katex } from '@mdit/plugin-katex';
import { full as emoji } from 'markdown-it-emoji';
import { getCompontentTree } from './tokens-to-tree';
import createVNode from './createVNode';

const MarkdownRenderer = defineComponent({
  name: 'MarkdownRenderer',
  emit: ['link-click'],
  props: {
    content: {
      type: String,
      default: '',
    },
    breaks: {
      type: Boolean,
      default: true,
      required: false,
    },
    html: {
      type: Boolean,
      default: true,
      required: false,
    },
    href: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup(props, { emit, slots }) {
    return (): VNode => {
      const mdIt = getMarkdownItInstance({ breaks: props.breaks, html: props.html });
      const tree = getCompontentTree(props.content, mdIt);

      const vNodes = tree.map((node, index) => {
        return createVNode(node, index, mdIt, slots);
      });

      return h(
        'div',
        {
          class: 'markdown-body',
          onClick: (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A') {
              const anchor = target as HTMLAnchorElement;
              emit('link-click', anchor.dataset.href, anchor.title);
            }
          },
        },
        vNodes,
      );
    };
  },
});

const getMarkdownItInstance = (options: Options) => {
  const markdownParser = MarkdownIt({
    ...options,
  })
    .use(katex)
    .use(emoji);
  return markdownParser;
};
export default MarkdownRenderer;
</script>
<style scoped></style>
