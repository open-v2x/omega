import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
// spat 列表
export async function spatList(params: API.PageParams) {
  return apiService.get<IResponseListData<Device.SpatItem>>(`v1/spats`, {
    params,
  });
}

// 创建 spat
export async function createSpat(data: Device.CreateSpatItem) {
  return apiService.post<Device.SpatItem>(`v1/spats`, data);
}

// 编辑 spat
export async function updateSpat(id: number, data: Device.CreateSpatItem) {
  return apiService.patch<Device.SpatItem>(`v1/spats/${id}`, data);
}

// 删除 spat
export async function deleteSpat(id: number) {
  return apiService.delete(`v1/spats/${id}`);
}

// 获取 spat 详情
export async function getSpatDetail(id: number | string) {
  return apiService.get<Device.SpatItem>(`v1/spats/${id}`);
}
