import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MessageProcessor } from './MessageProcessor';
import { CacheManager } from './CacheManager';

describe('MessageProcessor', () => {
  let messageProcessor: MessageProcessor<any>;
  let mockCacheManager: CacheManager<any>;
  let mockHandleAppMessage: any;
  let mockHandleValidate: any;
  let mockGetIndex: any;

  beforeEach(() => {
    // 初始化依赖
    mockCacheManager = new CacheManager();
    mockHandleAppMessage = vi.fn();
    mockHandleValidate = vi.fn(); // 验证消息格式的 mock
    mockGetIndex = vi.fn((data) => data.seq); // 从消息中提取seq的 mock

    messageProcessor = new MessageProcessor(
      0, // 初始期望序号
      mockCacheManager,
      mockHandleAppMessage,
      mockHandleValidate,
      mockGetIndex,
    );
  });

  afterEach(() => {
    mockCacheManager.destroy();
    vi.clearAllMocks();
  });

  it('应该处理当前期望序号的消息', () => {
    const message = { seq: 0, data: 'test' };
    messageProcessor.processMessage(message);

    // 验证消息格式
    expect(mockHandleValidate).toHaveBeenCalledWith(message);
    // 验证消息被处理
    expect(mockHandleAppMessage).toHaveBeenCalledWith(message);
    // 验证期望序号自增
    expect(messageProcessor['expectedSeq']).toBe(1);
  });

  it('应该缓存未来序号的消息', () => {
    const message = { seq: 2, data: 'future' }; // 当前期望序号是0
    const cacheSpy = vi.spyOn(mockCacheManager, 'cacheMessage');

    messageProcessor.processMessage(message);

    // 消息应被缓存，不触发处理
    expect(cacheSpy).toHaveBeenCalledWith(2, message);
    expect(mockHandleAppMessage).not.toHaveBeenCalled();
    expect(messageProcessor['expectedSeq']).toBe(0); // 序号不变
  });

  it('应该忽略过去序号的消息', () => {
    const message = { seq: -1, data: 'past' }; // 小于当前期望序号0
    const cacheSpy = vi.spyOn(mockCacheManager, 'cacheMessage');

    messageProcessor.processMessage(message);

    // 不缓存，不处理
    expect(cacheSpy).not.toHaveBeenCalled();
    expect(mockHandleAppMessage).not.toHaveBeenCalled();
  });

  it('处理当前消息后应该检查缓存中的下一条消息', () => {
    // 先缓存序号1和2的消息
    mockCacheManager.cacheMessage(1, { seq: 1, data: 'next1' });
    mockCacheManager.cacheMessage(2, { seq: 2, data: 'next2' });

    // 处理序号0的消息（触发后续检查）
    messageProcessor.processMessage({ seq: 0, data: 'current' });

    // 验证序号0、1、2的消息都被处理
    expect(mockHandleAppMessage).toHaveBeenNthCalledWith(1, { seq: 0, data: 'current' });
    expect(mockHandleAppMessage).toHaveBeenNthCalledWith(2, { seq: 1, data: 'next1' });
    expect(mockHandleAppMessage).toHaveBeenNthCalledWith(3, { seq: 2, data: 'next2' });
    expect(messageProcessor['expectedSeq']).toBe(3); // 最终期望序号
    // 缓存中对应消息应被删除
    expect(mockCacheManager.messageCache.has(1)).toBe(false);
    expect(mockCacheManager.messageCache.has(2)).toBe(false);
  });

  it('消息格式验证失败时应该捕获错误', () => {
    const error = new Error('invalid format');
    mockHandleValidate.mockImplementation(() => {
      throw error;
    });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    messageProcessor.processMessage({ seq: 0 });

    expect(consoleSpy).toHaveBeenCalledWith('消息处理错误:', error);
    expect(mockHandleAppMessage).not.toHaveBeenCalled(); // 不处理无效消息
    consoleSpy.mockRestore();
  });
});
