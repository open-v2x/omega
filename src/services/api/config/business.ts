import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';

// RSU 参数配置列表
export async function parameterConfigList(params: API.PageParams) {
  return apiService.get<IResponseListData<Config.ParameterListItem>>(`v1/rsu_configs`, {
    params,
  });
}

// 创建 RSU 参数配置
export async function createParameterConfig(data: any) {
  return apiService.post<Config.ParameterListItem>(`v1/rsu_configs`, data);
}

// RSU 参数配置详情
export async function parameterConfigInfo(id: number) {
  return apiService.get<Config.ParameterListItem>(`v1/rsu_configs/${id}`);
}

// 编辑 RSU 参数配置
export async function updateParameterConfig(id: number, data: any) {
  return apiService.put<Config.ParameterListItem>(`v1/rsu_configs/${id}`, data);
}

// 删除 RSU 参数配置
export async function deleteParameterConfig(id: number) {
  return apiService.delete(`/v1/rsu_configs/${id}`);
}
