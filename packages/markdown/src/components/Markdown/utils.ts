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
