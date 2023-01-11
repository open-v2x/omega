import { AxiosRequestConfig } from 'axios';
import { get, post, patch, deletE, put } from './axios';
import getConfig from './serviceConfig';

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
      Object.keys(params).forEach((key: any) => {
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

  getFullPath = (path: string) => `${this.baseUrl}/omega/${path}`;

  getByQuery = <T>(path: string, data: any = {}, config?: AxiosRequestConfig): Promise<T> => {
    const curPath = this.handleGetUrl(path, data);
    return this.get<T>(curPath, config);
  };

  get = <T>(path: string, config?: AxiosRequestConfig): Promise<T> =>
    get<T>(this.getFullPath(path), config);

  post = <T>(path: string, data: any = {}, config?: AxiosRequestConfig): Promise<T> =>
    post<T>(this.getFullPath(path), data, config);

  patch = <T>(path: string, data: any, config?: AxiosRequestConfig): Promise<T> =>
    patch<T>(this.getFullPath(path), data, config);

  delete = <T>(path: string, config?: AxiosRequestConfig): Promise<T> =>
    deletE<T>(this.getFullPath(path), config);

  put = <T>(path: string, data: any, config?: AxiosRequestConfig): Promise<T> =>
    put<T>(this.getFullPath(path), data, config);
}

export const apiService = new BaseService(apiConfig.API_SERVER);
