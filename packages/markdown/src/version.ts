/**
 * 需要多作一层导出，不能直接在index.ts中：export { version } from '../package.json';
 * types类型打包的产物里会找不到这个pkgjson文件，虽然不影响使用，但是ts会报红
 */

import { version as pkgVersion } from '../package.json';

export const version: string = pkgVersion;
