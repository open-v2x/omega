import { apiService } from '#/services/BaseService';
import { IResponseListData } from '#/types/service/responseData';

// RSU 运维配置列表
export async function getMapList(params: API.PageParams) {
  return apiService.get<IResponseListData<Config.MapItem>>(`v1/maps`, {
    params,
  });
}

// 添加 MAP 配置
export async function postIssuedRsus(mapId: number, ids: number[]) {
  return apiService.post(`v1/maps/${mapId}/rsus`, ids);
}

// 删除 MAP 绑定的 RSU
export async function deleteMapRSU(id: number, rsuId: number) {
  return apiService.delete(`v1/maps/${id}/rsus/${rsuId}`);
}

// MAP 配置已绑定 RSU 列表
export async function mapRSUList({ mapId, ...params }: API.PageParams & { mapId: number }) {
  return apiService.get<IResponseListData<Config.MapRSUListItem>>(`v1/maps/${mapId}/rsus`, {
    params,
  });
}
