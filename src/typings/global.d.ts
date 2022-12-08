/* eslint-disable @typescript-eslint/naming-convention */
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

declare function t(key: string, { [key as string]: string }?): string & React.ReactNode;
declare const __POWERED_BY_QIANKUN__: string;

declare interface Window {
  __POWERED_BY_QIANKUN__: any;
}
