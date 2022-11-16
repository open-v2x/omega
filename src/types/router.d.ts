export interface IRouteConfig {
  /**
   * 页面组件
   *
   * @type {any}
   * @memberof IRouteConfig
   */
  component?: any;
  /**
   * 当前路由路径
   */
  path: string;
  /**
   * 是否为 layout
   */
  layout?: boolean;
  /**
   * 是否权限验证
   */
  auth?: boolean;
  /**
   * 子路由
   */
  children?: any[];
  /**
   * 动态加载路由时的提示文案
   */
  loadingFallback?: string;
  /**
   * 重定向路由
   */
  redirect?: string;
}
