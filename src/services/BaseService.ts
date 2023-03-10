import { useRootStore } from '#/store/root';
import { get, post, patch, deletE, put, getBlob } from './axios';
import getConfig from './serviceConfig';
import { MyAxiosRequestConfig } from '#/types/service/axios';

const apiConfig = getConfig();

export default class BaseService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private handleGetUrl(url: string, params: any) {
    let curUrl = url;
    if (params) {
      const paramsArray: string[] = [];
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
          paramsArray.push(`${key}=${params[key]}`);
        }
      });
      if (url.search(/\?/) === -1) {
        curUrl += `?${paramsArray.join('&')}`;
      } else {
        curUrl += `&${paramsArray.join('&')}`;
      }
    }
    return curUrl;
  }

  getFullPath = (path: string, config: any = {}) => {
    const { isCenter = false, params = undefined } = config;
    const ip = useRootStore.getState().edgeSite.ip;
    if (isCenter || !ip) return `${this.baseUrl}/center/${path}`;
    const edge = `${this.baseUrl}/edge/${ip}:28300/api/${path}`;
    const url = this.handleGetUrl('', params);
    return url ? `${edge}${url}` : edge;
  };

  getByQuery = <T>(path: string, data: any = {}, config?: MyAxiosRequestConfig): Promise<T> => {
    const curPath = this.handleGetUrl(path, data);
    return this.get<T>(curPath, config);
  };

  get = <T>(path: string, config?: MyAxiosRequestConfig): Promise<T> =>
    config?.isCenter
      ? get<T>(this.getFullPath(path, config), config)
      : get<T>(this.getFullPath(path, config));

  post = <T>(path: string, data: any = {}, config?: MyAxiosRequestConfig): Promise<T> =>
    post<T>(this.getFullPath(path, config), data, config);

  patch = <T>(path: string, data: any, config?: MyAxiosRequestConfig): Promise<T> =>
    patch<T>(this.getFullPath(path, config), data, config);

  delete = <T>(path: string, config?: MyAxiosRequestConfig): Promise<T> =>
    deletE<T>(this.getFullPath(path, config), config);

  put = <T>(path: string, data: any, config?: MyAxiosRequestConfig): Promise<T> =>
    put<T>(this.getFullPath(path, config), data, config);

  getBlob = <T>(path: string, config?: MyAxiosRequestConfig): Promise<Blob> =>
    getBlob<T>(this.getFullPath(path, config), config);
}

export const apiService = new BaseService(apiConfig.API_SERVER);
