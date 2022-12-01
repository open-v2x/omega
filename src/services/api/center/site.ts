import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
// 站点列表
export async function edgeSiteList(params: Center.EdgeSiteSearch) {
  return apiService.get<IResponseListData<Center.EdgeSiteItem>>(`v1/edge_nodes`, {
    params,
  });
}

// RSU
export async function rsuDeviceList(nodeId: number, areaCode: string) {
  return apiService.get<IResponseListData<Center.DeviceListItem>>(`v1/edge_node_rsus`, {
    params: { nodeId, areaCode, pageNum: 1, pageSize: -1 },
  });
}

// 区域
export async function countries() {
  return apiService.get<Center.CountriesItem[]>(`v1/countries`, {
    params: { cascade: true },
  });
}

// 下载 MAP 配置
export async function downloadMapConfig(id: number) {
  return apiService.get<any>(`v1/rsus/${id}/map`);
}
