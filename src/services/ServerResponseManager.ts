import { clearStorage } from '#/utils/storage';
import { AxiosResponse, AxiosError } from 'axios';
import { message } from 'antd';

/**
 * 针对请求成功：返回的 code 码做不同的响应处理
 */

class ServerResponseSuccessManager {
  /**
   * 状态码解析器，用于代码里有自定义的 code
   * @param response
   */
  codeParser(response: AxiosResponse) {
    const code = response?.status;
    const resData = response?.data;
    const parser = {
      default: () => Promise.resolve(resData),
    };
    return parser[code] ? parser[code]() : parser.default();
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
    console.error('error.response==', detail);
    const { msg, code } = detail;
    const parser = {
      '403': () => this.handleCodeIs403(),
      '1062': () => this.handleShowErrorWithDetailKey(code, detail.detail),
      '1406': () => this.handleShowErrorWithDetailKey(code, detail.detail),
      '1116': () => {
        const { intersection_id: intersectionId, phase_id: phaseId } = detail;
        return message.error(t(`error.${code}`, { intersectionId, phaseId }));
      },
      default: () => this.handleCodeIsDefault(msg || detail || error.message),
    };
    return parser[code] ? parser[code]() : parser.default();
  }

  /**
   * @description: 遍历报错 detail 里的 keys
   * @param {number} code
   * @param {any} detail
   */
  handleShowErrorWithDetailKey(code: number, detail: any) {
    const keys = Object.keys(detail);
    const msg = keys.toString();
    message.error(t(`error.${code}`, { msg: msg }));
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
