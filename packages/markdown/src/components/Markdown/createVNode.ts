import { Fragment, type Slots, type VNode, defineAsyncComponent, h } from 'vue';
import type { ExtendedToken, RendererToken, TagToken } from './types';
import { escapeHtml, getAAttr, getAttribute, stripOuterPTag } from './utils';
import type MarkdownIt from 'markdown-it';

const processChildren = (
  children: RendererToken[],
  mdIt: MarkdownIt,
  slots: Slots,
  sanitize: boolean,
): (VNode | string)[] => {
  return children
    .map((child, index) => createVNode(child, index, mdIt, slots, sanitize))
    .filter(Boolean) as (VNode | string)[];
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
  sanitize: boolean,
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
      const children = processChildren((node as TagToken).children, mdIt, slots, sanitize);
      return h(Fragment, { key: index }, children);
    }

    case 'image': {
      const imgNode = node as ExtendedToken;

      return (
        handleSlot('image', slots, {
          src: getAttribute(imgNode, 'src'),
          alt: getAttribute(imgNode, 'alt') || node.content,
          title: getAttribute(imgNode, 'title'),
        }) ||
        h('img', {
          key: index,
          class: 'markdown-image',
          src: getAttribute(imgNode, 'src'),
          alt: getAttribute(imgNode, 'alt') || node.content,
          title: getAttribute(imgNode, 'title'),
        })
      );
    }

    case 'html_inline': {
      const tagNode = node as TagToken;
      let content = tagNode.content || '';
      let tagNames: string = '';
      const tagAttrs: Array<{ [key: string]: string }> = [];

      const inlineTags = [
        'span',
        'a',
        'strong',
        'em',
        'br',
        'img',
        'input',
        'label',
        'code',
        'mark',
        'small',
        'sup',
        'sub',
        'q',
      ];

      const tagPattern = new RegExp(
        `<((${inlineTags.join('|')}))\\b([^>]*?)>(.*?)</\\2>|<((${inlineTags.join('|')}))\\b([^/]*/?)>`,
        'gi',
      );

      content = content.replace(
        tagPattern,
        (_match, _p1, p2, attrs, innerContent, _p3, p4, selfClosingAttrs) => {
          const tagName = p2 || p4;
          const attributes = attrs || selfClosingAttrs || '';

          if (tagName) {
            // 解析属性
            const attrMap: { [key: string]: string } = {};
            const attrRegex = /(\w+)\s*=\s*["']([^"']*)["']/g;
            let attrMatch;

            while ((attrMatch = attrRegex.exec(attributes)) !== null) {
              attrMap[attrMatch[1]] = attrMatch[2];
            }

            tagNames = tagName;
            tagAttrs.push(attrMap);
          }

          return innerContent || '';
        },
      );

      const slotParams = {
        originalContent: tagNode.content || '',
        content: content,
        tags: tagNames,
        attrs: tagAttrs,
      };

      if (tagNames && tagNode.content) {
        const slotResult = handleSlot('htmlInline', slots, slotParams);
        if (slotResult) {
          return slotResult;
        } else {
          return '';
        }
      } else {
        return '';
      }
    }

    case 'html_block': {
      const tagNode = node as TagToken;
      let content = tagNode.content || '';
      let tagNames: string = '';
      const tagAttrs: Array<{ [key: string]: string }> = [];
      const blockTags = [
        'div',
        'p',
        'blockquote',
        'ul',
        'ol',
        'li',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'pre',
        'code',
        'table',
        'thead',
        'tbody',
        'tr',
        'td',
        'th',
        'section',
        'article',
        'header',
        'footer',
        'nav',
        'aside',
        'figure',
        'figcaption',
        'hr',
        'form',
        'fieldset',
      ];

      const tagPattern = new RegExp(
        `<((${blockTags.join('|')}))\\b([^>]*?)>([\\s\\S]*?)</\\2>|<((${blockTags.join('|')}))\\b([^/]*/?)>`,
        'gi',
      );

      content = content.replace(
        tagPattern,
        (_match, _p1, p2, attrs, innerContent, _p3, p4, selfClosingAttrs) => {
          const tagName = p2 || p4;
          const attributes = attrs || selfClosingAttrs || '';

          if (tagName) {
            // 提取标签属性
            const attrMap: { [key: string]: string } = {};
            const attrRegex = /(\w+)\s*=\s*["']([^"']*)["']/g;
            let attrMatch;

            while ((attrMatch = attrRegex.exec(attributes)) !== null) {
              attrMap[attrMatch[1]] = attrMatch[2];
            }

            tagNames = tagNames ? `${tagNames},${tagName}` : tagName;
            tagAttrs.push(attrMap);
          }

          return innerContent || '';
        },
      );

      const slotParams = {
        originalContent: tagNode.content || '',
        content: content,
        tags: tagNames,
        attrs: tagAttrs,
      };

      const slotResult = handleSlot('htmlBlock', slots, slotParams);
      if (slotResult) {
        return slotResult;
      }

      if (sanitize) {
        const sanitizeHtml = async (html: string) => {
          try {
            const module = await import('dompurify');
            return module.default.sanitize(html) ?? '';
          } catch (error) {
            console.error('Failed to sanitize HTML:', error);
            return html;
          }
        };

        return h(
          defineAsyncComponent(() =>
            sanitizeHtml(tagNode.content || '').then((purifiedHtml) =>
              h('div', {
                key: index,
                innerHTML: purifiedHtml,
                class: 'markdown-html-block',
              }),
            ),
          ),
        );
      }

      return h('div', {
        key: index,
        class: 'markdown-html-block',
        innerHTML: tagNode.content || '',
      });
    }

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
      const childNodes = processChildren(children, mdIt, slots, sanitize);
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
