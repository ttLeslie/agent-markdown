/** @type {import("@commitlint/types").UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'], // 继承自 commitlint 的标准配置
  rules: {
    'type-enum': [
      2, // 规则级别：错误
      'always', // 规则应用条件：始终检查
      [
        'feat', // 新增功能
        'fix', // bug 修复
        'docs', // 文档变更
        'style', // 不影响程序逻辑的代码修改（修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑）
        'refactor', // 重构（即不是新增功能，也不是修改 bug 的代码变动）
        'perf', // 性能, 体验优化
        'test', // 新增测试用例或是更新现有测试
        'build', // 主要目的是修改项目构建系统（例如 gulp，webpack，rollup 的配置等)的提交）
        'ci', // 更改持续集成文件和脚本
        'chore', // 不属于以上类型的其他类型（比如构建流程, 依赖管理）
        'revert', // 撤销之前的提交
        'types', // 类型相关
      ],
    ],
  },
};
