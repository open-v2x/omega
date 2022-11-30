import { apiService } from '#/services/BaseService';
export async function systemConfig(id: number) {
  return apiService.get<System.SystemConfig>(`v1/system_configs/${id}`, {
    method: 'GET',
  });
}

export async function updateSystemConfig(
  data: System.UpdateEdgeNameParams | System.UpdateEdgeConfigParams,
) {
  return apiService.post<System.SystemConfig>('v1/system_configs', data);
}
