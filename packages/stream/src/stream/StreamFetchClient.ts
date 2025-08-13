import { CacheManager } from './CacheManager';
import { MessageProcessor } from './MessageProcessor';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export interface ICurrentEventHandlers<T = unknown> {
  onStreamConnectionError: (data: T, error: Error) => void;
  onConnectionError: (data: T, error: Error) => void;
  onServerError: (data: T, error: Error) => void;
  onParseError: (data: T, error: Error) => void;
  onMessage: (data: T) => void;
  onClose: (data: T) => void;
}

export interface IStreamFetchClientConfig {
  baseUrl?: string;
  headers?: Record<string, string>;
  overErrorTimer?: number;
}

export interface IProcessorConfig<T = unknown> {
  maxCacheSize: number;
  cacheTimeout: number;
  expectedSeq: number;
  handleValidateMessageFormat: (data: T) => void;
  getIndexValue: (data: T) => number;
}

export class StreamFetchClient<T = unknown> {
  private currentMessage: T | undefined;
  private baseUrl: string;
  private headers: Record<string, string>;
  private streamTimer: ReturnType<typeof setTimeout> | null;
  private overErrorTimer: number;
  private abortController: AbortController | null;
  private currentEventHandlers: ICurrentEventHandlers<T>;
  private cacheManager: CacheManager<T> | null = null;
  private messageProcessor: MessageProcessor<T> | null = null;

  constructor(
    config: IStreamFetchClientConfig,
    eventHandles: ICurrentEventHandlers<T>,
    processorConfig?: IProcessorConfig<T>,
  ) {
    this.baseUrl = config.baseUrl || '';
    this.headers = config.headers || {
      'Content-Type': 'application/json',
    };
    this.overErrorTimer = config.overErrorTimer || 60 * 1000;
    this.currentEventHandlers = eventHandles || {
      onMessage: () => {},
    };
    this.abortController = null;
    this.streamTimer = null;
    if (processorConfig) {
      this.cacheManager = new CacheManager<T>({
        maxCacheSize: processorConfig.maxCacheSize,
        cacheTimeout: processorConfig.cacheTimeout,
      });
      this.messageProcessor = new MessageProcessor<T>(
        processorConfig.expectedSeq,
        this.cacheManager,
        this.currentEventHandlers.onMessage,
        processorConfig.handleValidateMessageFormat,
        processorConfig.getIndexValue,
      );
    }
  }

  public async sendStreamRequest(
    payload: Record<string, any>,
    eventHandlers?: ICurrentEventHandlers<T> | null,
    config?: IStreamFetchClientConfig,
  ) {
    if (config) {
      this.baseUrl = config?.baseUrl || this.baseUrl;
      this.headers = { ...this.headers, ...config?.headers };
      this.overErrorTimer = config?.overErrorTimer || this.overErrorTimer;
    }

    this.currentEventHandlers = eventHandlers || this.currentEventHandlers;
    this.abortController = new AbortController();

    try {
      this.startTimer();
      await this.executeFetchRequest(payload);
    } catch (error: any) {
      this.handleRequestError(error);
    } finally {
      this.clearTimer();
    }
  }

  public disconnect() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    this.clearTimer();
    this.cacheManager?.destroy();
  }

  private async executeFetchRequest(payload: Record<string, any>) {
    await fetchEventSource(this.baseUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(this.buildRequestPayload(payload)),
      openWhenHidden: true,
      signal: this.abortController?.signal,
      onopen: async (response) => {
        this.handleOpenResponse(response);
      },
      onmessage: (event) => this.handleServerMessage(event),
      onclose: () => this.handleStreamClose(),
      onerror: () => this.handleStreamError(),
    });
  }

  private handleServerMessage(event: any) {
    this.resetTimer();
    try {
      const message = JSON.parse(event.data);
      if (this.messageProcessor) {
        this.messageProcessor.processMessage(message);
        return;
      }
      this.currentEventHandlers.onMessage?.(message);
      this.currentMessage = message; // 存储最新的消息
    } catch (error: any) {
      this.currentEventHandlers.onParseError?.(this.currentMessage as T, error);
    }
  }

  private buildRequestPayload(payload: Record<string, any>) {
    return {
      ...payload,
    };
  }

  private handleOpenResponse(response: Response) {
    const EventStreamContentType = 'text/event-stream';
    if (response.ok && response.headers.get('content-type') === EventStreamContentType) {
      return;
    }

    if (response.status >= 400 && response.status < 500 && response.status !== 429) {
      this.currentEventHandlers.onServerError?.(
        this.currentMessage as T,
        new Error(response.statusText),
      );
    }
    this.currentEventHandlers.onConnectionError?.(
      this.currentMessage as T,
      new Error('Connection error'),
    );
  }

  private handleStreamClose() {
    this.currentEventHandlers.onClose?.(this.currentMessage as T);
    this.clearTimer();
  }

  private handleStreamError() {
    this.currentEventHandlers.onServerError?.(this.currentMessage as T, new Error('Stream error'));
    this.clearTimer();
  }

  private handleRequestError(error: any) {
    this.currentEventHandlers.onServerError?.(this.currentMessage as T, error);
    this.clearTimer();
  }

  private startTimer() {
    this.streamTimer = setTimeout(() => {
      this.currentEventHandlers.onStreamConnectionError?.(
        this.currentMessage as T,
        new Error('Stream connection timed out'),
      );
      this.disconnect();
    }, this.overErrorTimer);
  }

  private resetTimer() {
    this.clearTimer();
    this.startTimer();
  }

  private clearTimer() {
    if (this.streamTimer) {
      clearTimeout(this.streamTimer);
      this.streamTimer = null;
    }
  }
}
