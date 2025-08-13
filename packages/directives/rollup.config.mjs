import { defineConfig } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
// import terser from '@rollup/plugin-terser';

export default defineConfig([
  {
    // 输入文件
    input: 'src/index.ts',
    // 输出配置
    output: [
      {
        // CommonJS 格式输出
        file: 'dist/cjs/index.js',
        format: 'cjs',
      },
      {
        // ES 模块格式输出
        file: 'dist/esm/index.mjs',
        format: 'es',
      },
      // 打包出压缩后的文件
      // {
      //   file: `dist/index.min.js`,
      //   format: 'es',
      //   plugins: [terser()],
      // },
    ],
    plugins: [
      esbuild({
        target: 'es2018',
        // minify: true, // 压缩代码，比 terser 快 20-40 倍，压缩率只差 1%-2%。
      }),
      json({
        preferConst: true,
      }),
      // terser(), // 压缩代码（体积减小了，但是不方便查看打包后的代码来排查问题）
    ],
    external: ['vue'],
  },
  {
    // 输出类型文件
    input: 'src/index.ts',
    output: {
      file: 'dist/types/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
]);
