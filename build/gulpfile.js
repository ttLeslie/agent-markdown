const gulp = require('gulp');
const clean = require('gulp-clean');
const rollup = require('rollup');
const bundleUI = require('./rollup.ui.config.js');
const bundleConfig = require('./rollup.config.js');

// 清理 dist 目录
gulp.task('clean', function () {
  return gulp.src('dist', { allowEmpty: true, read: false }).pipe(clean());
});

// 使用 Rollup 打包
async function bundle(pkg) {
  // 错误用法：input.includes(`\\${pkg}\\`) 路径分隔符使用了Windows格式的反斜杠，这在macOS上会导致无法匹配到文件
  const pkgConfigs = bundleConfig.filter((c) => c.input.includes(`/${pkg}/`));

  if (!pkgConfigs.length) return;

  for (const pkgConfig of pkgConfigs) {
    const bundle = await rollup.rollup(pkgConfig);
    await bundle.write(pkgConfig.output);
    await bundle.close();
  }
}

// 打包 hooks
gulp.task('hooks', async () => {
  await bundle('hooks');
});

// 打包 directives
gulp.task('directives', async () => {
  await bundle('directives');
});

// 打包 utils
gulp.task('utils', async () => {
  await bundle('utils');
});

// 打包 UI 组件
gulp.task('ui', async () => {
  // 因为ui库比较复杂，单独抽离打包
  await bundleUI();
});

// 默认任务，运行所有任务
gulp.task('default', gulp.series('clean', gulp.parallel('hooks', 'directives', 'utils', 'ui')));
