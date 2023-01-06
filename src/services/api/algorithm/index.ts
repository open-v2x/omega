import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';

// 获取算法配置
export async function fetchAlgorithmList(params: API.PageParams & { algo?: string }) {
  return apiService.get<IResponseListData<Algorithm.AlgorithmListItem>>(`v1/algos`, { params });
}

// 获取所有算法版本列表
export async function fetchAlgorithmVersionList(params: API.PageParams & { version?: string }) {
  return apiService.get<IResponseListData<Algorithm.AlgorithmListItem>>(`v1/algos/version`, {
    params,
  });
}

// 新增算法版本
export async function fetchCreateVersion(data: Algorithm.CreateAlgorithmVersion) {
  return apiService.post<any>(`v1/algos/version`, data);
}

// 更新算法配置
export async function updateAlgorithm(data: Algorithm.UpdateAlgorithmItem[]) {
  return apiService.post<any>('v1/algos', data);
}

// 删除算法版本
export async function deleteAlgorithm(id: number) {
  return apiService.delete<any>(`v1/algos/version/${id}`);
}

// 获取所有算法版本和名称
export async function fetchModule() {
  return apiService.get<any>('v1/algos/module');
}
