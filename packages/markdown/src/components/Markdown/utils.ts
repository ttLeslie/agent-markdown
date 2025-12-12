// src/utils.ts
import type { ExtendedToken, TagToken } from './types';
import { escape, unescape } from 'es-toolkit/string';
/**
 * 通用属性获取函数
 * @param node 节点对象
 * @param attrName 要获取的属性名
 * @param fromOpen 是否从open标签获取属性
 * @returns 属性值或空字符串
 */
export const getAttribute = (
  node: ExtendedToken | TagToken,
  attrName: string,
  fromOpen?: boolean,
): string => {
  const attrs = fromOpen ? (node as TagToken).open?.attrs : (node as ExtendedToken).attrs;

  if (attrs) {
    const attr = attrs.find(([name]: [string, string]) => name === attrName);
    return attr?.[1] || '';
  }
  return '';
};

export const getAAttr = (node: TagToken, attrName: string) => {
  if (node.open && node.open.attrs) {
    const hrefAttr = node.open.attrs.find((attr: [string, string]) => attr[0] === attrName);
    return hrefAttr ? hrefAttr[1] : '';
  }
  return '';
};

export const escapeHtml = (str: string): string => {
  return escape(str);
};

export const unescapeHtml = (str: string): string => {
  return unescape(str);
};

export const stripOuterPTag = (html: string): string => {
  let processed = html.replace(/^\s*<p\b[^>]*>\s*/i, '');
  processed = processed.replace(/\s*<\/p\s*>\s*$/i, '');
  return processed.trim();
};

// 块级标签列表
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

// 行内标签列表
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

/**
 * 匹配标签内容，生成对应的闭合标签（闭合标签/自闭合标签返回空）
 * @param tagStr - 标签内容字符串（如：<span data-type="card">、</span>、<br/>）
 * @returns { completeTag: string; isOpenTag: boolean; isSelfClosing: boolean; tagName: string } - 返回处理结果
 */
export function generateClosingTag(tagStr: string): {
  /** 补全后的完整标签字符串 */
  completeTag: string;
  /** 是否为开标签（非闭标签） */
  isOpenTag: boolean;
  /** 是否为独立（自闭合）标签 */
  isSelfClosing: boolean;
  /** 提取的标签名（小写格式） */
  tagName: string;
} {
  // 1. 整合所有有效标签（去重），作为穷尽的标签列表
  const allValidTags = Array.from(new Set([...blockTags, ...inlineTags]));
  // 2. 定义独立（自闭合）标签列表
  const selfClosingTags = ['br', 'img', 'input', 'hr'];
  // 3. 预处理：去除首尾空白，获取处理后的标签字符串
  const trimmedTag = tagStr.trim();
  // 初始化返回结果的默认值
  const defaultResult = {
    completeTag: trimmedTag,
    isOpenTag: false,
    isSelfClosing: false,
    tagName: '',
  };

  // 校验：标签必须以<开头、以>结尾，否则直接返回无效标签
  if (!trimmedTag.startsWith('<') || !trimmedTag.endsWith('>')) {
    return defaultResult;
  }

  // 核心步骤1：判断是否为闭标签（通过<后的第一个字符是否是/）
  // 截取<后的第一个字符（索引1的位置）
  const charAfterOpen = trimmedTag.charAt(1);
  if (charAfterOpen === '/') {
    // 闭标签：提取标签名（如</span> → span）
    // 正则：匹配</tag>或</tag-xxx>格式，提取标签名
    const closeTagRegex = /^<\/([a-zA-Z0-9-]+)>$/;
    const closeMatch = trimmedTag.match(closeTagRegex);
    if (closeMatch) {
      const tagName = closeMatch[1].toLowerCase();
      // 校验标签名是否在有效列表中
      const isValidTag = allValidTags.includes(tagName);
      return {
        completeTag: trimmedTag,
        isOpenTag: false,
        isSelfClosing: isValidTag ? selfClosingTags.includes(tagName) : false,
        tagName: isValidTag ? tagName : '',
      };
    }
    // 格式不合法的闭标签（如</span xxx>），返回无效
    return defaultResult;
  }

  // 核心步骤2：不是闭标签，处理开标签（包括普通开标签和自闭合标签）
  // 正则：提取开标签的标签名、属性部分、自闭合符号（支持<tag>、<tag attr>、<tag/>、<tag attr/>、<tag />）
  // 匹配组1：标签名（如span、hr），组2：属性部分（如' data-type="card"'），组3：自闭合符号（/或 /）
  const openTagRegex = /^<([a-zA-Z0-9-]+)(\s+[^>]*?)?(\s*\/)?>$/;
  const openMatch = trimmedTag.match(openTagRegex);
  if (!openMatch) {
    // 格式不合法的开标签（如<span incomplete），返回无效
    return defaultResult;
  }

  // 提取开标签的信息
  const tagName = openMatch[1].toLowerCase();
  // 校验标签名是否在有效列表中
  if (!allValidTags.includes(tagName)) {
    return {
      completeTag: trimmedTag,
      isOpenTag: false,
      isSelfClosing: false,
      tagName: '',
    };
  }
  const attributes = openMatch[2] || ''; // 属性部分，无则为空字符串
  const isSelfClosing = selfClosingTags.includes(tagName);
  let completeTag = '';

  // 补全标签：根据是否为独立标签处理
  if (isSelfClosing) {
    // 独立标签：统一补全为标准自闭合形式（<tag attr/>）
    completeTag = `<${tagName}${attributes}/>`;
  } else {
    // 普通开标签：补全为成对标签（<tag attr></tag>）
    completeTag = `<${tagName}${attributes}></${tagName}>`;
  }

  return {
    completeTag,
    isOpenTag: true,
    isSelfClosing,
    tagName,
  };
}
/**
 * 匹配完整标签内容，生成对应的闭合标签（自闭合标签返回标准自闭合形式）
 * @param tagStr - 完整的标签字符串（如：<span data-type="card">、<br/>，支持属性值含换行）
 * @returns { completeTag: string; isSelfClosing: boolean; tagName: string } - 返回处理结果
 */
