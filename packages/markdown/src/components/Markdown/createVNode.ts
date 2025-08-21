import { Fragment, type Slots, type VNode, h } from 'vue';
import type { ExtendedToken, RendererToken, TagToken } from './types';
import { escapeHtml, getAAttr, getAttribute, stripOuterPTag } from './utils';
import type MarkdownIt from 'markdown-it';

const processChildren = (
  children: RendererToken[],
  mdIt: MarkdownIt,
  slots: Slots,
): (VNode | string)[] => {
  return children.map((child, index) => createVNode(child, index, mdIt, slots)).filter(Boolean) as (
    | VNode
    | string
  )[];
};

const handleSlot = (slotName: string, slots: Slots, props: Record<string, any>) => {
  const slot = slots[slotName];
  if (slot) {
    const result = slot(props);
    return Array.isArray(result) ? result[0] : result;
  }
  return null;
};

const handleFenceNode = (
  node: RendererToken,
  index: number,
  ComponentType: string,
  slots: Slots,
) => {
  const lang = ComponentType.split(':')[1] || 'plaintext';
  const rawCode = (node as ExtendedToken).content || '';
  const escapedCode = escapeHtml(rawCode);

  const namedSlotResult = handleSlot(lang, slots, { lang, rawCode });
  if (namedSlotResult) return namedSlotResult;

  const codeSlotResult = handleSlot('code', slots, { lang, rawCode });
  if (codeSlotResult) return codeSlotResult;

  return h(
    'div',
    {
      key: index,
      class: `markdown-code-block language-${lang}`,
      'data-lang': lang,
      'data-raw-code': escapedCode,
    },
    h('pre', { class: 'pre' }, [h('code', rawCode)]),
  );
};

export default function createVNode(
  node: RendererToken,
  index: number,
  mdIt: MarkdownIt,
  slots: Slots,
): VNode | string | null {
  const { ComponentType } = node;

  if (!ComponentType) return null;

  if (ComponentType.startsWith('fence:')) {
    return handleFenceNode(node, index, ComponentType, slots);
  }

  switch (ComponentType) {
    case 'text':
      return (
        handleSlot('text', slots, {
          content: (node as ExtendedToken).content,
        }) ||
        (node as ExtendedToken).content ||
        ''
      );

    case 'emoji':
      return (
        handleSlot('emoji', slots, {
          content: (node as ExtendedToken).content,
        }) ||
        (node as ExtendedToken).content ||
        ''
      );

    case 'softbreak':
      return h('br', { key: index });

    case 'inline': {
      const children = processChildren((node as TagToken).children, mdIt, slots);
      return h(Fragment, { key: index }, children);
    }

    case 'image': {
      const imgNode = node as ExtendedToken;

      return (
        handleSlot('image', slots, {
          src: getAttribute(imgNode, 'src'),
          alt: getAttribute(imgNode, 'alt'),
          title: getAttribute(imgNode, 'title'),
        }) ||
        h('img', {
          key: index,
          class: 'markdown-image',
          src: getAttribute(imgNode, 'src'),
          alt: getAttribute(imgNode, 'alt'),
          title: getAttribute(imgNode, 'title'),
        })
      );
    }

    case 'html_block':
      return (
        handleSlot('htmlBlock', slots, {
          content: (node as ExtendedToken).content,
        }) || h('div', { key: index, innerHTML: (node as ExtendedToken).content || '' })
      );

    case 'code_inline':
      return (
        handleSlot('codeInline', slots, {
          content: (node as ExtendedToken).content,
        }) ||
        h('code', {
          key: index,
          class: 'code-inline',
          innerHTML: escapeHtml((node as ExtendedToken).content || ''),
        })
      );

    case 'math_inline': {
      const formula = (node as ExtendedToken).content || '';
      const html = mdIt.render(
        `${(node as ExtendedToken).markup}${formula}${(node as ExtendedToken).markup}`,
      );

      if (html.includes('katex-error')) {
        return h('span', {
          key: index,
          class: 'math-default-inline',
        });
      }

      return (
        handleSlot('mathInline', slots, {
          content: (node as ExtendedToken).content,
        }) ||
        h('span', {
          key: index,
          class: 'math-inline',
          innerHTML: stripOuterPTag(html),
        })
      );
    }

    case 'math_block': {
      const blockFormula = (node as ExtendedToken).content || '';
      const blockHtml = mdIt.render(
        `${(node as ExtendedToken).markup}${blockFormula}${(node as ExtendedToken).markup}`,
      );

      if (blockHtml.includes('katex-error')) {
        return h('div', {
          key: index,
          class: 'math-default-block',
        });
      }

      return (
        handleSlot('mathBlock', slots, {
          content: (node as ExtendedToken).content,
        }) ||
        h('div', {
          key: index,
          class: 'math-block',
          innerHTML: blockHtml,
        })
      );
    }

    case 'default': {
      const tagNode = node as TagToken;
      const { tag, children } = tagNode;
      const childNodes = processChildren(children, mdIt, slots);
      const baseProps: Record<string, string | number> = { key: index };

      baseProps.class = `markdown-${tag}`;

      if (tag === 'a') {
        baseProps.href = 'javascript:void(0)';
        baseProps.title = getAAttr(tagNode, 'title');
        baseProps['data-href'] = getAAttr(tagNode, 'href');
      }

      return h(tag, baseProps, childNodes);
    }

    default:
      return null;
  }
}
