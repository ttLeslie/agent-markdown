import type { CacheManager } from './CacheManager';

export class MessageProcessor<T = unknown> {
  private expectedSeq: number = 0;
  private cacheManager: CacheManager;
  private handleAppMessage: (data: T) => void;
  private handleValidateMessageFormat: (data: T) => void;
  private getIndexValue: (data: T) => number;

  constructor(
    expectedSeq: number = 0,
    cacheManager: CacheManager,
    handleAppMessage: (data: T) => void,
    handleValidateMessageFormat: (data: T) => void,
    getIndexValue: (data: T) => number,
  ) {
    this.expectedSeq = expectedSeq;
    this.cacheManager = cacheManager;
    this.handleAppMessage = handleAppMessage;
    this.handleValidateMessageFormat = handleValidateMessageFormat;
    this.getIndexValue = getIndexValue;
  }

  public processMessage(data: T): void {
    try {
      this.handleValidateMessageFormat(data);
      const seq = this.getIndexValue(data);

      if (seq === this.expectedSeq) {
        this.handleCurrentMessage(data);
      } else if (seq > this.expectedSeq) {
        this.cacheManager.cacheMessage(seq, data);
      } else {
        // 忽略旧消息或重复消息
      }
    } catch (error) {
      console.error('消息处理错误:', error);
    }
  }

  private handleCurrentMessage(data: T): void {
    this.handleAppMessage(data);
    this.expectedSeq++;
    this.checkCacheForNext();
  }

  private checkCacheForNext(): void {
    while (this.cacheManager.messageCache.has(this.expectedSeq)) {
      const cachedEntry = this.cacheManager.getCachedMessage(this.expectedSeq);
      if (cachedEntry) {
        this.handleAppMessage(cachedEntry.data as T);
        this.cacheManager.deleteMessage(this.expectedSeq);
        this.expectedSeq++;
      }
    }
  }
}
