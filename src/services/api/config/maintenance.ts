import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
// RSU 运维配置列表
export async function maintenanceConfigList(params: API.PageParams) {
  return apiService.get<IResponseListData<Config.MaintenanceListItem>>(`v1/mngs`, {
    params,
  });
}

// 编辑 RSU 运维配置
export async function updateMaintenanceConfig(id: number, data: Config.MaintenanceItem) {
  return apiService.put<Config.MaintenanceListItem>(`v1/mngs/${id}`, data);
}

// 下发 RSU 运维配置
export async function sendMaintenanceConfig(id: number) {
  return apiService.post<string>(`v1/mngs/${id}/down`);
}

// 复制 RSU 运维配置
export async function copyMaintenanceConfig(id: number, data: { rsus: number[] }) {
  return apiService.post<string>(`v1/mngs/${id}/copy`, data);
}
