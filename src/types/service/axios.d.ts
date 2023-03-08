import { AxiosRequestConfig } from 'axios';
interface MyAxiosRequestConfig extends AxiosRequestConfig {
  isCenter?: boolean;
}
