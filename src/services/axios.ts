import { getToken } from '#/utils/storage';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { serverResponseFailedManager, serverResponseSuccessManager } from './ServerResponseManager';

const axiosInstance: AxiosInstance = axios.create({
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (!navigator.onLine) {
      //toast("网络连接已断开，请稍后重试");
    }

    const { current, pageSize, ...param } = config.params || {};
    if (config.method === 'get') {
      if (current) {
        param.pageNum = current;
      }
      if (pageSize) {
        param.pageSize = pageSize;
      }
    }
    return {
      ...config,
      params: param,
      headers: { Authorization: getToken() },
    };
  },
  (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === 200) {
      return response;
    }
    // 针对请求成功：返回的 code 码做不同的响应
    serverResponseSuccessManager.codeParser(response);
    return Promise.reject(false);
  },
  (error: AxiosError) => {
    // 针对请求失败：应该提示的错误信息
    serverResponseFailedManager.getErrorMessage(error);
    return Promise.reject(error.response);
  },
);

export function setAuthorization(token) {
  console.log('request:setAuthorization', token);
  axiosInstance.defaults.headers.Authorization = token;
}

export function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance.get<T>(url, config).then((res: AxiosResponse) => res && res.data);
}

export function post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance.post<T>(url, data, config).then((res: AxiosResponse) => res.data);
}

export function getBlob(url: string): Promise<Blob> {
  return axios
    .get(url, {
      responseType: 'blob',
    })
    .then(res => res.data);
}

export default axiosInstance;
