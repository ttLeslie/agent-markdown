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

/**
 * 匹配标签内容，生成对应的闭合标签（闭合标签/自闭合标签返回空）
 * @param tagContent - 标签内容字符串（如：<span data-type="card">、</span>、<br/>）
 * @param selfClosingTags - 自定义自闭合标签列表（可选，默认包含br、img、input）
 * @returns { tagName: string; closeTag: string } - 返回提取的标签名和生成的闭合标签
 */
export function generateClosingTag(
  tagContent: string,
  selfClosingTags: string[] = ['br', 'img', 'input'],
): { tagName: string; closeTag: string; isClose: boolean } {
  // 1. 正则定义：匹配闭合标签和开标签
  // 匹配 </标签名> 格式的闭合标签，捕获标签名
  const closeTagRegex = /^<\/([a-zA-Z0-9]+)\s*>$/;
  // 匹配 <标签名 属性...> 或 <标签名/> 格式的开标签，捕获标签名
  const openTagRegex = /^<([a-zA-Z0-9]+)(\s+[^>]*?)?>$/;

  let tagName = '';
  let closeTag = '';

  // 2. 第一步：判断是否是闭合标签，若是则返回空
  const closeTagMatch = tagContent.match(closeTagRegex);
  if (closeTagMatch) {
    tagName = closeTagMatch[1]; // 也可以提取闭合标签的标签名，按需使用
    closeTag = '';
  } else {
    // 3. 第二步：匹配开标签，提取标签名并生成闭合标签
    const openTagMatch = tagContent.match(openTagRegex);
    if (openTagMatch) {
      tagName = openTagMatch[1];
      // 非自闭合标签才生成闭合标签
      if (!selfClosingTags.includes(tagName)) {
        closeTag = `</${tagName}>`;
      }
      // 自闭合标签则保持 closeTag 为空
    }
    // 非标准标签格式，保持 tagName 和 closeTag 为空
  }

  return { tagName, closeTag, isClose: closeTagMatch !== null };
}
