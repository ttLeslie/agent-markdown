import { chunk, unique } from '@useAgent/utils';
import { describe, expect, it } from 'vitest';

describe('array工具', () => {
  describe('unique', () => {
    it('应该从数组中移除重复值', () => {
      const input = [1, 2, 2, 3, 4, 4, 5];
      const result = unique(input);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('当输入为空时应该返回一个空数组', () => {
      const result = unique([]);
      expect(result).toEqual([]);
    });
  });

  describe('chunk', () => {
    it('应该将数组拆分为指定大小的块', () => {
      const input = [1, 2, 3, 4, 5];
      const result = chunk(input, 2);
      expect(result).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('当输入为空时应该返回一个空数组', () => {
      const result = chunk([], 2);
      expect(result).toEqual([]);
    });

    it('应该处理块大小大于数组长度的情况', () => {
      const input = [1, 2];
      const result = chunk(input, 5);
      expect(result).toEqual([[1, 2]]);
    });
  });
});
