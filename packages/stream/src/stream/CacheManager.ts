export class CacheManager<T = unknown> {
  public messageCache: Map<number, { data: T; timestamp: number }>;
  private maxCacheSize: number;
  private cacheTimeout: number;
  cleanupInterval: any;

  constructor(config: { maxCacheSize?: number; cacheTimeout?: number } = {}) {
    this.messageCache = new Map();
    this.maxCacheSize = config.maxCacheSize || 100;
    this.cacheTimeout = config.cacheTimeout || 5000;
    this.cleanupInterval = null;
    this.initCleanupCycle();
  }

  private initCleanupCycle(): void {
    this.cleanupInterval = setInterval(() => this.cleanup(), 30000);
  }

  private cleanup(): void {
    this.applyTimeBasedEviction();
    this.applySizeBasedEviction();
  }

  private applyTimeBasedEviction(): void {
    const now = Date.now();
    Array.from(this.messageCache.entries()).forEach(([seq, { timestamp }]) => {
      if (now - timestamp >= this.cacheTimeout) {
        this.messageCache.delete(seq);
      }
    });
  }

  private applySizeBasedEviction(): void {
    // 循环删除直到满足大小限制
    while (this.messageCache.size >= this.maxCacheSize) {
      const oldestKey = Array.from(this.messageCache.keys())[0];
      this.messageCache.delete(oldestKey);
    }
  }

  public cacheMessage(seq: number, data: T): void {
    // 插入前立即执行淘汰检查
    this.applySizeBasedEviction();
    this.messageCache.set(seq, {
      data,
      timestamp: Date.now(),
    });
  }

  public getCachedMessage(seq: number): { data: T; timestamp: number } | undefined {
    const entry = this.messageCache.get(seq);
    if (entry) {
      // 访问时实时检查过期
      if (Date.now() - entry.timestamp > this.cacheTimeout) {
        this.messageCache.delete(seq);
        return undefined;
      }
      return entry;
    }
    return undefined;
  }

  public deleteMessage(seq: number): void {
    this.messageCache.delete(seq);
  }

  public clear(): void {
    this.messageCache.clear();
  }

  public destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.clear();
  }
}
