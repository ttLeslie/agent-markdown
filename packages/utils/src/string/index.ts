/**
 * 将字符串的首字母转换为大写
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 将驼峰命名转换为短横线命名
 */
export const camelToKebab = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
};

/**
 * 判断是否为字符串
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};
