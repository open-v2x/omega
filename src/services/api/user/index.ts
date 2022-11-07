import { IResponseData } from '#/types/service/responseData.d';
import { apiService } from '#/services/BaseService';
import { IUserInfo, LoginParams, LoginResult } from '#/types/service/user';

// 登录后刷新 token
export async function login(body: LoginParams) {
  return apiService.post<IResponseData<LoginResult>>('/v1/login', {
    data: body,
  });
}

// 获取登录用户信息
export async function getUserInfo() {
  apiService.get<IResponseData<IUserInfo>>('/v1/users/me');
}
