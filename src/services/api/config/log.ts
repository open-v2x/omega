import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';

// RSU 日志下发配置列表
export async function logConfigList(params: API.PageParams) {
  return apiService.get<IResponseListData<Config.LogListItem>>(`v1/rsu_logs`, {
    params,
  });
}

// 创建 RSU 日志下发配置
export async function createLogConfig(data: Config.CreateLogConfigParams) {
  return apiService.post<Config.LogListItem>(`v1/rsu_logs`, data);
}

// 编辑 RSU 日志下发配置
export async function updateLogConfig(id: number, data: Config.CreateLogConfigParams) {
  return apiService.put<Config.LogListItem>(`v1/rsu_logs/${id}`, data);
}

// 删除 RSU 日志下发配置
export async function deleteLogConfig(id: number) {
  return apiService.delete(`/v1/rsu_logs/${id}`);
}
