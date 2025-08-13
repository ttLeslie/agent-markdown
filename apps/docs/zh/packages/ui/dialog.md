# Dialog 弹窗

基础的弹窗组件。

## 基础用法

<demo vue="ui/dialog/basic.vue" />

## API

### Props

| 属性 | 说明               | 类型    | 默认值 |
| ---- | ------------------ | ------- | ------ |
| open | 控制弹窗的显示状态 | boolean | false  |

### Events

| 事件名 | 说明             | 回调参数 |
| ------ | ---------------- | -------- |
| close  | 当弹窗关闭时触发 | -        |

## 样式

弹窗可以使用以下类名进行样式定制：

- `.v-dialog`: 主弹窗容器。
- `.v-dialog__overlay`: 背景遮罩。
- `.v-dialog__content`: 弹窗内容区域。
