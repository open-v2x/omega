import { clearStorage } from '#/utils/storage';
import { AxiosResponse, AxiosError } from 'axios';
import { message } from 'antd';

/**
 * 针对请求成功：返回的 code 码做不同的响应处理
 */

class ServerResponseSuccessManager {
  /**
   * 状态码解析器，用于代码里有自定义的 code 和错误展示
   * @param response
   */
  codeParser(response: AxiosResponse) {
    const code = response?.status;
    const resData = response?.data;
    console.log('状态解码', code, resData);
    const parser = {
      '401': () => this.handleCodeIs401(resData),
      '200': () => Promise.resolve(resData),
      default: () => this.handleCodeIsDefault(response),
    };
    return parser[code] ? parser[code]() : parser.default;
  }

  /**
   * 状态码为 401 的响应处理
   * @param resData
   */
  handleCodeIs401(resData) {
    if (resData === 'TOKEN_INVALID') {
      //appEventEmitter.emit("live-token-invalid");
      clearStorage();
      setTimeout(() => {
        window.location.href = '/user/login';
      }, 1000);
    }
  }

  handleCodeIsDefault(response) {
    if (response.headers.get('Content-Type').includes('application/json')) {
      response.json().then((res: { detail: string }) => {
        const { detail } = res || {};
        if (detail) {
          message.error(detail);
        }
      });
    } else {
      message.error(response.statusText);
    }
  }
}

/**
 * 针对请求失败的响应处理
 */
class ServerResponseFailedManager {
  /**
   * 请求失败时，需要提示的信息
   */
  getErrorMessage(error: AxiosError) {
    const { detail } = error.response.data;
    console.error('error.response==', detail || error.message);
    const { msg, code } = detail;
    const parser = {
      '403': () => this.handleCodeIs403(),
      default: () => this.handleCodeIsDefault(msg || error.message),
    };
    return parser[code] ? parser[code]() : parser.default;
  }

  handleCodeIs403() {
    clearStorage();
    setTimeout(() => {
      window.location.href = '/user/login';
    }, 1000);
  }

  handleCodeIsDefault(msg: string) {
    message.error(msg);
  }
}

export const serverResponseSuccessManager = new ServerResponseSuccessManager();
export const serverResponseFailedManager = new ServerResponseFailedManager();
