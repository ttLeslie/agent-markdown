import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CacheManager } from './CacheManager';

describe('CacheManager', () => {
  let cacheManager: CacheManager<any>;

  beforeEach(() => {
    // 初始化时指定较小的缓存大小和超时时间，便于测试
    cacheManager = new CacheManager({
      maxCacheSize: 3,
      cacheTimeout: 1000,
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    cacheManager.destroy();
    vi.useRealTimers();
  });

  it('应该使用默认配置初始化', () => {
    const defaultCache = new CacheManager();
    expect(defaultCache.messageCache.size).toBe(0);
    // 测试默认缓存大小（100）
    for (let i = 0; i < 100; i++) {
      defaultCache.cacheMessage(i, i);
    }
    expect(defaultCache.messageCache.size).toBe(100);
    defaultCache.cacheMessage(100, 100);
    expect(defaultCache.messageCache.size).toBe(100);
    expect(defaultCache.messageCache.has(0)).toBe(false); // 最旧的被淘汰
    defaultCache.destroy();
  });

  it('应该正确缓存消息', () => {
    cacheManager.cacheMessage(1, 'data1');
    cacheManager.cacheMessage(2, 'data2');

    expect(cacheManager.messageCache.size).toBe(2);
    expect(cacheManager.getCachedMessage(1)).toEqual({
      data: 'data1',
      timestamp: expect.any(Number),
    });
  });

  it('超过最大缓存大小时应该淘汰最旧消息', () => {
    // 缓存4条消息（超过maxCacheSize=3）
    cacheManager.cacheMessage(1, 'data1');
    cacheManager.cacheMessage(2, 'data2');
    cacheManager.cacheMessage(3, 'data3');
    cacheManager.cacheMessage(4, 'data4');

    expect(cacheManager.messageCache.size).toBe(3);
    expect(cacheManager.messageCache.has(1)).toBe(false); // 最旧的1被淘汰
    expect(cacheManager.messageCache.has(2)).toBe(true);
  });

  it('应该淘汰过期消息', () => {
    cacheManager.cacheMessage(1, 'data1');
    vi.advanceTimersByTime(1500); // 超过1000ms超时时间

    expect(cacheManager.getCachedMessage(1)).toBeUndefined();
    expect(cacheManager.messageCache.has(1)).toBe(false);
  });

  it('deleteMessage应该删除指定消息', () => {
    cacheManager.cacheMessage(1, 'data1');
    cacheManager.deleteMessage(1);
    expect(cacheManager.messageCache.has(1)).toBe(false);
  });

  it('clear应该清空所有消息', () => {
    cacheManager.cacheMessage(1, 'data1');
    cacheManager.cacheMessage(2, 'data2');
    cacheManager.clear();
    expect(cacheManager.messageCache.size).toBe(0);
  });

  it('destroy应该清理定时器和缓存', () => {
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
    cacheManager.cacheMessage(1, 'data1');

    cacheManager.destroy();

    expect(clearIntervalSpy).toHaveBeenCalled();
    expect(cacheManager.cleanupInterval).toBeNull();
    expect(cacheManager.messageCache.size).toBe(0);
    clearIntervalSpy.mockRestore();
  });
});
