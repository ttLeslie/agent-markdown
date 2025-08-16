import { camelToKebab, capitalize, isString } from '@useAgent/utils';
import { describe, expect, it } from 'vitest';

describe('string工具', () => {
  describe('capitalize', () => {
    it('应该将字符串的首字母转换为大写', () => {
      const input = 'hello';
      const result = capitalize(input);
      expect(result).toEqual('Hello');
    });

    it('当输入为空字符串时应该返回一个空字符串', () => {
      const result = capitalize('');
      expect(result).toEqual('');
    });
  });

  describe('camelToKebab', () => {
    it('应该将驼峰命名转换为短横线命名', () => {
      const input = 'camelCaseString';
      const result = camelToKebab(input);
      expect(result).toEqual('camel-case-string');
    });

    it('当输入为空字符串时应该返回一个空字符串', () => {
      const result = camelToKebab('');
      expect(result).toEqual('');
    });
  });

  describe('isString', () => {
    it('应该判断字符串为true', () => {
      const result = isString('test');
      expect(result).toBe(true);
    });

    it('应该判断非字符串为false', () => {
      const result = isString(123);
      expect(result).toBe(false);
    });
  });
});