export function generateClosingBlockTag(tagStr: string): {
  /** 补全后的完整标签字符串 */
  completeTag: string;
  /** 是否为独立（自闭合）标签 */
  isSelfClosing: boolean;
  /** 提取的标签名（小写格式） */
  tagName: string;
} {
  // 1. 整合所有有效标签（去重），作为穷尽的标签列表
  const allValidTags = Array.from(new Set([...blockTags, ...inlineTags]));
  // 2. 定义独立（自闭合）标签列表
  const selfClosingTags = ['br', 'img', 'input', 'hr'];
  // 3. 预处理：去除首尾空白，获取处理后的标签字符串
  const trimmedTag = tagStr.trim();
  // 初始化返回结果的默认值（移除了isOpenTag）
  const defaultResult = {
    completeTag: trimmedTag,
    isSelfClosing: false,
    tagName: '',
  };

  // 校验：标签必须以<开头、以>结尾，否则直接返回无效标签
  if (!trimmedTag.startsWith('<') || !trimmedTag.endsWith('>')) {
    return defaultResult;
  }

  // 处理开标签（包括普通开标签和自闭合标签）：入参为完整标签，无闭标签
  // 正则修改点：将[^>]*?替换为[\s\S]*?，支持匹配包含换行的属性内容
  // 匹配组1：标签名（如span、hr），组2：属性部分（如' data-type="card"xxx'），组3：自闭合符号（/或 /）
  // [\s\S]表示匹配所有字符（\s是空白，\S是非空白，包含换行）
  const openTagRegex = /^<([a-zA-Z0-9-]+)(\s+[\s\S]*?)?(\s*\/)?>$/;
  const openMatch = trimmedTag.match(openTagRegex);
  if (!openMatch) {
    // 格式不合法的开标签（如<span incomplete），返回无效
    return defaultResult;
  }

  // 提取开标签的信息
  const tagName = openMatch[1].toLowerCase();
  // 校验标签名是否在有效列表中
  if (!allValidTags.includes(tagName)) {
    return {
      completeTag: trimmedTag,
      isSelfClosing: false,
      tagName: '',
    };
  }
  const attributes = openMatch[2] || ''; // 属性部分，无则为空字符串
  const isSelfClosing = selfClosingTags.includes(tagName);
  let completeTag = '';

  // 补全标签：根据是否为独立标签处理
  if (isSelfClosing) {
    // 独立标签：统一补全为标准自闭合形式（<tag attr/>）
    completeTag = `<${tagName}${attributes}/>`;
  } else {
    // 普通开标签：补全为成对标签（<tag attr></tag>）
    completeTag = `<${tagName}${attributes}></${tagName}>`;
  }

  return {
    completeTag,
    isSelfClosing,
    tagName,
  };
}
