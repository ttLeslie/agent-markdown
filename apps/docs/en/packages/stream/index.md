# 流式请求工具库使用指南

> useAgent 提供的流式请求工具库专为大模型应用场景设计，支持 Server-Sent Events (SSE) 流式 **POST** 通信，具备消息缓存、顺序保证、全链路错误处理等核心能力，帮助开发者快速实现稳定可靠的流式交互体验。

## 基础用法

```ts
import { StreamFetchClient } from '@agent/stream';

interface IContent {
  content: string;
  sequenceNumber: number;
  done?: boolean;
}

const streamFetch = new StreamFetchClient<IContent>(
  {
    baseUrl: '/api/chat',
    headers: {
      'Content-Type': 'application/json',
    },
    overErrorTimer: 60 * 1000, // 流式中间超时时间，单位为毫秒
  },
  {
    onMessage: (data: IContent) => {
      console.log('收到消息:', data);
    },
    onClose: (lastData: IContent) => {
      console.log('连接关闭', lastData);
    },
    onServerError: (data: IContent, error: Error) => {
      console.error('服务器错误', error);
    },
    onStreamConnectionError: (data: IContent, error: Error) => {
      console.error('流连接错误:', error);
    },
    onConnectionError: (data: IContent, error: Error) => {
      console.error('连接错误:', error);
    },
    onParseError: (data: IContent, error: Error) => {
      console.error('解析错误:', error);
    },
  },
);

// 开始发起请求，下面是具体的参数
streamFetch.sendStreamRequest({
  // 流式中间请求参数
});

// 暂停请求
streamFetchApp.disconnect();
```

## 高级配置

消息顺序保证与缓存，当需要处理可能**乱序到达**的流式消息时，可配置消息处理器实现顺序保证。

```ts
import { StreamFetchClient } from '@agent/stream';

interface IContent {
  content: string;
  sequenceNumber: number;
  done?: boolean;
}

const streamFetch = new StreamFetchClient<IContent>(
  {
    baseUrl: '/api/chat',
    headers: {
      'Content-Type': 'application/json',
    },
    overErrorTimer: 60 * 1000, // 流式中间超时时间，单位为毫秒
  },
  {
    onMessage: (data: IContent) => {
      console.log('收到消息:', data);
    },
    onClose: (lastData: IContent) => {
      console.log('连接关闭', lastData);
    },
    onServerError: (data: IContent, error: Error) => {
      console.error('服务器错误', error);
    },
    onStreamConnectionError: (data: IContent, error: Error) => {
      console.error('流连接错误:', error);
    },
    onConnectionError: (data: IContent, error: Error) => {
      console.error('连接错误:', error);
    },
    onParseError: (data: IContent, error: Error) => {
      console.error('解析错误:', error);
    },
  },
  {
    maxCacheSize: 6, // 最大缓存大小，单位为条
    cacheTimeout: 5000, // 缓存超时时间，单位为毫秒
    expectedSeq: 0, // 期望的初始化消息索引值
    handleValidateMessageFormat: (data: IContent) => {
      // 校验消息序号的数据类型
      if (typeof data.sequenceNumber !== 'number') {
        throw new Error('Message must have a numeric seq field');
      }
    },
    // 使得消息处理器获取消息序号的索引值
    getIndexValue: (data: IContent) => data.sequenceNumber,
  },
);
```

## 核心 API

### StreamFetchClient 构造函数

```typescript
new StreamFetchClient(config, eventHandlers, processorConfig?)
```

| 参数            | 类型                       | 说明                                 |
| --------------- | -------------------------- | ------------------------------------ |
| config          | `IStreamFetchClientConfig` | 基础配置                             |
| eventHandlers   | `ICurrentEventHandlers`    | 事件处理函数集合                     |
| processorConfig | `IProcessorConfig`         | 消息处理器配置（可选，用于消息排序） |

#### IStreamFetchClientConfig

| 属性           | 类型                     | 默认值                                   | 说明                |
| -------------- | ------------------------ | ---------------------------------------- | ------------------- |
| baseUrl        | `string`                 | `''`                                     | 流式请求基础 URL    |
| headers        | `Record<string, string>` | `{ 'Content-Type': 'application/json' }` | 请求头              |
| overErrorTimer | `number`                 | `60000`                                  | 无消息超时时间 (ms) |

#### ICurrentEventHandlers

| 方法                    | 说明                 |
| ----------------------- | -------------------- |
| onMessage               | 收到消息时触发       |
| onStreamConnectionError | 连接超时时触发       |
| onConnectionError       | 连接建立失败时触发   |
| onServerError           | 服务器返回错误时触发 |
| onParseError            | 消息解析失败时触发   |
| onClose                 | 连接关闭时触发       |

### 实例方法

#### sendStreamRequest

发送流式请求

```typescript
async sendStreamRequest(
  payload: Record<string, any>,
  eventHandlers?: ICurrentEventHandlers<T> | null,
  config?: IStreamFetchClientConfig
)
```

| 参数          | 类型                       | 说明                   |
| ------------- | -------------------------- | ---------------------- |
| payload       | `Record<string, any>`      | 请求体数据             |
| eventHandlers | `ICurrentEventHandlers`    | 临时事件处理器（可选） |
| config        | `IStreamFetchClientConfig` | 临时配置（可选）       |

#### disconnect

断开当前流式连接并清理资源

```typescript
disconnect();
```

## 消息处理机制

当配置了 `processorConfig` 时，消息处理流程如下：

1.  收到消息后先进行格式验证（`handleValidateMessageFormat`）
2.  提取消息序号（`getIndexValue`）
3.  如果序号与预期一致，直接处理并更新预期序号
4.  如果序号大于预期，缓存消息
5.  处理完当前消息后，自动检查缓存中是否有下一条预期消息

这种机制可以确保即使消息乱序到达，最终也能按正确顺序处理。

## 注意事项

1.  务必在组件卸载或不需要流式连接时调用 `disconnect()` 方法，避免内存泄漏
1.  根据业务需求合理配置 `maxCacheSize` 和 `cacheTimeout`，平衡内存占用和消息可靠性
1.  `handleValidateMessageFormat` 中应严格验证消息格式，避免处理非法数据
1.  对于需要长期运行的流式连接，建议实现重连机制
