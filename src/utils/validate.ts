/**
 * 判断是否是外链
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path: string): boolean => /^(https?:|mailto:|tel:)/.test(path);
