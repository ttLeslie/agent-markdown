/** @type {import("stylelint").Config} */
export default {
  // 继承的配置
  extends: [
    'stylelint-config-standard', // 标准配置
    'stylelint-config-recommended-vue', // Vue 推荐配置
    'stylelint-config-recess-order', // CSS 属性排序配置
    'stylelint-config-standard-scss', // SCSS 标准配置
  ],
  // 针对特定文件的覆盖配置
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'], // 匹配 SCSS/CSS/Vue/HTML 文件
      customSyntax: 'postcss-scss', // 使用 PostCSS SCSS 语法解析器
    },
    {
      files: ['**/*.(vue|html)'], // 匹配 Vue/HTML 文件
      customSyntax: 'postcss-html', // 使用 PostCSS HTML 语法解析器
    },
  ],
  // 规则配置
  rules: {
    // 基础规则
    'selector-class-pattern': null, // 关闭类选择器命名规则检查
    'no-descending-specificity': null, // 关闭选择器优先级降序检查
    'no-invalid-double-slash-comments': null, // 允许使用双斜杠注释

    // SCSS 特定规则
    'at-rule-no-unknown': null, // 关闭 at 规则未知检查
    'scss/at-rule-no-unknown': true, // 启用 SCSS 的 at 规则检查
    'function-no-unknown': null, // 关闭函数未知检查
    'scss/function-no-unknown': [
      true, // 启用 SCSS 函数未知检查
      {
        ignoreFunctions: ['mix', 'lighten', 'darken', 'rgba'], // 忽略这些常用 SCSS 函数
      },
    ],
    // 关闭 SCSS 全局函数名称检查
    'scss/no-global-function-names': null,

    // 其他规则
    'property-no-unknown': [
      true, // 启用属性未知检查
      {
        ignoreProperties: ['//'], // 忽略双斜杠注释
        ignoreSelectors: [':export', ':import'], // 忽略 CSS Module 的导入导出选择器
      },
    ],
    'no-empty-source': null, // 允许空源文件
  },
};
