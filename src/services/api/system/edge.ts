import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';

export async function getMqttConfig() {
  return apiService.get<System.EdgeSite>(`v1/system_configs/edge/mqtt_config`);
}

export async function getEdgeSiteList(params: API.PageParams) {
  return apiService.get<IResponseListData<System.EdgeSite>>(`v1/edge_site`, {
    params,
    isCenter: true,
  });
}

export async function deleteEdgeSite(id: string | number) {
  return apiService.delete(`v1/edge_site/${id}`, {
    isCenter: true,
  });
}

export async function updateEdgeSite(
  id: string | number,
  data: { name?: string; areaCode?: string; desc?: string },
) {
  return apiService.patch(`v1/edge_site/${id}`, data, {
    isCenter: true,
  });
}

export async function createEdgeSite(data: System.EdgeSite) {
  return apiService.post(`v1/edge_site`, data, {
    isCenter: true,
  });
}

export async function getEdgeSiteById(id: string) {
  return apiService.get<System.EdgeSite>(`v1/edge_site/${id}`);
}
