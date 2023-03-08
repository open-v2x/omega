import { getToken } from '#/utils/storage';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { serverResponseFailedManager, serverResponseSuccessManager } from './ServerResponseManager';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/',
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
      headers: { Authorization: getToken(), ...config.headers },
    };
  },
  (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) =>
    // 针对请求成功：返回的 code 码做不同的响应
    serverResponseSuccessManager.codeParser(response),
  (error: AxiosError) => {
    // 针对请求失败：应该提示的错误信息
    serverResponseFailedManager.getErrorMessage(error);
    return Promise.reject(error);
  },
);

export function setAuthorization(token) {
  axiosInstance.defaults.headers.Authorization = token;
}

export function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance.get<T>(url, config).then((res: any) => res);
}

export function post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance.post<T>(url, data, config).then((res: any) => res);
}

export function patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance.patch<T>(url, data, config).then((res: any) => res);
}

export function deletE<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance.delete<T>(url, config).then((res: any) => res);
}

export function put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance.put<T>(url, data, config).then((res: any) => res);
}

export function getBlob<T>(url: string, config?: AxiosRequestConfig): Promise<Blob> {
  return axiosInstance.get<T>(url, config).then((res: any) => res);
  // return axios
  //   .get(url, {
  //     responseType: 'blob',
  //   })
  //   .then(res => res.data);
}

export default axiosInstance;
