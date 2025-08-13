import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// 导入 TypeScript 声明文件插件
import dts from 'vite-plugin-dts';
// node
import path from 'node:path';
import fs from 'node:fs';

// 导出 Vite 配置
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      // 包含的文件类型
      include: ['src/**/*.{vue,ts,tsx}'],
      // 输出目录
      outDir: ['dist/types'],
      // 写入文件前的处理
      beforeWriteFile: (filePath, content) => ({
        // 替换文件路径中的 '/src/' 为 '/'，不然类型产物都会被放在src文件夹下面
        filePath: filePath.replace('/src/', '/'),
        content,
      }),
    }),
    // 自定义复制插件（可以使用 vite-plugin-static-copy 插件代替）
    {
      name: 'copy-global-dts',
      closeBundle() {
        // 复制文件global.d.ts到dist里
        const srcPath = path.resolve(import.meta.dirname, 'src/types/global.d.ts');
        const destPath = path.resolve(import.meta.dirname, 'dist/global.d.ts');
        fs.copyFileSync(srcPath, destPath);
      },
    },
  ],
  build: {
    target: 'esnext', // 目标版本
    outDir: 'dist', // 输出目录
    emptyOutDir: true, // 清空输出目录
    minify: false, // 方便查看打包后的代码（排查问题），禁用最小化混淆，默认为esbuild
    // 库配置
    lib: {
      // 入口文件
      entry: path.resolve(import.meta.dirname, 'src/index.ts'),
      // 输出格式
      formats: ['es', 'cjs'],
      // 输出文件名
      fileName: (format) => {
        return `${format === 'es' ? 'esm' : 'cjs'}/[name].${format === 'es' ? 'mjs' : 'js'}`;
      },
      // CSS 输出文件名
      cssFileName: 'style',
    },
    rollupOptions: {
      // 外部依赖
      external: ['vue'],
      // 输出配置
      output: {
        // 导出方式
        exports: 'named',
        // 保留原始模块结构，而不是将所有模块合并成一个大文件
        preserveModules: true,
        // 将 src 目录设置为模块的根目录，这样输出的文件就会直接从 src 的子目录开始，去掉 src 这一层。
        preserveModulesRoot: 'src',
      },
    },
  },
});
