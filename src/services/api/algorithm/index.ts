import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';

// 获取算法配置
export async function fetchAlgorithmList() {
  return apiService.get<IResponseListData<Config.AlgorithmListItem>>(`v1/algos`);
}

// 获取所有算法版本列表
export async function fetchAlgorithmVersionList(params: API.PageParams & { version?: string }) {
  return apiService.get<IResponseListData<Config.AlgorithmListItem>>(`v1/algos/version`, {
    params,
  });
}

// 新增算法版本
export async function fetchCreateVersion(data: Config.CreateAlgorithmVersion) {
  return apiService.post<any>(`v1/algos/version`, data);
}
