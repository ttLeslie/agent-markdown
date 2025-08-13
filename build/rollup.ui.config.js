const { rollup } = require('rollup');
const vuePlugin = require('@vitejs/plugin-vue'); // Vue 单文件组件编译插件
const vueJSXPlugin = require('@vitejs/plugin-vue-jsx'); // Vue jsx组件编译插件
const esbuild = require('rollup-plugin-esbuild').default; // esbuild 快速的 JavaScript/TypeScript 转译器
const { nodeResolve } = require('@rollup/plugin-node-resolve'); // 解析 node_modules 中的模块
const scss = require('rollup-plugin-scss'); // 编译 SCSS 文件
const dts = require('rollup-plugin-dts').default; // 生成 TypeScript 声明文件
const alias = require('@rollup/plugin-alias'); // 创建导入别名
const json = require('@rollup/plugin-json'); // 处理 JSON 文件
const copy = require('rollup-plugin-copy'); // 复制文件
const path = require('path'); // Node.js 路径模块

// 解析文件路径的辅助函数
const resolveFile = (...args) => path.resolve(__dirname, ...args);

/**
 * 通用插件配置
 * @param {*} options.minify // 是否压缩
 * @param {*} options.style // 样式
 * @returns {Array} Plugins
 */
const getPlugins = (options = {}) => {
  return [
    alias({
      entries: [{ find: '~/_utils', replacement: resolveFile('../packages/ui/src/_utils') }],
    }),
    json({
      preferConst: true,
    }),
    vuePlugin(),
    vueJSXPlugin(),
    nodeResolve({
      extensions: ['.ts', '.tsx', '.vue', '.js', '.scss'],
      moduleDirectories: ['node_modules', 'src'],
    }),
    esbuild({
      tsconfig: resolveFile('./tsconfig.json'),
      minify: options.minify,
      jsx: 'preserve',
    }),
    !options.style && scss({ output: false }),
  ].filter(Boolean);
};

async function bundleUI() {
  const input = resolveFile('../packages/ui/src/index.ts');
  const external = ['vue'];
  const configs = [
    // 生成 ESM
    {
      input,
      external,
      output: {
        file: resolveFile('dist/ui/esm/index.mjs'),
        format: 'esm',
        exports: 'named',
      },
      plugins: getPlugins(),
    },
    // 生成 CommonJS
    {
      input,
      external,
      output: {
        file: resolveFile('dist/ui/cjs/index.js'),
        format: 'cjs',
        exports: 'named',
      },
      plugins: getPlugins(),
    },
    // 生成类型
    {
      input,
      external,
      output: {
        file: resolveFile('dist/ui/types/index.d.ts'),
        format: 'esm',
      },
      plugins: [
        copy({
          targets: [
            {
              src: '../packages/ui/src/types/global.d.ts',
              dest: 'dist/ui',
            },
          ],
        }),
        dts(),
      ],
    },
    // 生成样式和压缩版代码文件
    {
      input,
      external,
      output: {
        file: resolveFile('dist/ui/index.min.js'),
        format: 'esm',
      },
      plugins: [...getPlugins({ style: true, minify: true }), scss({ fileName: 'style.css' })],
    },
  ];

  for (const config of configs) {
    const bundle = await rollup(config);
    await bundle.write(config.output);
    await bundle.close();
  }
}

module.exports = bundleUI;
