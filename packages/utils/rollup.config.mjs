import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

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
    ],
    plugins: [
      esbuild({
        tsconfig: path.resolve(__dirname, './tsconfig.json'),
      }),
      json({
        preferConst: true,
      }),
    ],
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
