import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
// 站点列表
export async function edgeSiteList(params: Center.EdgeSiteSearch) {
  return apiService.get<IResponseListData<Center.EdgeSiteItem>>(`v1/edge_nodes`, {
    params,
  });
}

// 区域
export async function countries() {
  return apiService.get<Center.CountriesItem[]>(`v1/countries`, {
    params: { cascade: true, needIntersection: true },
  });
}

// 下载 MAP 配置
export async function downloadMapConfig(id: number) {
  return apiService.get<any>(`v1/rsus/${id}/map`);
}

// 设备在线率
export async function onlineRate(params: { edgeRsuId: number; intersectionCode: number | string }) {
  return apiService.get<{ data: Center.OnlineRateItem }>(`v1/homes/online_rate`, {
    params,
  });
}

// 路口信息
export async function routeInfo(params: { intersectionCode: string }) {
  return apiService.get<Center.RouteInfoItem>(`v1/homes/route_info`, {
    params,
  });
}

export async function getModelDefault() {
  return apiService.get<Center.ModelDefault>(`v1/intersections/default/`);
}
