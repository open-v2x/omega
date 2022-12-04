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

// 设备在线率
export async function onlineRate() {
  return apiService.get<{ data: Center.OnlineRateItem }>(`v1/homes/online_rate`);
}

// 根据 rsnEsn 获取对应绑定的 cameras
export async function getCamerasByRsuEsn(rsuEsn: number | string) {
  return apiService.get<any>(`v1/cameras`, {
    params: {
      rsuEsn,
    },
  });
}

// 根据 rsuEsn 获取对应绑定的 lidars
export async function getLidarsByRsuEsn(rsuEsn: number | string) {
  return apiService.get<any>(`v1/lidars`, {
    params: {
      rsuEsn,
    },
  });
}

// 路口信息
export async function routeInfo(params: { rsuEsn: string }) {
  return apiService.get<Center.RouteInfoItem>(`v1/homes/route_info`, {
    params,
  });
}
