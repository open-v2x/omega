import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
// MAP 配置列表
export async function mapConfigList({
  countryName,
  ...params
}: API.PageParams & { countryName?: string[]; areaCode?: string }) {
  if (countryName?.length) {
    params.areaCode = countryName[countryName.length - 1];
  }
  return apiService.get<IResponseListData<Config.MapListItem>>(`v1/maps`, {
    params,
  });
}

// 添加 MAP 配置
export async function createMapConfig(data: Config.CreateMapConfigParams) {
  return apiService.post<Config.MapListItem>(`v1/maps`, data);
}

// MAP 配置详情
export async function mapConfigInfo(id: number) {
  return apiService.get<Config.MapListItem>(`v1/maps/${id}`);
}

// MAP 配置已绑定 RSU 列表
export async function mapRSUList({ mapId, ...params }: API.PageParams & { mapId: number }) {
  return apiService.get<IResponseListData<Config.MapRSUListItem>>(`v1/maps/${mapId}/rsus`, {
    params,
  });
}

// 添加 MAP 绑定 RSU
export async function createMapRSU(id: number, data: { rusId: number[] }) {
  return apiService.post<Config.MapRSUListItem>(`v1/maps/${id}/rsus`, data);
}

// 删除 MAP 绑定的 RSU
export async function deleteMapRSU(id: number, rsuId: number) {
  return apiService.delete(`v1/maps/${id}/rsus/${rsuId}`);
}

// 编辑 MAP 配置
export async function updateMapConfig(id: number, data: Config.CreateMapConfigParams) {
  return apiService.put<Config.MapListItem>(`v1/maps/${id}`, data);
}

// 删除 MAP 配置
export async function deleteMapConfig(id: number) {
  return apiService.delete(`v1/maps/${id}`);
}

// 下载 MAP 配置
export async function downloadMapConfig(id: number) {
  return apiService.get(`v1/maps/${id}/data`);
}
