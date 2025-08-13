const babel = require('@rollup/plugin-babel'); // Babel 转换插件
const terser = require('@rollup/plugin-terser'); // 代码压缩插件
const { nodeResolve } = require('@rollup/plugin-node-resolve'); // 解析 node_modules 中的模块
const json = require('@rollup/plugin-json'); // 处理 JSON 文件
const esbuild = require('rollup-plugin-esbuild').default; // esbuild 快速的 JavaScript/TypeScript 转译器
const dts = require('rollup-plugin-dts').default; // 生成 TypeScript 声明文件
const path = require('path'); // Node.js 路径模块

// 定义需要打包的包列表
const packages = ['hooks', 'directives', 'utils'];

// 解析文件路径的辅助函数
const resolveFile = (...args) => path.resolve(__dirname, ...args);

/**
 * 通用插件配置
 * @param {*} pkg // 包名
 * @param {*} options.babel // 是否将现代 JavaScript 代码转换为向后兼容的版本
 * @param {*} options.minify // 是否压缩
 * @param {*} options.dts // 是否生成类型文件
 * @returns {Array} Plugins
 */
const getPlugins = (_pkg, options = {}) =>
  [
    json({
      preferConst: options.babel ? false : true,
    }),
    nodeResolve(),
    esbuild(),
    options.babel &&
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
        extensions: ['.js', '.ts'],
      }),
    options.minify && terser(),
    options.dts && dts(),
  ].filter(Boolean);

const createConfig = (pkg) => {
  const input = resolveFile(`../packages/${pkg}/src/index.ts`);
  const external = ['vue'];
  return [
    // ESM 配置
    {
      input,
      external,
      output: {
        file: resolveFile(`dist/${pkg}/esm/index.mjs`),
        format: 'esm',
        exports: 'named',
      },
      plugins: getPlugins(pkg),
    },
    // CommonJS 配置
    {
      input,
      external,
      output: {
        file: resolveFile(`dist/${pkg}/cjs/index.js`),
        format: 'cjs',
        exports: 'named',
      },
      plugins: getPlugins(pkg),
    },
    // 声明文件配置
    {
      input,
      external,
      output: {
        file: resolveFile(`dist/${pkg}/types/index.d.ts`),
        format: 'esm',
      },
      plugins: getPlugins(pkg, { dts: true }),
    },
  ];
};

// 为每个包创建配置
module.exports = packages.flatMap(createConfig);
